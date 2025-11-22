import { Tool } from '@/types/tool-types';
import { tools } from '@/data/tools';

export interface RecommendationScore {
  tool: Tool;
  score: number;
  reasons: string[];
}

export const getRelatedTools = (
  currentTool: Tool,
  maxResults: number = 4
): Tool[] => {
  const scores: RecommendationScore[] = [];

  tools.forEach(tool => {
    if (tool.id === currentTool.id || tool.isComingSoon) return;

    let score = 0;
    const reasons: string[] = [];

    // Same category (strong signal)
    if (tool.category === currentTool.category) {
      score += 50;
      reasons.push('same-category');
    }

    // Similar keywords/functionality
    const currentName = currentTool.name.toLowerCase();
    const toolName = tool.name.toLowerCase();
    const commonWords = currentName.split(' ').filter(word => 
      toolName.includes(word) && word.length > 2
    );
    
    if (commonWords.length > 0) {
      score += commonWords.length * 10;
      reasons.push('similar-keywords');
    }

    // Complementary tools (e.g., calculator + converter)
    const complementaryPairs = [
      ['calculator', 'converter'],
      ['text', 'word'],
      ['image', 'photo'],
      ['color', 'design']
    ];

    complementaryPairs.forEach(pair => {
      if (
        (currentName.includes(pair[0]) && toolName.includes(pair[1])) ||
        (currentName.includes(pair[1]) && toolName.includes(pair[0]))
      ) {
        score += 20;
        reasons.push('complementary');
      }
    });

    if (score > 0) {
      scores.push({ tool, score, reasons });
    }
  });

  // Sort by score and return top results
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.tool);
};

export const getPopularTools = (
  currentToolId: string,
  maxResults: number = 5
): Tool[] => {
  // Filter out current tool and coming soon tools
  return tools
    .filter(tool => 
      tool.id !== currentToolId && 
      !tool.isComingSoon
    )
    .slice(0, maxResults);
};

export const getSimilarToolsForComparison = (
  toolId: string,
  maxResults: number = 3
): Tool[] => {
  const currentTool = tools.find(t => t.id === toolId || t.slug === toolId);
  if (!currentTool) return [];

  return getRelatedTools(currentTool, maxResults);
};
