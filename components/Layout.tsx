import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, MapPin, Phone, Globe, Clock } from 'lucide-react';
import { BUSINESS } from '../data/business';

interface LayoutProps {
  children: React.ReactNode;
  isArabic: boolean;
  toggleLang: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isArabic, toggleLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: isArabic ? 'الرئيسية' : 'Home', path: '/' },
    { name: isArabic ? 'الخدمات' : 'Services', path: '/services' },
    { name: isArabic ? 'العروض' : 'Offers', path: '/offers' },
    { name: isArabic ? 'الأكاديمية' : 'Academy', path: '/academy' },
    { name: isArabic ? 'المعرض' : 'Gallery', path: '/gallery' },
    { name: isArabic ? 'ستوديو الذكاء' : 'AI Studio', path: '/ai-studio', highlight: true },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isArabic ? 'ar' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
             <h1 className="text-2xl font-serif font-bold tracking-tight text-charcoal">
               <span className="text-queen-pink">Queen</span> Beauty
             </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-queen-pink ${
                  link.highlight 
                    ? 'text-queen-orchid font-bold flex items-center gap-1' 
                    : 'text-charcoal'
                }`}
              >
                {link.highlight && <span className="relative flex h-2 w-2 mr-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-queen-pink opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-queen-pink"></span></span>}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-queen-gold"
            >
              <Globe size={14} />
              {isArabic ? 'EN' : 'عربي'}
            </button>
            <Link 
              to="/book" 
              className="bg-queen-pink hover:bg-queen-orchid text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg hover:shadow-queen-pink/30 transform hover:-translate-y-0.5"
            >
              {isArabic ? 'احجز الآن' : 'Book Now'}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen border-t' : 'max-h-0'}`}>
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-lg font-medium ${link.highlight ? 'text-queen-pink' : 'text-charcoal'}`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-100 my-2" />
            <div className="flex justify-between items-center">
              <button onClick={toggleLang} className="text-sm text-gray-500">
                Switch to {isArabic ? 'English' : 'Arabic'}
              </button>
              <Link to="/book" className="text-queen-pink font-bold">
                {isArabic ? 'احجز موعد' : 'Book Appointment'}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-ivory pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-queen-pink via-queen-gold to-queen-orchid"></div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-3xl font-serif text-white">Queen Beauty</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isArabic 
                ? 'وجهتك الأولى للجمال والأناقة في عمان. دللي نفسك كالملكات.'
                : 'Your premier destination for beauty and elegance in Amman. Treat yourself like a Queen.'}
            </p>
            <div className="flex gap-4 pt-2">
              <a href={BUSINESS.socials.instagramMain} target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-queen-pink transition-colors"><Instagram size={18} /></a>
              <a href={BUSINESS.socials.facebook} target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-queen-gold mb-2">{isArabic ? 'تواصل معنا' : 'Contact Us'}</h3>
            <div className="flex items-start gap-3 text-gray-300 text-sm">
              <MapPin size={16} className="mt-1 text-queen-pink" />
              <p>{BUSINESS.address}</p>
            </div>
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <Phone size={16} className="text-queen-pink" />
              <a href={`tel:${BUSINESS.phone1}`} className="hover:text-white transition-colors">{BUSINESS.phone1}</a>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-queen-gold mb-2">{isArabic ? 'ساعات العمل' : 'Working Hours'}</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center gap-2"><Clock size={14} /> <span>Daily: 10:00 AM - 8:00 PM</span></div>
              <div className="text-xs text-gray-500">Friday appointments available by booking.</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-queen-gold mb-2">{isArabic ? 'روابط' : 'Links'}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/services" className="hover:text-queen-pink">Services</Link></li>
              <li><Link to="/book" className="hover:text-queen-pink">Book Now</Link></li>
              <li><Link to="/contact" className="hover:text-queen-pink">Location</Link></li>
              <li><span className="opacity-50 cursor-not-allowed">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Queen Hair Beauty Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;