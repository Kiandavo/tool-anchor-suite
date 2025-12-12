import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface ReadingGuideButtonProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const ReadingGuideButton: React.FC<ReadingGuideButtonProps> = ({
  title,
  description,
  icon: Icon,
  children,
  className = "",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          className={`text-foreground/80 cursor-help text-sm inline-flex items-center bg-background/50 px-3 py-1.5 rounded-full border border-border/50 hover:bg-background/80 hover:text-foreground transition-all duration-300 ${className}`}
        >
          <CircleHelp size={16} className="ml-1.5" />
          راهنما
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto text-right">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-lg">
            {Icon && <Icon size={18} className="text-primary" />}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
