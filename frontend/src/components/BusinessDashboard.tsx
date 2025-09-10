import React, { useState } from 'react';

const BusinessDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const myListings = [
    {
      id: 1,
      title: "Traditional Cooking Class",
      location: "Cape Town, South Africa",
      price: 120,
      bookings: 15,
      rating: 4.8,
      status: "active",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Township Art Tour",
      location: "Johannesburg, South Africa",
      price: 89,
      bookings: 8,
      rating: 4.9,
      status: "active",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Wine Tasting Experience",
      location: "Stellenbosch, South Africa",
      price: 150,
      bookings: 22,
      rating: 4.7,
      status: "pending",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const recentBookings = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      experience: "Traditional Cooking Class",
      date: "2025-09-15",
      amount: 120,
      status: "confirmed"
    },
    {
      id: 2,
      customerName: "Mike Chen",
      experience: "Township Art Tour",
      date: "2025-09-18",
      amount: 89,
      status: "pending"
    },
    {
      id: 3,
      customerName: "Emma Wilson",
      experience: "Wine Tasting Experience",
      date: "2025-09-20",
      amount: 150,
      status: "confirmed"
    }
  ];

  const stats = {
    totalEarnings: 4580,
    totalBookings: 45,
    activeListings: 8,
    averageRating: 4.8
  };

  return (
    <div className="business-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <div>
            <h1 className="dashboard-title">Business Dashboard</h1>
            <p className="dashboard-subtitle">Manage your experiences and grow your business</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="stat-icon bg-yellow-600 text-white">
              <i className="fas fa-store"></i>
            </div>
            <div>
              <p className="font-semibold text-white">Ubuntu Tours Co.</p>
              <p className="text-white text-sm opacity-80">Business Owner</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon bg-green-100">
                <i className="fas fa-dollar-sign text-green-600"></i>
              </div>
              <div className="stat-content">
                <h3>Total Earnings</h3>
                <p>${stats.totalEarnings}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon bg-blue-100">
                <i className="fas fa-calendar-check text-blue-600"></i>
              </div>
              <div className="stat-content">
                <h3>Total Bookings</h3>
                <p>{stats.totalBookings}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon bg-purple-100">
                <i className="fas fa-list text-purple-600"></i>
              </div>
              <div className="stat-content">
                <h3>Active Listings</h3>
                <p>{stats.activeListings}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon bg-yellow-100">
                <i className="fas fa-star text-yellow-600"></i>
              </div>
              <div className="stat-content">
                <h3>Average Rating</h3>
                <p>{stats.averageRating}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-container">
            <div className="tab-nav">
              {['overview', 'listings', 'bookings', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="tab-content">
            {activeTab === 'overview' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Recent Activity</h3>
                  <button className="btn btn-primary">
                    <i className="fas fa-plus mr-2"></i>
                    Add New Experience
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Bookings */}
                  <div>
                    <h4 className="text-lg font-medium mb-4">Recent Bookings</h4>
                    <div className="space-y-4">
                      {recentBookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <i className="fas fa-user text-blue-600"></i>
                          </div>
                          <div className="ml-4 flex-1">
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-gray-600">{booking.experience}</p>
                            <p className="text-sm text-gray-600">{booking.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">${booking.amount}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Performing Listings */}
                  <div>
                    <h4 className="text-lg font-medium mb-4">Top Performing Listings</h4>
                    <div className="space-y-4">
                      {myListings.slice(0, 3).map((listing) => (
                        <div key={listing.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="ml-4 flex-1">
                            <p className="font-medium">{listing.title}</p>
                            <p className="text-sm text-gray-600">{listing.location}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex text-gold text-sm">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <i key={i} className={`fas fa-star ${i < Math.floor(listing.rating) ? '' : 'text-gray-300'}`}></i>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">{listing.rating}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${listing.price}</p>
                            <p className="text-sm text-gray-600">{listing.bookings} bookings</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'listings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">My Listings</h3>
                  <button className="btn btn-primary">
                    <i className="fas fa-plus mr-2"></i>
                    Add New Listing
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myListings.map((listing) => (
                    <div key={listing.id} className="card">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="card-image"
                      />
                      <div className="card-content">
                        <h3 className="card-title">{listing.title}</h3>
                        <p className="text-gray-600 mb-2">{listing.location}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="flex text-gold">
                              {Array.from({ length: 5 }, (_, i) => (
                                <i key={i} className={`fas fa-star ${i < Math.floor(listing.rating) ? '' : 'text-gray-300'}`}></i>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">{listing.rating}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            listing.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xl font-bold text-green-600">${listing.price}</span>
                          <span className="text-sm text-gray-600">{listing.bookings} bookings</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-secondary flex-1">Edit</button>
                          <button className="btn btn-primary flex-1">View</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">All Bookings</h3>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentBookings.map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{booking.experience}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{booking.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-green-600">${booking.amount}</div>
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
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">Contact</button>
                              <button className="text-green-600 hover:text-green-900">Confirm</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Analytics & Insights</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-4">Revenue Overview</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>This Month</span>
                        <span className="font-semibold text-green-600">$1,240</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Month</span>
                        <span className="font-semibold">$980</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth</span>
                        <span className="font-semibold text-green-600">+26.5%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-4">Popular Experiences</h4>
                    <div className="space-y-4">
                      {myListings.map((listing, index) => (
                        <div key={listing.id} className="flex justify-between">
                          <span>{listing.title}</span>
                          <span className="font-semibold">{listing.bookings} bookings</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
