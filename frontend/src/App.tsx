import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import TouristDashboard from './components/TouristDashboard';
import BusinessDashboard from './components/BusinessDashboard';
import './App.css';

type UserRole = 'tourist' | 'business' | null;

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Add Font Awesome for icons
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    // Check if user is already logged in (from localStorage)
    const savedRole = localStorage.getItem('userRole') as UserRole;
    const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    
    if (savedRole && savedLoginStatus) {
      setUserRole(savedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    
    // Save to localStorage
    if (role) {
      localStorage.setItem('userRole', role);
      localStorage.setItem('isLoggedIn', 'true');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    
    // Clear localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
  };

  // Show appropriate dashboard based on user role
  if (isLoggedIn && userRole) {
    return (
      <div className="App">
        {userRole === 'tourist' ? (
          <TouristDashboard />
        ) : (
          <BusinessDashboard />
        )}
        
        {/* Logout button - you can style this better */}
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ fontSize: '12px', padding: '8px 16px' }}
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Show landing page for non-logged-in users
  return (
    <div className="App">
      <LandingPage onLogin={handleLogin} />
    </div>
  );
}

export default App;
