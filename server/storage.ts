import { users, itineraries, type User, type InsertUser, type Itinerary, type InsertItinerary } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  getItinerary(id: number): Promise<Itinerary | undefined>;
  getUserItineraries(userId?: number): Promise<Itinerary[]>;
  updateItinerary(id: number, updates: Partial<InsertItinerary>): Promise<Itinerary | undefined>;
  deleteItinerary(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private itineraries: Map<number, Itinerary>;
  private currentUserId: number;
  private currentItineraryId: number;

  constructor() {
    this.users = new Map();
    this.itineraries = new Map();
    this.currentUserId = 1;
    this.currentItineraryId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const id = this.currentItineraryId++;
    const itinerary: Itinerary = {
      ...insertItinerary,
      id,
      userId: insertItinerary.userId || null,
      specialRequirements: insertItinerary.specialRequirements || null,
      createdAt: new Date().toISOString(),
    };
    this.itineraries.set(id, itinerary);
    return itinerary;
  }

  async getItinerary(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async getUserItineraries(userId?: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => !userId || itinerary.userId === userId
    );
  }

  async updateItinerary(id: number, updates: Partial<InsertItinerary>): Promise<Itinerary | undefined> {
    const existing = this.itineraries.get(id);
    if (!existing) return undefined;
    
    const updated: Itinerary = { ...existing, ...updates };
    this.itineraries.set(id, updated);
    return updated;
  }

  async deleteItinerary(id: number): Promise<boolean> {
    return this.itineraries.delete(id);
  }
}

export const storage = new MemStorage();
