 document.addEventListener('DOMContentLoaded', function() {
        const header = document.getElementById('siteHeader');
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenuOverlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        
        // Scroll effect for header
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Function to open mobile menu
        function openMobileMenu() {
            if (mobileMenu) {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'true');
                }
            }
        }
        
        // Function to close mobile menu
        function closeMobileMenu() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
        
        // Toggle mobile menu on hamburger click
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });
        }
        
        // Close menu on close button click
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }
        
        // Close menu when clicking on a mobile nav link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu when clicking on overlay background
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    closeMobileMenu();
                }
            });
        }
        
        // Handle window resize - close mobile menu if resizing to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Set active nav link based on current page
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            } else if (currentPath === '' && href === 'index.html') {
                link.classList.add('active');
            } else if (currentPath === 'index.html' && href === 'index.html') {
                link.classList.add('active');
            }
        });
        
        // Prevent body scroll when menu is open (safety)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        });
        
        observer.observe(mobileMenu, { attributes: true, attributeFilter: ['class'] });
    });