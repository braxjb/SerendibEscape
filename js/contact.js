// ============================================
// CONTACT PAGE SCRIPT - SERENDIB ESCAPE
// ============================================

document.addEventListener('DOMContentLoaded', function () {
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
    const contactForm = document.getElementById('contactForm');

    function encodeFormData(data) {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnHTML = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <div class="arrow-icon">
                    <div class="dashed-circle"></div>
                    <i class="fas fa-paper-plane"></i>
                </div>
            `;

            const formData = new FormData(contactForm);
            const data = {};

            formData.forEach((value, key) => {
                data[key] = value;
            });

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: encodeFormData({
                        'form-name': contactForm.getAttribute('name'),
                        ...data
                    })
                });

                if (response.ok) {
                    contactForm.outerHTML = `
                        <div class="contact-success-message">
                            <div class="success-icon">
                                <i class="fas fa-check"></i>
                            </div>
                            <h3>Thank you for contacting us</h3>
                            <p>
                                Your enquiry has been received successfully. One of our travel specialists
                                will get back to you soon to begin planning your Sri Lankan journey.
                            </p>
                        </div>
                    `;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                alert('Sorry, something went wrong. Please try again.');
                console.error('Netlify form error:', error);
            }
        });
    }

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