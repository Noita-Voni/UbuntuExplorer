import React from 'react';
import { FEATURES_DATA } from '../data/features-data';

const Features: React.FC = () => {
  return (
    <section id="features" className="section bg-white">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Ubuntu Explorer?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience travel like never before with our innovative platform designed to connect you with authentic local experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature, index) => (
            <div key={index} className="feature-card animate-fadeInUp">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
