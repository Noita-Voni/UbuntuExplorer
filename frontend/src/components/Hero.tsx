import React, { useState } from 'react';
import AuthModal from './AuthModal';

const Hero: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <section id="home" className="hero-gradient">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Authentic <span className="text-gold">G20</span> Experiences
            </h1>
            <p className="hero-subtitle">
              Connect with local communities and explore hidden gems across all G20 nations with our AI-powered platform
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <button className="btn btn-primary">
                Start Exploring
              </button>
              <button className="btn btn-secondary">
                Watch Demo
              </button>
              <button className="btn btn-secondary" onClick={openAuthModal}>
                Join Now
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
            <source src="/videos/" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      
      <AuthModal open={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
};

export default Hero;
