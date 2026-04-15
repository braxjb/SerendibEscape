const ADMIN_ALLOWED_USER_IDS = [
  "67982a5d-ee33-4e9d-ba9b-9f59b172874c"
];

const els = {
  tableBody: document.getElementById("itinerariesTableBody"),
  tableCount: document.getElementById("tableCount"),
  searchInput: document.getElementById("searchInput"),
  pageMessage: document.getElementById("pageMessage"),

  formDialog: document.getElementById("formDialog"),
  viewDialog: document.getElementById("viewDialog"),

  closeFormDialog: document.getElementById("closeFormDialog"),
  closeViewDialog: document.getElementById("closeViewDialog"),

  formDialogTitle: document.getElementById("formDialogTitle"),
  form: document.getElementById("itineraryForm"),
  formMessage: document.getElementById("formMessage"),
  newItineraryBtn: document.getElementById("newItineraryBtn"),
  deleteBtn: document.getElementById("deleteBtn"),
  resetBtn: document.getElementById("resetBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  viewDialogBody: document.getElementById("viewDialogBody"),
  addStayBtn: document.getElementById("addStayBtn"),
  addDayBtn: document.getElementById("addDayBtn"),
  featuredStaysBuilder: document.getElementById("featuredStaysBuilder"),
  itineraryDaysBuilder: document.getElementById("itineraryDaysBuilder"),

  itineraryId: document.getElementById("itineraryId"),
  slug: document.getElementById("slug"),
  title: document.getElementById("title"),
  priceLabel: document.getElementById("price_label"),
  priceAmount: document.getElementById("price_amount"),
  currency: document.getElementById("currency"),
  durationNights: document.getElementById("duration_nights"),
  durationLabel: document.getElementById("duration_label"),
  region: document.getElementById("region"),
  heroImage: document.getElementById("hero_image"),
  cardImage: document.getElementById("card_image"),
  description: document.getElementById("description"),
  transport: document.getElementById("transport"),
  pace: document.getElementById("pace"),
  bestTime: document.getElementById("best_time"),
  idealFor: document.getElementById("ideal_for"),
  tags: document.getElementById("tags"),
  sortOrder: document.getElementById("sort_order"),
  isPublished: document.getElementById("is_published")
};

const state = {
  allRows: [],
  currentEditingId: null
};

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseTags(value) {
  return String(value || "")
    .split(",")
    .map(tag => tag.trim().toLowerCase())
    .filter(Boolean);
}

function asNumberOrNull(value) {
  if (value === "" || value === null || value === undefined) return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
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

async function requireAdmin() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data.user) {
    window.location.replace("admin-login.html");
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

async function logout() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    window.location.replace("admin-login.html");
  } catch (error) {
    console.error("Logout error:", error);
    els.pageMessage.textContent = "Logout failed. Please try again.";
  }
}

async function loadItineraries() {
  els.tableBody.innerHTML = `
    <tr>
      <td colspan="8" class="loading-cell">Loading itineraries...</td>
    </tr>
  `;
  els.pageMessage.textContent = "";

  const { data, error } = await supabaseClient
    .from("itineraries")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    els.pageMessage.textContent = error.message;
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">Could not load itineraries.</td>
      </tr>
    `;
    return;
  }

  state.allRows = data || [];
  renderTable();
}

function getFilteredRows() {
  const q = String(els.searchInput.value || "").trim().toLowerCase();

  if (!q) return [...state.allRows];

  return state.allRows.filter(row =>
    String(row.title || "").toLowerCase().includes(q) ||
    String(row.slug || "").toLowerCase().includes(q)
  );
}

function renderTable() {
  const rows = getFilteredRows();

  els.tableCount.textContent = `${rows.length} itinerar${rows.length === 1 ? "y" : "ies"}`;

  if (!rows.length) {
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">No itineraries found.</td>
      </tr>
    `;
    return;
  }

  els.tableBody.innerHTML = rows.map(row => `
    <tr>
      <td><span class="cell-title">${escapeHtml(row.title || "")}</span></td>
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
          <button class="btn-table" type="button" data-action="view" data-id="${row.id}">View</button>
          <button class="btn-table" type="button" data-action="edit" data-id="${row.id}">Edit</button>
        </div>
      </td>
    </tr>
  `).join("");

  els.tableBody.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const row = state.allRows.find(item => item.id === id);
      if (!row) return;

      if (btn.dataset.action === "view") openViewDialog(row);
      if (btn.dataset.action === "edit") openEditDialog(row);
    });
  });
}

function openViewDialog(row) {
  els.viewDialogBody.innerHTML = `
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
      <div class="json-preview">${escapeHtml(JSON.stringify(row.tags || [], null, 2))}</div>
    </div>

    <div class="view-block">
      <h3>Featured stays</h3>
      <div class="json-preview">${escapeHtml(JSON.stringify(row.featured_stays || [], null, 2))}</div>
    </div>

    <div class="view-block">
      <h3>Itinerary days</h3>
      <div class="json-preview">${escapeHtml(JSON.stringify(row.itinerary_days || [], null, 2))}</div>
    </div>
  `;

  els.viewDialog.showModal();
}

function setFormDefaults() {
  els.currency.value = "USD";
  els.region.value = "Sri Lanka";
  els.sortOrder.value = 0;
  els.isPublished.checked = true;
}

function resetForm() {
  state.currentEditingId = null;
  els.form.reset();
  setFormDefaults();

  els.formDialogTitle.textContent = "New itinerary";
  els.deleteBtn.style.display = "none";
  els.formMessage.textContent = "";

  renderFeaturedStaysBuilder([]);
  renderItineraryDaysBuilder([]);
}

function fillForm(row) {
  state.currentEditingId = row.id;
  els.formDialogTitle.textContent = "Edit itinerary";
  els.deleteBtn.style.display = "inline-flex";

  els.itineraryId.value = row.id ?? "";
  els.slug.value = row.slug ?? "";
  els.title.value = row.title ?? "";
  els.priceLabel.value = row.price_label ?? "";
  els.priceAmount.value = row.price_amount ?? "";
  els.currency.value = row.currency ?? "USD";
  els.durationNights.value = row.duration_nights ?? "";
  els.durationLabel.value = row.duration_label ?? "";
  els.region.value = row.region ?? "Sri Lanka";
  els.heroImage.value = row.hero_image ?? "";
  els.cardImage.value = row.card_image ?? "";
  els.description.value = row.description ?? "";
  els.transport.value = row.transport ?? "";
  els.pace.value = row.pace ?? "";
  els.bestTime.value = row.best_time ?? "";
  els.idealFor.value = row.ideal_for ?? "";
  els.tags.value = Array.isArray(row.tags) ? row.tags.join(", ") : "";
  els.sortOrder.value = row.sort_order ?? 0;
  els.isPublished.checked = !!row.is_published;

  renderFeaturedStaysBuilder(row.featured_stays || []);
  renderItineraryDaysBuilder(row.itinerary_days || []);

  els.formMessage.textContent = "";
}

function getFeaturedStaysFromUI() {
  return Array.from(els.featuredStaysBuilder.querySelectorAll(".stay-builder-card"))
    .map(card => ({
      name: card.querySelector('[data-field="name"]').value.trim(),
      location: card.querySelector('[data-field="location"]').value.trim(),
      description: card.querySelector('[data-field="description"]').value.trim(),
      image: card.querySelector('[data-field="image"]').value.trim()
    }))
    .filter(item => item.name || item.location || item.description || item.image);
}

function getItineraryDaysFromUI() {
  return Array.from(els.itineraryDaysBuilder.querySelectorAll(".day-builder-card"))
    .map(card => ({
      day_number: asNumberOrNull(card.querySelector('[data-field="day_number"]').value) ?? 0,
      title: card.querySelector('[data-field="title"]').value.trim(),
      location: card.querySelector('[data-field="location"]').value.trim(),
      description: card.querySelector('[data-field="description"]').value.trim(),
      overnight_stay: card.querySelector('[data-field="overnight_stay"]').value.trim(),
      image: card.querySelector('[data-field="image"]').value.trim()
    }))
    .filter(item =>
      item.day_number || item.title || item.location || item.description || item.overnight_stay || item.image
    );
}

function attachBuilderActions() {
  els.featuredStaysBuilder.querySelectorAll(".remove-stay-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const items = getFeaturedStaysFromUI();
      items.splice(index, 1);
      renderFeaturedStaysBuilder(items);
    });
  });

  els.itineraryDaysBuilder.querySelectorAll(".remove-day-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const items = getItineraryDaysFromUI();
      items.splice(index, 1);
      renderItineraryDaysBuilder(items);
    });
  });
}

function renderFeaturedStaysBuilder(items = []) {
  const stays = Array.isArray(items) ? items : [];

  if (!stays.length) {
    els.featuredStaysBuilder.innerHTML = `
      <div class="builder-empty">No featured stays added yet.</div>
    `;
    return;
  }

  els.featuredStaysBuilder.innerHTML = stays.map((stay, index) => `
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
    </div>
  `).join("");

  attachBuilderActions();
}

function renderItineraryDaysBuilder(items = []) {
  const days = Array.isArray(items) ? items : [];

  if (!days.length) {
    els.itineraryDaysBuilder.innerHTML = `
      <div class="builder-empty">No itinerary days added yet.</div>
    `;
    return;
  }

  els.itineraryDaysBuilder.innerHTML = days.map((day, index) => `
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
    </div>
  `).join("");

  attachBuilderActions();
}

function buildPayload() {
  return {
    slug: els.slug.value.trim(),
    title: els.title.value.trim(),
    price_label: els.priceLabel.value.trim() || null,
    price_amount: asNumberOrNull(els.priceAmount.value),
    currency: els.currency.value.trim() || "USD",
    duration_nights: asNumberOrNull(els.durationNights.value),
    duration_label: els.durationLabel.value.trim() || null,
    region: els.region.value.trim() || "Sri Lanka",
    hero_image: els.heroImage.value.trim() || null,
    card_image: els.cardImage.value.trim() || null,
    description: els.description.value.trim() || null,
    transport: els.transport.value.trim() || null,
    pace: els.pace.value.trim() || null,
    best_time: els.bestTime.value.trim() || null,
    ideal_for: els.idealFor.value.trim() || null,
    tags: parseTags(els.tags.value),
    featured_stays: getFeaturedStaysFromUI(),
    itinerary_days: getItineraryDaysFromUI(),
    sort_order: asNumberOrNull(els.sortOrder.value) ?? 0,
    is_published: els.isPublished.checked
  };
}

function openNewDialog() {
  resetForm();
  els.formDialog.showModal();
}

function openEditDialog(row) {
  resetForm();
  fillForm(row);
  els.formDialog.showModal();
}

function closeOnBackdrop(dialog) {
  dialog.addEventListener("click", e => {
    const rect = dialog.getBoundingClientRect();
    const clickedInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!clickedInside) {
      dialog.close();
    }
  });
}

async function saveItinerary(e) {
  e.preventDefault();
  els.formMessage.textContent = "";

  const payload = buildPayload();

  if (!payload.slug || !payload.title) {
    els.formMessage.textContent = "Slug and title are required.";
    return;
  }

  let result;

  if (state.currentEditingId) {
    result = await supabaseClient
      .from("itineraries")
      .update(payload)
      .eq("id", state.currentEditingId)
      .select()
      .single();
  } else {
    result = await supabaseClient
      .from("itineraries")
      .insert(payload)
      .select()
      .single();
  }

  if (result.error) {
    els.formMessage.textContent = result.error.message;
    return;
  }

  els.pageMessage.textContent = state.currentEditingId
    ? "Itinerary updated."
    : "Itinerary created.";

  els.formDialog.close();
  resetForm();
  await loadItineraries();
}

async function deleteItinerary() {
  if (!state.currentEditingId) return;
  if (!window.confirm("Delete this itinerary?")) return;

  const { error } = await supabaseClient
    .from("itineraries")
    .delete()
    .eq("id", state.currentEditingId);

  if (error) {
    els.formMessage.textContent = error.message;
    return;
  }

  els.formDialog.close();
  resetForm();
  els.pageMessage.textContent = "Itinerary deleted.";
  await loadItineraries();
}

function bindEvents() {
  els.logoutBtn?.addEventListener("click", logout);
  els.newItineraryBtn?.addEventListener("click", openNewDialog);
  els.closeFormDialog?.addEventListener("click", () => els.formDialog.close());
  els.closeViewDialog?.addEventListener("click", () => els.viewDialog.close());
  els.searchInput?.addEventListener("input", renderTable);
  els.resetBtn?.addEventListener("click", resetForm);
  els.form?.addEventListener("submit", saveItinerary);
  els.deleteBtn?.addEventListener("click", deleteItinerary);

  els.addStayBtn?.addEventListener("click", () => {
    const items = getFeaturedStaysFromUI();
    items.push(createStayItem());
    renderFeaturedStaysBuilder(items);
  });

  els.addDayBtn?.addEventListener("click", () => {
    const items = getItineraryDaysFromUI();
    items.push(createDayItem({ day_number: items.length + 1 }));
    renderItineraryDaysBuilder(items);
  });

  closeOnBackdrop(els.formDialog);
  closeOnBackdrop(els.viewDialog);
}

(async function init() {
  const user = await requireAdmin();
  if (!user) return;

  bindEvents();
  resetForm();
  await loadItineraries();
})();