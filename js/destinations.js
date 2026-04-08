// ============================================
// HOMEPAGE SCRIPT - RED DOT TOURS
// ============================================

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

// Dynamic More Itineraries Button with hover animation and click handler
const moreItinerariesBtn = document.getElementById('moreItinerariesBtn');
if (moreItinerariesBtn) {
    moreItinerariesBtn.addEventListener('click', () => {
        const btn = moreItinerariesBtn;
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Loading... <span class="arrow">⟳</span>';
        btn.style.opacity = '0.7';
        btn.style.cursor = 'wait';
        
        // Simulate loading delay
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            alert('More itineraries would load here. This is a dynamic button that could fetch additional content via AJAX.');
        }, 1000);
    });
}

// Update ScrollTrigger if using GSAP (ensures Lenis compatibility)
if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}