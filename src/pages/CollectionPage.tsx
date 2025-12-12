import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { ToolCard } from '@/components/ToolCard';
import { tools, categoryLabels } from '@/data/tools';
import { collections, getCollectionBySlug } from '@/data/collections';
import { ChevronRight, ArrowLeft, Sparkles, Star, Wrench, TrendingUp, Zap, Grid3X3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionDecorator } from '@/components/home/SectionDecorator';
import { getCollectionTheme } from '@/data/collectionThemes';
import { Badge } from '@/components/ui/badge';

interface CollectionPageProps {
  collectionSlug?: string;
}

const CollectionPage: React.FC<CollectionPageProps> = ({ collectionSlug }) => {
  const params = useParams<{ slug: string }>();
  const slug = collectionSlug || params.slug || '';
  
  const collection = getCollectionBySlug(slug);
  const theme = collection ? getCollectionTheme(collection.slug) : null;
  
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  
  if (!collection || !theme) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">مجموعه یافت نشد</h1>
          <Link to="/" className="text-primary hover:underline">
            بازگشت به خانه
          </Link>
        </div>
      </Layout>
    );
  }

  // Get tools that exist in our tools array
  const collectionTools = collection.toolSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter(Boolean);

  // Featured tools (first 3) and rest
  const featuredTools = collectionTools.slice(0, 3);
  const remainingTools = collectionTools.slice(3);

  // Get unique categories from collection tools
  const toolCategories = [...new Set(collectionTools.map(t => t?.category))].filter(Boolean);

  // Filter tools by category
  const filteredTools = activeCategory 
    ? remainingTools.filter(t => t?.category === activeCategory)
    : remainingTools;

  // Other collections for cross-linking
  const otherCollections = collections.filter(c => c.id !== collection.id).slice(0, 4);

  return (
    <Layout>
      <SeoHead 
        title={`${collection.title} | لنگر`}
        description={collection.description}
        keywords={`ابزار آنلاین، ${collection.title}، لنگر`}
      />

      {/* Hero Section with Collection Theme */}
      <section className={`relative py-12 mb-8 bg-gradient-to-br ${theme.gradient} overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6`}>
        <SectionDecorator variant="diamonds" position="right" opacity={0.1} />
        
        {/* Animated Floating orbs */}
        <motion.div 
          className={`absolute top-10 left-[5%] w-32 h-32 rounded-full bg-gradient-to-br ${theme.gradient} blur-3xl pointer-events-none`}
          animate={{ 
            y: [0, -20, 0], 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-5 right-[10%] w-24 h-24 rounded-full bg-gradient-to-br ${theme.gradient} blur-2xl pointer-events-none`}
          animate={{ 
            y: [0, 15, 0], 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className={`absolute top-1/2 left-[30%] w-16 h-16 rounded-full bg-gradient-to-br ${theme.gradient} blur-xl pointer-events-none`}
          animate={{ 
            x: [0, 20, 0], 
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/collections" className="hover:text-foreground transition-colors">مجموعه‌ها</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{collection.title}</span>
          </nav>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-5 mb-5">
              <motion.div 
                className={`flex-shrink-0 w-20 h-20 rounded-2xl ${theme.iconBg} flex items-center justify-center text-5xl shadow-xl border border-white/20`}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                {collection.icon}
              </motion.div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {collection.title}
                </h1>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {collection.description}
                </p>
              </div>
            </div>
            
            {/* Stats badges with animations */}
            <div className="flex flex-wrap gap-3 mt-6">
              <motion.div 
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.badgeBg} ${theme.badgeText} text-sm font-medium shadow-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wrench className="w-4 h-4" />
                {collectionTools.length} ابزار
              </motion.div>
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 text-sm font-medium shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4" />
                رایگان و آنلاین
              </motion.div>
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-700 text-sm font-medium shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-4 h-4" />
                بدون ثبت‌نام
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto">
        {/* Featured Tools Section */}
        {featuredTools.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h2 className="text-lg font-semibold text-foreground">ابزارهای پیشنهادی</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {featuredTools.map((tool) => (
                tool && (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.slug}`}
                    className="group relative flex items-start gap-3 p-4 rounded-xl bg-card border border-amber-200/50 hover:border-amber-400/60 hover:shadow-sm transition-all"
                  >
                    <div className="absolute top-2 left-2">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    </div>
                    
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                      <Wrench className="w-5 h-5 text-amber-600 group-hover:text-amber-700 transition-colors" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </motion.section>
        )}

        {/* Category Filter */}
        {toolCategories.length > 1 && remainingTools.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Grid3X3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">فیلتر بر اساس دسته:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === null 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                همه ({remainingTools.length})
              </motion.button>
              {toolCategories.map((category) => {
                const count = remainingTools.filter(t => t?.category === category).length;
                if (count === 0) return null;
                return (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category === activeCategory ? null : category!)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {categoryLabels[category!]} ({count})
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All Tools Grid */}
        {remainingTools.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">سایر ابزارها</h2>
              </div>
              {activeCategory && (
                <span className="text-xs text-muted-foreground">
                  {filteredTools.length} ابزار
                </span>
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory || 'all'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {filteredTools.map((tool) => (
                  tool && (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.slug}`}
                      className="group flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Wrench className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.section>
        )}

        {/* Other Collections with themed cards */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-10 border-t border-border/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">مجموعه‌های مرتبط</h2>
            </div>
            <Link 
              to="/collections" 
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              همه مجموعه‌ها
              <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCollections.map((col, index) => {
              const colTheme = getCollectionTheme(col.slug);
              const colToolCount = col.toolSlugs.filter(s => tools.some(t => t.slug === s)).length;
              
              return (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <Link
                    to={`/collection/${col.slug}`}
                    className={`group flex flex-col h-full p-5 bg-gradient-to-br ${colTheme.gradient} border ${colTheme.borderColor} ${colTheme.hoverBorder} hover:shadow-lg rounded-xl transition-all duration-300`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl ${colTheme.iconBg} flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      >
                        <span className="text-2xl">{col.icon}</span>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {col.title}
                        </h3>
                        <span className={`text-xs ${colTheme.badgeText}`}>{colToolCount} ابزار</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{col.description}</p>
                    <div className="mt-3 pt-3 border-t border-border/30 flex justify-end">
                      <span className="text-xs text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors">
                        مشاهده
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Back Link */}
        <motion.div 
          className="mt-12 pt-6 border-t border-border/30 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/all-tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            مشاهده همه ابزارها
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CollectionPage;
