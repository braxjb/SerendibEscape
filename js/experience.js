// ============================================
// EXPERIENCE DETAIL PAGE - SIMPLIFIED WORKING VERSION
// ============================================

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

function getExperienceSlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("slug");
}

function formatDate(dateStr) {
    if (!dateStr) return "TBC";
    try {
        return new Date(dateStr).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch {
        return dateStr;
    }
}

// ── DUMMY EXPERIENCE DATA ──
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
    image: "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=600",
    categories: ["hiking"],
    tags: ["hiking", "nature", "sunrise"],
    upcoming_date: "2026-07-15",
    event_dates: ["2026-07-15", "2026-07-22", "2026-07-29"],
    spots_remaining: 6,
    featured: true,
    description: "Experience the spiritual sunrise hike to Adams Peak, one of Sri Lanka's most sacred mountains. This challenging but rewarding trek takes you through lush forests to witness a breathtaking sunrise from the summit.",
    short_description: "A spiritual sunrise trek to Sri Lanka's sacred mountain",
    included: [
        "Experienced local guide",
        "Permits and entrance fees",
        "Accommodation for 2 nights",
        "Breakfast on day 2 and 3",
        "Flashlight and trekking poles",
        "First aid kit"
    ],
    excluded: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Tips for guides"
    ],
    gallery_images: [
        "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/260608/pexels-photo-260608.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    itinerary_days: [
        {
            day_number: 1,
            title: "Arrival & Preparation",
            location: "Dalhousie",
            description: "Arrive at the base of Adams Peak in Dalhousie. Settle into your accommodation and prepare for the early morning hike.",
            image: "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=400",
            overnight_stay: "Adams Peak Guest House"
        },
        {
            day_number: 2,
            title: "Summit Sunrise",
            location: "Adams Peak",
            description: "Start the hike at 2 AM to reach the summit by sunrise. Witness the spectacular sunrise and the mountain's shadow phenomenon.",
            image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400",
            overnight_stay: "Adams Peak Guest House"
        },
        {
            day_number: 3,
            title: "Descent & Departure",
            location: "Dalhousie",
            description: "After breakfast, begin your descent. Take your time to enjoy the views and rest your legs.",
            image: "https://images.pexels.com/photos/260608/pexels-photo-260608.jpeg?auto=compress&cs=tinysrgb&w=400",
            overnight_stay: null
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
        text: "I've done many adventure tours, but this one was truly special. The organization was flawless, and every moment felt magical.",
        name: "James K (December 2025) UK",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        text: "The sunrise hike was life-changing. Our guide was incredible and the group became like family.",
        name: "Emma W (November 2025) Canada",
        image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

let currentTestimonial = 0;
let gallerySwiper = null;

// ── RENDER FUNCTIONS ──

function renderTestimonials() {
    const wrapper = document.getElementById("testimonialWrapper");
    if (!wrapper) return;

    wrapper.innerHTML = testimonialsData.map(t => `
        <div class="swiper-slide">
            <div class="testimonial-slide">
                <div class="review-source">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/TripAdvisor_logo.svg/2560px-TripAdvisor_logo.svg.png" alt="TripAdvisor" style="height:32px;">
                    <span>TripAdvisor</span>
                </div>
                <div class="stars">★★★★★</div>
                <div class="review-quote">"${escapeHtml(t.text)}"</div>
                <div class="review-author">${escapeHtml(t.name)}</div>
            </div>
        </div>
    `).join("");

    // Initialize Swiper for testimonials
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

    if (gallerySwiper) {
        gallerySwiper.update();
    } else {
        gallerySwiper = new Swiper(".gallery-swiper", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
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

function renderDays(days) {
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
                                    <img src="${escapeHtml(day.image || "")}" alt="${escapeHtml(day.overnight_stay)}" style="width:80px;height:80px;object-fit:cover;border-radius:12px;">
                                    <div class="stay-info">
                                        <h5>${escapeHtml(day.overnight_stay)}</h5>
                                        <p>${escapeHtml(day.location || "")}</p>
                                    </div>
                                </div>
                            </div>
                        ` : ""}
                    </div>
                    <div class="expanded-right">
                        <img src="${escapeHtml(day.image || "")}" alt="${escapeHtml(day.title || "Experience day")}" style="width:100%;height:280px;object-fit:cover;border-radius:20px;">
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
    console.log("Populating page with experience:", experience);

    // Hero Background
    const heroSection = document.querySelector(".hero-experience");
    if (heroSection) {
        const bgImage = experience.hero_image || experience.card_image || experience.image || "";
        if (bgImage) {
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${bgImage}')`;
            heroSection.style.backgroundSize = "cover";
            heroSection.style.backgroundPosition = "center 50%";
        }
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
        priceEl.textContent = experience.price_label || experience.price || "";
    }

    // Hero Title
    const titleEl = document.getElementById("heroTitle");
    if (titleEl) {
        titleEl.textContent = experience.title || "Experience";
    }

    // Hero Duration
    const durationEl = document.getElementById("heroDuration");
    if (durationEl) {
        durationEl.textContent = experience.duration || experience.duration_label || "";
    }

    // Hero Meta
    const diffEl = document.getElementById("heroDifficulty");
    if (diffEl) {
        diffEl.textContent = `Difficulty: ${experience.difficulty || "Moderate"}`;
    }

    const groupEl = document.getElementById("heroGroupSize");
    if (groupEl) {
        groupEl.textContent = `Group: ${experience.group_size || "Small"}`;
    }

    const spotsEl = document.getElementById("heroSpots");
    if (spotsEl) {
        const spots = experience.spots_remaining || 0;
        spotsEl.textContent = `Spots: ${spots > 0 ? `${spots} left` : "Sold Out"}`;
        if (spots === 0) {
            spotsEl.style.color = "#dc2626";
        }
    }

    // Breadcrumb
    const breadcrumbEl = document.getElementById("breadcrumbTitle");
    if (breadcrumbEl) {
        breadcrumbEl.textContent = experience.title || "";
    }

    // Intro Description
    const introEl = document.getElementById("introDescription");
    if (introEl) {
        const desc = experience.description || experience.short_description || "Experience details loading...";
        introEl.innerHTML = `<p>${escapeHtml(desc)}</p>`;
    }

    // At a Glance
    const gDuration = document.getElementById("glanceDuration");
    if (gDuration) {
        gDuration.textContent = experience.duration || experience.duration_label || "N/A";
    }

    const gGroup = document.getElementById("glanceGroupSize");
    if (gGroup) {
        gGroup.textContent = experience.group_size || "N/A";
    }

    const gDiff = document.getElementById("glanceDifficulty");
    if (gDiff) {
        gDiff.textContent = experience.difficulty || "Moderate";
    }

    const gLoc = document.getElementById("glanceLocation");
    if (gLoc) {
        gLoc.textContent = experience.location || "Sri Lanka";
    }

    const gDate = document.getElementById("glanceDate");
    if (gDate) {
        const date = experience.upcoming_date || (experience.event_dates && experience.event_dates[0]);
        gDate.textContent = date ? formatDate(date) : "TBC";
    }

    // Itinerary Days
    renderDays(experience.itinerary_days || []);

    // Included / Excluded
    const includedEl = document.getElementById("includedList");
    const excludedEl = document.getElementById("excludedList");
    renderInclusions(experience.included || [], includedEl);
    renderInclusions(experience.excluded || [], excludedEl, true);

    // Book Price
    const bookPriceEl = document.getElementById("bookPrice");
    if (bookPriceEl) {
        bookPriceEl.textContent = experience.price_label || experience.price || "$0";
    }

    // Gallery
    renderGallery(experience.gallery_images || []);
}

// ── FETCH EXPERIENCE ──
async function fetchExperience(slug) {
    console.log(`🔍 Looking for experience with slug: "${slug}"`);

    try {
        const { data, error } = await supabaseClient
            .from("experiences")
            .select("*")
            .eq("slug", slug)
            .maybeSingle();

        if (error) {
            console.error("❌ Supabase error:", error);
            console.log("Using dummy data as fallback");
            return { ...DUMMY_EXPERIENCE, slug: slug };
        }

        if (!data) {
            console.log(`⚠️ No experience found with slug: "${slug}"`);
            console.log("Using dummy data as fallback");
            return { ...DUMMY_EXPERIENCE, slug: slug };
        }

        console.log(`✅ Found experience: "${data.title}"`);
        return data;
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        console.log("Using dummy data as fallback");
        return { ...DUMMY_EXPERIENCE, slug: slug };
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

    // Header scroll
    const header = document.getElementById("siteHeader");
    window.addEventListener("scroll", () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    // Back to top
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { immediate: true });
        });
    }

    // Back button
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
            if (intro) {
                lenis.scrollTo(intro, { offset: -70 });
            }
        });
    }

    // Book button
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
}

// ── INIT ──
async function init() {
    console.log("🚀 Experience page initializing...");

    // Get slug from URL
    const slug = getExperienceSlug();
    console.log("📌 Slug from URL:", slug);

    // If no slug, show error
    if (!slug) {
        console.log("❌ No slug found in URL");
        const container = document.getElementById("invoiceViewContent");
        if (container) {
            container.innerHTML = `
                <div style="padding:60px;text-align:center;">
                    <h2>Experience Not Found</h2>
                    <p>No experience specified. Please go back to the <a href="experiences.html">experiences page</a>.</p>
                </div>
            `;
        }
        return;
    }

    // Fetch the experience
    const experience = await fetchExperience(slug);
    
    if (!experience) {
        console.log("❌ No experience data available");
        const container = document.getElementById("invoiceViewContent");
        if (container) {
            container.innerHTML = `
                <div style="padding:60px;text-align:center;">
                    <h2>Experience Not Found</h2>
                    <p>We couldn't find the experience you're looking for.</p>
                    <a href="experiences.html" style="color:#BC2026;">← Back to experiences</a>
                </div>
            `;
        }
        return;
    }

    // Populate the page
    populatePage(experience);

    // Initialize components
    renderTestimonials();
    initPageInteractions();

    console.log("✅ Experience page loaded successfully");
}

// ── START ──
document.addEventListener("DOMContentLoaded", init);
