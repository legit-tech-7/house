// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu') && 
            !event.target.closest('.mobile-menu-btn') && 
            mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Property Search Form Submission
    const searchForm = document.getElementById('propertySearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const params = new URLSearchParams();
            
            formData.forEach((value, key) => {
                if (value) params.append(key, value);
            });
            
            // Redirect to listings page with search parameters
            window.location.href = `/properties/?${params.toString()}`;
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In real implementation, you would use fetch() to send to your Django backend
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Property Image Gallery
    const mainPropertyImage = document.querySelector('.main-property-image');
    const thumbnailImages = document.querySelectorAll('.property-thumbnail');
    
    if (mainPropertyImage && thumbnailImages.length > 0) {
        thumbnailImages.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const newSrc = this.getAttribute('data-full');
                mainPropertyImage.src = newSrc;
                
                // Update active thumbnail
                thumbnailImages.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Price Formatter
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }
    
    // Update all price elements
    document.querySelectorAll('.property-price').forEach(priceEl => {
        const price = parseInt(priceEl.textContent.replace(/[^0-9]/g, ''));
        if (!isNaN(price)) {
            priceEl.textContent = formatPrice(price);
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add mobile menu CSS dynamically
    const mobileMenuCSS = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: var(--white);
            box-shadow: var(--shadow-hover);
            z-index: 2000;
            transition: left 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        
        .mobile-menu.active {
            left: 0;
        }
        
        .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: var(--primary-blue);
            color: var(--white);
        }
        
        .close-menu {
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .mobile-nav-links {
            list-style: none;
            padding: 20px;
            flex-grow: 1;
        }
        
        .mobile-nav-links li {
            margin-bottom: 15px;
        }
        
        .mobile-nav-links a {
            text-decoration: none;
            color: var(--dark-text);
            font-size: 1.1rem;
            font-weight: 500;
            display: block;
            padding: 10px 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .mobile-nav-links a:hover {
            color: var(--secondary-gold);
        }
        
        .mobile-menu-btn {
            display: none;
        }
        
        @media (max-width: 992px) {
            .mobile-menu-btn {
                display: block;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--primary-blue);
            }
        }
    `;
    
    // Add mobile menu styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileMenuCSS;
    document.head.appendChild(styleSheet);
});