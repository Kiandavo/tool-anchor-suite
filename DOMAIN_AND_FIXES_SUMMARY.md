# Domain Update & Critical Fixes Summary

## Issues Addressed

### 1. Domain Name Update ✅
**Problem**: Website uses `langar.co` but actual domain is `laangar.com`

**Files Updated**:
- `index.html` - Updated canonical and og:url
- `src/config/domain.ts` - Created single source of truth for domain
- `src/components/seo/SeoHead.tsx`
- `src/components/seo/StructuredData.tsx`
- `src/components/seo/EnhancedSeoHead.tsx`
- `src/components/seo/schemas/SoftwareApplicationSchema.tsx`
- `src/pages/Tool.tsx` - Updated breadcrumbs
- `src/pages/AllTools.tsx`
- `src/pages/FAQEnhanced.tsx`
- `src/pages/guides/CalculatorsGuide.tsx`
- `src/pages/privacy-policy.tsx`
- `src/pages/terms-of-service.tsx`

**Remaining Files to Update**:
- `src/pages/index.tsx` - 2 instances
- `src/pages/Category.tsx` - multiple instances
- `src/utils/schemaUtils.ts` - many instances (20+)
- `src/utils/seo-generation.ts` - 2 instances
- `src/utils/sitemap-generator.ts` - multiple instances
- `src/components/seo/RumiSeoData.tsx` - many instances

### 2. User Comments Section (نظرات کاربران)
**Problem**: User requested removal of ToolRating/comments section

**Action Needed**:
- Remove `<ToolRating />` component usage from Tool.tsx (if present)
- Remove TestimonialSection from homepage (if present)

### 3. Non-Functional Seasonal Tools
**Problem**: These tools don't work:
- شمارش معکوس نوروز ۱۴۰۵ (Nowruz Countdown)
- محاسبه‌گر شب یلدا (Yalda Calculator)
- اوقات شرعی ماه رمضان (Ramadan Prayer Times)
- تقویم کامل فارسی (Complete Persian Calendar)

**Status**: These are cards in `SeasonalToolsSection.tsx` with no onClick handlers
**Recommendation**: Either implement the tools or remove the non-functional cards

### 4. Calendar Year Issues
**Problem**: Wrong year calculation in تقویم شمسی and تقویم قمری

**Root Causes**:
1. **Simple conversion** in `SeasonalToolsSection.tsx` line 16:
   ```typescript
   const persianYear = now.getFullYear() - 621; // TOO SIMPLE! 
   ```
   This doesn't account for the fact that Persian new year starts in March

2. **PersianCalendar component** uses proper conversion functions but may have issues with current date display

**Fix Needed**:
- Use proper `gregorianToPersian()` function from `src/utils/calendar/persianCalendar.ts`
- Example:
   ```typescript
   const now = new Date();
   const persian = gregorianToPersian(now.getFullYear(), now.getMonth() + 1, now.getDate());
   const persianYear = persian.year; // Correct!
   ```

## Implementation Plan

### Phase 1: Complete Domain Update
Update remaining files with search-replace:
- schemaUtils.ts (20+ instances)
- sitemap-generator.ts (8+ instances)
- seo-generation.ts (2 instances)
- RumiSeoData.tsx (12+ instances)
- index.tsx (2 instances)
- Category.tsx (5+ instances)

### Phase 2: Remove User Comments
- Check Tool.tsx for ToolRating usage
- Check homepage for TestimonialSection
- Remove both components if present

### Phase 3: Fix Calendar Years
- Update SeasonalToolsSection.tsx to use proper conversion
- Verify PersianCalendar.tsx getCurrentDates() function
- Test both solar and lunar calendar displays

### Phase 4: Handle Seasonal Tools
Option A: Remove non-functional cards from SeasonalToolsSection
Option B: Implement basic functionality for each tool
Option C: Add "Coming Soon" badges and disable clicks

## Testing Checklist

After fixes:
- [ ] Verify all canonical URLs show laangar.com
- [ ] Check Open Graph tags use laangar.com
- [ ] Verify schema.org URLs are laangar.com
- [ ] Test breadcrumb links work with new domain
- [ ] Confirm user comments section removed
- [ ] Verify solar calendar shows correct year 1404/1405
- [ ] Verify lunar calendar shows correct Hijri year
- [ ] Test seasonal tools cards (removed or functional)
- [ ] Check sitemap.xml uses correct domain
- [ ] Verify robots.txt references correct domain

## SEO Impact

**Critical**: Domain mismatch between code and actual domain can cause:
- Canonical URL conflicts
- Duplicate content issues
- Loss of SEO authority
- Broken structured data
- Invalid sitemap submissions

**Priority**: HIGH - Must fix immediately for SEO health

## Next Steps

1. Complete domain updates in remaining files
2. Remove or disable non-functional features
3. Fix calendar year calculations
4. Test thoroughly
5. Deploy changes
6. Submit updated sitemap to Google Search Console
