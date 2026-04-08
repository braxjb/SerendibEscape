// ============================================
// ITINERARY DETAIL PAGE SCRIPT - RED DOT TOURS
// ============================================

// Testimonial Data
const testimonialsData = [
    { text: "If Red Dot ever ceased to exist and I wanted to return to Sri Lanka I would probably go somewhere else instead. They were, in every way shape and form, impeccable. From Samanthie who created the itinerary to Wicky who drove us here, there and everywhere I cannot imagine anybody doing it better.", name: "Anupa (July 2025) United Kingdom", link: "#", platform: "TripAdvisor", image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { text: "We chose this company as we wanted our money to benefit the people of Sri Lanka rather than international companies. Their work supports smaller businesses, projects and communities as well as the environment.", name: "Jessica E (August 2025) London, UK", link: "#", platform: "Feefo", image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { text: "Our 11th visit to this magical Island with always something new to discover and see. Total confidence that Red Dot would organise everything to perfection, having used them many times before.", name: "Roy L (March 2025) United Kingdom", link: "#", platform: "Feefo", image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=800" }
];

let currentTestimonial = 0;

function updateTestimonial() {
    const t = testimonialsData[currentTestimonial];
    document.getElementById('testimonialText').innerText = `"${t.text}"`;
    document.getElementById('testimonialName').innerText = t.name;
    document.getElementById('testimonialLink').innerHTML = `Read the whole review here ${t.platform} →`;
    document.getElementById('testimonialImage').src = t.image;
}

document.getElementById('prevTestimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialsData.length) % testimonialsData.length;
    updateTestimonial();
});

document.getElementById('nextTestimonial').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
    updateTestimonial();
});

// COMPLETE ITINERARY DATABASE with Featured Stays
const itinerariesDB = {
    'simply-sri-lanka': {
        id: 'simply-sri-lanka',
        title: "Simply Sri Lanka",
        price: "from $3,420",
        duration: "10 nights",
        region: "Sri Lanka",
        heroImage: "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description: "The perfect introduction to Sri Lanka's cultural triangle, hill country, and south coast. This well-paced journey covers the island's highlights while allowing time to relax.",
        transport: "Private vehicle with English-speaking driver-guide",
        pace: "Relaxed | 2–3 nights per location",
        bestTime: "December – April (west & south) | May – September (east)",
        idealFor: "First-time visitors, culture enthusiasts, couples",
        featuredStays: [
            { name: "Water Garden Sigiriya", location: "Sigiriya", description: "Luxury resort with stunning views of Sigiriya Rock", image: "https://images.pexels.com/photos/2058214/pexels-photo-2058214.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "The Kandy House", location: "Kandy", description: "Restored colonial manor with authentic charm", image: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "KK Beach", location: "Galle", description: "Beachfront property with family-friendly amenities", image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "Cinnamon Grand Colombo", location: "Colombo", description: "Luxury city hotel with world-class dining", image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=400" }
        ]
    },
    'boutique-sri-lanka': {
        id: 'boutique-sri-lanka',
        title: "Boutique Sri Lanka",
        price: "from $4,850",
        duration: "12 nights",
        region: "Sri Lanka",
        heroImage: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description: "Stay in the island's most stylish boutique hotels and heritage properties.",
        transport: "Private luxury vehicle with expert guide",
        pace: "Leisurely | 2–3 nights per property",
        bestTime: "December – March (west & south) | April – September (east)",
        idealFor: "Design lovers, luxury seekers, honeymooners",
        featuredStays: [
            { name: "The Wallawwa", location: "Colombo", description: "Restored colonial mansion with lush gardens", image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "Heritance Kandalama", location: "Kandalama", description: "Geoffrey Bawa architectural masterpiece", image: "https://images.pexels.com/photos/2058214/pexels-photo-2058214.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "Fort Bazaar", location: "Galle", description: "Stylish boutique hotel within Galle Fort", image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "Cape Weligama", location: "Weligama", description: "Clifftop luxury with ocean views", image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400" }
        ]
    },
    'family-fun-adventure': {
        id: 'family-fun-adventure',
        title: "Family Adventure Sri Lanka",
        price: "from $4,950",
        duration: "12 nights",
        region: "Sri Lanka",
        heroImage: "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=1600",
        description: "Designed with families in mind, balancing wildlife, culture, and beach time.",
        transport: "Private vehicle with family-friendly driver-guide",
        pace: "Relaxed | 2–3 nights per location",
        bestTime: "December – April (west & south) | May – September (east)",
        idealFor: "Families with children aged 5–16",
        featuredStays: [
            { name: "Rosyth Estate House", location: "Kegalle", description: "Colonial bungalow with gardens perfect for little explorers", image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "KK Beach", location: "Galle", description: "Beachfront property with kids' club and family suites", image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "Wild Coast Tented Lodge", location: "Yala", description: "Luxury safari camp with family tents", image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400" },
            { name: "Anantara Peace Haven", location: "Tangalle", description: "Resort with kids' club and multiple pools", image: "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=400" }
        ]
    }
};

// Helper function to generate days for itinerary
function generateDaysForItinerary(title, nights, baseImage) {
    const days = [];
    const locations = ["Negombo", "Sigiriya", "Kandy", "Nuwara Eliya", "Yala", "Galle", "Colombo"];
    const themes = ["Arrival & Welcome", "Cultural Discovery", "Wildlife Encounter", "Adventure Day", "Beach Relaxation", "Local Experiences", "Departure"];
    const stays = [
        { name: "Jetwing Blue", location: "Negombo", img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { name: "Water Garden Sigiriya", location: "Sigiriya", img: "https://images.pexels.com/photos/2058214/pexels-photo-2058214.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { name: "The Kandy House", location: "Kandy", img: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { name: "Heritance Tea Factory", location: "Nuwara Eliya", img: "https://images.pexels.com/photos/3785706/pexels-photo-3785706.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { name: "Wild Coast Tented Lodge", location: "Yala", img: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { name: "KK Beach", location: "Galle", img: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=200" },
        { name: "Cinnamon Grand Colombo", location: "Colombo", img: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=200" }
    ];
    
    const numDays = Math.min(parseInt(nights) || 10, 14);
    for (let i = 0; i < numDays; i++) {
        const dayIndex = i + 1;
        const locationIndex = Math.min(i, locations.length - 1);
        const stayIndex = Math.min(i, stays.length - 1);
        days.push({
            dayName: dayIndex === numDays - 1 ? `Day ${dayIndex}-${dayIndex+1}` : `Day ${dayIndex}`,
            location: locations[locationIndex % locations.length],
            theme: themes[i % themes.length],
            description: `Experience the best of ${title} on day ${dayIndex}. ${themes[i % themes.length]} activities tailored to your interests.`,
            stayName: stays[stayIndex].name,
            stayLocation: stays[stayIndex].location,
            stayImage: stays[stayIndex].img,
            dayImage: baseImage
        });
    }
    return days;
}

itinerariesDB['simply-sri-lanka'].days = generateDaysForItinerary("Simply Sri Lanka", 10, "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600");
itinerariesDB['boutique-sri-lanka'].days = generateDaysForItinerary("Boutique Sri Lanka", 12, "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600");
itinerariesDB['family-fun-adventure'].days = generateDaysForItinerary("Family Adventure", 12, "https://images.pexels.com/photos/1461282/pexels-photo-1461282.jpeg?auto=compress&cs=tinysrgb&w=600");

function getItinerarySlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('slug');
}

let staysSwiper = null;

function renderFeaturedStays(stays) {
    const wrapper = document.getElementById('staysWrapper');
    if (!stays || stays.length === 0) {
        wrapper.innerHTML = '<div class="swiper-slide">No featured stays available</div>';
        return;
    }
    
    wrapper.innerHTML = stays.map(stay => `
        <div class="swiper-slide">
            <div class="stay-card">
                <img src="${stay.image}" alt="${stay.name}">
                <div class="stay-card-content">
                    <h3>${stay.name}</h3>
                    <div class="stay-location">${stay.location}</div>
                    <p>${stay.description}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    if (staysSwiper) {
        staysSwiper.update();
    } else {
        staysSwiper = new Swiper('.stays-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }
}

function loadItinerary() {
    const slug = getItinerarySlug();
    const itinerary = itinerariesDB[slug];
    
    if (!itinerary) {
        document.getElementById('heroTitle').textContent = "Itinerary Not Found";
        document.getElementById('heroPrice').textContent = "";
        document.getElementById('heroDuration').textContent = "Please check the link and try again";
        document.getElementById('daysList').innerHTML = '<div style="text-align:center; padding:60px;"><a href="itineraries.html" style="color: var(--color-red);">← Back to all itineraries</a></div>';
        return;
    }
    
    document.title = `${itinerary.title} | Red Dot Tours`;
    document.getElementById('heroPrice').textContent = itinerary.price;
    document.getElementById('heroTitle').textContent = itinerary.title;
    document.getElementById('heroDuration').textContent = `${itinerary.duration} • ${itinerary.region}`;
    document.querySelector('.hero-itinerary').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${itinerary.heroImage}')`;
    document.getElementById('breadcrumbTitle').textContent = itinerary.title;
    document.getElementById('introDescription').innerHTML = `<p>${itinerary.description}</p>`;
    document.getElementById('transport').textContent = itinerary.transport;
    document.getElementById('pace').textContent = itinerary.pace;
    document.getElementById('bestTime').textContent = itinerary.bestTime;
    document.getElementById('idealFor').textContent = itinerary.idealFor;
    
    renderDays(itinerary.days);
    renderFeaturedStays(itinerary.featuredStays);
}

function renderDays(days) {
    const container = document.getElementById('daysList');
    if (!days || days.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:60px;">No itinerary details available.</div>';
        return;
    }
    
    container.innerHTML = days.map(day => `
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
                            <span class="pill"> ${day.dayName}</span>
                            <span class="pill"> ${day.location}</span>
                        </div>
                        <div class="day-title">${day.theme}</div>
                    </div>
                </div>
                <div class="expand-icon">+</div>
            </div>
            <div class="day-content">
                <div class="expanded-grid">
                    <div class="expanded-left">
                        <div class="expanded-description">${day.description}</div>
                        <div class="stay-section">
                            <h4>🏨 Stay at</h4>
                            <div class="stay-card-small">
                                <img src="${day.stayImage}" alt="${day.stayName}">
                                <div class="stay-info">
                                    <h5>${day.stayName}</h5>
                                    <p>${day.stayLocation}</p>
                                    <a href="#">More info →</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="expanded-right">
                        <img src="${day.dayImage}" alt="${day.theme}">
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.day-item').forEach(item => {
        const header = item.querySelector('.day-header');
        header.addEventListener('click', () => item.classList.toggle('expanded'));
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadItinerary();
    
    // Lenis Smooth Scroll
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    
    // Header scroll effect
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));
    
    // Back to top
    document.getElementById('backToTop').addEventListener('click', (e) => { e.preventDefault(); lenis.scrollTo(0, { immediate: true }); });
    
    // Back to itineraries
    document.getElementById('backToItineraries').addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'itineraries.html'; });
    document.getElementById('backLink').addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'itineraries.html'; });
    
    // Scroll indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => { const intro = document.querySelector('.intro-section'); if (intro) lenis.scrollTo(intro, { offset: -70 }); });
    }
    
    // Book now button
    document.getElementById('bookNowBtn').addEventListener('click', (e) => { e.preventDefault(); alert('Booking process would begin here. You can secure your spot with a deposit.'); });
    document.getElementById('customizeBtn').addEventListener('click', (e) => { e.preventDefault(); alert('Customize your itinerary: Our travel specialists will create a bespoke journey just for you.'); });
    
    // Mobile menu
    document.getElementById('menuToggle').addEventListener('click', () => alert('Mobile menu navigation would expand here'));
});