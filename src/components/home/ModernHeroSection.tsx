import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from '@/components/ui/search-box';
import { Card, CardContent } from '@/components/ui/card';
import { getPopularTools, tools } from '@/data/tools';
import { 
  Calculator, 
  Type, 
  Image, 
  Search, 
  TrendingUp, 
  Users,
  Clock,
  Star,
  Zap,
  BookOpen,
  ArrowLeft
} from 'lucide-react';

export const ModernHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalTools: 0,
    dailyUsers: 1250,
    completedTasks: 15680
  });

  useEffect(() => {
    setStats({
      totalTools: tools.length,
      dailyUsers: 1250 + Math.floor(Math.random() * 100),
      completedTasks: 15680 + Math.floor(Math.random() * 200)
    });
  }, []);

  const popularTools = getPopularTools().slice(0, 6);

  const quickCategories = [
    { icon: Calculator, label: 'محاسبه‌گر', href: '/category/calculators', color: 'from-blue-500 to-blue-600' },
    { icon: Type, label: 'متن', href: '/category/text', color: 'from-green-500 to-green-600' },
    { icon: Image, label: 'تصویر', href: '/category/image', color: 'from-purple-500 to-purple-600' },
    { icon: BookOpen, label: 'فرهنگ فارسی', href: '/category/persian-cultural', color: 'from-orange-500 to-orange-600' }
  ];

  const persianQuote = {
    text: "هر چه بر دل خواهی آمد، همان خواهد آمد بر سر",
    author: "حافظ شیرازی"
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Navigate to all tools with search query
      window.location.href = `/all-tools?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 pt-8 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-purple-200/15 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/2 w-64 h-64 bg-green-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1400px] relative z-10">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              لنگر
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground">
              مجموعه ابزارهای آنلاین
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            بیش از {stats.totalTools} ابزار آنلاین رایگان برای محاسبات، ویرایش متن، پردازش تصویر و فرهنگ ایرانی
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <SearchBox 
                onSearch={handleSearch}
                placeholder="جستجو در ابزارها... (مثال: محاسبه‌گر، QR کد)"
                className="w-full"
              />
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link 
              to="/all-tools" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Search className="w-4 h-4 mr-2" />
              مشاهده همه ابزارها
            </Link>
            <Link 
              to="#popular-tools" 
              className="inline-flex items-center px-6 py-3 bg-card text-card-foreground border border-border rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              ابزارهای محبوب
            </Link>
          </div>
        </div>

        {/* Stats and Quick Access Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Stats Cards */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              آمار لنگر
            </h3>
            <div className="space-y-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="w-8 h-8 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">ابزارها</p>
                        <p className="text-xl font-bold text-foreground">{stats.totalTools}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">کاربر امروز</p>
                        <p className="text-xl font-bold text-foreground">{stats.dailyUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-8 h-8 text-purple-500 mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">کار انجام شده</p>
                        <p className="text-xl font-bold text-foreground">{stats.completedTasks.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary" />
              دسترسی سریع
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {quickCategories.map((category, index) => (
                <Link
                  key={index}
                  to={category.href}
                  className="group"
                >
                  <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200 h-full">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-medium text-foreground">{category.label}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Persian Cultural Element & Popular Tools Preview */}
          <div className="lg:col-span-1">
            {/* Daily Persian Quote */}
            <Card className="mb-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/50">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-900 mb-2">حکمت روز</p>
                <p className="text-sm text-orange-800 italic leading-relaxed">
                  "{persianQuote.text}"
                </p>
                <p className="text-xs text-orange-600 mt-2">- {persianQuote.author}</p>
              </CardContent>
            </Card>

            {/* Quick Popular Tools */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary" />
                ابزارهای محبوب
              </h3>
              <div className="space-y-2">
                {popularTools.slice(0, 3).map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.slug}`}
                    className="block group"
                  >
                    <Card className="hover:shadow-md transition-all duration-200">
                      <CardContent className="p-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                            <span className="text-primary text-sm">
                              {tool.icon || tool.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {tool.name}
                            </p>
                          </div>
                          <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                <Link
                  to="/all-tools"
                  className="block text-center py-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  مشاهده همه ابزارهای محبوب ←
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};