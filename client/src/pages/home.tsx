import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlanningWizard } from "@/components/planning-wizard";
import { ItineraryDisplay } from "@/components/itinerary-display";
import { Compass, Star, Sparkles } from "lucide-react";
import type { SavedItinerary } from "../types/itinerary";

type AppState = "hero" | "planning" | "loading" | "itinerary";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("hero");
  const [currentItinerary, setCurrentItinerary] = useState<SavedItinerary | null>(null);

  const handleStartPlanning = () => {
    setAppState("planning");
  };

  const handleItineraryGenerated = (itinerary: SavedItinerary) => {
    setCurrentItinerary(itinerary);
    setAppState("itinerary");
  };

  const handleEdit = () => {
    setAppState("planning");
  };

  const handleRegenerate = () => {
    setAppState("planning");
  };

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (appState === "planning") {
    return (
      <div id="planning-section">
        <PlanningWizard onItineraryGenerated={handleItineraryGenerated} />
      </div>
    );
  }

  if (appState === "itinerary" && currentItinerary) {
    return (
      <div id="itinerary-section">
        <ItineraryDisplay 
          itinerary={currentItinerary}
          onEdit={handleEdit}
          onRegenerate={handleRegenerate}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Compass className="text-travel-teal text-2xl mr-3" />
              <h1 className="text-xl font-bold text-travel-dark dark:text-white">TravelAI</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-travel-medium hover:text-travel-dark dark:text-gray-300 dark:hover:text-white transition-colors">How it works</a>
              <a href="#" className="text-travel-medium hover:text-travel-dark dark:text-gray-300 dark:hover:text-white transition-colors">Examples</a>
              <a href="#" className="text-travel-medium hover:text-travel-dark dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</a>
              <Button className="bg-travel-teal hover:bg-travel-teal/90 text-white">
                Sign In
              </Button>
            </nav>
            <Button variant="ghost" className="md:hidden text-travel-medium">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-travel-teal via-blue-600 to-purple-700 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg leading-tight">
              Plan Your Perfect Trip with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Get personalized day-by-day itineraries crafted by AI based on your preferences, budget, and travel style. 
              <span className="block mt-2 text-lg text-white/80">✨ Powered by advanced AI • 🗺️ Tailored just for you • 📱 Export & share easily</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Button 
                size="lg"
                className="bg-white text-travel-teal hover:bg-gray-50 text-lg font-semibold px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={handleStartPlanning}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Planning Now
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-travel-teal text-lg font-semibold px-8 py-6 rounded-full backdrop-blur-sm bg-white/10"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose TravelAI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of travel planning with our intelligent assistant
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-travel-teal to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Planning</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced AI creates personalized itineraries based on your unique preferences and travel style
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-travel-coral to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Instant Results</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get detailed day-by-day plans in seconds, complete with activities, timing, and budget estimates
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Export & Share</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Download beautiful PDFs or share your itinerary with travel companions effortlessly
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {appState === "loading" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-travel-teal mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Creating your perfect itinerary...</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Our AI is analyzing your preferences and crafting a personalized travel plan.</p>
          
          <Card className="bg-travel-light max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Analyzing preferences</span>
                <Sparkles className="h-4 w-4 text-travel-teal" />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Finding activities</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-travel-teal"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Optimizing schedule</span>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Social Proof Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Trusted by Travel Enthusiasts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "Amazing! Created a perfect 7-day itinerary for Japan in seconds. Every detail was spot-on."
              </p>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Sarah M.</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Solo Traveler</div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "The AI understood our budget constraints and created an incredible honeymoon plan!"
              </p>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Mike & Jenny</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Couple</div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "Best travel planning tool ever! Saved us hours of research and gave us hidden gems."
              </p>
              <div className="text-sm font-medium text-gray-900 dark:text-white">Alex Chen</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Adventure Seeker</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-travel-teal to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Plan Your Next Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers who've discovered their perfect trips with AI
          </p>
          <Button 
            size="lg"
            className="bg-white text-travel-teal hover:bg-gray-50 text-lg font-semibold px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={handleStartPlanning}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <Compass className="text-travel-teal text-3xl mr-3" />
                <h3 className="text-2xl font-bold">TravelAI</h3>
              </div>
              <p className="text-gray-300 text-lg mb-6 max-w-md">
                AI-powered travel planning that creates personalized itineraries for your perfect trip. 
                Experience the future of travel planning today.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-travel-teal text-travel-teal hover:bg-travel-teal hover:text-white">
                  Download App
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  API Access
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-travel-teal transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-travel-teal transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-travel-teal transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-travel-teal transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-travel-teal transition-colors">Travel Guides</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-travel-teal transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-travel-teal transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-travel-teal transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-travel-teal transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-travel-teal transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 TravelAI. All rights reserved. Made with ❤️ for travelers worldwide.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-travel-teal transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-travel-teal transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-travel-teal transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
