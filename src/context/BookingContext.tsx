import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination, TourPackage, Booking, AIItinerary, TravelAlert, Review, BookingStatus, CrowdLevel } from '../types';
import { DESTINATIONS, TOUR_PACKAGES, INITIAL_BOOKINGS, TRAVEL_ALERTS } from '../data/mockData';

interface BookingContextType {
  destinations: Destination[];
  tourPackages: TourPackage[];
  bookings: Booking[];
  aiItineraries: AIItinerary[];
  travelAlerts: TravelAlert[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingToken' | 'createdAt' | 'status' | 'qrVerified'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  verifyBookingToken: (token: string) => { valid: boolean; booking?: Booking; message: string };
  addDestinationReview: (destinationId: string, review: Omit<Review, 'id' | 'helpfulCount' | 'verifiedBooking'>) => boolean;
  saveAIItinerary: (itinerary: AIItinerary) => void;
  deleteAIItinerary: (id: string) => void;
  // Admin Management functions
  adminAddDestination: (destination: Destination) => void;
  adminUpdateDestination: (id: string, updates: Partial<Destination>) => void;
  adminDeleteDestination: (id: string) => void;
  adminAddPackage: (pkg: TourPackage) => void;
  adminUpdatePackage: (id: string, updates: Partial<TourPackage>) => void;
  adminDeletePackage: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('routex_destinations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const parsedIds = new Set(parsed.filter(Boolean).map(d => d?.id).filter(Boolean));
          // Add any new destinations that are in DESTINATIONS but not yet in localStorage
          const newDests = DESTINATIONS.filter(d => !parsedIds.has(d.id));
          // Also update existing destinations' categories and all fields from fresh data
          const updatedParsed = parsed.filter(Boolean).map(p => {
            const fresh = DESTINATIONS.find(d => d.id === p.id);
            return fresh
              ? {
                  ...fresh,
                  ...p,
                  category: fresh.category,
                  bengaliName: fresh.bengaliName || p.bengaliName,
                  localGuides: fresh.localGuides || p.localGuides || [],
                  activities: fresh.activities || p.activities || [],
                  nearbyAttractions: fresh.nearbyAttractions || p.nearbyAttractions || [],
                  recommendedHotels: fresh.recommendedHotels || p.recommendedHotels || [],
                  localFood: fresh.localFood || p.localFood || [],
                  reviews: fresh.reviews || p.reviews || []
                }
              : p;
          });
          return [...updatedParsed, ...newDests];
        }
      } catch {
        return DESTINATIONS;
      }
    }
    return DESTINATIONS;
  });

  const [tourPackages, setTourPackages] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem('routex_packages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const parsedIds = new Set(parsed.filter(Boolean).map(p => p?.id).filter(Boolean));
          const newPkgs = TOUR_PACKAGES.filter(p => !parsedIds.has(p.id));
          return [...parsed.filter(Boolean), ...newPkgs];
        }
      } catch {
        return TOUR_PACKAGES;
      }
    }
    return TOUR_PACKAGES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('routex_bookings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(Boolean) : INITIAL_BOOKINGS;
      } catch {
        return INITIAL_BOOKINGS;
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [aiItineraries, setAiItineraries] = useState<AIItinerary[]>(() => {
    const saved = localStorage.getItem('routex_itineraries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [travelAlerts] = useState<TravelAlert[]>(TRAVEL_ALERTS);

  // Sync to local storage for persistence across reloads
  useEffect(() => {
    localStorage.setItem('routex_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('routex_packages', JSON.stringify(tourPackages));
  }, [tourPackages]);

  useEffect(() => {
    localStorage.setItem('routex_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('routex_itineraries', JSON.stringify(aiItineraries));
  }, [aiItineraries]);

  const createBooking = (data: Omit<Booking, 'id' | 'bookingToken' | 'createdAt' | 'status' | 'qrVerified'>): Booking => {
    const randomIdSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `RX-WB-${randomIdSuffix}`;
    const token = `RX-TOKEN-${randomIdSuffix}-${data.destinationId.toUpperCase().slice(0, 6)}`;

    const newBooking: Booking = {
      ...data,
      id: bookingId,
      bookingToken: token,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      qrVerified: false,
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const verifyBookingToken = (token: string): { valid: boolean; booking?: Booking; message: string } => {
    const cleanToken = token.trim().toUpperCase();
    const found = bookings.find(
      b => b.bookingToken.toUpperCase() === cleanToken || b.id.toUpperCase() === cleanToken
    );

    if (!found) {
      return { valid: false, message: 'Invalid or expired QR Travel Pass.' };
    }

    if (found.status === 'Cancelled') {
      return { valid: false, booking: found, message: 'This booking has been cancelled.' };
    }

    // Mark as QR verified
    setBookings(prev =>
      prev.map(b => (b.id === found.id ? { ...b, qrVerified: true, verifiedAt: new Date().toISOString() } : b))
    );

    return {
      valid: true,
      booking: { ...found, qrVerified: true, verifiedAt: new Date().toISOString() },
      message: `Verified successfully for ${found.customerName}! Valid for travel on ${found.travelDate}.`,
    };
  };

  const addDestinationReview = (
    destinationId: string,
    reviewData: Omit<Review, 'id' | 'helpfulCount' | 'verifiedBooking'>
  ): boolean => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      helpfulCount: 0,
      verifiedBooking: true,
    };

    setDestinations(prev =>
      prev.map(dest => {
        if (dest.id === destinationId) {
          const updatedReviews = [newReview, ...dest.reviews];
          const newAvg = Number(
            (
              updatedReviews.reduce((acc, r) => acc + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...dest,
            reviews: updatedReviews,
            rating: newAvg,
            reviewCount: dest.reviewCount + 1,
          };
        }
        return dest;
      })
    );
    return true;
  };

  const saveAIItinerary = (itinerary: AIItinerary) => {
    setAiItineraries(prev => [itinerary, ...prev]);
  };

  const deleteAIItinerary = (id: string) => {
    setAiItineraries(prev => prev.filter(item => item.id !== id));
  };

  // Admin CRUD
  const adminAddDestination = (newDest: Destination) => {
    setDestinations(prev => [newDest, ...prev]);
  };

  const adminUpdateDestination = (id: string, updates: Partial<Destination>) => {
    setDestinations(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const adminDeleteDestination = (id: string) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  const adminAddPackage = (pkg: TourPackage) => {
    setTourPackages(prev => [pkg, ...prev]);
  };

  const adminUpdatePackage = (id: string, updates: Partial<TourPackage>) => {
    setTourPackages(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const adminDeletePackage = (id: string) => {
    setTourPackages(prev => prev.filter(p => p.id !== id));
  };

  return (
    <BookingContext.Provider
      value={{
        destinations,
        tourPackages,
        bookings,
        aiItineraries,
        travelAlerts,
        createBooking,
        cancelBooking,
        updateBookingStatus,
        verifyBookingToken,
        addDestinationReview,
        saveAIItinerary,
        deleteAIItinerary,
        adminAddDestination,
        adminUpdateDestination,
        adminDeleteDestination,
        adminAddPackage,
        adminUpdatePackage,
        adminDeletePackage,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
