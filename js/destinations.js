// ============================================
// DESTINATIONS PAGE SCRIPT - SERENDIB ESCAPE
// ============================================

// ── SUPABASE CLIENT ──
// Use the existing supabaseClient from supabase-client.js
if (typeof supabaseClient === 'undefined' && typeof window !== 'undefined') {
    const SUPABASE_URL = "https://fqpofzlxixbitybltajx.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcG9memx4aXhiaXR5Ymx0YWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjc5MDksImV4cCI6MjA5MTc0MzkwOX0.woDW07ULao_dYlqBaafJmc1Mjt3FAthShm0CBoMmWFY";
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Get the client
const client = typeof supabaseClient !== 'undefined' ? supabaseClient : window.supabaseClient;

// ── LENIS SMOOTH SCROLL ──
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ── SCROLL REVEALS ──
const revealElements = document.querySelectorAll('.reveal-text');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

// ── CARD REVEALS ──
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
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// ── MORE DESTINATIONS BUTTON ──
const moreBtn = document.getElementById('moreDestinationsBtn');
if (moreBtn) {
    moreBtn.addEventListener('click', () => {
        const original = moreBtn.innerHTML;
        moreBtn.innerHTML = 'Loading... <span class="arrow">⟳</span>';
        moreBtn.style.opacity = '0.7';
        moreBtn.style.cursor = 'wait';
        
        setTimeout(() => {
            moreBtn.innerHTML = original;
            moreBtn.style.opacity = '1';
            moreBtn.style.cursor = 'pointer';
            alert('More destinations would load here.');
        }, 1000);
    });
}

// ── SUPABASE ITINERARIES SLIDER ──

let sliderInterval = null;
let currentSlide = 0;
let slideItems = [];

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function getDuration(row) {
    if (row.duration_label) return row.duration_label;
    if (row.duration_nights) {
        const n = Number(row.duration_nights);
        return n === 1 ? '1 Night' : `${n} Nights`;
    }
    return 'Tailor-made';
}

function getImage(row) {
    return row.card_image || row.hero_image || 'https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600';
}

async function fetchItineraries() {
    try {
        if (!client) {
            console.error('❌ Supabase client not available!');
            return [];
        }

        console.log('🔍 Fetching itineraries from Supabase...');

        const { data, error } = await client
            .from('itineraries')
            .select('*')
            .eq('is_published', true)
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Supabase error:', error);
            return [];
        }

        if (!data || data.length === 0) {
            console.log('ℹ️ No itineraries found.');
            return [];
        }

        console.log(`✅ Found ${data.length} itineraries`);
        return data;
    } catch (err) {
        console.error('❌ Error fetching itineraries:', err);
        return [];
    }
}

function renderSlider(items) {
    const slider = document.getElementById('itinerariesSlider');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!slider) {
        console.error('❌ Slider not found!');
        return;
    }

    if (!items || items.length === 0) {
        slider.innerHTML = `
            <div class="slider-empty">
                <h3>No itineraries available yet.</h3>
                <p>We are currently preparing our Sri Lanka itinerary ideas.</p>
                <a href="./contact.html" class="btn-primary">Enquire Now <span class="btn-arrow">→</span></a>
            </div>
        `;
        if (dotsContainer) dotsContainer.innerHTML = '';
        return;
    }

    slideItems = items;

    // Create slider items
    slider.innerHTML = items.map((item, i) => {
        const url = item.slug ? `itinerary.html?slug=${encodeURIComponent(item.slug)}` : '#';
        return `
            <div class="slider-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
                <a href="${url}" class="slider-card">
                    <div class="slider-card-image">
                        <img src="${escapeHtml(getImage(item))}" alt="${escapeHtml(item.title)}" loading="lazy" />
                        <div class="slider-card-overlay"></div>
                    </div>
                    <div class="slider-card-content">
                        <span class="slider-card-tag">${escapeHtml(item.region || 'Sri Lanka')} • ${escapeHtml(getDuration(item))}</span>
                        <h3 class="slider-card-title">${escapeHtml(item.title)}</h3>
                        <span class="slider-card-link">View Itinerary →</span>
                    </div>
                </a>
            </div>
        `;
    }).join('');

    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = items.map((_, i) => `
            <span class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
        `).join('');
    }

    // Start auto-slide
    startSlider();
}

function startSlider() {
    // Clear any existing interval
    if (sliderInterval) {
        clearInterval(sliderInterval);
    }

    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length === 0) return;

    // Set initial state
    currentSlide = 0;
    updateSlider(slides, dots);

    // Auto-slide every 3 seconds
    sliderInterval = setInterval(() => {
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider(slides, dots);
    }, 3000);
}

function updateSlider(slides, dots) {
    const totalSlides = slides.length;
    
    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'previous', 'next');
        
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
            slide.classList.add('previous');
        } else if (index === (currentSlide + 1) % totalSlides) {
            slide.classList.add('next');
        }
    });

    // Update dots
    if (dots) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.onclick = () => {
            if (index !== currentSlide) {
                currentSlide = index;
                updateSlider(slides, dots);
                // Reset interval
                if (sliderInterval) {
                    clearInterval(sliderInterval);
                    sliderInterval = setInterval(() => {
                        currentSlide = (currentSlide + 1) % slides.length;
                        updateSlider(slides, dots);
                    }, 3000);
                }
            }
        };
    });
}

async function initItineraries() {
    console.log('🚀 Initializing itineraries...');
    
    try {
        const data = await fetchItineraries();
        renderSlider(data);
    } catch (err) {
        console.error('❌ Failed to load itineraries:', err);
        const slider = document.getElementById('itinerariesSlider');
        if (slider) {
            slider.innerHTML = `
                <div class="slider-empty">
                    <h3>Unable to load itineraries</h3>
                    <p>We're having trouble loading our itinerary ideas. Please try again later.</p>
                    <a href="./contact.html" class="btn-primary">Enquire Now <span class="btn-arrow">→</span></a>
                </div>
            `;
        }
    }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Destinations page loaded');
    
    // Wait a moment for everything to initialize
    setTimeout(() => {
        initItineraries();
    }, 500);
});

console.log('✅ Destinations script loaded successfully');
