// ============================================
// ITINERARIES PAGE SCRIPT - RED DOT TOURS
// ============================================

// Expanded Itinerary Data with slugs for clean URLs
const allItineraries = [
    { id: 1, slug: "simply-sri-lanka", title: "Simply Sri Lanka", nights: "10 nights", price: "from $3,420", region: "Sri Lanka", type: ["couple", "culture"], image: "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, slug: "boutique-sri-lanka", title: "Boutique Sri Lanka", nights: "12 nights", price: "from $4,850", region: "Sri Lanka", type: ["couple", "luxury"], image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, slug: "ancient-cities-east", title: "Ancient Cities & East", nights: "14 nights", price: "from $3,950", region: "Sri Lanka", type: ["family", "culture"], image: "https://images.pexels.com/photos/2058214/pexels-photo-2058214.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, slug: "wildlife-safari", title: "Wildlife Safari", nights: "8 nights", price: "from $2,950", region: "Sri Lanka", type: ["wildlife", "family"], image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 5, slug: "luxury-tea-trails", title: "Luxury Tea Trails", nights: "7 nights", price: "from $5,850", region: "Sri Lanka", type: ["luxury", "couple"], image: "https://images.pexels.com/photos/3785706/pexels-photo-3785706.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, slug: "family-fun-adventure", title: "Family Fun Adventure", nights: "12 nights", price: "from $3,250", region: "Sri Lanka", type: ["family", "beach"], image: "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 7, slug: "solo-serenity", title: "Solo Serenity", nights: "9 nights", price: "from $2,450", region: "Sri Lanka", type: ["solo", "wellness"], image: "https://images.pexels.com/photos/341521/pexels-photo-341521.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 8, slug: "honeymoon-hideaway", title: "Honeymoon Hideaway", nights: "10 nights", price: "from $4,950", region: "Sri Lanka", type: ["couple", "beach"], image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 9, slug: "coastal-cultural", title: "Coastal & Cultural", nights: "11 nights", price: "from $3,150", region: "Sri Lanka", type: ["culture", "beach"], image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 10, slug: "wilderness-explorer", title: "Wilderness Explorer", nights: "6 nights", price: "from $2,150", region: "Sri Lanka", type: ["wildlife", "solo"], image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 11, slug: "cultural-immersion", title: "Cultural Immersion", nights: "13 nights", price: "from $4,250", region: "Sri Lanka", type: ["culture", "family"], image: "https://images.pexels.com/photos/2058214/pexels-photo-2058214.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 12, slug: "beach-retreat", title: "Beach Retreat", nights: "7 nights", price: "from $2,850", region: "Sri Lanka", type: ["couple", "beach"], image: "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 13, slug: "hill-country-escape", title: "Hill Country Escape", nights: "8 nights", price: "from $2,750", region: "Sri Lanka", type: ["couple", "wellness"], image: "https://images.pexels.com/photos/3785706/pexels-photo-3785706.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 14, slug: "north-coast-discovery", title: "North Coast Discovery", nights: "10 nights", price: "from $3,350", region: "Sri Lanka", type: ["culture", "solo"], image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 15, slug: "luxury-coastal", title: "Luxury Coastal", nights: "9 nights", price: "from $6,250", region: "Sri Lanka", type: ["luxury", "couple"], image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 16, slug: "family-wildlife-adventure", title: "Family Wildlife Adventure", nights: "10 nights", price: "from $3,850", region: "Sri Lanka", type: ["family", "wildlife"], image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 17, slug: "culinary-journey", title: "Culinary Journey", nights: "9 nights", price: "from $3,450", region: "Sri Lanka", type: ["food", "couple"], image: "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 18, slug: "wellness-yoga", title: "Wellness & Yoga", nights: "7 nights", price: "from $2,950", region: "Sri Lanka", type: ["wellness", "solo"], image: "https://images.pexels.com/photos/341521/pexels-photo-341521.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 19, slug: "heritage-trail", title: "Heritage Trail", nights: "12 nights", price: "from $3,950", region: "Sri Lanka", type: ["culture", "family"], image: "https://images.pexels.com/photos/2058214/pexels-photo-2058214.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 20, slug: "ultimate-luxury", title: "Ultimate Luxury", nights: "14 nights", price: "from $8,950", region: "Sri Lanka", type: ["luxury", "couple"], image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 21, slug: "surf-serenity", title: "Surf & Serenity", nights: "8 nights", price: "from $2,550", region: "Sri Lanka", type: ["beach", "solo"], image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 22, slug: "birdwatchers-paradise", title: "Birdwatcher's Paradise", nights: "7 nights", price: "from $2,450", region: "Sri Lanka", type: ["wildlife", "solo"], image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 23, slug: "tea-country-explorer", title: "Tea Country Explorer", nights: "9 nights", price: "from $3,250", region: "Sri Lanka", type: ["culture", "wellness"], image: "https://images.pexels.com/photos/3785706/pexels-photo-3785706.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 24, slug: "grand-tour-sri-lanka", title: "Grand Tour of Sri Lanka", nights: "18 nights", price: "from $5,950", region: "Sri Lanka", type: ["culture", "luxury"], image: "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600" }
];

const testimonials = [
    { source: "Tripadvisor", quote: "If Red Dot ever ceased to exist I would go somewhere else. They were impeccable. From Samanthie to Wicky, I cannot imagine anybody doing it better.", author: "Stuart", location: "United Kingdom, March 2025" },
    { source: "Feefo", quote: "We wanted our money to benefit the people of Sri Lanka. Their work supports smaller businesses, projects and communities as well as the environment.", author: "Jessica E", location: "London, UK, August 2025" },
    { source: "Tripadvisor", quote: "Our 11th visit to this magical island with always something new to discover. Total confidence that Red Dot would organise everything to perfection.", author: "Roy L", location: "United Kingdom, March 2025" }
];

let activeFilters = [];
let currentPage = 1;
const itemsPerPage = 12;
let filteredItineraries = allItineraries;

function renderItineraries() {
    // Apply filters
    if (activeFilters.length > 0) {
        filteredItineraries = allItineraries.filter(i => i.type.some(t => activeFilters.includes(t)));
    } else {
        filteredItineraries = [...allItineraries];
    }
    
    document.getElementById('filterCount').textContent = filteredItineraries.length;
    document.getElementById('clearAll').classList.toggle('visible', activeFilters.length > 0);
    
    // Pagination logic
    const totalPages = Math.ceil(filteredItineraries.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredItineraries.slice(startIndex, endIndex);
    
    // Render cards with human-readable slugs
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = paginatedItems.map((item, index) => `
        <a href="itinerary.html?slug=${item.slug}" class="itinerary-card" style="animation-delay: ${index * 0.05}s">
            <div class="card-image">
                <img src="${item.image}" alt="${item.title}">
                <span class="region-label">${item.region}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">📅 ${item.nights}</div>
                <div class="card-price">${item.price} <small>/ person</small></div>
                <div class="view-link">View Itinerary →</div>
            </div>
        </a>
    `).join('');
    
    // Update pagination buttons
    updatePaginationButtons(totalPages);
}

function updatePaginationButtons(totalPages) {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageNumbersContainer = document.getElementById('pageNumbers');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Generate page numbers
    let pageNumbersHtml = '';
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
        pageNumbersHtml += `<div class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</div>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbersHtml += `<span class="page-dots">...</span>`;
        }
        pageNumbersHtml += `<div class="page-number" data-page="${totalPages}">${totalPages}</div>`;
    }
    
    pageNumbersContainer.innerHTML = pageNumbersHtml;
    
    // Add click handlers to page numbers
    document.querySelectorAll('.page-number').forEach(el => {
        el.addEventListener('click', () => {
            const page = parseInt(el.dataset.page);
            if (!isNaN(page) && page !== currentPage) {
                currentPage = page;
                renderItineraries();
            }
        });
    });
}

function initFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const filterValue = tag.dataset.filter;
            if (activeFilters.includes(filterValue)) {
                activeFilters = activeFilters.filter(f => f !== filterValue);
                tag.classList.remove('active');
            } else {
                activeFilters.push(filterValue);
                tag.classList.add('active');
            }
            currentPage = 1;
            renderItineraries();
        });
    });
    
    document.getElementById('clearAll').addEventListener('click', (e) => {
        e.preventDefault();
        activeFilters = [];
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        currentPage = 1;
        renderItineraries();
    });
}

function renderTestimonials() {
    const wrapper = document.getElementById('testimonialWrapper');
    wrapper.innerHTML = testimonials.map(t => `
        <div class="swiper-slide">
            <div class="testimonial-slide">
                <div class="review-source"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/TripAdvisor_logo.svg/2560px-TripAdvisor_logo.svg.png" alt="${t.source}"><span>${t.source}</span></div>
                <div class="stars">★★★★★</div>
                <div class="review-quote">"${t.quote}"</div>
                <div class="review-author">${t.author}</div>
                <div class="review-location">${t.location}</div>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderItineraries();
    initFilters();
    renderTestimonials();
    
    // Pagination button event listeners
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderItineraries();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredItineraries.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderItineraries();
            }
        });
    }
    
    // Swiper
    new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: { prevEl: '.testimonial-prev', nextEl: '.testimonial-next' }
    });
    
    // Lenis Smooth Scroll
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    
    // Header scroll effect
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
        
        const heroSection = document.getElementById('heroSection');
        const pill = document.getElementById('floatingPill');
        if (heroSection && pill) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            pill.classList.toggle('visible', heroBottom < 0);
        }
        
        const sections = ['overview', 'intro', 'itineraries', 'testimonials', 'process', 'contact'];
        let currentSection = '';
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section;
                    break;
                }
            }
        }
        
        document.querySelectorAll('.pill-item').forEach(item => {
            const target = item.getAttribute('data-target');
            if (target === currentSection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
    
    // Floating Pill navigation
    const pillItems = document.querySelectorAll('.pill-item');
    const enquireBtn = document.querySelector('.pill-enquire');
    
    pillItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement, { offset: -80 });
                }
            }
        });
    });
    
    if (enquireBtn) {
        enquireBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = enquireBtn.getAttribute('data-target');
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    lenis.scrollTo(targetElement, { offset: -80 });
                }
            }
        });
    }
    
    // Scroll indicator click
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const overviewSection = document.getElementById('overview');
            if (overviewSection) {
                lenis.scrollTo(overviewSection, { offset: -70 });
            }
        });
    }
    
    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { immediate: true });
        });
    }
    
    // Back link
    const backLink = document.getElementById('backLink');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'javascript:history.back()';
        });
    }
    
    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            alert('Mobile menu navigation would expand here');
        });
    }
});