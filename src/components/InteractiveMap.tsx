import React, { useState, useEffect, useRef, useId, useMemo } from 'react';
import { Destination } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Compass, 
  Layers, 
  Search, 
  Star, 
  ArrowRight, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Navigation,
  CloudSun,
  ShieldCheck,
  Landmark,
  Eye,
  Calendar,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { CrowdIndicator } from './CrowdIndicator';

// Fix Leaflet default icon URLs in bundler environments
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1544735716-392feec82e7f?auto=format&fit=crop&w=600&q=80';

interface InteractiveMapProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onBookNow: (dest: Destination) => void;
}

type MapLayerType = 'voyager' | 'osm' | 'terrain' | 'satellite';

interface RegionPreset {
  id: string;
  name: string;
  label: string;
  center: [number, number];
  zoom: number;
}

const REGION_PRESETS: RegionPreset[] = [
  { id: 'All', name: 'All Bengal', label: 'All Bengal', center: [24.35, 87.85], zoom: 7 },
  { id: 'North Bengal', name: 'North Bengal', label: '🏔️ North Bengal', center: [26.75, 88.50], zoom: 8.5 },
  { id: 'Heritage', name: 'Central Heritage', label: '🏛️ Central & Heritage', center: [24.10, 88.25], zoom: 8.5 },
  { id: 'Rarh Bengal', name: 'Rarh Bengal', label: '🌄 Rarh Bengal', center: [23.25, 86.85], zoom: 8.5 },
  { id: 'Coastal', name: 'Coastal & Delta', label: '🌊 Coastal & Sundarbans', center: [21.85, 88.20], zoom: 8.5 },
  { id: 'South Bengal', name: 'Kolkata Belt', label: '🏙️ Kolkata & Hooghly', center: [22.65, 88.35], zoom: 9.5 },
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  destinations = [],
  onSelectDestination,
  onBookNow,
}) => {
  const uniqueId = useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const containerDomId = `routex-map-${uniqueId}`;

  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePin, setActivePin] = useState<Destination | null>(null);
  const [mapLayer, setMapLayer] = useState<MapLayerType>('voyager');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [mapReady, setMapReady] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());

  // Filter destinations based on user controls
  const filteredDestinations = useMemo(() => {
    return (destinations || []).filter(d => {
      if (!d) return false;

      // Region match
      let matchRegion = true;
      if (selectedRegion === 'North Bengal') {
        matchRegion = d.region === 'North Bengal';
      } else if (selectedRegion === 'Heritage') {
        matchRegion = Array.isArray(d.category) 
          ? (d.category.includes('Historical Places') || d.category.includes('Heritage') || d.district === 'Murshidabad' || d.district === 'Malda' || d.district === 'Nadia' || d.district === 'Hooghly')
          : (d.category === 'Historical Places' || d.category === 'Heritage');
      } else if (selectedRegion === 'Rarh Bengal') {
        matchRegion = d.region === 'Rarh Bengal' || d.district === 'Purulia' || d.district === 'Bankura' || d.district === 'Birbhum' || d.district === 'Paschim Bardhaman';
      } else if (selectedRegion === 'Coastal') {
        matchRegion = d.region === 'Coastal Bengal' || d.district === 'Purba Medinipur' || d.district === 'South 24 Parganas';
      } else if (selectedRegion === 'South Bengal') {
        matchRegion = d.region === 'South Bengal' || d.district === 'Kolkata' || d.district === 'Hooghly' || d.district === 'Howrah';
      }

      // Category match
      const matchCat = selectedCategory === 'All' || (
        selectedCategory === 'Historical Places'
          ? (Array.isArray(d.category) ? (d.category.includes('Historical Places') || d.category.includes('Heritage')) : (d.category === 'Historical Places' || d.category === 'Heritage'))
          : (Array.isArray(d.category) ? d.category.includes(selectedCategory as any) : d.category === selectedCategory)
      );

      // Search query match
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || 
        d.name.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        (d.bengaliName && d.bengaliName.toLowerCase().includes(q)) ||
        d.region.toLowerCase().includes(q);

      return matchRegion && matchCat && matchSearch;
    });
  }, [destinations, selectedRegion, selectedCategory, searchQuery]);

  // Set default active pin when destinations load
  useEffect(() => {
    if (!activePin && filteredDestinations.length > 0) {
      setActivePin(filteredDestinations[0]);
    }
  }, [filteredDestinations, activePin]);

  // Reliable Map Tile configurations
  const getTileConfig = (layer: MapLayerType) => {
    switch (layer) {
      case 'terrain':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri &mdash; Topographic World Map',
          subdomains: ''
        };
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri &mdash; Satellite World Imagery',
          subdomains: ''
        };
      case 'osm':
        return {
          url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: ''
        };
      case 'voyager':
      default:
        // Notice: NO {r} token in CartoDB url template to ensure clean HTTP 200 responses
        return {
          url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd'
        };
    }
  };

  // Helper to safely destroy map instance and clean DOM container _leaflet_id
  const safeDestroyMap = () => {
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.off();
        mapInstanceRef.current.remove();
      } catch (e) {
        console.warn('Map cleanup notice:', e);
      }
      mapInstanceRef.current = null;
    }

    if (mapContainerRef.current) {
      const el = mapContainerRef.current as any;
      if (el._leaflet_id) {
        delete el._leaflet_id;
      }
    }
    setMapReady(false);
  };

  // Initialize Map with explicit error handling for 'map container already initialized'
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // 1. Clean up any pre-existing instance or lingering _leaflet_id on the DOM node
    safeDestroyMap();

    // 2. Initialize map inside a guarded try/catch
    let map: L.Map | null = null;
    try {
      map = L.map(container, {
        center: [24.35, 87.85],
        zoom: 7,
        minZoom: 6,
        maxZoom: 18,
        zoomControl: false,
      });
    } catch (err: any) {
      console.warn('Handling Leaflet initialization caught error:', err);
      // Explicit error handling: if Leaflet detects container is already initialized, clear internal id and retry
      if (err?.message?.includes('already initialized') || (container as any)._leaflet_id) {
        try {
          delete (container as any)._leaflet_id;
          map = L.map(container, {
            center: [24.35, 87.85],
            zoom: 7,
            minZoom: 6,
            maxZoom: 18,
            zoomControl: false,
          });
        } catch (retryErr) {
          console.error('Fatal retry error in map container initialization:', retryErr);
        }
      }
    }

    if (!map) return;

    // 3. Add custom zoom control in bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 4. Attach base tile layer
    const config = getTileConfig(mapLayer);
    const tileOptions: L.TileLayerOptions = {
      attribution: config.attribution,
      maxZoom: 19,
    };
    if (config.subdomains) {
      tileOptions.subdomains = config.subdomains;
    }

    const tiles = L.tileLayer(config.url, tileOptions).addTo(map);
    tileLayerRef.current = tiles;

    // 5. Initialize marker layer group
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;

    mapInstanceRef.current = map;
    setMapReady(true);

    // 6. Invalidate size after layout settles to guarantee tiles render without blank patches
    const t1 = setTimeout(() => {
      map?.invalidateSize();
    }, 150);

    const t2 = setTimeout(() => {
      map?.invalidateSize();
    }, 450);

    // Cleanup on unmount or route change
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      safeDestroyMap();
    };
  }, []); // Run once on mount; handles unmount cleanly on route change

  // Handle Layer change dynamically
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      try {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      } catch {
        // Safe ignore
      }
    }

    const config = getTileConfig(mapLayer);
    const tileOptions: L.TileLayerOptions = {
      attribution: config.attribution,
      maxZoom: 19,
    };
    if (config.subdomains) {
      tileOptions.subdomains = config.subdomains;
    }

    const newTiles = L.tileLayer(config.url, tileOptions).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTiles;
  }, [mapLayer]);

  // Handle destination markers rendering and updating
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !mapReady) return;

    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();
    markerMapRef.current.clear();

    filteredDestinations.forEach((dest) => {
      if (!dest.coordinates || typeof dest.coordinates.lat !== 'number' || typeof dest.coordinates.lng !== 'number') {
        return;
      }

      const isSelected = activePin?.id === dest.id;
      const isHistorical = Array.isArray(dest.category) 
        ? (dest.category.includes('Historical Places') || dest.category.includes('Heritage'))
        : (dest.category === 'Historical Places' || dest.category === 'Heritage');

      const crowdBg = dest.currentCrowdLevel === 'Low'
        ? 'bg-emerald-600 border-emerald-400 text-white'
        : dest.currentCrowdLevel === 'Moderate'
        ? 'bg-amber-600 border-amber-400 text-white'
        : 'bg-rose-600 border-rose-400 text-white';

      const pinIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="relative flex items-center group cursor-pointer" style="transform: translate(-50%, -100%);">
            ${isSelected ? '<div class="absolute -inset-2 rounded-full bg-emerald-500/40 animate-ping"></div>' : ''}
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border font-sans text-xs font-semibold ${crowdBg} ${
              isSelected ? 'ring-3 ring-white scale-110 shadow-xl' : 'hover:scale-105'
            } transition-all duration-150">
              <span class="text-[12px]">${isHistorical ? '🏛️' : '📍'}</span>
              <span class="truncate max-w-[100px] drop-shadow-xs">${dest.name.split('&')[0].trim()}</span>
            </div>
          </div>
        `,
        iconSize: [110, 36],
        iconAnchor: [55, 36],
      });

      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: pinIcon });

      // Safe image with error fallback in popup
      const imgSrc = dest.image || FALLBACK_IMAGE;

      const popupContent = `
        <div class="p-1 min-w-[210px] font-sans">
          <div class="relative h-24 rounded-lg overflow-hidden mb-2 bg-stone-100">
            <img 
              src="${imgSrc}" 
              alt="${dest.name}" 
              class="w-full h-full object-cover" 
              referrerpolicy="no-referrer"
              onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
            />
            <span class="absolute top-1 left-1 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-bold">
              ${dest.district}
            </span>
            <span class="absolute bottom-1 right-1 bg-white/95 backdrop-blur-xs text-stone-900 text-[10px] px-1.5 py-0.5 rounded font-bold shadow-xs">
              ⭐ ${dest.rating || '4.8'}
            </span>
          </div>
          <h4 class="font-bold text-stone-900 text-sm leading-tight">${dest.name}</h4>
          <p class="text-[11px] text-stone-500 italic mb-2">${dest.bengaliName || ''} • ${dest.region}</p>
          <div class="flex items-center justify-between text-[11px] text-stone-600 mb-2 border-t border-stone-100 pt-1.5">
            <span>Crowd: <b class="${dest.currentCrowdLevel === 'Low' ? 'text-emerald-700' : 'text-amber-700'}">${dest.currentCrowdLevel}</b></span>
            <span>🌡️ ${dest.weather?.temp || 24}°C</span>
          </div>
          <div class="grid grid-cols-2 gap-1.5 mt-2">
            <button id="popup-view-${dest.id}" class="w-full text-center py-1.5 px-2 text-[10px] font-bold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition">
              Full Details
            </button>
            <button id="popup-book-${dest.id}" class="w-full text-center py-1.5 px-2 text-[10px] font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition">
              Book Pass
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: 'routex-map-popup',
        maxWidth: 260
      });

      marker.on('click', () => {
        setActivePin(dest);
        map.panTo([dest.coordinates.lat, dest.coordinates.lng], {
          animate: true,
          duration: 0.5
        });
      });

      marker.on('popupopen', () => {
        const viewBtn = document.getElementById(`popup-view-${dest.id}`);
        const bookBtn = document.getElementById(`popup-book-${dest.id}`);
        if (viewBtn) {
          viewBtn.onclick = () => onSelectDestination(dest);
        }
        if (bookBtn) {
          bookBtn.onclick = () => onBookNow(dest);
        }
      });

      markersGroup.addLayer(marker);
      markerMapRef.current.set(dest.id, marker);
    });

    // Make sure activePin is valid within current filter
    if (filteredDestinations.length > 0 && (!activePin || !filteredDestinations.find(d => d.id === activePin.id))) {
      setActivePin(filteredDestinations[0]);
    }
  }, [filteredDestinations, activePin, mapReady]);

  // Handle region preset selection
  const handleSelectRegion = (preset: RegionPreset) => {
    setSelectedRegion(preset.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(preset.center, preset.zoom, {
        duration: 1.1,
        easeLinearity: 0.25
      });
    }
  };

  // Fly to destination when clicked from sidebar list
  const handleFlyToDestination = (dest: Destination) => {
    setActivePin(dest);
    if (mapInstanceRef.current && dest.coordinates) {
      mapInstanceRef.current.flyTo([dest.coordinates.lat, dest.coordinates.lng], 11.5, {
        duration: 0.8
      });

      // Open its marker popup
      const marker = markerMapRef.current.get(dest.id);
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 500);
      }
    }
  };

  // Reset entire view to all West Bengal
  const handleResetView = () => {
    setSelectedRegion('All');
    setSelectedCategory('All');
    setSearchQuery('');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([24.35, 87.85], 7, {
        duration: 1.0
      });
    }
  };

  // Trigger resize when fullscreen toggles or window changes
  useEffect(() => {
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  return (
    <div className={`rounded-3xl bg-white border border-stone-200 shadow-sm overflow-hidden p-4 sm:p-6 transition-all ${
      isFullscreen ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl flex flex-col' : ''
    }`}>
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 mb-1">
            <Compass className="h-3.5 w-3.5 text-emerald-700" />
            <span>Interactive West Bengal Geographic Atlas</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900 tracking-tight flex items-center gap-2">
            <span>Explore West Bengal Tourism Map</span>
            <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              {filteredDestinations.length} Places Active
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Real cartographic map with live GPS coordinates, footfall carrying capacity, and heritage circuit markers.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Layer switcher */}
          <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
            <button
              type="button"
              onClick={() => setMapLayer('voyager')}
              className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
                mapLayer === 'voyager'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Clean CartoDB Voyager Road Atlas"
            >
              <Navigation className="h-3 w-3 text-emerald-700" />
              <span>Street</span>
            </button>
            <button
              type="button"
              onClick={() => setMapLayer('osm')}
              className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
                mapLayer === 'osm'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Standard OpenStreetMap Cartography"
            >
              <Globe className="h-3 w-3 text-emerald-800" />
              <span>OSM</span>
            </button>
            <button
              type="button"
              onClick={() => setMapLayer('terrain')}
              className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
                mapLayer === 'terrain'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Esri Topographic Elevation Contours"
            >
              <Layers className="h-3 w-3 text-amber-700" />
              <span>Terrain</span>
            </button>
            <button
              type="button"
              onClick={() => setMapLayer('satellite')}
              className={`px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
                mapLayer === 'satellite'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Esri World Satellite Photography"
            >
              <Compass className="h-3 w-3 text-blue-700" />
              <span>Satellite</span>
            </button>
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleResetView}
            className="flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
            title="Reset Map to Full Bengal View"
          >
            <RotateCcw className="h-3.5 w-3.5 text-stone-500" />
            <span>Reset</span>
          </button>

          {/* Fullscreen button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen Map'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5 text-stone-500" />
                <span>Exit</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5 text-stone-500" />
                <span>Expand</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Regional Circuit Buttons & Live Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
        {/* Region Quick-Zoom Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {REGION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectRegion(preset)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-medium border transition ${
                selectedRegion === preset.id
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Search & Theme Select */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search places or districts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 placeholder-stone-400 outline-none focus:border-emerald-700"
            />
          </div>

          {/* Theme Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 outline-none focus:border-emerald-700"
          >
            <option value="All">All Themes</option>
            <option value="Historical Places">🏛️ Historical & Heritage</option>
            <option value="Hill Station">🏔️ Hill Stations</option>
            <option value="Tea Tourism">🍵 Tea Estates</option>
            <option value="Beaches & Coast">🌊 Coastal Beaches</option>
            <option value="Heritage & Culture">🎨 Heritage & Art</option>
            <option value="Forest & Mangroves">🌿 Forests & Sundarbans</option>
            <option value="Nature & Lakes">🛶 Nature & Waterways</option>
          </select>
        </div>
      </div>

      {/* Main Map + Side Panel Grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-5 ${isFullscreen ? 'flex-1 min-h-0' : ''}`}>
        {/* Leaflet Real Interactive Map */}
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col relative rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100 isolate">
          <div
            id={containerDomId}
            ref={mapContainerRef}
            className={`w-full relative z-0 ${
              isFullscreen ? 'h-full min-h-[480px]' : 'h-[460px] sm:h-[540px]'
            }`}
          />

          {/* Floating Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-20 rounded-xl bg-white/95 p-3 shadow-md border border-stone-200/80 backdrop-blur-xs text-[11px] space-y-1">
            <span className="font-bold text-stone-800 block text-[10px] uppercase tracking-wider">
              Footfall Status Indicator
            </span>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-200" />
              <span className="text-stone-700 font-medium">Low (Offbeat & Uncrowded)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200" />
              <span className="text-stone-700 font-medium">Moderate Footfall</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-rose-200" />
              <span className="text-stone-700 font-medium">High Volume Hotspot</span>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-stone-100 text-[10px] text-stone-500">
              <span>🏛️ Historical Places & Heritage</span>
            </div>
          </div>
        </div>

        {/* Side Panel: Active Destination Preview & Circuit Quick List */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-4 overflow-y-auto">
          {/* Active Card Preview */}
          {activePin ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-3 bg-stone-100">
                  <img
                    src={activePin.image || FALLBACK_IMAGE}
                    alt={activePin.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                    <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-stone-800 shadow-2xs">
                      {activePin.district}
                    </span>
                    {(Array.isArray(activePin.category) ? activePin.category.includes('Historical Places') : activePin.category === 'Historical Places') && (
                      <span className="rounded-full bg-amber-900/90 text-amber-200 px-2 py-0.5 text-[10px] font-bold shadow-2xs">
                        🏛️ Heritage
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="rounded-full bg-stone-900/80 text-white px-2 py-0.5 text-[10px] font-medium backdrop-blur-xs flex items-center gap-1">
                      <CloudSun className="h-3 w-3 text-amber-300" />
                      {activePin.weather?.temp || 24}°C
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base font-display">
                      {activePin.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-serif italic">
                      {activePin.bengaliName} • {activePin.region}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
                    <span>{activePin.rating || '4.8'}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {activePin.shortDescription}
                </p>

                <div className="mt-3 pt-2.5 border-t border-stone-100">
                  <CrowdIndicator
                    level={activePin.currentCrowdLevel}
                    footfallPercentage={activePin.footfallPercentage}
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                    <span>{activePin.distance || activePin.distanceFromKolkata || 'Bengal Circuit'}</span>
                  </div>
                  <div className="font-bold text-stone-900 font-mono">
                    ₹{activePin.estimatedBudget || 1800}/day
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectDestination(activePin)}
                  className="rounded-xl border border-stone-200 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition text-center flex items-center justify-center gap-1"
                >
                  <Eye className="h-3.5 w-3.5 text-stone-500" />
                  <span>Full Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => onBookNow(activePin)}
                  className="rounded-xl bg-emerald-800 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 transition flex items-center justify-center gap-1"
                >
                  <span>Book Pass</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center text-stone-400">
              <MapPin className="h-8 w-8 mb-2 mx-auto text-emerald-800 opacity-60" />
              <p className="text-xs font-semibold text-stone-600">Select any marker on the map</p>
              <p className="text-[11px] text-stone-400 mt-1">
                Explore microclimate metrics, carrying capacities, and guide availability across Bengal.
              </p>
            </div>
          )}

          {/* Quick List of Nearby / Filtered Destinations */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-3.5 flex flex-col gap-2 max-h-60 overflow-y-auto">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider px-1">
              Select Place on Map ({filteredDestinations.length})
            </span>
            <div className="space-y-1.5">
              {filteredDestinations.map((dest) => {
                const isCurrent = activePin?.id === dest.id;
                const isHist = Array.isArray(dest.category)
                  ? (dest.category.includes('Historical Places') || dest.category.includes('Heritage'))
                  : (dest.category === 'Historical Places' || dest.category === 'Heritage');

                return (
                  <div
                    key={dest.id}
                    onClick={() => handleFlyToDestination(dest)}
                    className={`cursor-pointer flex items-center justify-between p-2 rounded-xl transition text-xs ${
                      isCurrent
                        ? 'bg-emerald-800 text-white shadow-2xs font-semibold'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span>{isHist ? '🏛️' : '📍'}</span>
                      <span className="truncate">{dest.name}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-emerald-900/80 text-emerald-200'
                        : dest.currentCrowdLevel === 'Low'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {dest.district}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
