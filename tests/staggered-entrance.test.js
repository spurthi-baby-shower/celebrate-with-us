/**
 * Staggered Section Entrance Ordering Tests
 *
 * Property 4: Staggered section entrance ordering — verify each section's
 * animation delay is strictly greater than the previous section's delay,
 * ensuring sequential reveal.
 *
 * Validates: Requirements 6.2
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

/**
 * Test 1: There are multiple .content-section[data-delay="N"] CSS rules
 * with strictly increasing transition-delay values.
 */
function testCSSDelayRulesExistAndAreIncreasing() {
  // Match CSS rules like: .content-section[data-delay="N"] { transition-delay: Xs; }
  const delayRuleRegex = /\.content-section\[data-delay="(\d+)"\]\s*\{[^}]*transition-delay:\s*([\d.]+)s/g;

  const delays = [];
  let match;
  while ((match = delayRuleRegex.exec(html)) !== null) {
    delays.push({
      index: parseInt(match[1], 10),
      delay: parseFloat(match[2])
    });
  }

  // Sort by data-delay index to ensure correct ordering
  delays.sort((a, b) => a.index - b.index);

  // Verify there are multiple CSS rules
  assert.ok(
    delays.length >= 2,
    `Expected at least 2 .content-section[data-delay="N"] CSS rules, found ${delays.length}`
  );

  // Verify transition-delay values are strictly increasing
  for (let i = 1; i < delays.length; i++) {
    assert.ok(
      delays[i].delay > delays[i - 1].delay,
      `Expected transition-delay for data-delay="${delays[i].index}" (${delays[i].delay}s) to be strictly greater than data-delay="${delays[i - 1].index}" (${delays[i - 1].delay}s)`
    );
  }

  console.log('  ✓ CSS rules have strictly increasing transition-delay values:', delays.map(d => `${d.delay}s`).join(' < '));
}

/**
 * Test 2: The transition-delay values follow the expected pattern (0s < 0.2s < 0.4s).
 */
function testDelayValuesMatchExpectedPattern() {
  const delayRuleRegex = /\.content-section\[data-delay="(\d+)"\]\s*\{[^}]*transition-delay:\s*([\d.]+)s/g;

  const delays = [];
  let match;
  while ((match = delayRuleRegex.exec(html)) !== null) {
    delays.push({
      index: parseInt(match[1], 10),
      delay: parseFloat(match[2])
    });
  }

  delays.sort((a, b) => a.index - b.index);

  // Verify the expected delay values: 0s, 0.2s, 0.4s
  const expectedDelays = [0, 0.2, 0.4];
  assert.strictEqual(
    delays.length,
    expectedDelays.length,
    `Expected ${expectedDelays.length} delay rules, found ${delays.length}`
  );

  for (let i = 0; i < expectedDelays.length; i++) {
    assert.strictEqual(
      delays[i].delay,
      expectedDelays[i],
      `Expected delay at index ${i} to be ${expectedDelays[i]}s, got ${delays[i].delay}s`
    );
  }

  console.log('  ✓ Transition-delay values match expected pattern: 0s < 0.2s < 0.4s');
}

/**
 * Test 3: Each section in the HTML has a data-delay attribute with increasing values.
 */
function testHTMLSectionsHaveIncreasingDataDelay() {
  // Match content-section elements with data-delay attributes in the HTML body
  const sectionRegex = /class="[^"]*content-section[^"]*"[^>]*data-delay="(\d+)"/g;

  const dataDelays = [];
  let match;
  while ((match = sectionRegex.exec(html)) !== null) {
    dataDelays.push(parseInt(match[1], 10));
  }

  // Verify there are multiple sections
  assert.ok(
    dataDelays.length >= 2,
    `Expected at least 2 content sections with data-delay attributes, found ${dataDelays.length}`
  );

  // Verify data-delay values are strictly increasing
  for (let i = 1; i < dataDelays.length; i++) {
    assert.ok(
      dataDelays[i] > dataDelays[i - 1],
      `Expected data-delay at section ${i + 1} (${dataDelays[i]}) to be strictly greater than section ${i} (${dataDelays[i - 1]})`
    );
  }

  console.log(`  ✓ ${dataDelays.length} HTML sections have strictly increasing data-delay values: ${dataDelays.join(' < ')}`);
}

// Run all tests
console.log('Staggered Section Entrance Ordering Tests');
console.log('==========================================');
console.log('Property 4: Staggered section entrance ordering');
console.log('Validates: Requirements 6.2\n');

try {
  testCSSDelayRulesExistAndAreIncreasing();
  testDelayValuesMatchExpectedPattern();
  testHTMLSectionsHaveIncreasingDataDelay();
  console.log('\n✓ All staggered entrance ordering tests passed!');
} catch (err) {
  console.error('\n✗ Test failed:', err.message);
  process.exit(1);
}
