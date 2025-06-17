
import React from 'react';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';

// Import productivity tools
import PomodoroTimer from '@/pages/ToolTypes/ProductivityTools/PomodoroTimer';
import ProjectBoard from '@/pages/ToolTypes/ProductivityTools/ProjectBoard';

interface ProductivityToolRendererProps {
  slug: string;
}

export const ProductivityToolRenderer: React.FC<ProductivityToolRendererProps> = ({ slug }) => {
  switch (slug) {
    case 'pomodoro-timer':
      return <PomodoroTimer />;
    
    case 'project-board':
      return <ProjectBoard />;
    
    case 'todo-list':
    case 'note-taking':
    case 'calendar-scheduler':
      return <ToolNotImplemented toolName="این ابزار بهره‌وری" category="productivity" />;
    
    default:
      return <ToolNotImplemented toolName="ابزار بهره‌وری" category="productivity" />;
  }
};
