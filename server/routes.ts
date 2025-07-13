import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { travelPreferencesSchema } from "@shared/schema";
import { generateItinerary } from "./services/openai";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate itinerary endpoint
  app.post("/api/itinerary/generate", async (req, res) => {
    try {
      const preferences = travelPreferencesSchema.parse(req.body);
      
      const generatedItinerary = await generateItinerary(preferences);
      
      // Save to storage
      const savedItinerary = await storage.createItinerary({
        userId: null, // For now, not requiring user authentication
        title: generatedItinerary.title,
        destination: preferences.destination,
        duration: preferences.duration,
        travelers: preferences.travelers,
        budget: preferences.budget,
        travelerType: preferences.travelerType,
        travelPace: preferences.travelPace,
        sleepPattern: preferences.sleepPattern,
        experienceType: preferences.experienceType,
        travelPurpose: preferences.travelPurpose,
        specialRequirements: preferences.specialRequirements,
        generatedItinerary: generatedItinerary,
      });

      res.json(savedItinerary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid input data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: (error as Error).message || "Failed to generate itinerary" 
        });
      }
    }
  });

  // Get all itineraries
  app.get("/api/itinerary", async (req, res) => {
    try {
      const itineraries = await storage.getUserItineraries();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itineraries" });
    }
  });

  // Get specific itinerary
  app.get("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itinerary = await storage.getItinerary(id);
      
      if (!itinerary) {
        res.status(404).json({ message: "Itinerary not found" });
        return;
      }
      
      res.json(itinerary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itinerary" });
    }
  });

  // Update itinerary
  app.patch("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const updatedItinerary = await storage.updateItinerary(id, updates);
      
      if (!updatedItinerary) {
        res.status(404).json({ message: "Itinerary not found" });
        return;
      }
      
      res.json(updatedItinerary);
    } catch (error) {
      res.status(500).json({ message: "Failed to update itinerary" });
    }
  });

  // Delete itinerary
  app.delete("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteItinerary(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Itinerary not found" });
        return;
      }
      
      res.json({ message: "Itinerary deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete itinerary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
