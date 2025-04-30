
import React, { useState } from 'react';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ShopProps {
  name: string;
  imageUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  fallbackImage?: string;
}

const shops: ShopProps[] = [
  {
    name: 'shemrun_outlet',
    imageUrl: '/lovable-uploads/a177cf05-4280-4681-b94f-08c52a0d39c0.png',
    instagramHandle: 'shemrun_outlet',
    instagramUrl: 'https://www.instagram.com/shemrun_outlet/',
    fallbackImage: '/placeholder.svg',
  },
  {
    name: 'shemrun_kicks',
    imageUrl: '/lovable-uploads/3e290d5a-5677-4b4e-b12e-889f6b90c7e5.png',
    instagramHandle: 'shemrun_kicks',
    instagramUrl: 'https://www.instagram.com/shemrun_kicks/',
    fallbackImage: '/placeholder.svg',
  },
  {
    name: 'shem_run',
    imageUrl: '/lovable-uploads/d09d799c-1dc8-44fc-a423-f435a3ae8771.png',
    instagramHandle: 'shem_run',
    instagramUrl: 'https://www.instagram.com/shem_run/',
    fallbackImage: '/placeholder.svg',
  },
];

export const AdvertisementSection = () => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  
  const handleImgError = (shopName: string) => {
    setImgErrors(prev => ({
      ...prev,
      [shopName]: true
    }));
  };

  return (
    <section className="py-8 md:py-12 mb-8 relative overflow-hidden animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            تبلیغات
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {shops.map((shop) => (
            <Card key={shop.name} className="overflow-hidden neo-glass hover:shadow-lg transition-all duration-300">
              <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <a href={shop.instagramUrl} target="_blank" rel="nofollow noopener" className="block">
                    <img 
                      src={imgErrors[shop.name] ? shop.fallbackImage : shop.imageUrl}
                      alt={shop.name} 
                      className="w-24 h-24 rounded-lg object-cover border border-white/30"
                      width="150"
                      height="150"
                      loading="lazy"
                      onError={() => handleImgError(shop.name)}
                    />
                  </a>
                </div>
                
                <div className="flex-grow text-center md:text-right">
                  <ul className="space-y-3">
                    <li>
                      <a 
                        href="https://maps.app.goo.gl/uPn3GnJmhhqbVN9U6" 
                        target="_blank" 
                        rel="nofollow noopener"
                        className="flex items-center justify-center md:justify-end gap-2 text-sm hover:text-primary transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>تهران،‎تجریش کوچه خواجه‌نوری پ 34</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="tel:+989102325291" 
                        target="_blank" 
                        rel="nofollow"
                        className="flex items-center justify-center md:justify-end gap-2 text-sm hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>09102325291</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href={shop.instagramUrl} 
                        target="_blank" 
                        rel="noopener"
                        className="flex items-center justify-center md:justify-end gap-2 text-sm hover:text-primary transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                        <span>{shop.instagramHandle}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
