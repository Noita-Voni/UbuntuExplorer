// Countries Component  
class CountriesComponent {
    constructor() {
        this.countries = COUNTRIES_DATA;
        this.filteredCountries = this.countries;
    }

    renderPreview() {
        const container = document.getElementById('countries-preview-grid');
        if (!container) return;

        // Show featured countries and a few others for preview
        const featuredCountries = Object.entries(this.countries)
            .filter(([name, data]) => data.featured)
            .slice(0, 3);
        
        const otherCountries = Object.entries(this.countries)
            .filter(([name, data]) => !data.featured)
            .slice(0, 3 - featuredCountries.length);

        const previewCountries = [...featuredCountries, ...otherCountries];

        container.innerHTML = previewCountries.map(([country, data]) => `
            <div class="country-card bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover-lift" 
                 data-country="${country}">
                <div class="relative h-48">
                    <img class="w-full h-full object-cover lazy" data-src="${data.image}" alt="${country}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                        <div class="flex justify-between items-end">
                            <div>
                                <h3 class="text-white font-bold text-lg">${country}</h3>
                                <p class="text-gray-200 text-sm">${data.cities}</p>
                            </div>
                            <span class="text-2xl">${data.flag}</span>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <p class="text-gray-600 text-sm mb-3">${data.description}</p>
                    <div class="flex justify-between items-center">
                        <div class="text-sm text-gray-500">
                            <i class="fas fa-star text-yellow-400"></i> ${data.rating} (${data.reviews})
                        </div>
                        <div class="text-sm text-ubuntu-blue font-semibold">
                            ${data.experiences}+ Experiences
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.addPreviewEventListeners();
        this.loadLazyImages();
    }

    renderFull() {
        return `
            <div class="min-h-screen bg-gray-50 pt-20">
                <!-- Countries Header -->
                <section class="py-16 bg-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-16">
                            <h1 class="text-4xl font-bold text-gray-900 mb-4">Explore G20 Countries</h1>
                            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Discover authentic experiences across 19 world-leading nations</p>
                        </div>

                        <!-- Search and Filter -->
                        <div class="mb-12">
                            <div class="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                                <div class="flex-1 search-container">
                                    <i class="fas fa-search search-icon"></i>
                                    <input 
                                        type="text" 
                                        id="country-search"
                                        placeholder="Search countries..."
                                        class="form-input search-input"
                                    >
                                </div>
                                <div class="md:w-64">
                                    <select id="region-filter" class="form-input">
                                        <option value="">All Regions</option>
                                        <option value="africa">Africa</option>
                                        <option value="asia">Asia</option>
                                        <option value="europe">Europe</option>
                                        <option value="america">Americas</option>
                                        <option value="oceania">Oceania</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Filter Tags -->
                        <div class="mb-8 text-center">
                            <div id="filter-tags" class="inline-flex flex-wrap gap-2">
                                <!-- Filter tags will be added here -->
                            </div>
                        </div>

                        <!-- Countries Grid -->
                        <div id="countries-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${this.renderCountriesGrid()}
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    renderCountriesGrid() {
        return Object.entries(this.countries)
            .filter(([name]) => name !== "European Union")
            .map(([country, data]) => `
                <div class="country-card bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer" 
                     data-country="${country}" data-region="${data.region}">
                    <div class="relative h-64">
                        <img class="w-full h-full object-cover lazy" data-src="${data.image}" alt="${country}">
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        <div class="absolute bottom-0 left-0 right-0 p-6">
                            <div class="flex justify-between items-end">
                                <div>
                                    <h3 class="text-white font-bold text-2xl">${country}</h3>
                                    <p class="text-gray-200 mt-1">${data.cities}</p>
                                </div>
                                <span class="text-4xl">${data.flag}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <p class="text-gray-600 mb-4">${data.description}</p>
                        <div class="flex justify-between items-center mb-4">
                            <div class="flex items-center">
                                <div class="flex text-yellow-400">
                                    ${Array(Math.floor(data.rating)).fill('<i class="fas fa-star"></i>').join('')}
                                    ${data.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                </div>
                                <span class="ml-2 text-sm text-gray-600">${data.rating} (${data.reviews} reviews)</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-600">
                                <i class="fas fa-users mr-1"></i> ${data.experiences}+ Experiences
                            </div>
                            <button class="text-ubuntu-blue hover:text-ubuntu-dark text-sm font-semibold">
                                Explore <i class="fas fa-chevron-right ml-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
    }

    addPreviewEventListeners() {
        document.querySelectorAll('.country-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const country = e.currentTarget.dataset.country;
                this.showCountryDetails(country);
            });
        });
    }

    addEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('country-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterCountries(e.target.value, document.getElementById('region-filter').value);
            });
        }

        // Region filter
        const regionFilter = document.getElementById('region-filter');
        if (regionFilter) {
            regionFilter.addEventListener('change', (e) => {
                this.filterCountries(document.getElementById('country-search').value, e.target.value);
            });
        }

        // Country card clicks
        document.querySelectorAll('.country-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const country = e.currentTarget.dataset.country;
                this.showCountryDetails(country);
            });
        });

        this.loadLazyImages();
    }

    filterCountries(searchTerm, region) {
        const cards = document.querySelectorAll('.country-card');
        
        cards.forEach(card => {
            const countryName = card.dataset.country.toLowerCase();
            const countryRegion = card.dataset.region;
            
            const matchesSearch = countryName.includes(searchTerm.toLowerCase());
            const matchesRegion = !region || countryRegion === region;
            
            if (matchesSearch && matchesRegion) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    showCountryDetails(country) {
        const data = this.countries[country];
        if (!data) return;

        // Create modal or navigate to detailed view
        const modal = this.createCountryModal(country, data);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.remove('hidden');
            modal.querySelector('.modal-content').classList.add('show');
        }, 10);
    }

    createCountryModal(country, data) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 modal-overlay z-50 flex items-center justify-center p-4 hidden';
        
        modal.innerHTML = `
            <div class="modal-content bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                <div class="relative">
                    <img class="w-full h-64 object-cover" src="${data.image}" alt="${country}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                        <div class="flex justify-between items-end">
                            <div>
                                <h2 class="text-white font-bold text-3xl">${country} ${data.flag}</h2>
                                <p class="text-gray-200 text-lg">${data.cities}</p>
                            </div>
                            <button class="close-modal text-white hover:text-gray-300 text-2xl">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="p-8">
                    <div class="mb-6">
                        <p class="text-gray-600 text-lg leading-relaxed">${data.description}</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 class="text-xl font-bold mb-4">Quick Stats</h3>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Rating:</span>
                                    <div class="flex items-center">
                                        <span class="text-yellow-400">★</span>
                                        <span class="ml-1">${data.rating}/5 (${data.reviews} reviews)</span>
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Experiences:</span>
                                    <span class="font-semibold">${data.experiences}+ available</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Region:</span>
                                    <span class="capitalize">${data.region}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-bold mb-4">Top Highlights</h3>
                            <div class="space-y-2">
                                ${data.highlights.map(highlight => `
                                    <div class="flex items-center">
                                        <i class="fas fa-check text-green-500 mr-2"></i>
                                        <span>${highlight}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex justify-center">
                        <button class="btn-primary">
                            Start Planning Your ${country} Adventure
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add close functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.add('hidden');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                setTimeout(() => modal.remove(), 300);
            }
        });

        return modal;
    }

    loadLazyImages() {
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
    }
}
