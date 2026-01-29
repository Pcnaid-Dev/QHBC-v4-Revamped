import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Heart, Sparkles } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../data/services';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mesh-gradient">
      {/* Overlay Decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-block mb-6 animate-float">
          <span className="bg-white/30 backdrop-blur-sm border border-white/50 text-charcoal px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
            Welcome to Royalty
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-charcoal mb-6 leading-tight drop-shadow-sm">
          Feel Like <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-queen-pink via-queen-lavender to-queen-orchid">
            A Queen.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-light">
          Experience premium beauty services in Amman’s most glamorous atmosphere.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link 
            to="/book" 
            className="w-full md:w-auto bg-charcoal text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Book Appointment
          </Link>
          <Link 
            to="/ai-studio" 
            className="w-full md:w-auto bg-white/80 backdrop-blur-sm text-queen-orchid border border-queen-orchid/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <Sparkles size={20} className="group-hover:text-queen-pink transition-colors" />
            Try AI Studio
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-400">
        <ArrowRight className="transform rotate-90" />
      </div>
    </section>
  );
};

export const ServiceGrid: React.FC = () => {
  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-charcoal mb-4">Our Signature Services</h2>
          <div className="h-1 w-20 bg-queen-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.slice(0, 3).map((service) => (
            <div key={service.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold">{service.priceStart}</span>
                </div>
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-queen-gold uppercase tracking-wider">{service.category}</span>
                <h3 className="text-2xl font-serif font-bold mt-2 mb-3 text-charcoal group-hover:text-queen-pink transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{service.description}</p>
                <Link to="/book" className="inline-flex items-center text-sm font-bold text-charcoal group-hover:text-queen-orchid transition-colors">
                  Book This Service <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/services" className="inline-block border-b-2 border-queen-gold text-queen-gold font-bold pb-1 hover:text-queen-gold-dark transition-colors">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-queen-pink/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-serif font-bold mb-12">Queen Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-ivory p-8 rounded-2xl relative">
              <div className="text-queen-gold text-4xl font-serif absolute top-4 right-6 opacity-30">"</div>
              <div className="flex gap-1 mb-4 text-queen-gold">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">{t.text}</p>
              <div>
                <h4 className="font-bold text-charcoal">{t.name}</h4>
                <span className="text-xs text-gray-400">Happy Client</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};