import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { fetchLiveCrowd } from '../services/apiService';
import { 
  Radio, 
  CloudSun, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Navigation, 
  MapPin, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

export const TravelIntelligence: React.FC = () => {
  const { destinations, travelAlerts } = useBooking();
  const [crowdData, setCrowdData] = useState<Record<string, { level: string; footfallPercentage: number }>>({});
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    fetchLiveCrowd().then((data) => {
      setCrowdData(data);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsRefreshing(false);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const roadConditions = [
    {
      corridor: 'Siliguri to Darjeeling (via Rohini Road)',
      status: 'Clear & Smooth',
      type: 'Normal',
      detail: 'Clear visibility, dry asphalt. Average travel duration: 2.5 hours.',
    },
    {
      corridor: 'NH10 Teesta River Corridor (Sevoke to Kalimpong)',
      status: 'Cautious Traffic',
      type: 'Advisory',
      detail: 'Slow movement near 29th Mile due to single-lane road maintenance.',
    },
    {
      corridor: 'Kolkata to Mandarmoni / Tajpur (NH16 & NH116B)',
      status: 'High Speed 4-Lane Clear',
      type: 'Normal',
      detail: 'Toll booths operating fast tag. Ideal travel time: 3.5 hours.',
    },
    {
      corridor: 'Dooars Gorumara Forest Corridor (Lataguri - Chalsa)',
      status: 'Elephant Crossing Caution',
      type: 'Advisory',
      detail: 'Speed limit enforced strictly at 30 km/h between 6 PM to 6 AM.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 mb-2">
            <Radio className="h-3.5 w-3.5 text-emerald-700 animate-pulse" />
            <span>RouteX Real-Time Tourism Sensor Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tracking-tight">
            Live Travel Intelligence
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Real-time telemetry, tourist density monitoring, road advisories, and weather forecasts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-stone-400">Updated: {lastRefreshed}</span>
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition shadow-2xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Feed</span>
          </button>
        </div>
      </div>

      {/* Official Alerts Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold font-display text-stone-900 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span>Active Travel & Climate Advisories ({travelAlerts.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {travelAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl border p-4 text-xs transition ${
                alert.severity === 'high'
                  ? 'border-rose-200 bg-rose-50/50 text-rose-950'
                  : alert.severity === 'medium'
                  ? 'border-amber-200 bg-amber-50/50 text-amber-950'
                  : 'border-emerald-200 bg-emerald-50/50 text-emerald-950'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs uppercase tracking-wide">
                  {alert.region} Region
                </span>
                <span className="text-[10px] opacity-70">{alert.validTill}</span>
              </div>
              <h4 className="font-bold text-sm mb-1">{alert.title}</h4>
              <p className="text-xs opacity-90 leading-relaxed">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Corridor Road Conditions */}
      <div className="rounded-3xl bg-white border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold font-display text-stone-900 flex items-center gap-2">
          <Navigation className="h-4 w-4 text-emerald-800" />
          <span>Major Highway & Forest Corridor Status</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {roadConditions.map((rc, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 p-4 bg-stone-50/50 hover:bg-white transition"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-stone-900 text-xs">{rc.corridor}</h4>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    rc.type === 'Normal'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {rc.status}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">{rc.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Real-Time Footfall Matrix */}
      <div className="rounded-3xl bg-white border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold font-display text-stone-900 flex items-center gap-2">
          <Users className="h-4 w-4 text-emerald-800" />
          <span>Real-Time Visitor Footfall & Microclimates</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="rounded-2xl border border-stone-200 p-4 bg-white hover:border-emerald-700/40 hover:shadow-xs transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs truncate max-w-[160px]">
                  {dest.name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    dest.currentCrowdLevel === 'Low'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : dest.currentCrowdLevel === 'Moderate'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {dest.currentCrowdLevel} Crowd
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <CloudSun className="h-3.5 w-3.5 text-amber-500" />
                  {dest.weather.temp}°C • {dest.weather.condition}
                </span>
                <span className="font-mono text-stone-700">{dest.footfallPercentage}% Capacity</span>
              </div>

              <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    dest.currentCrowdLevel === 'Low'
                      ? 'bg-emerald-500'
                      : dest.currentCrowdLevel === 'Moderate'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${dest.footfallPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
