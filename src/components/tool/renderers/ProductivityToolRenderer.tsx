
import React from 'react';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';

// Import productivity tools
import PomodoroTimer from '@/pages/ToolTypes/ProductivityTools/PomodoroTimer';
import ProjectBoard from '@/pages/ToolTypes/ProductivityTools/ProjectBoard';
import TodoList from '@/pages/ToolTypes/ProductivityTools/TodoList';
import NoteTaking from '@/pages/ToolTypes/ProductivityTools/NoteTaking';
import CalendarScheduler from '@/pages/ToolTypes/ProductivityTools/CalendarScheduler';

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
      return <TodoList />;
    case 'note-taking':
      return <NoteTaking />;
    case 'calendar-scheduler':
      return <CalendarScheduler />;
    
    default:
      return <ToolNotImplemented toolName="ابزار بهره‌وری" category="productivity" />;
  }
};
