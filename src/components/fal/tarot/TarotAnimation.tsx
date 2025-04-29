
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
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};
