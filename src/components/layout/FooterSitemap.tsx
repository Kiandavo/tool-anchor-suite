import React from 'react';
import { Link } from 'react-router-dom';
import { getFooterLinks } from '@/utils/internal-linking';
import { Instagram } from 'lucide-react';
import logoSvg from '@/assets/langar-logo-40.png';

export function FooterSitemap() {
  const footerCategories = getFooterLinks();

  return (
    <footer className="mt-auto py-12 border-t border-border/50 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {footerCategories.map((category) => (
            <div key={category.category}>
              <h3 className="font-bold text-foreground mb-4 text-sm">{category.category}</h3>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      to={link.url}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      title={link.title}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Additional Links Column */}
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm">لنگر</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  to="/all-tools"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  همه ابزارها
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/kiandavo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Instagram size={14} />
                  اینستاگرام
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-3">
              <img src={logoSvg} alt="لنگر" width={40} height={40} className="h-10 w-auto" />
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © ۱۴۰۴ لنگر - تمامی حقوق محفوظ است
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link to="/category/calculators" className="text-muted-foreground hover:text-primary transition-colors">
                محاسبه‌گرها
              </Link>
              <span className="text-border">•</span>
              <Link to="/category/text" className="text-muted-foreground hover:text-primary transition-colors">
                ابزار متن
              </Link>
              <span className="text-border">•</span>
              <Link to="/category/seo" className="text-muted-foreground hover:text-primary transition-colors">
                سئو
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
