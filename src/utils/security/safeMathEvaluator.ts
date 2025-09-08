/**
 * Safe mathematical expression evaluator
 * Prevents code injection by using a whitelist approach for mathematical operations
 */

interface MathOperations {
  [key: string]: (a: number, b?: number) => number;
}

const MATH_OPERATIONS: MathOperations = {
  '+': (a, b) => a + (b || 0),
  '-': (a, b) => b !== undefined ? a - b : -a,
  '*': (a, b) => a * (b || 0),
  '/': (a, b) => a / (b || 1),
  '**': (a, b) => Math.pow(a, b || 0),
  '^': (a, b) => Math.pow(a, b || 0),
};

const MATH_FUNCTIONS: { [key: string]: (x: number) => number } = {
  'sin': Math.sin,
  'cos': Math.cos,
  'tan': Math.tan,
  'sqrt': Math.sqrt,
  'log': Math.log,
  'ln': Math.log,
  'abs': Math.abs,
  'floor': Math.floor,
  'ceil': Math.ceil,
  'round': Math.round,
};

const MATH_CONSTANTS: { [key: string]: number } = {
  'π': Math.PI,
  'pi': Math.PI,
  'e': Math.E,
};

/**
 * Safely evaluates a mathematical expression
 */
export function safeMathEval(expression: string): number {
  if (!expression || typeof expression !== 'string') {
    throw new Error('Invalid expression');
  }

  // Remove whitespace and validate characters
  const cleanExpression = expression.replace(/\s/g, '');
  
  // Only allow numbers, operators, parentheses, and mathematical functions
  const allowedChars = /^[0-9+\-*/().πe√^sincotan]+$/i;
  if (!allowedChars.test(cleanExpression)) {
    throw new Error('Invalid characters in expression');
  }

  // Replace mathematical constants and functions
  let processedExpression = cleanExpression;
  
  // Replace constants
  Object.entries(MATH_CONSTANTS).forEach(([key, value]) => {
    processedExpression = processedExpression.replace(new RegExp(key, 'g'), value.toString());
  });

  // Replace mathematical symbols with JavaScript equivalents
  processedExpression = processedExpression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/√(\d+)/g, 'Math.sqrt($1)')
    .replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)')
    .replace(/\^/g, '**');

  // Replace mathematical functions
  Object.entries(MATH_FUNCTIONS).forEach(([key, func]) => {
    const regex = new RegExp(`${key}\\(([^)]+)\\)`, 'g');
    processedExpression = processedExpression.replace(regex, (match, arg) => {
      return `Math.${key}(${arg})`;
    });
  });

  // Validate parentheses balance
  const openParens = (processedExpression.match(/\(/g) || []).length;
  const closeParens = (processedExpression.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    throw new Error('Unbalanced parentheses');
  }

  try {
    // Use a more secure evaluation method
    // Only allow basic mathematical operations
    const safeExpression = processedExpression.replace(/Math\./g, '');
    
    // Create a safe evaluation context
    const mathContext = {
      ...Math,
      // Override potentially dangerous methods
      constructor: undefined,
      __proto__: null,
    };

    // Create a function with restricted scope
    const evalFunction = new Function(
      'Math', 
      `"use strict"; return (${processedExpression})`
    );
    
    const result = evalFunction(mathContext);
    
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