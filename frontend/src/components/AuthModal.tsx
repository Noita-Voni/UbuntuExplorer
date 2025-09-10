import React, { useState } from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess?: (role: 'tourist' | 'business') => void;
}

type AuthStep = 'auth' | 'role';
type UserRole = 'tourist' | 'business';

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<AuthStep>('auth');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  if (!open) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        alert('Please enter your name');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }

    // TODO: Connect to your backend API here
    console.log(isLogin ? 'Logging in...' : 'Signing up...', formData);
    
    // Move to role selection step
    setStep('role');
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    // TODO: Save role to backend and complete authentication
    console.log('Selected role:', selectedRole);
    console.log('User data:', { ...formData, role: selectedRole });
    
    // Reset form and close modal
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setStep('auth');
    setIsLogin(true);
    
    // Call onAuthSuccess if provided, otherwise just close modal
    if (onAuthSuccess) {
      onAuthSuccess(selectedRole);
    } else {
      onClose();
      // Show success message
      alert(`Welcome! You've been registered as a ${selectedRole}.`);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        {step === 'auth' ? (
          <div className="auth-form">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              
              <button type="submit" className="btn btn-primary w-full">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button"
                  className="auth-toggle-btn"
                  onClick={toggleAuthMode}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="role-selection">
            <h2 className="text-2xl font-bold text-center mb-6">
              Choose Your Role
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Select how you'd like to use Ubuntu Explorer
            </p>
            
            <div className="role-buttons">
              <div 
                className="role-card"
                onClick={() => handleRoleSelect('tourist')}
              >
                <div className="role-icon">
                  <i className="fas fa-user-friends"></i>
                </div>
                <h3 className="role-title">Tourist</h3>
                <p className="role-description">
                  Discover and book authentic local experiences across G20 countries
                </p>
                <ul className="role-features">
                  <li><i className="fas fa-check"></i> Browse experiences</li>
                  <li><i className="fas fa-check"></i> Book tours & activities</li>
                  <li><i className="fas fa-check"></i> Connect with locals</li>
                  <li><i className="fas fa-check"></i> AI-powered recommendations</li>
                </ul>
              </div>
              
              <div 
                className="role-card"
                onClick={() => handleRoleSelect('business')}
              >
                <div className="role-icon">
                  <i className="fas fa-store"></i>
                </div>
                <h3 className="role-title">Business Owner</h3>
                <p className="role-description">
                  List your services and connect with travelers from around the world
                </p>
                <ul className="role-features">
                  <li><i className="fas fa-check"></i> List experiences</li>
                  <li><i className="fas fa-check"></i> Manage bookings</li>
                  <li><i className="fas fa-check"></i> Earn from tourism</li>
                  <li><i className="fas fa-check"></i> Build your business</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
