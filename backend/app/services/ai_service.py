import openai
from typing import List, Dict, Any, Optional
from app.core.config import settings
from app.models.chat import ChatMessage, TripPreferences, TripItinerary
import json
import logging

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL
        
    def _build_system_prompt(self) -> str:
        """Build the system prompt for TripMate AI assistant."""
        return """You are TripMate, an AI-powered travel assistant. Your job is to help users plan trips by suggesting:

1. The best travel routes (road, train, flight, bus, etc.)
2. The best places to visit near their location or chosen destination
3. Budget-friendly itineraries (cheap stays, local food, transport hacks)
4. Day-by-day trip plans based on time, distance, and budget
5. Hidden gems and unique activities most tourists miss

When answering, always:
- Ask clarifying questions first (budget, dates, number of people, interests)
- Provide multiple options (luxury, mid-range, budget)
- Include cost estimates wherever possible
- Suggest maps, routes, timings, and alternatives
- Be friendly, conversational, and concise

Your goal is to act like a personal travel planner + local guide + budget manager.

Format your responses as JSON when providing structured data like itineraries or cost estimates."""

    def _extract_preferences(self, message: str) -> TripPreferences:
        """Extract travel preferences from user message using AI."""
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "Extract travel preferences from this message. Return only a JSON object with keys: budget, dates, people, interests, destination, duration, transport_preference. Use null for missing values."},
                    {"role": "user", "content": message}
                ],
                max_tokens=500,
                temperature=0.1
            )
            
            content = response.choices[0].message.content
            if content.startswith("```json"):
                content = content[7:-3]
            elif content.startswith("```"):
                content = content[3:-3]
                
            preferences_data = json.loads(content)
            return TripPreferences(**preferences_data)
        except Exception as e:
            logger.error(f"Error extracting preferences: {e}")
            return TripPreferences()

    def _generate_clarifying_questions(self, preferences: TripPreferences) -> List[str]:
        """Generate clarifying questions based on missing preferences."""
        questions = []
        
        if not preferences.budget:
            questions.append("What's your budget range for this trip? (low/medium/high)")
        if not preferences.dates:
            questions.append("When are you planning to travel?")
        if not preferences.people:
            questions.append("How many people will be traveling?")
        if not preferences.interests:
            questions.append("What are your main interests? (culture, nature, food, adventure, relaxation, etc.)")
        if not preferences.destination:
            questions.append("Where would you like to go, or what's your starting point?")
        if not preferences.duration:
            questions.append("How long do you want to travel?")
        if not preferences.transport_preference:
            questions.append("Do you have a preferred mode of transportation?")
            
        return questions

    def _generate_travel_response(self, message: str, context: List[ChatMessage], preferences: TripPreferences) -> str:
        """Generate intelligent travel planning response."""
        try:
            # Build conversation context
            messages = [
                {"role": "system", "content": self._build_system_prompt()}
            ]
            
            # Add conversation history
            for msg in context[-10:]:  # Last 10 messages for context
                messages.append({"role": msg.role.value, "content": msg.content})
            
            # Add current message
            messages.append({"role": "user", "content": message})
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=settings.OPENAI_MAX_TOKENS,
                temperature=settings.OPENAI_TEMPERATURE
            )
            
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Error generating AI response: {e}")
            return "I'm having trouble processing your request right now. Please try again in a moment."

    def _generate_itinerary(self, preferences: TripPreferences) -> Optional[TripItinerary]:
        """Generate a detailed trip itinerary using AI."""
        try:
            prompt = f"""Create a detailed travel itinerary based on these preferences:
            Destination: {preferences.destination or 'Not specified'}
            Duration: {preferences.duration or 'Not specified'}
            Budget: {preferences.budget or 'Not specified'}
            People: {preferences.people or 'Not specified'}
            Interests: {', '.join(preferences.interests) if preferences.interests else 'Not specified'}
            
            Return a JSON object with this structure:
            {{
                "destination": "string",
                "duration": "string",
                "daily_plans": [{{"day": "string", "activities": ["string"], "cost": "float"}}],
                "total_cost": {{"accommodation": "float", "transport": "float", "food": "float", "activities": "float"}},
                "transport_options": [{{"type": "string", "cost": "float", "duration": "string"}}],
                "accommodation_suggestions": [{{"type": "string", "cost_per_night": "float", "description": "string"}}],
                "food_recommendations": [{{"name": "string", "type": "string", "cost": "string", "description": "string"}}],
                "hidden_gems": ["string"],
                "tips": ["string"]
            }}"""
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a travel expert. Generate detailed itineraries in JSON format."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.3
            )
            
            content = response.choices[0].message.content
            if content.startswith("```json"):
                content = content[7:-3]
            elif content.startswith("```"):
                content = content[3:-3]
                
            itinerary_data = json.loads(content)
            return TripItinerary(**itinerary_data)
        except Exception as e:
            logger.error(f"Error generating itinerary: {e}")
            return None

    async def process_chat_message(self, message: str, context: List[ChatMessage] = None) -> Dict[str, Any]:
        """Process a chat message and return AI response with suggestions."""
        if context is None:
            context = []
            
        # Extract preferences from the message
        preferences = self._extract_preferences(message)
        
        # Generate clarifying questions if needed
        clarifying_questions = self._generate_clarifying_questions(preferences)
        
        # Generate AI response
        ai_response = self._generate_travel_response(message, context, preferences)
        
        # Generate itinerary if we have enough information
        itinerary = None
        if (preferences.destination and preferences.duration and 
            preferences.budget and preferences.people):
            itinerary = self._generate_itinerary(preferences)
        
        # Generate cost estimates if we have budget info
        cost_estimate = None
        if preferences.budget:
            cost_estimate = {
                "budget_level": preferences.budget,
                "estimated_total": self._estimate_costs(preferences),
                "breakdown": {
                    "accommodation": "20-40%",
                    "transport": "15-30%",
                    "food": "20-30%",
                    "activities": "10-25%"
                }
            }
        
        return {
            "message": ai_response,
            "clarifying_questions": clarifying_questions,
            "itinerary": itinerary.dict() if itinerary else None,
            "cost_estimate": cost_estimate,
            "preferences": preferences.dict()
        }

    def _estimate_costs(self, preferences: TripPreferences) -> Dict[str, str]:
        """Estimate costs based on budget level and destination."""
        budget_levels = {
            "low": {"daily": "$30-80", "weekly": "$200-560"},
            "medium": {"daily": "$80-200", "weekly": "$560-1400"},
            "high": {"daily": "$200-500+", "weekly": "$1400-3500+"}
        }
        
        if preferences.budget in budget_levels:
            return budget_levels[preferences.budget]
        return {"daily": "Varies", "weekly": "Varies"}
