/**
 * Reduced Motion Accessibility Tests
 * Property 8: Reduced motion disables all animations
 *
 * Validates: Requirements 6.9
 *
 * Verifies that with `prefers-reduced-motion: reduce` active,
 * animations are effectively disabled and content is immediately visible.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Extract all CSS from <style> blocks
const styleBlocks = [];
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
while ((match = styleRegex.exec(html)) !== null) {
  styleBlocks.push(match[1]);
}
const css = styleBlocks.join('\n');

// Extract the @media (prefers-reduced-motion: reduce) block content
function extractReducedMotionBlock(cssText) {
  const mediaStart = cssText.indexOf('@media (prefers-reduced-motion: reduce)');
  if (mediaStart === -1) return null;

  // Find the opening brace of the media query
  const braceStart = cssText.indexOf('{', mediaStart);
  if (braceStart === -1) return null;

  // Match braces to find the end of the media block
  let depth = 1;
  let i = braceStart + 1;
  while (i < cssText.length && depth > 0) {
    if (cssText[i] === '{') depth++;
    if (cssText[i] === '}') depth--;
    i++;
  }

  return cssText.substring(braceStart + 1, i - 1);
}

const reducedMotionBlock = extractReducedMotionBlock(css);

// Test 1: A @media (prefers-reduced-motion: reduce) block exists
console.log('Test 1: @media (prefers-reduced-motion: reduce) block exists');
assert.ok(
  reducedMotionBlock !== null,
  'Expected a @media (prefers-reduced-motion: reduce) block in the CSS'
);
console.log('  PASSED');

// Test 2: animation-duration: 0.01ms !important is set on universal selector
console.log('Test 2: animation-duration: 0.01ms !important on universal selector');
const hasAnimDuration = /\*[\s\S]*?\{[^}]*animation-duration:\s*0\.01ms\s*!important/
  .test(reducedMotionBlock);
assert.ok(
  hasAnimDuration,
  'Expected animation-duration: 0.01ms !important on universal selector (*) inside reduced motion block'
);
console.log('  PASSED');

// Test 3: transition-duration: 0.01ms !important is set on universal selector
console.log('Test 3: transition-duration: 0.01ms !important on universal selector');
const hasTransDuration = /\*[\s\S]*?\{[^}]*transition-duration:\s*0\.01ms\s*!important/
  .test(reducedMotionBlock);
assert.ok(
  hasTransDuration,
  'Expected transition-duration: 0.01ms !important on universal selector (*) inside reduced motion block'
);
console.log('  PASSED');

// Test 4: .content-section has opacity: 1 and transform: none
console.log('Test 4: .content-section has opacity: 1 and transform: none');
const contentSectionRegex = /\.content-section\s*\{([^}]*)\}/;
const contentSectionMatch = reducedMotionBlock.match(contentSectionRegex);
assert.ok(
  contentSectionMatch,
  'Expected a .content-section rule inside reduced motion block'
);
const contentSectionRules = contentSectionMatch[1];
assert.ok(
  /opacity:\s*1/.test(contentSectionRules),
  'Expected opacity: 1 on .content-section inside reduced motion block'
);
assert.ok(
  /transform:\s*none/.test(contentSectionRules),
  'Expected transform: none on .content-section inside reduced motion block'
);
console.log('  PASSED');

// Test 5: .particle has display: none
console.log('Test 5: .particle has display: none');
const particleRegex = /\.particle\s*\{([^}]*)\}/;
const particleMatch = reducedMotionBlock.match(particleRegex);
assert.ok(
  particleMatch,
  'Expected a .particle rule inside reduced motion block'
);
const particleRules = particleMatch[1];
assert.ok(
  /display:\s*none/.test(particleRules),
  'Expected display: none on .particle inside reduced motion block'
);
console.log('  PASSED');

console.log('\nAll reduced motion accessibility tests passed!');
