// Main Application Entry Point
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ubuntu Explorer - Initializing...');
    
    // Initialize all components
    window.featuresComponent = new FeaturesComponent();
    window.countriesComponent = new CountriesComponent();
    window.testimonialsComponent = new TestimonialsComponent();
    window.statsComponent = new StatsComponent();
    
    // Render components
    window.featuresComponent.render();
    window.countriesComponent.renderPreview();
    window.testimonialsComponent.render();
    window.statsComponent.render();
    
    // Initialize navigation and interactions
    setupNavigation();
    setupVideoController();
    setupAIAssistant();
    setupNavbarScroll();
    initIntroVideoControls();
    initAnimations();
    
    console.log('Ubuntu Explorer - Initialized successfully!');
});

// Navigation Setup
function setupNavigation() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Video Controller Setup
function setupVideoController() {
    let currentVideoIndex = 0;
    let isScrolling = false;
    const videos = CONFIG.VIDEOS;
    
    // Initialize first video
    loadVideo(0);
    
    // Mouse wheel event for hero section
    const heroSection = document.getElementById('home');
    heroSection.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        e.preventDefault();
        isScrolling = true;
        
        if (e.deltaY > 0) {
            nextVideo();
        } else {
            previousVideo();
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 800);
    });
    
    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        loadVideo(currentVideoIndex);
    }
    
    function previousVideo() {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        loadVideo(currentVideoIndex);
    }
    
    // Global function for dot clicks
    window.loadVideo = function(index) {
        currentVideoIndex = index;
        const video = document.getElementById('heroVideo');
        const source = document.getElementById('videoSource');
        
        source.src = videos[index];
        video.load();
        video.play().catch(error => console.log('Video play error:', error));
        
        updateVideoIndicator();
    };
    
    function updateVideoIndicator() {
        const dots = document.querySelectorAll('.video-dot');
        dots.forEach((dot, index) => {
            if (index === currentVideoIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// AI Assistant Setup
function setupAIAssistant() {
    const aiButton = document.querySelector('.ai-assistant button');
    const aiChat = document.querySelector('.ai-chat');
    const closeChat = document.querySelector('.close-chat');
    const sendChat = document.querySelector('.send-chat');
    const chatInput = document.querySelector('.ai-chat input');
    
    if (aiButton) {
        aiButton.addEventListener('click', function() {
            aiChat.classList.toggle('hidden');
        });
    }
    
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            aiChat.classList.add('hidden');
        });
    }
    
    if (sendChat && chatInput) {
        sendChat.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I'd be happy to help you explore that destination! What specific aspects interest you most?",
                "That's a great choice! I can recommend some amazing local experiences there.",
                "Let me find some authentic experiences that match your interests in that area.",
                "I have some wonderful suggestions for hidden gems in that region!"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'ai');
        }, 1000);
    }
    
    function addMessage(text, sender) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message mb-3`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="text-xs text-gray-500 mb-1 text-right">You</div>
                <div class="bg-ubuntu-blue text-white p-3 rounded-lg ml-8">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="text-xs text-gray-500 mb-1">Ubuntu AI</div>
                <div class="bg-gray-100 p-3 rounded-lg mr-8">${text}</div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('navbar-transparent');
        }
    });
}

// Intro Video Controls
function initIntroVideoControls() {
    const introVideo = document.getElementById('introVideo');
    const playButton = document.getElementById('playIntroVideo');
    const customPlayButton = document.getElementById('customPlayButton');
    const videoOverlay = document.getElementById('videoOverlay');

    if (playButton && introVideo) {
        playButton.addEventListener('click', function() {
            introVideo.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                introVideo.play();
                if (videoOverlay) videoOverlay.style.display = 'none';
            }, 800);
        });
    }

    if (customPlayButton && introVideo) {
        customPlayButton.addEventListener('click', function() {
            introVideo.play();
            if (videoOverlay) videoOverlay.style.display = 'none';
        });
    }
}

// Initialize Animations
function initAnimations() {
    // Lazy load images
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.add("loaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        document.querySelectorAll("img.lazy").forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
    
    // Animate elements when they come into view
    const elements = document.querySelectorAll('.animate-fadeInUp');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translate3d(0, 0, 0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translate3d(0, 20px, 0)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, CONFIG.NOTIFICATIONS.DURATION);
}

// Authentication Modal Handlers (simplified)
document.addEventListener('click', function(e) {
    if (e.target.id === 'loginBtn' || e.target.id === 'signupBtn' || e.target.id === 'ctaSignup') {
        showNotification('Authentication system coming soon!', 'info');
    }
});

// Country Detection Banner
document.addEventListener('click', function(e) {
    if (e.target.id === 'closeCountryBanner') {
        document.getElementById('countryDetectionBanner').classList.add('hidden');
    }
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Ubuntu Explorer loaded in ${Math.round(loadTime)}ms`);
});
