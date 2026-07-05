// ============================================
// EXPERIENCE DETAIL PAGE SCRIPT - SUPABASE VERSION
// ============================================

const SUPABASE_URL = "https://fqpofzlxixbitybltajx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcG9memx4aXhiaXR5Ymx0YWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjc5MDksImV4cCI6MjA5MTc0MzkwOX0.woDW07ULao_dYlqBaafJmc1Mjt3FAthShm0CBoMmWFY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// DUMMY DATA (Fallback)
// ============================================
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
    spots_remaining: 6,
    featured: true,
    description: "Experience the spiritual sunrise hike to Adams Peak, one of Sri Lanka's most sacred mountains. This challenging but rewarding trek takes you through lush forests to witness a breathtaking sunrise from the summit.",
    short_description: "A spiritual sunrise trek to Sri Lanka's sacred mountain",
    itinerary_days: [
        {
            day_number: 1,
            title: "Arrival & Preparation",
            location: "Dalhousie",
            description: "Arrive at the base of Adams Peak in Dalhousie. Settle into your accommodation and prepare for the early morning hike. Enjoy a local dinner and get a good night's rest.",
            image: "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=400",
            overnight_stay: "Adams Peak Guest House"
        },
        {
            day_number: 2,
            title: "Summit Sunrise",
            location: "Adams Peak",
            description: "Start the hike at 2 AM to reach the summit by sunrise. The climb takes approximately 5 hours with resting stops along the way. Witness the spectacular sunrise and the mountain's shadow phenomenon.",
            image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400",
            overnight_stay: "Adams Peak Guest House"
        },
        {
            day_number: 3,
            title: "Descent & Departure",
            location: "Dalhousie",
            description: "After breakfast, begin your descent. Take your time to enjoy the views and rest your legs. Depart from Dalhousie with unforgettable memories.",
            image: "https://images.pexels.com/photos/260608/pexels-photo-260608.jpeg?auto=compress&cs=tinysrgb&w=400",
            overnight_stay: null
        }
    ],
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
        "Additional meals",
        "Transport to Dalhousie"
    ],
    gallery_images: [
        "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/260608/pexels-photo-260608.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
};

// ============================================
// HELPERS
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

// ============================================
// DATA FETCH
// ============================================
async function fetchExperienceBySlug(slug) {
    try {
        const { data, error } = await supabaseClient
            .from("experiences")
            .select(`
                id,
                slug,
                title,
                location,
                price_label,
                price,
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
            console.log("Error fetching from Supabase, using dummy data:", error);
            return DUMMY_EXPERIENCE;
        }

        if (!data) {
            console.log("No data found, using dummy data");
            return DUMMY_EXPERIENCE;
        }

        return data;
    } catch (error) {
        console.log("Error, using dummy data:", error);
        return DUMMY_EXPERIENCE;
    }
}

// ============================================
// PAGE POPULATION
// ============================================
function populatePage(experience) {
    const heroSection = document.querySelector(".hero-experience");
    const heroBadge = document.getElementById("heroBadge");
    const heroPrice = document.getElementById("heroPrice");
    const heroTitle = document.getElementById("heroTitle");
    const heroDuration = document.getElementById("heroDuration");
    const heroDifficulty = document.getElementById("heroDifficulty");
    const heroGroupSize = document.getElementById("heroGroupSize");
    const heroSpots = document.getElementById("heroSpots");
    const breadcrumbTitle = document.getElementById("breadcrumbTitle");
    const introDescription = document.getElementById("introDescription");
    const glanceDuration = document.getElementById("glanceDuration");
    const glanceGroupSize = document.getElementById("glanceGroupSize");
    const glanceDifficulty = document.getElementById("glanceDifficulty");
    const glanceLocation = document.getElementById("glanceLocation");
    const glanceDate = document.getElementById("glanceDate");
    const daysList = document.getElementById("daysList");
    const includedList = document.getElementById("includedList");
    const excludedList = document.getElementById("excludedList");
    const bookPrice = document.getElementById("bookPrice");
    const galleryWrapper = document.getElementById("galleryWrapper");

    // Hero Image
    const heroImage = getField(experience, "hero_image", "heroImage", experience.image || "");
    if (heroSection && heroImage) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${heroImage}')`;
    }

    // Hero Badge
    if (heroBadge) {
        if (experience.featured) {
            heroBadge.textContent = "★ Featured";
            heroBadge.style.display = "inline-block";
        } else {
            heroBadge.style.display = "none";
        }
    }

    // Hero Price
    if (heroPrice) heroPrice.textContent = experience.price_label || experience.price || "";

    // Hero Title
    if (heroTitle) heroTitle.textContent = experience.title || "Experience";

    // Hero Duration
    if (heroDuration) {
        heroDuration.textContent = `${experience.duration || experience.duration_label || ""}`;
    }

    // Hero Meta
    if (heroDifficulty) heroDifficulty.textContent = `Difficulty: ${experience.difficulty || "Moderate"}`;
    if (heroGroupSize) heroGroupSize.textContent = `Group: ${experience.group_size || "Small"}`;
    if (heroSpots) {
        const spots = experience.spots_remaining || 0;
        heroSpots.textContent = `Spots: ${spots > 0 ? `${spots} left` : "Sold Out"}`;
        if (spots === 0) {
            heroSpots.style.color = "#dc2626";
        }
    }

    // Breadcrumb
    if (breadcrumbTitle) breadcrumbTitle.textContent = experience.title || "";

    // Intro Description
    if (introDescription) {
        const desc = experience.description || experience.short_description || "Experience details loading...";
        introDescription.innerHTML = `<p>${escapeHtml(desc)}</p>`;
    }

    // At a Glance
    if (glanceDuration) glanceDuration.textContent = experience.duration || experience.duration_label || "N/A";
    if (glanceGroupSize) glanceGroupSize.textContent = experience.group_size || "N/A";
    if (glanceDifficulty) glanceDifficulty.textContent = experience.difficulty || "Moderate";
    if (glanceLocation) glanceLocation.textContent = experience.location || "Sri Lanka";
    if (glanceDate) {
        const date = experience.upcoming_date || (experience.event_dates && experience.event_dates[0]);
        glanceDate.textContent = date ? new Date(date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }) : "TBC";
    }

    // Itinerary Days
    renderDays(experience.itinerary_days || []);

    // Included / Excluded
    renderInclusions(experience.included || [], includedList);
    renderInclusions(experience.excluded || [], excludedList, true);

    // Book Price
    if (bookPrice) bookPrice.textContent = experience.price_label || experience.price || "$0";

    // Gallery
    renderGallery(experience.gallery_images || []);
}

// ============================================
// RENDER FUNCTIONS
// ============================================
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
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"></path>
                                <circle cx="12" cy="9" r="3" fill="white"></circle>
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

function renderInclusions(items, container, isExcluded = false) {
    if (!container) return;

    const safeItems = toArray(items);

    if (safeItems.length === 0) {
        container.innerHTML = `<li>${isExcluded ? 'None' : 'Details coming soon...'}</li>`;
        return;
    }

    container.innerHTML = safeItems.map(item => `
        <li>${escapeHtml(item)}</li>
    `).join("");
}

let gallerySwiper = null;

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
            <img src="${escapeHtml(img)}" alt="Experience gallery image">
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

// ============================================
// NOT FOUND STATE
// ============================================
function setNotFoundState() {
    const heroTitle = document.getElementById("heroTitle");
    const heroPrice = document.getElementById("heroPrice");
    const heroDuration = document.getElementById("heroDuration");
    const introDescription = document.getElementById("introDescription");
    const daysList = document.getElementById("daysList");

    if (heroTitle) heroTitle.textContent = "Experience Not Found";
    if (heroPrice) heroPrice.textContent = "";
    if (heroDuration) heroDuration.textContent = "Please check the link and try again";

    if (introDescription) {
        introDescription.innerHTML = `<p>We couldn't find that experience.</p>`;
    }

    if (daysList) {
        daysList.innerHTML = `
            <div style="text-align:center; padding:60px;">
                <a href="experiences.html" style="color: var(--color-red);">← Back to all experiences</a>
            </div>
        `;
    }
}

// ============================================
// TESTIMONIALS
// ============================================
const testimonialsData = [
    {
        text: "This experience was absolutely incredible! The guides were knowledgeable, the scenery was breathtaking, and I made friends for life.",
        name: "Sarah M (January 2026) Australia",
        link: "#",
        image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        text: "I've done many adventure tours, but this one was truly special. The organization was flawless, and every moment felt magical.",
        name: "James K (December 2025) UK",
        link: "#",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        text: "The sunrise hike to Adams Peak was life-changing. Our guide was incredible and the group became like family.",
        name: "Emma W (November 2025) Canada",
        link: "#",
        image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

let currentTestimonial = 0;

function updateTestimonial() {
    const t = testimonialsData[currentTestimonial];

    const textEl = document.getElementById("testimonialText");
    const nameEl = document.getElementById("testimonialName");
    const linkEl = document.getElementById("testimonialLink");
    const imageEl = document.getElementById("testimonialImage");

    if (textEl) textEl.innerText = `"${t.text}"`;
    if (nameEl) nameEl.innerText = t.name;
    if (linkEl) {
        linkEl.textContent = `Read the whole review here →`;
        linkEl.href = t.link || "#";
    }
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

// ============================================
// PAGE INTERACTIONS
// ============================================
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
        if (header) header.classList.toggle("scrolled", window.scrollY > 50);
    });

    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { immediate: true });
        });
    }

    const backToExperiences = document.getElementById("backToExperiences");
    if (backToExperiences) {
        backToExperiences.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "experiences.html";
        });
    }

    const scrollIndicator = document.getElementById("scrollIndicator");
    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", () => {
            const intro = document.querySelector(".intro-section");
            if (intro) lenis.scrollTo(intro, { offset: -70 });
        });
    }

    const bookNowBtn = document.getElementById("bookNowBtn");
    if (bookNowBtn) {
        bookNowBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "booking.html";
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
        {
            threshold: 0.15
        }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

// ============================================
// LOAD EXPERIENCE
// ============================================
async function loadExperience() {
    const slug = getExperienceSlug();

    if (!slug) {
        setNotFoundState();
        return;
    }

    try {
        const experience = await fetchExperienceBySlug(slug);

        if (!experience) {
            setNotFoundState();
            return;
        }

        populatePage(experience);
    } catch (error) {
        console.error("Error loading experience:", error);
        setNotFoundState();
    }
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", async () => {
    initTestimonials();
    initPageInteractions();
    await loadExperience();
});
