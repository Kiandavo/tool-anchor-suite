import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getNewTools } from '@/data/tools';
import { SectionDecorator } from './SectionDecorator';

export const NewToolsSection: React.FC = () => {
  const newTools = getNewTools().slice(0, 6);

  if (newTools.length === 0) return null;

  return (
    <section className="relative py-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-persian-gold/3 pointer-events-none" />
      
      {/* Decorative elements */}
      <SectionDecorator variant="stars" position="both" opacity={0.1} />
      
      {/* Floating orbs */}
      <div className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-persian-gold/10 to-transparent blur-2xl animate-float pointer-events-none" style={{ animationDelay: '-1.5s' }} />
      
      <div className="container-narrow relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              ابزارهای جدید
            </h2>
          </div>
          <Link 
            to="/all-tools?sort=newest"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            مشاهده همه
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {newTools.map((tool, index) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="group relative flex flex-col items-center p-4 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              
              {/* New badge */}
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-sm">
                جدید
              </span>
              
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 relative z-10">
                {tool.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
