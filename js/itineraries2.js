// ============================================
// ITINERARIES PAGE SCRIPT - SUPABASE VERSION
// ============================================

// Replace with your real values
const SUPABASE_URL = "https://fqpofzlxixbitybltajx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcG9memx4aXhiaXR5Ymx0YWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjc5MDksImV4cCI6MjA5MTc0MzkwOX0.woDW07ULao_dYlqBaafJmc1Mjt3FAthShm0CBoMmWFY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const testimonials = [
    {
        source: "Tripadvisor",
        quote: "If Red Dot ever ceased to exist I would go somewhere else. They were impeccable. From Samanthie to Wicky, I cannot imagine anybody doing it better.",
        author: "Stuart",
        location: "United Kingdom, March 2025"
    },
    {
        source: "Feefo",
        quote: "We wanted our money to benefit the people of Sri Lanka. Their work supports smaller businesses, projects and communities as well as the environment.",
        author: "Jessica E",
        location: "London, UK, August 2025"
    },
    {
        source: "Tripadvisor",
        quote: "Our 11th visit to this magical island with always something new to discover. Total confidence that Red Dot would organise everything to perfection.",
        author: "Roy L",
        location: "United Kingdom, March 2025"
    }
];

let allItineraries = [];
let filteredItineraries = [];
let activeFilters = [];
let currentPage = 1;
const itemsPerPage = 12;

function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function normaliseTags(tags) {
    if (!Array.isArray(tags)) return [];
    return tags
        .map(tag => String(tag).trim().toLowerCase())
        .filter(Boolean);
}

function mapItineraryRow(row) {
    const tags = normaliseTags(row.tags);

    return {
        id: row.id,
        slug: row.slug,
        title: row.title || "Untitled itinerary",
        nights: row.duration_label || (row.duration_nights ? `${row.duration_nights} nights` : ""),
        price: row.price_label || "",
        region: row.region || "Sri Lanka",
        image: row.card_image || row.hero_image || "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: tags
    };
}

async function fetchItineraries() {
    const { data, error } = await supabaseClient
        .from("itineraries")
        .select(`
            id,
            slug,
            title,
            region,
            price_label,
            duration_nights,
            duration_label,
            hero_image,
            card_image,
            tags,
            is_published,
            sort_order,
            created_at
        `)
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    return (data || []).map(mapItineraryRow);
}

function applyFilters() {
    if (activeFilters.length === 0) {
        filteredItineraries = [...allItineraries];
        return;
    }

    filteredItineraries = allItineraries.filter(itinerary =>
        Array.isArray(itinerary.type) &&
        itinerary.type.some(tag => activeFilters.includes(tag))
    );
}

function renderEmptyState(message = "No itineraries found.") {
    const grid = document.getElementById("resultsGrid");
    if (!grid) return;

    grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
            <h3 style="margin-bottom: 10px;">${escapeHtml(message)}</h3>
            <p style="color: #6b6b6b;">Try clearing filters or add more itineraries in Supabase.</p>
        </div>
    `;
}

function renderItineraries() {
    applyFilters();

    const countEl = document.getElementById("filterCount");
    const clearAllEl = document.getElementById("clearAll");
    const grid = document.getElementById("resultsGrid");
    const paginationContainer = document.getElementById("paginationContainer");

    if (countEl) countEl.textContent = filteredItineraries.length;
    if (clearAllEl) clearAllEl.classList.toggle("visible", activeFilters.length > 0);

    const totalPages = Math.ceil(filteredItineraries.length / itemsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredItineraries.slice(startIndex, endIndex);

    if (!filteredItineraries.length) {
        renderEmptyState("No itineraries match those filters.");
        if (paginationContainer) paginationContainer.style.display = "none";
        return;
    }

    if (paginationContainer) {
        paginationContainer.style.display = totalPages > 1 ? "flex" : "none";
    }

    if (!grid) return;

    grid.innerHTML = paginatedItems.map((item, index) => `
        <a href="itinerary.html?slug=${encodeURIComponent(item.slug)}" class="itinerary-card" style="animation-delay: ${index * 0.05}s">
            <div class="card-image">
                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
                <span class="region-label">${escapeHtml(item.region)}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <div class="card-meta">📅 ${escapeHtml(item.nights)}</div>
                <div class="card-price">${escapeHtml(item.price)} <small>/ person</small></div>
                <div class="view-link">View Itinerary →</div>
            </div>
        </a>
    `).join("");

    updatePaginationButtons(totalPages);
}

function updatePaginationButtons(totalPages) {
    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");
    const pageNumbersContainer = document.getElementById("pageNumbers");

    if (!prevBtn || !nextBtn || !pageNumbersContainer) return;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    if (totalPages <= 1) {
        pageNumbersContainer.innerHTML = "";
        return;
    }

    let pageNumbersHtml = "";
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        pageNumbersHtml += `<div class="page-number" data-page="1">1</div>`;
        if (startPage > 2) {
            pageNumbersHtml += `<span class="page-dots">...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbersHtml += `
            <div class="page-number ${i === currentPage ? "active" : ""}" data-page="${i}">
                ${i}
            </div>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbersHtml += `<span class="page-dots">...</span>`;
        }
        pageNumbersHtml += `<div class="page-number" data-page="${totalPages}">${totalPages}</div>`;
    }

    pageNumbersContainer.innerHTML = pageNumbersHtml;

    pageNumbersContainer.querySelectorAll(".page-number").forEach(el => {
        el.addEventListener("click", () => {
            const page = parseInt(el.dataset.page, 10);
            if (!Number.isNaN(page) && page !== currentPage) {
                currentPage = page;
                renderItineraries();
                window.scrollTo({ top: document.getElementById("itineraries")?.offsetTop - 80 || 0, behavior: "smooth" });
            }
        });
    });
}

function initFilters() {
    const filterTags = document.querySelectorAll(".filter-tag");
    const clearAll = document.getElementById("clearAll");

    filterTags.forEach(tag => {
        tag.addEventListener("click", () => {
            const filterValue = String(tag.dataset.filter || "").trim().toLowerCase();
            if (!filterValue) return;

            if (activeFilters.includes(filterValue)) {
                activeFilters = activeFilters.filter(f => f !== filterValue);
                tag.classList.remove("active");
            } else {
                activeFilters.push(filterValue);
                tag.classList.add("active");
            }

            currentPage = 1;
            renderItineraries();
        });
    });

    if (clearAll) {
        clearAll.addEventListener("click", (e) => {
            e.preventDefault();
            activeFilters = [];
            document.querySelectorAll(".filter-tag").forEach(tag => tag.classList.remove("active"));
            currentPage = 1;
            renderItineraries();
        });
    }
}

function renderTestimonials() {
    const wrapper = document.getElementById("testimonialWrapper");
    if (!wrapper) return;

    wrapper.innerHTML = testimonials.map(t => `
        <div class="swiper-slide">
            <div class="testimonial-slide">
                <div class="review-source">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/TripAdvisor_logo.svg/2560px-TripAdvisor_logo.svg.png" alt="${escapeHtml(t.source)}">
                    <span>${escapeHtml(t.source)}</span>
                </div>
                <div class="stars">★★★★★</div>
                <div class="review-quote">"${escapeHtml(t.quote)}"</div>
                <div class="review-author">${escapeHtml(t.author)}</div>
                <div class="review-location">${escapeHtml(t.location)}</div>
            </div>
        </div>
    `).join("");
}

function initPaginationButtons() {
    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderItineraries();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const totalPages = Math.ceil(filteredItineraries.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderItineraries();
            }
        });
    }
}

function initSwiper() {
    if (!document.querySelector(".testimonialSwiper")) return;

    new Swiper(".testimonialSwiper", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        navigation: {
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next"
        }
    });
}

function initPageInteractions() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const header = document.getElementById("siteHeader");

    window.addEventListener("scroll", () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }

        const heroSection = document.getElementById("heroSection");
        const pill = document.getElementById("floatingPill");

        if (heroSection && pill) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            pill.classList.toggle("visible", heroBottom < 0);
        }

        const sections = ["overview", "intro", "itineraries", "testimonials", "process", "contact"];
        let currentSection = "";

        for (const section of sections) {
            const element = document.getElementById(section);
            if (!element) continue;

            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
                break;
            }
        }

        document.querySelectorAll(".pill-item").forEach(item => {
            const target = item.getAttribute("data-target");
            item.classList.toggle("active", target === currentSection);
        });
    });

    document.querySelectorAll(".pill-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            const targetElement = targetId ? document.getElementById(targetId) : null;
            if (targetElement) {
                lenis.scrollTo(targetElement, { offset: -80 });
            }
        });
    });

    const enquireBtn = document.querySelector(".pill-enquire");
    if (enquireBtn) {
        enquireBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = enquireBtn.getAttribute("data-target");
            const targetElement = targetId ? document.getElementById(targetId) : null;
            if (targetElement) {
                lenis.scrollTo(targetElement, { offset: -80 });
            }
        });
    }

    const scrollIndicator = document.getElementById("scrollIndicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", () => {
            const overviewSection = document.getElementById("overview");
            if (overviewSection) {
                lenis.scrollTo(overviewSection, { offset: -70 });
            }
        });
    }

    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { immediate: true });
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
    const mobileMenuClose = document.getElementById("mobileMenuClose");

    if (menuToggle && mobileMenuOverlay) {
        menuToggle.addEventListener("click", () => {
            mobileMenuOverlay.classList.toggle("active");
            const expanded = mobileMenuOverlay.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
        });
    }

    if (mobileMenuClose && mobileMenuOverlay) {
        mobileMenuClose.addEventListener("click", () => {
            mobileMenuOverlay.classList.remove("active");
            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }
}

async function initItinerariesPage() {
    const grid = document.getElementById("resultsGrid");
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                Loading itineraries...
            </div>
        `;
    }

    try {
        allItineraries = await fetchItineraries();
        filteredItineraries = [...allItineraries];
        renderItineraries();
    } catch (error) {
        console.error("Error loading itineraries:", error);
        renderEmptyState("Could not load itineraries.");
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    initFilters();
    initPaginationButtons();
    renderTestimonials();
    initSwiper();
    initPageInteractions();
    await initItinerariesPage();
});