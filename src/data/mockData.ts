import { Destination, TourPackage, TravelAlert, Booking } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'lepchajagat',
    name: 'Lepchajagat',
    bengaliName: 'লেপচাজগৎ',
    district: 'Darjeeling',
    region: 'North Bengal',
    category: ['Hills', 'Forest', 'Peaceful Getaways', 'Nature', 'Photography'],
    shortDescription: 'A tranquil forest village enveloped in dense alpine pines and rhododendrons, offering uninterrupted vistas of Mount Kanchenjunga.',
    fullDescription: 'Perched at 6,959 feet on the Sukhiapokhri-Darjeeling ridge, Lepchajagat is a haven for travelers seeking sublime silence. Once an abode of the indigenous Lepcha community, this secluded hamlet remains untouched by commercial bustle. Waking up to the golden hue of sunrise touching Kanchenjunga while sipping freshly brewed Darjeeling tea is an indelible experience.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    ],
    distance: '630 km from Kolkata • 65 km from Siliguri/NJP • 18 km from Darjeeling',
    bestTimeToVisit: 'October to May (Best peak views in Nov-Dec, blossoms in April)',
    estimatedBudget: 2200,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Early morning sunrise (5:00 AM - 8:00 AM) and serene twilight walks',
    safetyStatus: 'Verified Safe',
    rating: 4.9,
    reviewCount: 142,
    crowdAlternatives: [],
    weather: {
      temp: 14,
      condition: 'Misty Pine Groves',
      humidity: 70,
      wind: '6 km/h',
      rainProb: '10%',
      bestVisitingTime: 'October - April',
    },
    coordinates: { lat: 27.0163, lng: 88.2045 },
    howToReach: {
      byAir: 'Bagdogra Airport (IXB) is 68 km away; pre-booked cabs take approximately 3 hours.',
      byTrain: 'New Jalpaiguri (NJP) Railway Station is 66 km away via Mirik-Sukhiapokhri road.',
      byRoad: 'Drive from Siliguri via Rohini or Mirik scenic tea route; well-paved mountain roads.'
    },
    nearbyAttractions: ['Jorpokhri Twin Lakes & Salamander Sanctuary', 'Pashupati Indo-Nepal Border Market', 'Simana Viewpoint', 'Ghoom Monastery'],
    recommendedHotels: [
      { name: 'Pine Haven Lepcha Homestay', type: 'Eco Homestay', pricePerNight: 2400, rating: 4.9, contact: '+91 98320 12890' },
      { name: 'Kanchenjunga Whispers Lodge', type: 'Eco Homestay', pricePerNight: 2800, rating: 4.8, contact: '+91 94340 77123' },
    ],
    localFood: ['Steaming Tibetan Veg/Chicken Momos', 'Gundruk Soup', 'Fresh Dhekia Saag', 'Darjeeling First Flush Tea'],
    activities: ['Sunrise photography over Kanchenjunga', 'Pine forest canopy birdwatching', 'Village nature trail walking', 'Night stargazing by wood fire'],
    localGuides: [
      { name: 'Pemba Lepcha', phone: '+91 98324 55102', languages: ['English', 'Bengali', 'Hindi', 'Nepali'], experience: '9 years forest tracking' },
      { name: 'Dawa Tamang', phone: '+91 97330 44199', languages: ['Bengali', 'Hindi', 'English'], experience: '6 years cultural guide' },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Arindam Mukherjee',
        rating: 5,
        date: 'February 2026',
        travelType: 'Couple',
        text: 'Far better than staying on Darjeeling Mall Road! The silence in the pine woods is healing. We could see the entire Kanchenjunga range right from our homestay window.',
        helpfulCount: 28,
        verifiedBooking: true,
      },
      {
        id: 'r2',
        author: 'Snigdha Sen',
        rating: 5,
        date: 'January 2026',
        travelType: 'Family',
        text: 'Our hosts cooked authentic Bengali lunch and traditional Lepcha squash stew. Very safe, warm blankets and hot water provided.',
        helpfulCount: 19,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'takdah-tinchuley',
    name: 'Takdah & Tinchuley',
    bengaliName: 'তাকদহ ও তিনচুলে',
    district: 'Darjeeling',
    region: 'North Bengal',
    category: ['Hills', 'Tea gardens', 'Heritage', 'Historical Places', 'Villages', 'Photography'],
    shortDescription: 'Colonial stone bungalows, terraced orange orchards, and sprawling misty tea gardens in the Rangli Rangliot valley.',
    fullDescription: 'Takdah was a British cantonment in the early 1900s, dotted with colonial heritage stone cottages and world-class orchid centers. Right above sits Tinchuley ("Three Chullahs"), celebrated for organic farming, hillside orange groves, and panoramic views of Mt. Kanchenjunga and the serpentine Teesta river below.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    distance: '625 km from Kolkata • 68 km from Siliguri/NJP • 26 km from Darjeeling',
    bestTimeToVisit: 'September to June (November for ripe oranges on trees)',
    estimatedBudget: 2400,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning tea walks (7:00 AM - 10:00 AM) and Gumbadara rock sunset',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 118,
    crowdAlternatives: [],
    weather: {
      temp: 17,
      condition: 'Cool Mountain Breeze',
      humidity: 68,
      wind: '7 km/h',
      rainProb: '12%',
      bestVisitingTime: 'All year around',
    },
    coordinates: { lat: 27.0371, lng: 88.3562 },
    howToReach: {
      byAir: 'Bagdogra (IXB) ~72 km, cab via Teesta Bazar or Peshok.',
      byTrain: 'NJP ~70 km via Rangpo or Jorebungalow junction.',
      byRoad: 'Accessible by private taxi through lush Peshok tea estate route.'
    },
    nearbyAttractions: ['Takdah British Club House & Orchid Center', 'Rangli Rangliot Tea Estate', 'Gumbadara View Rock', 'Tinchuley Monastery'],
    recommendedHotels: [
      { name: 'Takdah British Era Heritage Bungalow #12', type: 'Heritage Bungalow', pricePerNight: 3500, rating: 4.9, contact: '+91 98322 71822' },
      { name: 'Abhiraj Orange Grove Homestay', type: 'Eco Homestay', pricePerNight: 2100, rating: 4.7, contact: '+91 97331 82910' },
    ],
    localFood: ['Freshly plucked Orange Blossom Herbal Tea', 'Traditional Thukpa', 'Wood-fired Country Chicken Curry', 'Kinema dip'],
    activities: ['Tea plucking and processing demo', 'Heritage architecture photography', 'Forest trekking to Triveni Teesta riverbed', 'Organic farm tour'],
    localGuides: [
      { name: 'Rabin Gurung', phone: '+91 98329 11044', languages: ['English', 'Bengali', 'Hindi'], experience: '8 years tea guide' }
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Debolina Roy',
        rating: 5,
        date: 'December 2025',
        travelType: 'Friends',
        text: 'The stay at the colonial stone cottage in Takdah was straight out of an old English novel! Sipping hot tea surrounded by pine trees with zero honking cars.',
        helpfulCount: 22,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'garhpanchkot-baranti',
    name: 'Garhpanchkot & Baranti',
    bengaliName: 'গড়পঞ্চকোট ও বড়ন্তি',
    district: 'Purulia',
    region: 'Rarh Bengal',
    category: ['Heritage', 'Historical Places', 'Hills', 'Nature', 'Photography', 'Peaceful Getaways'],
    shortDescription: 'Ancient 500-year-old Pancharatna stone ruins at the foothills of Panchet hill, overlooking serene Muradi lake.',
    fullDescription: 'Located in the heart of Rarh Bengal, Garhpanchkot tells the poignant tale of the Singha Deo dynasty whose royal fort and terracotta temples were sacked in the 18th-century Maratha Borgi raids. Today, verdant sal and palash forests cover the ancient ruins, while nearby Baranti boasts a stunning lake mirroring fiery red sunsets and crimson blooms in spring.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '240 km from Kolkata • 42 km from Asansol • 60 km from Purulia town',
    bestTimeToVisit: 'October to March (February-March for spectacular Palash flowers)',
    estimatedBudget: 1800,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Panchet Dam sunset (4:30 PM - 6:00 PM)',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 96,
    crowdAlternatives: [],
    weather: {
      temp: 27,
      condition: 'Sunny Plateau Breeze',
      humidity: 48,
      wind: '12 km/h',
      rainProb: '5%',
      bestVisitingTime: 'October - February',
    },
    coordinates: { lat: 23.6331, lng: 86.7725 },
    howToReach: {
      byAir: 'Kazi Nazrul Islam Airport (Andal/DGP) ~65 km; Kolkata Airport ~235 km.',
      byTrain: 'Asansol Jn, Kumardubi or Barakar stations (30-45 mins drive).',
      byRoad: 'Smooth drive along NH19 (Grand Trunk Road) up to Dishergarh / Panchet.'
    },
    nearbyAttractions: ['Panchet Dam & Reservoir', 'Muradi Lake', 'Kalyaneshwari Temple', 'Maithon Dam', 'Joychandi Pahar'],
    recommendedHotels: [
      { name: 'Garhpanchkot Eco Tourism Resort', type: 'Resort', pricePerNight: 2800, rating: 4.8, contact: '+91 94341 88200' },
      { name: 'Baranti Lake View Village Retreat', type: 'Eco Homestay', pricePerNight: 1900, rating: 4.7, contact: '+91 98305 44101' },
    ],
    localFood: ['Authentic Posto Bora (Poppy seed cutlet)', 'Desi Mutton Jhol', 'Khasir Mangsho with Gobindobhog rice', 'Jhargram Bel sherbet'],
    activities: ['Heritage temple ruins photography', 'Panchet dam speed boating', 'Palash trail cycling', 'Evening Purulia Chhau folk dance session'],
    localGuides: [
      { name: 'Subal Mahato', phone: '+91 97321 00233', languages: ['Bengali', 'Hindi'], experience: '12 years local historian' }
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Suman Bandyopadhyay',
        rating: 5,
        date: 'March 2026',
        travelType: 'Family',
        text: 'The entire forest was blazing with red Palash flowers! The 500-year-old temple ruins against the backdrop of Panchet hill looked ethereal. Great peaceful getaway from Kolkata.',
        helpfulCount: 31,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'mousuni-island',
    name: 'Mousuni Island',
    bengaliName: 'মৌসুনি দ্বীপ',
    district: 'South 24 Parganas',
    region: 'Coastal & Sundarbans',
    category: ['Beaches', 'Rural tourism', 'Adventure', 'Peaceful Getaways'],
    shortDescription: 'A quiet, unpaved island where the river meets the Bay of Bengal, famous for beachfront hammock camping and mudflat birding.',
    fullDescription: 'Nestled at the mouth of the Bay of Bengal adjoining the Sundarbans biosphere, Mousuni Island offers an escape from commercial beach resorts. Here, you sleep in weather-proof tents listening to waves crashing, walk on sandbanks dotted with red ghost crabs, and experience rural island hospitality alongside local fishermen.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b271?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '135 km from Kolkata • 28 km from Namkhana',
    bestTimeToVisit: 'November to February (Avoid monsoon tropical cyclones)',
    estimatedBudget: 1500,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Sunrise on Baliara Beach and late night beach campfire',
    safetyStatus: 'Verified Safe',
    rating: 4.7,
    reviewCount: 165,
    crowdAlternatives: [],
    weather: {
      temp: 27,
      condition: 'Coastal Sea Breeze',
      humidity: 82,
      wind: '22 km/h',
      rainProb: '25%',
      bestVisitingTime: 'November - February',
    },
    coordinates: { lat: 21.6521, lng: 88.2415 },
    howToReach: {
      byAir: 'Kolkata Netaji Subhas Chandra Bose Airport (CCU) is ~145 km away.',
      byTrain: 'Local suburban EMU train from Sealdah to Namkhana (3 hours), followed by toto & ferry.',
      byRoad: 'Drive south on NH12 (Diamond Harbour Road) to Hatania-Doania bridge at Namkhana.'
    },
    nearbyAttractions: ['Baliara Beach', 'Kakramari Chora Mudflats', 'Chunakhali Mangrove Point', 'Jambu Dwip view'],
    recommendedHotels: [
      { name: 'Mousuni Eco Beach Camp', type: 'Eco Homestay', pricePerNight: 1600, rating: 4.8, contact: '+91 98311 00192' },
      { name: 'Sandpiper Mud & Tent Stay', type: 'Eco Homestay', pricePerNight: 1800, rating: 4.7, contact: '+91 90512 88124' },
    ],
    localFood: ['Fresh Bhetki Machher Paturi', 'Chingri Malaikari', 'Pabda Jhol', 'Coconut water & Khejur Gur'],
    activities: ['Tent camping under stars', 'Beach bonfire & live baul songs', 'Fishermen net casting walk', 'Red crab photography on sand dunes'],
    localGuides: [
      { name: 'Biswajit Mondal', phone: '+91 97354 81920', languages: ['Bengali', 'Hindi'], experience: '5 years island native' }
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Ria Dasgupta',
        rating: 5,
        date: 'January 2026',
        travelType: 'Friends',
        text: 'Zero commercial hotel clutter. We pitched tents right by the sea, ate delicious home-cooked prawns, and spent the night singing around the campfire.',
        helpfulCount: 26,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'chilapata-buxa',
    name: 'Chilapata & Buxa Jayanti',
    bengaliName: 'চিলাপাতা ও বক্সা জয়ন্তী',
    district: 'Alipurduar',
    region: 'North Bengal',
    category: ['Forest', 'Wildlife', 'Adventure', 'Rivers', 'Heritage', 'Historical Places'],
    shortDescription: 'Dense Sal forest elephant corridor, the mysterious 5th-century ruins of Nalraja Garh, and white pebble riverbeds of Jayanti.',
    fullDescription: 'Chilapata Forest forms an essential wildlife corridor connecting Jaldapara National Park with Buxa Tiger Reserve. Rich in wild elephants, one-horned rhinoceroses, leopards, and over 250 species of birds, it also houses the archaeological enigma of Nalraja Garh (Gupta era). Continuing north into Jayanti leads to the dramatic Bhutan hills and limestone caves.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '690 km from Kolkata • 135 km from Siliguri • 35 km from Alipurduar',
    bestTimeToVisit: 'October to April (Forest safaris closed during monsoon Jun 15 - Sep 15)',
    estimatedBudget: 2600,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning wildlife jeep safari (6:00 AM - 9:00 AM)',
    safetyStatus: 'Verified Safe',
    rating: 4.9,
    reviewCount: 130,
    crowdAlternatives: [],
    weather: {
      temp: 24,
      condition: 'Canopy Sunshine',
      humidity: 74,
      wind: '6 km/h',
      rainProb: '10%',
      bestVisitingTime: 'Nov - April',
    },
    coordinates: { lat: 26.5415, lng: 89.3734 },
    howToReach: {
      byAir: 'Bagdogra (IXB) ~145 km or Rupsi Airport (Assam) ~95 km.',
      byTrain: 'Hasimara Railway Station (12 km) or Alipurduar Jn (30 km).',
      byRoad: 'NH27 / NH317 runs right through the Dooars tea-and-forest belt.'
    },
    nearbyAttractions: ['Nalraja Garh 5th Century Ruins', 'Mathura Tea Estate', 'Jayanti Riverbed & Bhutan Hills', 'Buxa Fort Trek', 'Pokhari Sacred Lake'],
    recommendedHotels: [
      { name: 'Chilapata Green Forest Homestay', type: 'Eco Homestay', pricePerNight: 2300, rating: 4.8, contact: '+91 98320 66190' },
      { name: 'Jayanti Riverbed Nature Resort', type: 'Resort', pricePerNight: 2900, rating: 4.9, contact: '+91 94340 11923' },
    ],
    localFood: ['Bora Curry with Kalonji', 'Desi Chicken Jhol with bamboo shoots', 'Boroli Machher Jhol', 'Dooars CTC organic tea'],
    activities: ['Authorized jeep wildlife safari', 'Bird watching walk along Torsa riverbank', 'Buxa Fort mountain hike', 'Rabha tribal dance interaction'],
    localGuides: [
      { name: 'Kartick Rabha', phone: '+91 98321 44109', languages: ['Bengali', 'Hindi', 'English', 'Rabha'], experience: '14 years forest naturalist' }
    ],
    reviews: [
      {
        id: 'r6',
        author: 'Indranil Bose',
        rating: 5,
        date: 'February 2026',
        travelType: 'Solo',
        text: 'Spotted a herd of wild elephants crossing the Torsa tributary at sunrise. The guide Kartick Rabha was deeply knowledgeable about the jungle. Incredible offbeat adventure.',
        helpfulCount: 24,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'bishnupur',
    name: 'Bishnupur Terracotta Town',
    bengaliName: 'বিষ্ণুপুর পোড়ামাটির নগর',
    district: 'Bankura',
    region: 'Rarh Bengal',
    category: ['Heritage', 'Historical Places', 'Cultural', 'Photography', 'Rural tourism'],
    shortDescription: 'The 17th-century capital of Malla kings, world-famous for red terracotta temples, classical music Gharana, and Baluchari silks.',
    fullDescription: 'Bishnupur flourished under the patronage of Malla King Bir Hambir. Because stone was scarce in the alluvial plains, master craftsmen molded the local red clay into breathtaking terracotta tiles depicting stories from the Mahabharata, Ramayana, and Krishna Leela. Explore Rasmancha, Shyamrai, Jorbangla, and hear the stories behind the gigantic Dalmadal Cannon.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '140 km from Kolkata • 45 km from Bankura town',
    bestTimeToVisit: 'October to March (December for Bishnupur Classical Music Festival)',
    estimatedBudget: 1700,
    currentCrowdLevel: 'Moderate',
    recommendedHours: 'Morning 8:00 AM - 11:00 AM & Golden hour 3:30 PM - 5:30 PM',
    safetyStatus: 'Family Friendly',
    rating: 4.8,
    reviewCount: 215,
    crowdAlternatives: [],
    weather: {
      temp: 29,
      condition: 'Clear Blue Skies',
      humidity: 54,
      wind: '11 km/h',
      rainProb: '5%',
      bestVisitingTime: 'October - March',
    },
    coordinates: { lat: 23.0768, lng: 87.3195 },
    howToReach: {
      byAir: 'Kolkata NSCB Airport ~150 km; Andal Airport ~80 km.',
      byTrain: 'Aranyak Express, Rupashi Bangla, or Howrah-Purulia Express from Howrah (3 hrs).',
      byRoad: 'Via NH19 to Durgapur Expressway, turning south via Arambagh or Kotulpur.'
    },
    nearbyAttractions: ['Rasmancha (1600 AD)', 'Shyamrai Temple with Krishna Leela tiles', 'Jor Bangla Temple', 'Dalmadal Cannon', 'Baluchari Silk Weaving Hubs'],
    recommendedHotels: [
      { name: 'Bishnupur Heritage Tourist Lodge', type: 'Heritage Bungalow', pricePerNight: 2200, rating: 4.7, contact: '+91 94340 44211' },
      { name: 'Malla Palace Retreat', type: 'Resort', pricePerNight: 2600, rating: 4.6, contact: '+91 98321 89012' },
    ],
    localFood: ['Bishnupuri Posto Bora', 'Chhanar Jilapi', 'Mecha Sandesh', 'Authentic Radha Tilak aromatic rice with Ghee'],
    activities: ['Terracotta temple architecture tour', 'Live Baluchari silk loom demonstration', 'Terracotta pottery souvenir crafting', 'Heritage evening sound-and-light show'],
    localGuides: [
      { name: 'Tarun Karmakar', phone: '+91 97321 99014', languages: ['Bengali', 'Hindi', 'English'], experience: '15 years certified ASI heritage guide' }
    ],
    reviews: [
      {
        id: 'r7',
        author: 'Ananya Guha',
        rating: 5,
        date: 'January 2026',
        travelType: 'Family',
        text: 'The terracotta work at Shyamrai Temple is magnificent. Our guide Tarun explained the stories behind each tile. Also bought an authentic Baluchari saree straight from the weaver!',
        helpfulCount: 38,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'samsing-suntalekhola',
    name: 'Samsing & Suntalekhola',
    bengaliName: 'সামসিং ও সুনতালেখোলা',
    district: 'Jalpaiguri',
    region: 'North Bengal',
    category: ['Forest', 'Rivers', 'Tea gardens', 'Villages', 'Nature'],
    shortDescription: 'Rocky mountain brooks, cardamom hills, hanging footbridges, and tea estates at the border of Neora Valley National Park.',
    fullDescription: 'Located at 3,000 feet, Samsing is the gateway to pristine Dooars foothills. Here, the crystalline Suntale brook gushes through massive boulders surrounded by orange orchards and moist evergreen canopies. The hanging footbridge over the river and the whispering wind through tea shrubs create a magical retreat.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '645 km from Kolkata • 82 km from Siliguri • 45 km from Malbazar',
    bestTimeToVisit: 'October to May',
    estimatedBudget: 2100,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning hanging bridge stroll (6:30 AM - 9:00 AM)',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 112,
    crowdAlternatives: [],
    weather: {
      temp: 23,
      condition: 'Tropical River Valley',
      humidity: 62,
      wind: '10 km/h',
      rainProb: '15%',
      bestVisitingTime: 'October - March',
    },
    coordinates: { lat: 27.0094, lng: 88.8025 },
    howToReach: {
      byAir: 'Bagdogra (IXB) ~90 km.',
      byTrain: 'New Mal Junction (NMZ) is 40 km, or NJP (85 km).',
      byRoad: 'Via NH31C crossing the famous Coronation Bridge / Gajoldoba barrage.'
    },
    nearbyAttractions: ['Suntalekhola Hanging Bridge', 'Rocky Island Riverbed', 'Farabari Orange Village', 'Neora Valley Trek Point'],
    recommendedHotels: [
      { name: 'Suntalekhola Forest Wilderness Lodge', type: 'Eco Homestay', pricePerNight: 2200, rating: 4.8, contact: '+91 98321 00213' },
      { name: 'River Rock Island Homestay', type: 'Eco Homestay', pricePerNight: 1900, rating: 4.7, contact: '+91 97330 88219' },
    ],
    localFood: ['River Trout Fish Fry', 'Organic Mustard Greens (Rayo Saag)', 'Chilli Dalle Khursani Pickle', 'Darjeeling CTC Tea'],
    activities: ['River boulder hopping', 'Canopy suspension bridge walk', 'Butterfly watching', 'Neora Valley edge day trek'],
    localGuides: [
      { name: 'Sonam Bhutia', phone: '+91 98324 09182', languages: ['English', 'Bengali', 'Hindi'], experience: '7 years nature guide' }
    ],
    reviews: [
      {
        id: 'r8',
        author: 'Rajarshi Sen',
        rating: 5,
        date: 'January 2026',
        travelType: 'Couple',
        text: 'The sound of the river rushing past our cottage at Suntalekhola washed away all city stress. Clean, crisp mountain air and so few tourists!',
        helpfulCount: 20,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'sundarbans-jharkhali',
    name: 'Sundarbans (Jharkhali Eco Gateway)',
    bengaliName: 'সুন্দরবন ঝড়খালি ইকো গেটওয়ে',
    district: 'South 24 Parganas',
    region: 'Coastal & Sundarbans',
    category: ['Wildlife', 'Forest', 'Rivers', 'Adventure', 'Eco Tourism'],
    shortDescription: 'The offbeat, quiet tiger reserve gateway in the world’s largest mangrove delta, featuring mangrove interpretation walks and watchtowers.',
    fullDescription: 'While Godkhali often encounters crowded tourist queues, Jharkhali stands out as the greener, peaceful eco-hub of Sundarbans. Home to the Royal Bengal Tiger Rescue Center, butterfly gardens, and watchtowers overlooking the Matla river, Jharkhali connects you directly with the tidal mystery of the Sundarbans without boat congestion.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '105 km from Kolkata • 35 km from Canning',
    bestTimeToVisit: 'September to March (Migratory birds & basking saltwater crocodiles in winter)',
    estimatedBudget: 2500,
    currentCrowdLevel: 'Moderate',
    recommendedHours: 'Early morning boat cruise (6:00 AM - 11:00 AM)',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 178,
    crowdAlternatives: [],
    weather: {
      temp: 26,
      condition: 'Mangrove Breeze',
      humidity: 78,
      wind: '14 km/h',
      rainProb: '12%',
      bestVisitingTime: 'October - March',
    },
    coordinates: { lat: 22.0232, lng: 88.6948 },
    howToReach: {
      byAir: 'Kolkata Airport ~115 km.',
      byTrain: 'Local train from Sealdah to Canning (1 hr 15 mins), then auto/car to Jharkhali.',
      byRoad: 'Drive via Basanti Highway; well-paved bridge connects right to Jharkhali island.'
    },
    nearbyAttractions: ['Jharkhali Watchtower', 'Tiger Rescue Center', 'Matla River Confluence', 'Bonnie Camp (Deepest delta watchtower)', 'Sajnekhali Bird Sanctuary'],
    recommendedHotels: [
      { name: 'Royal Sundarban Wild Eco Resort', type: 'Resort', pricePerNight: 2900, rating: 4.8, contact: '+91 98319 00812' },
      { name: 'Jharkhali Mangrove Homestay', type: 'Eco Homestay', pricePerNight: 1800, rating: 4.6, contact: '+91 94340 77112' },
    ],
    localFood: ['Sundarban Gold Honey with warm Luchi', 'Fresh Bhetki Machh Jhol', 'Mud Crab Curry', 'Kacha Golla'],
    activities: ['Silent electric boat mangrove safari', 'Watchtower bird and crocodile spotting', 'Village honey collector (Mowali) story session', 'Sundarbans folk theater (Bonbibi Pala)'],
    localGuides: [
      { name: 'Gouranga Mondal', phone: '+91 97351 22910', languages: ['Bengali', 'Hindi'], experience: '16 years mangrove boatman' }
    ],
    reviews: [
      {
        id: 'r9',
        author: 'Pritha Mukherjee',
        rating: 5,
        date: 'January 2026',
        travelType: 'Family',
        text: 'So much calmer than the standard Godkhali route! We spotted two huge saltwater crocodiles basking on mudbanks and thousands of vibrant fiddler crabs.',
        helpfulCount: 33,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'ayodhya-hills',
    name: 'Ayodhya Hills & Bamni Falls',
    bengaliName: 'অযোধ্যা পাহাড় ও বামনী ঝর্ণা',
    district: 'Purulia',
    region: 'Rarh Bengal',
    category: ['Hills', 'Waterfalls', 'Adventure', 'Nature', 'Cultural'],
    shortDescription: 'Granite boulders, ancient Sal forests, cascading waterfalls, and the vibrant tribal rhythms of the Chhau masked dance.',
    fullDescription: 'According to legend, Lord Rama and Sita halted here during exile, where Rama shot an arrow to bring forth water for thirsty Sita at Sita Kund. Rising over 2,000 feet, the Ayodhya range offers breathtaking hill drives, dramatic waterfalls like Bamni and Turga, the scenic Upper and Lower Dam reservoirs, and an introduction to the world-famous Chhau dance tradition in Charida village.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '310 km from Kolkata • 45 km from Purulia town',
    bestTimeToVisit: 'September to March',
    estimatedBudget: 1900,
    currentCrowdLevel: 'Moderate',
    recommendedHours: 'Sunrise at Mayur Pahar and afternoon at Bamni Falls',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 189,
    crowdAlternatives: [],
    weather: {
      temp: 26,
      condition: 'Plateau Breeze',
      humidity: 45,
      wind: '12 km/h',
      rainProb: '5%',
      bestVisitingTime: 'Sept - March',
    },
    coordinates: { lat: 23.2167, lng: 86.1333 },
    howToReach: {
      byAir: 'Kolkata Airport ~320 km; Ranchi Airport ~125 km.',
      byTrain: 'Purulia Jn, Barabhum or Balarampur railway stations (40 mins).',
      byRoad: 'Via NH19 to Durgapur, Bankura and Purulia bypass.'
    },
    nearbyAttractions: ['Bamni & Turga Falls', 'Charida Chhau Mask Village', 'Sita Kund', 'Upper & Lower Dam Hydro Project', 'Pakhi Pahar (Painted bird rocks)'],
    recommendedHotels: [
      { name: 'Kushraj Heritage Forest Camp', type: 'Eco Homestay', pricePerNight: 2100, rating: 4.7, contact: '+91 97321 44510' },
      { name: 'Ayodhya Hilltop Tourism Lodge', type: 'Resort', pricePerNight: 2700, rating: 4.8, contact: '+91 94340 99812' },
    ],
    localFood: ['Desi Chicken Thali', 'Posto Bora', 'Mahuya tea', 'Katha chita pitha'],
    activities: ['Waterfall descent trekking', 'Mask making workshop at Charida', 'Rock climbing on granite tors', 'Evening live Chhau performance'],
    localGuides: [
      { name: 'Balaram Murmu', phone: '+91 97341 00821', languages: ['Bengali', 'Hindi', 'Santhali'], experience: '11 years local adventure guide' }
    ],
    reviews: [
      {
        id: 'r10',
        author: 'Vikramaditya Roy',
        rating: 5,
        date: 'February 2026',
        travelType: 'Friends',
        text: 'The hike down to Bamni Falls through dense sal trees was exhilarating. Do not miss visiting Charida village to see master artists handcrafting massive Chhau masks.',
        helpfulCount: 27,
        verifiedBooking: true,
      }
    ]
  },
  // Hotspots for crowd decongestion demonstration
  {
    id: 'darjeeling-town',
    name: 'Darjeeling Mall & Town Center',
    bengaliName: 'দার্জিলিং শহর ও ম্যাল',
    district: 'Darjeeling',
    region: 'North Bengal',
    category: ['Hills', 'Heritage'],
    shortDescription: 'The colonial Queen of the Hills, currently experiencing heavy footfall and congested traffic.',
    fullDescription: 'The classic Darjeeling Mall and Chowrasta offer world-famous views of Mount Kanchenjunga, British-era bakeries, and heritage toy train rides. However, during weekends and peak holidays, high tourist density, hotel rate spikes, and vehicular congestion can diminish tranquility.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '620 km from Kolkata • 70 km from Siliguri',
    bestTimeToVisit: 'March to May, October to December',
    estimatedBudget: 4200,
    currentCrowdLevel: 'High',
    recommendedHours: 'Early morning 5:30 AM before tourist crowds surge',
    safetyStatus: 'Caution in Monsoon',
    rating: 4.6,
    reviewCount: 540,
    isPopularHotspot: true,
    crowdAlternatives: ['lepchajagat', 'takdah-tinchuley'],
    weather: {
      temp: 15,
      condition: 'Crowded with Mist',
      humidity: 76,
      wind: '8 km/h',
      rainProb: '20%',
      bestVisitingTime: 'March - May, Oct - Dec',
    },
    coordinates: { lat: 27.0410, lng: 88.2663 },
    howToReach: {
      byAir: 'Bagdogra (IXB) ~70 km.',
      byTrain: 'NJP ~75 km.',
      byRoad: 'Via Hill Cart Road or Rohini Highway.'
    },
    nearbyAttractions: ['Chowrasta Mall', 'Tiger Hill', 'Ghoom Monastery', 'Batasia Loop'],
    recommendedHotels: [
      { name: 'Windamere Colonial Heritage Hotel', type: 'Heritage Bungalow', pricePerNight: 8500, rating: 4.7, contact: '+91 354 2254041' },
      { name: 'Cedar Inn', type: 'Resort', pricePerNight: 5500, rating: 4.5, contact: '+91 354 2254446' },
    ],
    localFood: ['Keventers Full English Breakfast', 'Glenary’s Pastries and Darjeeling Tea', 'Steaming Momos'],
    activities: ['Heritage toy train ride', 'Tea tasting at Happy Valley', 'Shopping on Mall Road'],
    localGuides: [
      { name: 'Bikram Thapa', phone: '+91 98320 00111', languages: ['English', 'Bengali', 'Hindi'], experience: '10 years guide' }
    ],
    reviews: []
  },
  {
    id: 'digha-beach',
    name: 'Digha Main Sea Beach',
    bengaliName: 'দিঘা সি বিচ',
    district: 'Purba Medinipur',
    region: 'South Bengal',
    category: ['Beaches'],
    shortDescription: 'West Bengal’s most crowded beach destination, facing heavy weekend congestion and packed promenades.',
    fullDescription: 'Digha is West Bengal’s oldest and most popular beach resort. While it features expansive concrete promenades and fresh seafood stalls, holiday weekends draw massive crowds, noisy markets, and crowded bathing ghats.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '185 km from Kolkata',
    bestTimeToVisit: 'October to February',
    estimatedBudget: 2800,
    currentCrowdLevel: 'High',
    recommendedHours: 'Late night after 10 PM or before 6 AM',
    safetyStatus: 'Verified Safe',
    rating: 4.2,
    reviewCount: 620,
    isPopularHotspot: true,
    crowdAlternatives: ['mousuni-island'],
    weather: {
      temp: 29,
      condition: 'Humid Sea Breeze',
      humidity: 80,
      wind: '20 km/h',
      rainProb: '15%',
      bestVisitingTime: 'October - February',
    },
    coordinates: { lat: 21.6266, lng: 87.5074 },
    howToReach: {
      byAir: 'Kolkata Airport is 195 km away.',
      byTrain: 'Tamralipta Express or Kandari Express from Howrah (3 hrs).',
      byRoad: 'Direct bus via NH16 and NH116B.'
    },
    nearbyAttractions: ['Old Digha Promenade', 'New Digha Beach', 'Marine Aquarium', 'Amravati Park'],
    recommendedHotels: [
      { name: 'Sea Hawk Digha', type: 'Resort', pricePerNight: 3200, rating: 4.1, contact: '+91 3220 266235' }
    ],
    localFood: ['Fried Pomfret and Crabs on Beach', 'Luchi with Alur Dom'],
    activities: ['Sea bathing', 'Beach market shopping', 'Speed boating'],
    localGuides: [],
    reviews: []
  },
  {
    id: 'shantiniketan-bolpur',
    name: 'Shantiniketan & Sonajhuri Forest',
    bengaliName: 'শান্তিনিকেতন ও সোনাঝুরি',
    district: 'Birbhum',
    region: 'South Bengal',
    category: ['Cultural', 'Heritage', 'Historical Places', 'Forest', 'Rural tourism', 'Peaceful Getaways'],
    shortDescription: 'The abode of Rabindranath Tagore, red soil village paths, soulful Baul songs under Sonajhuri trees, and artisanal Kantha crafts.',
    fullDescription: 'Founded by Nobel laureate Rabindranath Tagore as an open-air university under mango groves, Shantiniketan embodies harmonious living with nature and arts. The Saturday Sonajhuri Haat (open-air tribal craft market), Upasana Griha (glass prayer hall), and Visva-Bharati campus provide a uniquely uplifting cultural retreat.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '160 km from Kolkata • 2.5 hours by Vande Bharat / Shantiniketan Express',
    bestTimeToVisit: 'October to March (Poush Mela in Dec, Basanta Utsav in March)',
    estimatedBudget: 2000,
    currentCrowdLevel: 'Moderate',
    recommendedHours: 'Saturday afternoon for Sonajhuri Haat and morning campus walk',
    safetyStatus: 'Family Friendly',
    rating: 4.9,
    reviewCount: 280,
    weather: {
      temp: 26,
      condition: 'Pleasant Autumn Sun',
      humidity: 55,
      wind: '8 km/h',
      rainProb: '5%',
      bestVisitingTime: 'October - March',
    },
    coordinates: { lat: 23.6800, lng: 87.6800 },
    howToReach: {
      byAir: 'Kolkata NSCB Airport ~165 km; Kazi Nazrul Islam Airport (Andal) ~65 km.',
      byTrain: 'Direct express trains from Howrah/Sealdah to Bolpur Shantiniketan (BHP) station.',
      byRoad: 'Drive via NH19 to Panagarh, then state highway through Ilambazar forest.'
    },
    nearbyAttractions: ['Sonajhuri Forest & Saturday Haat', 'Uttarayan Tagore Complex', 'Upasana Griha (Prayer Hall)', 'Kopai Riverbed', 'Amar Kutir Handlooms'],
    recommendedHotels: [
      { name: 'Sonajhuri Baul Niwas Eco Homestay', type: 'Eco Homestay', pricePerNight: 2200, rating: 4.8, contact: '+91 94340 55102' },
      { name: 'Heritage Rangamati Resort', type: 'Resort', pricePerNight: 2800, rating: 4.7, contact: '+91 98321 44901' },
    ],
    localFood: ['Kopai River Fish Curry', 'Posto Bora', 'Chanar Payesh', 'Authentic Bengali Thali on Clay Plates'],
    activities: ['Saturday tribal craft market shopping', 'Listening to live Baul singers under trees', 'Cycling through red soil (Lal Mati) village paths', 'Kantha stitch embroidery workshop'],
    localGuides: [
      { name: 'Debabrata Das', phone: '+91 97321 66100', languages: ['Bengali', 'English', 'Hindi'], experience: '12 years Tagore scholar' }
    ],
    reviews: [
      {
        id: 'r11',
        author: 'Dipankar Chatterjee',
        rating: 5,
        date: 'February 2026',
        travelType: 'Family',
        text: 'The evening at Sonajhuri Haat with Baul singers playing ektara while sun set behind the eucalyptus trees was magical.',
        helpfulCount: 29,
        verifiedBooking: true,
      }
    ]
  },
  {
    id: 'murshidabad-hazarduari',
    name: 'Murshidabad Nawabi Heritage',
    bengaliName: 'মুর্শিদাবাদ নবাবী ঐতিহ্য',
    district: 'Murshidabad',
    region: 'South Bengal',
    category: ['Heritage', 'Historical Places', 'Cultural', 'Rivers', 'Photography'],
    shortDescription: 'The grandeur of Bengal Nawabs along the Bhagirathi river, featuring the 1000-door Hazarduari Palace and Katra Mosque.',
    fullDescription: 'Once the opulent capital of Bengal, Bihar, and Orissa under Nawabs Murshid Quli Khan and Siraj-ud-Daulah, Murshidabad is steeped in dramatic colonial and Mughal history. Explore the imposing Hazarduari Palace, the massive Katra Mosque, Nizamat Imambara, and sample authentic Nawabi cuisine.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '210 km from Kolkata • 3.5 hours by Hazarduari Express from Sealdah',
    bestTimeToVisit: 'October to March',
    estimatedBudget: 1900,
    currentCrowdLevel: 'Moderate',
    recommendedHours: 'Morning 9:00 AM - 1:00 PM for Hazarduari Museum',
    safetyStatus: 'Family Friendly',
    rating: 4.8,
    reviewCount: 230,
    weather: {
      temp: 27,
      condition: 'Clear River Breeze',
      humidity: 58,
      wind: '9 km/h',
      rainProb: '5%',
      bestVisitingTime: 'October - March',
    },
    coordinates: { lat: 24.1874, lng: 88.2697 },
    howToReach: {
      byAir: 'Kolkata Airport ~200 km.',
      byTrain: 'Hazarduari Express or Bhagirathi Express from Sealdah to Murshidabad railway station.',
      byRoad: 'Via NH12 (former NH34) direct northward route.'
    },
    nearbyAttractions: ['Hazarduari Palace Museum', 'Katra Mosque & Jahan Kosha Cannon', 'Nizamat Imambara', 'Kathgola Gardens', 'Nashipur Rajbari'],
    recommendedHotels: [
      { name: 'Nawabi Riverfront Heritage Stay', type: 'Heritage Bungalow', pricePerNight: 2400, rating: 4.7, contact: '+91 94340 33811' },
    ],
    localFood: ['Murshidabadi Biryani with saffron aroma', 'Chanabora sweet', 'Mawa kulfi', 'Begum Pasand Mango'],
    activities: ['Palace museum antiquities tour', 'Tanga horse carriage ride around royal ruins', 'Sunset cruise on Bhagirathi river'],
    localGuides: [
      { name: 'Mirza Sayeed', phone: '+91 98320 77123', languages: ['Bengali', 'Hindi', 'Urdu', 'English'], experience: '15 years ASI guide' }
    ],
    reviews: []
  },
  {
    id: 'chota-mangwa',
    name: 'Chota Mangwa Eco Village',
    bengaliName: 'ছোট মাঙ্গয়া ইকো ভিলেজ',
    district: 'Darjeeling',
    region: 'North Bengal',
    category: ['Hills', 'Villages', 'Peaceful Getaways', 'Nature'],
    shortDescription: 'An idyllic ridge hamlet surrounded by orange orchards, lemon gardens, and 360-degree vistas of the Teesta and Rangeet confluences.',
    fullDescription: 'Chota Mangwa is one of the most serene eco-tourism hamlets in the Darjeeling hills. High above the river Teesta, homestays here are run by local Nepali farming families who practice organic agriculture, tend blossom-filled terraced gardens, and serve fresh honey and oranges right off the branch.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '625 km from Kolkata • 64 km from Siliguri/NJP',
    bestTimeToVisit: 'October to May (Orange harvesting from Nov to Jan)',
    estimatedBudget: 2100,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Sunrise 5:30 AM over Teesta gorge and valley ridge walks',
    safetyStatus: 'Verified Safe',
    rating: 4.9,
    reviewCount: 94,
    weather: {
      temp: 16,
      condition: 'Sunny Mountain Breeze',
      humidity: 65,
      wind: '8 km/h',
      rainProb: '10%',
      bestVisitingTime: 'October - April',
    },
    coordinates: { lat: 27.0500, lng: 88.4000 },
    howToReach: {
      byAir: 'Bagdogra (IXB) ~70 km.',
      byTrain: 'NJP ~65 km via Teesta Bazar.',
      byRoad: 'Drive from NJP through Sevoke, Coronation bridge, and Teesta Bazar.'
    },
    nearbyAttractions: ['Bara Mangwa Orange Valley', 'Triveni Teesta-Rangeet Confluence', 'Takdah Orchid Center', 'Lovers Meet Viewpoint'],
    recommendedHotels: [
      { name: 'Chota Mangwa Organic Orange Farm Homestay', type: 'Eco Homestay', pricePerNight: 2200, rating: 4.9, contact: '+91 98320 88201' }
    ],
    localFood: ['Fresh Orange Juice', 'Organic Rai Saag with local ghee', 'Steaming Kothey Momos', 'Darjeeling CTC Tea'],
    activities: ['Orange orchard picking walk', 'River valley viewpoint photography', 'Birdwatching along pine trails', 'Organic farm cooking with hosts'],
    localGuides: [
      { name: 'Kiran Pradhan', phone: '+91 98324 11990', languages: ['English', 'Nepali', 'Bengali', 'Hindi'], experience: '8 years local farmer & guide' }
    ],
    reviews: []
  },
  {
    id: 'gour-pandua-malda',
    name: 'Gour & Pandua Medieval Ruins',
    bengaliName: 'গৌড় ও পাণ্ডুয়া ঐতিহাসিক ধ্বংসাবশেষ',
    district: 'Malda',
    region: 'South Bengal',
    category: ['Heritage', 'Historical Places', 'Cultural', 'Photography'],
    shortDescription: 'The imperial medieval capitals of the Bengal Sultanate & Sena dynasty, renowned for Baro Sona Masjid, Dakhil Darwaza, and Adina Mosque.',
    fullDescription: 'Spread along the historic riverbanks of the Bhagirathi, Gour and Pandua served as the grand seat of power for Bengal kings from the 7th to the 16th centuries. Here stand the majestic Baro Sona Masjid (Great Golden Mosque, 1526 AD), the colossal Dakhil Darwaza ramparts with arched battlements, the 84-foot Firoz Minar minaret, and nearby Pandua’s monumental Adina Mosque (1373 AD)—once the largest mosque in the entire Indian subcontinent modeled on the Great Mosque of Damascus.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '340 km from Kolkata • 15 km from Malda Town Railway Station',
    bestTimeToVisit: 'November to March (Pleasant winter sun ideal for heritage monument tours)',
    estimatedBudget: 1800,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning 8:30 AM - 12:30 PM & Late afternoon 3:00 PM - 5:30 PM',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 168,
    weather: {
      temp: 24,
      condition: 'Mild Heritage Breeze',
      humidity: 55,
      wind: '8 km/h',
      rainProb: '0%',
      bestVisitingTime: 'November - March'
    },
    coordinates: { lat: 24.8690, lng: 88.1360 },
    howToReach: {
      byAir: 'Bagdogra (IXB) ~220 km or Kolkata NSCB Airport ~330 km.',
      byTrain: 'Gour Express, Shatabdi, or Vande Bharat to Malda Town Station (4.5 hours from Howrah/Sealdah).',
      byRoad: 'Drive via NH12 (former NH34) directly north to Malda Town.'
    },
    nearbyAttractions: ['Baro Sona Masjid (Bara Sona 1526)', 'Dakhil Darwaza (Salute Gate)', 'Firoz Minar (Tower of Victory)', 'Adina Mosque & Adina Deer Park', 'Chika Mosque & Chamkati Mosque', 'Kadam Rasul Shrine', 'Eklakhi Mausoleum'],
    recommendedHotels: [
      { name: 'Malda Heritage Tourist Lodge (WBTDCL)', type: 'Heritage Bungalow', pricePerNight: 2000, rating: 4.6, contact: '+91 94340 55189' },
      { name: 'Hotel Golden Park Malda', type: 'Resort', pricePerNight: 2600, rating: 4.7, contact: '+91 98320 44102' }
    ],
    localFood: ['Malda Fazli & Himsagar Mango delicacies', 'Aamsotto (Sun-dried sweet mango sheets)', 'Rasakadamba sweet', 'Kansat Chamcham'],
    activities: ['Archaeological Survey of India monument trail', 'Medieval terracotta brickwork photography', 'Adina Deer Park nature walk', 'Traditional Malda silk loom visit'],
    localGuides: [
      { name: 'Tapas Sen', phone: '+91 94341 88902', languages: ['Bengali', 'Hindi', 'English'], experience: '12 years ASI licensed heritage guide' }
    ],
    reviews: [
      {
        id: 'r-gour-1',
        author: 'Subhamoy Ghosh',
        rating: 5,
        date: 'January 2026',
        travelType: 'Family',
        text: 'The sheer scale of Adina Mosque and Baro Sona Masjid blew our minds! Few people realize Bengal had architectural wonders as grand as anything in Delhi or Agra.',
        helpfulCount: 34,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'cooch-behar-rajbari',
    name: 'Cooch Behar Royal Palace',
    bengaliName: 'কোচবিহার রাজবাড়ি ও মদনমোহন মন্দির',
    district: 'Cooch Behar',
    region: 'North Bengal',
    category: ['Heritage', 'Historical Places', 'Cultural', 'Photography'],
    shortDescription: 'The magnificent Italian Renaissance Victor Jubilee Palace of the Koch Dynasty, famed for Corinthian columns and royal museum.',
    fullDescription: 'Built in 1887 under Maharaja Nripendra Narayan, the Victor Jubilee Palace of Cooch Behar is an architectural masterpiece modeled on Buckingham Palace. Spanning 51,000 sq ft of brick and marble grandeur, it boasts Italian Corinthian columns, sweeping arched verandas, a breathtaking Durbar Hall crowned by a 124-foot dome, and an ASI museum showcasing royal weaponry, portraits of Maharani Gayatri Devi, and 19th-century royal heirlooms.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '680 km from Kolkata • 150 km from Siliguri • 3 km from New Cooch Behar Railway Station',
    bestTimeToVisit: 'October to April (November for the historic Rash Mela)',
    estimatedBudget: 2100,
    currentCrowdLevel: 'Moderate',
    recommendedHours: 'Morning 9:30 AM - 1:00 PM for museum; Sunset at Sagardighi',
    safetyStatus: 'Family Friendly',
    rating: 4.9,
    reviewCount: 220,
    weather: {
      temp: 23,
      condition: 'Sunny Royal Palace Gardens',
      humidity: 60,
      wind: '7 km/h',
      rainProb: '5%',
      bestVisitingTime: 'October - April'
    },
    coordinates: { lat: 26.3262, lng: 89.4444 },
    howToReach: {
      byAir: 'Bagdogra (IXB) ~155 km or Rupsi Airport (Assam) ~70 km.',
      byTrain: 'Vande Bharat, Teesta Torsa, or Saraighat Express to New Cooch Behar (NCB).',
      byRoad: 'Well connected via NH27 four-lane highway from Siliguri and Jalpaiguri.'
    },
    nearbyAttractions: ['Victor Jubilee Royal Palace & Museum', 'Historic Madan Mohan Temple (1889)', 'Sagardighi Heritage Lake & Illuminations', 'Baneswar Shiva Temple (sacred Mohan black turtles)', 'Rasikbil Bird Sanctuary & Deer Park'],
    recommendedHotels: [
      { name: 'Royal Palace Heritage Inn', type: 'Heritage Bungalow', pricePerNight: 2400, rating: 4.8, contact: '+91 94340 12891' },
      { name: 'Hotel Cooch Behar Heritage', type: 'Resort', pricePerNight: 2800, rating: 4.7, contact: '+91 98322 33451' }
    ],
    localFood: ['Bhapa Ilish & Boroli Machher Jhol', 'Chhechki vegetables', 'Rajbongshi traditional smoked meat', 'Cooch Behar Chomchom'],
    activities: ['Royal palace durbar hall & museum tour', 'Evening illuminated lakeside walk around Sagardighi', 'Madan Mohan Temple sandhya aarti', 'Baneswar holy pond turtle viewing'],
    localGuides: [
      { name: 'Prasenjit Barman', phone: '+91 98321 44521', languages: ['Bengali', 'Hindi', 'English', 'Rajbongshi'], experience: '11 years Cooch Behar royal historian' }
    ],
    reviews: []
  },
  {
    id: 'ambika-kalna-temples',
    name: 'Ambika Kalna 108 Shiva Temples',
    bengaliName: 'অম্বিকা কালনা ১০৮ শিবমন্দির কমপ্লেক্স',
    district: 'Purba Bardhaman',
    region: 'South Bengal',
    category: ['Heritage', 'Historical Places', 'Cultural', 'Photography', 'Peaceful Getaways'],
    shortDescription: 'The City of Temples boasting the concentric 108 Shiva Temples (Nava Kailash) and peerless terracotta temples of Bardhaman Rajas.',
    fullDescription: 'Ambika Kalna, situated along the holy Bhagirathi river, is West Bengal’s quintessential terracotta jewel. Commissioned by Maharaja Tej Chandra Bahadur in 1809, the Nava Kailash consists of 108 aat-chala Shiva temples arranged in two concentric circles (74 white marble Shivlings and 34 black stone Shivlings symbolizing cosmic harmony). Just across the road, the Rajbari complex houses the ornate Pratapeswar Temple, the 25-pinnacled Krishna Chandra Temple, and Lalji Temple with intricate terracotta reliefs of royal processions.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '82 km from Kolkata • 1.5 hours by train from Howrah on Bandel-Katwa line',
    bestTimeToVisit: 'October to March (Pleasant weather for walking among temple complexes)',
    estimatedBudget: 1400,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning 7:30 AM - 11:30 AM and Golden hour 3:30 PM - 5:30 PM',
    safetyStatus: 'Family Friendly',
    rating: 4.8,
    reviewCount: 154,
    weather: {
      temp: 26,
      condition: 'Clear River Sun',
      humidity: 58,
      wind: '9 km/h',
      rainProb: '0%',
      bestVisitingTime: 'October - March'
    },
    coordinates: { lat: 23.2185, lng: 88.3695 },
    howToReach: {
      byAir: 'Kolkata Airport ~80 km.',
      byTrain: 'Local EMU and express trains run every 30 minutes from Howrah & Sealdah (Katwa/Azimganj line).',
      byRoad: 'Via Grand Trunk Road (SH6) through Bandel and Mogra.'
    },
    nearbyAttractions: ['108 Nava Kailash Shiva Temples (Concentric Rings)', 'Pratapeswar Terracotta Temple (1849)', 'Krishna Chandra 25-ratna Temple', 'Lalji Temple (1739)', 'Giri Govardhan Temple', 'Siddheswari Kali Temple (founded 688 AD)'],
    recommendedHotels: [
      { name: 'Kalna Heritage Tourist Lodge', type: 'Heritage Bungalow', pricePerNight: 1600, rating: 4.6, contact: '+91 94340 77199' }
    ],
    localFood: ['Kalna Makha Sandesh', 'Authentic Radha Tilak steamed rice & Bhaja', 'Mishti Doi', 'Chanar Jilapi'],
    activities: ['Temple geometry and terracotta relief photography', 'Walk along the two concentric circles of 108 Shiva shrines', 'Bhagirathi riverbank country boat ferry ride', 'Tangail saree weaving workshop visit in Dhatrigram'],
    localGuides: [
      { name: 'Balaram Dey', phone: '+91 98322 66012', languages: ['Bengali', 'Hindi', 'English'], experience: '14 years temple architecture specialist' }
    ],
    reviews: []
  },
  {
    id: 'bandel-hooghly-imambara',
    name: 'Bandel Basilica & Hooghly Imambara',
    bengaliName: 'ব্যান্ডেল ব্যাসিলিকা ও হুগলী ইমামবাড়া',
    district: 'Hooghly',
    region: 'South Bengal',
    category: ['Heritage', 'Historical Places', 'Rivers', 'Cultural'],
    shortDescription: 'The 1599 Portuguese Bandel Church with miraculous ship mast, paired with the grand riverside Hooghly Imambara and its 85-ft clock tower.',
    fullDescription: 'A historic riverbank odyssey along the Hooghly. The Basilica of the Holy Rosary at Bandel was founded by Portuguese Augustinian friars in 1599, surviving sacking by Mughal Emperor Shah Jahan. Right downstream in Hooghly town stands the majestic Hooghly Imambara, built by humanitarian philanthropist Haji Muhammad Mohsin between 1841 and 1861. Climb the twin 85-foot minarets for panoramic views of the river Ganga and the legendary Jubilee Bridge, and marvel at the massive brass clock mechanism crafted by London clockmaker Black & Hurr.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '45 km from Kolkata • 50 minutes by local train from Howrah',
    bestTimeToVisit: 'All year round (October to March most pleasant; Christmas at Bandel)',
    estimatedBudget: 1200,
    currentCrowdLevel: 'Moderate',
    recommendedHours: 'Morning 9:00 AM - 12:00 PM for Imambara tower climb',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 290,
    weather: {
      temp: 27,
      condition: 'Pleasant River Breeze',
      humidity: 62,
      wind: '10 km/h',
      rainProb: '5%',
      bestVisitingTime: 'All year round'
    },
    coordinates: { lat: 22.9189, lng: 88.3970 },
    howToReach: {
      byAir: 'Kolkata Airport ~40 km via Delhi Road/Bally Bridge.',
      byTrain: 'Frequent Howrah-Bandel local EMU trains (approx. 50 mins from Howrah).',
      byRoad: 'Grand Trunk Road or Durgapur Expressway (NH19).'
    },
    nearbyAttractions: ['Basilica of the Holy Rosary & Miraculous Ship Mast', 'Hooghly Imambara Twin Minarets & Victorian Clock Tower', 'Haji Muhammad Mohsin Mausoleum', 'Jubilee Rail Bridge vantage point', 'Hanseswari Temple (Bansberia)'],
    recommendedHotels: [
      { name: 'Riverfront Hooghly Heritage Stay', type: 'Heritage Bungalow', pricePerNight: 1800, rating: 4.6, contact: '+91 98320 11988' }
    ],
    localFood: ['Bandel Cheese (Smoked Portuguese artisanal cheese)', 'Kacha Golla sweet', 'River fresh Rui/Katla fish curry', 'Hooghly Dalpuri'],
    activities: ['Climbing the 85-foot Imambara twin towers', 'Viewing the giant Victorian astronomical pendulum clock', 'Exploring the 1599 Portuguese church and Grotto of Our Lady', 'Hooghly river ferry boat crossing'],
    localGuides: [
      { name: 'Farooq Ahmed', phone: '+91 98321 00923', languages: ['Bengali', 'Hindi', 'Urdu', 'English'], experience: '16 years Hooghly heritage guide' }
    ],
    reviews: []
  },
  {
    id: 'chandannagar-french-heritage',
    name: 'Chandannagar French Heritage',
    bengaliName: 'চন্দননগর ফরাসি ঐতিহ্য নগরী',
    district: 'Hooghly',
    region: 'South Bengal',
    category: ['Heritage', 'Historical Places', 'Rivers', 'Cultural', 'Peaceful Getaways'],
    shortDescription: 'The historic French colonial crown jewel on the Hooghly river with tree-shaded Strand promenade, Dupleix Museum, and Sacred Heart Church.',
    fullDescription: 'Under French administration from 1673 to 1950, Chandannagar (formerly Chandernagore) retains an unmistakable Gallic elegance. Stroll along the magnificent 1-km riverside Strand under ancient banyan trees, explore the Institut de Chandernagor (former palace of French Governor Joseph François Dupleix housing rare 18th-century French manuscripts, cannons, and furniture), and marvel at the 1884 French Gothic Sacred Heart Church with imported colored stained-glass windows depicting the Stations of the Cross.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '38 km from Kolkata • 45 minutes by EMU local from Howrah',
    bestTimeToVisit: 'October to March (Famous for spectacular Jagaddhatri Puja light festivals in November)',
    estimatedBudget: 1400,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Evening riverside stroll 4:30 PM - 7:30 PM at the Strand',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 245,
    weather: {
      temp: 26,
      condition: 'Gentle River Breeze',
      humidity: 60,
      wind: '8 km/h',
      rainProb: '5%',
      bestVisitingTime: 'October - March'
    },
    coordinates: { lat: 22.8671, lng: 88.3674 },
    howToReach: {
      byAir: 'Kolkata Airport ~36 km.',
      byTrain: 'Howrah-Bandel local train to Chandannagar station (every 15 mins).',
      byRoad: 'GT Road or Grand Trunk bypass via Bally/Uttarpara.'
    },
    nearbyAttractions: ['The Chandannagar Strand Promenade', 'Institut de Chandernagor (Dupleix Palace Museum)', 'Sacred Heart Catholic Church (1884)', 'Patal Bari (Subterranean House frequented by Rabindranath Tagore)', 'French Cemetery & Clock Tower'],
    recommendedHotels: [
      { name: 'French Heritage Riverside Guest House', type: 'Heritage Bungalow', pricePerNight: 2100, rating: 4.7, contact: '+91 94340 88219' }
    ],
    localFood: ['Jalbhara Sandesh (invented by confectioner Suryasen in 1818)', 'Motichoor Sandesh', 'French bakery influenced buttery cookies', 'Fish Roll & Cutlet at Strand Cafe'],
    activities: ['Riverside Strand sunset cycling and stroll', 'French colonial museum and library exploration', 'Historical architecture photo walk along Rue de Quai', 'Sampling original Jalbhara Talshans Sandesh at Surya Kumar Modak sweet shop'],
    localGuides: [
      { name: 'Debashis Mukherjee', phone: '+91 98322 19028', languages: ['Bengali', 'English', 'French', 'Hindi'], experience: '10 years French heritage walk coordinator' }
    ],
    reviews: []
  },
  {
    id: 'plassey-battlefield',
    name: 'Plassey Historic Battlefield & Memorial',
    bengaliName: 'পলাশী ঐতিহাসিক যুদ্ধক্ষেত্র ও স্মৃতিস্তম্ভ',
    district: 'Nadia',
    region: 'South Bengal',
    category: ['Heritage', 'Historical Places', 'Cultural'],
    shortDescription: 'The watershed battlefield of 1757 where Nawab Siraj-ud-Daulah faced Robert Clive, forever altering the destiny of the Indian subcontinent.',
    fullDescription: 'On June 23, 1757, on the banks of the Bhagirathi river near the mango grove of Palashi (named after the crimson Palash blossoms), the fateful Battle of Plassey was fought. The betrayal by Mir Jafar and the defeat of Nawab Siraj-ud-Daulah marked the start of nearly two centuries of British East India Company rule in India. Visit the British War Memorial Obelisk, the tombs of loyal French artillery commanders, and the historical interpretation museum.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '155 km from Kolkata • 35 km from Krishnanagar • 45 km from Murshidabad',
    bestTimeToVisit: 'October to March',
    estimatedBudget: 1400,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning 9:00 AM - 1:00 PM for the memorial ground walk',
    safetyStatus: 'Verified Safe',
    rating: 4.7,
    reviewCount: 110,
    weather: {
      temp: 26,
      condition: 'Sunny Open Plains',
      humidity: 56,
      wind: '9 km/h',
      rainProb: '0%',
      bestVisitingTime: 'October - March'
    },
    coordinates: { lat: 23.7919, lng: 88.2514 },
    howToReach: {
      byAir: 'Kolkata Airport ~150 km.',
      byTrain: 'Hazarduari Express or Lalgola Passenger to Plassey (Palashi) Station.',
      byRoad: 'NH12 directly north towards Murshidabad.'
    },
    nearbyAttractions: ['Plassey War Memorial Obelisk (1757)', 'Siraj-ud-Daulah Historical Monument & Mango Grove', 'Faridpur British East India Graves', 'Nawabi Arsenal outpost ruins', 'Bethuadahari Wildlife Sanctuary nearby (20 km)'],
    recommendedHotels: [
      { name: 'Palashi Heritage Travellers Inn', type: 'Resort', pricePerNight: 1600, rating: 4.5, contact: '+91 94341 22910' }
    ],
    localFood: ['Nadia Chhanar Murki', 'Sarpuria & Sarbhaja of nearby Krishnanagar', 'Bhagirathi river fish curry'],
    activities: ['Historical battle line walk and tactical map study', 'Photography at the historic 1883 Lord Curzon obelisk', 'Birdwatching along the Bhagirathi river oxbow lakes'],
    localGuides: [
      { name: 'Nurul Islam', phone: '+91 97330 88214', languages: ['Bengali', 'Hindi', 'English'], experience: '9 years Plassey historian & educator' }
    ],
    reviews: []
  },
  {
    id: 'buxa-fort-freedom-heritage',
    name: 'Buxa Fort & Freedom Fighters Camp',
    bengaliName: 'বক্সা দুর্গ ও স্বাধীনতা সংগ্রামী বন্দিশিবির',
    district: 'Alipurduar',
    region: 'North Bengal',
    category: ['Heritage', 'Historical Places', 'Forest', 'Hills', 'Adventure'],
    shortDescription: 'High-altitude stone fortress at 2,870 ft in the Bhutan border hills, used as the British Raj high-security detention prison for Indian revolutionaries.',
    fullDescription: 'Perched in the dense Buxa Tiger Reserve along the ancient trade route between India and Bhutan, Buxa Fort was captured from the Bhutanese King by the British in 1865. Later transformed into a high-security detention camp second only to the Cellular Jail in the Andamans, prominent freedom fighters and revolutionaries from the Jugantar and Anushilan Samiti were imprisoned here. The 4-km trek from Santalabari through subtropical pine and oak forests to the silent stone ramparts is an inspiring pilgrimage.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '710 km from Kolkata • 30 km from Alipurduar Junction • 18 km from Rajabhatkhawa',
    bestTimeToVisit: 'October to April (Trekking trails are crisp and clear)',
    estimatedBudget: 2200,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning 7:00 AM start for the trek from Santalabari base',
    safetyStatus: 'Verified Safe',
    rating: 4.9,
    reviewCount: 140,
    weather: {
      temp: 18,
      condition: 'Misty Alpine Ridge',
      humidity: 68,
      wind: '6 km/h',
      rainProb: '10%',
      bestVisitingTime: 'October - April'
    },
    coordinates: { lat: 26.7570, lng: 89.5850 },
    howToReach: {
      byAir: 'Bagdogra (IXB) ~170 km.',
      byTrain: 'Kanchankanya Express or Vande Bharat to Alipurduar Junction or New Alipurduar.',
      byRoad: 'Drive via Rajabhatkhawa to Santalabari base, followed by a scenic 4-km hike.'
    },
    nearbyAttractions: ['Buxa Stone Fort & Revolutionary Prison Cells', 'Lepchakha "Queen of Dooars" Drukpa village (3,100 ft)', 'Jayanti Riverbed & Mahakal Cave', 'Rajabhatkhawa Nature Interpretation Center', 'Buxa Tiger Reserve Forest Safari'],
    recommendedHotels: [
      { name: 'Santalabari Pine Wood Eco Lodge', type: 'Eco Homestay', pricePerNight: 2000, rating: 4.8, contact: '+91 94340 33912' },
      { name: 'Lepchakha Valley View Homestay', type: 'Eco Homestay', pricePerNight: 2200, rating: 4.9, contact: '+91 98324 55189' }
    ],
    localFood: ['Dooars Country Chicken Stew', 'Momo & Ningro Wild Fern vegetable', 'Local Tingmo Tibetan bread', 'Dooars CTC Garden Tea'],
    activities: ['Historic hill fort prison trail trekking', 'Visiting Netaji revolutionary prisoners memorial plaque', 'Panoramic hike to Lepchakha village view of 12 Bhutan rivers', 'Butterfly watching in Buxa gorge'],
    localGuides: [
      { name: 'Karsang Drukpa', phone: '+91 98329 88120', languages: ['Nepali', 'Bengali', 'Hindi', 'English'], experience: '12 years high-altitude Buxa guide' }
    ],
    reviews: []
  },
  {
    id: 'kolkata-colonial-renaissance',
    name: 'Kolkata Colonial & Renaissance Heritage',
    bengaliName: 'কলকাতা ঔপনিবেশিক ও রেনেসাঁ ঐতিহ্য',
    district: 'Kolkata',
    region: 'South Bengal',
    category: ['Heritage', 'Historical Places', 'Cultural', 'Photography'],
    shortDescription: 'The historic capital of British India and epicenter of Bengal Renaissance: Victoria Memorial, Jorasanko Thakurbari, Marble Palace, and College Street.',
    fullDescription: 'From 1772 to 1911, Calcutta was the glittering capital of British India and the birthplace of modern Indian intellectual, literary, and social renaissance. Explore the majestic white Makrana marble Victoria Memorial Hall with its 64-acre landscaped gardens, Jorasanko Thakurbari (the 1784 ancestral home of Rabindranath Tagore), the neoclassical 1835 Marble Palace housing Reuben and Reynolds masterpieces, Asia’s oldest Indian Museum (1814), St. Paul’s Cathedral, and the legendary intellectual cafes of College Street.',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: 'Heart of Kolkata • Metro & Howrah/Sealdah connectivity',
    bestTimeToVisit: 'October to March (Crisp pleasant winter months)',
    estimatedBudget: 2200,
    currentCrowdLevel: 'Moderate',
    recommendedHours: 'Morning 9:30 AM - 1:00 PM for museums; Sunset at Princep Ghat',
    safetyStatus: 'Family Friendly',
    rating: 4.9,
    reviewCount: 420,
    weather: {
      temp: 26,
      condition: 'Pleasant Autumn Sunshine',
      humidity: 56,
      wind: '8 km/h',
      rainProb: '0%',
      bestVisitingTime: 'October - March'
    },
    coordinates: { lat: 22.5448, lng: 88.3426 },
    howToReach: {
      byAir: 'Netaji Subhas Chandra Bose International Airport (CCU) is in Kolkata.',
      byTrain: 'Howrah Junction, Sealdah, Shalimar, or Kolkata (Chitpur) Terminus.',
      byRoad: 'Extensive metro, yellow taxis, and electric bus connectivity.'
    },
    nearbyAttractions: ['Victoria Memorial Hall & Maidan', 'Jorasanko Thakurbari (Tagore Family Mansion)', 'Marble Palace & Private Menagerie', 'Indian Museum (Oldest museum in Asia, 1814)', 'St. Paul’s Gothic Cathedral (1847)', 'College Street Boipara & Indian Coffee House', 'Howrah Bridge & Princep Ghat'],
    recommendedHotels: [
      { name: 'The Lalit Great Eastern Heritage (Est. 1840)', type: 'Heritage Bungalow', pricePerNight: 5500, rating: 4.8, contact: '+91 33 4444 7777' },
      { name: 'Fairlawn Heritage Hotel Sudder Street', type: 'Heritage Bungalow', pricePerNight: 3200, rating: 4.6, contact: '+91 33 2252 1510' }
    ],
    localFood: ['Kolkata Dum Biryani with Aloo', 'Kathi Rolls at Park Street', 'Rosogolla from K.C. Das & Sandesh from Girish Chandra Dey', 'Filter Coffee at Indian Coffee House'],
    activities: ['Tagore ancestral mansion cultural tour', 'Victoria Memorial light and sound evening show', 'Heritage tram ride across the Maidan', 'Wooden boat sail beneath Howrah Bridge from Princep Ghat'],
    localGuides: [
      { name: 'Anirban Dutta', phone: '+91 98300 23411', languages: ['Bengali', 'English', 'Hindi'], experience: '15 years Kolkata heritage walking tour curator' }
    ],
    reviews: []
  },
  {
    id: 'bansberia-hanseswari-temple',
    name: 'Hanseswari & Ananta Vasudeva Terracotta',
    bengaliName: 'হংসেশ্বরী ও অনন্ত বাসুদেব পোড়ামাটি মন্দির',
    district: 'Hooghly',
    region: 'South Bengal',
    category: ['Heritage', 'Historical Places', 'Cultural', 'Photography'],
    shortDescription: 'The unique 13-spired tantric architecture of Hangseshwari Temple paired with the 1679 terracotta masterpiece Ananta Vasudeva Temple.',
    fullDescription: 'Located in Bansberia on the banks of the Hooghly, the Hangseshwari Temple is an architectural wonder without parallel in India. Commissioned by Raja Nrasingha Deb in 1801 and finished by Rani Sankari in 1814, its 13 lotus-bud spires represent the 13 bodily chakras and nadis of Kundalini tantric philosophy. Sharing the green complex is the 1679 Ananta Vasudeva temple, renowned for some of Bengal’s finest surviving terracotta reliefs of the Battle of Kurukshetra, sea vessels, and Krishna Lila.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '48 km from Kolkata • 5 km from Bandel Junction',
    bestTimeToVisit: 'October to March',
    estimatedBudget: 1200,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning 8:00 AM - 11:30 AM & 4:00 PM - 6:00 PM',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 130,
    weather: {
      temp: 26,
      condition: 'Pleasant River Atmosphere',
      humidity: 58,
      wind: '8 km/h',
      rainProb: '5%',
      bestVisitingTime: 'October - March'
    },
    coordinates: { lat: 22.9691, lng: 88.4022 },
    howToReach: {
      byAir: 'Kolkata Airport ~45 km.',
      byTrain: 'Bandel-Katwa local train to Bansberia railway station (3 stops from Bandel).',
      byRoad: 'Via Delhi Road or Grand Trunk Road to Bansberia.'
    },
    nearbyAttractions: ['13-pinnacled Hangseshwari Tantric Temple', '1679 Ananta Vasudeva Terracotta Temple', 'Zafar Khan Ghazi Mosque and Dargah (1298 AD, oldest surviving Muslim monument in Bengal)', 'Bandel Basilica nearby', 'Tribeni Confluence of Three Rivers'],
    recommendedHotels: [
      { name: 'Hooghly Heritage Country Stay', type: 'Heritage Bungalow', pricePerNight: 1600, rating: 4.6, contact: '+91 94340 99210' }
    ],
    localFood: ['Bansberia Moa & Sandesh', 'Authentic Bengali thali with Posto Bora', 'Fresh Chhana sweets'],
    activities: ['Studying the 13 chakras of Hangseshwari temple architecture', 'Terracotta battle panel photo documentation at Ananta Vasudeva', 'Visiting 13th-century Zafar Khan Ghazi mosque ruins', 'Tribeni riverbank sunset viewing'],
    localGuides: [
      { name: 'Alok Roy', phone: '+91 98320 44912', languages: ['Bengali', 'Hindi', 'English'], experience: '8 years temple heritage researcher' }
    ],
    reviews: []
  },
  {
    id: 'tamralipta-tamluk-heritage',
    name: 'Tamralipta Ancient Seaport & Bargabhima',
    bengaliName: 'তাম্রলিপ্ত প্রাচীন বন্দর ও বর্গভীমা মন্দির',
    district: 'Purba Medinipur',
    region: 'Coastal & Sundarbans',
    category: ['Heritage', 'Historical Places', 'Cultural'],
    shortDescription: 'The legendary 2,500-year-old ancient international maritime port and the 1,200-year-old Bargabhima Shakti Peetha on the Rupnarayan river.',
    fullDescription: 'Mentioned in the Mahabharata and visited by famous Chinese pilgrims Fa Hien and Hiuen Tsang, ancient Tamralipta was India’s primary maritime gateway to Sri Lanka, Java, and China. Tamluk is home to the revered 1,200-year-old Bargabhima Temple, built with Orissan and Buddhist architectural influences as one of the 51 Shakti Peethas. The Tamralipta Archaeological Museum houses ancient terracotta seals, punch-marked Mauryan coins, and Greek amphora shards dating from the 3rd century BCE.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80'
    ],
    distance: '85 km from Kolkata • 1.5 hours via NH16 & NH116',
    bestTimeToVisit: 'October to March',
    estimatedBudget: 1400,
    currentCrowdLevel: 'Low',
    recommendedHours: 'Morning 7:30 AM - 11:30 AM for Bargabhima Temple darshan',
    safetyStatus: 'Verified Safe',
    rating: 4.8,
    reviewCount: 165,
    weather: {
      temp: 27,
      condition: 'Sunny Coastal River Breeze',
      humidity: 62,
      wind: '11 km/h',
      rainProb: '5%',
      bestVisitingTime: 'October - March'
    },
    coordinates: { lat: 22.2980, lng: 87.9250 },
    howToReach: {
      byAir: 'Kolkata Airport ~90 km via Kona Expressway and NH16.',
      byTrain: 'Local EMU trains from Howrah (Haldia/Digha line) to Tamluk Junction.',
      byRoad: 'Via NH16 to Kolaghat, then NH116 south to Tamluk (approx. 2 hours).'
    },
    nearbyAttractions: ['Bargabhima Temple (51 Shakti Peetha)', 'Tamralipta Archaeological Museum (Maurya & Sunga antiquities)', 'Rupnarayan Riverfront Promenade', 'Mahisadal Rajbari & Terracotta Rath (15 km away)', 'Geonkhali River Confluence (where Rupnarayan meets Hooghly)'],
    recommendedHotels: [
      { name: 'Tamluk River View Tourist Lodge', type: 'Resort', pricePerNight: 1700, rating: 4.6, contact: '+91 94340 66100' }
    ],
    localFood: ['Kolaghat Fresh Hilsa / Ilish Machh', 'Tamluk Babar Sandesh', 'Chhana Pora sweet', 'Prawn Malai Curry'],
    activities: ['Visiting 1200-year Bargabhima ancient shrine', 'Tamralipta archaeological museum tour of 3rd BCE Greek & Mauryan seals', 'Rupnarayan riverside peaceful evening walk', 'Mahisadal Rajbari day excursion'],
    localGuides: [
      { name: 'Kalyan Samanta', phone: '+91 98322 77011', languages: ['Bengali', 'Hindi', 'English'], experience: '11 years maritime history guide' }
    ],
    reviews: []
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-family-lepcha',
    title: 'Himalayan Serenity Family Retreat',
    destination: 'Lepchajagat & Takdah Heritage',
    destinationId: 'lepchajagat',
    category: 'Family',
    duration: '4 Days / 3 Nights',
    startingPrice: 8499,
    maxTravellers: 6,
    hotelType: 'Verified Heritage Pine Bungalow with Family Rooms',
    transportType: 'Private AC Innova from NJP/Bagdogra with mountain-certified driver',
    activities: [
      'Private family tea tasting session',
      'Guided pine forest nature walk suitable for elders & children',
      'Orchid sanctuary visit',
      'Evening family fireplace with home-cooked Bengali meals'
    ],
    highlights: [
      'Child-safe rooms with electric bed warmers',
      'Flexible departure timings',
      'No strenuous uphill treks',
      'Continuous 24/7 dedicated travel concierge'
    ],
    rating: 4.9,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    itinerarySummary: [
      'Day 1: Arrival at NJP, scenic drive via Mirik tea gardens, check-in at Pine Haven Lepchajagat.',
      'Day 2: Morning Kanchenjunga view, relaxed visit to Jorpokhri salamander lake & Pashupati.',
      'Day 3: Transfer to Takdah British bungalow, visit orchid nursery and organic tea estate.',
      'Day 4: Morning souvenir shopping, scenic downhill drive to Bagdogra/NJP.'
    ]
  },
  {
    id: 'pkg-friends-purulia',
    title: 'Palash Trails & Chhau Camp Adventure',
    destination: 'Ayodhya Hills & Garhpanchkot',
    destinationId: 'ayodhya-hills',
    category: 'Friends',
    duration: '3 Days / 2 Nights',
    startingPrice: 5999,
    maxTravellers: 8,
    hotelType: 'Lakeside Camp Tents & Rustic Eco-Huts',
    transportType: 'Private Scorpio / Ertiga with Rooftop Luggage Carrier',
    activities: [
      'Bamni Falls canyon descent trek',
      'Lakeside night campfire with barbecue',
      'Live Chhau martial dance performance',
      'Charida mask crafting session'
    ],
    highlights: [
      'High-energy adventure itinerary',
      'Rock scrambling & waterfall photography',
      'Off-the-grid night stargazing'
    ],
    rating: 4.9,
    availability: 'Filling Fast',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    itinerarySummary: [
      'Day 1: Train to Asansol, drive to Panchet reservoir, explore Garhpanchkot 500-yr ruins, campfire.',
      'Day 2: Transfer to Ayodhya hills, Bamni falls trek, Turga dam rock climb, evening Chhau dance.',
      'Day 3: Sunrise at Mayur Pahar, mask shopping at Charida village, return to Howrah via Purulia Jn.'
    ]
  },
  {
    id: 'pkg-couple-takdah',
    title: 'Misty Pines & Tea Romance Escape',
    destination: 'Takdah Heritage & Tinchuley',
    destinationId: 'takdah-tinchuley',
    category: 'Couple',
    duration: '3 Days / 2 Nights',
    startingPrice: 7299,
    maxTravellers: 2,
    hotelType: 'Colonial Stone Suite with Private Fireplace & Valley View',
    transportType: 'Chauffeured Private Sedan',
    activities: [
      'Private sunset tea tasting at Rangli Rangliot valley',
      'Candlelight Bengali-Anglo fusion dinner',
      'Couples photo walk in misty pine groves',
      'Stargazing terrace session'
    ],
    highlights: [
      'Complete privacy guaranteed',
      'Complimentary bottle of local fruit wine and artisanal chocolates',
      'No group crowd intrusions'
    ],
    rating: 4.9,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    itinerarySummary: [
      'Day 1: Private pickup from Bagdogra, leisurely drive through Peshok tea estate, British bungalow stay.',
      'Day 2: Sunrise over Kanchenjunga from Gumbadara rock, private picnic in tea gardens, candlelit dinner.',
      'Day 3: Tinchuley orange orchard walk, return drive with scenic river valley viewpoints.'
    ]
  },
  {
    id: 'pkg-solo-mousuni',
    title: 'Waves, Mudflats & Stargazer Solo Expedition',
    destination: 'Mousuni Island & Coastal Delta',
    destinationId: 'mousuni-island',
    category: 'Solo',
    duration: '2 Days / 1 Night',
    startingPrice: 3199,
    maxTravellers: 1,
    hotelType: 'Secure Beachfront Canvas Tent with Verified Host',
    transportType: 'Train Escort & Island Boat Shuttle Included',
    activities: [
      'Guided red crab photography on virgin sandbanks',
      'Fishermen community boat ride',
      'Beachside solo journaling and hammock relaxation',
      'Acoustic folk songs by bonfire'
    ],
    highlights: [
      'Zero single-supplement surcharge',
      'Verified female-friendly and safe solo travel protocols',
      'Instant connection with fellow slow travelers'
    ],
    rating: 4.8,
    availability: 'Limited Slots',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    itinerarySummary: [
      'Day 1: Morning Sealdah train to Namkhana, scenic river crossing to Mousuni, beach tent check-in, sunset walk.',
      'Day 2: Sunrise over Bay of Bengal, morning mudflat exploration, fresh prawn lunch, afternoon return.'
    ]
  },
  {
    id: 'pkg-family-chilapata',
    title: 'Wild Dooars & Rhino Corridor Expedition',
    destination: 'Chilapata Forest & Buxa Jayanti',
    destinationId: 'chilapata-buxa',
    category: 'Family',
    duration: '4 Days / 3 Nights',
    startingPrice: 9999,
    maxTravellers: 6,
    hotelType: 'Forest Eco Resort with Swimming Pool & Nature Canopy',
    transportType: 'Dedicated Air-Conditioned SUV',
    activities: [
      'Exclusive morning elephant & rhino jeep safari',
      'Visit 5th-century Nalraja Garh forest ruins',
      'Jayanti riverbed pebble collecting & Bhutan border walk',
      'Rabha cultural folk dance at resort'
    ],
    highlights: [
      'Forest department registered safari permits guaranteed',
      'Child-friendly naturalist guides',
      'Safe, hygienic organic dining'
    ],
    rating: 4.9,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    itinerarySummary: [
      'Day 1: Arrival Hasimara/Alipurduar, check into Chilapata Green Resort, afternoon tea garden stroll.',
      'Day 2: 6 AM Chilapata jeep safari, Nalraja Garh ruins exploration, evening Rabha dance.',
      'Day 3: Day excursion to Jayanti riverbed, Buxa hill viewpoints and Mahakal cave.',
      'Day 4: Breakfast by river stream, drop off at Hasimara/Alipurduar Jn.'
    ]
  },
  {
    id: 'pkg-couple-bishnupur',
    title: 'Terracotta Romance & Heritage Silk Trails',
    destination: 'Bishnupur & Mukutmanipur',
    destinationId: 'bishnupur',
    category: 'Couple',
    duration: '3 Days / 2 Nights',
    startingPrice: 5899,
    maxTravellers: 2,
    hotelType: 'Heritage Tourist Lodge with Terracotta Courtyard',
    transportType: 'Private AC Car',
    activities: [
      'Private sunset boat cruise on Kangsabati dam reservoir',
      'Curated heritage temple tour by veteran historian',
      'Private Baluchari saree weaving demo',
      'Traditional Posto-Bata and Mishti dining'
    ],
    highlights: [
      'Relaxed, cultural immersion away from crowds',
      'Complimentary souvenir Terracotta horse pair',
      'Scenic dam sunset'
    ],
    rating: 4.8,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    itinerarySummary: [
      'Day 1: Morning drive from Kolkata (3.5 hrs), check-in, explore Rasmancha and Dalmadal cannon.',
      'Day 2: Day trip to Mukutmanipur earthen dam, sunset boat cruise, returning to Bishnupur.',
      'Day 3: Visit Shyamrai & Jor Bangla temples, weaver colony visit, afternoon return to Kolkata.'
    ]
  },
  {
    id: 'pkg-heritage-murshidabad-gour',
    title: 'Imperial Bengal: Nawabs of Murshidabad & Medieval Gour',
    destination: 'Murshidabad, Plassey & Malda Gour',
    destinationId: 'murshidabad-hazarduari',
    category: 'Family',
    duration: '4 Days / 3 Nights',
    startingPrice: 7899,
    maxTravellers: 6,
    hotelType: 'Verified Heritage Riverfront Lodge & Royal Suites',
    transportType: 'Private AC Innova with Heritage Chauffeur',
    activities: [
      'Hazarduari Palace Museum antiquities & arms gallery guided walkthrough',
      'Tanga carriage ride through Katra Mosque, Jahan Kosha Cannon, & Motijheel',
      'Excursion to Plassey 1757 historic battlefield and memorial obelisk',
      'ASI guided tour of Baro Sona Masjid, Dakhil Darwaza & Adina Mosque in Gour',
      'Authentic Murshidabadi Dum Biryani and Malda sweet tasting'
    ],
    highlights: [
      'Complete chronological journey through Bengal Sultanate, Nawabi, and British eras',
      'Licensed Archaeological Survey of India (ASI) expert guides included',
      'Family-safe air-conditioned riverfront accommodation'
    ],
    rating: 4.9,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    itinerarySummary: [
      'Day 1: Scenic train/car journey to Murshidabad, check into riverfront lodge, evening Tanga tour of Katra Mosque.',
      'Day 2: Full-day Hazarduari Palace, Nizamat Imambara, Kathgola Palace, and sunset Bhagirathi boat cruise.',
      'Day 3: Morning journey to Malda/Gour, exploring Baro Sona Masjid, Firoz Minar, and monumental Adina Mosque.',
      'Day 4: Stop at historic Plassey Battlefield memorial, lunch with authentic Nadia sweets, return to Kolkata.'
    ]
  },
  {
    id: 'pkg-heritage-hooghly-kalna',
    title: 'Bengal Renaissance & 108 Terracotta Temples Odyssey',
    destination: 'Hooghly, Chandannagar & Ambika Kalna',
    destinationId: 'ambika-kalna-temples',
    category: 'Friends',
    duration: '2 Days / 1 Night',
    startingPrice: 3499,
    maxTravellers: 5,
    hotelType: 'Riverside French Colonial Heritage Guest House',
    transportType: 'Private AC Sedan / Ertiga',
    activities: [
      'Climbing the twin 85-foot minarets of Hooghly Imambara overlooking Ganga',
      'Visiting the 1599 Portuguese Bandel Basilica and historic ship mast',
      'Evening French Strand heritage stroll and Dupleix Museum in Chandannagar',
      'Guided walk of the concentric 108 Shiva Temples (Nava Kailash) in Kalna',
      'Tasting original 1818 Jalbhara Sandesh and Kalna Makha Sandesh'
    ],
    highlights: [
      'Experience Portuguese, French, Islamic, and Royal Bengal temple heritages in 48 hours',
      'Riverside photography golden hour at Chandannagar Strand',
      'Curated sweet shop tasting at century-old confectioners'
    ],
    rating: 4.8,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    itinerarySummary: [
      'Day 1: Kolkata departure (8 AM), tour Bandel Church & Hooghly Imambara, afternoon French quarters of Chandannagar, evening Strand sunset.',
      'Day 2: Morning scenic drive to Ambika Kalna, 108 Shiva Temples concentric circuit, Pratapeswar terracotta marvel, evening return to Kolkata.'
    ]
  }
];

export const TRAVEL_ALERTS: TravelAlert[] = [
  {
    id: 'alt-1',
    type: 'road',
    severity: 'info',
    title: 'NH10 Teesta Valley Route Smooth',
    description: 'Road conditions between Siliguri and Teesta Bazar are open and operating smoothly. Weather is clear across North Bengal foothills.',
    location: 'North Bengal Corridor',
    updatedAt: 'Today, 08:30 AM'
  },
  {
    id: 'alt-2',
    type: 'crowd',
    severity: 'warning',
    title: 'Heavy Weekend Influx at Darjeeling Mall Road',
    description: 'Darjeeling town center is recording >85% footfall capacity. RouteX suggests diverting toward Lepchajagat or Takdah for unhurried tranquility.',
    location: 'Darjeeling District',
    updatedAt: 'Today, 07:15 AM'
  },
  {
    id: 'alt-3',
    type: 'weather',
    severity: 'info',
    title: 'Pleasant Spring Skies in Purulia & Bankura',
    description: 'Crisp morning temperatures (18°C) rising to pleasant 27°C by afternoon. Ideal conditions for Baranti lakeside birding and hill treks.',
    location: 'Rarh Bengal (Purulia & Bankura)',
    updatedAt: 'Today, 06:45 AM'
  },
  {
    id: 'alt-4',
    type: 'safety',
    severity: 'info',
    title: 'Tourist Police Help Desks Active in Dooars',
    description: 'Special 24x7 Tourist Police assistance booths are operational at Hasimara, Malbazar, and Alipurduar junctions.',
    location: 'Dooars Region',
    updatedAt: 'Yesterday'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'RX-WB-90214',
    bookingToken: 'RX-TOKEN-90214-LEPCHA',
    userId: 'usr-1',
    customerName: 'Soumodip Chal',
    customerEmail: 'soumodipchal@gmail.com',
    customerPhone: '+91 98301 22345',
    destinationId: 'lepchajagat',
    destinationName: 'Lepchajagat (Darjeeling)',
    packageId: 'pkg-family-lepcha',
    packageName: 'Himalayan Serenity Family Retreat',
    travelDate: '2026-09-24',
    travellersCount: 3,
    travelType: 'Family',
    hotelSelected: 'Pine Haven Lepcha Homestay (Family Attic Suite)',
    transportSelected: 'Private AC Innova from NJP',
    optionalActivities: ['Guided Pine Forest Trail', 'Tea Tasting Session'],
    totalAmount: 25497,
    status: 'Confirmed',
    createdAt: '2026-09-02T10:14:00Z',
    paymentMethod: 'Razorpay UPI (Verified)',
    qrVerified: true,
    verifiedAt: '2026-09-05T14:30:00Z',
    notes: 'Ground floor room requested for elderly traveler.'
  },
  {
    id: 'RX-WB-88402',
    bookingToken: 'RX-TOKEN-88402-PURULIA',
    userId: 'usr-2',
    customerName: 'Aheli Banerjee',
    customerEmail: 'aheli.b@example.com',
    customerPhone: '+91 97320 88120',
    destinationId: 'garhpanchkot-baranti',
    destinationName: 'Garhpanchkot & Baranti',
    packageId: 'pkg-friends-purulia',
    packageName: 'Palash Trails & Chhau Camp Adventure',
    travelDate: '2026-10-12',
    travellersCount: 4,
    travelType: 'Friends',
    hotelSelected: 'Baranti Lake View Village Retreat',
    transportSelected: 'Private Scorpio with driver',
    optionalActivities: ['Live Chhau Dance Session', 'Lakeside Campfire'],
    totalAmount: 23996,
    status: 'Paid',
    createdAt: '2026-09-06T15:22:00Z',
    paymentMethod: 'Razorpay NetBanking',
    qrVerified: false,
  },
  {
    id: 'RX-WB-77190',
    bookingToken: 'RX-TOKEN-77190-MOUSUNI',
    userId: 'usr-3',
    customerName: 'Tanmoy Sen',
    customerEmail: 'tanmoy.sen@example.com',
    customerPhone: '+91 94331 44012',
    destinationId: 'mousuni-island',
    destinationName: 'Mousuni Island',
    packageId: 'pkg-solo-mousuni',
    packageName: 'Waves, Mudflats & Stargazer Solo Expedition',
    travelDate: '2026-08-18',
    travellersCount: 1,
    travelType: 'Solo',
    hotelSelected: 'Mousuni Eco Beach Camp (Tent 4)',
    transportSelected: 'Train Escort & Island Boat Shuttle',
    optionalActivities: ['Fishermen Net Casting Walk'],
    totalAmount: 3199,
    status: 'Completed',
    createdAt: '2026-08-10T09:12:00Z',
    paymentMethod: 'UPI',
    qrVerified: true,
    verifiedAt: '2026-08-18T11:05:00Z',
  }
];

export const EMERGENCY_CONTACTS = [
  { name: 'West Bengal Tourist Police 24x7 Helpline', number: '1800-212-1655', badge: 'Toll-Free' },
  { name: 'National Emergency Service (Police / Fire / Disaster)', number: '112', badge: 'Universal' },
  { name: 'West Bengal Police Control Room', number: '100', badge: 'Police' },
  { name: 'State Ambulance Dispatch', number: '108', badge: 'Medical' },
  { name: 'Women Safety Helpline', number: '1090', badge: '24x7' },
  { name: 'Darjeeling Hill Tourist Assistance Desk', number: '+91 354 2254215', badge: 'Hills' },
  { name: 'Dooars Forest Emergency Rescue Unit', number: '+91 3564 255240', badge: 'Wildlife' },
  { name: 'Purulia District Disaster Helpline', number: '+91 3252 222333', badge: 'Disaster' },
];

export const NEARBY_EMERGENCY_HUBS = [
  {
    region: 'Darjeeling & Kurseong Foothills',
    hospital: 'Darjeeling District Hospital (Eden Hospital) • +91 354 2252131',
    police: 'Darjeeling Sadar Police Station • +91 354 2254422',
  },
  {
    region: 'Alipurduar & Dooars Forest Belt',
    hospital: 'Alipurduar District Hospital • +91 3564 255100',
    police: 'Hasimara Police Outpost • +91 3566 244102',
  },
  {
    region: 'Purulia & Ayodhya Plateau',
    hospital: 'Purulia Deben Mahato Sadar Hospital • +91 3252 222415',
    police: 'Bagmundi Police Station (Ayodhya Hills) • +91 3252 250221',
  },
  {
    region: 'Sundarbans & Mousuni Island Coastal Belt',
    hospital: 'Canning Sub-Divisional Hospital • +91 3218 255212',
    police: 'Namkhana Coastal Police Station • +91 3210 244100',
  }
];
