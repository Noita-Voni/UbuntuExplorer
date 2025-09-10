import React, { useState } from 'react';
import { COUNTRIES_DATA } from '../data/countries-data';
import type { Country } from '../types';

const Countries: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  
  const regions = ['all', 'africa', 'america', 'asia', 'europe', 'oceania'];
  
  const filteredCountries = Object.entries(COUNTRIES_DATA).filter(([_, country]) => 
    selectedRegion === 'all' || country.region === selectedRegion
  );

  const handleCountryClick = (countryName: string, country: Country) => {
    console.log('Country selected:', countryName, country);
    // Here you would typically navigate to a detailed country page
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < Math.floor(rating) ? 'text-gold' : 'text-gray-300'}`}
      ></i>
    ));
  };

  return (
    <section id="countries" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore G20 Countries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover unique experiences across all G20 nations, from bustling metropolises to hidden cultural gems.
          </p>
          
          {/* Region Filter */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`btn ${
                  selectedRegion === region ? 'btn-primary' : 'btn-secondary'
                } capitalize`}
              >
                {region === 'all' ? 'All Regions' : region}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCountries.map(([countryName, country]) => (
            <div
              key={countryName}
              className="card country-card animate-fadeInUp"
              onClick={() => handleCountryClick(countryName, country)}
            >
              <div className="relative">
                <img
                  src={country.image}
                  alt={countryName}
                  className="card-image"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-3xl">{country.flag}</span>
                </div>
                {country.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-gray-900 px-2 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{countryName}</h3>
                <p className="card-description">{country.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(country.rating)}
                    <span className="text-sm text-gray-600 ml-2">
                      {country.rating} ({country.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {country.cities}
                  </span>
                  <span>
                    <i className="fas fa-star mr-1"></i>
                    {country.experiences} experiences
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {country.highlights.slice(0, 2).map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                    {country.highlights.length > 2 && (
                      <span className="text-blue-600 text-xs">
                        +{country.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countries;
