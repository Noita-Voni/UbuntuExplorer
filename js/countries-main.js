// Countries Page Main Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Countries Page - Initializing...');
    
    // Initialize countries component
    const countriesComponent = new CountriesComponent();
    
    // Render full countries page
    const countriesGrid = document.getElementById('countries-grid');
    if (countriesGrid) {
        countriesGrid.innerHTML = countriesComponent.renderCountriesGrid();
        countriesComponent.addEventListeners();
    }
    
    // Initialize page functionality
    setupSearch();
    setupFilters();
    setupBackToTop();
    initAnimations();
    
    console.log('Countries Page - Initialized successfully!');
});

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('country-search');
    const regionFilter = document.getElementById('region-filter');
    const experienceFilter = document.getElementById('experience-filter');
    const clearFilters = document.getElementById('clear-filters');
    const clearAllFilters = document.getElementById('clear-all-filters');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', performSearch);
    }
    
    if (experienceFilter) {
        experienceFilter.addEventListener('change', performSearch);
    }
    
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFiltersFunc);
    }
    
    if (clearAllFilters) {
        clearAllFilters.addEventListener('click', clearAllFiltersFunc);
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedRegion = regionFilter.value;
        const selectedExperience = experienceFilter.value;
        
        const cards = document.querySelectorAll('.country-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const countryName = card.dataset.country.toLowerCase();
            const countryRegion = card.dataset.region;
            const countryData = COUNTRIES_DATA[card.dataset.country];
            
            // Search criteria
            const matchesSearch = !searchTerm || 
                countryName.includes(searchTerm) ||
                countryData.cities.toLowerCase().includes(searchTerm) ||
                countryData.description.toLowerCase().includes(searchTerm) ||
                countryData.highlights.some(h => h.toLowerCase().includes(searchTerm));
            
            const matchesRegion = !selectedRegion || countryRegion === selectedRegion;
            
            const matchesExperience = !selectedExperience || 
                countryData.highlights.some(h => {
                    switch(selectedExperience) {
                        case 'culture': return h.toLowerCase().includes('culture') || h.toLowerCase().includes('temple') || h.toLowerCase().includes('palace');
                        case 'adventure': return h.toLowerCase().includes('adventure') || h.toLowerCase().includes('safari') || h.toLowerCase().includes('mountain');
                        case 'nature': return h.toLowerCase().includes('nature') || h.toLowerCase().includes('park') || h.toLowerCase().includes('reef') || h.toLowerCase().includes('rainforest');
                        case 'food': return h.toLowerCase().includes('food') || h.toLowerCase().includes('wine') || h.toLowerCase().includes('cuisine');
                        case 'history': return h.toLowerCase().includes('wall') || h.toLowerCase().includes('colosseum') || h.toLowerCase().includes('pyramid');
                        default: return true;
                    }
                });
            
            if (matchesSearch && matchesRegion && matchesExperience) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        updateResultsSummary(visibleCount);
        updateFilterTags(searchTerm, selectedRegion, selectedExperience);
        
        // Show/hide no results message
        const noResults = document.getElementById('no-results');
        const countriesGrid = document.getElementById('countries-grid');
        
        if (visibleCount === 0) {
            noResults.classList.remove('hidden');
            countriesGrid.classList.add('hidden');
        } else {
            noResults.classList.add('hidden');
            countriesGrid.classList.remove('hidden');
        }
    }
    
    function clearAllFiltersFunc() {
        searchInput.value = '';
        regionFilter.value = '';
        experienceFilter.value = '';
        performSearch();
    }
}

// Filter Management
function setupFilters() {
    // Add dynamic filter options based on data
    const experienceTypes = new Set();
    Object.values(COUNTRIES_DATA).forEach(country => {
        country.highlights.forEach(highlight => {
            if (highlight.toLowerCase().includes('culture') || highlight.toLowerCase().includes('temple') || highlight.toLowerCase().includes('palace')) {
                experienceTypes.add('culture');
            }
            if (highlight.toLowerCase().includes('adventure') || highlight.toLowerCase().includes('safari') || highlight.toLowerCase().includes('mountain')) {
                experienceTypes.add('adventure');
            }
            if (highlight.toLowerCase().includes('nature') || highlight.toLowerCase().includes('park') || highlight.toLowerCase().includes('reef')) {
                experienceTypes.add('nature');
            }
            if (highlight.toLowerCase().includes('food') || highlight.toLowerCase().includes('wine') || highlight.toLowerCase().includes('cuisine')) {
                experienceTypes.add('food');
            }
            if (highlight.toLowerCase().includes('wall') || highlight.toLowerCase().includes('colosseum') || highlight.toLowerCase().includes('pyramid')) {
                experienceTypes.add('history');
            }
        });
    });
}

function updateResultsSummary(visibleCount) {
    const visibleCountSpan = document.getElementById('visible-count');
    const totalCountSpan = document.getElementById('total-count');
    
    if (visibleCountSpan) visibleCountSpan.textContent = visibleCount;
    if (totalCountSpan) totalCountSpan.textContent = Object.keys(COUNTRIES_DATA).length - 1; // Exclude EU
}

function updateFilterTags(searchTerm, region, experience) {
    const filterTags = document.getElementById('filter-tags');
    if (!filterTags) return;
    
    let tags = [];
    
    if (searchTerm) {
        tags.push({
            text: `Search: "${searchTerm}"`,
            type: 'search',
            value: searchTerm
        });
    }
    
    if (region) {
        tags.push({
            text: `Region: ${region.charAt(0).toUpperCase() + region.slice(1)}`,
            type: 'region',
            value: region
        });
    }
    
    if (experience) {
        tags.push({
            text: `Experience: ${experience.charAt(0).toUpperCase() + experience.slice(1)}`,
            type: 'experience',
            value: experience
        });
    }
    
    filterTags.innerHTML = tags.map(tag => `
        <span class="filter-tag" data-type="${tag.type}" data-value="${tag.value}">
            ${tag.text}
            <button class="ml-2 text-xs hover:text-red-300" onclick="removeFilter('${tag.type}')">
                <i class="fas fa-times"></i>
            </button>
        </span>
    `).join('');
}

// Remove individual filter
function removeFilter(type) {
    switch(type) {
        case 'search':
            document.getElementById('country-search').value = '';
            break;
        case 'region':
            document.getElementById('region-filter').value = '';
            break;
        case 'experience':
            document.getElementById('experience-filter').value = '';
            break;
    }
    
    // Trigger search update
    const searchInput = document.getElementById('country-search');
    searchInput.dispatchEvent(new Event('input'));
}

// Back to Top Button
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize Animations
function initAnimations() {
    // Animate cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translate3d(0, 0, 0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Animate country cards
    document.querySelectorAll('.country-card').forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translate3d(0, 30px, 0)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate other elements
    document.querySelectorAll('.animate-fadeInUp').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translate3d(0, 20px, 0)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Authentication handlers
document.addEventListener('click', function(e) {
    if (e.target.id === 'loginBtn' || e.target.id === 'signupBtn') {
        showNotification('Authentication system coming soon!', 'info');
    }
});

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
    }, 3000);
}

// Lazy loading for images
if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.add("loaded");
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });
    
    document.querySelectorAll("img.lazy").forEach(lazyImage => {
        lazyImageObserver.observe(lazyImage);
    });
}
