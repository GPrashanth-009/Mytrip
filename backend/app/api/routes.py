from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
import uuid
from datetime import datetime

from app.models.chat import (
    ChatRequest, ChatResponse, ChatMessage, MessageRole,
    TripPreferences, TripItinerary, Conversation
)
from app.services.ai_service import AIService

api_router = APIRouter()
ai_service = AIService()

# In-memory storage for conversations (replace with database in production)
conversations: Dict[str, Conversation] = {}

@api_router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint for trip planning."""
    try:
        # Generate or retrieve conversation ID
        conversation_id = request.conversation_id or str(uuid.uuid4())
        
        # Get or create conversation
        if conversation_id not in conversations:
            conversations[conversation_id] = Conversation(
                id=conversation_id,
                messages=[],
                preferences=None
            )
        
        conversation = conversations[conversation_id]
        
        # Add user message to conversation
        user_message = ChatMessage(
            role=MessageRole.USER,
            content=request.message,
            timestamp=datetime.utcnow()
        )
        conversation.messages.append(user_message)
        
        # Process message with AI service
        ai_response_data = await ai_service.process_chat_message(
            request.message, 
            conversation.messages
        )
        
        # Add AI response to conversation
        ai_message = ChatMessage(
            role=MessageRole.ASSISTANT,
            content=ai_response_data["message"],
            timestamp=datetime.utcnow()
        )
        conversation.messages.append(ai_message)
        
        # Update conversation preferences if new ones were extracted
        if ai_response_data.get("preferences"):
            conversation.preferences = TripPreferences(**ai_response_data["preferences"])
        
        # Update conversation timestamp
        conversation.updated_at = datetime.utcnow()
        
        # Prepare response
        response = ChatResponse(
            message=ai_response_data["message"],
            conversation_id=conversation_id,
            suggestions=ai_response_data.get("clarifying_questions", []),
            itinerary=ai_response_data.get("itinerary"),
            cost_estimate=ai_response_data.get("cost_estimate"),
            next_questions=ai_response_data.get("clarifying_questions", [])
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat message: {str(e)}")

@api_router.get("/conversations/{conversation_id}", response_model=Conversation)
async def get_conversation(conversation_id: str):
    """Get conversation history."""
    if conversation_id not in conversations:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversations[conversation_id]

@api_router.get("/conversations", response_model=List[Dict[str, Any]])
async def list_conversations():
    """List all conversations."""
    return [
        {
            "id": conv.id,
            "created_at": conv.created_at,
            "updated_at": conv.updated_at,
            "message_count": len(conv.messages)
        }
        for conv in conversations.values()
    ]

@api_router.post("/plan", response_model=TripItinerary)
async def generate_trip_plan(preferences: TripPreferences):
    """Generate a complete trip itinerary."""
    try:
        itinerary = ai_service._generate_itinerary(preferences)
        if not itinerary:
            raise HTTPException(status_code=400, detail="Could not generate itinerary with provided preferences")
        return itinerary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating trip plan: {str(e)}")

@api_router.get("/destinations")
async def get_destination_suggestions(
    query: str = None,
    budget: str = None,
    interests: str = None
):
    """Get destination suggestions based on criteria."""
    try:
        # This would typically integrate with external APIs like Google Places, TripAdvisor, etc.
        # For now, return sample data
        sample_destinations = [
            {
                "name": "Bali, Indonesia",
                "country": "Indonesia",
                "description": "Tropical paradise with rich culture and beautiful beaches",
                "budget_level": "medium",
                "best_time": "April-October",
                "highlights": ["Beaches", "Temples", "Rice Terraces", "Culture"]
            },
            {
                "name": "Santorini, Greece",
                "country": "Greece",
                "description": "Stunning volcanic island with iconic white architecture",
                "budget_level": "high",
                "best_time": "June-September",
                "highlights": ["Sunset Views", "Beaches", "Wine", "Architecture"]
            },
            {
                "name": "Tokyo, Japan",
                "country": "Japan",
                "description": "Modern metropolis blending tradition with innovation",
                "budget_level": "high",
                "best_time": "March-May, September-November",
                "highlights": ["Technology", "Culture", "Food", "Shopping"]
            }
        ]
        
        # Filter based on query parameters
        if query:
            sample_destinations = [
                d for d in sample_destinations 
                if query.lower() in d["name"].lower() or query.lower() in d["country"].lower()
            ]
        
        if budget:
            sample_destinations = [
                d for d in sample_destinations 
                if d["budget_level"] == budget.lower()
            ]
        
        return {
            "destinations": sample_destinations,
            "total": len(sample_destinations)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching destinations: {str(e)}")

@api_router.get("/routes")
async def get_travel_routes(
    from_location: str,
    to_location: str,
    transport_type: str = None
):
    """Get travel route options between two locations."""
    try:
        # This would typically integrate with Google Maps, Skyscanner, etc.
        # For now, return sample data
        sample_routes = [
            {
                "transport_type": "flight",
                "duration": "2h 30m",
                "cost": "$150-300",
                "description": "Direct flight",
                "airline": "Sample Airlines"
            },
            {
                "transport_type": "train",
                "duration": "4h 15m",
                "cost": "$50-120",
                "description": "High-speed rail",
                "operator": "Sample Railways"
            },
            {
                "transport_type": "bus",
                "duration": "6h 30m",
                "cost": "$25-60",
                "description": "Express bus service",
                "operator": "Sample Bus Co."
            }
        ]
        
        if transport_type:
            sample_routes = [
                r for r in sample_routes 
                if r["transport_type"] == transport_type.lower()
            ]
        
        return {
            "from": from_location,
            "to": to_location,
            "routes": sample_routes,
            "total": len(sample_routes)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching routes: {str(e)}")

@api_router.get("/budget-tips")
async def get_budget_tips(destination: str = None):
    """Get budget-saving travel tips."""
    try:
        tips = [
            "Travel during off-peak seasons for better prices",
            "Use local transportation instead of taxis",
            "Stay in hostels or budget hotels",
            "Eat at local restaurants away from tourist areas",
            "Book flights and accommodation in advance",
            "Use travel apps to find deals and discounts",
            "Consider house-sitting or couch-surfing",
            "Take advantage of free walking tours",
            "Use student or senior discounts when available",
            "Pack light to avoid baggage fees"
        ]
        
        return {
            "tips": tips,
            "destination": destination,
            "total_tips": len(tips)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching budget tips: {str(e)}")

@api_router.get("/hidden-gems")
async def get_hidden_gems(destination: str = None):
    """Get hidden gem recommendations for destinations."""
    try:
        gems = [
            "Visit local markets early in the morning for authentic experiences",
            "Explore neighborhoods away from main tourist areas",
            "Ask locals for restaurant recommendations",
            "Visit attractions during off-hours for fewer crowds",
            "Take alternative routes to popular destinations",
            "Attend local festivals and events",
            "Visit lesser-known museums and galleries",
            "Explore parks and nature areas",
            "Try street food from local vendors",
            "Take public transportation to see daily life"
        ]
        
        return {
            "hidden_gems": gems,
            "destination": destination,
            "total_gems": len(gems)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching hidden gems: {str(e)}")
