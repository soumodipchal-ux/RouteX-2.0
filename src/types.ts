export type CrowdLevel = 'Low' | 'Moderate' | 'High';

export type Region = 'North Bengal' | 'South Bengal' | 'Rarh Bengal' | 'Coastal & Sundarbans';

export type Category = 
  | 'Hills' 
  | 'Forest' 
  | 'Tea gardens' 
  | 'Villages' 
  | 'Waterfalls'
  | 'Beaches'
  | 'Heritage'
  | 'Historical Places'
  | 'Rural tourism'
  | 'Rivers'
  | 'Cultural'
  | 'Adventure'
  | 'Wildlife'
  | 'Eco Tourism'
  | 'Nature'
  | 'Photography'
  | 'Peaceful Getaways';

export type TravelType = 'Family' | 'Friends' | 'Couple' | 'Solo';

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: string;
  rainProb: string;
  bestVisitingTime: string;
  forecast?: Array<{
    day: string;
    temp: string;
    condition: string;
    rain: string;
  }>;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  travelType: TravelType;
  text: string;
  helpfulCount: number;
  verifiedBooking: boolean;
  photos?: string[];
}

export interface Destination {
  id: string;
  name: string;
  bengaliName?: string;
  district: string;
  region: Region;
  category: Category[];
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  distance: string; // e.g., '620 km from Kolkata, 65 km from Siliguri'
  bestTimeToVisit: string;
  estimatedBudget: number; // in INR per day/person
  currentCrowdLevel: CrowdLevel;
  recommendedHours: string;
  safetyStatus: 'Verified Safe' | 'Family Friendly' | 'Caution in Monsoon';
  rating: number;
  reviewCount: number;
  isPopularHotspot?: boolean; // If high crowd hotspot like Darjeeling town or Digha
  crowdAlternatives?: string[]; // IDs of quieter nearby hidden gems
  weather: WeatherData;
  coordinates: {
    lat: number;
    lng: number;
  };
  howToReach: {
    byAir: string;
    byTrain: string;
    byRoad: string;
  };
  nearbyAttractions: string[];
  recommendedHotels: Array<{
    name: string;
    type: 'Eco Homestay' | 'Heritage Bungalow' | 'Resort' | 'Budget Stay';
    pricePerNight: number;
    rating: number;
    contact: string;
  }>;
  localFood: string[];
  activities: string[];
  localGuides: Array<{
    name: string;
    phone: string;
    languages: string[];
    experience: string;
  }>;
  verifiedGuides?: Array<{
    name: string;
    phone: string;
    languages?: string[];
    language?: string;
    experience?: string;
  }>;
  distanceFromKolkata?: string;
  reviews: Review[];
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  destinationId: string;
  category: TravelType;
  duration: string; // e.g., '3 Days / 2 Nights'
  startingPrice: number;
  maxTravellers: number;
  hotelType: string;
  transportType: string;
  activities: string[];
  highlights: string[];
  rating: number;
  availability: 'Available' | 'Filling Fast' | 'Limited Slots';
  image: string;
  itinerarySummary: string[];
  description?: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Paid' | 'Cancelled' | 'Completed';

export interface Booking {
  id: string;
  bookingToken: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destinationId: string;
  destinationName: string;
  packageId?: string;
  packageName: string;
  travelDate: string;
  travellersCount: number;
  travelType: TravelType;
  hotelSelected: string;
  transportSelected: string;
  optionalActivities: string[];
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  paymentMethod: string;
  qrVerified?: boolean;
  verifiedAt?: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
  memberSince: string;
  completedTripsCount: number;
  savedDestinations: string[];
}

export interface TravelAlert {
  id: string;
  type: 'road' | 'weather' | 'crowd' | 'safety';
  severity: 'info' | 'warning' | 'urgent';
  title: string;
  description: string;
  location: string;
  updatedAt: string;
}

export interface AIItinerary {
  id: string;
  createdAt: string;
  title: string;
  summary: string;
  region: string;
  estimatedTotalCost: string;
  recommendedTransport: string;
  weatherAdvice: string;
  crowdTip: string;
  safetyAdvice: string;
  days: Array<{
    dayNumber: number;
    title: string;
    destination: string;
    morning: string;
    afternoon: string;
    evening: string;
    stay: string;
    dining: string;
  }>;
  packingEssentials: string[];
}
