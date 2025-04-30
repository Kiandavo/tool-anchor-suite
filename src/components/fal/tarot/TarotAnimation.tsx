
import React, { useEffect } from 'react';

export const TarotAnimation: React.FC = () => {
  useEffect(() => {
    // Create the style element for animations
    const style = document.createElement('style');
    style.innerHTML = `
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
      
      @keyframes pulse-slow {
        0% { opacity: 0.3; }
        50% { opacity: 0.7; }
        100% { opacity: 0.3; }
      }

      .perspective-card {
        perspective: 1200px;
      }
      .tarot-card {
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .tarot-card-front, .tarot-card-back {
        backface-visibility: hidden;
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transition: box-shadow 0.3s ease, transform 0.2s ease;
      }
      .tarot-card-back {
        transform: rotateY(180deg);
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
      .glass-card {
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.3);
      }
      .icon-container {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .tarot-card-front:hover .icon-container {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(20, 58, 92, 0.2);
      }
      .hover-shadow-glow:hover {
        box-shadow: 0 0 15px rgba(176, 200, 230, 0.7);
      }
      .shadow-glow {
        box-shadow: 0 0 12px rgba(176, 200, 230, 0.5);
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
      
      .animate-pulse-slow {
        animation: pulse-slow 4s ease-in-out infinite;
      }
      
      .tarot-card-enter {
        animation: fade-in 0.8s ease-out forwards;
      }
      
      @keyframes mystical-glow {
        0% { box-shadow: 0 0 8px rgba(176, 200, 230, 0.5); }
        50% { box-shadow: 0 0 20px rgba(176, 200, 230, 0.8); }
        100% { box-shadow: 0 0 8px rgba(176, 200, 230, 0.5); }
      }
      
      .mystical-glow {
        animation: mystical-glow 3s infinite;
      }
      
      @keyframes sparkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      
      .sparkle {
        animation: sparkle 2s infinite;
        transform-origin: center;
        display: inline-block;
      }
      
      @keyframes rotate-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .rotate-slow {
        animation: rotate-slow 20s linear infinite;
      }
      
      @keyframes drift {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-5px) translateX(5px); }
        50% { transform: translateY(0) translateX(10px); }
        75% { transform: translateY(5px) translateX(5px); }
      }
      
      .drift {
        animation: drift 10s ease-in-out infinite;
      }
      
      .card-shimmer {
        position: relative;
        overflow: hidden;
      }
      
      .card-shimmer::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          to bottom right,
          rgba(255,255,255,0) 0%,
          rgba(255,255,255,0.1) 50%,
          rgba(255,255,255,0) 100%
        );
        transform: rotate(30deg);
        animation: shimmer 3s infinite;
        pointer-events: none;
      }
      
      @keyframes shimmer {
        0% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(30deg); }
      }
    `;

    // Append the style to document head
    document.head.appendChild(style);
    console.log('Enhanced tarot animation styles loaded');
    
    // Cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};
