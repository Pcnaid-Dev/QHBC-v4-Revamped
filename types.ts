export interface BusinessInfo {
  nameEn: string;
  nameAr: string;
  phone1: string;
  phone2: string;
  address: string;
  coordinates: { lat: number; lng: number };
  socials: {
    facebook: string;
    messenger: string;
    instagramMain: string;
    instagramAlt1: string;
    instagramAlt2: string;
    tiktok: string;
    snapchat: string;
  };
}

export interface Service {
  id: string;
  category: 'Hair' | 'Bridal' | 'Nails' | 'Beauty' | 'Offers' | 'Academy';
  title: string;
  description: string;
  priceStart?: string;
  image?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  expires?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  text: string;
  rating: number;
}

export enum AIModuleType {
  Makeup = 'makeup',
  Nails = 'nails',
  Hair = 'hair',
  HairColor = 'hair_color',
  Bridal = 'bridal',
  Skin = 'skin',
  Lashes = 'lashes'
}

export interface AIModuleConfig {
  id: AIModuleType;
  label: string;
  icon: string;
  promptTemplate: string;
  controls: {
    name: string;
    label: string;
    type: 'select' | 'slider';
    options?: string[];
  }[];
}