import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { collections } from '@/data/collections';
import { tools } from '@/data/tools';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CollectionsIndex: React.FC = () => {
  return (
    <Layout>
      <SeoHead 
        title="مجموعه‌های ابزار | لنگر"
        description="مجموعه‌های ویژه ابزارهای آنلاین برای دانشجوها، فریلنسرها، برنامه‌نویسان، طراحان، معلمان و صاحبان کسب‌وکار."
        keywords="مجموعه ابزار، ابزار آنلاین، لنگر، ابزار رایگان"
      />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">مجموعه‌ها</span>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            مجموعه‌های ابزار
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            ابزارهای لنگر را بر اساس نیاز و حرفه خود پیدا کنید. هر مجموعه شامل ابزارهای منتخب برای یک گروه خاص است.
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((collection, index) => {
            const toolCount = collection.toolSlugs.filter(
              slug => tools.some(t => t.slug === slug)
            ).length;

            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/collection/${collection.slug}`}
                  className="group block h-full p-6 bg-card hover:bg-secondary/50 border border-border rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl flex-shrink-0">{collection.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {collection.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {toolCount} ابزار
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          مشاهده
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center py-8 border-t border-border">
          <p className="text-muted-foreground mb-4">
            نمی‌دانید کدام مجموعه برای شماست؟
          </p>
          <Link
            to="/all-tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            مشاهده همه ابزارها
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionsIndex;
