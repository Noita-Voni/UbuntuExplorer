import React, { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  onAuthClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate, onAuthClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    onNavigate(section);
  };

  const openAuthModal = () => {
    if (onAuthClick) {
      onAuthClick();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="nav-container">
          <a href="#home" className="nav-brand" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            <img src="/images/ubuntuexploreroutline.png" alt="Ubuntu Explorer Logo" />
            <span>Ubuntu<span className="text-gold">Explorer</span></span>
          </a>
          
          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                className={`nav-link ${currentSection === 'features' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#countries" 
                className={`nav-link ${currentSection === 'countries' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('countries'); }}
              >
                Countries
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${currentSection === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              >
                About
              </a>
            </li>
          </ul>
          
          <div className="nav-buttons">
            <button 
              className="btn btn-secondary"
              onClick={openAuthModal}
            >
              Login
            </button>
            <button 
              className="btn btn-primary"
              onClick={openAuthModal}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
      
      {!onAuthClick && <AuthModal open={isAuthModalOpen} onClose={closeAuthModal} />}
    </>
  );
};

export default Navigation;
