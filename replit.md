# Travel Itinerary Generator

## Overview

This is a full-stack travel itinerary generator application built with React/TypeScript frontend and Express.js backend. The application allows users to input their travel preferences through a multi-step wizard and generates personalized itineraries using OpenAI's API. The system uses Drizzle ORM with PostgreSQL for data persistence and features a modern UI built with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: shadcn/ui components based on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for travel-themed colors
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for itinerary generation and management
- **Middleware**: Custom logging middleware for request tracking
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Data Storage Solutions
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Fallback Storage**: In-memory storage implementation for development

### Authentication and Authorization
- **Current State**: No authentication implemented (userId is nullable)
- **Session Management**: Configured for future implementation with PostgreSQL sessions
- **User Model**: Basic user schema with username/password fields ready for implementation

## Key Components

### Frontend Components
1. **Planning Wizard**: Multi-step form for collecting travel preferences
   - Destination, duration, travelers, budget selection
   - Traveler type, pace, sleep pattern preferences
   - Experience type and travel purpose
   - Special requirements input

2. **Itinerary Display**: Comprehensive itinerary viewer
   - Day-by-day breakdown with activities
   - Time-based activity organization (morning/afternoon/evening)
   - Budget estimates and transport information
   - PDF export functionality
   - Edit and regenerate options

3. **UI Components**: Complete shadcn/ui component library
   - Form controls, navigation, feedback components
   - Progress indicators, cards, badges, tooltips
   - Responsive design with mobile-first approach

### Backend Services
1. **OpenAI Integration**: AI-powered itinerary generation
   - Uses GPT-4o model for content generation
   - Structured prompts based on user preferences
   - Returns formatted itinerary with activities, timing, and costs

2. **Storage Layer**: Flexible data persistence
   - Interface-based design allowing multiple storage implementations
   - Memory storage for development
   - PostgreSQL storage for production

3. **API Endpoints**:
   - `POST /api/itinerary/generate`: Generate new itinerary
   - `GET /api/itinerary`: List all itineraries
   - User management endpoints (schema ready)

## Data Flow

1. **User Input**: Multi-step wizard collects travel preferences
2. **Validation**: Client-side validation using Zod schemas
3. **API Request**: Preferences sent to backend generation endpoint
4. **AI Processing**: OpenAI generates structured itinerary content
5. **Data Persistence**: Itinerary saved to database with user preferences
6. **Response**: Complete itinerary returned to frontend
7. **Display**: Rich itinerary interface with export/edit capabilities

### Data Models
- **Travel Preferences**: Comprehensive user input validation
- **Generated Itinerary**: Structured daily activities with metadata
- **Saved Itinerary**: Complete record with user context and timestamps

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for itinerary generation
- **Environment Variables**: OPENAI_API_KEY for authentication

### Database Services
- **Neon PostgreSQL**: Serverless PostgreSQL hosting
- **Environment Variables**: DATABASE_URL for connection

### Development Tools
- **Replit Integration**: Runtime error overlay and cartographer for development
- **Development Banner**: Replit branding for hosted environments

### UI Libraries
- **Radix UI**: Headless component primitives
- **Lucide React**: Icon library for consistent iconography
- **jsPDF**: Client-side PDF generation for itinerary exports
- **Embla Carousel**: Touch-friendly carousel components

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Hot reload with Vite dev server proxy
- **Production**: Static file serving with Express
- **Database**: PostgreSQL connection via environment variable

### File Structure
- **Monorepo Structure**: Client, server, and shared code organization
- **Shared Schema**: Common TypeScript types and validation
- **Asset Management**: Vite handles frontend assets with path resolution

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `check`: TypeScript compilation check
- `db:push`: Database schema synchronization

The application is designed for easy deployment on platforms like Replit, with automatic environment detection and appropriate tooling integration.

## Recent Updates

### January 2025 - Enhanced UI Design
- Transformed home page with modern, attractive design featuring:
  - Animated gradient hero section with floating background elements and pulse effects
  - Enhanced typography with gradient text effects and improved readability
  - Added comprehensive features section highlighting AI capabilities with hover animations
  - Implemented social proof section with customer testimonials and star ratings
  - Created compelling call-to-action section with modern button styling
  - Redesigned footer with better organization, social links, and improved navigation
  - Added custom CSS animations (fade-in-up, pulse effects with staggered delays)
  - Fixed text visibility issues with proper color contrast throughout the application
  - Enhanced interactive elements with hover effects, transforms, and smooth transitions