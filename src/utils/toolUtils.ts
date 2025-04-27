
// Re-export everything from the text module
// But avoid conflicting exports by importing and re-exporting manually
import * as TextUtils from './text';

// Export everything from TextUtils
export { TextUtils };

// No need to re-export from './textUtils' since we're exporting the namespace
