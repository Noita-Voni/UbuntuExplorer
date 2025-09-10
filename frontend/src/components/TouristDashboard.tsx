import React, { useState } from 'react';
import { COUNTRIES_DATA } from '../data/countries-data';

const TouristDashboard: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = Object.entries(COUNTRIES_DATA).filter(([name]) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredExperiences = [
    {
      id: 1,
      title: "Safari Adventure in Kruger National Park",
      country: "South Africa",
      price: 299,
      rating: 4.9,
      duration: "3 days",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Traditional Samba Experience in Rio",
      country: "Brazil",
      price: 89,
      rating: 4.8,
      duration: "1 day",
      image: "https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Mount Fuji Sunrise Trek",
      country: "Japan",
      price: 199,
      rating: 4.9,
      duration: "2 days",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const myBookings = [
    {
      id: 1,
      title: "Township Cultural Tour",
      country: "South Africa",
      date: "2025-09-25",
      status: "confirmed",
      price: 79
    },
    {
      id: 2,
      title: "Taj Mahal Sunrise Tour",
      country: "India",
      date: "2025-10-10",
      status: "pending",
      price: 149
    }
  ];

  return (
    <div className="tourist-dashboard">
      {/* Header */}
      <div className="dashboard-header bg-blue-600 text-white">
        <div className="container">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Explorer!</h1>
              <p className="text-blue-100">Discover amazing experiences across G20 countries</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <i className="fas fa-user text-2xl"></i>
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-blue-100 text-sm">Tourist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Countries Visited</span>
                  <span className="font-semibold text-blue-600">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experiences Booked</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews Written</span>
                  <span className="font-semibold text-blue-600">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wishlist Items</span>
                  <span className="font-semibold text-blue-600">15</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Search Destinations</h3>
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input w-full mb-4"
              />
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredCountries.slice(0, 8).map(([name, country]) => (
                  <div
                    key={name}
                    className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => setSelectedCountry(name)}
                  >
                    <span className="text-xl mr-2">{country.flag}</span>
                    <span className="text-sm">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Experiences */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recommended for You</h2>
                <button className="btn btn-primary">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredExperiences.map((experience) => (
                  <div key={experience.id} className="card">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="card-image"
                    />
                    <div className="card-content">
                      <h3 className="card-title">{experience.title}</h3>
                      <p className="text-gray-600 mb-2">{experience.country}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex text-gold">
                            {Array.from({ length: 5 }, (_, i) => (
                              <i key={i} className={`fas fa-star ${i < Math.floor(experience.rating) ? '' : 'text-gray-300'}`}></i>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">{experience.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">{experience.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">${experience.price}</span>
                        <button className="btn btn-primary">Book Now</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Bookings */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {myBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.country}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${booking.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-red-600 hover:text-red-900">Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;
