// Tool usage analytics tracking
interface ToolUsageEvent {
  toolId: string;
  toolName: string;
  timestamp: number;
  action: 'view' | 'use' | 'bookmark' | 'share';
  duration?: number;
}

interface AnalyticsData {
  events: ToolUsageEvent[];
  popularTools: { [key: string]: number };
  recentTools: string[];
  bookmarks: string[];
}

const STORAGE_KEY = 'langar_analytics';
const MAX_EVENTS = 1000;
const MAX_RECENT = 10;

class Analytics {
  private data: AnalyticsData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): AnalyticsData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    }
    return {
      events: [],
      popularTools: {},
      recentTools: [],
      bookmarks: []
    };
  }

  private saveData(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save analytics data:', error);
    }
  }

  trackToolView(toolId: string, toolName: string): void {
    this.trackEvent({
      toolId,
      toolName,
      timestamp: Date.now(),
      action: 'view'
    });
    this.updateRecentTools(toolId);
  }

  trackToolUse(toolId: string, toolName: string): void {
    this.trackEvent({
      toolId,
      toolName,
      timestamp: Date.now(),
      action: 'use'
    });
    this.updatePopularTools(toolId);
  }

  trackBookmark(toolId: string, toolName: string, add: boolean): void {
    this.trackEvent({
      toolId,
      toolName,
      timestamp: Date.now(),
      action: 'bookmark'
    });
    
    if (add) {
      if (!this.data.bookmarks.includes(toolId)) {
        this.data.bookmarks.push(toolId);
      }
    } else {
      this.data.bookmarks = this.data.bookmarks.filter(id => id !== toolId);
    }
    this.saveData();
  }

  trackShare(toolId: string, toolName: string): void {
    this.trackEvent({
      toolId,
      toolName,
      timestamp: Date.now(),
      action: 'share'
    });
  }

  private trackEvent(event: ToolUsageEvent): void {
    this.data.events.push(event);
    
    // Keep only last MAX_EVENTS events
    if (this.data.events.length > MAX_EVENTS) {
      this.data.events = this.data.events.slice(-MAX_EVENTS);
    }
    
    this.saveData();
  }

  private updateRecentTools(toolId: string): void {
    // Remove if already exists
    this.data.recentTools = this.data.recentTools.filter(id => id !== toolId);
    
    // Add to front
    this.data.recentTools.unshift(toolId);
    
    // Keep only MAX_RECENT tools
    if (this.data.recentTools.length > MAX_RECENT) {
      this.data.recentTools = this.data.recentTools.slice(0, MAX_RECENT);
    }
    
    this.saveData();
  }

  private updatePopularTools(toolId: string): void {
    this.data.popularTools[toolId] = (this.data.popularTools[toolId] || 0) + 1;
    this.saveData();
  }

  getRecentTools(): string[] {
    return this.data.recentTools;
  }

  getBookmarks(): string[] {
    return this.data.bookmarks;
  }

  isBookmarked(toolId: string): boolean {
    return this.data.bookmarks.includes(toolId);
  }

  getPopularTools(limit: number = 5): Array<{ toolId: string; count: number }> {
    return Object.entries(this.data.popularTools)
      .map(([toolId, count]) => ({ toolId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  getToolStats(toolId: string): {
    views: number;
    uses: number;
    lastUsed?: number;
  } {
    const events = this.data.events.filter(e => e.toolId === toolId);
    const views = events.filter(e => e.action === 'view').length;
    const uses = events.filter(e => e.action === 'use').length;
    const lastUsed = events.length > 0 ? events[events.length - 1].timestamp : undefined;

    return { views, uses, lastUsed };
  }

  clearData(): void {
    this.data = {
      events: [],
      popularTools: {},
      recentTools: [],
      bookmarks: []
    };
    this.saveData();
  }
}

export const analytics = new Analytics();
