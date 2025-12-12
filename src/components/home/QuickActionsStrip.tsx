import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Sparkles, QrCode, FileText, Calculator, Lock } from 'lucide-react';

const quickActions = [
  { slug: 'bmi-calculator', name: 'محاسبه BMI', icon: Scale },
  { slug: 'hafez-fortune', name: 'فال حافظ', icon: Sparkles },
  { slug: 'qr-code-generator', name: 'ساخت QR', icon: QrCode },
  { slug: 'text-counter', name: 'شمارش کلمات', icon: FileText },
  { slug: 'percentage-calculator', name: 'محاسبه درصد', icon: Calculator },
  { slug: 'password-generator', name: 'ساخت رمز', icon: Lock },
];

export const QuickActionsStrip = () => {
  return (
    <section className="py-4 border-b border-border/50">
      <div className="container-narrow">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.slug}
                to={`/tool/${action.slug}`}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 border border-transparent hover:border-primary/20 text-xs font-medium text-foreground hover:text-primary transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{action.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
