import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { collections } from '@/data/collections';
import { ArrowLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { CollectionCard } from '@/components/collections/CollectionCard';

const CollectionsIndex: React.FC = () => {
  return (
    <Layout>
      <SeoHead 
        title="مجموعه‌های ابزار | لنگر"
        description="مجموعه‌های ویژه ابزارهای آنلاین برای دانشجوها، فریلنسرها، برنامه‌نویسان، طراحان، معلمان و صاحبان کسب‌وکار."
        keywords="مجموعه ابزار، ابزار آنلاین، لنگر، ابزار رایگان"
      />

      <div className="max-w-6xl mx-auto">
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            <span>مجموعه‌های تخصصی</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            ابزارهای لنگر برای هر نیاز
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            مجموعه‌های منتخب ابزارها بر اساس حرفه و نیاز شما. هر مجموعه شامل ابزارهای کاربردی برای یک گروه خاص است.
          </p>
        </motion.div>

        {/* Featured Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-medium text-muted-foreground">
            {collections.length} مجموعه تخصصی
          </span>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
              featured={index < 3}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center py-10 px-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border border-primary/20"
        >
          <h2 className="text-xl font-bold text-foreground mb-3">
            نمی‌دانید کدام مجموعه برای شماست؟
          </h2>
          <p className="text-muted-foreground mb-6">
            همه ابزارهای لنگر را در یک نگاه ببینید و ابزار مناسب خود را پیدا کنید.
          </p>
          <Link
            to="/all-tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            مشاهده همه ابزارها
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CollectionsIndex;
