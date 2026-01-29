import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout';
import { Hero, ServiceGrid, Testimonials } from './components/HomeComponents';
import AIStudio from './components/AIStudio';
import BookingForm from './components/BookingForm';
import { SERVICES, OFFERS } from './data/services';
import { BUSINESS } from './data/business';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = React.useMemo(() => new URL(window.location.href), [window.location.href]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Simple components for pages to save files
const ServicesPage = () => (
  <div className="bg-ivory py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-serif text-charcoal mb-12 text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100">
             <div className="w-full h-48 bg-gray-200 rounded-xl mb-6 overflow-hidden">
               <img src={s.image} alt={s.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
             </div>
             <div className="flex justify-between items-start mb-2">
                <span className="text-queen-gold text-xs font-bold uppercase">{s.category}</span>
                <span className="bg-queen-pink/10 text-queen-pink px-2 py-1 rounded text-xs font-bold">{s.priceStart}</span>
             </div>
             <h3 className="text-xl font-bold mb-2">{s.title}</h3>
             <p className="text-gray-500 text-sm mb-4">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OffersPage = () => (
  <div className="bg-ivory py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-serif text-charcoal mb-12 text-center">Exclusive Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {OFFERS.map(offer => (
          <div key={offer.id} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg border border-queen-gold/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-queen-pink text-white text-xs font-bold px-4 py-2 rounded-bl-xl z-10">Limited Time</div>
            <h3 className="text-2xl font-serif font-bold text-queen-orchid mb-2">{offer.title}</h3>
            <p className="text-gray-600 mb-6">{offer.description}</p>
            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold text-charcoal">{offer.price}</span>
              <span className="text-gray-400 line-through text-lg mb-1">{offer.originalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="bg-ivory py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-serif text-charcoal mb-12 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-lg">
           <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
           <div className="space-y-6">
             <div className="flex items-start gap-4">
               <div className="bg-queen-pink/10 p-3 rounded-full text-queen-pink"><MapPin /></div>
               <div>
                 <p className="font-bold text-charcoal">Location</p>
                 <p className="text-gray-600 text-sm">{BUSINESS.address}</p>
               </div>
             </div>
             <div className="flex items-start gap-4">
               <div className="bg-queen-pink/10 p-3 rounded-full text-queen-pink"><Phone /></div>
               <div>
                 <p className="font-bold text-charcoal">Phone</p>
                 <p className="text-gray-600 text-sm">{BUSINESS.phone1}</p>
                 <p className="text-gray-600 text-sm">{BUSINESS.phone2}</p>
               </div>
             </div>
           </div>
        </div>
        <div className="h-96 bg-gray-200 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border: 0 }} 
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GEMINI_API_KEY}&q=${BUSINESS.coordinates.lat},${BUSINESS.coordinates.lng}`} 
            allowFullScreen
          ></iframe>
          {/* Note: This assumes Google Maps Embed API is enabled on the same key or use a static map/link if key is restricted to GenAI */}
        </div>
      </div>
    </div>
  </div>
);

const HomePage = () => (
  <>
    <Hero />
    <ServiceGrid />
    <Testimonials />
    <section className="py-20 bg-charcoal text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif mb-6">Join Our Beauty Community</h2>
        <div className="flex justify-center gap-6 mb-8">
           {/* Social placeholders */}
           <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-queen-pink transition-colors cursor-pointer">IG</div>
           <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">FB</div>
           <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-black transition-colors cursor-pointer">TK</div>
        </div>
        <a href={BUSINESS.socials.instagramMain} target="_blank" className="inline-block border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-charcoal transition-colors">Follow @queen.beauty.jo</a>
      </div>
    </section>
  </>
);

function App() {
  const [isArabic, setIsArabic] = useState(false);
  const toggleLang = () => setIsArabic(!isArabic);

  return (
    <Router>
      <Layout isArabic={isArabic} toggleLang={toggleLang}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/academy" element={<ServicesPage />} /> {/* Reusing for demo */}
          <Route path="/gallery" element={<ServicesPage />} /> {/* Reusing for demo */}
          <Route path="/ai-studio" element={<AIStudio />} />
          <Route path="/book" element={
            <div className="py-20 container mx-auto px-4 max-w-2xl">
              <h1 className="text-4xl font-serif text-center mb-10">Book Your Appointment</h1>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <BookingForm />
              </div>
            </div>
          } />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;