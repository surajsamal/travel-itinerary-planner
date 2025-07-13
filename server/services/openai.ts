import OpenAI from "openai";
import type { TravelPreferences } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface DayActivity {
  time: string;
  title: string;
  description: string;
  duration: string;
  transport: string;
  cost: string;
  tags: string[];
  timeOfDay: "morning" | "afternoon" | "evening";
}

export interface ItineraryDay {
  day: number;
  title: string;
  estimatedBudget: string;
  activities: DayActivity[];
}

export interface GeneratedItinerary {
  title: string;
  destination: string;
  duration: string;
  travelers: number;
  budget: string;
  experienceTags: string[];
  days: ItineraryDay[];
}

export async function generateItinerary(preferences: TravelPreferences): Promise<GeneratedItinerary> {
  const prompt = `Create a detailed travel itinerary based on these preferences:

Destination: ${preferences.destination}
Duration: ${preferences.duration}
Number of travelers: ${preferences.travelers}
Budget: ${preferences.budget}
Traveler type: ${preferences.travelerType}
Travel pace: ${preferences.travelPace}
Sleep pattern: ${preferences.sleepPattern}
Experience type: ${preferences.experienceType}
Travel purpose: ${preferences.travelPurpose}
Special requirements: ${preferences.specialRequirements || "None"}

Please create a comprehensive day-by-day itinerary with the following structure:
- Each day should have morning, afternoon, and evening activities
- Include specific activity titles, descriptions, estimated duration, transport between locations, and estimated costs
- Tag each activity with relevant categories (cultural, romantic, adventurous, culinary, historical, nature, luxury, social)
- Provide realistic time estimates and budget breakdowns
- Consider the traveler's pace and sleep pattern preferences
- Include rest periods if needed based on pace preference

Return the response as JSON with this exact structure:
{
  "title": "Trip title",
  "destination": "Destination name",
  "duration": "Duration",
  "travelers": number,
  "budget": "Budget range",
  "experienceTags": ["tag1", "tag2", "tag3"],
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "estimatedBudget": "Budget per person",
      "activities": [
        {
          "time": "9:00 AM - 12:00 PM",
          "title": "Activity title",
          "description": "Activity description",
          "duration": "3 hours",
          "transport": "Walking/Metro/etc",
          "cost": "€25-35",
          "tags": ["cultural", "historical"],
          "timeOfDay": "morning"
        }
      ]
    }
  ]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner. Create detailed, personalized itineraries based on user preferences. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as GeneratedItinerary;
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota' || error.message?.includes('quota')) {
      throw new Error("OpenAI API quota exceeded. Please check your OpenAI account billing and usage limits at https://platform.openai.com/account/billing");
    }
    
    if (error.code === 'invalid_api_key') {
      throw new Error("Invalid OpenAI API key. Please check your API key configuration.");
    }
    
    if (error.code === 'rate_limit_exceeded') {
      throw new Error("OpenAI API rate limit exceeded. Please wait a moment and try again.");
    }
    
    throw new Error(`Failed to generate itinerary: ${error.message || 'Unknown error occurred'}`);
  }
}
