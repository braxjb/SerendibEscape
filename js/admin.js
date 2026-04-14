const ADMIN_ALLOWED_USER_IDS = [
  "67982a5d-ee33-4e9d-ba9b-9f59b172874c"
];

const tableBody = document.getElementById("itinerariesTableBody");
const tableCount = document.getElementById("tableCount");
const searchInput = document.getElementById("searchInput");
const pageMessage = document.getElementById("pageMessage");

const formDialog = document.getElementById("formDialog");
const viewDialog = document.getElementById("viewDialog");

const closeFormDialog = document.getElementById("closeFormDialog");
const closeViewDialog = document.getElementById("closeViewDialog");

const formDialogTitle = document.getElementById("formDialogTitle");
const form = document.getElementById("itineraryForm");
const formMessage = document.getElementById("formMessage");
const newItineraryBtn = document.getElementById("newItineraryBtn");
const deleteBtn = document.getElementById("deleteBtn");
const resetBtn = document.getElementById("resetBtn");
const viewDialogBody = document.getElementById("viewDialogBody");
const addStayBtn = document.getElementById("addStayBtn");
const addDayBtn = document.getElementById("addDayBtn");
const featuredStaysBuilder = document.getElementById("featuredStaysBuilder");
const itineraryDaysBuilder = document.getElementById("itineraryDaysBuilder");

let allRows = [];
let currentEditingId = null;

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function prettyJson(value) {
  return JSON.stringify(value ?? [], null, 2);
}

function parseJsonTextarea(value, fallback = []) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return fallback;
  return JSON.parse(trimmed);
}

function parseTags(value) {
  return String(value || "")
    .split(",")
    .map(v => v.trim().toLowerCase())
    .filter(Boolean);
}

async function requireAdmin() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data.user) {
    window.location.href = "admin-login.html";
    return null;
  }

  if (!ADMIN_ALLOWED_USER_IDS.includes(data.user.id)) {
    document.body.innerHTML = `
      <main style="padding:40px;font-family:Arial,sans-serif;">
        <h1>Access denied</h1>
        <p>This account is not allowed to manage itineraries.</p>
      </main>
    `;
    return null;
  }

  return data.user;
}

async function loadItineraries() {
  tableBody.innerHTML = `
    <tr>
      <td colspan="8" class="loading-cell">Loading itineraries...</td>
    </tr>
  `;

  const { data, error } = await supabaseClient
    .from("itineraries")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    pageMessage.textContent = error.message;
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">Could not load itineraries.</td>
      </tr>
    `;
    return;
  }

  allRows = data || [];
  renderTable();
}

function getFilteredRows() {
  const q = String(searchInput?.value || "").trim().toLowerCase();

  if (!q) return [...allRows];

  return allRows.filter(row => {
    return (
      String(row.title || "").toLowerCase().includes(q) ||
      String(row.slug || "").toLowerCase().includes(q)
    );
  });
}

function renderTable() {
  const rows = getFilteredRows();
  tableCount.textContent = `${rows.length} itinerar${rows.length === 1 ? "y" : "ies"}`;

  if (!rows.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">No itineraries found.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = rows.map(row => `
    <tr>
      <td>
        <span class="cell-title">${escapeHtml(row.title || "")}</span>
      </td>
      <td>${escapeHtml(row.slug || "")}</td>
      <td>${escapeHtml(row.price_label || "-")}</td>
      <td>${escapeHtml(row.duration_label || "-")}</td>
      <td>${escapeHtml(row.region || "-")}</td>
      <td>
        <span class="status-pill ${row.is_published ? "published" : "draft"}">
          ${row.is_published ? "Published" : "Draft"}
        </span>
      </td>
      <td>${escapeHtml(row.sort_order ?? 0)}</td>
      <td>
        <div class="action-group">
          <button class="btn-table" data-action="view" data-id="${row.id}">View</button>
          <button class="btn-table" data-action="edit" data-id="${row.id}">Edit</button>
        </div>
      </td>
    </tr>
  `).join("");

  tableBody.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;
      const row = allRows.find(r => r.id === id);
      if (!row) return;

      if (action === "view") openViewDialog(row);
      if (action === "edit") openEditDialog(row);
    });
  });
}

function openViewDialog(row) {
  viewDialogBody.innerHTML = `
    <div class="view-block">
      <h3>Basic details</h3>
      <div class="view-grid">
        <div class="view-item"><strong>Title</strong>${escapeHtml(row.title || "")}</div>
        <div class="view-item"><strong>Slug</strong>${escapeHtml(row.slug || "")}</div>
        <div class="view-item"><strong>Price label</strong>${escapeHtml(row.price_label || "-")}</div>
        <div class="view-item"><strong>Price amount</strong>${escapeHtml(row.price_amount || "-")}</div>
        <div class="view-item"><strong>Duration</strong>${escapeHtml(row.duration_label || "-")}</div>
        <div class="view-item"><strong>Region</strong>${escapeHtml(row.region || "-")}</div>
        <div class="view-item"><strong>Transport</strong>${escapeHtml(row.transport || "-")}</div>
        <div class="view-item"><strong>Pace</strong>${escapeHtml(row.pace || "-")}</div>
        <div class="view-item"><strong>Best time</strong>${escapeHtml(row.best_time || "-")}</div>
        <div class="view-item"><strong>Ideal for</strong>${escapeHtml(row.ideal_for || "-")}</div>
        <div class="view-item"><strong>Published</strong>${row.is_published ? "Yes" : "No"}</div>
        <div class="view-item"><strong>Sort order</strong>${escapeHtml(row.sort_order ?? 0)}</div>
      </div>
    </div>

    <div class="view-block">
      <h3>Description</h3>
      <div>${escapeHtml(row.description || "-")}</div>
    </div>

    <div class="view-block">
      <h3>Images</h3>
      <div class="view-grid">
        <div class="view-item"><strong>Hero image</strong>${escapeHtml(row.hero_image || "-")}</div>
        <div class="view-item"><strong>Card image</strong>${escapeHtml(row.card_image || "-")}</div>
      </div>
    </div>

    <div class="view-block">
      <h3>Tags</h3>
      <div class="json-preview">${escapeHtml(prettyJson(row.tags || []))}</div>
    </div>

    <div class="view-block">
      <h3>Featured stays</h3>
      <div class="json-preview">${escapeHtml(prettyJson(row.featured_stays || []))}</div>
    </div>

    <div class="view-block">
      <h3>Itinerary days</h3>
      <div class="json-preview">${escapeHtml(prettyJson(row.itinerary_days || []))}</div>
    </div>
  `;

  viewDialog.showModal();
}

function fillForm(row) {
  currentEditingId = row.id;
  formDialogTitle.textContent = `Edit itinerary`;
  deleteBtn.style.display = "inline-flex";

  document.getElementById("itineraryId").value = row.id ?? "";
  document.getElementById("slug").value = row.slug ?? "";
  document.getElementById("title").value = row.title ?? "";
  document.getElementById("price_label").value = row.price_label ?? "";
  document.getElementById("price_amount").value = row.price_amount ?? "";
  document.getElementById("currency").value = row.currency ?? "USD";
  document.getElementById("duration_nights").value = row.duration_nights ?? "";
  document.getElementById("duration_label").value = row.duration_label ?? "";
  document.getElementById("region").value = row.region ?? "Sri Lanka";
  document.getElementById("hero_image").value = row.hero_image ?? "";
  document.getElementById("card_image").value = row.card_image ?? "";
  document.getElementById("description").value = row.description ?? "";
  document.getElementById("transport").value = row.transport ?? "";
  document.getElementById("pace").value = row.pace ?? "";
  document.getElementById("best_time").value = row.best_time ?? "";
  document.getElementById("ideal_for").value = row.ideal_for ?? "";
  document.getElementById("tags").value = Array.isArray(row.tags) ? row.tags.join(", ") : "";
  renderFeaturedStaysBuilder(row.featured_stays || []);
  renderItineraryDaysBuilder(row.itinerary_days || []);
  document.getElementById("sort_order").value = row.sort_order ?? 0;
  document.getElementById("is_published").checked = !!row.is_published;

  formMessage.textContent = "";
}
function createStayItem(data = {}) {
  return {
    name: data.name || "",
    location: data.location || "",
    description: data.description || "",
    image: data.image || ""
  };
}

function createDayItem(data = {}) {
  return {
    day_number: data.day_number ?? "",
    title: data.title || "",
    location: data.location || "",
    description: data.description || "",
    overnight_stay: data.overnight_stay || "",
    image: data.image || ""
  };
}

function getFeaturedStaysFromUI() {
  const cards = featuredStaysBuilder.querySelectorAll(".stay-builder-card");

  return Array.from(cards).map(card => ({
    name: card.querySelector('[data-field="name"]').value.trim(),
    location: card.querySelector('[data-field="location"]').value.trim(),
    description: card.querySelector('[data-field="description"]').value.trim(),
    image: card.querySelector('[data-field="image"]').value.trim()
  })).filter(item => item.name || item.location || item.description || item.image);
}

function getItineraryDaysFromUI() {
  const cards = itineraryDaysBuilder.querySelectorAll(".day-builder-card");

  return Array.from(cards).map(card => ({
    day_number: Number(card.querySelector('[data-field="day_number"]').value || 0),
    title: card.querySelector('[data-field="title"]').value.trim(),
    location: card.querySelector('[data-field="location"]').value.trim(),
    description: card.querySelector('[data-field="description"]').value.trim(),
    overnight_stay: card.querySelector('[data-field="overnight_stay"]').value.trim(),
    image: card.querySelector('[data-field="image"]').value.trim()
  })).filter(item =>
    item.day_number || item.title || item.location || item.description || item.overnight_stay || item.image
  );
}
function resetForm() {
  currentEditingId = null;
  form.reset();

  formDialogTitle.textContent = "New itinerary";
  deleteBtn.style.display = "none";

  document.getElementById("currency").value = "USD";
  document.getElementById("region").value = "Sri Lanka";
  document.getElementById("sort_order").value = 0;
  document.getElementById("is_published").checked = true;
  renderFeaturedStaysBuilder([]);
  renderItineraryDaysBuilder([]);

  formMessage.textContent = "";
}
function renderFeaturedStaysBuilder(items = []) {
  const stays = Array.isArray(items) ? items : [];

  if (!stays.length) {
    featuredStaysBuilder.innerHTML = `
      <div class="builder-empty">No featured stays added yet.</div>
    `;
    return;
  }

  featuredStaysBuilder.innerHTML = stays.map((stay, index) => `
    <div class="builder-card stay-builder-card" data-index="${index}">
      <div class="builder-card-head">
        <div class="builder-card-title">Stay ${index + 1}</div>
        <div class="builder-card-actions">
          <button type="button" class="btn-table remove-stay-btn" data-index="${index}">Remove</button>
        </div>
      </div>

      <div class="builder-grid-2">
        <div class="form-row">
          <label>Name</label>
          <input type="text" data-field="name" value="${escapeHtml(stay.name || "")}">
        </div>
        <div class="form-row">
          <label>Location</label>
          <input type="text" data-field="location" value="${escapeHtml(stay.location || "")}">
        </div>
      </div>

      <div class="form-row">
        <label>Description</label>
        <textarea data-field="description" rows="3">${escapeHtml(stay.description || "")}</textarea>
      </div>

      <div class="form-row">
        <label>Image URL</label>
        <input type="text" data-field="image" value="${escapeHtml(stay.image || "")}">
      </div>

      <div class="builder-preview">
        <strong>Preview</strong>
        <div>${escapeHtml(stay.name || "Untitled stay")} ${stay.location ? `— ${escapeHtml(stay.location)}` : ""}</div>
        ${stay.image ? `<img src="${escapeHtml(stay.image)}" alt="${escapeHtml(stay.name || "Stay image")}">` : ""}
      </div>
    </div>
  `).join("");

  featuredStaysBuilder.querySelectorAll(".remove-stay-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const current = getFeaturedStaysFromUI();
      current.splice(index, 1);
      renderFeaturedStaysBuilder(current);
    });
  });

  featuredStaysBuilder.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => {
      renderFeaturedStaysBuilder(getFeaturedStaysFromUI());
    });
  });
}

function renderItineraryDaysBuilder(items = []) {
  const days = Array.isArray(items) ? items : [];

  if (!days.length) {
    itineraryDaysBuilder.innerHTML = `
      <div class="builder-empty">No itinerary days added yet.</div>
    `;
    return;
  }

  itineraryDaysBuilder.innerHTML = days.map((day, index) => `
    <div class="builder-card day-builder-card" data-index="${index}">
      <div class="builder-card-head">
        <div class="builder-card-title">Day ${escapeHtml(day.day_number || index + 1)}</div>
        <div class="builder-card-actions">
          <button type="button" class="btn-table remove-day-btn" data-index="${index}">Remove</button>
        </div>
      </div>

      <div class="builder-grid-3">
        <div class="form-row">
          <label>Day number</label>
          <input type="number" data-field="day_number" value="${escapeHtml(day.day_number ?? "")}">
        </div>
        <div class="form-row">
          <label>Title</label>
          <input type="text" data-field="title" value="${escapeHtml(day.title || "")}">
        </div>
        <div class="form-row">
          <label>Location</label>
          <input type="text" data-field="location" value="${escapeHtml(day.location || "")}">
        </div>
      </div>

      <div class="form-row">
        <label>Description</label>
        <textarea data-field="description" rows="4">${escapeHtml(day.description || "")}</textarea>
      </div>

      <div class="builder-grid-2">
        <div class="form-row">
          <label>Overnight stay</label>
          <input type="text" data-field="overnight_stay" value="${escapeHtml(day.overnight_stay || "")}">
        </div>
        <div class="form-row">
          <label>Image URL</label>
          <input type="text" data-field="image" value="${escapeHtml(day.image || "")}">
        </div>
      </div>

      <div class="builder-preview">
        <strong>Preview</strong>
        <div>Day ${escapeHtml(day.day_number || index + 1)} — ${escapeHtml(day.title || "Untitled day")}</div>
        <div>${escapeHtml(day.location || "")}</div>
        ${day.image ? `<img src="${escapeHtml(day.image)}" alt="${escapeHtml(day.title || "Day image")}">` : ""}
      </div>
    </div>
  `).join("");

  itineraryDaysBuilder.querySelectorAll(".remove-day-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const current = getItineraryDaysFromUI();
      current.splice(index, 1);
      renderItineraryDaysBuilder(current);
    });
  });

  itineraryDaysBuilder.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => {
      renderItineraryDaysBuilder(getItineraryDaysFromUI());
    });
  });
}
function buildPayload() {
  return {
    slug: document.getElementById("slug").value.trim(),
    title: document.getElementById("title").value.trim(),
    price_label: document.getElementById("price_label").value.trim() || null,
    price_amount: document.getElementById("price_amount").value ? Number(document.getElementById("price_amount").value) : null,
    currency: document.getElementById("currency").value.trim() || "USD",
    duration_nights: document.getElementById("duration_nights").value ? Number(document.getElementById("duration_nights").value) : null,
    duration_label: document.getElementById("duration_label").value.trim() || null,
    region: document.getElementById("region").value.trim() || "Sri Lanka",
    hero_image: document.getElementById("hero_image").value.trim() || null,
    card_image: document.getElementById("card_image").value.trim() || null,
    description: document.getElementById("description").value.trim() || null,
    transport: document.getElementById("transport").value.trim() || null,
    pace: document.getElementById("pace").value.trim() || null,
    best_time: document.getElementById("best_time").value.trim() || null,
    ideal_for: document.getElementById("ideal_for").value.trim() || null,
    tags: parseTags(document.getElementById("tags").value),
    featured_stays: getFeaturedStaysFromUI(),
	itinerary_days: getItineraryDaysFromUI(),
	sort_order: Number(document.getElementById("sort_order").value || 0),
    is_published: document.getElementById("is_published").checked
  };
}

function openNewDialog() {
  resetForm();
  formDialog.showModal();
}

function openEditDialog(row) {
  resetForm();
  fillForm(row);
  formDialog.showModal();
}
addStayBtn?.addEventListener("click", () => {
  const current = getFeaturedStaysFromUI();
  current.push(createStayItem());
  renderFeaturedStaysBuilder(current);
});

addDayBtn?.addEventListener("click", () => {
  const current = getItineraryDaysFromUI();
  current.push(createDayItem({
    day_number: current.length + 1
  }));
  renderItineraryDaysBuilder(current);
});
newItineraryBtn?.addEventListener("click", openNewDialog);

closeFormDialog?.addEventListener("click", () => formDialog.close());
closeViewDialog?.addEventListener("click", () => viewDialog.close());

formDialog?.addEventListener("click", (e) => {
  const rect = formDialog.getBoundingClientRect();
  const inside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  if (!inside) formDialog.close();
});

viewDialog?.addEventListener("click", (e) => {
  const rect = viewDialog.getBoundingClientRect();
  const inside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  if (!inside) viewDialog.close();
});

searchInput?.addEventListener("input", renderTable);

resetBtn?.addEventListener("click", () => {
  resetForm();
});

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  formMessage.textContent = "";

  let payload;
  try {
    payload = buildPayload();
  } catch (error) {
    formMessage.textContent = `Invalid JSON: ${error.message}`;
    return;
  }

  let result;

  if (currentEditingId) {
    result = await window.supabaseClient
      .from("itineraries")
      .update(payload)
      .eq("id", currentEditingId)
      .select()
      .single();
  } else {
    result = await window.supabaseClient
      .from("itineraries")
      .insert(payload)
      .select()
      .single();
  }

  if (result.error) {
    formMessage.textContent = result.error.message;
    return;
  }

  formMessage.textContent = currentEditingId ? "Itinerary updated." : "Itinerary created.";
  await loadItineraries();

  if (result.data) {
    currentEditingId = result.data.id;
    fillForm(result.data);
  }
});

deleteBtn?.addEventListener("click", async () => {
  if (!currentEditingId) return;
  if (!confirm("Delete this itinerary?")) return;

  const { error } = await window.supabaseClient
    .from("itineraries")
    .delete()
    .eq("id", currentEditingId);

  if (error) {
    formMessage.textContent = error.message;
    return;
  }

  formDialog.close();
  resetForm();
  pageMessage.textContent = "Itinerary deleted.";
  await loadItineraries();
});



(async function init() {
  const user = await requireAdmin();
  if (!user) return;
  await loadItineraries();
})();