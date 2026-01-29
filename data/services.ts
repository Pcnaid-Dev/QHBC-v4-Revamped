import { Service, Offer, Testimonial } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'h1',
    category: 'Hair',
    title: 'Royal Haircut & Styling',
    description: 'Precision cuts tailored to your face shape, finished with a signature voluminous blow-dry.',
    priceStart: '15 JOD',
    image: 'https://picsum.photos/seed/hair1/400/500'
  },
  {
    id: 'h2',
    category: 'Hair',
    title: 'Brazilian Protein Treatment',
    description: 'Restore shine and silkiness to damaged hair with our premium protein therapy.',
    priceStart: '80 JOD',
    image: 'https://picsum.photos/seed/hair2/400/500'
  },
  {
    id: 'b1',
    category: 'Bridal',
    title: 'Full Bridal Package',
    description: 'The ultimate Queen experience: Makeup, Hair, Lashes, Nails, and Skin Prep.',
    priceStart: '300 JOD',
    image: 'https://picsum.photos/seed/bride1/400/500'
  },
  {
    id: 'n1',
    category: 'Nails',
    title: 'Gel Extensions & Art',
    description: 'Durable, glossy gel extensions with custom nail art designs.',
    priceStart: '35 JOD',
    image: 'https://picsum.photos/seed/nails1/400/500'
  },
  {
    id: 'sk1',
    category: 'Beauty',
    title: 'Deep Cleansing Facial',
    description: 'Rejuvenate your skin with extraction, exfoliation, and a glow mask.',
    priceStart: '30 JOD',
    image: 'https://picsum.photos/seed/skin1/400/500'
  },
  {
    id: 'ac1',
    category: 'Academy',
    title: 'Pro Makeup Course (3 Months)',
    description: 'Become a certified makeup artist. Includes kit and certificate.',
    priceStart: 'Call for Price',
    image: 'https://picsum.photos/seed/class1/400/500'
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'off1',
    title: 'Morning Glow Package',
    description: 'Blow-dry + Manicure (Sun-Wed 10am-2pm)',
    price: '20 JOD',
    originalPrice: '35 JOD',
    expires: 'Limited Time'
  },
  {
    id: 'off2',
    title: 'Bride-to-Be Consultation',
    description: 'Free trial consultation for 2024 brides when booking full package.',
    price: 'FREE',
    originalPrice: '25 JOD'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Al-Majali',
    text: 'I felt like an absolute princess! The gold interior is stunning and my hair has never looked better.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Noor K.',
    text: 'Best protein treatment in Amman. Haneen is a magician with hair.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Rana S.',
    text: 'The AI Studio is crazy! I tried a red hair color virtually then did it for real. Perfect match.',
    rating: 5
  }
];