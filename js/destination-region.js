// ============================================
// DESTINATION REGION PAGE JS
// One reusable JS file for all static region pages
// ============================================

function escapeHtml(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCurrentRegion() {
  const page = document.querySelector(".region-page");

  return {
    slug: page?.dataset.regionSlug || "",
    name: page?.dataset.regionName || "this region"
  };
}

function getItineraryDuration(row) {
  if (row.duration_label) return row.duration_label;

  if (row.duration_nights) {
    const nights = Number(row.duration_nights);
    return nights === 1 ? "1 Night" : `${nights} Nights`;
  }

  return "Tailor-made journey";
}

function getItineraryImage(row) {
  return row.card_image || row.hero_image || "../images/itinerary-classic.jpg";
}

function getItineraryExcerpt(row) {
  return (
    row.excerpt ||
    row.summary ||
    row.short_description ||
    "A private Sri Lanka journey designed around culture, wildlife, scenery and authentic local experiences."
  );
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];

  return tags
    .map(tag => String(tag).trim().toLowerCase())
    .filter(Boolean);
}

function renderRegionEmptyState(message) {
  const grid = document.getElementById("regionItineraryGrid");
  const region = getCurrentRegion();

  if (!grid) return;

  grid.innerHTML = `
    <div class="region-empty-state">
      <h3>No itineraries available yet.</h3>
      <p>
        ${escapeHtml(message || `We are currently preparing ${region.name} itinerary ideas. Please check back soon, or contact us to design a tailor-made journey.`)}
      </p>
      <a href="../contact.html" class="btn-primary">
        Enquire Now
        <span>→</span>
      </a>
    </div>
  `;
}

function renderRegionItineraries(itineraries) {
  const grid = document.getElementById("regionItineraryGrid");

  if (!grid) return;

  if (!itineraries.length) {
    renderRegionEmptyState();
    return;
  }

  grid.innerHTML = itineraries.map((item, index) => {
    const url = item.slug
      ? `../itinerary.html?slug=${encodeURIComponent(item.slug)}`
      : "../itineraries.html";

    return `
      <article class="region-itinerary-card reveal" style="--i: ${index};">
        <img src="${escapeHtml(getItineraryImage(item))}" alt="${escapeHtml(item.title || "Sri Lanka itinerary")}" />

        <div class="itinerary-content">
          <span>${escapeHtml(item.region || "Sri Lanka")} • ${escapeHtml(getItineraryDuration(item))}</span>
          <h3>${escapeHtml(item.title || "Untitled Itinerary")}</h3>
          <p>${escapeHtml(getItineraryExcerpt(item))}</p>
          <a href="${url}">View itinerary →</a>
        </div>
      </article>
    `;
  }).join("");

  observeRevealElements();
}

async function fetchRegionItineraries() {
  const region = getCurrentRegion();

  if (!region.slug) return [];

  if (typeof supabaseClient === "undefined") {
    console.warn("supabaseClient is not defined. Showing fallback empty state.");
    return [];
  }

  /*
    Recommended Supabase setup:
    - Add a text column called region_slug to your itineraries table.
    - Example value: cultural-triangle

    Alternative:
    - If you only use tags, keep the .contains("tags", [region.slug]) fallback below.
  */

  let { data, error } = await supabaseClient
    .from("itineraries")
    .select(`
      id,
      slug,
      title,
      region,
      region_slug,
      duration_nights,
      duration_label,
      hero_image,
      card_image,
      excerpt,
      summary,
      short_description,
      tags,
      is_published,
      sort_order,
      created_at
    `)
    .eq("is_published", true)
    .eq("region_slug", region.slug)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(3);

  /*
    Fallback if you have not created region_slug yet:
    this tries to match the region slug inside the tags array.
  */
  if (error) {
    console.warn("region_slug query failed. Trying tags fallback:", error.message);

    const fallback = await supabaseClient
      .from("itineraries")
      .select(`
        id,
        slug,
        title,
        region,
        duration_nights,
        duration_label,
        hero_image,
        card_image,
        excerpt,
        summary,
        short_description,
        tags,
        is_published,
        sort_order,
        created_at
      `)
      .eq("is_published", true)
      .contains("tags", [region.slug])
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(3);

    data = fallback.data;
    error = fallback.error;
  }

  if (error) {
    throw error;
  }

  return data || [];
}

async function initRegionItineraries() {
  const grid = document.getElementById("regionItineraryGrid");

  if (!grid) return;

  try {
    const itineraries = await fetchRegionItineraries();
    renderRegionItineraries(itineraries);
  } catch (error) {
    console.error("Error loading region itineraries:", error);
    renderRegionEmptyState("Could not load itineraries right now. Please check your Supabase connection or try again later.");
  }
}

function observeRevealElements() {
  const revealElements = document.querySelectorAll(
    ".reveal:not([data-observed]), .reveal-left:not([data-observed]), .reveal-right:not([data-observed]), .reveal-scale:not([data-observed])"
  );

  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealElements.forEach((el) => {
    el.setAttribute("data-observed", "true");
    revealObserver.observe(el);
  });
}

function initRegionSubnav() {
  document.querySelectorAll(".region-subnav a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  observeRevealElements();
  initRegionSubnav();
  await initRegionItineraries();
});
