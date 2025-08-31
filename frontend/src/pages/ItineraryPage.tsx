import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Clock, Users, Plane, Train, Bus, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const ItineraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');

  const transportIcons = {
    plane: Plane,
    train: Train,
    bus: Bus,
    car: Car,
  };

  const sampleItinerary = {
    destination: "Tokyo, Japan",
    duration: "7 days",
    totalCost: 2800,
    dailyPlans: [
      {
        day: "Day 1 - Arrival",
        activities: ["Arrive at Narita Airport", "Check into hotel in Shibuya", "Explore Shibuya Crossing", "Dinner at local ramen shop"],
        cost: 150,
        transport: "Airport transfer + Metro",
        accommodation: "Hotel in Shibuya"
      },
      {
        day: "Day 2 - Traditional Tokyo",
        activities: ["Visit Senso-ji Temple", "Explore Asakusa district", "Lunch at traditional restaurant", "Sumida River cruise", "Tokyo Skytree"],
        cost: 120,
        transport: "Metro + Walking",
        accommodation: "Hotel in Shibuya"
      },
      {
        day: "Day 3 - Modern Tokyo",
        activities: ["Shibuya shopping", "Harajuku fashion district", "Lunch at trendy cafe", "Meiji Shrine", "Yoyogi Park"],
        cost: 80,
        transport: "Metro + Walking",
        accommodation: "Hotel in Shibuya"
      }
    ],
    transportOptions: [
      { type: "plane", cost: 800, duration: "12h", description: "Direct flight from NYC" },
      { type: "train", cost: 1200, duration: "24h", description: "Scenic route with stops" },
      { type: "bus", cost: 600, duration: "48h", description: "Budget option with transfers" }
    ],
    accommodationSuggestions: [
      { type: "Hostel", cost_per_night: 25, description: "Social atmosphere, shared rooms" },
      { type: "Budget Hotel", cost_per_night: 60, description: "Private rooms, basic amenities" },
      { type: "Mid-range Hotel", cost_per_night: 120, description: "Comfortable rooms, good location" }
    ],
    foodRecommendations: [
      { name: "Ichiran Ramen", type: "Ramen", cost: "$8-12", description: "Famous tonkotsu ramen chain" },
      { name: "Tsukiji Outer Market", type: "Seafood", cost: "$15-25", description: "Fresh sushi and street food" },
      { name: "Conveyor Belt Sushi", type: "Sushi", cost: "$10-20", description: "Affordable sushi experience" }
    ],
    hiddenGems: [
      "Visit Yanaka Ginza for old Tokyo atmosphere",
      "Explore Shimokitazawa for vintage shopping",
      "Try standing sushi bars for authentic experience",
      "Visit teamLab Borderless digital art museum"
    ],
    tips: [
      "Get a Pasmo/Suica card for easy transport",
      "Visit temples early morning to avoid crowds",
      "Try convenience store food - it's surprisingly good",
      "Learn basic Japanese phrases for better experience"
    ]
  };

  const renderTransportIcon = (type: string) => {
    const Icon = transportIcons[type as keyof typeof transportIcons] || Plane;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plan Your Perfect Trip
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create detailed itineraries, explore transport options, and discover local recommendations
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
      >
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {['create', 'view', 'templates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'create' && 'Create New Itinerary'}
              {tab === 'view' && 'View Itineraries'}
              {tab === 'templates' && 'Templates'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'create' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Create New Itinerary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    placeholder="How long? (e.g., 7 days)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select budget level</option>
                    <option value="low">Low ($30-80/day)</option>
                    <option value="medium">Medium ($80-200/day)</option>
                    <option value="high">High ($200+/day)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
                  <input
                    type="number"
                    placeholder="Number of people"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Generate Itinerary with AI
              </button>
            </div>
          )}

          {activeTab === 'view' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Itineraries</h3>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No itineraries created yet. Start by creating your first trip plan!</p>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Itinerary Templates</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {['Weekend Getaway', 'Week-long Adventure', 'Month-long Journey'].map((template) => (
                  <div key={template} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                    <h4 className="font-medium text-gray-900">{template}</h4>
                    <p className="text-sm text-gray-600">Click to use as starting point</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Sample Itinerary Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{sampleItinerary.destination}</h2>
              <p className="text-blue-100">{sampleItinerary.duration} • ${sampleItinerary.totalCost} total</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${Math.round(sampleItinerary.totalCost / 7)}</div>
              <div className="text-blue-100">per day</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Daily Plans */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-500" />
              Daily Itinerary
            </h3>
            <div className="space-y-4">
              {sampleItinerary.dailyPlans.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{day.day}</h4>
                    <span className="text-green-600 font-medium">${day.cost}</span>
                  </div>
                  <div className="space-y-2 mb-3">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {day.transport}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {day.accommodation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transport Options */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Plane className="h-6 w-6 mr-2 text-blue-500" />
              Transport Options
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {sampleItinerary.transportOptions.map((option, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {renderTransportIcon(option.type)}
                    <span className="font-medium text-gray-900 capitalize">{option.type}</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Cost:</strong> ${option.cost}</p>
                    <p><strong>Duration:</strong> {option.duration}</p>
                    <p>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Gems and Tips */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-green-500" />
                Hidden Gems
              </h3>
              <div className="space-y-2">
                {sampleItinerary.hiddenGems.map((gem, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{gem}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-yellow-500" />
                Travel Tips
              </h3>
              <div className="space-y-2">
                {sampleItinerary.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ItineraryPage;
