import React, { useState, useMemo } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, ShoppingBag, Check, Flower2, Gift, Sparkles } from 'lucide-react';

// --- DATA OBJECTS ---
const TIERS = [
  { id: 'classic', name: 'Classic', description: 'Perfect for a simple, elegant gesture.', basePrice: 250000, maxFlowers: 7, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=400' },
  { id: 'premium', name: 'Premium', description: 'Our most popular size, lush and full.', basePrice: 400000, maxFlowers: 15, image: 'https://images.unsplash.com/photo-1591886960571-74d15068c812?auto=format&fit=crop&q=80&w=400' },
  { id: 'luxury', name: 'Luxury', description: 'Make a grand statement with an extravagant arrangement.', basePrice: 650000, maxFlowers: 25, image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=400' }
];

const FLOWERS = [
  { id: 'red_rose', name: 'Red Rose', price: 30000, category: 'main', image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=200' },
  { id: 'pink_peony', name: 'Pink Peony', price: 45000, category: 'main', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=200' },
  { id: 'white_lily', name: 'White Lily', price: 40000, category: 'main', image: 'https://images.unsplash.com/photo-1601708849767-1eee40e70462?auto=format&fit=crop&q=80&w=200' },
  { id: 'sunflower', name: 'Sunflower', price: 25000, category: 'main', image: 'https://images.unsplash.com/photo-1588880331179-bc9b9be5031b?auto=format&fit=crop&q=80&w=200' },
  { id: 'baby_breath', name: 'Baby\\'s Breath', price: 15000, category: 'filler', image: 'https://images.unsplash.com/photo-1616875887229-3738090dbbf0?auto=format&fit=crop&q=80&w=200' },
  { id: 'eucalyptus', name: 'Eucalyptus', price: 10000, category: 'foliage', image: 'https://images.unsplash.com/photo-1603504781467-f584e8cd5c1b?auto=format&fit=crop&q=80&w=200' },
];

const WRAPPINGS = [
  { id: 'kraft', name: 'Brown Kraft Paper', price: 15000, image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=200' },
  { id: 'frosted_white', name: 'Frosted White', price: 25000, image: 'https://images.unsplash.com/photo-1586526436661-30ac2552e46c?auto=format&fit=crop&q=80&w=200' },
  { id: 'blush_pink', name: 'Blush Pink Matte', price: 25000, image: 'https://images.unsplash.com/photo-1605929314488-8772a8cb9ab2?auto=format&fit=crop&q=80&w=200' },
  { id: 'luxury_mesh', name: 'Luxury Gold Mesh', price: 40000, image: 'https://images.unsplash.com/photo-1610484542171-4defce4dc125?auto=format&fit=crop&q=80&w=200' },
];

const DECORATIONS = [
  { id: 'silk_ribbon', name: 'Premium Silk Ribbon', price: 20000, icon: Sparkles },
  { id: 'greeting_card', name: 'Handwritten Greeting Card', price: 15000, icon: Gift },
  { id: 'butterfly', name: 'Decorative Butterfly', price: 10000, icon: Flower2 },
];

const PREVIEWS = {
  bouquet: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800',
  gift_box: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800'
};

const STEPS = [
  { id: 'size', label: 'Size & Tier' },
  { id: 'flowers', label: 'Select Flowers' },
  { id: 'wrapping', label: 'Wrapping' },
  { id: 'extras', label: 'Extras' }
];

interface BouquetBuilder2Props {
  type?: 'bouquet' | 'gift_box';
}

export default function BouquetBuilder2({ type = 'bouquet' }: BouquetBuilder2Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTier, setSelectedTier] = useState<string>('premium');
  const [flowerCounts, setFlowerCounts] = useState<Record<string, number>>({});
  const [selectedWrapping, setSelectedWrapping] = useState<string>('frosted_white');
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>([]);

  // Calculate pricing
  const tier = TIERS.find(t => t.id === selectedTier)!;
  const currentFlowerCount = Object.values(flowerCounts).reduce((a, b) => a + b, 0);

  const totalPrice = useMemo(() => {
    let total = tier?.basePrice || 0;
    
    // Sum flowers
    Object.entries(flowerCounts).forEach(([id, count]) => {
      const flower = FLOWERS.find(f => f.id === id);
      if (flower) total += flower.price * count;
    });

    // Add wrapping
    const wrapping = WRAPPINGS.find(w => w.id === selectedWrapping);
    if (wrapping) total += wrapping.price;

    // Add decorations
    selectedDecorations.forEach(id => {
      const deco = DECORATIONS.find(d => d.id === id);
      if (deco) total += deco.price;
    });

    return total;
  }, [selectedTier, flowerCounts, selectedWrapping, selectedDecorations, tier]);

  const updateFlowerCount = (id: string, delta: number) => {
    setFlowerCounts(prev => {
      const current = prev[id] || 0;
      const newCount = Math.max(0, current + delta);
      
      if (delta > 0 && currentFlowerCount >= tier.maxFlowers) {
        return prev; // Cannot add more than max
      }
      
      const next = { ...prev, [id]: newCount };
      if (newCount === 0) delete next[id];
      return next;
    });
  };

  const toggleDecoration = (id: string) => {
    setSelectedDecorations(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  // Minimal fallback for gift_box
  if (type === 'gift_box') {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-[#FAF6F0] font-sans text-[#737a58] flex items-center justify-center">
        <div className="text-center max-w-xl">
          <h2 className="text-4xl font-serif text-[#C4A35A] mb-4">Gift Box Builder</h2>
          <p>Our custom Gift Box builder is currently under construction. Please check back later!</p>
          <img src={PREVIEWS.gift_box} alt="Gift Box" className="mt-8 rounded-xl shadow-lg w-full h-64 object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#737a58] pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-inter">
      <style>{`
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .builder-active-step { border-color: #C4A35A; background-color: #C4A35A; color: white; }
      `}</style>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN - STEPS & OPTIONS */}
        <div className="flex-1 space-y-8">
          
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl md:text-5xl font-cormorant text-[#C4A35A] font-medium mb-2">Build Your Bouquet</h1>
            <p className="font-cormorant text-xl italic opacity-80">Craft the perfect arrangement for your loved ones.</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between lg:justify-start lg:gap-8 mb-8 overflow-x-auto pb-4 custom-scrollbar">
            {STEPS.map((step, idx) => (
              <button 
                key={step.id}
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-2 pb-2 border-b-2 whitespace-nowrap transition-colors
                  ${currentStep === idx ? 'border-[#C4A35A] text-[#C4A35A] font-semibold' : 'border-transparent opacity-60 hover:opacity-100'}
                `}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs 
                  ${currentStep === idx ? 'bg-[#C4A35A] text-white' : 'bg-[#e2dfd7] text-[#737a58]'}`}
                >
                  {idx + 1}
                </div>
                <span>{step.label}</span>
              </button>
            ))}
          </div>

          {/* Step 1: Size & Tier */}
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {TIERS.map(t => (
                <div 
                  key={t.id}
                  onClick={() => { setSelectedTier(t.id); setCurrentStep(1); }}
                  className={`bg-white rounded-2xl overflow-hidden cursor-pointer border-2 transition-all hover:shadow-xl
                    ${selectedTier === t.id ? 'border-[#C4A35A] ring-4 ring-[#C4A35A]/10' : 'border-transparent'}
                  `}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-cormorant text-2xl font-bold">{t.name}</h3>
                      {selectedTier === t.id && <Check className="w-5 h-5 text-[#C4A35A]" />}
                    </div>
                    <p className="text-sm opacity-80 mb-4 h-10">{t.description}</p>
                    <div className="flex justify-between items-end border-t pt-4 border-gray-100">
                      <span className="text-xs uppercase tracking-wider">Up to {t.maxFlowers} flowers</span>
                      <span className="font-semibold text-[#C4A35A]">{formatPrice(t.basePrice)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Flowers */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-xl shadow-sm">
                <span className="font-medium">Bouquet Capacity</span>
                <div className="text-right">
                  <span className={`text-xl font-bold ${currentFlowerCount === tier.maxFlowers ? 'text-[#C4A35A]' : ''}`}>
                    {currentFlowerCount} / {tier.maxFlowers}
                  </span>
                  <span className="text-sm opacity-70 ml-2">stems selected</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FLOWERS.map(f => {
                  const count = flowerCounts[f.id] || 0;
                  return (
                    <div key={f.id} className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-4 border border-transparent hover:border-[#C4A35A]/30 transition-all">
                      <img src={f.image} alt={f.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{f.name}</h4>
                        <p className="text-sm text-[#C4A35A]">{formatPrice(f.price)}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-[#FAF6F0] rounded-lg p-1">
                        <button 
                          onClick={() => updateFlowerCount(f.id, -1)}
                          disabled={count === 0}
                          className="w-7 h-7 flex items-center justify-center rounded bg-white shadow-sm disabled:opacity-50"
                        >-</button>
                        <span className="w-4 text-center text-sm font-medium">{count}</span>
                        <button 
                          onClick={() => updateFlowerCount(f.id, 1)}
                          disabled={currentFlowerCount >= tier.maxFlowers}
                          className="w-7 h-7 flex items-center justify-center rounded bg-white shadow-sm disabled:opacity-50"
                        >+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Wrapping */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {WRAPPINGS.map(w => (
                <div 
                  key={w.id}
                  onClick={() => setSelectedWrapping(w.id)}
                  className={`bg-white rounded-xl overflow-hidden cursor-pointer border-2 transition-all text-center
                    ${selectedWrapping === w.id ? 'border-[#C4A35A] ring-2 ring-[#C4A35A]/20' : 'border-transparent'}
                  `}
                >
                  <img src={w.image} alt={w.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h4 className="font-medium text-sm mb-1">{w.name}</h4>
                    <p className="text-xs text-[#C4A35A]">{formatPrice(w.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Extras */}
          {currentStep === 3 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {DECORATIONS.map(d => {
                const isSelected = selectedDecorations.includes(d.id);
                const Icon = d.icon;
                return (
                  <div 
                    key={d.id}
                    onClick={() => toggleDecoration(d.id)}
                    className={`bg-white p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer border-2 transition-all
                      ${isSelected ? 'border-[#C4A35A] bg-[#FAF6F0]' : 'border-transparent'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${isSelected ? 'bg-[#C4A35A] text-white' : 'bg-[#FAF6F0] text-[#737a58]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{d.name}</h4>
                        <p className="text-sm opacity-70">Enhance your bouquet beautifully</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-[#C4A35A]">+{formatPrice(d.price)}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${isSelected ? 'border-[#C4A35A] bg-[#C4A35A]' : 'border-gray-300'}
                      `}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-[#737a58]/20">
            <button 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all
                ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-[#e2dfd7]'}
              `}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            {currentStep < STEPS.length - 1 && (
              <button 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-8 py-3 bg-[#737a58] text-white rounded-full hover:bg-[#5a6045] transition-all shadow-md"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - SUMMARY (Tổng Quan) */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-24 border border-[#e2dfd7]">
            <h2 className="text-2xl font-cormorant font-bold mb-6 text-center border-b pb-4">Tổng Quan<br/><span className="text-sm font-sans font-normal opacity-70 text-gray-500">Your Order Summary</span></h2>
            
            {/* Visual Preview (Mock) */}
            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative group">
              <img src={PREVIEWS.bouquet} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="space-y-4 text-sm mb-6">
              {/* Tier Summary */}
              <div className="flex justify-between items-center">
                <span className="font-semibold">{tier?.name} Base</span>
                <span>{formatPrice(tier?.basePrice || 0)}</span>
              </div>

              {/* Flowers Summary */}
              {currentFlowerCount > 0 && (
                <div className="pl-4 space-y-2 border-l-2 border-[#C4A35A]/30">
                  {Object.entries(flowerCounts).map(([id, count]) => {
                    const flower = FLOWERS.find(f => f.id === id);
                    if (!flower) return null;
                    return (
                      <div key={id} className="flex justify-between items-center text-gray-600">
                        <span>{count}x {flower.name}</span>
                        <span>{formatPrice(flower.price * count)}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Wrapping Summary */}
              <div className="flex justify-between items-center">
                <span className="opacity-80">Wrapping: {WRAPPINGS.find(w => w.id === selectedWrapping)?.name}</span>
                <span>{formatPrice(WRAPPINGS.find(w => w.id === selectedWrapping)?.price || 0)}</span>
              </div>

              {/* Decoration Summary */}
              {selectedDecorations.length > 0 && (
                <div className="pl-4 space-y-2 border-l-2 border-[#C4A35A]/30">
                  {selectedDecorations.map(id => {
                    const deco = DECORATIONS.find(d => d.id === id);
                    if (!deco) return null;
                    return (
                      <div key={id} className="flex justify-between items-center text-gray-600">
                        <span>{deco.name}</span>
                        <span>{formatPrice(deco.price)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#e2dfd7]">
              <div className="flex justify-between items-end mb-6">
                <span className="font-medium text-lg">Total</span>
                <span className="text-2xl font-bold text-[#C4A35A]">{formatPrice(totalPrice)}</span>
              </div>
              
              <button className="w-full py-4 bg-[#C4A35A] hover:bg-[#b09250] text-white rounded-full font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
