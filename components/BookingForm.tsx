import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { MessageCircle, Phone, CheckCircle } from 'lucide-react';
import { BUSINESS } from '../data/business';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const message = `Hello Queen Beauty Center! I would like to book an appointment.%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AService: ${formData.service}%0APreferred Date: ${formData.date}%0ANotes: ${formData.notes}`;
    return `https://wa.me/${BUSINESS.phone1.replace('+', '')}?text=${message}`;
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4">Booking Ready!</h3>
        <p className="text-gray-600 mb-8">Please complete your booking by sending the details to us via WhatsApp or giving us a call.</p>
        
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#25D366] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#1ebc57] transition-colors shadow-lg"
          >
            <MessageCircle size={20} /> Send via WhatsApp
          </a>
          <a 
            href={`tel:${BUSINESS.phone1}`}
            className="bg-charcoal text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
          >
            <Phone size={20} /> Call Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
        <input 
          required 
          type="text" 
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-queen-pink outline-none transition-all"
          placeholder="Queen's Name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
        <input 
          required 
          type="tel" 
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-queen-pink outline-none transition-all"
          placeholder="079 000 0000"
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Service</label>
          <select 
            required 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-queen-pink outline-none transition-all"
            value={formData.service}
            onChange={e => setFormData({...formData, service: e.target.value})}
          >
            <option value="">Select Service</option>
            {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
          <input 
            required 
            type="datetime-local" 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-queen-pink outline-none transition-all"
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Notes (Optional)</label>
        <textarea 
          rows={3}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-queen-pink outline-none transition-all"
          placeholder="Special requests, hair length, etc..."
          value={formData.notes}
          onChange={e => setFormData({...formData, notes: e.target.value})}
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-queen-pink to-queen-orchid text-white py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1"
      >
        Proceed to Confirmation
      </button>
    </form>
  );
};

export default BookingForm;