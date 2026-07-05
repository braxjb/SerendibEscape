// ============================================
// EXPERIENCE DETAIL PAGE - COMPLETE REWRITE
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

function getExperienceSlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("slug");
}

// ── DUMMY DATA (Fallback only) ──
const DUMMY_EXPERIENCE = {
    id: "exp-001",
    slug: "adams-peak-sunrise-hike",
    title: "Adams Peak Sunrise Hike",
    price: "$85",
    duration: "1 Day",
    group_size: "Small (2-6)",
    difficulty: "challenging",
    location: "Central Highlands",
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
        "Tips for guides",
        "Additional meals"
    ],
    gallery_images: [
        "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/260608/pexels-photo-260608.jpeg?auto=compress&cs=tinysrgb&w=600"
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

// ── TESTIMONIAL FUNCTIONS ──
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

// ── GALLERY FUNCTIONS ──
function renderGallery(images) {
    const wrapper = document.getElementById("galleryWrapper");
    if (!wrapper) return;

    const safeImages = toArray(images);

    if (safeImages.length === 0) {
        wrapper.innerHTML = `
            <div class="swiper-slide">
                <div style="display:flex;align-items:center;justify-content:center;height:400px;background:#f5f5f5;border-radius:16px;">
                    <p style="color:#6b7a8f;">Gallery images coming soon</p>
                </div>
            </div>
        `;
        return;
    }

    wrapper.innerHTML = safeImages.map(img => `
        <div class="swiper-slide">
            <img src="${escapeHtml(img)}" alt="Experience gallery image" style="width:100%;height:400px;object-fit:cover;border-radius:16px;">
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

// ── DAYS RENDERER ──
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
                                    <img src="${escapeHtml(day.image || "")}" alt="${escapeHtml(day.overnight_stay)}">
                                    <div class="stay-info">
                                        <h5>${escapeHtml(day.overnight_stay)}</h5>
                                        <p>${escapeHtml(day.location || "")}</p>
                                    </div>
                                </div>
                            </div>
                        ` : ""}
                    </div>
                    <div class="expanded-right">
                        <img src="${escapeHtml(day.image || "")}" alt="${escapeHtml(day.title || "Experience day")}">
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

// ── PAGE POPULATION ──
function populatePage(experience) {
    console.log("Populating page with experience:", experience);

    // Hero Section
    const heroSection = document.querySelector(".hero-experience");
    if (heroSection && experience.hero_image) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${experience.hero_image}')`;
    } else if (heroSection && experience.image) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${experience.image}')`;
    }

    // Badge
    const badge = document.getElementById("heroBadge");
    if (badge) {
        if (experience.featured) {
            badge.textContent = "★ Featured";
            badge.style.display = "inline-block";
        } else {
            badge.style.display = "none";
        }
    }

    // Price
    const priceEl = document.getElementById("heroPrice");
    if (priceEl) priceEl.textContent = experience.price_label || experience.price || "";

    // Title
    const titleEl = document.getElementById("heroTitle");
    if (titleEl) titleEl.textContent = experience.title || "Experience";

    // Duration
    const durationEl = document.getElementById("heroDuration");
    if (durationEl) durationEl.textContent = experience.duration || experience.duration_label || "";

    // Meta
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
        const desc = experience.description || experience.short_description || "Experience details loading...";
        introEl.innerHTML = `<p>${escapeHtml(desc)}</p>`;
    }

    // At a Glance
    const gDuration = document.getElementById("glanceDuration");
    if (gDuration) gDuration.textContent = experience.duration || experience.duration_label || "N/A";

    const gGroup = document.getElementById("glanceGroupSize");
    if (gGroup) gGroup.textContent = experience.group_size || "N/A";

    const gDiff = document.getElementById("glanceDifficulty");
    if (gDiff) gDiff.textContent = experience.difficulty || "Moderate";

    const gLoc = document.getElementById("glanceLocation");
    if (gLoc) gLoc.textContent = experience.location || "Sri Lanka";

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
    if (bookPriceEl) bookPriceEl.textContent = experience.price_label || experience.price || "$0";

    // Gallery
    renderGallery(experience.gallery_images || []);
}

// ── NOT FOUND STATE ──
function setNotFoundState() {
    console.log("Setting not found state");
    const titleEl = document.getElementById("heroTitle");
    const priceEl = document.getElementById("heroPrice");
    const durationEl = document.getElementById("heroDuration");
    const introEl = document.getElementById("introDescription");
    const daysEl = document.getElementById("daysList");

    if (titleEl) titleEl.textContent = "Experience Not Found";
    if (priceEl) priceEl.textContent = "";
    if (durationEl) durationEl.textContent = "Please check the link and try again";

    if (introEl) {
        introEl.innerHTML = `<p>We couldn't find that experience. Please check the URL or return to the <a href="experiences.html">experiences page</a>.</p>`;
    }

    if (daysEl) {
        daysEl.innerHTML = `
            <div style="text-align:center; padding:60px;">
                <a href="experiences.html" style="color: var(--color-red);">← Back to all experiences</a>
            </div>
        `;
    }
}

// ── FETCH EXPERIENCE BY SLUG ──
async function fetchExperienceBySlug(slug) {
    if (!slug) {
        console.error("No slug provided");
        return null;
    }

    console.log(`🔍 Looking for experience with slug: "${slug}"`);

    try {
        // Try to fetch from Supabase
        const { data, error } = await supabaseClient
            .from("experiences")
            .select("*")
            .eq("slug", slug)
            .maybeSingle(); // Use maybeSingle() instead of single() to avoid PGRST116 error

        if (error) {
            console.error("❌ Supabase error:", error);
            // Fallback to dummy data
            console.log("Using dummy data as fallback");
            return { ...DUMMY_EXPERIENCE, slug: slug };
        }

        if (!data) {
            console.log(`⚠️ No experience found with slug: "${slug}"`);
            // Fallback to dummy data
            console.log("Using dummy data as fallback");
            return { ...DUMMY_EXPERIENCE, slug: slug };
        }

        console.log(`✅ Found experience: "${data.title}"`);
        return data;
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        // Fallback to dummy data
        console.log("Using dummy data as fallback due to error");
        return { ...DUMMY_EXPERIENCE, slug: slug };
    }
}

// ── LOAD EXPERIENCE ──
async function loadExperience() {
    const slug = getExperienceSlug();
    console.log("📌 Experience slug from URL:", slug);

    if (!slug) {
        console.log("❌ No slug found in URL");
        setNotFoundState();
        return;
    }

    try {
        const experience = await fetchExperienceBySlug(slug);
        console.log("📦 Experience data:", experience);

        if (!experience) {
            console.log("❌ Experience not found");
            setNotFoundState();
            return;
        }

        populatePage(experience);
    } catch (error) {
        console.error("❌ Error loading experience:", error);
        setNotFoundState();
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
    
    // Initialize components
    initTestimonials();
    initPageInteractions();
    
    // Load the experience data
    await loadExperience();
    
    console.log("✅ Experience page initialization complete");
});
