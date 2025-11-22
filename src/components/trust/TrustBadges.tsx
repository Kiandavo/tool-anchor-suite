import React from 'react';
import { Shield, Lock, CheckCircle, Award, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  className?: string;
}

export function TrustBadges({ variant = 'horizontal', className = '' }: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      title: 'امنیت SSL',
      description: 'ارتباط امن و رمزنگاری شده'
    },
    {
      icon: Lock,
      title: 'حفظ حریم خصوصی',
      description: 'بدون ذخیره‌سازی داده‌های شخصی'
    },
    {
      icon: CheckCircle,
      title: 'تأیید شده',
      description: 'کیفیت تضمین شده'
    },
    {
      icon: Users,
      title: '+500,000 کاربر',
      description: 'اعتماد میلیون‌ها کاربر'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
        {badges.map((badge, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="flex items-center gap-2 px-3 py-1.5"
          >
            <badge.icon className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">{badge.title}</span>
          </Badge>
        ))}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <badge.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-0.5">
                {badge.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {badge.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-200"
        >
          <div className="p-3 bg-primary/10 rounded-full mb-3">
            <badge.icon className="w-6 h-6 text-primary" />
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">
            {badge.title}
          </h4>
          <p className="text-xs text-muted-foreground">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SecuritySeals({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
        <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
        <div className="text-right">
          <div className="text-xs font-semibold text-green-800 dark:text-green-200">
            SSL Secure
          </div>
          <div className="text-[10px] text-green-600 dark:text-green-400">
            256-bit Encryption
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <div className="text-right">
          <div className="text-xs font-semibold text-blue-800 dark:text-blue-200">
            حریم خصوصی
          </div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400">
            بدون ذخیره‌سازی
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
        <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <div className="text-right">
          <div className="text-xs font-semibold text-purple-800 dark:text-purple-200">
            کیفیت تضمینی
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400">
            98% رضایت
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
        <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        <div className="text-right">
          <div className="text-xs font-semibold text-orange-800 dark:text-orange-200">
            پشتیبانی 24/7
          </div>
          <div className="text-[10px] text-orange-600 dark:text-orange-400">
            همیشه در دسترس
          </div>
        </div>
      </div>
    </div>
  );
}
