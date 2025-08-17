# Google AdSense Integration Guide

## ✅ Prerequisites (Your site already meets these!)

- ✅ Original, valuable content (Persian tools)
- ✅ Good user experience and navigation
- ✅ Mobile-responsive design
- ✅ Fast loading times
- ✅ Privacy policy and terms of service
- ✅ Google Analytics integration
- ✅ Professional appearance

## 🚀 Setup Steps

### 1. Apply for Google AdSense
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up with your Google account
3. Add your website URL: `https://langar.co`
4. Select your country/region: Iran
5. Complete the application process

### 2. Website Verification
Google will review your site (usually 1-14 days). They'll check:
- Content quality ✅ (Your tools are high-quality)
- User experience ✅ (Professional design)
- Navigation ✅ (Clear structure)
- Content policies ✅ (Family-friendly tools)

### 3. After Approval - Update Configuration

#### Update `src/config/ads.ts`:
```typescript
export const ADS_CONFIG = {
  PUBLISHER_ID: 'ca-pub-YOUR_ACTUAL_PUBLISHER_ID', // From AdSense
  ENABLED: true, // Enable after approval
  // ... rest stays the same
};
```

#### Update ad slot IDs after creating ad units in AdSense dashboard.

### 4. Ad Placement Strategy

#### Homepage Revenue Optimization:
- **Top Banner**: After hero section (~$2-5 CPM)
- **Content Ads**: Between tool categories (~$1-3 CPM)
- **Sidebar Ads**: Desktop only (~$1-2 CPM)
- **Footer Banner**: Before footer (~$0.5-1 CPM)

#### Tool Pages Revenue:
- **Header Banner**: Below tool title (~$3-6 CPM)
- **Results Banner**: After tool output (~$2-4 CPM)
- **Sidebar**: Related tools area (~$1-2 CPM)

## 💰 Expected Revenue (Conservative Estimates)

### Traffic Assumptions:
- 10,000 monthly page views: **$20-50/month**
- 50,000 monthly page views: **$100-300/month**
- 100,000 monthly page views: **$250-750/month**

### Persian Market Factors:
- **Higher CPM**: Persian tools are niche (+20-30%)
- **Educational Content**: Premium advertisers (+10-20%)
- **Mobile Traffic**: Lower CPM (-10-20%)

## 🎯 Revenue Optimization Tips

### Content Strategy:
1. **Tool Descriptions**: Add detailed explanations (more ad space)
2. **Tutorial Pages**: Create how-to guides for each tool
3. **Blog Section**: Add Persian productivity/tech articles
4. **FAQ Pages**: Answer common questions about tools

### Technical Optimization:
1. **Lazy Loading**: Ads load when visible (better performance)
2. **Responsive Units**: Auto-adjust to screen size
3. **Above-fold Limit**: Max 3 ads above fold (AdSense policy)
4. **Loading Performance**: Maintain fast page speeds

### User Experience Balance:
- **Tool Functionality First**: Never compromise usability
- **Strategic Placement**: Ads complement, don't distract
- **Mobile Consideration**: Fewer, larger ads on mobile
- **Ad Labeling**: Clear "آگهی" labels (required)

## 📊 Performance Monitoring

### Key Metrics to Track:
- **Page RPM**: Revenue per 1000 page views
- **CTR**: Click-through rate (aim for 1-3%)
- **Viewability**: % of ads actually seen (aim for 70%+)
- **Page Speed**: Keep Core Web Vitals green

### A/B Testing Opportunities:
- Ad placement positions
- Ad unit sizes
- Number of ads per page
- Ad formats (display vs native)

## 🔧 Implementation Example

```typescript
// In your homepage component
import { ResponsiveAd, SidebarAd } from '@/components/ads';
import { getAdSlot, shouldShowAds } from '@/config/ads';

const HomePage = () => {
  return (
    <Layout>
      {/* Tool sections */}
      <ToolsSection />
      
      {/* Ad after popular tools */}
      {shouldShowAds() && (
        <ResponsiveAd 
          adSlot={getAdSlot('HOMEPAGE_TOP_BANNER')} 
          className="my-8"
        />
      )}
      
      <ProfessionalToolsSection />
      
      {/* More content... */}
    </Layout>
  );
};
```

## ⚠️ Important Policies

### AdSense Compliance:
- Don't click your own ads
- Don't ask users to click ads
- Don't place ads on error pages
- Maintain ad/content ratio (max 30% ads)
- Include privacy policy with AdSense disclosure

### Persian Content Bonus:
- Your Persian tools site is valuable for Iranian users
- Educational tools typically get premium advertisers
- Less competition in Persian market = higher CPM potential

## 🎉 Next Steps After Setup

1. **Apply to AdSense** (start this immediately)
2. **Wait for approval** (continue improving content)
3. **Implement ads** (use the components I created)
4. **Monitor performance** (optimize based on data)
5. **Scale content** (more tools = more traffic = more revenue)

Your site has excellent potential for AdSense approval and revenue generation!