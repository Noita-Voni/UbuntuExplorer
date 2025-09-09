// Features Component
class FeaturesComponent {
    constructor() {
        this.features = FEATURES_DATA;
    }

    render() {
        const container = document.getElementById('features-grid');
        if (!container) return;

        container.innerHTML = this.features.map(feature => `
            <div class="feature-card bg-white p-8 rounded-xl shadow-lg hover-lift animate-fadeInUp ${feature.delay}">
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mr-4">
                        <i class="${feature.icon} text-2xl ${feature.iconColor}"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900">${feature.title}</h3>
                </div>
                <p class="text-gray-600 leading-relaxed">${feature.description}</p>
            </div>
        `).join('');

        // Add entrance animations
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

        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translate3d(0, 20px, 0)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });
    }
}
