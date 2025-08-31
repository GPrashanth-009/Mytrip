import React from 'react';
import { User, Bot, MapPin, Calendar, DollarSign, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    suggestions?: string[];
    itinerary?: any;
    cost_estimate?: any;
  };
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const timestamp = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const formatContent = (content: string) => {
    // Split content by newlines and render properly
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const renderSuggestions = (suggestions: string[]) => {
    if (!suggestions || suggestions.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 space-y-2"
      >
        <p className="text-sm font-medium text-gray-700">💡 Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200"
            >
              {suggestion}
            </span>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderItinerary = (itinerary: any) => {
    if (!itinerary) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200"
      >
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="h-5 w-5 text-green-600" />
          <h4 className="font-semibold text-green-800">Your Trip Itinerary</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              <strong>Destination:</strong> {itinerary.destination}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              <strong>Duration:</strong> {itinerary.duration}
            </span>
          </div>
          
          {itinerary.total_cost && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                <strong>Total Cost:</strong> ${itinerary.total_cost.accommodation + itinerary.total_cost.transport + itinerary.total_cost.food + itinerary.total_cost.activities}
              </span>
            </div>
          )}
        </div>
        
        {itinerary.daily_plans && (
          <div className="mt-3">
            <p className="text-sm font-medium text-green-800 mb-2">Daily Plans:</p>
            <div className="space-y-2">
              {itinerary.daily_plans.slice(0, 3).map((day: any, index: number) => (
                <div key={index} className="text-sm text-gray-700 bg-white p-2 rounded border">
                  <strong>{day.day}:</strong> {day.activities.slice(0, 2).join(', ')}
                  {day.activities.length > 2 && '...'}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderCostEstimate = (costEstimate: any) => {
    if (!costEstimate) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
      >
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">Cost Estimate</span>
        </div>
        
        <div className="text-sm text-yellow-800">
          <p><strong>Budget Level:</strong> {costEstimate.budget_level}</p>
          {costEstimate.estimated_total && (
            <div className="mt-1">
              <p><strong>Daily:</strong> {costEstimate.estimated_total.daily}</p>
              <p><strong>Weekly:</strong> {costEstimate.estimated_total.weekly}</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-3xl`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
        }`}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>

        {/* Message Content */}
        <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
          }`}>
            <div className="text-sm leading-relaxed">
              {formatContent(message.content)}
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </div>
          
          {/* Metadata */}
          {message.metadata && (
            <div className="mt-2">
              {renderSuggestions(message.metadata.suggestions)}
              {renderItinerary(message.metadata.itinerary)}
              {renderCostEstimate(message.metadata.cost_estimate)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
