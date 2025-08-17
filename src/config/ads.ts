// AdSense Configuration
export const ADS_CONFIG = {
  // Replace with your actual AdSense Publisher ID when approved
  PUBLISHER_ID: 'ca-pub-YOUR_PUBLISHER_ID',
  
  // Enable/disable ads globally
  ENABLED: false, // Set to true after AdSense approval
  
  // Ad slot IDs (create these in your AdSense account)
  AD_SLOTS: {
    // Homepage ads
    HOMEPAGE_TOP_BANNER: '1234567890',
    HOMEPAGE_MIDDLE_BANNER: '2345678901',
    HOMEPAGE_SIDEBAR: '3456789012',
    
    // Tool page ads
    TOOL_HEADER_BANNER: '4567890123',
    TOOL_CONTENT_BANNER: '5678901234',
    TOOL_SIDEBAR: '6789012345',
    
    // Category page ads
    CATEGORY_BANNER: '7890123456',
    CATEGORY_SIDEBAR: '8901234567',
    
    // Search results ads
    SEARCH_RESULTS_BANNER: '9012345678',
  },
  
  // Ad placement settings
  PLACEMENTS: {
    // Show ads after every N tools in listings
    TOOLS_LIST_INTERVAL: 6,
    
    // Minimum content length before showing ads
    MIN_CONTENT_LENGTH: 100,
    
    // Delay before showing ads (ms)
    SHOW_DELAY: 2000,
  }
};

// Helper function to get ad slot by key
export const getAdSlot = (key: keyof typeof ADS_CONFIG.AD_SLOTS): string => {
  return ADS_CONFIG.AD_SLOTS[key];
};

// Check if ads should be shown
export const shouldShowAds = (): boolean => {
  return ADS_CONFIG.ENABLED && ADS_CONFIG.PUBLISHER_ID !== 'ca-pub-YOUR_PUBLISHER_ID';
};