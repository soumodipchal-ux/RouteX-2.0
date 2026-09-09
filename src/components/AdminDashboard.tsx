import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Destination, TourPackage, Booking, BookingStatus, CrowdLevel } from '../types';
import { 
  ShieldCheck, 
  BarChart3, 
  MapPin, 
  Package, 
  CreditCard, 
  QrCode, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Filter, 
  IndianRupee,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    destinations, 
    tourPackages, 
    bookings, 
    updateBookingStatus, 
    verifyBookingToken,
    adminAddDestination,
    adminUpdateDestination,
    adminDeleteDestination,
    adminAddPackage,
    adminDeletePackage
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'overview' | 'destinations' | 'packages' | 'bookings' | 'qr_verifier'>('overview');

  // Booking search and filter
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('All');
  const [bookingSearch, setBookingSearch] = useState<string>('');

  // QR Verifier states
  const [verifierToken, setVerifierToken] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<{ valid: boolean; booking?: Booking; message: string } | null>(null);

  // New Destination Form Modal / Toggle
  const [showAddDest, setShowAddDest] = useState(false);
  const [newDestName, setNewDestName] = useState('');
  const [newDestDistrict, setNewDestDistrict] = useState('Darjeeling');
  const [newDestRegion, setNewDestRegion] = useState('North Bengal');
  const [newDestBudget, setNewDestBudget] = useState(2200);
  const [newDestCrowd, setNewDestCrowd] = useState<CrowdLevel>('Low');
  const [newDestImg, setNewDestImg] = useState('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80');

  // Metrics calculation
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Paid').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + b.totalAmount : sum, 0);
  const totalDestinations = destinations.length;

  const filteredBookings = bookings.filter(b => {
    const matchStatus = bookingFilterStatus === 'All' || b.status === bookingFilterStatus;
    const matchSearch = 
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.destinationName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.bookingToken.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifierToken.trim()) return;
    const result = verifyBookingToken(verifierToken);
    setVerificationResult(result);
  };

  const handleQuickVerifyToken = (token: string) => {
    setVerifierToken(token);
    const result = verifyBookingToken(token);
    setVerificationResult(result);
    setActiveTab('qr_verifier');
  };

  const handleCreateDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestName.trim()) return;

    const id = newDestName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newDest: Destination = {
      id,
      name: newDestName,
      bengaliName: 'নতুন পর্যটন কেন্দ্র',
      category: ['Nature', 'Peaceful Getaways'],
      district: newDestDistrict,
      region: newDestRegion as any,
      shortDescription: `A serene, peaceful getaway in ${newDestDistrict} district offering pristine nature and quiet homestays.`,
      fullDescription: `Discovered for travelers seeking peaceful trails in ${newDestDistrict}. Verified local community hosts.`,
      image: newDestImg,
      gallery: [newDestImg],
      distance: `550 km from Kolkata, connected via ${newDestDistrict}`,
      bestTimeToVisit: 'October - April',
      estimatedBudget: newDestBudget,
      currentCrowdLevel: newDestCrowd,
      recommendedHours: '6:00 AM - 6:30 PM',
      safetyStatus: 'Verified Safe',
      rating: 4.9,
      reviewCount: 1,
      crowdAlternatives: [],
      weather: {
        temp: 22,
        condition: 'Clear & Crisp',
        humidity: 60,
        wind: '8 km/h',
        rainProb: '10%',
        bestVisitingTime: 'October to April',
        forecast: [
          { day: 'Today', temp: '22°C', condition: 'Sunny', rain: '10%' },
          { day: 'Tomorrow', temp: '21°C', condition: 'Clear', rain: '5%' },
          { day: 'Day 3', temp: '23°C', condition: 'Sunny', rain: '0%' }
        ]
      },
      coordinates: { lat: 26.8, lng: 88.5 },
      howToReach: {
        byAir: 'Fly into nearest domestic airport (Bagdogra or Kolkata).',
        byTrain: 'Connected by express train to closest district junction.',
        byRoad: 'Accessible via scenic state highways and shared jeeps.'
      },
      nearbyAttractions: ['Local Viewpoint', 'Forest Monastery', 'River Bend'],
      recommendedHotels: [
        { name: 'Village Community Homestay', type: 'Eco Homestay', rating: 4.8, pricePerNight: 1800, contact: '+91 98300 00000' }
      ],
      localFood: [
        'Traditional Bengali Thali with Organic Hill Vegetables',
        'Handmade Local Momos & Herbal Tea'
      ],
      activities: ['Guided Forest Walk', 'Sunrise Trail', 'Organic Farming'],
      localGuides: [{ name: 'Bikash Roy', languages: ['Bengali', 'Hindi', 'English'], phone: '+91 98300 11111', experience: '5+ years' }],
      reviews: []
    };

    adminAddDestination(newDest);
    setShowAddDest(false);
    setNewDestName('');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-stone-900 text-white p-6 sm:p-8 shadow-md">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-800/80 mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>RouteX Administrative Control Plane</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
            Tourism Authority & Host Dashboard
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Manage destinations, monitor visitor carrying capacities, verify travel passes, and track bookings.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('qr_verifier')}
          className="flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-5 py-3 text-xs font-bold text-white shadow-sm transition shrink-0"
        >
          <QrCode className="h-4 w-4" />
          <span>Launch QR Pass Verifier</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Revenue</span>
          <p className="text-xl font-bold text-stone-900 font-mono mt-1">₹{totalRevenue.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-700 font-medium">Verified Transactions</span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Total Bookings</span>
          <p className="text-xl font-bold text-stone-900 font-display mt-1">{totalBookings}</p>
          <span className="text-[10px] text-stone-500">Issued Passes</span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Active Passes</span>
          <p className="text-xl font-bold text-emerald-800 font-display mt-1">{activeBookings}</p>
          <span className="text-[10px] text-emerald-700 font-medium">Valid for Check-in</span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Cancelled</span>
          <p className="text-xl font-bold text-rose-700 font-display mt-1">{cancelledBookings}</p>
          <span className="text-[10px] text-stone-400">Refunded / Void</span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Destinations</span>
          <p className="text-xl font-bold text-stone-900 font-display mt-1">{totalDestinations}</p>
          <span className="text-[10px] text-stone-500">Active Hidden Gems</span>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-4">
        {[
          { id: 'overview', label: 'Analytics & Overview', icon: BarChart3 },
          { id: 'bookings', label: `Manage Bookings (${bookings.length})`, icon: CreditCard },
          { id: 'destinations', label: `Destinations (${destinations.length})`, icon: MapPin },
          { id: 'packages', label: `Tour Packages (${tourPackages.length})`, icon: Package },
          { id: 'qr_verifier', label: 'QR Pass Verifier', icon: QrCode },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'border-emerald-800 text-emerald-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: QR VERIFIER */}
      {activeTab === 'qr_verifier' && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs max-w-xl mx-auto space-y-6">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 mb-3">
              <QrCode className="h-8 w-8 text-emerald-700" />
            </div>
            <h3 className="text-xl font-bold font-display text-stone-900">
              Digital Travel Pass Verifier
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Verify traveler QR tokens at homestays, forest checkpoints, or boat jetties.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Enter Booking Token or Pass ID
              </label>
              <input
                type="text"
                required
                value={verifierToken}
                onChange={(e) => setVerifierToken(e.target.value)}
                placeholder="e.g. RX-TOKEN-90214-LEPCHA or RX-WB-90214"
                className="w-full py-3 px-4 rounded-xl border border-stone-300 font-mono text-sm outline-none focus:border-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 text-xs shadow-xs transition"
            >
              Verify Pass Authenticity
            </button>
          </form>

          {/* Quick Demo Tokens to click */}
          <div className="border-t border-stone-100 pt-4">
            <span className="text-[11px] font-semibold text-stone-500 block mb-2">
              Quick Test Passes:
            </span>
            <div className="flex flex-wrap gap-2">
              {bookings.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setVerifierToken(b.bookingToken);
                    const res = verifyBookingToken(b.bookingToken);
                    setVerificationResult(res);
                  }}
                  className="rounded-lg bg-stone-100 hover:bg-stone-200 px-2.5 py-1 text-[11px] font-mono text-stone-700 transition"
                >
                  {b.id} ({b.destinationName.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* Verification Result Output */}
          {verificationResult && (
            <div
              className={`rounded-2xl border p-5 text-xs space-y-2 ${
                verificationResult.valid
                  ? 'border-emerald-200 bg-emerald-50/60 text-emerald-950'
                  : 'border-rose-200 bg-rose-50/60 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2">
                {verificationResult.valid ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                )}
                <span className="font-bold text-sm">
                  {verificationResult.valid ? 'VALID PASS VERIFIED' : 'INVALID / CANCELLED PASS'}
                </span>
              </div>

              <p className="text-xs leading-relaxed">{verificationResult.message}</p>

              {verificationResult.booking && (
                <div className="mt-3 pt-3 border-t border-emerald-200/60 space-y-1 font-mono text-[11px]">
                  <div>Pass ID: <span className="font-bold">{verificationResult.booking.id}</span></div>
                  <div>Lead Traveler: <span className="font-bold">{verificationResult.booking.customerName}</span></div>
                  <div>Destination: <span className="font-bold">{verificationResult.booking.destinationName}</span></div>
                  <div>Travel Date: <span className="font-bold">{verificationResult.booking.travelDate}</span></div>
                  <div>Party Size: <span className="font-bold">{verificationResult.booking.travellersCount} pax</span></div>
                  <div>Status: <span className="font-bold text-emerald-800">{verificationResult.booking.status}</span></div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB: MANAGE BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by Booking ID, customer name, destination or token..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500">Status:</span>
              <select
                value={bookingFilterStatus}
                onChange={(e) => setBookingFilterStatus(e.target.value)}
                className="rounded-xl border border-stone-300 p-2 text-xs outline-none bg-white font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Paid">Paid</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-[11px] font-bold uppercase text-stone-500 border-b border-stone-200">
                <tr>
                  <th className="p-4">Pass ID</th>
                  <th className="p-4">Traveler</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Travel Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">QR Check-in</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/60 transition">
                    <td className="p-4 font-mono font-bold text-stone-900">{b.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-stone-900">{b.customerName}</div>
                      <div className="text-[10px] text-stone-400">{b.customerPhone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-stone-800">{b.destinationName}</div>
                      <div className="text-[10px] text-stone-400">{b.travellersCount} pax • {b.travelType}</div>
                    </td>
                    <td className="p-4">{b.travelDate}</td>
                    <td className="p-4 font-mono font-bold text-stone-900">₹{b.totalAmount}</td>
                    <td className="p-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                        className={`rounded-lg px-2 py-1 text-[11px] font-bold border outline-none ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : b.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-stone-50 text-stone-800 border-stone-200'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Paid">Paid</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      {b.qrVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Scanned
                        </span>
                      ) : (
                        <button
                          onClick={() => handleQuickVerifyToken(b.bookingToken)}
                          className="text-[11px] text-stone-500 hover:text-emerald-800 underline"
                        >
                          Verify Token
                        </button>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleQuickVerifyToken(b.bookingToken)}
                        className="rounded-lg border border-stone-200 px-2.5 py-1 text-[11px] font-semibold text-stone-700 hover:bg-stone-100"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: DESTINATIONS MANAGEMENT */}
      {activeTab === 'destinations' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              Registered Hidden Bengal Destinations ({destinations.length})
            </h3>

            <button
              onClick={() => setShowAddDest(!showAddDest)}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-800 text-white px-3.5 py-2 text-xs font-bold hover:bg-emerald-900 transition shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Destination</span>
            </button>
          </div>

          {/* Add Destination Form */}
          {showAddDest && (
            <form onSubmit={handleCreateDestination} className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 space-y-4">
              <h4 className="font-bold text-sm text-stone-900">Add New Hidden Bengal Destination</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Destination Name (e.g. Chatakpur)"
                  value={newDestName}
                  onChange={(e) => setNewDestName(e.target.value)}
                  className="p-2.5 rounded-xl border border-stone-300 text-xs bg-white outline-none"
                />
                <select
                  value={newDestDistrict}
                  onChange={(e) => setNewDestDistrict(e.target.value)}
                  className="p-2.5 rounded-xl border border-stone-300 text-xs bg-white outline-none"
                >
                  <option value="Darjeeling">Darjeeling</option>
                  <option value="Kalimpong">Kalimpong</option>
                  <option value="Alipurduar (Dooars)">Alipurduar (Dooars)</option>
                  <option value="Purulia">Purulia</option>
                  <option value="Bankura">Bankura</option>
                  <option value="Jhargram">Jhargram</option>
                  <option value="South 24 Parganas">South 24 Parganas</option>
                  <option value="East Medinipur">East Medinipur</option>
                </select>
                <select
                  value={newDestRegion}
                  onChange={(e) => setNewDestRegion(e.target.value)}
                  className="p-2.5 rounded-xl border border-stone-300 text-xs bg-white outline-none"
                >
                  <option value="North Bengal">North Bengal</option>
                  <option value="Rarh Bengal">Rarh Bengal</option>
                  <option value="Coastal Bengal">Coastal Bengal</option>
                  <option value="South Bengal">South Bengal</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Estimated Budget (₹/day)"
                  value={newDestBudget}
                  onChange={(e) => setNewDestBudget(Number(e.target.value))}
                  className="p-2.5 rounded-xl border border-stone-300 text-xs bg-white outline-none"
                />
                <select
                  value={newDestCrowd}
                  onChange={(e) => setNewDestCrowd(e.target.value as CrowdLevel)}
                  className="p-2.5 rounded-xl border border-stone-300 text-xs bg-white outline-none"
                >
                  <option value="Low">Low Crowd Level</option>
                  <option value="Moderate">Moderate Crowd Level</option>
                  <option value="High">High Crowd Level</option>
                </select>
                <input
                  type="url"
                  placeholder="Photo URL"
                  value={newDestImg}
                  onChange={(e) => setNewDestImg(e.target.value)}
                  className="p-2.5 rounded-xl border border-stone-300 text-xs bg-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDest(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs"
                >
                  Publish Destination
                </button>
              </div>
            </form>
          )}

          {/* Destinations Table */}
          <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-stone-50 text-[11px] font-bold uppercase text-stone-500 border-b border-stone-200">
                <tr>
                  <th className="p-4">Destination</th>
                  <th className="p-4">District / Region</th>
                  <th className="p-4">Crowd Footfall</th>
                  <th className="p-4">Weather</th>
                  <th className="p-4">Budget / Day</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {destinations.map((d) => (
                  <tr key={d.id} className="hover:bg-stone-50/60 transition">
                    <td className="p-4 flex items-center gap-3">
                      <img src={d.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-stone-900">{d.name}</div>
                        <div className="text-[10px] text-stone-400">{d.bengaliName}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>{d.district}</div>
                      <div className="text-[10px] text-stone-400">{d.region}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={d.currentCrowdLevel}
                        onChange={(e) => adminUpdateDestination(d.id, { currentCrowdLevel: e.target.value as CrowdLevel })}
                        className={`rounded-lg px-2 py-1 text-[11px] font-bold border outline-none ${
                          d.currentCrowdLevel === 'Low'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : d.currentCrowdLevel === 'Moderate'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        <option value="Low">Low Crowd</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High Crowd</option>
                      </select>
                    </td>
                    <td className="p-4">{d.weather.temp}°C • {d.weather.condition}</td>
                    <td className="p-4 font-mono font-bold text-stone-900">₹{d.estimatedBudget}</td>
                    <td className="p-4 font-bold text-amber-900">★ {d.rating} ({d.reviewCount})</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => adminDeleteDestination(d.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100"
                        title="Delete Destination"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: TOUR PACKAGES */}
      {activeTab === 'packages' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tourPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-3">
                    <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      {pkg.category} Tour
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 text-sm font-display">{pkg.title}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{pkg.duration}</p>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">{pkg.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">Starting Fare</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">₹{pkg.startingPrice}</span>
                  </div>
                  <button
                    onClick={() => adminDeletePackage(pkg.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
                    title="Delete Package"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ANALYTICS & OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs">
              <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide mb-4">
                Booking Distribution by Travel Category
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-stone-700 mb-1">
                    <span>Family Tours</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-700 h-full w-[45%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-stone-700 mb-1">
                    <span>Couple & Honeymoon Getaways</span>
                    <span>28%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-stone-700 mb-1">
                    <span>Friends & Trekking Groups</span>
                    <span>18%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full w-[18%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-stone-700 mb-1">
                    <span>Solo Verified Explorers</span>
                    <span>9%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[9%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs">
              <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide mb-4">
                Decongestion Impact Status
              </h4>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                  <span className="font-bold text-emerald-900 block">Darjeeling Overcrowding Prevention</span>
                  <p className="mt-1">
                    142 tourist groups redirected to Takdah, Tinchuley & Lepchajagat this month, reducing Darjeeling Mall traffic by 12%.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                  <span className="font-bold text-emerald-900 block">Coastal Sea Beach Diversion</span>
                  <p className="mt-1">
                    88 families opted for Mousuni Island & Tajpur eco-tents instead of congested Digha main beach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
