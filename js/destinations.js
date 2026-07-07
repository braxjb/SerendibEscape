// ============================================
// DESTINATIONS PAGE SCRIPT - SERENDIB ESCAPE
// ============================================

// ── SUPABASE CLIENT ──
// Create Supabase client if it doesn't exist
if (typeof supabaseClient === 'undefined') {
    const SUPABASE_URL = "https://fqpofzlxixbitybltajx.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcG9memx4aXhiaXR5Ymx0YWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjc5MDksImV4cCI6MjA5MTc0MzkwOX0.woDW07ULao_dYlqBaafJmc1Mjt3FAthShm0CBoMmWFY";
    
    if (typeof window !== 'undefined' && window.supabase) {
        var supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        });
        console.log("✅ Supabase client initialized in destinations.js");
    } else {
        console.error("❌ Supabase not available. Make sure the CDN script is loaded.");
    }
}

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
        // Check if supabaseClient exists
        if (typeof supabaseClient === 'undefined') {
            console.error('❌ supabaseClient is not defined!');
            return [];
        }

        console.log('🔍 Fetching itineraries from Supabase...');
        
        const { data, error } = await supabaseClient
            .from('itineraries')
            .select('id, slug, title, region, duration_nights, duration_label, hero_image, card_image, excerpt, summary, short_description, is_published, sort_order, created_at')
            .eq('is_published', true)
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
        }

        console.log(`✅ Found ${data?.length || 0} itineraries`);
        return data || [];
    } catch (err) {
        console.error('❌ Error fetching itineraries:', err);
        return [];
    }
}

function renderItineraries(items) {
    const grid = document.getElementById('itinerariesGrid');
    if (!grid) {
        console.error('❌ Itineraries grid not found!');
        return;
    }

    console.log(`📊 Rendering ${items?.length || 0} itineraries`);

    if (!items || items.length === 0) {
        grid.innerHTML = `
            <div class="itinerary-empty">
                <h3>No itineraries available yet.</h3>
                <p>We are currently preparing our Sri Lanka itinerary ideas. Please check back soon, or contact us to design a tailor-made journey.</p>
                <a href="./contact.html" class="btn-primary">Enquire Now <span class="btn-arrow">→</span></a>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map((item, i) => {
        const url = item.slug ? `itinerary.html?slug=${encodeURIComponent(item.slug)}` : '#';
        return `
            <a href="${url}" class="itinerary-card reveal" style="--i:${i}">
                <img src="${escapeHtml(getImage(item))}" alt="${escapeHtml(item.title)}" loading="lazy" />
                <div class="itinerary-content">
                    <span class="itinerary-meta">${escapeHtml(item.region || 'Sri Lanka')} • ${escapeHtml(getDuration(item))}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(getExcerpt(item))}</p>
                    <span class="itinerary-link">View itinerary →</span>
                </div>
            </a>
        `;
    }).join('');

    // Trigger reveal animations
    setTimeout(() => {
        document.querySelectorAll('.itinerary-card.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), 100 + i * 60);
        });
    }, 100);
}

async function initItineraries() {
    console.log('🚀 Initializing itineraries...');
    
    const grid = document.getElementById('itinerariesGrid');
    if (!grid) {
        console.error('❌ Itineraries grid not found!');
        return;
    }

    try {
        const data = await fetchItineraries();
        renderItineraries(data);
    } catch (err) {
        console.error('❌ Failed to load itineraries:', err);
        grid.innerHTML = `
            <div class="itinerary-empty">
                <h3>Unable to load itineraries</h3>
                <p>We're having trouble loading our itinerary ideas. Please try again later or contact us to design a tailor-made journey.</p>
                <a href="./contact.html" class="btn-primary">Enquire Now <span class="btn-arrow">→</span></a>
            </div>
        `;
    }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Destinations page loaded');
    
    // Wait for Supabase client to be ready
    setTimeout(() => {
        initItineraries();
    }, 500);
});

// Also try to load if window loads (fallback)
window.addEventListener('load', function() {
    // If not already initialized, try again
    const grid = document.getElementById('itinerariesGrid');
    if (grid && grid.children.length === 0) {
        console.log('🔄 Retrying itinerary load...');
        setTimeout(initItineraries, 300);
    }
});
