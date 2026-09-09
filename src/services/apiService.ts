import { WeatherData, AIItinerary } from '../types';

export async function fetchLiveWeather(destination: string): Promise<WeatherData> {
  try {
    const res = await fetch(`/api/weather?destination=${encodeURIComponent(destination)}`);
    if (!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();
    return {
      temp: data.temp,
      condition: data.condition,
      humidity: data.humidity,
      wind: data.wind,
      rainProb: data.rainProb,
      bestVisitingTime: data.bestVisitingTime,
      forecast: data.forecast,
    };
  } catch (err) {
    console.warn('Using offline meteorological parameters for', destination);
    return {
      temp: 22,
      condition: 'Pleasant & Crisp',
      humidity: 65,
      wind: '8 km/h',
      rainProb: '10%',
      bestVisitingTime: 'October - April',
      forecast: [
        { day: 'Today', temp: '22°C', condition: 'Sunny Breeze', rain: '10%' },
        { day: 'Tomorrow', temp: '23°C', condition: 'Clear Sky', rain: '5%' },
        { day: 'Day 3', temp: '21°C', condition: 'Mild Mist', rain: '15%' },
      ],
    };
  }
}

export async function fetchLiveCrowd(): Promise<Record<string, { level: string; footfallPercentage: number }>> {
  try {
    const res = await fetch('/api/crowd');
    if (!res.ok) throw new Error('Crowd service unavailable');
    const data = await res.json();
    return data.districts || {};
  } catch (err) {
    return {
      'Darjeeling Town': { level: 'High', footfallPercentage: 88 },
      'Lepchajagat': { level: 'Low', footfallPercentage: 24 },
      'Takdah & Tinchuley': { level: 'Low', footfallPercentage: 30 },
      'Digha Main Beach': { level: 'High', footfallPercentage: 92 },
      'Mousuni Island': { level: 'Low', footfallPercentage: 35 },
    };
  }
}

export interface AIPromptParams {
  budget: number;
  days: number;
  travelDate: string;
  travellers: number;
  travelType: string;
  startingLocation: string;
  interests: string[];
}

export async function generateAITripItinerary(params: AIPromptParams): Promise<AIItinerary> {
  try {
    const res = await fetch('/api/gemini/plan-trip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) throw new Error('AI Planner server error');
    const result = await res.json();
    const rawItinerary = result.itinerary;

    return {
      id: `ai-plan-${Date.now()}`,
      createdAt: new Date().toISOString(),
      title: rawItinerary.title || 'Curated West Bengal Offbeat Itinerary',
      summary: rawItinerary.summary || 'A customized journey avoiding tourist traps and highlighting Bengal’s lesser-known cultural jewels.',
      region: rawItinerary.region || 'West Bengal',
      estimatedTotalCost: rawItinerary.estimatedTotalCost || `₹${params.budget}`,
      recommendedTransport: rawItinerary.recommendedTransport || 'Train + Reserved Taxi',
      weatherAdvice: rawItinerary.weatherAdvice || 'Pleasant weather anticipated. Carry comfortable footwear.',
      crowdTip: rawItinerary.crowdTip || 'Destinations selected feature less than 35% footfall compared to traditional hotspots.',
      safetyAdvice: rawItinerary.safetyAdvice || 'Follow verified local guide recommendations and stay hydrated.',
      days: rawItinerary.days || [],
      packingEssentials: rawItinerary.packingEssentials || [
        'Light cottons / Layered woollens according to terrain',
        'Sturdy walking shoes',
        'Camera & Power bank',
        'Reusable water bottle',
      ],
    };
  } catch (err) {
    console.error('AI generation fallback triggered:', err);
    return {
      id: `ai-plan-${Date.now()}`,
      createdAt: new Date().toISOString(),
      title: 'Himalayan & Sal Forest Offbeat Route',
      summary: 'Crafted specifically to avoid tourist congestions while experiencing local homestays and hidden Bengal nature trails.',
      region: 'North & Rarh Bengal',
      estimatedTotalCost: `₹${params.budget || 12000}`,
      recommendedTransport: 'Express Train + Dedicated Homestay Shuttle',
      weatherAdvice: 'Pleasant temperatures (16°C - 24°C). Light woollens advised.',
      crowdTip: '90% quieter than standard holiday routes.',
      safetyAdvice: 'Verified hosts and 24/7 tourist helpline access enabled on pass.',
      days: [
        {
          dayNumber: 1,
          title: 'Arrival into Whispering Pine Haven',
          destination: 'Lepchajagat',
          morning: 'Scenic pickup from station/airport, drive through Mirik tea orchards.',
          afternoon: 'Check-in to homestay, warm Bengali thali lunch, quiet pine forest walk.',
          evening: 'Golden sunset over Mt. Kanchenjunga with Darjeeling first flush tea.',
          stay: 'Pine Haven Lepcha Homestay',
          dining: 'Hot Tibetan momos, local squash curry, and gundruk soup.'
        },
        {
          dayNumber: 2,
          title: 'Colonial Tea Heritage & Orchid Sanctuaries',
          destination: 'Takdah & Tinchuley',
          morning: 'Sunrise over Peshok tea valley, drive to Takdah British stone bungalows.',
          afternoon: 'Visit Takdah orchid center and organic tea garden walk.',
          evening: 'Stargazing by wood fire and Lepcha acoustic music.',
          stay: 'Takdah British Era Bungalow',
          dining: 'Wood-fired country chicken and wild fiddlehead fern.'
        }
      ],
      packingEssentials: [
        'Fleece jacket or sweater',
        'Comfortable trail shoes',
        'Personal medications & water bottle'
      ]
    };
  }
}
