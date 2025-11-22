import React from 'react';
import { Users, Star, Award, TrendingUp } from 'lucide-react';

export const TestimonialStats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '+۱۰۰,۰۰۰',
      label: 'کاربر فعال',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Star,
      value: '۴.۹/۵',
      label: 'امتیاز کاربران',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      icon: Award,
      value: '+۱۲۰',
      label: 'ابزار رایگان',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: TrendingUp,
      value: '۲۴/۷',
      label: 'در دسترس',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-card border border-border/50 p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Background Glow Effect */}
            <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-3 transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
