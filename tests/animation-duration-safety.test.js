/**
 * Animation Duration Safety Tests
 * Property 7: Animation durations prevent rapid motion
 * Validates: Requirements 6.8
 *
 * Verifies all CSS animations and transitions have duration ≥ 300ms
 * to prevent rapid, distracting motion.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Extract the content inside <style>...</style>
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
assert.ok(styleMatch, 'Should find a <style> block in index.html');
const css = styleMatch[1];

/**
 * Converts a CSS duration string (e.g., "1s", "0.6s", "300ms") to milliseconds.
 */
function parseDurationToMs(durationStr) {
  const trimmed = durationStr.trim();
  if (trimmed.endsWith('ms')) {
    return parseFloat(trimmed);
  } else if (trimmed.endsWith('s')) {
    return parseFloat(trimmed) * 1000;
  }
  return NaN;
}

/**
 * Checks if a CSS block is inside the prefers-reduced-motion media query.
 * We exclude those blocks since they intentionally use 0.01ms.
 */
function isInsideReducedMotionBlock(css, matchIndex) {
  // Find the last @media (prefers-reduced-motion: reduce) before this match
  const reducedMotionRegex = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/g;
  let lastReducedMotionStart = -1;
  let rmMatch;
  while ((rmMatch = reducedMotionRegex.exec(css)) !== null) {
    if (rmMatch.index < matchIndex) {
      lastReducedMotionStart = rmMatch.index;
    }
  }

  if (lastReducedMotionStart === -1) return false;

  // Find the opening brace of this media query
  const braceStart = css.indexOf('{', lastReducedMotionStart);
  if (braceStart === -1) return false;

  // Find the matching closing brace
  let depth = 0;
  for (let i = braceStart; i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}') depth--;
    if (depth === 0) {
      // matchIndex is inside this block if it's between braceStart and i
      return matchIndex > braceStart && matchIndex < i;
    }
  }
  return false;
}

// ============================================================
// Test 1: All CSS custom property animation durations are ≥ 300ms
// ============================================================
console.log('Test 1: CSS custom property animation durations are ≥ 300ms');

const customPropDurations = {
  '--anim-fade-duration': null,
  '--anim-entrance-duration': null,
  '--anim-shimmer-duration': null,
  '--anim-glow-duration': null,
  '--anim-particle-duration': null,
  '--anim-hover-duration': null,
};

for (const prop of Object.keys(customPropDurations)) {
  const regex = new RegExp(`${prop.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*:\\s*([^;]+);`);
  const match = css.match(regex);
  assert.ok(match, `Should find custom property ${prop} in CSS`);
  const ms = parseDurationToMs(match[1]);
  assert.ok(!isNaN(ms), `Should parse duration for ${prop}: "${match[1]}"`);
  customPropDurations[prop] = ms;
  assert.ok(ms >= 300, `${prop} should be ≥ 300ms, got ${ms}ms`);
  console.log(`  ✓ ${prop}: ${match[1].trim()} (${ms}ms ≥ 300ms)`);
}

// ============================================================
// Test 2: No hardcoded animation-duration or transition-duration < 300ms
//         (excluding prefers-reduced-motion override)
// ============================================================
console.log('\nTest 2: No hardcoded animation/transition durations < 300ms (excluding reduced-motion)');

// Match animation-duration: <value> patterns
const animDurationRegex = /animation-duration\s*:\s*([^;!]+)/g;
let match;
let violations = [];

while ((match = animDurationRegex.exec(css)) !== null) {
  if (isInsideReducedMotionBlock(css, match.index)) continue;

  const durations = match[1].split(',');
  for (const dur of durations) {
    const ms = parseDurationToMs(dur.trim());
    if (!isNaN(ms) && ms < 300) {
      violations.push(`animation-duration: ${dur.trim()} (${ms}ms) at index ${match.index}`);
    }
  }
}

// Match transition-duration: <value> patterns
const transDurationRegex = /transition-duration\s*:\s*([^;!]+)/g;
while ((match = transDurationRegex.exec(css)) !== null) {
  if (isInsideReducedMotionBlock(css, match.index)) continue;

  const durations = match[1].split(',');
  for (const dur of durations) {
    const ms = parseDurationToMs(dur.trim());
    if (!isNaN(ms) && ms < 300) {
      violations.push(`transition-duration: ${dur.trim()} (${ms}ms) at index ${match.index}`);
    }
  }
}

// Also check shorthand animation: ... and transition: ... for inline durations
// Match transition shorthand values (e.g., "transform 0.3s ease")
const transitionShorthandRegex = /transition\s*:\s*([^;}{]+)/g;
while ((match = transitionShorthandRegex.exec(css)) !== null) {
  if (isInsideReducedMotionBlock(css, match.index)) continue;

  // Each comma-separated value is a separate transition
  const parts = match[1].split(',');
  for (const part of parts) {
    // Look for duration values (number followed by s or ms)
    const durationMatch = part.match(/(?:^|\s)([\d.]+(?:ms|s))\b/);
    if (durationMatch) {
      const ms = parseDurationToMs(durationMatch[1]);
      if (!isNaN(ms) && ms < 300) {
        violations.push(`transition shorthand duration: ${durationMatch[1]} (${ms}ms) in "${part.trim()}"`);
      }
    }
  }
}

// Check animation shorthand (e.g., "animation: fadeIn 1s ease-out forwards")
const animShorthandRegex = /animation\s*:\s*([^;}{]+)/g;
while ((match = animShorthandRegex.exec(css)) !== null) {
  if (isInsideReducedMotionBlock(css, match.index)) continue;

  // Each comma-separated value is a separate animation
  const parts = match[1].split(',');
  for (const part of parts) {
    // Look for duration values - first time-like value in the shorthand is the duration
    const durationMatch = part.match(/(?:^|\s)([\d.]+(?:ms|s))\b/);
    if (durationMatch) {
      const ms = parseDurationToMs(durationMatch[1]);
      if (!isNaN(ms) && ms < 300) {
        violations.push(`animation shorthand duration: ${durationMatch[1]} (${ms}ms) in "${part.trim()}"`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error('  ✗ Found durations < 300ms outside reduced-motion block:');
  violations.forEach(v => console.error(`    - ${v}`));
  assert.fail(`Found ${violations.length} animation/transition duration(s) < 300ms outside prefers-reduced-motion block`);
} else {
  console.log('  ✓ No hardcoded animation/transition durations < 300ms found outside reduced-motion block');
}

console.log('\n✓ All animation duration safety tests passed!');
