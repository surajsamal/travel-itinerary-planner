import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  title: text("title").notNull(),
  destination: text("destination").notNull(),
  duration: text("duration").notNull(),
  travelers: integer("travelers").notNull(),
  budget: text("budget").notNull(),
  travelerType: text("traveler_type").notNull(),
  travelPace: text("travel_pace").notNull(),
  sleepPattern: text("sleep_pattern").notNull(),
  experienceType: text("experience_type").notNull(),
  travelPurpose: text("travel_purpose").notNull(),
  specialRequirements: text("special_requirements"),
  generatedItinerary: jsonb("generated_itinerary").notNull(),
  createdAt: text("created_at").notNull(),
});

export const travelPreferencesSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  duration: z.string().min(1, "Duration is required"),
  travelers: z.number().min(1, "At least 1 traveler is required"),
  budget: z.string().min(1, "Budget range is required"),
  travelerType: z.string().min(1, "Traveler type is required"),
  travelPace: z.string().min(1, "Travel pace is required"),
  sleepPattern: z.string().min(1, "Sleep pattern is required"),
  experienceType: z.string().min(1, "Experience type is required"),
  travelPurpose: z.string().min(1, "Travel purpose is required"),
  specialRequirements: z.string().optional(),
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type TravelPreferences = z.infer<typeof travelPreferencesSchema>;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
