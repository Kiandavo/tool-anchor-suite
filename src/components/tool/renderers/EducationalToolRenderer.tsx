
import React from 'react';
import PersianPoetryAnalyzer from '@/pages/ToolTypes/EducationalTools/PersianPoetryAnalyzer';
import LanguageLearning from '@/pages/ToolTypes/EducationalTools/LanguageLearning';
import EquationSolver from '@/pages/ToolTypes/EducationalTools/EquationSolver';
import HistoricalTimeline from '@/pages/ToolTypes/EducationalTools/HistoricalTimeline';
import QuizGenerator from '@/pages/ToolTypes/EducationalTools/QuizGenerator';
import ToolNotImplemented from '@/pages/ToolTypes/ToolNotImplemented';

interface EducationalToolRendererProps {
  slug: string;
}

export const EducationalToolRenderer: React.FC<EducationalToolRendererProps> = ({ slug }) => {
  switch (slug) {
    case 'persian-poetry-analyzer':
      return <PersianPoetryAnalyzer />;
    case 'language-learning':
      return <LanguageLearning />;
    case 'equation-solver':
      return <EquationSolver />;
    case 'historical-timeline':
      return <HistoricalTimeline />;
    case 'quiz-generator':
      return <QuizGenerator />;
    default:
      return <ToolNotImplemented toolName="این ابزار آموزشی" category="educational" />;
  }
};
