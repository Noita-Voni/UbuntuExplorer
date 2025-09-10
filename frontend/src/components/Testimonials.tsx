import React from 'react';
import { TESTIMONIALS_DATA, STATS_DATA } from '../data/testimonials-data';

const Testimonials: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? 'text-gold' : 'text-gray-300'}`}
      ></i>
    ));
  };

  return (
    <section id="testimonials" className="section bg-blue-600">
      <div className="container">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Travelers Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {STATS_DATA.map((stat, index) => (
              <div key={index} className="text-center animate-fadeInUp">
                <div className="text-4xl text-gold mb-2">
                  <i className={stat.icon}></i>
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            What Our Travelers Say
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <div key={index} className="card animate-fadeInUp bg-white">
              <div className="card-content">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-block">
                  {testimonial.experience}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
