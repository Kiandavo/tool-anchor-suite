/**
 * Safe mathematical expression evaluator
 * Uses a tokenizer and recursive descent parser - no eval/new Function
 */

const MATH_CONSTANTS: { [key: string]: number } = {
  'π': Math.PI,
  'pi': Math.PI,
  'e': Math.E,
};

type Token = 
  | { type: 'number'; value: number }
  | { type: 'operator'; value: string }
  | { type: 'function'; value: string }
  | { type: 'lparen' }
  | { type: 'rparen' };

/**
 * Tokenizes a mathematical expression
 */
function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  
  while (i < expression.length) {
    const char = expression[i];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }
    
    // Numbers (including decimals)
    if (/[0-9.]/.test(char)) {
      let numStr = '';
      while (i < expression.length && /[0-9.]/.test(expression[i])) {
        numStr += expression[i];
        i++;
      }
      const value = parseFloat(numStr);
      if (isNaN(value)) {
        throw new Error('Invalid number');
      }
      tokens.push({ type: 'number', value });
      continue;
    }
    
    // Mathematical constants
    if (char === 'π') {
      tokens.push({ type: 'number', value: Math.PI });
      i++;
      continue;
    }
    
    // Function names (sin, cos, tan, sqrt, log, ln, abs)
    if (/[a-z]/i.test(char)) {
      let name = '';
      while (i < expression.length && /[a-z]/i.test(expression[i])) {
        name += expression[i].toLowerCase();
        i++;
      }
      
      if (name === 'pi') {
        tokens.push({ type: 'number', value: Math.PI });
      } else if (name === 'e') {
        tokens.push({ type: 'number', value: Math.E });
      } else if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'abs', 'floor', 'ceil', 'round'].includes(name)) {
        tokens.push({ type: 'function', value: name });
      } else {
        throw new Error(`Unknown function: ${name}`);
      }
      continue;
    }
    
    // Operators
    if (['+', '-', '*', '/', '^', '×', '÷'].includes(char)) {
      let op = char;
      if (char === '×') op = '*';
      if (char === '÷') op = '/';
      tokens.push({ type: 'operator', value: op });
      i++;
      continue;
    }
    
    // Square root symbol
    if (char === '√') {
      tokens.push({ type: 'function', value: 'sqrt' });
      i++;
      continue;
    }
    
    // Parentheses
    if (char === '(') {
      tokens.push({ type: 'lparen' });
      i++;
      continue;
    }
    
    if (char === ')') {
      tokens.push({ type: 'rparen' });
      i++;
      continue;
    }
    
    throw new Error(`Invalid character: ${char}`);
  }
  
  return tokens;
}

/**
 * Recursive descent parser for mathematical expressions
 */
class Parser {
  private tokens: Token[];
  private pos: number = 0;
  
  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }
  
  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }
  
  private consume(): Token {
    return this.tokens[this.pos++];
  }
  
  private expect(type: string): Token {
    const token = this.consume();
    if (!token || token.type !== type) {
      throw new Error(`Expected ${type}`);
    }
    return token;
  }
  
  // Entry point: handles + and -
  parse(): number {
    const result = this.parseExpression();
    if (this.pos < this.tokens.length) {
      throw new Error('Unexpected token');
    }
    return result;
  }
  
  private parseExpression(): number {
    let left = this.parseTerm();
    
    while (true) {
      const token = this.peek();
      if (token?.type === 'operator' && (token.value === '+' || token.value === '-')) {
        this.consume();
        const right = this.parseTerm();
        left = token.value === '+' ? left + right : left - right;
      } else {
        break;
      }
    }
    
    return left;
  }
  
  // Handles * and /
  private parseTerm(): number {
    let left = this.parsePower();
    
    while (true) {
      const token = this.peek();
      if (token?.type === 'operator' && (token.value === '*' || token.value === '/')) {
        this.consume();
        const right = this.parsePower();
        if (token.value === '/' && right === 0) {
          throw new Error('Division by zero');
        }
        left = token.value === '*' ? left * right : left / right;
      } else {
        break;
      }
    }
    
    return left;
  }
  
  // Handles ^ (power)
  private parsePower(): number {
    let left = this.parseUnary();
    
    const token = this.peek();
    if (token?.type === 'operator' && token.value === '^') {
      this.consume();
      const right = this.parsePower(); // Right associative
      left = Math.pow(left, right);
    }
    
    return left;
  }
  
  // Handles unary - and +
  private parseUnary(): number {
    const token = this.peek();
    if (token?.type === 'operator' && (token.value === '-' || token.value === '+')) {
      this.consume();
      const value = this.parseUnary();
      return token.value === '-' ? -value : value;
    }
    return this.parsePrimary();
  }
  
  // Handles numbers, parentheses, and functions
  private parsePrimary(): number {
    const token = this.peek();
    
    if (!token) {
      throw new Error('Unexpected end of expression');
    }
    
    // Number
    if (token.type === 'number') {
      this.consume();
      return token.value;
    }
    
    // Function call
    if (token.type === 'function') {
      this.consume();
      this.expect('lparen');
      const arg = this.parseExpression();
      this.expect('rparen');
      return this.applyFunction(token.value, arg);
    }
    
    // Parenthesized expression
    if (token.type === 'lparen') {
      this.consume();
      const result = this.parseExpression();
      this.expect('rparen');
      return result;
    }
    
    throw new Error('Unexpected token');
  }
  
  private applyFunction(name: string, arg: number): number {
    switch (name) {
      case 'sin': return Math.sin(arg);
      case 'cos': return Math.cos(arg);
      case 'tan': return Math.tan(arg);
      case 'sqrt': 
        if (arg < 0) throw new Error('Cannot take square root of negative number');
        return Math.sqrt(arg);
      case 'log': 
        if (arg <= 0) throw new Error('Logarithm of non-positive number');
        return Math.log10(arg);
      case 'ln': 
        if (arg <= 0) throw new Error('Logarithm of non-positive number');
        return Math.log(arg);
      case 'abs': return Math.abs(arg);
      case 'floor': return Math.floor(arg);
      case 'ceil': return Math.ceil(arg);
      case 'round': return Math.round(arg);
      default: throw new Error(`Unknown function: ${name}`);
    }
  }
}

/**
 * Safely evaluates a mathematical expression using a recursive descent parser
 */
export function safeMathEval(expression: string): number {
  if (!expression || typeof expression !== 'string') {
    throw new Error('Invalid expression');
  }

  // Validate expression length to prevent DoS
  if (expression.length > 500) {
    throw new Error('Expression too long');
  }

  try {
    const tokens = tokenize(expression);
    
    if (tokens.length === 0) {
      throw new Error('Empty expression');
    }
    
    const parser = new Parser(tokens);
    const result = parser.parse();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid calculation result');
    }
    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
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
