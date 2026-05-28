/**
 * Gold Accent Effect Tests
 * Property 5: Gold accent elements have glow and shimmer effects
 * Validates: Requirements 6.3, 6.4
 *
 * Verifies that elements with `.gold-accent` have text-shadow (glow)
 * and shimmer animation applied via CSS.
 */

const fs = require('fs');
const assert = require('assert');
const path = require('path');

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

console.log('Running gold accent effect tests...\n');

// Test 1: .gold-accent CSS rule contains animation with both shimmer and glowPulse
(function testGoldAccentAnimationProperty() {
  console.log('Test 1: .gold-accent rule has animation with shimmer and glowPulse');

  // Find the .gold-accent rule block
  const goldAccentRegex = /\.gold-accent\s*\{([^}]*)\}/g;
  let goldAccentMatch;
  let goldAccentBody = '';

  while ((goldAccentMatch = goldAccentRegex.exec(css)) !== null) {
    goldAccentBody += goldAccentMatch[1];
  }

  assert.ok(goldAccentBody.length > 0, '.gold-accent CSS rule should exist');

  // Check that animation property references shimmer
  assert.ok(
    goldAccentBody.includes('shimmer'),
    '.gold-accent animation should reference "shimmer" keyframes'
  );

  // Check that animation property references glowPulse
  assert.ok(
    goldAccentBody.includes('glowPulse'),
    '.gold-accent animation should reference "glowPulse" keyframes'
  );

  console.log('  ✓ .gold-accent has animation with both shimmer and glowPulse\n');
})();

// Test 2: @keyframes glowPulse is defined with text-shadow values
(function testGlowPulseKeyframes() {
  console.log('Test 2: @keyframes glowPulse is defined with text-shadow values');

  const glowPulseRegex = /@keyframes\s+glowPulse\s*\{([\s\S]*?\})\s*\}/;
  const glowPulseMatch = css.match(glowPulseRegex);

  assert.ok(glowPulseMatch, '@keyframes glowPulse should be defined');

  const glowPulseBody = glowPulseMatch[1];

  assert.ok(
    glowPulseBody.includes('text-shadow'),
    '@keyframes glowPulse should contain text-shadow values for glow effect'
  );

  console.log('  ✓ @keyframes glowPulse is defined with text-shadow values\n');
})();

// Test 3: @keyframes shimmer is defined with background-position values
(function testShimmerKeyframes() {
  console.log('Test 3: @keyframes shimmer is defined with background-position values');

  const shimmerRegex = /@keyframes\s+shimmer\s*\{([\s\S]*?\})\s*\}/;
  const shimmerMatch = css.match(shimmerRegex);

  assert.ok(shimmerMatch, '@keyframes shimmer should be defined');

  const shimmerBody = shimmerMatch[1];

  assert.ok(
    shimmerBody.includes('background-position'),
    '@keyframes shimmer should contain background-position values for shimmer effect'
  );

  console.log('  ✓ @keyframes shimmer is defined with background-position values\n');
})();

// Test 4: .gold-accent rule has background-clip: text property
(function testGoldAccentBackgroundClip() {
  console.log('Test 4: .gold-accent rule has background-clip: text property');

  const goldAccentRegex = /\.gold-accent\s*\{([^}]*)\}/g;
  let goldAccentMatch;
  let goldAccentBody = '';

  while ((goldAccentMatch = goldAccentRegex.exec(css)) !== null) {
    goldAccentBody += goldAccentMatch[1];
  }

  assert.ok(goldAccentBody.length > 0, '.gold-accent CSS rule should exist');

  assert.ok(
    goldAccentBody.includes('background-clip') && goldAccentBody.includes('text'),
    '.gold-accent should have background-clip: text property'
  );

  console.log('  ✓ .gold-accent has background-clip: text property\n');
})();

console.log('All gold accent effect tests passed! ✓');
