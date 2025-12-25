// Product Data
const products = [
    { id: 1, name: "Yonex Astrox 100 ZZ", price: 299.99, category: "racket", image: "images/racket/astrox99zz.png" },
    { id: 2, name: "Yonex Astrox 99", price: 169, category: "racket", image: "images/racket/astrox99.png" },
    { id: 3, name: "Yonex Anniversary Shirt", price: 21.99, category: "shirt", image: "images/shirt/shirt.png" },
    { id: 4, name: "Yonex Comfort Shirt", price: 18.99, category: "shirt", image: "images/shirt/ym0043_011__1-removebg-preview.png" },
    { id: 5, name: "Yonex Black Short", price: 18.99, category: "short", image: "images/short/black-short.png" },
    { id: 6, name: "Yonex Cascade Blue", price: 129.99, category: "shoes", image: "images/shoes/blue.png" },
    { id: 7, name: "Yonex Power Cushion", price: 189, category: "shoes", image: "images/shoes/powergreen.png" },
    { id: 8, name: "Power Cushion 65 Z2", price: 189, category: "shoes", image: "images/shoes/yonexwhite.png" },
    { id: 9, name: "Yonex Power Cushion White", price: 119, category: "shoes", image: "images/shoes/powerwhite.png" },
    { id: 10, name: "Yonex White", price: 169, category: "shoes", image: "images/shoes/int_shbvan_452-1_1-removebg-preview.png" },
    { id: 11, name: "Yonex Nanoflare 800 Pro", price: 169, category: "racket", image: "images/racket/800pro.png" },
    { id: 12, name: "Yonex Nanoflare 001", price: 39, category: "racket", image: "images/racket/nf-001.png" },
    { id: 13, name: "Yonex Astrox 22F", price: 119, category: "racket", image: "images/racket/astrox_22f.png" },
    { id: 14, name: "Yonex Nanoflare 002", price: 49, category: "racket", image: "images/racket/nf-002.png"},
    { id: 15, name: "Yonex Astrox 88D", price: 159, category: "racket", image: "images/racket/astrox88d.png"},
    { id: 16, name: "Yonex Power Cushion 65Z", price: 179, category: "shoes", image: "images/shoes/65z.png"},
    
];
//side bar
function showSidebar(){
    const sidebar= document.querySelector('.sidebar')
    sidebar.style.display='flex'
}

// Cart Management
let cart = [];

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('yonexCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('yonexCart', JSON.stringify(cart));
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
    showAddToCartNotification(product.name);
}

// Update Cart Count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.querySelector('#cart-links span');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

// Show Add to Cart Notification
function showAddToCartNotification(productName) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg>
        <span>${productName} added to cart!</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Slideshow Functionality - FIXED VERSION
function initializeSlideshows() {
    const productSections = document.querySelectorAll('.product-section');
    
    productSections.forEach(section => {
        const container = section.querySelector('.product-cards-container ul');
        const prevButton = section.querySelector('.prev-button');
        const nextButton = section.querySelector('.next-button');
        
        if (!container || !prevButton || !nextButton) return;
        
        // Calculate scroll amount based on visible cards
        const getScrollAmount = () => {
            const containerWidth = container.clientWidth;
            const cardWidth = 260; // card width
            const gap = 20; // gap between cards
            const cardWithGap = cardWidth + gap;
            
            // Calculate how many cards fit in the viewport
            const cardsVisible = Math.floor(containerWidth / cardWithGap);
            
            // Scroll by the number of visible cards (minimum 1, maximum 3)
            const scrollCards = Math.max(1, Math.min(3, cardsVisible));
            
            return scrollCards * cardWithGap;
        };
        
        // Update button states
        const updateButtonStates = () => {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Disable prev button at start
            if (scrollLeft <= 0) {
                prevButton.style.opacity = '0.5';
                prevButton.style.cursor = 'not-allowed';
            } else {
                prevButton.style.opacity = '1';
                prevButton.style.cursor = 'pointer';
            }
            
            // Disable next button at end
            if (scrollLeft >= maxScroll - 5) { // -5 for rounding errors
                nextButton.style.opacity = '0.5';
                nextButton.style.cursor = 'not-allowed';
            } else {
                nextButton.style.opacity = '1';
                nextButton.style.cursor = 'pointer';
            }
        };
        
        // Next button
        nextButton.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            const currentScroll = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const newScroll = Math.min(currentScroll + scrollAmount, maxScroll);
            
            container.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
            
            // Update button states after animation
            setTimeout(updateButtonStates, 400);
        });
        
        // Previous button
        prevButton.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            const currentScroll = container.scrollLeft;
            const newScroll = Math.max(currentScroll - scrollAmount, 0);
            
            container.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
            
            // Update button states after animation
            setTimeout(updateButtonStates, 400);
        });
        
        // Update button states on scroll
        container.addEventListener('scroll', updateButtonStates);
        
        // Initial button state
        updateButtonStates();
        
        // Update on window resize
        window.addEventListener('resize', () => {
            updateButtonStates();
        });
    });
}

// Navbar Scroll Effect
function initializeNavbar() {
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }
        
        lastScroll = currentScroll;
    });
}

// Shop Now Button
function initializeShopButton() {
    const shopButton = document.querySelector('#product-top-text-section .orange-button');
    if (shopButton) {
        shopButton.addEventListener('click', () => {
            const firstProductSection = document.querySelector('.product-section');
            if (firstProductSection) {
                firstProductSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

// Add to Cart Button Event Listeners
function initializeAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.product-text-container .orange-button');
    
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Find product based on the card index
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const product = products.find(p => p.name === productName);
            
            if (product) {
                addToCart(product.id);
                
                // Button animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });
}

// Smooth Scroll for Navigation Links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('#navbar-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only prevent default for hash links
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Product Card Hover Effect Enhancement
function initializeProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 8px 40px rgba(71, 71, 71, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 0 30px rgba(71, 71, 71, 0.1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initializeNavbar();
    initializeSlideshows();
    initializeShopButton();
    initializeAddToCartButtons();
    initializeSmoothScroll();
    initializeProductCardEffects();
    
    console.log('Yonex Zone initialized successfully!');
});

// Export functions for use in other pages (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cart,
        addToCart,
        updateCartCount,
        products
    };
}

 // Get elements
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const navbarLinks = document.getElementById('navbar-links');
        const menuOverlay = document.getElementById('menuOverlay');
        const navLinks = navbarLinks.querySelectorAll('a');

        // Toggle menu function
        function toggleMenu() {
            hamburgerMenu.classList.toggle('active');
            navbarLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }

        // Close menu function
        function closeMenu() {
            hamburgerMenu.classList.remove('active');
            navbarLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        // Hamburger menu click
        hamburgerMenu.addEventListener('click', toggleMenu);

        // Overlay click to close
        menuOverlay.addEventListener('click', closeMenu);

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on window resize to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        // Prevent body scroll when menu is open
        document.body.addEventListener('touchmove', function(e) {
            if (document.body.classList.contains('menu-open')) {
                e.preventDefault();
            }
        }, { passive: false });