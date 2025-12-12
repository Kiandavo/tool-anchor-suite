import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { ToolCard } from '@/components/ToolCard';
import { tools } from '@/data/tools';
import { collections, getCollectionBySlug } from '@/data/collections';
import { ChevronRight, ArrowLeft, Sparkles, Star, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionDecorator } from '@/components/home/SectionDecorator';

interface CollectionPageProps {
  collectionSlug?: string;
}

const CollectionPage: React.FC<CollectionPageProps> = ({ collectionSlug }) => {
  const params = useParams<{ slug: string }>();
  const slug = collectionSlug || params.slug || '';
  
  const collection = getCollectionBySlug(slug);
  
  if (!collection) {
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

  // Other collections for cross-linking
  const otherCollections = collections.filter(c => c.id !== collection.id).slice(0, 4);

  return (
    <Layout>
      <SeoHead 
        title={`${collection.title} | لنگر`}
        description={collection.description}
        keywords={`ابزار آنلاین، ${collection.title}، لنگر`}
      />

      {/* Hero Section */}
      <section className="relative py-12 mb-8 bg-gradient-to-br from-primary/5 via-background to-persian-turquoise/5 overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6">
        <SectionDecorator variant="diamonds" position="right" opacity={0.1} />
        
        {/* Floating orbs */}
        <div className="absolute top-10 left-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-5 right-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-persian-gold/10 to-transparent blur-2xl animate-float pointer-events-none" style={{ animationDelay: '-1.5s' }} />
        
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
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-4xl shadow-lg">
                {collection.icon}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {collection.title}
                </h1>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {collection.description}
                </p>
              </div>
            </div>
            
            {/* Stats badges */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Wrench className="w-4 h-4" />
                {collectionTools.length} ابزار
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-persian-gold/10 text-persian-gold text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                رایگان و آنلاین
              </div>
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
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-5 h-5 text-persian-gold fill-persian-gold" />
              <h2 className="text-lg font-semibold text-foreground">ابزارهای پیشنهادی</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featuredTools.map((tool, index) => (
                tool && (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-persian-gold text-white text-xs font-medium shadow-md">
                        <Star className="w-3 h-3 fill-current" />
                        پیشنهادی
                      </span>
                    </div>
                    <div className="ring-2 ring-persian-gold/30 rounded-xl overflow-hidden">
                      <ToolCard tool={tool} />
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </motion.section>
        )}

        {/* All Tools Grid */}
        {remainingTools.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-5">
              <Wrench className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">سایر ابزارها</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {remainingTools.map((tool, index) => (
                tool && (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.03 }}
                  >
                    <ToolCard tool={tool} />
                  </motion.div>
                )
              ))}
            </div>
          </motion.section>
        )}

        {/* Other Collections */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-border/50"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-foreground">مجموعه‌های مرتبط</h2>
            <Link 
              to="/collections" 
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              همه مجموعه‌ها
              <ArrowLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCollections.map((col, index) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link
                  to={`/collection/${col.slug}`}
                  className="group flex flex-col p-4 bg-card border border-border/50 hover:border-primary/30 hover:shadow-md rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{col.icon}</span>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {col.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{col.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Back Link */}
        <div className="mt-10 pt-6 border-t border-border/30 text-center">
          <Link
            to="/all-tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            مشاهده همه ابزارها
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionPage;
