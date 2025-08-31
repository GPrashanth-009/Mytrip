from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"

class TripPreferences(BaseModel):
    budget: Optional[str] = Field(None, description="Budget range (low, medium, high)")
    dates: Optional[str] = Field(None, description="Travel dates")
    people: Optional[int] = Field(None, description="Number of travelers")
    interests: Optional[List[str]] = Field(None, description="Travel interests")
    destination: Optional[str] = Field(None, description="Destination or starting point")
    duration: Optional[str] = Field(None, description="Trip duration")
    transport_preference: Optional[str] = Field(None, description="Preferred transport")

class ChatMessage(BaseModel):
    role: MessageRole
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional message metadata")

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = Field(None, description="Conversation ID for context")
    preferences: Optional[TripPreferences] = Field(None, description="User trip preferences")
    context: Optional[List[ChatMessage]] = Field(None, description="Previous conversation context")

class ChatResponse(BaseModel):
    message: str
    conversation_id: str
    suggestions: Optional[List[str]] = Field(None, description="Suggested follow-up questions")
    itinerary: Optional[Dict[str, Any]] = Field(None, description="Generated trip itinerary")
    cost_estimate: Optional[Dict[str, Any]] = Field(None, description="Cost estimates")
    next_questions: Optional[List[str]] = Field(None, description="Clarifying questions to ask")

class TripItinerary(BaseModel):
    destination: str
    duration: str
    daily_plans: List[Dict[str, Any]]
    total_cost: Dict[str, float]
    transport_options: List[Dict[str, Any]]
    accommodation_suggestions: List[Dict[str, Any]]
    food_recommendations: List[Dict[str, Any]]
    hidden_gems: List[str]
    tips: List[str]

class Conversation(BaseModel):
    id: str
    user_id: Optional[str] = None
    messages: List[ChatMessage]
    preferences: Optional[TripPreferences] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
