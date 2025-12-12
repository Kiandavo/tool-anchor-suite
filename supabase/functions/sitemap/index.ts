import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

// Category URL mapping (must match frontend getCategoryUrl)
const categoryToSlugMap: Record<string, string> = {
  'calculators': 'calculators',
  'text': 'text-tools',
  'image': 'image-tools',
  'persian-cultural': 'persian-tools',
  'readings': 'readings',
  'seo': 'seo-tools',
  'random': 'random-tools',
  'number': 'number-tools',
  'educational': 'educational-tools',
  'productivity': 'productivity-tools',
  'design': 'design-tools',
};

// All tool slugs organized by category
const toolsByCategory: Record<string, { slug: string; isNew?: boolean }[]> = {
  calculators: [
    { slug: "percentage-calculator" },
    { slug: "loan-calculator" },
    { slug: "age-calculator" },
    { slug: "bmi-calculator" },
    { slug: "salary-tax-calculator" },
    { slug: "discount-calculator" },
    { slug: "unit-converter" },
    { slug: "date-difference" },
    { slug: "tip-calculator" },
    { slug: "area-calculator" },
    { slug: "volume-calculator" },
    { slug: "calorie-calculator" },
    { slug: "weight-converter" },
    { slug: "length-converter" },
    { slug: "speed-calculator" },
    { slug: "time-calculator" },
    { slug: "mortgage-calculator" },
    { slug: "investment-calculator" },
    { slug: "power-calculator" },
    { slug: "gpa-calculator" },
    { slug: "scientific-calculator", isNew: true },
    { slug: "today-date", isNew: true },
    { slug: "world-time", isNew: true },
    { slug: "profit-calculator", isNew: true },
    { slug: "rent-factors-calculator", isNew: true },
  ],
  text: [
    { slug: "text-analyzer", isNew: true },
    { slug: "text-counter" },
    { slug: "text-to-uppercase" },
    { slug: "text-to-lowercase" },
    { slug: "text-reverser" },
    { slug: "capitalize-text" },
    { slug: "remove-empty-lines" },
    { slug: "text-repeater" },
    { slug: "html-encoder-decoder" },
    { slug: "url-encoder-decoder" },
    { slug: "base64-encoder-decoder" },
    { slug: "text-binary-converter" },
    { slug: "text-translator" },
    { slug: "number-converter-persian-english" },
    { slug: "non-persian-remover" },
    { slug: "persian-text-normalizer" },
    { slug: "text-analysis" },
    { slug: "finglish-converter" },
    { slug: "enhanced-finglish-converter" },
    { slug: "special-char-remover" },
    { slug: "deepseek-ai", isNew: true },
  ],
  image: [
    { slug: "image-compressor", isNew: true },
    { slug: "image-to-webp" },
    { slug: "image-to-jpg" },
    { slug: "image-to-png" },
    { slug: "image-cropper" },
    { slug: "image-rotate" },
    { slug: "image-flip" },
    { slug: "image-blur" },
    { slug: "image-resizer" },
    { slug: "image-grayscale" },
    { slug: "photo-dimensions-finder" },
    { slug: "svg-to-png-converter" },
    { slug: "image-invert", isNew: true },
  ],
  "persian-cultural": [
    { slug: "persian-calendar", isNew: true },
    { slug: "persian-names", isNew: true },
    { slug: "persian-proverbs", isNew: true },
    { slug: "persian-handwriting", isNew: true },
    { slug: "word-etymology", isNew: true },
    { slug: "farsi-learning", isNew: true },
    { slug: "persian-literature", isNew: true },
    { slug: "persian-music", isNew: true },
    { slug: "persian-cuisine", isNew: true },
    { slug: "persian-holidays", isNew: true },
    { slug: "persian-architecture", isNew: true },
    { slug: "persian-poetry-analysis", isNew: true },
    { slug: "persian-date-events", isNew: true },
    { slug: "persian-regional-dialects", isNew: true },
    { slug: "traditional-persian-games", isNew: true },
  ],
  readings: [
    { slug: "hafez-fortune", isNew: true },
    { slug: "tarot-reading", isNew: true },
    { slug: "horoscope" },
    { slug: "daily-horoscope", isNew: true },
    { slug: "rumi-istikhara", isNew: true },
    { slug: "shahname-reading", isNew: true },
    { slug: "persian-superstitions", isNew: true },
    { slug: "parallel-universe", isNew: true },
    { slug: "name-numerology", isNew: true },
    { slug: "coffee-reading", isNew: true },
    { slug: "numerology", isNew: true },
    { slug: "palm-reading", isNew: true },
    { slug: "aura-reading", isNew: true },
    { slug: "cartomancy", isNew: true },
    { slug: "coin-oracle", isNew: true },
    { slug: "color-reading", isNew: true },
    { slug: "music-fortune", isNew: true },
    { slug: "birth-chart", isNew: true },
    { slug: "crystal-ball", isNew: true },
    { slug: "life-path-numerology", isNew: true },
    { slug: "saadi-oracle", isNew: true },
    { slug: "rune-casting", isNew: true },
    { slug: "compatibility-reading", isNew: true },
    { slug: "chakra-reading", isNew: true },
  ],
  seo: [
    { slug: "meta-tag-generator" },
    { slug: "html-meta-tags" },
    { slug: "robots-txt-generator" },
    { slug: "utm-builder" },
    { slug: "keyword-density" },
    { slug: "open-graph-generator" },
    { slug: "sitemap-generator" },
    { slug: "favicon-generator" },
    { slug: "page-title-check" },
    { slug: "canonical-check" },
    { slug: "alt-text-analyzer" },
    { slug: "friendly-url-checker" },
    { slug: "heading-structure-checker" },
    { slug: "seo-title-case" },
    { slug: "auto-shorten-link" },
    { slug: "meta-description-suggester" },
    { slug: "alt-attribute-generator" },
    { slug: "bulk-url-checker" },
    { slug: "seo-redirect-generator" },
    { slug: "meta-viewport-checker" },
    { slug: "html-heading-extractor" },
    { slug: "social-tags-generator" },
    { slug: "meta-refresh-generator" },
    { slug: "schema-generator" },
    { slug: "html-lang-checker" },
    { slug: "meta-keywords-extractor" },
  ],
  random: [
    { slug: "password-generator" },
    { slug: "qr-code-generator" },
    { slug: "random-color-generator" },
    { slug: "random-string" },
    { slug: "random-date" },
    { slug: "random-number" },
    { slug: "random-picker" },
    { slug: "random-emoji-generator" },
    { slug: "random-word-generator" },
    { slug: "random-quote-generator" },
    { slug: "random-username-generator" },
    { slug: "random-qrcode-generator" },
    { slug: "random-array-shuffler" },
    { slug: "random-team-generator" },
    { slug: "random-card-picker" },
    { slug: "random-nickname-generator" },
    { slug: "random-decision-maker" },
    { slug: "random-movie-picker" },
    { slug: "random-recipe-generator" },
  ],
  number: [
    { slug: "number-converter" },
    { slug: "roman-numeral-converter" },
    { slug: "number-formatter" },
    { slug: "number-rounder" },
    { slug: "sum-calculator" },
    { slug: "prime-checker" },
    { slug: "random-number-picker" },
    { slug: "fibonacci-finder" },
    { slug: "even-number-list" },
    { slug: "odd-number-list" },
    { slug: "number-shuffler" },
    { slug: "number-comparator" },
    { slug: "duplicate-number-finder" },
    { slug: "perfect-number-checker" },
    { slug: "palindrome-number-checker" },
    { slug: "armstrong-number-checker" },
    { slug: "gcd-calculator" },
    { slug: "lcm-calculator" },
    { slug: "factors-finder" },
    { slug: "binary-operations" },
  ],
  educational: [
    { slug: "persian-poetry-analyzer", isNew: true },
    { slug: "language-learning", isNew: true },
    { slug: "equation-solver", isNew: true },
    { slug: "historical-timeline", isNew: true },
    { slug: "quiz-generator", isNew: true },
  ],
  productivity: [
    { slug: "todo-list", isNew: true },
    { slug: "pomodoro-timer", isNew: true },
    { slug: "note-taking", isNew: true },
    { slug: "calendar-scheduler", isNew: true },
    { slug: "project-board", isNew: true },
  ],
  design: [
    { slug: "color-palette-generator", isNew: true },
  ],
};

const baseUrl = "https://laangar.com";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function generateMainSitemap(): string {
  const today = getToday();

  // Static pages
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/all-tools", priority: "0.9", changefreq: "daily" },
    { url: "/about-us", priority: "0.7", changefreq: "monthly" },
    { url: "/blog", priority: "0.8", changefreq: "weekly" },
    { url: "/faq", priority: "0.6", changefreq: "monthly" },
    { url: "/privacy-policy", priority: "0.4", changefreq: "yearly" },
    { url: "/terms-of-service", priority: "0.4", changefreq: "yearly" },
    { url: "/contact", priority: "0.5", changefreq: "monthly" },
  ];

  const staticXml = staticPages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  // Category pages
  const categoryXml = Object.entries(categoryToSlugMap)
    .map(
      ([_, slug]) => `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${categoryXml}
</urlset>`;
}

function generateToolsSitemap(): string {
  const today = getToday();

  const allTools: { slug: string; category: string; isNew?: boolean }[] = [];
  for (const [category, tools] of Object.entries(toolsByCategory)) {
    for (const tool of tools) {
      allTools.push({ ...tool, category });
    }
  }

  const toolsXml = allTools
    .map((tool) => {
      const priority = tool.isNew ? "0.9" : "0.8";
      const changefreq = tool.category === "readings" ? "daily" : "weekly";
      return `  <url>
    <loc>${baseUrl}/tool/${tool.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${toolsXml}
</urlset>`;
}

function generateSitemapIndex(): string {
  const today = getToday();

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-tools.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "index";

    let xml: string;

    switch (type) {
      case "main":
        xml = generateMainSitemap();
        break;
      case "tools":
        xml = generateToolsSitemap();
        break;
      case "index":
      default:
        xml = generateSitemapIndex();
        break;
    }

    return new Response(xml, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
  </url>
</urlset>`,
      {
        headers: corsHeaders,
        status: 500,
      }
    );
  }
});
