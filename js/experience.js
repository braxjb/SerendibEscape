// ============================================
// EXPERIENCE DETAIL PAGE - SUPABASE VERSION
// ============================================

// ── SUPABASE CLIENT ──
// Use the same pattern as itinerary.js
const SUPABASE_URL = "https://fqpofzlxixbitybltajx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcG9memx4aXhiaXR5Ymx0YWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjc5MDksImV4cCI6MjA5MTc0MzkwOX0.woDW07ULao_dYlqBaafJmc1Mjt3FAthShm0CBoMmWFY";

// Check if supabaseClient exists globally, otherwise create it
if (typeof supabaseClient === 'undefined') {
    var supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ── HELPERS ──
function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function toArray(value) {
    return Array.isArray(value) ? value : [];
}

function getField(row, snakeCaseKey, camelCaseKey, fallback = null) {
    if (row && row[snakeCaseKey] !== undefined && row[snakeCaseKey] !== null) {
        return row[snakeCaseKey];
    }
    if (row && camelCaseKey && row[camelCaseKey] !== undefined && row[camelCaseKey] !== null) {
        return row[camelCaseKey];
    }
    return fallback;
}

function getExperienceSlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("slug");
}

// ── DUMMY DATA (Fallback) ──
const DUMMY_EXPERIENCE = {
    id: "exp-001",
    slug: "adams-peak-sunrise-hike",
    title: "Adams Peak Sunrise Hike",
    price_label: "$85",
    price_amount: 85.00,
    duration: "1 Day",
    duration_label: "1 Day",
    group_size: "Small (2-6)",
    difficulty: "challenging",
    location: "Central Highlands",
    hero_image: "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=800",
    card_image: "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Experience the spiritual sunrise hike to Adams Peak, one of Sri Lanka's most sacred mountains.",
    short_description: "A spiritual sunrise trek to Sri Lanka's sacred mountain",
    categories: ["hiking"],
    tags: ["hiking", "nature", "sunrise"],
    upcoming_date: "2026-07-15",
    event_dates: ["2026-07-15", "2026-07-22", "2026-07-29"],
    spots_remaining: 6,
    featured: true,
    included: [
        "Experienced local guide",
        "Permits and entrance fees",
        "Accommodation for 2 nights"
    ],
    excluded: [
        "International flights",
        "Travel insurance"
    ],
    gallery_images: [
        "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    itinerary_days: [
        {
            day_number: 1,
            title: "Arrival & Preparation",
            location: "Dalhousie",
            description: "Arrive at the base of Adams Peak in Dalhousie.",
            image: "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=400",
            overnight_stay: "Adams Peak Guest House"
        },
        {
            day_number: 2,
            title: "Summit Sunrise",
            location: "Adams Peak",
            description: "Start the hike at 2 AM to reach the summit by sunrise.",
            image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400",
            overnight_stay: "Adams Peak Guest House"
        }
    ]
};

// ── TESTIMONIALS ──
const testimonialsData = [
    {
        text: "This experience was absolutely incredible! The guides were knowledgeable, the scenery was breathtaking, and I made friends for life.",
        name: "Sarah M (January 2026) Australia",
        image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        text: "I've done many adventure tours, but this one was truly special.",
        name: "James K (December 2025) UK",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

let currentTestimonial = 0;
let staysSwiper = null;

// ── TESTIMONIAL UI ──
function updateTestimonial() {
    const t = testimonialsData[currentTestimonial];
    const textEl = document.getElementById("testimonialText");
    const nameEl = document.getElementById("testimonialName");
    const imageEl = document.getElementById("testimonialImage");

    if (textEl) textEl.innerText = `"${t.text}"`;
    if (nameEl) nameEl.innerText = t.name;
    if (imageEl) imageEl.src = t.image;
}

function initTestimonials() {
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");
    updateTestimonial();

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
            updateTestimonial();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
            updateTestimonial();
        });
    }
}

// ── GALLERY RENDERER ──
function renderGallery(images) {
    const wrapper = document.getElementById("galleryWrapper");
    if (!wrapper) return;

    const safeImages = toArray(images);

    if (safeImages.length === 0) {
        wrapper.innerHTML = `
            <div class="swiper-slide">
                <div style="display:flex;align-items:center;justify-content:center;height:300px;background:#f5f5f5;border-radius:16px;">
                    <p style="color:#6b7a8f;">Gallery images coming soon</p>
                </div>
            </div>
        `;
        return;
    }

    wrapper.innerHTML = safeImages.map(img => `
        <div class="swiper-slide">
            <img src="${escapeHtml(img)}" alt="Gallery image" style="width:100%;height:300px;object-fit:cover;border-radius:16px;">
        </div>
    `).join("");

    if (staysSwiper) {
        staysSwiper.update();
    } else {
        staysSwiper = new Swiper(".gallery-swiper", {
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
}

// ── DAYS RENDERER ──
function renderDays(days, fallbackImage = "") {
    const container = document.getElementById("daysList");
    if (!container) return;

    const safeDays = toArray(days).slice().sort((a, b) => {
        const aNum = Number(a?.day_number || 0);
        const bNum = Number(b?.day_number || 0);
        return aNum - bNum;
    });

    if (safeDays.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:60px;">
                Day-by-day details will be available soon.
            </div>
        `;
        return;
    }

    container.innerHTML = safeDays.map((day) => `
        <div class="day-item">
            <div class="day-header">
                <div class="day-info">
                    <div class="timeline-marker">
                        <div class="marker-outer-ring"></div>
                        <div class="marker-circle">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
                                <circle cx="12" cy="9" r="3" fill="white"/>
                            </svg>
                        </div>
                    </div>
                    <div class="day-pills">
                        <div class="pill-row">
                            <span class="pill">Day ${escapeHtml(day.day_number ?? "")}</span>
                            <span class="pill">${escapeHtml(day.location || "")}</span>
                        </div>
                        <div class="day-title">${escapeHtml(day.title || "Journey highlight")}</div>
                    </div>
                </div>
                <div class="expand-icon">+</div>
            </div>
            <div class="day-content">
                <div class="expanded-grid">
                    <div class="expanded-left">
                        <div class="expanded-description">${escapeHtml(day.description || "")}</div>
                        ${day.overnight_stay ? `
                            <div class="stay-section">
                                <h4>🏨 Stay at</h4>
                                <div class="stay-card-small">
                                    <img src="${escapeHtml(day.image || fallbackImage)}" alt="${escapeHtml(day.overnight_stay)}" style="width:80px;height:80px;object-fit:cover;border-radius:12px;">
                                    <div class="stay-info">
                                        <h5>${escapeHtml(day.overnight_stay)}</h5>
                                        <p>${escapeHtml(day.location || "")}</p>
                                    </div>
                                </div>
                            </div>
                        ` : ""}
                    </div>
                    <div class="expanded-right">
                        <img src="${escapeHtml(day.image || fallbackImage)}" alt="${escapeHtml(day.title || "Experience day")}" style="width:100%;height:280px;object-fit:cover;border-radius:20px;">
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".day-item").forEach((item) => {
        const header = item.querySelector(".day-header");
        if (header) {
            header.addEventListener("click", () => {
                item.classList.toggle("expanded");
            });
        }
    });
}

// ── RENDER INCLUSIONS ──
function renderInclusions(items, container, isExcluded = false) {
    if (!container) return;
    const safeItems = toArray(items);
    if (safeItems.length === 0) {
        container.innerHTML = `<li>${isExcluded ? 'None' : 'Details coming soon...'}</li>`;
        return;
    }
    container.innerHTML = safeItems.map(item => `<li>${escapeHtml(item)}</li>`).join("");
}

// ── POPULATE PAGE ──
function populatePage(experience) {
    console.log("📄 Populating page with experience data");

    // Hero Background
    const heroSection = document.querySelector(".hero-experience");
    const heroImage = getField(experience, "hero_image", "heroImage", "");
    if (heroSection && heroImage) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${heroImage}')`;
    }

    // Hero Badge
    const badge = document.getElementById("heroBadge");
    if (badge) {
        if (experience.featured) {
            badge.textContent = "★ Featured";
            badge.style.display = "inline-block";
        } else {
            badge.style.display = "none";
        }
    }

    // Hero Price
    const priceEl = document.getElementById("heroPrice");
    if (priceEl) {
        priceEl.textContent = getField(experience, "price_label", "priceLabel", "");
    }

    // Hero Title
    const titleEl = document.getElementById("heroTitle");
    if (titleEl) titleEl.textContent = experience.title || "Experience";

    // Hero Duration
    const durationEl = document.getElementById("heroDuration");
    if (durationEl) {
        durationEl.textContent = getField(experience, "duration", "duration", 
            getField(experience, "duration_label", "durationLabel", ""));
    }

    // Hero Meta
    const diffEl = document.getElementById("heroDifficulty");
    if (diffEl) diffEl.textContent = `Difficulty: ${experience.difficulty || "Moderate"}`;

    const groupEl = document.getElementById("heroGroupSize");
    if (groupEl) groupEl.textContent = `Group: ${experience.group_size || "Small"}`;

    const spotsEl = document.getElementById("heroSpots");
    if (spotsEl) {
        const spots = experience.spots_remaining || 0;
        spotsEl.textContent = `Spots: ${spots > 0 ? `${spots} left` : "Sold Out"}`;
        if (spots === 0) spotsEl.style.color = "#dc2626";
    }

    // Breadcrumb
    const breadcrumbEl = document.getElementById("breadcrumbTitle");
    if (breadcrumbEl) breadcrumbEl.textContent = experience.title || "";

    // Intro Description
    const introEl = document.getElementById("introDescription");
    if (introEl) {
        const desc = getField(experience, "description", "description", 
            getField(experience, "short_description", "shortDescription", ""));
        introEl.innerHTML = `<p>${escapeHtml(desc)}</p>`;
    }

    // At a Glance
    const gDuration = document.getElementById("glanceDuration");
    if (gDuration) {
        gDuration.textContent = getField(experience, "duration", "duration",
            getField(experience, "duration_label", "durationLabel", "N/A"));
    }

    const gGroup = document.getElementById("glanceGroupSize");
    if (gGroup) gGroup.textContent = experience.group_size || "N/A";

    const gDiff = document.getElementById("glanceDifficulty");
    if (gDiff) gDiff.textContent = experience.difficulty || "Moderate";

    const gLoc = document.getElementById("glanceLocation");
    if (gLoc) gLoc.textContent = experience.location || "Sri Lanka";

    const gDate = document.getElementById("glanceDate");
    if (gDate) {
        const date = experience.upcoming_date || 
            (experience.event_dates && experience.event_dates[0]);
        gDate.textContent = date ? new Date(date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }) : "TBC";
    }

    // Itinerary Days
    const fallbackImage = getField(experience, "card_image", "cardImage", 
        getField(experience, "hero_image", "heroImage", ""));
    renderDays(experience.itinerary_days || [], fallbackImage);

    // Included / Excluded
    const includedEl = document.getElementById("includedList");
    const excludedEl = document.getElementById("excludedList");
    renderInclusions(experience.included || [], includedEl);
    renderInclusions(experience.excluded || [], excludedEl, true);

    // Book Price
    const bookPriceEl = document.getElementById("bookPrice");
    if (bookPriceEl) {
        bookPriceEl.textContent = getField(experience, "price_label", "priceLabel", "$0");
    }

    // Gallery
    renderGallery(experience.gallery_images || []);
}

// ── FETCH EXPERIENCE BY SLUG ──
async function fetchExperienceBySlug(slug) {
    console.log(`🔍 Looking for experience with slug: "${slug}"`);

    try {
        // Make sure supabaseClient exists
        if (typeof supabaseClient === 'undefined') {
            console.error("❌ supabaseClient is not defined!");
            return { ...DUMMY_EXPERIENCE, slug: slug };
        }

        const { data, error } = await supabaseClient
            .from("experiences")
            .select(`
                id,
                slug,
                title,
                location,
                price_label,
                price_amount,
                currency,
                duration,
                duration_label,
                group_size,
                difficulty,
                hero_image,
                card_image,
                image,
                tags,
                categories,
                upcoming_date,
                event_dates,
                spots_remaining,
                featured,
                description,
                short_description,
                itinerary_days,
                included,
                excluded,
                gallery_images,
                is_published,
                sort_order,
                created_at
            `)
            .eq("slug", slug)
            .eq("is_published", true)
            .single();

        if (error) {
            console.error("❌ Supabase error:", error);
            console.log("⚠️ Using dummy data as fallback");
            return { ...DUMMY_EXPERIENCE, slug: slug };
        }

        if (!data) {
            console.log(`⚠️ No experience found with slug: "${slug}"`);
            console.log("⚠️ Using dummy data as fallback");
            return { ...DUMMY_EXPERIENCE, slug: slug };
        }

        console.log(`✅ Found experience in database: "${data.title}"`);
        return data;
    } catch (error) {
        console.error("❌ Error fetching experience:", error);
        console.log("⚠️ Using dummy data as fallback");
        return { ...DUMMY_EXPERIENCE, slug: slug };
    }
}

// ── LOAD EXPERIENCE ──
async function loadExperience() {
    const slug = getExperienceSlug();
    console.log(`📌 Experience slug: "${slug}"`);

    if (!slug) {
        console.log("❌ No slug found in URL");
        const container = document.getElementById("invoiceViewContent");
        if (container) {
            container.innerHTML = `
                <div style="padding:60px;text-align:center;">
                    <h2>Experience Not Found</h2>
                    <p>No experience specified.</p>
                    <a href="experiences.html" style="color:#BC2026;">← Back to experiences</a>
                </div>
            `;
        }
        return;
    }

    try {
        const experience = await fetchExperienceBySlug(slug);
        console.log("📦 Experience data:", experience);

        if (!experience) {
            console.log("❌ Experience not found");
            return;
        }

        populatePage(experience);
    } catch (error) {
        console.error("❌ Error loading experience:", error);
    }
}

// ── PAGE INTERACTIONS ──
function initPageInteractions() {
    // Lenis Smooth Scroll
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

    // Header scroll effect
    const header = document.getElementById("siteHeader");
    window.addEventListener("scroll", () => {
        if (header) header.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Back to top
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { immediate: true });
        });
    }

    // Back to experiences
    const backBtn = document.getElementById("backToExperiences");
    if (backBtn) {
        backBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "experiences.html";
        });
    }

    // Scroll indicator
    const scrollIndicator = document.getElementById("scrollIndicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", () => {
            const intro = document.querySelector(".intro-section");
            if (intro) lenis.scrollTo(intro, { offset: -70 });
        });
    }

    // Book now button
    const bookBtn = document.getElementById("bookNowBtn");
    if (bookBtn) {
        bookBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const slug = getExperienceSlug();
            window.location.href = `booking.html?slug=${slug}&type=experience`;
        });
    }

    // Mobile menu
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

    // Reveal animations
    const revealItems = document.querySelectorAll(
        ".intro-section, .schedule-section, .gallery-section, .included-section, .book-section, .testimonials-section, .trust-bar, .why-section, .day-item, .why-item"
    );

    revealItems.forEach((item) => {
        item.classList.add("reveal-premium");
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

// ── INIT ──
document.addEventListener("DOMContentLoaded", async function() {
    console.log("🚀 Experience page loaded");
    
    initTestimonials();
    initPageInteractions();
    await loadExperience();
    
    console.log("✅ Experience page initialization complete");
});
