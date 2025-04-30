
import React, { useEffect } from 'react';

export const TarotAnimation: React.FC = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .perspective-card {
        perspective: 1000px;
      }
      .tarot-card {
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }
      .tarot-card-front, .tarot-card-back {
        backface-visibility: hidden;
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transition: box-shadow 0.3s ease;
      }
      .tarot-card-back {
        transform: rotateY(180deg);
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
      .glass-card {
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.2);
      }
      .tarot-card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.375rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }
      .tarot-card-image:hover {
        opacity: 1;
      }
      .tarot-card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(20, 58, 92, 0.3);
        border-radius: 0.375rem;
        transition: background-color 0.3s ease;
      }
      .tarot-card-front:hover .tarot-card-overlay {
        background-color: rgba(20, 58, 92, 0.5);
      }
      .hover-shadow-glow:hover {
        box-shadow: 0 0 15px rgba(176, 200, 230, 0.5);
      }
      .shadow-glow {
        box-shadow: 0 0 10px rgba(176, 200, 230, 0.3);
      }
      @keyframes float {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0px);
        }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      @keyframes fade-in {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .tarot-card-enter {
        animation: fade-in 0.8s ease-out forwards;
      }
      @keyframes mystical-glow {
        0% { box-shadow: 0 0 5px rgba(176, 200, 230, 0.3); }
        50% { box-shadow: 0 0 15px rgba(176, 200, 230, 0.7); }
        100% { box-shadow: 0 0 5px rgba(176, 200, 230, 0.3); }
      }
      .mystical-glow {
        animation: mystical-glow 3s infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};
