/**
 * Property 6: Hover transitions on interactive elements
 * Verify detail items, gold accents, and footer text have transition duration ≥ 300ms
 * and a visible :hover state change.
 *
 * **Validates: Requirements 6.6**
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Extract all CSS from <style> blocks
const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
assert.ok(styleMatches && styleMatches.length > 0, 'Should have at least one <style> block');

const css = styleMatches.map(m => m.replace(/<\/?style[^>]*>/gi, '')).join('\n');

// Helper: extract the value of --anim-hover-duration from :root
function getCustomPropertyValue(cssText, propName) {
  const rootMatch = cssText.match(/:root\s*\{([^}]+)\}/);
  assert.ok(rootMatch, ':root block should exist');
  const propRegex = new RegExp(`${propName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*:\\s*([^;]+);`);
  const match = rootMatch[1].match(propRegex);
  return match ? match[1].trim() : null;
}

// Helper: parse CSS duration string to milliseconds
function parseDurationMs(duration) {
  if (!duration) return 0;
  duration = duration.trim();
  if (duration.endsWith('ms')) {
    return parseFloat(duration);
  } else if (duration.endsWith('s')) {
    return parseFloat(duration) * 1000;
  }
  return parseFloat(duration) * 1000;
}

// Helper: find a CSS rule block by selector (handles grouped selectors)
function findRuleBlock(cssText, selector) {
  // Remove comments
  const cleaned = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove @media blocks to avoid matching inside them for base rules
  // But we want to find rules at the top level
  const lines = cleaned.split('\n');
  let depth = 0;
  let inMedia = false;
  let result = '';
  let capturing = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!capturing) {
      // Check if this line starts a rule that matches our selector
      // Handle grouped selectors like ".detail-item,\n.gold-accent,\n.footer p {"
      // We need to look for the selector in a rule declaration
      if (line.includes(selector) || (capturing === false && result.includes(selector))) {
        // Check if we're inside a @media block for prefers-reduced-motion
        if (inMedia) continue;

        // Find the opening brace
        const braceIdx = line.indexOf('{');
        if (braceIdx !== -1) {
          capturing = true;
          braceCount = 1;
          result = line.substring(braceIdx + 1);
          continue;
        }
      }
    } else {
      for (const ch of line) {
        if (ch === '{') braceCount++;
        if (ch === '}') braceCount--;
      }
      if (braceCount <= 0) {
        result += line.substring(0, line.lastIndexOf('}'));
        return result;
      }
      result += line + '\n';
    }

    // Track @media blocks
    if (line.includes('@media') && line.includes('prefers-reduced-motion')) {
      inMedia = true;
      depth = 0;
      for (const ch of line) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
    } else if (inMedia) {
      for (const ch of line) {
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      if (depth <= 0) inMedia = false;
    }
  }
  return null;
}

// Helper: find a rule by exact selector match (more precise)
function findRuleBySelector(cssText, targetSelector) {
  // Remove comments and @media (prefers-reduced-motion) blocks
  let cleaned = cssText.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove prefers-reduced-motion media blocks
  cleaned = cleaned.replace(/@media\s*\([^)]*prefers-reduced-motion[^)]*\)\s*\{[^}]*(\{[^}]*\}[^}]*)*\}/g, '');

  // Match rules: find selector { ... }
  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = ruleRegex.exec(cleaned)) !== null) {
    const selectors = match[1].trim();
    const body = match[2];
    // Check if our target selector is in the selectors list
    const selectorList = selectors.split(',').map(s => s.trim());
    if (selectorList.some(s => s === targetSelector || s.includes(targetSelector))) {
      return body;
    }
  }
  return null;
}

// ============================================================
// Test 1: .detail-item, .gold-accent, and .footer p have transition property defined
// ============================================================
console.log('Test 1: Checking transition property is defined for interactive elements...');

// Look for the grouped transition rule
const transitionRuleRegex = /\.detail-item[\s\S]*?\.gold-accent[\s\S]*?\.footer\s+p\s*\{([^}]+)\}/;
const groupedMatch = css.match(transitionRuleRegex);

// Also check individual rules
const detailItemRule = findRuleBySelector(css, '.detail-item');
const goldAccentRule = findRuleBySelector(css, '.gold-accent');
const footerPRule = findRuleBySelector(css, '.footer p');

// At least the grouped rule or individual rules should have transition
const hasGroupedTransition = groupedMatch && groupedMatch[1].includes('transition');
const hasDetailTransition = detailItemRule && detailItemRule.includes('transition');
const hasGoldTransition = goldAccentRule && goldAccentRule.includes('transition');
const hasFooterTransition = footerPRule && footerPRule.includes('transition');

assert.ok(
  hasGroupedTransition || (hasDetailTransition && hasGoldTransition && hasFooterTransition),
  '.detail-item, .gold-accent, and .footer p should have transition property defined (either grouped or individually)'
);
console.log('  ✓ Transition property is defined for interactive elements');

// ============================================================
// Test 2: Transition duration uses var(--anim-hover-duration) which equals 0.3s (300ms)
// ============================================================
console.log('Test 2: Checking transition duration uses --anim-hover-duration = 0.3s...');

// Verify the custom property value
const hoverDuration = getCustomPropertyValue(css, '--anim-hover-duration');
assert.ok(hoverDuration, '--anim-hover-duration should be defined in :root');

const hoverDurationMs = parseDurationMs(hoverDuration);
assert.strictEqual(hoverDurationMs, 300, `--anim-hover-duration should equal 300ms, got ${hoverDurationMs}ms`);

// Verify the transition uses var(--anim-hover-duration)
const transitionSource = groupedMatch ? groupedMatch[1] : (detailItemRule || '');
const usesHoverVar = transitionSource.includes('var(--anim-hover-duration)');
assert.ok(usesHoverVar, 'Transition should use var(--anim-hover-duration)');

console.log('  ✓ Transition duration uses var(--anim-hover-duration) = 0.3s (300ms)');

// ============================================================
// Test 3: .detail-item:hover has a transform property (scale)
// ============================================================
console.log('Test 3: Checking .detail-item:hover has transform (scale)...');

const detailHoverRule = findRuleBySelector(css, '.detail-item:hover');
assert.ok(detailHoverRule, '.detail-item:hover rule should exist');
assert.ok(
  detailHoverRule.includes('transform') && detailHoverRule.includes('scale'),
  '.detail-item:hover should have a transform property with scale'
);
console.log('  ✓ .detail-item:hover has transform: scale(...)');

// ============================================================
// Test 4: .gold-accent:hover has a text-shadow property
// ============================================================
console.log('Test 4: Checking .gold-accent:hover has text-shadow...');

const goldHoverRule = findRuleBySelector(css, '.gold-accent:hover');
assert.ok(goldHoverRule, '.gold-accent:hover rule should exist');
assert.ok(
  goldHoverRule.includes('text-shadow'),
  '.gold-accent:hover should have a text-shadow property'
);
console.log('  ✓ .gold-accent:hover has text-shadow property');

// ============================================================
// Test 5: .footer p:hover has a color property change
// ============================================================
console.log('Test 5: Checking .footer p:hover has color property...');

const footerHoverRule = findRuleBySelector(css, '.footer p:hover');
assert.ok(footerHoverRule, '.footer p:hover rule should exist');
assert.ok(
  footerHoverRule.includes('color'),
  '.footer p:hover should have a color property change'
);
console.log('  ✓ .footer p:hover has color property change');

// ============================================================
// Summary
// ============================================================
console.log('\n✅ All hover transition tests passed!');
console.log('   Property 6: Hover transitions on interactive elements - VERIFIED');
