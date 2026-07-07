// ============================================
// DESTINATIONS PAGE SCRIPT - SERENDIB ESCAPE
// ============================================

// ── SUPABASE CLIENT ──
if (typeof supabaseClient === 'undefined' && typeof window !== 'undefined') {
    const SUPABASE_URL = "https://fqpofzlxixbitybltajx.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcG9memx4aXhiaXR5Ymx0YWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjc5MDksImV4cCI6MjA5MTc0MzkwOX0.woDW07ULao_dYlqBaafJmc1Mjt3FAthShm0CBoMmWFY";
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

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

// ── HERO ANIMATION - EXACT SAME AS INDEX PAGE ──
function initHero() {
    setTimeout(() => {
        document.querySelector('.hero-kicker')?.classList.add('animate-in');
        document.querySelector('.hero-headline')?.classList.add('animate-in');
        document.querySelector('.hero-description')?.classList.add('animate-in');
        document.querySelector('.hero-buttons')?.classList.add('animate-in');
    }, 100);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Destinations page loaded');
    
    // Initialize hero animation (same as index page)
    initHero();
    
    // Initialize itineraries
    setTimeout(() => {
        initItineraries();
    }, 500);
});

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

// ── SUPABASE ITINERARIES ──

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

function getExcerpt(row) {
    return row.excerpt || row.summary || row.short_description || 'A private Sri Lanka journey designed around culture, wildlife, scenery and authentic local experiences.';
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
    const track = document.getElementById('itinerariesSliderTrack');
    
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

    const duplicatedItems = [...items, ...items.slice(0, 3)];

    slider.innerHTML = duplicatedItems.map((item, i) => {
        const url = item.slug ? `itinerary.html?slug=${encodeURIComponent(item.slug)}` : '#';
        const isActive = i === 1;
        return `
            <div class="slider-slide ${isActive ? 'active' : ''}" data-index="${i}" data-real-index="${i % items.length}">
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

    const slideCount = duplicatedItems.length;
    const slideWidth = 280 + 30;
    const totalWidth = slideCount * slideWidth;
    
    if (track) {
        track.style.width = `${totalWidth}px`;
        const startPosition = -slideWidth;
        track.style.transform = `translateX(${startPosition}px)`;
    }

    if (dotsContainer) {
        dotsContainer.innerHTML = items.map((_, i) => `
            <span class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
        `).join('');
    }

    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    setTimeout(() => startSlider(), 500);
}

let sliderInterval = null;
let currentSlide = 0;
let slideItems = [];
let isTransitioning = false;

function goToSlide(index) {
    if (isTransitioning || index === currentSlide) return;
    
    isTransitioning = true;
    currentSlide = index;
    
    const track = document.getElementById('itinerariesSliderTrack');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const slideWidth = 280 + 30;
    
    const position = -(index + 1) * slideWidth + slideWidth;
    
    track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform = `translateX(${position}px)`;
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index + 1) {
            slide.classList.add('active');
        }
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    setTimeout(() => {
        isTransitioning = false;
        
        const totalRealItems = slideItems.length;
        if (index >= totalRealItems - 1) {
            setTimeout(() => {
                track.style.transition = 'none';
                const resetPosition = -slideWidth;
                track.style.transform = `translateX(${resetPosition}px)`;
                currentSlide = 0;
                
                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === 1) {
                        slide.classList.add('active');
                    }
                });
                
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === 0);
                });
                
                setTimeout(() => {
                    track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 50);
            }, 50);
        }
    }, 750);
}

function goToNextSlide() {
    const totalItems = slideItems.length;
    const nextIndex = (currentSlide + 1) % totalItems;
    goToSlide(nextIndex);
}

function startSlider() {
    if (sliderInterval) {
        clearInterval(sliderInterval);
    }
    
    sliderInterval = setInterval(() => {
        goToNextSlide();
    }, 3000);
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

console.log('✅ Destinations script loaded successfully');
