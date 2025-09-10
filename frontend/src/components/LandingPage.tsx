import React, { useState } from 'react';
import Navigation from './Navigation';
import AuthModal from './AuthModal';

interface LandingPageProps {
  onLogin: (role: 'tourist' | 'business') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = (role: 'tourist' | 'business') => {
    onLogin(role);
    closeAuthModal();
  };

  return (
    <div className="landing-page">
      <Navigation 
        currentSection="home" 
        onNavigate={() => {}} 
        onAuthClick={openAuthModal}
      />
      
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Authentic <span className="text-gold">G20</span> Experiences
            </h1>
            <p className="hero-subtitle">
              Connect with local communities and explore hidden gems across all G20 nations with our AI-powered platform
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <button className="btn btn-primary" onClick={openAuthModal}>
                Get Started
              </button>
              <button className="btn btn-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="w-full h-full object-cover opacity-20"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/mainvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Features Preview */}
      <section className="section bg-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Choose Your Journey
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Tourist Card */}
            <div className="feature-card cursor-pointer hover:shadow-xl transition-all duration-300" onClick={openAuthModal}>
              <div className="feature-icon text-blue-600">
                <i className="fas fa-user-friends"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">I'm a Tourist</h3>
              <p className="text-gray-600 mb-6">
                Discover authentic local experiences, book unique tours, and connect with communities worldwide.
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span>AI-powered recommendations</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span>Book unique experiences</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span>Connect with locals</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span>Cultural immersion</span>
                </li>
              </ul>
              <button className="btn btn-primary w-full">Start Exploring</button>
            </div>

            {/* Business Owner Card */}
            <div className="feature-card cursor-pointer hover:shadow-xl transition-all duration-300" onClick={openAuthModal}>
              <div className="feature-icon text-gold">
                <i className="fas fa-store"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">I'm a Business Owner</h3>
              <p className="text-gray-600 mb-6">
                List your services, reach global travelers, and build a sustainable tourism business.
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span>List your experiences</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span>Reach global audience</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span>Manage bookings easily</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-3"></i>
                  <span>Grow your business</span>
                </li>
              </ul>
              <button className="btn btn-primary w-full">Start Hosting</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-blue-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Trusted Worldwide</h2>
            <p className="text-xl text-blue-100">Join thousands of travelers and local businesses</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">19</div>
              <div className="text-blue-100">G20 Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <div className="text-blue-100">Local Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gray-50">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join Ubuntu Explorer today and discover authentic experiences across G20 countries
          </p>
          <button className="btn btn-primary btn-lg" onClick={openAuthModal}>
            Join Ubuntu Explorer
          </button>
        </div>
      </section>

      <AuthModal 
        open={isAuthModalOpen} 
        onClose={closeAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default LandingPage;
