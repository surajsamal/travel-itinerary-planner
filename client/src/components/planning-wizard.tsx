import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { travelPreferencesSchema, type TravelPreferences } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { MultiStepForm } from "./ui/multi-step-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  User, Users, Briefcase, Heart, Leaf, Zap, Sun, Moon, 
  Map, Star, Mountain, Dumbbell, Laptop, Sparkles 
} from "lucide-react";
import type { SavedItinerary } from "../types/itinerary";

interface PlanningWizardProps {
  onItineraryGenerated: (itinerary: SavedItinerary) => void;
}

const travelerTypeOptions = [
  { value: "solo", label: "Solo", icon: User },
  { value: "group", label: "Group", icon: Users },
  { value: "business", label: "Business", icon: Briefcase },
  { value: "couples", label: "Couples", icon: Heart },
];

const travelPaceOptions = [
  { value: "relaxed", label: "Relaxed", description: "Take it slow", icon: Leaf },
  { value: "fast-paced", label: "Fast-paced", description: "See everything", icon: Zap },
];

const sleepPatternOptions = [
  { value: "early-bird", label: "Early bird", description: "Up with sunrise", icon: Sun },
  { value: "night-owl", label: "Night owl", description: "Love nightlife", icon: Moon },
];

const experienceTypeOptions = [
  { value: "offbeat", label: "Offbeat", icon: Map },
  { value: "popular", label: "Popular", icon: Star },
  { value: "romantic", label: "Romantic", icon: Heart },
  { value: "adventure", label: "Adventure", icon: Mountain },
];

const travelPurposeOptions = [
  { value: "leisure", label: "Leisure", icon: Dumbbell },
  { value: "workation", label: "Workation", icon: Laptop },
  { value: "wellness", label: "Wellness", icon: Sparkles },
];

export function PlanningWizard({ onItineraryGenerated }: PlanningWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<TravelPreferences>({
    resolver: zodResolver(travelPreferencesSchema),
    defaultValues: {
      destination: "",
      duration: "",
      travelers: 1,
      budget: "",
      travelerType: "",
      travelPace: "",
      sleepPattern: "",
      experienceType: "",
      travelPurpose: "",
      specialRequirements: "",
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data: TravelPreferences) => {
      const response = await apiRequest("POST", "/api/itinerary/generate", data);
      return response.json() as Promise<SavedItinerary>;
    },
    onSuccess: (data) => {
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized travel plan is ready.",
      });
      onItineraryGenerated(data);
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TravelPreferences) => {
    generateMutation.mutate(data);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const PreferenceButton = ({ 
    option, 
    isSelected, 
    onClick 
  }: { 
    option: any; 
    isSelected: boolean; 
    onClick: () => void;
  }) => {
    const IconComponent = option.icon;
    return (
      <Button
        type="button"
        variant="outline"
        className={`p-4 h-auto flex flex-col items-center text-center transition-all ${
          isSelected 
            ? "border-travel-teal bg-travel-teal text-white" 
            : "border-gray-200 hover:border-travel-teal"
        }`}
        onClick={onClick}
      >
        <IconComponent className="h-6 w-6 mb-2" />
        <div className="text-sm font-medium">{option.label}</div>
        {option.description && (
          <div className="text-xs opacity-70 mt-1">{option.description}</div>
        )}
      </Button>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <MultiStepForm
          currentStep={currentStep}
          totalSteps={3}
          onNext={nextStep}
          onPrev={prevStep}
          onSubmit={() => form.handleSubmit(onSubmit)()}
          isLastStep={currentStep === 3}
          isSubmitting={generateMutation.isPending}
        >
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-travel-dark dark:text-white mb-6">Tell us about your trip</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Paris, France" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-2 days">1-2 days</SelectItem>
                          <SelectItem value="3-5 days">3-5 days</SelectItem>
                          <SelectItem value="1 week">1 week</SelectItem>
                          <SelectItem value="2 weeks">2 weeks</SelectItem>
                          <SelectItem value="1 month+">1 month+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of travelers</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="2" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Budget ($0-$50/day)">Budget ($0-$50/day)</SelectItem>
                          <SelectItem value="Moderate ($50-$150/day)">Moderate ($50-$150/day)</SelectItem>
                          <SelectItem value="Luxury ($150-$500/day)">Luxury ($150-$500/day)</SelectItem>
                          <SelectItem value="Ultra-luxury ($500+/day)">Ultra-luxury ($500+/day)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-travel-dark dark:text-white mb-6">Your travel style</h2>
              
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="travelerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-travel-dark dark:text-white mb-3">Type of traveler</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {travelerTypeOptions.map((option) => (
                          <PreferenceButton
                            key={option.value}
                            option={option}
                            isSelected={field.value === option.value}
                            onClick={() => field.onChange(option.value)}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelPace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-travel-dark dark:text-white mb-3">Travel pace</FormLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {travelPaceOptions.map((option) => (
                          <PreferenceButton
                            key={option.value}
                            option={option}
                            isSelected={field.value === option.value}
                            onClick={() => field.onChange(option.value)}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sleepPattern"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-travel-dark dark:text-white mb-3">Sleep pattern</FormLabel>
                      <div className="grid grid-cols-2 gap-3">
                        {sleepPatternOptions.map((option) => (
                          <PreferenceButton
                            key={option.value}
                            option={option}
                            isSelected={field.value === option.value}
                            onClick={() => field.onChange(option.value)}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-travel-dark dark:text-white mb-6">What experiences do you love?</h2>
              
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="experienceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-travel-dark dark:text-white mb-3">Experience type</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {experienceTypeOptions.map((option) => (
                          <PreferenceButton
                            key={option.value}
                            option={option}
                            isSelected={field.value === option.value}
                            onClick={() => field.onChange(option.value)}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelPurpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-travel-dark dark:text-white mb-3">Travel purpose</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {travelPurposeOptions.map((option) => (
                          <PreferenceButton
                            key={option.value}
                            option={option}
                            isSelected={field.value === option.value}
                            onClick={() => field.onChange(option.value)}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any accessibility needs, dietary restrictions, or special preferences..." 
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </MultiStepForm>
      </form>
    </Form>
  );
}
