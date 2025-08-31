import React from 'react';
import { Plane, MapPin, DollarSign, Heart, Users, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Plane,
      title: 'Smart Route Planning',
      description: 'Get optimal travel routes by road, train, flight, or bus with real-time recommendations.',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Destination Discovery',
      description: 'Explore curated destinations and discover hidden gems that match your interests and budget.',
      color: 'text-green-600'
    },
    {
      icon: DollarSign,
      title: 'Budget Management',
      description: 'Create cost-effective itineraries with local insights and money-saving tips.',
      color: 'text-yellow-600'
    },
    {
      icon: Heart,
      title: 'Hidden Gems',
      description: 'Access local knowledge and discover unique experiences most tourists miss.',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Personalized Planning',
      description: 'Get tailored recommendations based on your preferences, group size, and travel style.',
      color: 'text-indigo-600'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Leverage advanced AI to get intelligent travel suggestions and real-time assistance.',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Destinations', value: '1000+', description: 'Curated locations worldwide' },
    { label: 'Travel Routes', value: '50+', description: 'Transportation options' },
    { label: 'Local Tips', value: '5000+', description: 'Insider recommendations' },
    { label: 'Happy Travelers', value: '10K+', description: 'Satisfied users' }
  ];

  const team = [
    {
      name: 'AI Travel Experts',
      role: 'Core Team',
      description: 'Our AI specialists work tirelessly to provide accurate and helpful travel recommendations.',
      avatar: '🤖'
    },
    {
      name: 'Local Guides',
      role: 'Global Network',
      description: 'A worldwide network of local experts who share authentic insights and hidden gems.',
      avatar: '🌍'
    },
    {
      name: 'Travel Enthusiasts',
      role: 'Community',
      description: 'Passionate travelers who contribute their experiences and discoveries.',
      avatar: '✈️'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
            <Plane className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About TripMate
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            TripMate is your AI-powered travel companion, designed to transform the way you plan and experience your adventures. 
            We combine cutting-edge artificial intelligence with local expertise to create personalized, budget-friendly, 
            and unforgettable travel experiences.
          </p>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-16 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          To democratize travel planning by making expert-level trip planning accessible to everyone, 
          regardless of budget or experience level. We believe that every journey should be extraordinary, 
          and we're here to make that happen.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 text-center mb-12"
        >
          What Makes TripMate Special
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">TripMate by the Numbers</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-3xl font-bold text-gray-900 text-center mb-12"
        >
          How TripMate Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Share Your Dreams',
              description: 'Tell us about your ideal trip - destination, budget, interests, and travel style.',
              color: 'bg-blue-500'
            },
            {
              step: '2',
              title: 'AI Magic Happens',
              description: 'Our AI analyzes your preferences and creates personalized recommendations.',
              color: 'bg-green-500'
            },
            {
              step: '3',
              title: 'Plan & Explore',
              description: 'Get detailed itineraries, local tips, and hidden gems to make your trip extraordinary.',
              color: 'bg-purple-500'
            }
          ].map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 ${step.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-3xl font-bold text-gray-900 text-center mb-12"
        >
          Meet the Team Behind TripMate
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow duration-200"
            >
              <div className="text-4xl mb-4">{member.avatar}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="bg-gray-50 rounded-2xl p-8 mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Powered by Advanced Technology</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'OpenAI GPT-4', description: 'Advanced language model for intelligent responses' },
            { name: 'FastAPI', description: 'High-performance Python web framework' },
            { name: 'React + TypeScript', description: 'Modern frontend with type safety' },
            { name: 'Tailwind CSS', description: 'Utility-first CSS framework for beautiful designs' }
          ].map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className="bg-white rounded-lg p-4 text-center shadow-sm"
            >
              <h4 className="font-semibold text-gray-900 mb-2">{tech.name}</h4>
              <p className="text-sm text-gray-600">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of travelers who are already using TripMate to plan their dream trips.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
          Start Planning Now
        </button>
      </motion.div>
    </div>
  );
};

export default AboutPage;
