import React from 'react';
import { Card } from './card';
import { BookOpen, ArrowLeft } from 'lucide-react';

interface GuideStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
}

interface UsageGuideProps {
  steps: GuideStep[];
  title?: string;
  className?: string;
}

export const UsageGuide: React.FC<UsageGuideProps> = ({ 
  steps, 
  title = "راهنمای استفاده",
  className 
}) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                  {step.step}
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <h4 className="font-medium text-foreground">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                {step.tip && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-primary/20 text-primary rounded flex items-center justify-center mt-0.5">
                        <span className="text-xs">💡</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">نکته:</span> {step.tip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-shrink-0 mt-2">
                  <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};