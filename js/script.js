// ============================================
// MAIN SCRIPT - SERENDIB ESCAPE
// ============================================

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// ============================================
// HERO SECTION ANIMATION
// ============================================
function initHero() {
    setTimeout(() => {
        document.getElementById('heroKicker')?.classList.add('animate-in');
        document.getElementById('heroHeadline')?.classList.add('animate-in');
        document.getElementById('heroDescription')?.classList.add('animate-in');
        document.getElementById('heroButtons')?.classList.add('animate-in');
    }, 100);
}

// ============================================
// MASONRY SECTION - UPDATED AUTO-SCROLL
// ============================================
function initMasonry() {
    // Left content - make it visible immediately
    const leftContent = document.getElementById('leftContent');
    if (leftContent) {
        leftContent.classList.add('animate-in');
    }

    // Make all cards visible immediately
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, i * 50);
    });

    // DESKTOP: INFINITE AUTO-SCROLL ANIMATION
    let autoScrollAnimation;
    let gridElement = document.getElementById('grid');
    let wrapper = document.querySelector('.masonry-wrapper');
    let isUserScrolling = false;
    let scrollTimeout;

    function initAutoScroll() {
        if (autoScrollAnimation) autoScrollAnimation.kill();
        
        if (window.innerWidth > 768 && gridElement && wrapper) {
            const gridHeight = gridElement.scrollHeight;
            const wrapperHeight = wrapper.clientHeight;
            
            if (gridHeight > wrapperHeight) {
                const duration = Math.max(25, Math.min(45, gridHeight / 35));
                
                // Use GSAP to animate scrollTop instead of transform
                // This allows manual scrolling to work
                let currentScroll = 0;
                
                autoScrollAnimation = gsap.to(wrapper, {
                    scrollTop: gridHeight - wrapperHeight,
                    duration: duration,
                    ease: "none",
                    repeat: -1,
                    modifiers: {
                        scrollTop: function(x) {
                            let current = parseFloat(x);
                            if (current >= gridHeight - wrapperHeight - 5) {
                                return 0;
                            }
                            return current;
                        }
                    },
                    onUpdate: function() {
                        if (isUserScrolling) {
                            autoScrollAnimation.pause();
                        }
                    },
                    onRepeat: function() {
                        if (!isUserScrolling) {
                            wrapper.scrollTop = 0;
                        }
                    }
                });
            }
        }
    }

    // Handle manual scroll - pause auto-scroll when user interacts
    if (wrapper) {
        wrapper.addEventListener('wheel', () => {
            isUserScrolling = true;
            if (autoScrollAnimation) autoScrollAnimation.pause();
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
                if (autoScrollAnimation) autoScrollAnimation.resume();
            }, 3000);
        });
        
        wrapper.addEventListener('mouseenter', () => {
            if (autoScrollAnimation) autoScrollAnimation.pause();
        });
        
        wrapper.addEventListener('mouseleave', () => {
            if (!isUserScrolling && autoScrollAnimation) {
                autoScrollAnimation.resume();
            }
        });
    }

    // MOBILE: CAROUSEL FUNCTIONALITY
    let currentIndex = 0;
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let autoPlayInterval;
    let slideCount = slides.length;

    function updateCarousel() {
        if (!track) return;
        const slideWidth = slides[0]?.clientWidth || 0;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
        resetAutoPlay();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
        resetAutoPlay();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }

    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        if (window.innerWidth <= 768) {
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        }
    }

    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    if (slides.length > 0) {
        createDots();
        updateCarousel();
        startAutoPlay();
    }

    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            initAutoScroll();
            if (window.innerWidth <= 768) {
                updateCarousel();
                startAutoPlay();
            } else {
                if (autoPlayInterval) clearInterval(autoPlayInterval);
            }
            ScrollTrigger.refresh();
        }, 250);
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            initAutoScroll();
            if (window.innerWidth <= 768) updateCarousel();
        }, 100);
    });

    window.addEventListener('beforeunload', () => {
        if (autoScrollAnimation) autoScrollAnimation.kill();
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    });
}// ============================================
// DESTINATIONS SECTION
// ============================================
function initDestinations() {
    ScrollTrigger.create({
        trigger: ".featured-destinations-section",
        start: "top 75%",
        onEnter: () => {
            document.getElementById('featuredMicro')?.classList.add('animate-in');
            document.getElementById('featuredHeadline')?.classList.add('animate-in');
            document.getElementById('featuredDescription')?.classList.add('animate-in');
            
            const featuredCards = document.querySelectorAll('.featured-card');
            featuredCards.forEach((card, i) => {
                setTimeout(() => card.classList.add('animate-in'), i * 80);
            });
            
            document.getElementById('buttonContainer')?.classList.add('animate-in');
        }
    });
}

// ============================================
// EVENTS SECTION
// ============================================
function initEvents() {
    // Events section animations
    const eventsSection = document.querySelector('.events-split-section');
    const eventsHeader = document.querySelector('.events-content-right');
    const eventCards = document.querySelectorAll('.event-mini-card');
    
    if (eventsSection) {
        ScrollTrigger.create({
            trigger: eventsSection,
            start: "top 75%",
            onEnter: () => {
                eventsHeader?.classList.add('animate-in');
                eventCards.forEach((card, i) => {
                    setTimeout(() => card.classList.add('animate-in'), i * 100);
                });
            }
        });
    }
    
    // Alternating Squares Functionality
    let currentState = {
        square1: 'pattern',
        square2: 'card',
        square3: 'card',
        square4: 'pattern'
    };
    
    function setSquareContent(squareId, type) {
        const square = document.getElementById(squareId);
        if (!square) return;
        
        const patternContent = square.querySelector('.pattern-content');
        const cardContent = square.querySelector('.event-mini-card');
        
        if (!patternContent || !cardContent) return;
        
        if (type === 'pattern') {
            patternContent.style.display = 'flex';
            cardContent.style.display = 'none';
        } else {
            patternContent.style.display = 'none';
            cardContent.style.display = 'block';
        }
    }
    
    function alternateSquares() {
        const newState = {
            square1: currentState.square1 === 'pattern' ? 'card' : 'pattern',
            square2: currentState.square2 === 'card' ? 'pattern' : 'card',
            square3: currentState.square3 === 'card' ? 'pattern' : 'card',
            square4: currentState.square4 === 'pattern' ? 'card' : 'pattern'
        };
        
        setSquareContent('square1', newState.square1);
        setSquareContent('square2', newState.square2);
        setSquareContent('square3', newState.square3);
        setSquareContent('square4', newState.square4);
        
        currentState = newState;
    }
    
    function initializeSquares() {
        setSquareContent('square1', 'pattern');
        setSquareContent('square2', 'card');
        setSquareContent('square3', 'card');
        setSquareContent('square4', 'pattern');
        currentState = {
            square1: 'pattern',
            square2: 'card',
            square3: 'card',
            square4: 'pattern'
        };
    }
    
    let alternationInterval;
    
    function startAlternation() {
        if (alternationInterval) clearInterval(alternationInterval);
        alternationInterval = setInterval(() => {
            alternateSquares();
        }, 5000);
    }
    
    initializeSquares();
    startAlternation();
    
    window.addEventListener('beforeunload', () => {
        if (alternationInterval) clearInterval(alternationInterval);
    });
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
function initTestimonials() {
    // Testimonials Carousel Data
    const testimonialsData = [
        {
            text: "If Red Dot ever ceased to exist and I wanted to return to Sri Lanka I would probably go somewhere else instead. They were, in every way shape and form, impeccable. From Samanthie who created the itinerary to Wicky who drove us here, there and everywhere I cannot imagine anybody doing it better.",
            name: "Anupa",
            location: "United Kingdom, July 2025",
            platform: "TripAdvisor",
            image: "https://images.pexels.com/photos/2245436/pexels-photo-2245436.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            text: "We chose this company as we wanted our money to benefit the people of Sri Lanka rather than international companies. Their work supports smaller businesses, projects and communities as well as the environment.",
            name: "Jessica E",
            location: "London, UK, August 2025",
            platform: "Feefo",
            image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            text: "Our 11th visit to this magical Island with always something new to discover and see. Total confidence that Red Dot would organise everything to perfection, having used them many times before.",
            name: "Roy L",
            location: "United Kingdom, March 2025",
            platform: "Feefo",
            image: "https://images.pexels.com/photos/2867380/pexels-photo-2867380.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
    ];

    let currentTestimonialIndex = 0;
    let testimonialInterval;

    function updateTestimonial() {
        const t = testimonialsData[currentTestimonialIndex];
        const testimonialText = document.getElementById('testimonialText');
        const testimonialName = document.getElementById('testimonialName');
        const testimonialLocation = document.getElementById('testimonialLocation');
        const testimonialPlatform = document.getElementById('testimonialPlatform');
        const testimonialImage = document.getElementById('testimonialImage');
        
        if (testimonialText) testimonialText.innerHTML = t.text;
        if (testimonialName) testimonialName.innerHTML = t.name;
        if (testimonialLocation) testimonialLocation.innerHTML = t.location;
        if (testimonialPlatform) testimonialPlatform.innerHTML = t.platform;
        if (testimonialImage) testimonialImage.src = t.image;
        
        // Update dots
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
            if (idx === currentTestimonialIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsData.length;
        updateTestimonial();
        resetAutoPlay();
    }

    function prevTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialsData.length) % testimonialsData.length;
        updateTestimonial();
        resetAutoPlay();
    }

    function goToTestimonial(index) {
        currentTestimonialIndex = index;
        updateTestimonial();
        resetAutoPlay();
    }

    function startAutoPlay() {
        if (testimonialInterval) clearInterval(testimonialInterval);
        testimonialInterval = setInterval(() => {
            nextTestimonial();
        }, 6000);
    }

    function resetAutoPlay() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
            startAutoPlay();
        }
    }

    function createTestimonialDots() {
        const dotsContainer = document.getElementById('carouselDots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        testimonialsData.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(idx));
            dotsContainer.appendChild(dot);
        });
    }

    createTestimonialDots();
    updateTestimonial();
    startAutoPlay();
    
    // Add event listeners for navigation buttons
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    
    // Scroll-triggered animation
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    testimonialsSection.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(testimonialsSection);
    }
    
    window.addEventListener('beforeunload', () => {
        if (testimonialInterval) clearInterval(testimonialInterval);
    });
}

// ============================================
// ARTICLES SECTION
// ============================================
function initArticles() {
    // Articles section animations can be added here
    const articlesSection = document.querySelector('.featured-articles-section');
    if (articlesSection) {
        ScrollTrigger.create({
            trigger: articlesSection,
            start: "top 75%",
            onEnter: () => {
                // Add animation for articles if needed
            }
        });
    }
}

// ============================================
// WHY CHOOSE US SECTION
// ============================================
function initWhyChooseUs() {
    // Why Choose Us section already has CSS animations
    // Additional functionality can be added here if needed
}

// ============================================
// INITIALIZE ALL SECTIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initHero();
    initMasonry();
    initDestinations();
    initEvents();
    initTestimonials();
    initArticles();
    initWhyChooseUs();
});

// ============================================
// HOW IT WORKS SECTION SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for cards when they come into view
    const howCards = document.querySelectorAll('.how-card');
    const howRight = document.querySelector('.how-right');
    const howCtaBtn = document.getElementById('howCtaBtn');
    
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('how-card')) {
                    // Cards already have staggered animation via CSS
                    // Just ensure they become visible
                    entry.target.style.opacity = '1';
                }
                if (entry.target.classList.contains('how-right')) {
                    entry.target.classList.add('animate-in');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe cards for animation
    howCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe right column
    if (howRight) {
        observer.observe(howRight);
    }
    
    // Button click handler
    if (howCtaBtn) {
        howCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your button functionality here
            console.log('Start planning button clicked');
            // You can redirect to a contact page or open a modal
            // window.location.href = '/contact.html';
        });
    }
    
    // Optional: Add hover effect for touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        // For touch devices, handle card tap to show hover content
        howCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Prevent if clicking on button inside
                if (e.target.closest('.how-cta-btn')) return;
                
                // Remove active class from other cards
                howCards.forEach(c => {
                    if (c !== card) {
                        c.classList.remove('touch-active');
                    }
                });
                
                // Toggle active class on current card
                card.classList.toggle('touch-active');
                
                // Auto-remove after 3 seconds
                setTimeout(() => {
                    card.classList.remove('touch-active');
                }, 3000);
            });
        });
        
        // Add CSS for touch-active state
        const style = document.createElement('style');
        style.textContent = `
            .how-card.touch-active .card-front {
                opacity: 0;
                transform: scale(0.98);
            }
            .how-card.touch-active .card-hover {
                opacity: 1;
                transform: scale(1);
            }
        `;
        document.head.appendChild(style);
    }
});

// ============================================
// FOUNDER'S STATEMENT - SIMPLE SCROLL REVEAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const founderStatement = document.querySelector('.founder-statement');
    
    if (founderStatement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        
        observer.observe(founderStatement);
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================


// Header scroll effect is handled in header.js