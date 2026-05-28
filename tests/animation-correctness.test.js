/**
 * Animation Correctness Tests
 * Property 3: Page fade-in completes within 1 second
 *
 * Validates: Requirements 6.1
 *
 * Verifies that the body element's fade-in animation has a total duration
 * of at most 1 second and transitions opacity from 0 to 1.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Extract CSS from <style> block(s)
const styleMatches = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
assert.ok(styleMatches && styleMatches.length > 0, 'Expected at least one <style> block in index.html');

const css = styleMatches.map(m => m.replace(/<\/?style[^>]*>/gi, '')).join('\n');

// Extract :root custom properties to resolve var() references
function extractCustomProperties(cssText) {
  const props = {};
  const rootMatch = cssText.match(/:root\s*\{([^}]*)\}/);
  if (rootMatch) {
    const declarations = rootMatch[1].match(/--[\w-]+\s*:\s*[^;]+/g);
    if (declarations) {
      declarations.forEach(decl => {
        const [name, value] = decl.split(':').map(s => s.trim());
        props[name] = value;
      });
    }
  }
  return props;
}

// Resolve a CSS value that may contain var() references
function resolveVar(value, customProps) {
  return value.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, varName) => {
    return customProps[varName] || '';
  });
}

// Parse a CSS duration string (e.g., "1s", "500ms") to milliseconds
function parseDuration(durationStr) {
  durationStr = durationStr.trim();
  if (durationStr.endsWith('ms')) {
    return parseFloat(durationStr);
  } else if (durationStr.endsWith('s')) {
    return parseFloat(durationStr) * 1000;
  }
  return parseFloat(durationStr);
}

const customProps = extractCustomProperties(css);

// ============================================================
// Test 1: Body has animation: fadeIn with duration <= 1s
// ============================================================
console.log('Test 1: Body has fadeIn animation with duration at most 1s');

// Find body rule (not inside a media query for the base case)
// We need to find the body selector and its animation property
const bodyRuleRegex = /(?:^|\n)\s*body\s*\{([^}]*)\}/gm;
let bodyDeclarations = '';
let match;

while ((match = bodyRuleRegex.exec(css)) !== null) {
  // Skip body rules inside media queries by checking context
  const beforeMatch = css.substring(0, match.index);
  const openBraces = (beforeMatch.match(/\{/g) || []).length;
  const closeBraces = (beforeMatch.match(/\}/g) || []).length;
  // If we're at top level (not nested inside another block), this is the base body rule
  if (openBraces === closeBraces) {
    bodyDeclarations = match[1];
    break;
  }
}

assert.ok(bodyDeclarations, 'Expected to find a top-level body CSS rule');

// Check for animation property containing fadeIn
const animationMatch = bodyDeclarations.match(/animation\s*:\s*([^;]+)/);
assert.ok(animationMatch, 'Expected body to have an animation property');

const animationValue = resolveVar(animationMatch[1], customProps);

// The animation shorthand should reference fadeIn
assert.ok(
  animationValue.includes('fadeIn'),
  `Expected body animation to reference "fadeIn", got: "${animationValue}"`
);

// Extract duration from the animation shorthand
// Animation shorthand: name duration timing-function delay iteration-count direction fill-mode
// Duration is the first time value in the shorthand
const timeValues = animationValue.match(/(\d+\.?\d*)(ms|s)\b/g);
assert.ok(timeValues && timeValues.length > 0, 'Expected to find a duration in the body animation');

const fadeDuration = parseDuration(timeValues[0]);
assert.ok(
  fadeDuration <= 1000,
  `Expected fade-in duration to be at most 1000ms, got: ${fadeDuration}ms`
);

console.log(`  ✓ Body has fadeIn animation with duration ${fadeDuration}ms (<= 1000ms)`);

// ============================================================
// Test 2: @keyframes fadeIn transitions opacity from 0 to 1
// ============================================================
console.log('Test 2: @keyframes fadeIn transitions opacity from 0 to 1');

// Extract the full @keyframes fadeIn block by counting braces
function extractKeyframesBlock(cssText, name) {
  const startRegex = new RegExp('@keyframes\\s+' + name + '\\s*\\{');
  const startMatch = startRegex.exec(cssText);
  if (!startMatch) return null;

  let braceCount = 0;
  let startIdx = startMatch.index + startMatch[0].length;
  let i = startIdx;
  braceCount = 1; // We've already passed the opening brace

  while (i < cssText.length && braceCount > 0) {
    if (cssText[i] === '{') braceCount++;
    if (cssText[i] === '}') braceCount--;
    i++;
  }

  return cssText.substring(startIdx, i - 1);
}

const keyframesBody = extractKeyframesBlock(css, 'fadeIn');
assert.ok(keyframesBody, 'Expected to find @keyframes fadeIn definition');

// Check for "from" or "0%" with opacity: 0
const fromRegex = /(?:from|0%)\s*\{([^}]*)\}/;
const fromMatch = keyframesBody.match(fromRegex);
assert.ok(fromMatch, 'Expected @keyframes fadeIn to have a "from" or "0%" keyframe');

const fromOpacity = fromMatch[1].match(/opacity\s*:\s*(\d+\.?\d*)/);
assert.ok(fromOpacity, 'Expected "from" keyframe to set opacity');
assert.strictEqual(
  parseFloat(fromOpacity[1]),
  0,
  `Expected "from" opacity to be 0, got: ${fromOpacity[1]}`
);

// Check for "to" or "100%" with opacity: 1
const toRegex = /(?:to|100%)\s*\{([^}]*)\}/;
const toMatch = keyframesBody.match(toRegex);
assert.ok(toMatch, 'Expected @keyframes fadeIn to have a "to" or "100%" keyframe');

const toOpacity = toMatch[1].match(/opacity\s*:\s*(\d+\.?\d*)/);
assert.ok(toOpacity, 'Expected "to" keyframe to set opacity');
assert.strictEqual(
  parseFloat(toOpacity[1]),
  1,
  `Expected "to" opacity to be 1, got: ${toOpacity[1]}`
);

console.log('  ✓ @keyframes fadeIn transitions opacity from 0 to 1');

// ============================================================
// Test 3: Body has initial opacity: 0
// ============================================================
console.log('Test 3: Body has initial opacity: 0');

const opacityMatch = bodyDeclarations.match(/opacity\s*:\s*(\d+\.?\d*)/);
assert.ok(opacityMatch, 'Expected body to have an opacity property');
assert.strictEqual(
  parseFloat(opacityMatch[1]),
  0,
  `Expected body initial opacity to be 0, got: ${opacityMatch[1]}`
);

console.log('  ✓ Body has initial opacity: 0');

// ============================================================
// Summary
// ============================================================
console.log('\n✅ All animation correctness tests passed!');
console.log('   Property 3: Page fade-in completes within 1 second - VERIFIED');
