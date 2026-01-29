import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Sparkles, RefreshCw, Download, Share2, AlertCircle } from 'lucide-react';
import { generateBeautyEdit } from '../services/geminiService';
import { AIModuleType, AIModuleConfig } from '../types';
import { Link } from 'react-router-dom';

const MODULES: AIModuleConfig[] = [
  {
    id: AIModuleType.Makeup,
    label: 'Virtual Makeup',
    icon: '💄',
    promptTemplate: '',
    controls: [
      { name: 'style', label: 'Look Style', type: 'select', options: ['Natural Glow', 'Soft Glam', 'Evening Bold', 'Bridal', 'No-Makeup Makeup'] },
      { name: 'intensity', label: 'Intensity', type: 'slider' }
    ]
  },
  {
    id: AIModuleType.Hair,
    label: 'Hairstyle Studio',
    icon: '💇‍♀️',
    promptTemplate: '',
    controls: [
      { name: 'style', label: 'Style', type: 'select', options: ['Long Layers', 'Bob Cut', 'Pixie', 'Wavy', 'Straight', 'Updo'] },
      { name: 'color', label: 'Color Family', type: 'select', options: ['Blonde', 'Brunette', 'Black', 'Red', 'Copper', 'Ombre'] }
    ]
  },
  {
    id: AIModuleType.Nails,
    label: 'Nail Bar',
    icon: '💅',
    promptTemplate: '',
    controls: [
      { name: 'color', label: 'Polish Color', type: 'select', options: ['Classic Red', 'Nude', 'Pink', 'White French', 'Black', 'Glitter'] },
      { name: 'style', label: 'Shape/Art', type: 'select', options: ['Almond', 'Square', 'Coffin', 'Stiletto', 'Chrome Finish'] }
    ]
  },
  {
    id: AIModuleType.Bridal,
    label: 'Bridal Builder',
    icon: '👰',
    promptTemplate: '',
    controls: [
      { name: 'style', label: 'Theme', type: 'select', options: ['Royal', 'Boho', 'Modern Minimalist', 'Classic'] }
    ]
  },
  {
    id: AIModuleType.Skin,
    label: 'Skin Perfector',
    icon: '✨',
    promptTemplate: '',
    controls: [
      { name: 'intensity', label: 'Smoothing Level', type: 'slider' }
    ]
  }
];

const AIStudio: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<AIModuleConfig>(MODULES[0]);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, string>>({ style: 'Natural Glow', intensity: 'Medium', color: 'Nude' });
  const [apiKey, setApiKey] = useState(process.env.GEMINI_API_KEY || '');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!originalImage) return;
    if (!apiKey) {
      setError("API Key is missing. Please ensure GEMINI_API_KEY is set in environment or provided.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await generateBeautyEdit({
        image: originalImage,
        module: selectedModule.id,
        options,
        apiKey: apiKey
      });
      setGeneratedImage(result.imageUrl);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory pt-8 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="bg-queen-orchid/10 text-queen-orchid px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Beta Feature</span>
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal mt-4 mb-2">AI Beauty <span className="text-queen-pink">Studio</span></h1>
          <p className="text-muted max-w-2xl mx-auto">Upload your selfie and let our Gemini-powered AI design your next salon look. Try hairstyles, makeup, or nail art instantly.</p>
        </div>

        {!originalImage ? (
          // Upload State
          <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-xl text-center border-2 border-dashed border-queen-gold/30 hover:border-queen-pink transition-colors">
            <div className="w-20 h-20 bg-queen-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 text-queen-pink">
              <Camera size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Upload a Selfie</h3>
            <p className="text-sm text-gray-500 mb-6">For best results, use good lighting and face the camera directly.</p>
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-queen-pink hover:bg-queen-orchid text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Upload size={20} /> Select Photo
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </div>
        ) : (
          // Studio Workspace
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="font-serif text-xl mb-4 text-queen-gold-dark">1. Choose Service</h3>
                <div className="grid grid-cols-2 gap-3">
                  {MODULES.map(mod => (
                    <button
                      key={mod.id}
                      onClick={() => setSelectedModule(mod)}
                      className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                        selectedModule.id === mod.id 
                          ? 'bg-queen-pink text-white shadow-md transform scale-105' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-2xl">{mod.icon}</span>
                      <span className="text-xs font-medium">{mod.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="font-serif text-xl mb-4 text-queen-gold-dark">2. Customize</h3>
                <div className="space-y-4">
                  {selectedModule.controls.map(control => (
                    <div key={control.name}>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{control.label}</label>
                      {control.type === 'select' ? (
                        <select 
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-queen-pink outline-none"
                          onChange={(e) => setOptions({...options, [control.name]: e.target.value})}
                          value={options[control.name] || ''}
                        >
                          {control.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input 
                          type="range" 
                          className="w-full accent-queen-pink"
                          min="1" max="100"
                          onChange={(e) => setOptions({...options, [control.name]: e.target.value})}
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className={`w-full mt-6 py-4 rounded-xl font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all ${
                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-queen-pink to-queen-orchid hover:scale-[1.02]'
                  }`}
                >
                  {isLoading ? <RefreshCw className="animate-spin" /> : <Sparkles />}
                  {isLoading ? 'Dreaming...' : 'Generate Look'}
                </button>
                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-start gap-2">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Main Viewer */}
            <div className="lg:col-span-8">
              <div className="bg-white p-4 rounded-3xl shadow-xl min-h-[500px] flex items-center justify-center relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">
                  
                  {/* Before */}
                  <div className="relative group rounded-2xl overflow-hidden bg-gray-100">
                    <span className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm z-10">Before</span>
                    <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                  </div>

                  {/* After */}
                  <div className="relative group rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    <span className="absolute top-4 left-4 bg-queen-pink text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm z-10">After (AI)</span>
                    {generatedImage ? (
                      <img src={generatedImage} alt="Generated" className="w-full h-full object-cover animate-fade-in" />
                    ) : (
                      <div className="text-gray-400 text-center p-6">
                        <Sparkles className="mx-auto mb-2 opacity-50" size={32} />
                        <p className="text-sm">Result will appear here</p>
                      </div>
                    )}
                    {isLoading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 border-4 border-queen-pink border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p className="text-queen-pink font-bold animate-pulse">Applying magic...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                {generatedImage && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-100">
                     <button onClick={() => fileInputRef.current?.click()} className="p-3 hover:bg-gray-100 rounded-full text-gray-600" title="New Photo"><Camera size={20} /></button>
                     <div className="h-6 w-px bg-gray-300"></div>
                     <a href={generatedImage} download="queen-beauty-ai.jpg" className="p-3 hover:bg-gray-100 rounded-full text-gray-600" title="Download"><Download size={20} /></a>
                  </div>
                )}
              </div>

              {/* Service Match */}
              {generatedImage && (
                <div className="mt-6 bg-gradient-to-r from-queen-pink/5 to-queen-lavender/5 border border-queen-pink/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="font-serif text-xl text-charcoal mb-1">Love this look?</h4>
                    <p className="text-sm text-gray-600">Our specialists can recreate this exact style for you.</p>
                  </div>
                  <Link to="/book" className="bg-charcoal text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-black transition-colors whitespace-nowrap">
                    Book This Look
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStudio;