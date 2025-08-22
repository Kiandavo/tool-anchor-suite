import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPersianCulturalTools } from '@/data/tools';
import { 
  BookOpen, 
  Calendar, 
  Feather, 
  Globe, 
  ArrowLeft,
  Sparkles,
  Crown,
  Scroll
} from 'lucide-react';

export const PersianCulturalHighlight = () => {
  const culturalTools = getPersianCulturalTools().slice(0, 6);
  
  const persianCalendar = {
    today: new Date().toLocaleDateString('fa-IR'),
    event: 'روز ملی کتاب و کتابخوانی',
    month: 'آبان ۱۴۰۳'
  };

  const featuredPoetry = {
    text: "دل میرود ز دستم، صاحب‌دلان خدا را",
    poet: "حافظ شیرازی",
    description: "از دیوان حافظ - غزل ۱۴۵"
  };

  const culturalHighlights = [
    {
      title: 'فرهنگ نامه',
      description: 'واژه‌های فارسی و ریشه‌شناسی',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      tools: ['etymology', 'persian-names']
    },
    {
      title: 'ادبیات کلاسیک',
      description: 'شعر و ادب فارسی',
      icon: Feather,
      color: 'from-purple-500 to-purple-600',
      tools: ['hafez-divination', 'poetry-meter']
    },
    {
      title: 'تاریخ و معماری',
      description: 'میراث فرهنگی ایران',
      icon: Crown,
      color: 'from-orange-500 to-orange-600',
      tools: ['persian-architecture', 'historical-events']
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-yellow-50/50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1400px]">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mr-4">
              <Globe className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              فرهنگ و زبان فارسی
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
            ابزارهای تخصصی برای حفظ و گسترش فرهنگ غنی ایرانی؛ از ادبیات کلاسیک تا معماری باستان
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Persian Calendar & Today */}
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-orange-900">
                <Calendar className="w-5 h-5 mr-2" />
                تقویم فارسی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-orange-900 mb-1">
                  {persianCalendar.today}
                </p>
                <p className="text-sm text-orange-700">
                  {persianCalendar.month}
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <p className="text-sm font-medium text-orange-800 mb-1">رویداد امروز</p>
                <p className="text-xs text-orange-700">{persianCalendar.event}</p>
              </div>
            </CardContent>
          </Card>

          {/* Featured Poetry */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-purple-900">
                <Scroll className="w-5 h-5 mr-2" />
                شعر روز
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <blockquote className="text-purple-900 font-medium mb-3 leading-relaxed italic">
                  "{featuredPoetry.text}"
                </blockquote>
                <div className="text-sm text-purple-700">
                  <p className="font-semibold">- {featuredPoetry.poet}</p>
                  <p className="text-xs mt-1">{featuredPoetry.description}</p>
                </div>
              </div>
              <Link
                to="/tool/hafez-divination"
                className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                فال حافظ
                <Sparkles className="w-4 h-4 mr-2" />
              </Link>
            </CardContent>
          </Card>

          {/* Quick Cultural Stats */}
          <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-green-900">
                <BookOpen className="w-5 h-5 mr-2" />
                میراث فرهنگی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-900">۱۲+</p>
                  <p className="text-sm text-green-700">ابزار فرهنگی</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-green-900">۵۰۰۰+</p>
                    <p className="text-xs text-green-700">واژه فارسی</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-green-900">۱۶</p>
                    <p className="text-xs text-green-700">بنای تاریخی</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cultural Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {culturalHighlights.map((highlight, index) => (
            <Card key={index} className="group hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${highlight.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                    <highlight.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{highlight.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-3">
                  {highlight.tools.map((tool, i) => (
                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
                <Link
                  to="/category/persian-cultural"
                  className="inline-flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform"
                >
                  کاوش ابزارها
                  <ArrowLeft className="w-4 h-4 mr-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cultural Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalTools.map((tool, index) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.slug}`}
              className="group"
            >
              <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                      <span className="text-xl">{tool.icon || '🏛️'}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            to="/category/persian-cultural"
            className="inline-flex items-center px-8 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            مشاهده همه ابزارهای فرهنگی
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};