export type StayCategory = 'all' | 'cabins' | 'beach' | 'city' | 'villas';

export interface Stay {
  id: string;
  title: string;
  category: 'cabins' | 'beach' | 'city' | 'villas';
  location: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  imageUri: string;
  tags: string[];
  description: string;
  features: {
    guests: number;
    bedrooms: number;
    baths: number;
    hasHotTub: boolean;
    isPetFriendly: boolean;
  };
}

export const STAYS_DATA: Stay[] = [
  {
    id: 'stay-1',
    title: 'Modern Cabin\nwith Hot Tub',
    category: 'cabins',
    location: 'Lake Arrowhead, CA',
    pricePerNight: 285,
    rating: 4.9,
    reviewsCount: 142,
    imageUri: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Pet friendly', 'Hot tub', 'Fire pit', 'Mountain view'],
    description: 'Quiet pet friendly cabin nestled among towering pines with private outdoor hot tub and cozy fireplace.',
    features: {
      guests: 4,
      bedrooms: 2,
      baths: 2,
      hasHotTub: true,
      isPetFriendly: true,
    },
  },
  {
    id: 'stay-2',
    title: 'Coastal Sanctuary\nVilla',
    category: 'beach',
    location: 'Big Sur, CA',
    pricePerNight: 420,
    rating: 4.95,
    reviewsCount: 98,
    imageUri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    tags: ['Ocean view', 'Secluded', 'Chef kitchen', 'Fireplace'],
    description: 'Breathtaking oceanfront retreat perched over the Pacific with private sunset deck and panoramic floor-to-ceiling windows.',
    features: {
      guests: 6,
      bedrooms: 3,
      baths: 3,
      hasHotTub: true,
      isPetFriendly: false,
    },
  },
  {
    id: 'stay-3',
    title: 'Aspen Alpine\nLodge',
    category: 'cabins',
    location: 'Aspen, CO',
    pricePerNight: 350,
    rating: 4.88,
    reviewsCount: 115,
    imageUri: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1200&auto=format&fit=crop',
    tags: ['Ski-in/Ski-out', 'Hot tub', 'Sauna', 'Heated floors'],
    description: 'Wood-clad mountain chalet with a stone fireplace, private cedar hot tub, and direct slopeside access.',
    features: {
      guests: 8,
      bedrooms: 4,
      baths: 3.5,
      hasHotTub: true,
      isPetFriendly: true,
    },
  },
  {
    id: 'stay-4',
    title: 'Joshua Tree\nStargazer Villa',
    category: 'villas',
    location: 'Joshua Tree, CA',
    pricePerNight: 260,
    rating: 4.92,
    reviewsCount: 84,
    imageUri: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop',
    tags: ['Desert view', 'Hot tub', 'Stargazing deck', 'Pet friendly'],
    description: 'Modern minimalist desert sanctuary designed for stargazing with heated cowboy pool and wraparound views.',
    features: {
      guests: 4,
      bedrooms: 2,
      baths: 2,
      hasHotTub: true,
      isPetFriendly: true,
    },
  },
  {
    id: 'stay-5',
    title: 'Malibu Oceanfront\nGlass House',
    category: 'beach',
    location: 'Malibu, CA',
    pricePerNight: 550,
    rating: 4.98,
    reviewsCount: 67,
    imageUri: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
    tags: ['Private beach', 'Infinity pool', 'Sunset deck', 'EV charger'],
    description: 'Architectural masterpiece directly on Malibu beach with steps down to the sand and sound of breaking waves.',
    features: {
      guests: 6,
      bedrooms: 3,
      baths: 3,
      hasHotTub: true,
      isPetFriendly: false,
    },
  },
  {
    id: 'stay-6',
    title: 'Secluded Forest\nA-Frame',
    category: 'cabins',
    location: 'Catskills, NY',
    pricePerNight: 210,
    rating: 4.85,
    reviewsCount: 156,
    imageUri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
    tags: ['Pet friendly', 'Wood stove', 'Forest trails', 'Quiet retreat'],
    description: 'Charming vintage A-frame surrounded by 5 acres of private woods with a stream and outdoor fire pit.',
    features: {
      guests: 3,
      bedrooms: 1,
      baths: 1,
      hasHotTub: false,
      isPetFriendly: true,
    },
  },
  {
    id: 'stay-7',
    title: 'Skyline View\nUrban Penthouse',
    category: 'city',
    location: 'Seattle, WA',
    pricePerNight: 225,
    rating: 4.89,
    reviewsCount: 78,
    imageUri: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
    tags: ['City views', 'Dedicated workspace', 'Gym access', 'High speed WiFi'],
    description: 'Bright modern loft in the heart of downtown with floor-to-ceiling city views and luxury designer finishes.',
    features: {
      guests: 2,
      bedrooms: 1,
      baths: 1.5,
      hasHotTub: false,
      isPetFriendly: false,
    },
  },
  {
    id: 'stay-8',
    title: 'Napa Valley\nVineyard Villa',
    category: 'villas',
    location: 'St. Helena, CA',
    pricePerNight: 490,
    rating: 4.96,
    reviewsCount: 52,
    imageUri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Vineyard view', 'Private pool', 'Wine cellar', 'Outdoor kitchen'],
    description: 'Private estate surrounded by rolling vineyards with solar-heated pool, bocce court, and outdoor dining pavilion.',
    features: {
      guests: 8,
      bedrooms: 4,
      baths: 4,
      hasHotTub: true,
      isPetFriendly: true,
    },
  },
];
