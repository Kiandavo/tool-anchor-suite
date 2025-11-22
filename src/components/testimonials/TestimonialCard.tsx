import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  tool?: string;
  avatar?: string;
  verified?: boolean;
  date?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating,
  tool,
  avatar,
  verified = false,
  date
}) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border/50 backdrop-blur-sm h-full">
      <CardContent className="pt-6 pb-6 flex flex-col h-full">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 transition-all duration-300 ${
                i < rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Quote Icon */}
        <div className="relative mb-4">
          <Quote className="h-10 w-10 text-primary/10 absolute -top-2 -right-2" />
          <p className="text-foreground/80 leading-relaxed text-base relative z-10 persian-leading-relaxed">
            {content}
          </p>
        </div>

        {/* Tool Badge */}
        {tool && (
          <Badge 
            variant="secondary" 
            className="mb-4 w-fit text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
          >
            استفاده از: {tool}
          </Badge>
        )}

        {/* User Info - Push to bottom */}
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Name and Role */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-bold text-foreground text-base">
                  {name}
                </div>
                {verified && (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {role}
              </div>
              {date && (
                <div className="text-xs text-muted-foreground/60 mt-1">
                  {date}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
