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

export interface SavedItinerary {
  id: number;
  userId?: number;
  title: string;
  destination: string;
  duration: string;
  travelers: number;
  budget: string;
  travelerType: string;
  travelPace: string;
  sleepPattern: string;
  experienceType: string;
  travelPurpose: string;
  specialRequirements?: string;
  generatedItinerary: GeneratedItinerary;
  createdAt: string;
}
