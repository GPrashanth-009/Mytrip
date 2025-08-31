import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface ChatResponse {
  message: string;
  conversation_id: string;
  suggestions?: string[];
  itinerary?: any;
  cost_estimate?: any;
  next_questions?: string[];
}

export interface TripPreferences {
  budget?: string;
  dates?: string;
  people?: number;
  interests?: string[];
  destination?: string;
  duration?: string;
  transport_preference?: string;
}

export interface Destination {
  name: string;
  country: string;
  description: string;
  budget_level: string;
  best_time: string;
  highlights: string[];
}

export interface TravelRoute {
  transport_type: string;
  duration: string;
  cost: string;
  description: string;
  airline?: string;
  operator?: string;
}

// Chat API
export const sendChatMessage = async (
  message: string,
  conversationId?: string | null
): Promise<ChatResponse> => {
  try {
    const response = await api.post('/api/chat', {
      message,
      conversation_id: conversationId,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to send message');
  }
};

export const getConversation = async (conversationId: string) => {
  try {
    const response = await api.get(`/api/conversations/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw new Error('Failed to fetch conversation');
  }
};

export const listConversations = async () => {
  try {
    const response = await api.get('/api/conversations');
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw new Error('Failed to fetch conversations');
  }
};

// Trip Planning API
export const generateTripPlan = async (preferences: TripPreferences) => {
  try {
    const response = await api.post('/api/plan', preferences);
    return response.data;
  } catch (error) {
    console.error('Error generating trip plan:', error);
    throw new Error('Failed to generate trip plan');
  }
};

// Destinations API
export const getDestinations = async (
  query?: string,
  budget?: string,
  interests?: string
) => {
  try {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (budget) params.append('budget', budget);
    if (interests) params.append('interests', interests);

    const response = await api.get(`/api/destinations?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw new Error('Failed to fetch destinations');
  }
};

// Routes API
export const getTravelRoutes = async (
  fromLocation: string,
  toLocation: string,
  transportType?: string
) => {
  try {
    const params = new URLSearchParams({
      from_location: fromLocation,
      to_location: toLocation,
    });
    if (transportType) params.append('transport_type', transportType);

    const response = await api.get(`/api/routes?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw new Error('Failed to fetch routes');
  }
};

// Budget Tips API
export const getBudgetTips = async (destination?: string) => {
  try {
    const params = destination ? `?destination=${encodeURIComponent(destination)}` : '';
    const response = await api.get(`/api/budget-tips${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching budget tips:', error);
    throw new Error('Failed to fetch budget tips');
  }
};

// Hidden Gems API
export const getHiddenGems = async (destination?: string) => {
  try {
    const params = destination ? `?destination=${encodeURIComponent(destination)}` : '';
    const response = await api.get(`/api/hidden-gems${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hidden gems:', error);
    throw new Error('Failed to fetch hidden gems');
  }
};

export default api;
