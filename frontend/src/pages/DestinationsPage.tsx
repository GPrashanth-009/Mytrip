import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, DollarSign, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDestinations, Destination } from '../services/api';

const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const budgetOptions = ['low', 'medium', 'high'];
  const interestOptions = ['Beaches', 'Culture', 'Nature', 'Food', 'Adventure', 'Relaxation', 'Shopping', 'History'];

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [destinations, searchQuery, selectedBudget, selectedInterests]);

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const response = await getDestinations();
      setDestinations(response.destinations || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDestinations = () => {
    let filtered = [...destinations];

    if (searchQuery) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBudget) {
      filtered = filtered.filter(dest => dest.budget_level === selectedBudget);
    }

    if (selectedInterests) {
      filtered = filtered.filter(dest => 
        dest.highlights.some(highlight => 
          highlight.toLowerCase().includes(selectedInterests.toLowerCase())
        )
      );
    }

    setFilteredDestinations(filtered);
  };

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case 'low': return 'Budget-Friendly';
      case 'medium': return 'Mid-Range';
      case 'high': return 'Luxury';
      default: return 'Varies';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Discovering amazing destinations...</p>
        </div>
      </div>
    );
  }

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
            Discover Amazing Destinations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore curated travel destinations with personalized recommendations based on your preferences
          </p>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
      >
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, countries, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Budget Filter */}
          <div>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Budgets</option>
              {budgetOptions.map(budget => (
                <option key={budget} value={budget}>
                  {getBudgetLabel(budget)}
                </option>
              ))}
            </select>
          </div>

          {/* Interests Filter */}
          <div>
            <select
              value={selectedInterests}
              onChange={(e) => setSelectedInterests(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Interests</option>
              {interestOptions.map(interest => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedBudget || selectedInterests) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Search: {searchQuery}
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedBudget && (
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Budget: {getBudgetLabel(selectedBudget)}
                <button
                  onClick={() => setSelectedBudget('')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedInterests && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                Interest: {selectedInterests}
                <button
                  onClick={() => setSelectedInterests('')}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBudget('');
                setSelectedInterests('');
              }}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Found {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination, index) => (
          <motion.div
            key={destination.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {/* Destination Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
              <MapPin className="h-16 w-16 text-white opacity-80" />
            </div>

            {/* Destination Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600">{destination.country}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getBudgetColor(destination.budget_level)}`}>
                  {getBudgetLabel(destination.budget_level)}
                </span>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {destination.description}
              </p>

              {/* Highlights */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Highlights:</p>
                <div className="flex flex-wrap gap-1">
                  {destination.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{destination.highlights.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Best Time */}
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Best time: {destination.best_time}</span>
              </div>

              {/* Action Button */}
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Plan Trip to {destination.name}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredDestinations.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedBudget('');
              setSelectedInterests('');
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DestinationsPage;
