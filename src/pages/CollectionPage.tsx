import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { ToolCard } from '@/components/ToolCard';
import { tools } from '@/data/tools';
import { collections, getCollectionBySlug } from '@/data/collections';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Other collections for cross-linking
  const otherCollections = collections.filter(c => c.id !== collection.id);

  return (
    <Layout>
      <SeoHead 
        title={`${collection.title} | لنگر`}
        description={collection.description}
        keywords={`ابزار آنلاین، ${collection.title}، لنگر`}
      />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{collection.title}</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{collection.icon}</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {collection.title}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {collection.description}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {collectionTools.length} ابزار در این مجموعه
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12"
        >
          {collectionTools.map((tool, index) => (
            tool && (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            )
          ))}
        </motion.div>

        {/* Other Collections */}
        <div className="pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">مجموعه‌های دیگر</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {otherCollections.map(col => (
              <Link
                key={col.id}
                to={`/collection/${col.slug}`}
                className="flex items-center gap-3 p-4 bg-secondary/40 hover:bg-secondary/70 rounded-lg transition-colors"
              >
                <span className="text-2xl">{col.icon}</span>
                <div>
                  <h3 className="font-medium text-foreground">{col.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{col.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/all-tools"
            className="inline-flex items-center gap-2 text-primary hover:underline"
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
