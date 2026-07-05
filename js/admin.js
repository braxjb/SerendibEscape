const els = {
  pageMessage: document.getElementById("pageMessage"),

  // Shared header controls
  logoutBtn: document.getElementById("logoutBtn"),
  newItemBtn: document.getElementById("newItemBtn"),

  // Tabs / panels
  tabs: document.querySelectorAll(".admin-tab"),
  itinerariesPanel: document.getElementById("panel-itineraries"),
  blogPostsPanel: document.getElementById("panel-blog-posts"),

  // =========================
  // ITINERARIES
  // =========================
  itineraryTableBody: document.getElementById("itinerariesTableBody"),
  itineraryTableCount: document.getElementById("tableCount"),
  itinerarySearchInput: document.getElementById("searchInput"),

  itineraryFormDialog: document.getElementById("formDialog"),
  itineraryViewDialog: document.getElementById("viewDialog"),

  closeItineraryFormDialog: document.getElementById("closeFormDialog"),
  closeItineraryViewDialog: document.getElementById("closeViewDialog"),

  itineraryFormDialogTitle: document.getElementById("formDialogTitle"),
  itineraryForm: document.getElementById("itineraryForm"),
  itineraryFormMessage: document.getElementById("formMessage"),
  deleteItineraryBtn: document.getElementById("deleteBtn"),
  resetItineraryBtn: document.getElementById("resetBtn"),
  itineraryViewDialogBody: document.getElementById("viewDialogBody"),
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
  isPublished: document.getElementById("is_published"),

  // =========================
  // BLOG POSTS
  // =========================
  blogTableBody: document.getElementById("blogPostsTableBody"),
  blogTableCount: document.getElementById("blogTableCount"),
  blogSearchInput: document.getElementById("blogSearchInput"),
  blogStatusFilter: document.getElementById("blogStatusFilter"),

  blogViewDialog: document.getElementById("blogViewDialog"),
  blogViewDialogBody: document.getElementById("blogViewDialogBody"),
  closeBlogViewDialog: document.getElementById("closeBlogViewDialog"),

  blogFormDialog: document.getElementById("blogFormDialog"),
  blogFormDialogTitle: document.getElementById("blogFormDialogTitle"),
  closeBlogFormDialog: document.getElementById("closeBlogFormDialog"),
  blogForm: document.getElementById("blogPostForm"),
  blogFormMessage: document.getElementById("blogFormMessage"),
  resetBlogBtn: document.getElementById("resetBlogBtn"),
  deleteBlogBtn: document.getElementById("deleteBlogBtn"),
  addBlogSectionBtn: document.getElementById("addBlogSectionBtn"),
  blogSectionsBuilder: document.getElementById("blogSectionsBuilder"),

  blogPostId: document.getElementById("blogPostId"),
  blogSlug: document.getElementById("blog_slug"),
  blogTitle: document.getElementById("blog_title"),
  blogCategory: document.getElementById("blog_category"),
  blogCategoryDisplay: document.getElementById("blog_category_display"),
  blogAuthor: document.getElementById("blog_author"),
  blogLayoutType: document.getElementById("blog_layout_type"),
  blogStatus: document.getElementById("blog_status"),
  blogPublishedAt: document.getElementById("blog_published_at"),
  blogHeroImage: document.getElementById("blog_hero_image"),
  blogCardImage: document.getElementById("blog_card_image"),
  blogExcerpt: document.getElementById("blog_excerpt"),
  blogIntro: document.getElementById("blog_intro"),
  blogBlockquote: document.getElementById("blog_blockquote"),
  blogPullQuote: document.getElementById("blog_pull_quote"),
  blogLeadImage: document.getElementById("blog_lead_image"),
  blogLeadImageAlt: document.getElementById("blog_lead_image_alt"),

  // =========================
  // EXPERIENCES (NEW)
  // =========================
  experienceTableBody: document.getElementById("experiencesTableBody"),
  experienceTableCount: document.getElementById("experienceTableCount"),
  experienceSearchInput: document.getElementById("experienceSearchInput"),
  experienceStatusFilter: document.getElementById("experienceStatusFilter"),

  experienceFormDialog: document.getElementById("experienceFormDialog"),
  experienceViewDialog: document.getElementById("experienceViewDialog"),
  closeExperienceFormDialog: document.getElementById("closeExperienceFormDialog"),
  closeExperienceViewDialog: document.getElementById("closeExperienceViewDialog"),
  experienceFormDialogTitle: document.getElementById("experienceFormDialogTitle"),
  experienceForm: document.getElementById("experienceForm"),
  experienceFormMessage: document.getElementById("experienceFormMessage"),
  deleteExperienceBtn: document.getElementById("deleteExperienceBtn"),
  resetExperienceBtn: document.getElementById("resetExperienceBtn"),
  experienceViewDialogBody: document.getElementById("experienceViewDialogBody"),

  // Experience form fields
  experienceId: document.getElementById("experienceId"),
  expSlug: document.getElementById("expSlug"),
  expTitle: document.getElementById("expTitle"),
  expLocation: document.getElementById("expLocation"),
  expPriceLabel: document.getElementById("expPriceLabel"),
  expPriceAmount: document.getElementById("expPriceAmount"),
  expCurrency: document.getElementById("expCurrency"),
  expDuration: document.getElementById("expDuration"),
  expDurationLabel: document.getElementById("expDurationLabel"),
  expGroupSize: document.getElementById("expGroupSize"),
  expDifficulty: document.getElementById("expDifficulty"),
  expHeroImage: document.getElementById("expHeroImage"),
  expCardImage: document.getElementById("expCardImage"),
  expDescription: document.getElementById("expDescription"),
  expShortDescription: document.getElementById("expShortDescription"),
  expCategories: document.getElementById("expCategories"),
  expTags: document.getElementById("expTags"),
  expUpcomingDate: document.getElementById("expUpcomingDate"),
  expEventDates: document.getElementById("expEventDates"),
  expSpotsRemaining: document.getElementById("expSpotsRemaining"),
  expFeatured: document.getElementById("expFeatured"),
  expSortOrder: document.getElementById("expSortOrder"),
  expIsPublished: document.getElementById("expIsPublished"),

  // Experience builder
  addExperienceDayBtn: document.getElementById("addExperienceDayBtn"),
  experienceDaysBuilder: document.getElementById("experienceDaysBuilder"),
  addIncludedBtn: document.getElementById("addIncludedBtn"),
  includedBuilder: document.getElementById("includedBuilder"),
  addExcludedBtn: document.getElementById("addExcludedBtn"),
  excludedBuilder: document.getElementById("excludedBuilder"),
  addGalleryImageBtn: document.getElementById("addGalleryImageBtn"),
  galleryBuilder: document.getElementById("galleryBuilder"),
};

const state = {
  activeTab: "itineraries",
  itineraries: {
    rows: [],
    currentEditingId: null
  },
  blogPosts: {
    rows: [],
    currentEditingId: null
  },
  experiences: {
    rows: [],
    currentEditingId: null
  }
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

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

function toDatetimeLocalValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// =========================
// AUTH (unchanged)
// =========================
async function requireAdmin() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data.user) {
    window.location.replace("admin-login.html");
    return null;
  }

  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, is_admin")
    .eq("id", data.user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Profile check failed:", profileError);
    document.body.innerHTML = `
      <main style="padding:40px;font-family:Arial,sans-serif;">
        <h1>Access denied</h1>
        <p>Could not verify admin profile.</p>
      </main>
    `;
    return null;
  }

  if (!profile || profile.is_admin !== true) {
    document.body.innerHTML = `
      <main style="padding:40px;font-family:Arial,sans-serif;">
        <h1>Access denied</h1>
        <p>This account is not allowed to manage content.</p>
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

// =========================
// TABS (updated to include Experiences)
// =========================
function switchTab(tab) {
  state.activeTab = tab;

  els.tabs.forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.tab === tab);
  });

  const isItineraries = tab === "itineraries";
  const isBlogPosts = tab === "blog_posts";
  const isExperiences = tab === "experiences";

  if (els.itinerariesPanel) els.itinerariesPanel.hidden = !isItineraries;
  if (els.blogPostsPanel) els.blogPostsPanel.hidden = !isBlogPosts;
  const experiencesPanel = document.getElementById("panel-experiences");
  if (experiencesPanel) experiencesPanel.hidden = !isExperiences;

  if (els.newItemBtn) {
    if (isItineraries) els.newItemBtn.textContent = "+ New Itinerary";
    else if (isExperiences) els.newItemBtn.textContent = "+ New Experience";
    else els.newItemBtn.textContent = "+ New Blog Post";
  }
}

// =========================
// ITINERARY HELPERS (unchanged)
// =========================
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

function attachItineraryBuilderActions() {
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

  attachItineraryBuilderActions();
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

  attachItineraryBuilderActions();
}

function buildItineraryPayload() {
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

function setItineraryFormDefaults() {
  els.currency.value = "USD";
  els.region.value = "Sri Lanka";
  els.sortOrder.value = 0;
  els.isPublished.checked = true;
}

function resetItineraryForm() {
  state.itineraries.currentEditingId = null;
  els.itineraryForm.reset();
  setItineraryFormDefaults();

  els.itineraryFormDialogTitle.textContent = "New itinerary";
  els.deleteItineraryBtn.style.display = "none";
  els.itineraryFormMessage.textContent = "";

  renderFeaturedStaysBuilder([]);
  renderItineraryDaysBuilder([]);
}

function fillItineraryForm(row) {
  state.itineraries.currentEditingId = row.id;
  els.itineraryFormDialogTitle.textContent = "Edit itinerary";
  els.deleteItineraryBtn.style.display = "inline-flex";

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
  els.itineraryFormMessage.textContent = "";
}

function openNewItineraryDialog() {
  resetItineraryForm();
  els.itineraryFormDialog.showModal();
}

function openItineraryEditDialog(row) {
  resetItineraryForm();
  if (row && row.id) {
    fillItineraryForm(row);
  }
  els.itineraryFormDialog.showModal();
}

function openItineraryViewDialog(row) {
  els.itineraryViewDialogBody.innerHTML = `
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

  els.itineraryViewDialog.showModal();
}

async function loadItineraries() {
  els.itineraryTableBody.innerHTML = `
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
    els.itineraryTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">Could not load itineraries.</td>
      </tr>
    `;
    return;
  }

  state.itineraries.rows = data || [];
  renderItinerariesTable();
}

function getFilteredItineraries() {
  const q = String(els.itinerarySearchInput.value || "").trim().toLowerCase();

  if (!q) return [...state.itineraries.rows];

  return state.itineraries.rows.filter(row =>
    String(row.title || "").toLowerCase().includes(q) ||
    String(row.slug || "").toLowerCase().includes(q)
  );
}

function renderItinerariesTable() {
  const rows = getFilteredItineraries();

  els.itineraryTableCount.textContent = `${rows.length} itinerar${rows.length === 1 ? "y" : "ies"}`;

  if (!rows.length) {
    els.itineraryTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">No itineraries found.</td>
      </tr>
    `;
    return;
  }

  els.itineraryTableBody.innerHTML = rows.map(row => `
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
          <button class="btn-table" type="button" data-itinerary-action="view" data-id="${row.id}">View</button>
          <button class="btn-table" type="button" data-itinerary-action="edit" data-id="${row.id}">Edit</button>
        </div>
      </td>
    </tr>
  `).join("");

  els.itineraryTableBody.querySelectorAll("[data-itinerary-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const row = state.itineraries.rows.find(item => item.id === id);
      if (!row) return;

      if (btn.dataset.itineraryAction === "view") openItineraryViewDialog(row);
      if (btn.dataset.itineraryAction === "edit") openItineraryEditDialog(row);
    });
  });
}

async function saveItinerary(e) {
  e.preventDefault();
  els.itineraryFormMessage.textContent = "";

  const payload = buildItineraryPayload();

  if (!payload.slug || !payload.title) {
    els.itineraryFormMessage.textContent = "Slug and title are required.";
    return;
  }

  let result;

  if (state.itineraries.currentEditingId) {
    result = await supabaseClient
      .from("itineraries")
      .update(payload)
      .eq("id", state.itineraries.currentEditingId)
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
    els.itineraryFormMessage.textContent = result.error.message;
    return;
  }

  const wasEditing = !!state.itineraries.currentEditingId;

  els.pageMessage.textContent = wasEditing
    ? "Itinerary updated."
    : "Itinerary created.";

  els.itineraryFormDialog.close();
  resetItineraryForm();
  await loadItineraries();
}

async function deleteItinerary() {
  if (!state.itineraries.currentEditingId) return;
  if (!window.confirm("Delete this itinerary?")) return;

  const { error } = await supabaseClient
    .from("itineraries")
    .delete()
    .eq("id", state.itineraries.currentEditingId);

  if (error) {
    els.itineraryFormMessage.textContent = error.message;
    return;
  }

  els.itineraryFormDialog.close();
  resetItineraryForm();
  els.pageMessage.textContent = "Itinerary deleted.";
  await loadItineraries();
}

// =========================
// BLOG HELPERS (unchanged)
// =========================
function createBlogSectionItem(data = {}) {
  return {
    heading: data.heading || "",
    paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs : [""],
    image: data.image || "",
    imageAlt: data.imageAlt || "",
    pullQuote: data.pullQuote || ""
  };
}

function setBlogFormDefaults() {
  els.blogLayoutType.value = "standard";
  els.blogStatus.value = "draft";
  els.blogPublishedAt.value = "";
}

function resetBlogForm() {
  state.blogPosts.currentEditingId = null;
  els.blogForm.reset();
  setBlogFormDefaults();

  els.blogFormDialogTitle.textContent = "New blog post";
  els.deleteBlogBtn.style.display = "none";
  els.blogFormMessage.textContent = "";

  renderBlogSectionsBuilder([]);
}

function fillBlogForm(row) {
  state.blogPosts.currentEditingId = row.id;
  els.blogFormDialogTitle.textContent = "Edit blog post";
  els.deleteBlogBtn.style.display = "inline-flex";

  const content = row.content || {};

  els.blogPostId.value = row.id ?? "";
  els.blogSlug.value = row.slug ?? "";
  els.blogTitle.value = row.title ?? "";
  els.blogCategory.value = row.category ?? "";
  els.blogCategoryDisplay.value = row.category_display ?? "";
  els.blogAuthor.value = row.author ?? "";
  els.blogLayoutType.value = row.layout_type ?? "standard";
  els.blogStatus.value = row.status ?? "draft";
  els.blogPublishedAt.value = toDatetimeLocalValue(row.published_at);
  els.blogHeroImage.value = row.hero_image ?? "";
  els.blogCardImage.value = row.card_image ?? "";
  els.blogExcerpt.value = row.excerpt ?? "";
  els.blogIntro.value = content.intro ?? "";
  els.blogBlockquote.value = content.blockquote ?? "";
  els.blogPullQuote.value = content.pullQuote ?? "";
  els.blogLeadImage.value = content.leadImage ?? "";
  els.blogLeadImageAlt.value = content.leadImageAlt ?? "";

  renderBlogSectionsBuilder(Array.isArray(content.sections) ? content.sections : []);
  els.blogFormMessage.textContent = "";
}

function openNewBlogDialog() {
  resetBlogForm();
  els.blogFormDialog.showModal();
}

function openBlogEditDialog(row) {
  resetBlogForm();
  if (row && row.id) {
    fillBlogForm(row);
  }
  els.blogFormDialog.showModal();
}

function openBlogViewDialog(row) {
  els.blogViewDialogBody.innerHTML = `
    <div class="view-block">
      <h3>Basic details</h3>
      <div class="view-grid">
        <div class="view-item"><strong>Title</strong><span>${escapeHtml(row.title || "")}</span></div>
        <div class="view-item"><strong>Slug</strong><span>${escapeHtml(row.slug || "")}</span></div>
        <div class="view-item"><strong>Category</strong><span>${escapeHtml(row.category || "-")}</span></div>
        <div class="view-item"><strong>Category label</strong><span>${escapeHtml(row.category_display || "-")}</span></div>
        <div class="view-item"><strong>Layout</strong><span>${escapeHtml(row.layout_type || "-")}</span></div>
        <div class="view-item"><strong>Author</strong><span>${escapeHtml(row.author || "-")}</span></div>
        <div class="view-item"><strong>Status</strong><span>${escapeHtml(row.status || "-")}</span></div>
        <div class="view-item"><strong>Published at</strong><span>${formatDateTime(row.published_at)}</span></div>
      </div>
    </div>

    <div class="view-block">
      <h3>Excerpt</h3>
      <div>${escapeHtml(row.excerpt || "-")}</div>
    </div>

    <div class="view-block">
      <h3>Images</h3>
      <div class="view-grid">
        <div class="view-item"><strong>Hero image</strong><span>${escapeHtml(row.hero_image || "-")}</span></div>
        <div class="view-item"><strong>Card image</strong><span>${escapeHtml(row.card_image || "-")}</span></div>
      </div>
    </div>

    <div class="view-block">
      <h3>Structured content</h3>
      <div class="json-preview">${escapeHtml(JSON.stringify(row.content || {}, null, 2))}</div>
    </div>
  `;

  els.blogViewDialog.showModal();
}

function getBlogSectionsFromUI() {
  return Array.from(els.blogSectionsBuilder.querySelectorAll(".blog-section-card"))
    .map(card => ({
      heading: card.querySelector('[data-field="heading"]').value.trim(),
      paragraphs: Array.from(card.querySelectorAll('[data-field="paragraph"]'))
        .map(textarea => textarea.value.trim())
        .filter(Boolean),
      image: card.querySelector('[data-field="image"]').value.trim(),
      imageAlt: card.querySelector('[data-field="imageAlt"]').value.trim(),
      pullQuote: card.querySelector('[data-field="pullQuote"]').value.trim()
    }))
    .filter(section =>
      section.heading ||
      section.paragraphs.length ||
      section.image ||
      section.imageAlt ||
      section.pullQuote
    );
}

function attachBlogBuilderActions() {
  els.blogSectionsBuilder.querySelectorAll(".remove-blog-section-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const items = getBlogSectionsFromUI();
      items.splice(index, 1);
      renderBlogSectionsBuilder(items);
    });
  });

  els.blogSectionsBuilder.querySelectorAll(".add-blog-paragraph-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const items = getBlogSectionsFromUI();
      if (!items[index]) return;
      items[index].paragraphs.push("");
      renderBlogSectionsBuilder(items);
    });
  });

  els.blogSectionsBuilder.querySelectorAll(".remove-blog-paragraph-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const sectionIndex = Number(btn.dataset.sectionIndex);
      const paragraphIndex = Number(btn.dataset.paragraphIndex);
      const items = getBlogSectionsFromUI();
      if (!items[sectionIndex]) return;
      items[sectionIndex].paragraphs.splice(paragraphIndex, 1);
      renderBlogSectionsBuilder(items);
    });
  });
}

function renderBlogSectionsBuilder(items = []) {
  const sections = Array.isArray(items) ? items : [];

  if (!sections.length) {
    els.blogSectionsBuilder.innerHTML = `
      <div class="builder-empty">No content sections added yet.</div>
    `;
    return;
  }

  els.blogSectionsBuilder.innerHTML = sections.map((section, sectionIndex) => `
    <div class="builder-card blog-section-card" data-index="${sectionIndex}">
      <div class="builder-card-head">
        <div class="builder-card-title">Section ${sectionIndex + 1}</div>
        <div class="action-group">
          <button type="button" class="btn-table add-blog-paragraph-btn" data-index="${sectionIndex}">+ Paragraph</button>
          <button type="button" class="btn-table remove-blog-section-btn" data-index="${sectionIndex}">Remove</button>
        </div>
      </div>

      <div class="builder-grid-2">
        <div class="form-row">
          <label>Heading</label>
          <input type="text" data-field="heading" value="${escapeHtml(section.heading || "")}">
        </div>
        <div class="form-row">
          <label>Section pull quote</label>
          <input type="text" data-field="pullQuote" value="${escapeHtml(section.pullQuote || "")}">
        </div>
      </div>

      <div class="builder-grid-2">
        <div class="form-row">
          <label>Image URL</label>
          <input type="text" data-field="image" value="${escapeHtml(section.image || "")}">
        </div>
        <div class="form-row">
          <label>Image alt</label>
          <input type="text" data-field="imageAlt" value="${escapeHtml(section.imageAlt || "")}">
        </div>
      </div>

      <div class="paragraphs-list">
        ${(Array.isArray(section.paragraphs) ? section.paragraphs : []).map((paragraph, paragraphIndex) => `
          <div class="paragraph-item">
            <div class="paragraph-top">
              <strong>Paragraph ${paragraphIndex + 1}</strong>
              <button
                type="button"
                class="btn-table remove-blog-paragraph-btn"
                data-section-index="${sectionIndex}"
                data-paragraph-index="${paragraphIndex}"
              >
                Remove
              </button>
            </div>
            <textarea rows="4" data-field="paragraph">${escapeHtml(paragraph || "")}</textarea>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  attachBlogBuilderActions();
}

function buildBlogPayload() {
  const content = {
    intro: els.blogIntro.value.trim() || "",
    blockquote: els.blogBlockquote.value.trim() || "",
    pullQuote: els.blogPullQuote.value.trim() || "",
    leadImage: els.blogLeadImage.value.trim() || "",
    leadImageAlt: els.blogLeadImageAlt.value.trim() || "",
    sections: getBlogSectionsFromUI()
  };

  return {
    slug: els.blogSlug.value.trim(),
    title: els.blogTitle.value.trim(),
    category: els.blogCategory.value.trim() || null,
    category_display: els.blogCategoryDisplay.value.trim() || null,
    excerpt: els.blogExcerpt.value.trim() || null,
    author: els.blogAuthor.value.trim() || null,
    hero_image: els.blogHeroImage.value.trim() || null,
    card_image: els.blogCardImage.value.trim() || null,
    layout_type: els.blogLayoutType.value,
    content,
    status: els.blogStatus.value,
    published_at: els.blogPublishedAt.value ? new Date(els.blogPublishedAt.value).toISOString() : null
  };
}

async function loadBlogPosts() {
  if (!els.blogTableBody) return;

  els.blogTableBody.innerHTML = `
    <tr>
      <td colspan="8" class="loading-cell">Loading blog posts...</td>
    </tr>
  `;

  const { data, error } = await supabaseClient
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    els.blogTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">Could not load blog posts.</td>
      </tr>
    `;
    els.pageMessage.textContent = error.message;
    return;
  }

  state.blogPosts.rows = data || [];
  renderBlogPostsTable();
}

function getFilteredBlogPosts() {
  const q = String(els.blogSearchInput?.value || "").trim().toLowerCase();
  const status = String(els.blogStatusFilter?.value || "").trim();

  return state.blogPosts.rows.filter(row => {
    const matchesSearch =
      !q ||
      String(row.title || "").toLowerCase().includes(q) ||
      String(row.slug || "").toLowerCase().includes(q) ||
      String(row.author || "").toLowerCase().includes(q);

    const matchesStatus = !status || String(row.status || "") === status;

    return matchesSearch && matchesStatus;
  });
}

function renderBlogPostsTable() {
  if (!els.blogTableBody) return;

  const rows = getFilteredBlogPosts();

  if (els.blogTableCount) {
    els.blogTableCount.textContent = `${rows.length} post${rows.length === 1 ? "" : "s"}`;
  }

  if (!rows.length) {
    els.blogTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">No blog posts found.</td>
      </tr>
    `;
    return;
  }

  els.blogTableBody.innerHTML = rows.map(row => `
    <tr>
      <td><span class="cell-title">${escapeHtml(row.title || "")}</span></td>
      <td>${escapeHtml(row.slug || "")}</td>
      <td>${escapeHtml(row.layout_type || "standard")}</td>
      <td>${escapeHtml(row.author || "-")}</td>
      <td>
        <span class="status-pill ${row.status === "published" ? "published" : "draft"}">
          ${row.status === "published" ? "Published" : "Draft"}
        </span>
      </td>
      <td>${formatDateTime(row.published_at)}</td>
      <td>${formatDateTime(row.updated_at)}</td>
      <td>
        <div class="action-group">
          <button class="btn-table" type="button" data-blog-action="view" data-id="${row.id}">View</button>
          <button class="btn-table" type="button" data-blog-action="edit" data-id="${row.id}">Edit</button>
        </div>
      </td>
    </tr>
  `).join("");

  els.blogTableBody.querySelectorAll("[data-blog-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = state.blogPosts.rows.find(item => String(item.id) === String(btn.dataset.id));
      if (!row) return;

      if (btn.dataset.blogAction === "view") openBlogViewDialog(row);
      if (btn.dataset.blogAction === "edit") openBlogEditDialog(row);
    });
  });
}

async function saveBlogPost(e) {
  e.preventDefault();
  els.blogFormMessage.textContent = "";

  const payload = buildBlogPayload();

  if (!payload.slug || !payload.title) {
    els.blogFormMessage.textContent = "Slug and title are required.";
    return;
  }

  if (!payload.content.intro) {
    els.blogFormMessage.textContent = "Intro is required.";
    return;
  }

  let result;

  if (state.blogPosts.currentEditingId) {
    result = await supabaseClient
      .from("blog_posts")
      .update(payload)
      .eq("id", state.blogPosts.currentEditingId)
      .select()
      .single();
  } else {
    result = await supabaseClient
      .from("blog_posts")
      .insert(payload)
      .select()
      .single();
  }

  if (result.error) {
    els.blogFormMessage.textContent = result.error.message;
    return;
  }

  const wasEditing = !!state.blogPosts.currentEditingId;

  els.blogFormDialog.close();
  resetBlogForm();
  els.pageMessage.textContent = wasEditing ? "Blog post updated." : "Blog post created.";
  await loadBlogPosts();
}

async function deleteBlogPost() {
  if (!state.blogPosts.currentEditingId) return;
  if (!window.confirm("Delete this blog post?")) return;

  const { error } = await supabaseClient
    .from("blog_posts")
    .delete()
    .eq("id", state.blogPosts.currentEditingId);

  if (error) {
    els.blogFormMessage.textContent = error.message;
    return;
  }

  els.blogFormDialog.close();
  resetBlogForm();
  els.pageMessage.textContent = "Blog post deleted.";
  await loadBlogPosts();
}

// =========================
// EXPERIENCE HELPERS (NEW)
// =========================

function createExperienceDayItem(data = {}) {
  return {
    day_number: data.day_number ?? "",
    title: data.title || "",
    location: data.location || "",
    description: data.description || "",
    overnight_stay: data.overnight_stay || "",
    image: data.image || ""
  };
}

function getExperienceDaysFromUI() {
  return Array.from(els.experienceDaysBuilder.querySelectorAll(".exp-day-builder-card"))
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

function getIncludedFromUI() {
  return Array.from(els.includedBuilder.querySelectorAll('.included-item'))
    .map(input => input.value.trim())
    .filter(Boolean);
}

function getExcludedFromUI() {
  return Array.from(els.excludedBuilder.querySelectorAll('.excluded-item'))
    .map(input => input.value.trim())
    .filter(Boolean);
}

function getGalleryImagesFromUI() {
  return Array.from(els.galleryBuilder.querySelectorAll('.gallery-image-item'))
    .map(input => input.value.trim())
    .filter(Boolean);
}

function attachExperienceBuilderActions() {
  // Experience days
  els.experienceDaysBuilder.querySelectorAll(".remove-exp-day-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const items = getExperienceDaysFromUI();
      items.splice(index, 1);
      renderExperienceDaysBuilder(items);
    });
  });

  // Included items
  els.includedBuilder.querySelectorAll(".remove-included-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const items = getIncludedFromUI();
      items.splice(index, 1);
      renderIncludedBuilder(items);
    });
  });

  // Excluded items
  els.excludedBuilder.querySelectorAll(".remove-excluded-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const items = getExcludedFromUI();
      items.splice(index, 1);
      renderExcludedBuilder(items);
    });
  });

  // Gallery images
  els.galleryBuilder.querySelectorAll(".remove-gallery-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      const items = getGalleryImagesFromUI();
      items.splice(index, 1);
      renderGalleryBuilder(items);
    });
  });
}

function renderExperienceDaysBuilder(items = []) {
  const days = Array.isArray(items) ? items : [];

  if (!days.length) {
    els.experienceDaysBuilder.innerHTML = `
      <div class="builder-empty">No itinerary days added yet.</div>
    `;
    return;
  }

  els.experienceDaysBuilder.innerHTML = days.map((day, index) => `
    <div class="builder-card exp-day-builder-card" data-index="${index}">
      <div class="builder-card-head">
        <div class="builder-card-title">Day ${escapeHtml(day.day_number || index + 1)}</div>
        <div class="builder-card-actions">
          <button type="button" class="btn-table remove-exp-day-btn" data-index="${index}">Remove</button>
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

  attachExperienceBuilderActions();
}

function renderIncludedBuilder(items = []) {
  const list = Array.isArray(items) ? items : [];

  if (!list.length) {
    els.includedBuilder.innerHTML = `
      <div class="builder-empty">No included items added yet.</div>
    `;
    return;
  }

  els.includedBuilder.innerHTML = list.map((item, index) => `
    <div class="builder-item included-item-wrapper">
      <input type="text" class="included-item" value="${escapeHtml(item)}" placeholder="e.g., Experienced local guide">
      <button type="button" class="btn-table remove-included-btn" data-index="${index}">✕</button>
    </div>
  `).join("");

  attachExperienceBuilderActions();
}

function renderExcludedBuilder(items = []) {
  const list = Array.isArray(items) ? items : [];

  if (!list.length) {
    els.excludedBuilder.innerHTML = `
      <div class="builder-empty">No excluded items added yet.</div>
    `;
    return;
  }

  els.excludedBuilder.innerHTML = list.map((item, index) => `
    <div class="builder-item excluded-item-wrapper">
      <input type="text" class="excluded-item" value="${escapeHtml(item)}" placeholder="e.g., International flights">
      <button type="button" class="btn-table remove-excluded-btn" data-index="${index}">✕</button>
    </div>
  `).join("");

  attachExperienceBuilderActions();
}

function renderGalleryBuilder(items = []) {
  const list = Array.isArray(items) ? items : [];

  if (!list.length) {
    els.galleryBuilder.innerHTML = `
      <div class="builder-empty">No gallery images added yet.</div>
    `;
    return;
  }

  els.galleryBuilder.innerHTML = list.map((item, index) => `
    <div class="builder-item gallery-item-wrapper">
      <input type="text" class="gallery-image-item" value="${escapeHtml(item)}" placeholder="https://example.com/image.jpg">
      <button type="button" class="btn-table remove-gallery-btn" data-index="${index}">✕</button>
    </div>
  `).join("");

  attachExperienceBuilderActions();
}

function buildExperiencePayload() {
  return {
    slug: els.expSlug.value.trim(),
    title: els.expTitle.value.trim(),
    location: els.expLocation.value.trim() || null,
    price_label: els.expPriceLabel.value.trim() || null,
    price_amount: asNumberOrNull(els.expPriceAmount.value),
    currency: els.expCurrency.value.trim() || "USD",
    duration: els.expDuration.value.trim() || null,
    duration_label: els.expDurationLabel.value.trim() || null,
    group_size: els.expGroupSize.value || null,
    difficulty: els.expDifficulty.value || "moderate",
    hero_image: els.expHeroImage.value.trim() || null,
    card_image: els.expCardImage.value.trim() || null,
    description: els.expDescription.value.trim() || null,
    short_description: els.expShortDescription.value.trim() || null,
    categories: parseTags(els.expCategories.value),
    tags: parseTags(els.expTags.value),
    upcoming_date: els.expUpcomingDate.value || null,
    event_dates: els.expEventDates.value ? 
      els.expEventDates.value.split(",").map(d => d.trim()).filter(Boolean) : [],
    spots_remaining: asNumberOrNull(els.expSpotsRemaining.value) ?? 0,
    featured: els.expFeatured.value === "true",
    itinerary_days: getExperienceDaysFromUI(),
    included: getIncludedFromUI(),
    excluded: getExcludedFromUI(),
    gallery_images: getGalleryImagesFromUI(),
    sort_order: asNumberOrNull(els.expSortOrder.value) ?? 0,
    is_published: els.expIsPublished.checked
  };
}

function setExperienceFormDefaults() {
  els.expCurrency.value = "USD";
  els.expDifficulty.value = "moderate";
  els.expGroupSize.value = "Small (2-6)";
  els.expFeatured.value = "false";
  els.expSortOrder.value = 0;
  els.expIsPublished.checked = true;
  els.expSpotsRemaining.value = 10;
}

function resetExperienceForm() {
  state.experiences.currentEditingId = null;
  els.experienceForm.reset();
  setExperienceFormDefaults();

  els.experienceFormDialogTitle.textContent = "New Experience";
  els.deleteExperienceBtn.style.display = "none";
  els.experienceFormMessage.textContent = "";

  renderExperienceDaysBuilder([]);
  renderIncludedBuilder([]);
  renderExcludedBuilder([]);
  renderGalleryBuilder([]);
}

function fillExperienceForm(row) {
  state.experiences.currentEditingId = row.id;
  els.experienceFormDialogTitle.textContent = "Edit Experience";
  els.deleteExperienceBtn.style.display = "inline-flex";

  els.experienceId.value = row.id ?? "";
  els.expSlug.value = row.slug ?? "";
  els.expTitle.value = row.title ?? "";
  els.expLocation.value = row.location ?? "";
  els.expPriceLabel.value = row.price_label ?? "";
  els.expPriceAmount.value = row.price_amount ?? "";
  els.expCurrency.value = row.currency ?? "USD";
  els.expDuration.value = row.duration ?? "";
  els.expDurationLabel.value = row.duration_label ?? "";
  els.expGroupSize.value = row.group_size || "Small (2-6)";
  els.expDifficulty.value = row.difficulty || "moderate";
  els.expHeroImage.value = row.hero_image ?? "";
  els.expCardImage.value = row.card_image ?? "";
  els.expDescription.value = row.description ?? "";
  els.expShortDescription.value = row.short_description ?? "";
  els.expCategories.value = Array.isArray(row.categories) ? row.categories.join(", ") : "";
  els.expTags.value = Array.isArray(row.tags) ? row.tags.join(", ") : "";
  els.expUpcomingDate.value = row.upcoming_date || "";
  els.expEventDates.value = Array.isArray(row.event_dates) ? row.event_dates.join(", ") : "";
  els.expSpotsRemaining.value = row.spots_remaining ?? 0;
  els.expFeatured.value = row.featured ? "true" : "false";
  els.expSortOrder.value = row.sort_order ?? 0;
  els.expIsPublished.checked = !!row.is_published;

  renderExperienceDaysBuilder(row.itinerary_days || []);
  renderIncludedBuilder(row.included || []);
  renderExcludedBuilder(row.excluded || []);
  renderGalleryBuilder(row.gallery_images || []);
  els.experienceFormMessage.textContent = "";
}

function openNewExperienceDialog() {
  resetExperienceForm();
  els.experienceFormDialog.showModal();
}

function openExperienceEditDialog(row) {
  resetExperienceForm();
  if (row && row.id) {
    fillExperienceForm(row);
  }
  els.experienceFormDialog.showModal();
}

function openExperienceViewDialog(row) {
  els.experienceViewDialogBody.innerHTML = `
    <div class="view-block">
      <h3>Basic details</h3>
      <div class="view-grid">
        <div class="view-item"><strong>Title</strong><span>${escapeHtml(row.title || "")}</span></div>
        <div class="view-item"><strong>Slug</strong><span>${escapeHtml(row.slug || "")}</span></div>
        <div class="view-item"><strong>Location</strong><span>${escapeHtml(row.location || "-")}</span></div>
        <div class="view-item"><strong>Price</strong><span>${escapeHtml(row.price_label || "-")}</span></div>
        <div class="view-item"><strong>Duration</strong><span>${escapeHtml(row.duration || "-")}</span></div>
        <div class="view-item"><strong>Difficulty</strong><span>${escapeHtml(row.difficulty || "-")}</span></div>
        <div class="view-item"><strong>Group Size</strong><span>${escapeHtml(row.group_size || "-")}</span></div>
        <div class="view-item"><strong>Spots Remaining</strong><span>${escapeHtml(row.spots_remaining ?? 0)}</span></div>
        <div class="view-item"><strong>Featured</strong><span>${row.featured ? "Yes" : "No"}</span></div>
        <div class="view-item"><strong>Published</strong><span>${row.is_published ? "Yes" : "No"}</span></div>
        <div class="view-item"><strong>Sort order</strong><span>${escapeHtml(row.sort_order ?? 0)}</span></div>
        <div class="view-item"><strong>Upcoming Date</strong><span>${row.upcoming_date || "-"}</span></div>
      </div>
    </div>

    <div class="view-block">
      <h3>Description</h3>
      <div>${escapeHtml(row.description || "-")}</div>
    </div>

    <div class="view-block">
      <h3>Short Description</h3>
      <div>${escapeHtml(row.short_description || "-")}</div>
    </div>

    <div class="view-block">
      <h3>Images</h3>
      <div class="view-grid">
        <div class="view-item"><strong>Hero image</strong><span>${escapeHtml(row.hero_image || "-")}</span></div>
        <div class="view-item"><strong>Card image</strong><span>${escapeHtml(row.card_image || "-")}</span></div>
      </div>
    </div>

    <div class="view-block">
      <h3>Categories & Tags</h3>
      <div class="view-grid">
        <div class="view-item"><strong>Categories</strong><span>${escapeHtml(Array.isArray(row.categories) ? row.categories.join(", ") : "-")}</span></div>
        <div class="view-item"><strong>Tags</strong><span>${escapeHtml(Array.isArray(row.tags) ? row.tags.join(", ") : "-")}</span></div>
      </div>
    </div>

    <div class="view-block">
      <h3>Event Dates</h3>
      <div>${escapeHtml(Array.isArray(row.event_dates) ? row.event_dates.join(", ") : "-")}</div>
    </div>

    <div class="view-block">
      <h3>Itinerary Days</h3>
      <div class="json-preview">${escapeHtml(JSON.stringify(row.itinerary_days || [], null, 2))}</div>
    </div>

    <div class="view-block">
      <h3>Included / Excluded</h3>
      <div class="view-grid">
        <div class="view-item"><strong>Included</strong><span>${escapeHtml(Array.isArray(row.included) ? row.included.join(", ") : "-")}</span></div>
        <div class="view-item"><strong>Excluded</strong><span>${escapeHtml(Array.isArray(row.excluded) ? row.excluded.join(", ") : "-")}</span></div>
      </div>
    </div>

    <div class="view-block">
      <h3>Gallery Images</h3>
      <div>${escapeHtml(Array.isArray(row.gallery_images) ? row.gallery_images.join(", ") : "-")}</div>
    </div>
  `;

  els.experienceViewDialog.showModal();
}

async function loadExperiences() {
  if (!els.experienceTableBody) return;

  els.experienceTableBody.innerHTML = `
    <tr>
      <td colspan="8" class="loading-cell">Loading experiences...</td>
    </tr>
  `;

  const { data, error } = await supabaseClient
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    els.experienceTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">Could not load experiences.</td>
      </tr>
    `;
    els.pageMessage.textContent = error.message;
    return;
  }

  state.experiences.rows = data || [];
  renderExperiencesTable();
}

function getFilteredExperiences() {
  const q = String(els.experienceSearchInput?.value || "").trim().toLowerCase();
  const status = String(els.experienceStatusFilter?.value || "").trim();

  return state.experiences.rows.filter(row => {
    const matchesSearch =
      !q ||
      String(row.title || "").toLowerCase().includes(q) ||
      String(row.slug || "").toLowerCase().includes(q) ||
      String(row.location || "").toLowerCase().includes(q);

    const matchesStatus = !status || 
      (status === "published" && row.is_published) ||
      (status === "draft" && !row.is_published);

    return matchesSearch && matchesStatus;
  });
}

function renderExperiencesTable() {
  if (!els.experienceTableBody) return;

  const rows = getFilteredExperiences();

  if (els.experienceTableCount) {
    els.experienceTableCount.textContent = `${rows.length} experience${rows.length === 1 ? "" : "s"}`;
  }

  if (!rows.length) {
    els.experienceTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="loading-cell">No experiences found.</td>
      </tr>
    `;
    return;
  }

  els.experienceTableBody.innerHTML = rows.map(row => `
    <tr>
      <td><span class="cell-title">${escapeHtml(row.title || "")}</span></td>
      <td>${escapeHtml(row.slug || "")}</td>
      <td>${escapeHtml(row.location || "-")}</td>
      <td>${escapeHtml(row.price_label || "-")}</td>
      <td>${escapeHtml(row.duration || "-")}</td>
      <td>
        <span class="status-pill ${row.difficulty === "challenging" ? "published" : "draft"}">
          ${escapeHtml(row.difficulty || "moderate")}
        </span>
      </td>
      <td>
        <span class="status-pill ${row.is_published ? "published" : "draft"}">
          ${row.is_published ? "Published" : "Draft"}
        </span>
      </td>
      <td>
        <div class="action-group">
          <button class="btn-table" type="button" data-experience-action="view" data-id="${row.id}">View</button>
          <button class="btn-table" type="button" data-experience-action="edit" data-id="${row.id}">Edit</button>
        </div>
      </td>
    </tr>
  `).join("");

  els.experienceTableBody.querySelectorAll("[data-experience-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = state.experiences.rows.find(item => String(item.id) === String(btn.dataset.id));
      if (!row) return;

      if (btn.dataset.experienceAction === "view") openExperienceViewDialog(row);
      if (btn.dataset.experienceAction === "edit") openExperienceEditDialog(row);
    });
  });
}

async function saveExperience(e) {
  e.preventDefault();
  els.experienceFormMessage.textContent = "";

  const payload = buildExperiencePayload();

  if (!payload.slug || !payload.title) {
    els.experienceFormMessage.textContent = "Slug and title are required.";
    return;
  }

  let result;

  if (state.experiences.currentEditingId) {
    result = await supabaseClient
      .from("experiences")
      .update(payload)
      .eq("id", state.experiences.currentEditingId)
      .select()
      .single();
  } else {
    result = await supabaseClient
      .from("experiences")
      .insert(payload)
      .select()
      .single();
  }

  if (result.error) {
    els.experienceFormMessage.textContent = result.error.message;
    return;
  }

  const wasEditing = !!state.experiences.currentEditingId;

  els.experienceFormDialog.close();
  resetExperienceForm();
  els.pageMessage.textContent = wasEditing ? "Experience updated." : "Experience created.";
  await loadExperiences();
}

async function deleteExperience() {
  if (!state.experiences.currentEditingId) return;
  if (!window.confirm("Delete this experience?")) return;

  const { error } = await supabaseClient
    .from("experiences")
    .delete()
    .eq("id", state.experiences.currentEditingId);

  if (error) {
    els.experienceFormMessage.textContent = error.message;
    return;
  }

  els.experienceFormDialog.close();
  resetExperienceForm();
  els.pageMessage.textContent = "Experience deleted.";
  await loadExperiences();
}

// =========================
// SHARED DIALOG HELPERS
// =========================
function closeOnBackdrop(dialog) {
  if (!dialog) return;

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

// =========================
// EVENTS
// =========================
function bindEvents() {
  els.logoutBtn?.addEventListener("click", logout);

  els.tabs.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  els.newItemBtn?.addEventListener("click", () => {
    if (state.activeTab === "itineraries") {
      openNewItineraryDialog();
    } else if (state.activeTab === "experiences") {
      openNewExperienceDialog();
    } else {
      openNewBlogDialog();
    }
  });

  // Itinerary events
  els.closeItineraryFormDialog?.addEventListener("click", () => els.itineraryFormDialog.close());
  els.closeItineraryViewDialog?.addEventListener("click", () => els.itineraryViewDialog.close());
  els.itinerarySearchInput?.addEventListener("input", renderItinerariesTable);
  els.resetItineraryBtn?.addEventListener("click", resetItineraryForm);
  els.itineraryForm?.addEventListener("submit", saveItinerary);
  els.deleteItineraryBtn?.addEventListener("click", deleteItinerary);

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

  // Blog events
  els.closeBlogFormDialog?.addEventListener("click", () => els.blogFormDialog.close());
  els.closeBlogViewDialog?.addEventListener("click", () => els.blogViewDialog.close());
  els.blogSearchInput?.addEventListener("input", renderBlogPostsTable);
  els.blogStatusFilter?.addEventListener("change", renderBlogPostsTable);
  els.resetBlogBtn?.addEventListener("click", resetBlogForm);
  els.blogForm?.addEventListener("submit", saveBlogPost);
  els.deleteBlogBtn?.addEventListener("click", deleteBlogPost);

  els.addBlogSectionBtn?.addEventListener("click", () => {
    const items = getBlogSectionsFromUI();
    items.push(createBlogSectionItem());
    renderBlogSectionsBuilder(items);
  });

  // Experience events
  els.closeExperienceFormDialog?.addEventListener("click", () => els.experienceFormDialog.close());
  els.closeExperienceViewDialog?.addEventListener("click", () => els.experienceViewDialog.close());
  els.experienceSearchInput?.addEventListener("input", renderExperiencesTable);
  els.experienceStatusFilter?.addEventListener("change", renderExperiencesTable);
  els.resetExperienceBtn?.addEventListener("click", resetExperienceForm);
  els.experienceForm?.addEventListener("submit", saveExperience);
  els.deleteExperienceBtn?.addEventListener("click", deleteExperience);

  // Experience builders
  els.addExperienceDayBtn?.addEventListener("click", () => {
    const items = getExperienceDaysFromUI();
    items.push(createExperienceDayItem({ day_number: items.length + 1 }));
    renderExperienceDaysBuilder(items);
  });

  els.addIncludedBtn?.addEventListener("click", () => {
    const items = getIncludedFromUI();
    items.push("");
    renderIncludedBuilder(items);
  });

  els.addExcludedBtn?.addEventListener("click", () => {
    const items = getExcludedFromUI();
    items.push("");
    renderExcludedBuilder(items);
  });

  els.addGalleryImageBtn?.addEventListener("click", () => {
    const items = getGalleryImagesFromUI();
    items.push("");
    renderGalleryBuilder(items);
  });

  closeOnBackdrop(els.itineraryFormDialog);
  closeOnBackdrop(els.itineraryViewDialog);
  closeOnBackdrop(els.blogFormDialog);
  closeOnBackdrop(els.blogViewDialog);
  closeOnBackdrop(els.experienceFormDialog);
  closeOnBackdrop(els.experienceViewDialog);
}

// =========================
// INIT
// =========================
(async function init() {
  const user = await requireAdmin();
  if (!user) return;

  bindEvents();
  resetItineraryForm();
  resetBlogForm();
  resetExperienceForm();

  await Promise.all([
    loadItineraries(),
    loadBlogPosts(),
    loadExperiences()
  ]);

  switchTab("itineraries");
})();
