
import React, { useState } from 'react';
import { MapPin, Phone, Instagram } from 'lucide-react';

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
    imageUrl: '/lovable-uploads/f79013b7-7545-4367-9b3b-90887c7420fd.png',
    instagramHandle: 'shemrun_outlet',
    instagramUrl: 'https://www.instagram.com/shemrun_outlet/',
    fallbackImage: '/placeholder.svg',
  },
  {
    name: 'shemrun_kicks',
    imageUrl: '/lovable-uploads/9b273012-78b9-490e-945a-6ae91cf3c24e.png',
    instagramHandle: 'shemrun_kicks',
    instagramUrl: 'https://www.instagram.com/shemrun_kicks/',
    fallbackImage: '/placeholder.svg',
  },
  {
    name: 'shem_run',
    imageUrl: '/lovable-uploads/adcebdaf-183f-482c-990a-45cf57633a10.png',
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
        
        <div className="space-y-5">
          {shops.map((shop) => (
            <div 
              key={shop.name} 
              className="bg-white rounded-xl p-5 flex flex-col md:flex-row items-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <a 
                href={shop.instagramUrl} 
                target="_blank" 
                rel="noopener" 
                className="flex-shrink-0 mb-4 md:mb-0 md:ml-5"
              >
                <img 
                  src={imgErrors[shop.name] ? shop.fallbackImage : shop.imageUrl}
                  alt={shop.name} 
                  className="w-[150px] h-[150px] rounded-lg object-cover"
                  width="150"
                  height="150"
                  loading="lazy"
                  onError={() => handleImgError(shop.name)}
                />
              </a>
              
              <div className="flex-grow">
                <ul className="space-y-3 list-none p-0 m-0">
                  <li>
                    <a 
                      href="https://maps.app.goo.gl/uPn3GnJmhhqbVN9U6" 
                      target="_blank" 
                      rel="nofollow noopener"
                      className="flex items-center text-gray-800 hover:text-primary transition-colors"
                    >
                      <MapPin className="w-5 h-5 ml-2 text-gray-600 flex-shrink-0" />
                      <span>تهران، تجریش کوچه خواجه‌نوری پ 34</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="tel:+989102325291" 
                      className="flex items-center text-gray-800 hover:text-primary transition-colors"
                    >
                      <Phone className="w-5 h-5 ml-2 text-gray-600 flex-shrink-0" />
                      <span>09102325291</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href={shop.instagramUrl} 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center text-gray-800 hover:text-primary transition-colors"
                    >
                      <Instagram className="w-5 h-5 ml-2 text-gray-600 flex-shrink-0" />
                      <span>{shop.instagramHandle}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
