import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Edit, Share, Download, Save, RotateCcw, Clock, MapPin, DollarSign, Users, Calendar } from "lucide-react";
import { generateItineraryPDF } from "@/lib/pdf-generator";
import { useToast } from "@/hooks/use-toast";
import type { SavedItinerary, DayActivity } from "../types/itinerary";

interface ItineraryDisplayProps {
  itinerary: SavedItinerary;
  onEdit?: () => void;
  onRegenerate?: () => void;
}

const timeOfDayColors = {
  morning: "bg-yellow-100 text-yellow-800",
  afternoon: "bg-orange-100 text-orange-800", 
  evening: "bg-indigo-100 text-indigo-800",
};

const timeOfDayIcons = {
  morning: "☀️",
  afternoon: "🌤️",
  evening: "🌙",
};

const tagColors: Record<string, string> = {
  cultural: "bg-blue-100 text-blue-800",
  romantic: "bg-green-100 text-green-800",
  historical: "bg-purple-100 text-purple-800",
  culinary: "bg-orange-100 text-orange-800",
  nature: "bg-gray-100 text-gray-800",
  luxury: "bg-pink-100 text-pink-800",
  adventure: "bg-red-100 text-red-800",
  social: "bg-cyan-100 text-cyan-800",
};

export function ItineraryDisplay({ itinerary, onEdit, onRegenerate }: ItineraryDisplayProps) {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    try {
      generateItineraryPDF(itinerary.generatedItinerary);
      toast({
        title: "PDF Downloaded",
        description: "Your itinerary has been downloaded as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: itinerary.generatedItinerary.title,
          text: `Check out my travel itinerary for ${itinerary.destination}!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Itinerary link copied to clipboard.",
        });
      }
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Failed to share itinerary.",
        variant: "destructive",
      });
    }
  };

  const ActivityCard = ({ activity }: { activity: DayActivity }) => (
    <Card className="bg-travel-light">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Badge className={`mr-3 ${timeOfDayColors[activity.timeOfDay]}`}>
                <span className="mr-1">{timeOfDayIcons[activity.timeOfDay]}</span>
                {activity.timeOfDay}
              </Badge>
              <span className="text-travel-medium text-sm">{activity.time}</span>
            </div>
            
            <h4 className="font-semibold text-travel-dark mb-2">{activity.title}</h4>
            <p className="text-sm text-travel-medium mb-2">{activity.description}</p>
            
            <div className="flex items-center space-x-4 text-xs text-travel-medium mb-2">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {activity.duration}
              </span>
              <span className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {activity.transport}
              </span>
              <span className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                {activity.cost}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {activity.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className={`text-xs ${tagColors[tag] || "bg-gray-100 text-gray-800"}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="text-travel-medium hover:text-travel-dark">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Itinerary Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-travel-dark mb-2">
                {itinerary.generatedItinerary.title}
              </CardTitle>
              <div className="flex items-center space-x-6 text-travel-medium">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {itinerary.duration}
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {itinerary.travelers} Travelers
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {itinerary.budget}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                className="bg-travel-teal hover:bg-travel-teal/90 text-white"
                onClick={handleDownloadPDF}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {itinerary.generatedItinerary.experienceTags.map((tag) => (
              <Badge key={tag} className={tagColors[tag] || "bg-gray-100 text-gray-800"}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Itinerary */}
      <div className="space-y-8">
        {itinerary.generatedItinerary.days.map((day) => (
          <Card key={day.day}>
            <CardHeader className="bg-travel-teal text-white">
              <CardTitle className="text-xl">
                Day {day.day} - {day.title}
              </CardTitle>
              <p className="opacity-90">{day.estimatedBudget}</p>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-6">
                {day.activities.map((activity, index) => (
                  <ActivityCard key={index} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-8">
        <Button 
          variant="outline" 
          className="mr-4"
          onClick={onRegenerate}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Regenerate Itinerary
        </Button>
        <Button className="bg-travel-teal hover:bg-travel-teal/90 text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Itinerary
        </Button>
      </div>
    </div>
  );
}
