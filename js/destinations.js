// ============================================
// HOMEPAGE SCRIPT - RED DOT TOURS
// ============================================

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// INTERSECTION OBSERVER for scroll-triggered text reveals
const revealElements = document.querySelectorAll('.reveal-text');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));

// Observe destination cards for staggered reveal
const cards = document.querySelectorAll('.dest-card, .stay-card, .review-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 80);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Dynamic More Itineraries Button with hover animation and click handler
const moreItinerariesBtn = document.getElementById('moreItinerariesBtn');
if (moreItinerariesBtn) {
    moreItinerariesBtn.addEventListener('click', () => {
        const btn = moreItinerariesBtn;
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Loading... <span class="arrow">⟳</span>';
        btn.style.opacity = '0.7';
        btn.style.cursor = 'wait';
        
        // Simulate loading delay
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            alert('More itineraries would load here. This is a dynamic button that could fetch additional content via AJAX.');
        }, 1000);
    });
}

// Update ScrollTrigger if using GSAP (ensures Lenis compatibility)
if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// ============================================
// DESTINATIONS PAGE - DYNAMIC ITINERARIES
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

function getItineraryDuration(row) {
  if (row.duration_label) return row.duration_label;

  if (row.duration_nights) {
    const nights = Number(row.duration_nights);
    return nights === 1 ? "1 Night" : `${nights} Nights`;
  }

  return "Tailor-made journey";
}

function getItineraryImage(row) {
  return (
    row.card_image ||
    row.hero_image ||
    "./images/itinerary-classic.jpg"
  );
}

function getItineraryExcerpt(row) {
  return (
    row.excerpt ||
    row.summary ||
    row.short_description ||
    "A private Sri Lanka journey designed around culture, wildlife, scenery and authentic local experiences."
  );
}

function mapDestinationItinerary(row) {
  return {
    id: row.id,
    slug: row.slug || "",
    title: row.title || "Untitled Itinerary",
    region: row.region || "Sri Lanka",
    duration: getItineraryDuration(row),
    image: getItineraryImage(row),
    excerpt: getItineraryExcerpt(row)
  };
}

async function fetchDestinationItineraries() {
  const { data, error } = await supabaseClient
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
      is_published,
      sort_order,
      created_at
    `)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    throw error;
  }

  return (data || []).map(mapDestinationItinerary);
}

function renderDestinationItineraries(itineraries) {
  const grid = document.getElementById("destinationItineraryGrid");
  if (!grid) return;

  if (!itineraries.length) {
  grid.innerHTML = `
    <div class="itinerary-empty-state">
      <h3>No itineraries available yet.</h3>
      <p>
        We are currently preparing our Sri Lanka itinerary ideas. Please check back soon,
        or contact us to design a tailor-made journey.
      </p>
      <a href="./contact.html" class="btn-primary">
        Enquire Now
        <span class="btn-arrow">→</span>
      </a>
    </div>
  `;
  return;
}

  grid.innerHTML = itineraries.map((item, index) => {
    const url = item.slug
      ? `itinerary.html?slug=${encodeURIComponent(item.slug)}`
      : "#";

    return `
      <article class="itinerary-card reveal" style="--i: ${index};">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />

        <div class="itinerary-content">
          <span>${escapeHtml(item.region)} • ${escapeHtml(item.duration)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.excerpt)}</p>
          <a href="${url}">View itinerary →</a>
        </div>
      </article>
    `;
  }).join("");

  // Re-observe newly inserted reveal elements
  if (typeof observeRevealElements === "function") {
    observeRevealElements();
  } else {
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => el.classList.add("is-visible"));
  }
}

async function initDestinationItineraries() {
  const grid = document.getElementById("destinationItineraryGrid");
  if (!grid) return;

  try {
    const itineraries = await fetchDestinationItineraries();
    renderDestinationItineraries(itineraries);
  } catch (error) {
    console.error("Error loading destination itineraries:", error);

    grid.innerHTML = `
      <div class="itinerary-empty-state">
      <h3>No itineraries available yet.</h3>
      <p>
        We are currently preparing our Sri Lanka itinerary ideas. Please check back soon,
        or contact us to design a tailor-made journey.
      </p>
      <a href="./contact.html" class="btn-primary">
        Enquire Now
        <span class="btn-arrow">→</span>
      </a>
    </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", initDestinationItineraries);