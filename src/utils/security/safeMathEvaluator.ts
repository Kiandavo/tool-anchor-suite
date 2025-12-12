/**
 * Safe mathematical expression evaluator
 * Uses mathjs library for secure parsing-based evaluation (no eval/new Function)
 */

import { evaluate, create, all } from 'mathjs';

// Create a limited mathjs instance with only safe operations
const math = create(all);

// Disable potentially dangerous functions
const limitedMath = math.create({
  // Keep only safe mathematical operations
});

// Import only the functions we need for safety
limitedMath.import({
  // Disable dangerous functions
  import: function () { throw new Error('Function import is disabled'); },
  createUnit: function () { throw new Error('Function createUnit is disabled'); },
  evaluate: function () { throw new Error('Function evaluate is disabled'); },
  parse: function () { throw new Error('Function parse is disabled'); },
  simplify: function () { throw new Error('Function simplify is disabled'); },
  derivative: function () { throw new Error('Function derivative is disabled'); },
}, { override: true });

const MATH_CONSTANTS: { [key: string]: number } = {
  'π': Math.PI,
  'pi': Math.PI,
  'e': Math.E,
};

/**
 * Safely evaluates a mathematical expression using mathjs parser
 */
export function safeMathEval(expression: string): number {
  if (!expression || typeof expression !== 'string') {
    throw new Error('Invalid expression');
  }

  // Remove whitespace
  let cleanExpression = expression.replace(/\s/g, '');
  
  // Validate expression length to prevent DoS
  if (cleanExpression.length > 500) {
    throw new Error('Expression too long');
  }

  // Only allow safe mathematical characters
  const allowedChars = /^[0-9+\-*/().πeE√^sincotag×÷]+$/i;
  if (!allowedChars.test(cleanExpression)) {
    throw new Error('Invalid characters in expression');
  }

  // Replace Persian/custom symbols with standard operators
  let processedExpression = cleanExpression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '^')
    .replace(/√(\d+)/g, 'sqrt($1)')
    .replace(/√\(([^)]+)\)/g, 'sqrt($1)');

  // Replace mathematical constants
  Object.entries(MATH_CONSTANTS).forEach(([key, value]) => {
    processedExpression = processedExpression.replace(new RegExp(key, 'g'), value.toString());
  });

  // Validate parentheses balance
  const openParens = (processedExpression.match(/\(/g) || []).length;
  const closeParens = (processedExpression.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    throw new Error('Unbalanced parentheses');
  }

  try {
    // Use mathjs evaluate - it uses a parser, not eval
    const result = limitedMath.evaluate(processedExpression);
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid calculation result');
    }
    
    return result;
  } catch (error) {
    throw new Error('Invalid mathematical expression');
  }
}

/**
 * Validates if an expression contains only safe mathematical operations
 */
export function isValidMathExpression(expression: string): boolean {
  try {
    safeMathEval(expression);
    return true;
  } catch {
    return false;
  }
}
