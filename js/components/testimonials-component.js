// Testimonials Component
class TestimonialsComponent {
    constructor() {
        this.testimonials = TESTIMONIALS_DATA;
    }

    render() {
        const container = document.getElementById('testimonials-grid');
        if (!container) return;

        container.innerHTML = this.testimonials.map((testimonial, index) => `
            <div class="bg-white p-8 rounded-xl shadow-lg hover-lift animate-fadeInUp delay-${index * 100}">
                <div class="flex items-center mb-6">
                    <img class="w-16 h-16 rounded-full object-cover mr-4" src="${testimonial.image}" alt="${testimonial.name}">
                    <div>
                        <h4 class="font-bold text-gray-900">${testimonial.name}</h4>
                        <p class="text-gray-600 text-sm">${testimonial.location}</p>
                        <p class="text-ubuntu-blue text-sm font-semibold">${testimonial.experience}</p>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex text-yellow-400 mb-2">
                        ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
                    </div>
                    <p class="text-gray-600 italic leading-relaxed">"${testimonial.text}"</p>
                </div>
                <div class="text-sm text-gray-500">
                    <i class="fas fa-map-marker-alt mr-1"></i>
                    Traveled to ${testimonial.country}
                </div>
            </div>
        `).join('');

        this.addAnimations();
    }

    addAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translate3d(0, 0, 0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('#testimonials-grid > div').forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = 'translate3d(0, 20px, 0)';
            card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

// Stats Component
class StatsComponent {
    constructor() {
        this.stats = STATS_DATA;
    }

    render() {
        const container = document.getElementById('stats-grid');
        if (!container) return;

        container.innerHTML = this.stats.map((stat, index) => `
            <div class="text-center animate-fadeInUp delay-${index * 100}">
                <div class="mb-4">
                    <i class="${stat.icon} text-4xl ${stat.color} mb-2"></i>
                </div>
                <div class="text-4xl font-bold ${stat.color} mb-2 counter" data-target="${stat.number.replace(/[^0-9]/g, '')}">${stat.number}</div>
                <div class="text-lg ${stat.color} opacity-90">${stat.label}</div>
            </div>
        `).join('');

        this.animateCounters();
    }

    animateCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const increment = target / 100;
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = counter.parentElement.textContent.includes('+') ? target + '+' : target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter').forEach(counter => {
            observer.observe(counter);
        });
    }
}
