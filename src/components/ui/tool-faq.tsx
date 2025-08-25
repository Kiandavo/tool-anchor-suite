import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export const ToolFAQ: React.FC<ToolFAQProps> = ({ 
  faqs, 
  title = "سوالات متداول",
  className 
}) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-right">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};