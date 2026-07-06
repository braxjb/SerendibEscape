// ============================================
// DESTINATIONS PAGE SCRIPT - SERENDIB ESCAPE
// ============================================

// ── SUPABASE CLIENT ──
// Make sure supabaseClient is available
// If it's not loaded from the HTML, we need to create it
if (typeof supabaseClient === 'undefined' && typeof window !== 'undefined') {
    // Check if window.supabase exists (loaded from CDN)
    if (window.supabase) {
        const SUPABASE_URL = "https://fqpofzlxixbitybltajx.supabase.co";
        const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcG9memx4aXhiaXR5Ymx0YWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjc5MDksImV4cCI6MjA5MTc0MzkwOX0.woDW07ULao_dYlqBaafJmc1Mjt3FAthShm0CBoMmWFY";
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

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// INTERSECTION OBSERVER for scroll-triggered text reveals
const revealElements = document.querySelectorAll('.reveal-text');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));

// Observe destination cards for staggered reveal
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
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// ── DYNAMIC MORE ITINERARIES BUTTON ──
const moreItinerariesBtn = document.getElementById('moreItinerariesBtn');
if (moreItinerariesBtn) {
    moreItinerariesBtn.addEventListener('click', () => {
        const btn = moreItinerariesBtn;
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Loading... <span class="arrow">⟳</span>';
        btn.style.opacity = '0.7';
        btn.style.cursor = 'wait';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            const itinerariesSection = document.getElementById('itineraries');
            if (itinerariesSection) {
                itinerariesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    });
}

// ── DESTINATION ITINERARIES - SUPABASE INTEGRATION ──

function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getItineraryDuration(row) {
    if (row.duration_label) return row.duration_label;
    if (row.duration_nights) {
        const nights = Number(row.duration_nights);
        return nights === 1 ? "1 Night" : `${nights} Nights`;
    }
    return "Tailor-made journey";
}

function getItineraryImage(row) {
    return row.card_image || row.hero_image || "https://images.pexels.com/photos/161140/sri-lanka-asia-travel-beach-161140.jpeg?auto=compress&cs=tinysrgb&w=600";
}

function getItineraryExcerpt(row) {
    return row.excerpt || row.summary || row.short_description || "A private Sri Lanka journey designed around culture, wildlife, scenery and authentic local experiences.";
}

function mapDestinationItinerary(row) {
    return {
        id: row.id,
        slug: row.slug || "",
        title: row.title || "Untitled Itinerary",
        region: row.region || "Sri Lanka",
        duration: getItineraryDuration(row),
        image: getItineraryImage(row),
        excerpt: getItineraryExcerpt(row)
    };
}

async function fetchDestinationItineraries() {
    try {
        // Check if supabaseClient exists
        if (typeof supabaseClient === 'undefined') {
            console.error("❌ supabaseClient is not defined!");
            return [];
        }

        console.log("🔍 Fetching itineraries from Supabase...");
        
        const { data, error } = await supabaseClient
            .from("itineraries")
            .select(`
                id,
                slug,
                title,
                region,
                duration_nights,
                duration_label,
                hero_image,
                card_image,
                excerpt,
                summary,
                short_description,
                is_published,
                sort_order,
                created_at
            `)
            .eq("is_published", true)
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });

        if (error) {
            console.error("❌ Supabase error:", error);
            throw error;
        }

        console.log(`✅ Found ${data?.length || 0} itineraries`);
        return (data || []).map(mapDestinationItinerary);
    } catch (error) {
        console.error("❌ Error fetching itineraries:", error);
        return [];
    }
}

function renderDestinationItineraries(itineraries) {
    const grid = document.getElementById("destinationItineraryGrid");
    if (!grid) {
        console.error("❌ destinationItineraryGrid not found in DOM");
        return;
    }

    console.log(`📊 Rendering ${itineraries?.length || 0} itineraries`);

    if (!itineraries || itineraries.length === 0) {
        grid.innerHTML = `
            <div class="itinerary-empty-state">
                <h3>No itineraries available yet.</h3>
                <p>
                    We are currently preparing our Sri Lanka itinerary ideas. Please check back soon,
                    or contact us to design a tailor-made journey.
                </p>
                <a href="./contact.html" class="btn-primary">
                    Enquire Now
                    <span class="btn-arrow">→</span>
                </a>
            </div>
        `;
        return;
    }

    grid.innerHTML = itineraries.map((item, index) => {
        const url = item.slug
            ? `itinerary.html?slug=${encodeURIComponent(item.slug)}`
            : "#";

        return `
            <a href="${url}" class="itinerary-card reveal" style="--i: ${index}; text-decoration: none;">
                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" />
                <div class="itinerary-content">
                    <span>${escapeHtml(item.region)} • ${escapeHtml(item.duration)}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.excerpt)}</p>
                    <span class="itinerary-link">View itinerary →</span>
                </div>
            </a>
        `;
    }).join("");

    // Re-observe reveal elements for animations
    document.querySelectorAll(".itinerary-card.reveal").forEach((el, index) => {
        el.style.setProperty('--i', index);
        setTimeout(() => {
            el.classList.add('is-visible');
        }, 100 + index * 50);
    });
}

async function initDestinationItineraries() {
    console.log("🚀 Initializing destination itineraries...");
    
    const grid = document.getElementById("destinationItineraryGrid");
    if (!grid) {
        console.error("❌ destinationItineraryGrid not found!");
        return;
    }

    try {
        const itineraries = await fetchDestinationItineraries();
        console.log(`📦 Received ${itineraries.length} itineraries`);
        renderDestinationItineraries(itineraries);
    } catch (error) {
        console.error("❌ Error loading destination itineraries:", error);
        grid.innerHTML = `
            <div class="itinerary-empty-state">
                <h3>Unable to load itineraries</h3>
                <p>
                    We're having trouble loading our itinerary ideas. Please try again later
                    or contact us to design a tailor-made journey.
                </p>
                <a href="./contact.html" class="btn-primary">
                    Enquire Now
                    <span class="btn-arrow">→</span>
                </a>
            </div>
        `;
    }
}

// ── INIT ──
document.addEventListener("DOMContentLoaded", function() {
    console.log("📄 Destinations page loaded");
    
    // Small delay to ensure Supabase client is ready
    setTimeout(() => {
        initDestinationItineraries();
    }, 500);
});

// Update ScrollTrigger if using GSAP (ensures Lenis compatibility)
if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}
