import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Booking, Destination, AIItinerary } from '../types';
import { 
  User as UserIcon, 
  Calendar, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  Heart, 
  Sparkles, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

interface UserProfileProps {
  onOpenQRPass: (booking: Booking) => void;
  onExploreDestination: (dest: Destination) => void;
  onBookDestination: (dest: Destination) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  onOpenQRPass,
  onExploreDestination,
  onBookDestination,
}) => {
  const { user, savedDestinations, toggleWishlist } = useAuth();
  const { bookings, destinations, aiItineraries, cancelBooking, deleteAIItinerary } = useBooking();

  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist' | 'itineraries'>('bookings');

  if (!user) {
    return (
      <div className="rounded-3xl bg-white border border-stone-200 p-8 text-center max-w-md mx-auto my-12">
        <UserIcon className="h-12 w-12 text-stone-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-stone-900 font-display">Please Sign In</h3>
        <p className="text-xs text-stone-500 mt-1 mb-4">
          Sign in or authenticate with your mobile number to view your bookings and digital QR passes.
        </p>
      </div>
    );
  }

  // Filter bookings for this user
  const userBookings = bookings.filter(
    b => b.userId === user.id || b.customerEmail === user.email || b.customerName === user.name
  );

  const wishlistDestinations = destinations.filter(d => savedDestinations.includes(d.id));

  return (
    <div className="space-y-8">
      {/* Traveler Header Card */}
      <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={user.name}
            className="h-16 w-16 rounded-2xl object-cover border-2 border-emerald-700/20 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-display text-stone-900">{user.name}</h2>
              <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                {user.role === 'admin' ? 'Administrator' : 'Verified Explorer'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3 text-stone-400" /> {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-stone-400" /> {user.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-center border-t sm:border-t-0 sm:border-l border-stone-100 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
          <div>
            <span className="text-xl font-bold text-stone-900 font-display">{userBookings.length}</span>
            <span className="text-[10px] uppercase text-stone-400 block font-semibold">Active Bookings</span>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div>
            <span className="text-xl font-bold text-stone-900 font-display">{wishlistDestinations.length}</span>
            <span className="text-[10px] uppercase text-stone-400 block font-semibold">Saved Places</span>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div>
            <span className="text-xl font-bold text-stone-900 font-display">{aiItineraries.length}</span>
            <span className="text-[10px] uppercase text-stone-400 block font-semibold">AI Routes</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-6">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <QrCode className="h-4 w-4" />
          <span>My Bookings & QR Passes ({userBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Heart className="h-4 w-4" />
          <span>Saved Destinations ({wishlistDestinations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('itineraries')}
          className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'itineraries'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Saved AI Itineraries ({aiItineraries.length})</span>
        </button>
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {userBookings.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-8 text-center">
              <QrCode className="h-10 w-10 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-700">No active travel passes yet</p>
              <p className="text-xs text-stone-500 mt-1">
                Explore our curated West Bengal hidden gems and book with instant digital pass issuance.
              </p>
            </div>
          ) : (
            userBookings.map((b) => (
              <div
                key={b.id}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs hover:border-emerald-700/40 transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 block uppercase">
                      Pass #{b.id} • Issued {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 font-display mt-0.5">
                      {b.destinationName}
                    </h3>
                    <p className="text-xs text-emerald-800 font-medium">{b.packageName}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold border ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : b.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {b.status}
                    </span>
                    {b.qrVerified && (
                      <span className="rounded-full bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-blue-600" /> Host Scanned
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Travel Date</span>
                    <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3.5 w-3.5 text-emerald-700" /> {b.travelDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Party Size</span>
                    <span className="font-semibold text-stone-800 mt-0.5 block">
                      {b.travellersCount} Traveler(s) • {b.travelType}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Lodging</span>
                    <span className="font-semibold text-stone-800 mt-0.5 block truncate">
                      {b.hotelSelected || 'Eco Homestay'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Total Paid</span>
                    <span className="font-bold text-stone-900 mt-0.5 block font-mono">
                      ₹{b.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
                  <div className="text-xs text-stone-500 font-mono">
                    Token: <span className="bg-stone-100 px-2 py-0.5 rounded">{b.bookingToken}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {b.status !== 'Cancelled' && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-medium px-3 py-1.5"
                      >
                        Cancel Booking
                      </button>
                    )}

                    <button
                      onClick={() => onOpenQRPass(b)}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-800 text-white px-4 py-2 text-xs font-bold shadow-xs hover:bg-emerald-900 transition"
                    >
                      <QrCode className="h-3.5 w-3.5" />
                      <span>View & Download QR Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistDestinations.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-8 text-center">
              <Heart className="h-10 w-10 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-700">Your wishlist is currently empty</p>
              <p className="text-xs text-stone-500 mt-1">
                Save offbeat Bengal getaways by clicking the heart icon on any card.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10">
                    <img src={dest.image} alt={dest.name} className="h-full w-full object-cover" />
                    <button
                      onClick={() => toggleWishlist(dest.id)}
                      className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-rose-500 hover:bg-white transition shadow-xs"
                    >
                      <Heart className="h-4 w-4 fill-rose-500" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-base font-display">{dest.name}</h4>
                      <p className="text-xs text-stone-500">{dest.district}, {dest.region}</p>
                      <p className="text-xs text-stone-600 mt-2 line-clamp-2">{dest.shortDescription}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm">₹{dest.estimatedBudget}/day</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onExploreDestination(dest)}
                          className="rounded-xl border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onBookDestination(dest)}
                          className="rounded-xl bg-emerald-800 text-white px-3 py-1.5 text-xs font-bold hover:bg-emerald-900"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED AI ITINERARIES */}
      {activeTab === 'itineraries' && (
        <div className="space-y-4">
          {aiItineraries.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-stone-50 p-8 text-center">
              <Sparkles className="h-10 w-10 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-700">No saved AI itineraries yet</p>
              <p className="text-xs text-stone-500 mt-1">
                Generate tailored routes in the AI Trip Planner and save them here for offline reference.
              </p>
            </div>
          ) : (
            aiItineraries.map((itn) => (
              <div
                key={itn.id}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                      {itn.region} Route
                    </span>
                    <h4 className="text-base font-bold text-stone-900 font-display mt-0.5">
                      {itn.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">{itn.summary}</p>
                  </div>
                  <button
                    onClick={() => deleteAIItinerary(itn.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-stone-50"
                    title="Remove Itinerary"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2 pt-2">
                  {(itn.days || []).map((d) => (
                    <div key={d.dayNumber} className="rounded-xl bg-stone-50 p-3 text-xs">
                      <span className="font-bold text-stone-800">Day {d.dayNumber}: {d.title}</span>
                      <p className="text-stone-600 mt-0.5">{d.morning} — {d.afternoon}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
