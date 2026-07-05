// ============================================
// EXPERIENCES PAGE SCRIPT - WITH CALENDAR & DUMMY EVENTS
// ============================================

const testimonials = [
    {
        source: "Tripadvisor",
        quote: "The sunrise hike to Adams Peak was life-changing. Our guide was incredible and the group became like family.",
        author: "Sarah M",
        location: "Australia, February 2026"
    },
    {
        source: "Feefo",
        quote: "The wellness retreat was exactly what I needed. Yoga at sunrise, meditation by the sea, and the most incredible food.",
        author: "Emma W",
        location: "London, UK, January 2026"
    },
    {
        source: "Tripadvisor",
        quote: "Camping in the rainforest with this group was an adventure I'll never forget. The wildlife, the stars, the stories around the fire.",
        author: "David K",
        location: "Canada, December 2025"
    }
];

// ── DUMMY EXPERIENCES DATA ──
// This data will be used if Supabase is not available or for demo purposes
const DUMMY_EXPERIENCES = [
    {
        id: "exp-001",
        slug: "adams-peak-sunrise-hike",
        title: "Adams Peak Sunrise Hike",
        location: "Central Highlands",
        price: "$85",
        duration: "1 Day",
        group_size: "Small (2-6)",
        difficulty: "challenging",
        image: "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["hiking"],
        tags: ["hiking", "nature", "sunrise"],
        upcoming_date: "2026-07-15",
        event_dates: ["2026-07-15", "2026-07-22", "2026-07-29", "2026-08-05", "2026-08-12"],
        spots_remaining: 6,
        featured: true,
        description: "Experience the spiritual sunrise hike to Adams Peak, one of Sri Lanka's most sacred mountains.",
        short_description: "A spiritual sunrise trek to Sri Lanka's sacred mountain"
    },
    {
        id: "exp-002",
        slug: "yala-wildlife-safari",
        title: "Yala National Park Wildlife Safari",
        location: "Yala",
        price: "$120",
        duration: "2 Days",
        group_size: "Medium (7-15)",
        difficulty: "beginner",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["wildlife"],
        tags: ["wildlife", "safari", "nature"],
        upcoming_date: "2026-07-18",
        event_dates: ["2026-07-18", "2026-07-25", "2026-08-01", "2026-08-08", "2026-08-15"],
        spots_remaining: 4,
        featured: true,
        description: "Explore the wilds of Yala National Park, home to leopards, elephants, and exotic birdlife.",
        short_description: "Spot leopards and elephants in their natural habitat"
    },
    {
        id: "exp-003",
        slug: "wellness-retreat-mirissa",
        title: "Wellness & Yoga Retreat - Mirissa",
        location: "Mirissa",
        price: "$350",
        duration: "4 Days",
        group_size: "Small (2-6)",
        difficulty: "beginner",
        image: "https://images.pexels.com/photos/260608/pexels-photo-260608.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["wellness"],
        tags: ["wellness", "yoga", "meditation"],
        upcoming_date: "2026-07-20",
        event_dates: ["2026-07-20", "2026-08-03", "2026-08-17"],
        spots_remaining: 8,
        featured: true,
        description: "Rejuvenate your mind, body, and soul with our wellness retreat on the beautiful shores of Mirissa.",
        short_description: "Rejuvenate with yoga and meditation by the sea"
    },
    {
        id: "exp-004",
        slug: "kandy-cultural-immersion",
        title: "Kandy Cultural Immersion & Temple Tour",
        location: "Kandy",
        price: "$65",
        duration: "1 Day",
        group_size: "Medium (7-15)",
        difficulty: "beginner",
        image: "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["cultural"],
        tags: ["cultural", "heritage", "temple"],
        upcoming_date: "2026-07-23",
        event_dates: ["2026-07-23", "2026-07-30", "2026-08-06", "2026-08-13"],
        spots_remaining: 12,
        featured: false,
        description: "Immerse yourself in the rich culture of Kandy, home to the sacred Temple of the Tooth.",
        short_description: "Discover the cultural heart of Sri Lanka"
    },
    {
        id: "exp-005",
        slug: "camping-knuckles-mountains",
        title: "Camping Adventure - Knuckles Mountains",
        location: "Knuckles Range",
        price: "$180",
        duration: "3 Days",
        group_size: "Small (2-6)",
        difficulty: "moderate",
        image: "https://images.pexels.com/photos/260608/pexels-photo-260608.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["camping"],
        tags: ["camping", "trekking", "nature"],
        upcoming_date: "2026-08-01",
        event_dates: ["2026-08-01", "2026-08-08", "2026-08-15", "2026-08-22"],
        spots_remaining: 3,
        featured: false,
        description: "Camp under the stars in the stunning Knuckles Mountain Range.",
        short_description: "Sleep under starlit skies in pristine wilderness"
    },
    {
        id: "exp-006",
        slug: "sri-lankan-culinary-journey",
        title: "Sri Lankan Culinary Journey - Galle",
        location: "Galle",
        price: "$95",
        duration: "1 Day",
        group_size: "Medium (7-15)",
        difficulty: "beginner",
        image: "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["culinary"],
        tags: ["culinary", "food", "culture"],
        upcoming_date: "2026-08-05",
        event_dates: ["2026-08-05", "2026-08-12", "2026-08-19", "2026-08-26"],
        spots_remaining: 10,
        featured: false,
        description: "Savor the authentic flavors of Sri Lanka on this culinary journey through Galle.",
        short_description: "Savour authentic Sri Lankan flavours"
    },
    {
        id: "exp-007",
        slug: "ella-hike-and-village-tour",
        title: "Ella Hike & Village Tour",
        location: "Ella",
        price: "$75",
        duration: "1 Day",
        group_size: "Small (2-6)",
        difficulty: "moderate",
        image: "https://images.pexels.com/photos/545976/pexels-photo-545976.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["hiking"],
        tags: ["hiking", "village", "nature"],
        upcoming_date: "2026-08-10",
        event_dates: ["2026-08-10", "2026-08-17", "2026-08-24"],
        spots_remaining: 5,
        featured: false,
        description: "Hike through Ella's stunning landscapes and visit local villages.",
        short_description: "Conquer Sri Lanka's finest trails with expert guides"
    },
    {
        id: "exp-008",
        slug: "anuradhapura-heritage-tour",
        title: "Anuradhapura Ancient City Heritage Tour",
        location: "Anuradhapura",
        price: "$80",
        duration: "1 Day",
        group_size: "Medium (7-15)",
        difficulty: "beginner",
        image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["cultural"],
        tags: ["cultural", "heritage", "ancient"],
        upcoming_date: "2026-08-14",
        event_dates: ["2026-08-14", "2026-08-21", "2026-08-28"],
        spots_remaining: 15,
        featured: false,
        description: "Explore the ancient city of Anuradhapura, a UNESCO World Heritage site.",
        short_description: "Step back in time in Sri Lanka's ancient capital"
    },
    {
        id: "exp-009",
        slug: "wilpattu-night-safari",
        title: "Wilpattu National Park Night Safari",
        location: "Wilpattu",
        price: "$150",
        duration: "2 Days",
        group_size: "Small (2-6)",
        difficulty: "moderate",
        image: "https://images.pexels.com/photos/260608/pexels-photo-260608.jpeg?auto=compress&cs=tinysrgb&w=600",
        categories: ["wildlife"],
        tags: ["wildlife", "safari", "night"],
        upcoming_date: "2026-08-20",
        event_dates: ["2026-08-20", "2026-08-27", "2026-09-03"],
        spots_remaining: 2,
        featured: false,
        description: "Experience the thrill of a night safari in Wilpattu National Park.",
        short_description: "Track elephants, leopards & exotic birdlife at night"
    }
];

// ── Calendar State ──
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;
let eventsByDate = {};

let allExperiences = [];
let filteredExperiences = [];
let activeFilters = [];
let currentPage = 1;
const itemsPerPage = 6;

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

function mapExperienceRow(row) {
    const tags = normaliseTags(row.tags);
    const categories = normaliseTags(row.categories);

    return {
        id: row.id,
        slug: row.slug,
        title: row.title || "Untitled experience",
        duration: row.duration || row.duration_label || "",
        price: row.price || row.price_label || "",
        group_size: row.group_size || "",
        difficulty: row.difficulty || "moderate",
        location: row.location || "Sri Lanka",
        image: row.card_image || row.hero_image || row.image || "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: tags,
        categories: categories,
        upcoming_date: row.upcoming_date || null,
        event_dates: row.event_dates || (row.upcoming_date ? [row.upcoming_date] : []),
        spots_remaining: row.spots_remaining || 0,
        featured: row.featured || false,
        description: row.description || row.short_description || "",
        short_description: row.short_description || ""
    };
}

async function fetchExperiences() {
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
                is_published,
                sort_order,
                created_at
            `)
            .eq("is_published", true)
            .order("featured", { ascending: false })
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });

        if (error) {
            console.log("Supabase error, using dummy data:", error);
            return DUMMY_EXPERIENCES.map(mapExperienceRow);
        }

        if (!data || data.length === 0) {
            console.log("No data from Supabase, using dummy data");
            return DUMMY_EXPERIENCES.map(mapExperienceRow);
        }

        return (data || []).map(mapExperienceRow);
    } catch (error) {
        console.log("Error fetching, using dummy data:", error);
        return DUMMY_EXPERIENCES.map(mapExperienceRow);
    }
}

function applyFilters() {
    if (activeFilters.length === 0) {
        filteredExperiences = [...allExperiences];
        return;
    }

    filteredExperiences = allExperiences.filter(experience => {
        const allTags = [...experience.tags, ...experience.categories];
        return allTags.some(tag => activeFilters.includes(tag));
    });
}

// ── CALENDAR FUNCTIONS ──

function buildEventMap(experiences) {
    const map = {};
    experiences.forEach(exp => {
        const dates = exp.event_dates || (exp.upcoming_date ? [exp.upcoming_date] : []);
        dates.forEach(dateStr => {
            if (!dateStr) return;
            const date = new Date(dateStr);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            if (!map[key]) map[key] = [];
            // Avoid duplicates
            if (!map[key].find(e => e.id === exp.id)) {
                map[key].push(exp);
            }
        });
    });
    return map;
}

function renderCalendar(month, year) {
    const grid = document.getElementById('calendarGrid');
    const monthYear = document.getElementById('calendarMonthYear');
    
    if (!grid) return;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = dayHeaders.map(d => `<div class="calendar-day-header">${d}</div>`).join('');

    // Empty days
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="calendar-day empty"></div>`;
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateKey === todayStr;
        const hasEvent = eventsByDate[dateKey] && eventsByDate[dateKey].length > 0;
        const isSelected = selectedDate === dateKey;

        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (hasEvent) classes += ' has-event';
        if (isSelected) classes += ' selected';

        html += `
            <div class="${classes}" data-date="${dateKey}" data-has-event="${hasEvent}">
                ${day}
            </div>
        `;
    }

    grid.innerHTML = html;

    // Add click handlers
    grid.querySelectorAll('.calendar-day:not(.empty)').forEach(el => {
        el.addEventListener('click', function() {
            const dateKey = this.dataset.date;
            const hasEvent = this.dataset.hasEvent === 'true';
            
            if (!hasEvent) {
                if (selectedDate === dateKey) {
                    selectedDate = null;
                    renderCalendar(currentMonth, currentYear);
                    renderSelectedDateEvents(null);
                    filterByDate(null);
                } else {
                    selectedDate = dateKey;
                    renderCalendar(currentMonth, currentYear);
                    renderSelectedDateEvents(null);
                    filterByDate(null);
                }
                return;
            }
            
            if (selectedDate === dateKey) {
                selectedDate = null;
                renderCalendar(currentMonth, currentYear);
                renderSelectedDateEvents(null);
                filterByDate(null);
                return;
            }
            
            selectedDate = dateKey;
            renderCalendar(currentMonth, currentYear);
            renderSelectedDateEvents(dateKey);
            filterByDate(dateKey);
        });
    });
}

function renderSelectedDateEvents(dateKey) {
    const container = document.getElementById('selectedDateEventsList');
    const title = document.getElementById('selectedDateTitle');
    
    if (!container) return;

    if (!dateKey || !eventsByDate[dateKey] || eventsByDate[dateKey].length === 0) {
        title.textContent = 'No events on this date';
        container.innerHTML = `<p class="no-events-message">No experiences scheduled for this date.</p>`;
        return;
    }

    const events = eventsByDate[dateKey];
    const dateObj = new Date(dateKey + 'T00:00:00');
    title.textContent = dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
    });

    const categoryIcons = {
        hiking: '🥾',
        wellness: '🧘',
        camping: '🏕️',
        cultural: '🎭',
        wildlife: '🐘',
        culinary: '🍜'
    };

    container.innerHTML = events.map(exp => {
        const icon = categoryIcons[exp.categories?.[0]?.toLowerCase()] || '🌟';
        return `
            <div class="date-event-item" onclick="window.location.href='/experience.html?slug=${encodeURIComponent(exp.slug)}'">
                <div class="event-icon">${icon}</div>
                <div class="event-info">
                    <div class="event-title">${escapeHtml(exp.title)}</div>
                    <div class="event-details">📍 ${escapeHtml(exp.location)} • ${escapeHtml(exp.duration)}</div>
                    <div class="event-time">💰 ${escapeHtml(exp.price)} • ${exp.spots_remaining} spots left</div>
                </div>
                <button class="event-book-btn" onclick="event.stopPropagation(); window.location.href='/booking.html?id=${exp.id}&type=experience'">
                    Book Now
                </button>
            </div>
        `;
    }).join('');
}

function goToMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

// ── FILTER BY DATE ──

function filterByDate(dateKey) {
    if (!dateKey || !eventsByDate[dateKey]) {
        filteredExperiences = [...allExperiences];
        document.getElementById('resultsTitle').textContent = 'All Experiences';
        document.getElementById('resultsCount').textContent = `${filteredExperiences.length} experiences`;
    } else {
        const eventIds = eventsByDate[dateKey].map(e => e.id);
        filteredExperiences = allExperiences.filter(e => eventIds.includes(e.id));
        const dateObj = new Date(dateKey + 'T00:00:00');
        document.getElementById('resultsTitle').textContent = `Events on ${dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
        document.getElementById('resultsCount').textContent = `${filteredExperiences.length} experiences`;
    }
    
    currentPage = 1;
    renderExperiences();
}

// ── RENDER FUNCTIONS ──

function renderEmptyState(message = "No experiences found.") {
    const grid = document.getElementById("resultsGrid");
    if (!grid) return;

    grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
            <h3 style="margin-bottom: 10px;">${escapeHtml(message)}</h3>
            <p style="color: #6b6b6b;">Try selecting a different date or check back later for new experiences.</p>
        </div>
    `;
}

function renderExperiences() {
    const grid = document.getElementById("resultsGrid");
    const paginationContainer = document.getElementById("paginationContainer");

    if (!grid) return;

    const totalPages = Math.ceil(filteredExperiences.length / itemsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredExperiences.slice(startIndex, endIndex);

    if (!filteredExperiences.length) {
        renderEmptyState("No experiences match your selection.");
        if (paginationContainer) paginationContainer.style.display = "none";
        return;
    }

    if (paginationContainer) {
        paginationContainer.style.display = totalPages > 1 ? "flex" : "none";
    }

    const categoryIcons = {
        hiking: '🥾',
        wellness: '🧘',
        camping: '🏕️',
        cultural: '🎭',
        wildlife: '🐘',
        culinary: '🍜'
    };

    // Link to experience detail page using slug
    grid.innerHTML = paginatedItems.map((item, index) => {
        const icon = categoryIcons[item.categories?.[0]?.toLowerCase()] || '🌟';
        return `
        <a href="/experience.html?slug=${encodeURIComponent(item.slug)}" class="experience-card" style="animation-delay: ${index * 0.05}s">
            <div class="card-image">
                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
                ${item.featured ? '<span class="featured-badge">★ Featured</span>' : ''}
                ${item.spots_remaining > 0 ? `<span class="spots-badge">${item.spots_remaining} spots left</span>` : '<span class="spots-badge sold-out">Sold Out</span>'}
                <span class="category-label">${icon} ${escapeHtml(item.categories[0] || 'Adventure')}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${escapeHtml(item.title)}</h3>
                <div class="card-meta">
                    <span>📍 ${escapeHtml(item.location)}</span>
                    <span>⏱️ ${escapeHtml(item.duration || 'N/A')}</span>
                </div>
                <div class="card-details">
                    <span class="difficulty ${escapeHtml(item.difficulty)}">${escapeHtml(item.difficulty || 'Moderate')}</span>
                    <span class="group-size">👥 ${escapeHtml(item.group_size || 'Group')}</span>
                </div>
                ${item.upcoming_date ? `<div class="upcoming-date">📅 ${new Date(item.upcoming_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>` : ''}
                <div class="card-price">${escapeHtml(item.price)} <small>/ person</small></div>
                <div class="view-link">View Experience →</div>
            </div>
        </a>
    `}).join("");

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
            const page = parseInt(el.dataset.page, 5);
            if (!Number.isNaN(page) && page !== currentPage) {
                currentPage = page;
                renderExperiences();
                window.scrollTo({ top: document.getElementById("experiences")?.offsetTop - 80 || 0, behavior: "smooth" });
            }
        });
    });
}

function initPaginationButtons() {
    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderExperiences();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const totalPages = Math.ceil(filteredExperiences.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderExperiences();
            }
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

        const sections = ["overview", "intro", "experiences", "testimonials", "process", "contact"];
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

// ── INIT ──

async function initExperiencesPage() {
    const grid = document.getElementById("resultsGrid");
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                Loading experiences...
            </div>
        `;
    }

    try {
        allExperiences = await fetchExperiences();
        filteredExperiences = [...allExperiences];
        
        // Build event map for calendar
        eventsByDate = buildEventMap(allExperiences);
        
        // Render calendar
        renderCalendar(currentMonth, currentYear);
        
        // Setup calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => goToMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => goToMonth(1));
        
        // Update results count
        document.getElementById('resultsCount').textContent = `${filteredExperiences.length} experiences`;
        
        renderExperiences();
    } catch (error) {
        console.error("Error loading experiences:", error);
        renderEmptyState("Could not load experiences.");
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    initPaginationButtons();
    renderTestimonials();
    initSwiper();
    initPageInteractions();
    await initExperiencesPage();
});
