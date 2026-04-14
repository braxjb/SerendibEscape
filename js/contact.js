// ============================================
// CONTACT PAGE SCRIPT - SERENDIB ESCAPE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lenis Smooth Scroll
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

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo(0, { immediate: true });
        });
    }

    // Form submission handler
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         alert('Thank you for your enquiry! Our travel specialists will get back to you within 24 hours.');
    //         contactForm.reset();
    //     });
    // }

    // Plan trip button handler - scrolls to form
    const planTripBtn = document.getElementById('planTripBtn');
    if (planTripBtn) {
        planTripBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const formSection = document.querySelector('.contact-left');
            if (formSection) {
                lenis.scrollTo(formSection, { offset: -80 });
                const firstInput = document.querySelector('.contact-form input');
                if (firstInput) firstInput.focus();
            }
        });
    }

    // Expose lenis to window for potential use elsewhere
    window.lenis = lenis;
});