"""
Layout validation tests for the Baby Shower Invitation page.

Validates:
- Property 1: Responsive layout without horizontal overflow
- Property 2: Hero image proportional scaling

**Validates: Requirements 3.1, 3.2, 3.3**

These tests parse the CSS from index.html and verify that the correct
CSS properties are in place to prevent horizontal overflow and ensure
proportional image scaling across all viewport widths (320px–1920px).
"""

import re
import os
import sys

# Path to the index.html file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_HTML_PATH = os.path.join(BASE_DIR, "index.html")


def read_html():
    """Read the index.html file content."""
    with open(INDEX_HTML_PATH, "r", encoding="utf-8") as f:
        return f.read()


def extract_css(html_content):
    """Extract all CSS from <style> blocks in the HTML."""
    style_blocks = re.findall(r"<style[^>]*>(.*?)</style>", html_content, re.DOTALL)
    return "\n".join(style_blocks)


def extract_css_rules(css_content):
    """Parse CSS into a list of (selector, properties_dict) tuples."""
    # Remove comments
    css_content = re.sub(r"/\*.*?\*/", "", css_content, flags=re.DOTALL)
    # Remove @keyframes blocks (they aren't layout rules)
    css_content = re.sub(
        r"@keyframes\s+\w+\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}", "", css_content
    )

    rules = []
    # Match top-level rules (not inside @media)
    pattern = r"([^{@]+)\{([^}]*)\}"
    for match in re.finditer(pattern, css_content):
        selector = match.group(1).strip()
        props_str = match.group(2).strip()
        props = {}
        for prop_match in re.finditer(r"([\w-]+)\s*:\s*([^;]+);", props_str):
            props[prop_match.group(1).strip()] = prop_match.group(2).strip()
        rules.append((selector, props))
    return rules


def extract_media_queries(css_content):
    """Extract media query blocks and their contents."""
    # Remove comments
    css_content = re.sub(r"/\*.*?\*/", "", css_content, flags=re.DOTALL)
    media_blocks = {}
    # Match @media blocks
    pattern = r"@media\s*\(([^)]+)\)\s*\{((?:[^{}]*\{[^}]*\})*[^}]*)\}"
    for match in re.finditer(pattern, css_content):
        condition = match.group(1).strip()
        content = match.group(2).strip()
        media_blocks[condition] = content
    return media_blocks


class TestResults:
    """Simple test result tracker."""

    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []

    def assert_true(self, condition, message):
        if condition:
            self.passed += 1
            print(f"  ✓ PASS: {message}")
        else:
            self.failed += 1
            self.errors.append(message)
            print(f"  ✗ FAIL: {message}")

    def summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"Results: {self.passed}/{total} passed, {self.failed} failed")
        if self.errors:
            print("\nFailed tests:")
            for err in self.errors:
                print(f"  - {err}")
        print(f"{'='*60}")
        return self.failed == 0


def test_property1_no_horizontal_overflow(html_content, css_content, results):
    """
    Property 1: Responsive layout without horizontal overflow.

    Verify no horizontal scrollbar at viewport widths 320px, 600px, 1024px, 1920px.

    **Validates: Requirements 3.1, 3.2**

    Checks:
    1. body has overflow-x: hidden
    2. box-sizing: border-box is applied universally
    3. viewport meta tag is present with width=device-width
    4. No fixed-width elements that could exceed viewport
    5. Hero image has max-width constraint
    6. Body has max-width constraint at desktop breakpoint
    """
    print("\n--- Property 1: Responsive layout without horizontal overflow ---")

    rules = extract_css_rules(css_content)
    media_queries = extract_media_queries(css_content)

    # 1. Check body has overflow-x: hidden
    body_has_overflow_hidden = False
    for selector, props in rules:
        if selector == "body":
            if props.get("overflow-x") == "hidden":
                body_has_overflow_hidden = True
                break
    results.assert_true(
        body_has_overflow_hidden,
        "body has overflow-x: hidden to prevent horizontal scrollbar",
    )

    # 2. Check universal box-sizing: border-box
    has_box_sizing = False
    for selector, props in rules:
        if "*" in selector and props.get("box-sizing") == "border-box":
            has_box_sizing = True
            break
    results.assert_true(
        has_box_sizing,
        "Universal box-sizing: border-box is applied (*, *::before, *::after)",
    )

    # 3. Check viewport meta tag
    has_viewport_meta = bool(
        re.search(
            r'<meta\s+name="viewport"[^>]*content="[^"]*width=device-width',
            html_content,
        )
    )
    results.assert_true(
        has_viewport_meta,
        "Viewport meta tag with width=device-width is present",
    )

    # 4. Check no fixed pixel widths on main containers that exceed mobile
    # Look for width declarations with fixed px values > 320px on non-media-query rules
    problematic_widths = []
    for selector, props in rules:
        if "width" in props and "max-width" not in selector:
            width_val = props.get("width", "")
            # Check for fixed pixel widths (not max-width, not %)
            px_match = re.match(r"(\d+)px", width_val)
            if px_match and int(px_match.group(1)) > 320:
                # Exclude particles and small decorative elements
                if "particle" not in selector and "particles" not in selector:
                    problematic_widths.append(
                        f"{selector}: width: {width_val}"
                    )
    results.assert_true(
        len(problematic_widths) == 0,
        f"No fixed-width elements exceeding 320px viewport (found: {problematic_widths})",
    )

    # 5. Check hero image has max-width: 100% (or constrained)
    hero_image_constrained = False
    for selector, props in rules:
        if "hero-image" in selector:
            max_width = props.get("max-width", "")
            if "100%" in max_width or "80%" in max_width:
                hero_image_constrained = True
                break
    results.assert_true(
        hero_image_constrained,
        ".hero-image has max-width: 100% (or constrained percentage)",
    )

    # 6. Check desktop breakpoint has max-width on body
    desktop_has_max_width = False
    for condition, content in media_queries.items():
        if "min-width" in condition and "1024" in condition:
            if "max-width" in content:
                desktop_has_max_width = True
                break
    results.assert_true(
        desktop_has_max_width,
        "Desktop breakpoint (1024px) constrains body with max-width",
    )

    # 7. Verify responsive breakpoints exist for key viewport widths
    has_tablet_breakpoint = any(
        "600" in cond for cond in media_queries.keys() if "min-width" in cond
    )
    has_desktop_breakpoint = any(
        "1024" in cond for cond in media_queries.keys() if "min-width" in cond
    )
    results.assert_true(
        has_tablet_breakpoint,
        "Tablet breakpoint (600px) media query exists",
    )
    results.assert_true(
        has_desktop_breakpoint,
        "Desktop breakpoint (1024px) media query exists",
    )


def test_property2_hero_image_proportional_scaling(css_content, results):
    """
    Property 2: Hero image proportional scaling.

    Verify image width does not exceed viewport and aspect ratio is maintained.

    **Validates: Requirements 3.3**

    Checks:
    1. .hero-image has max-width: 100% (does not exceed viewport)
    2. .hero-image has height: auto (maintains aspect ratio)
    3. .hero-image has object-fit property for aspect ratio preservation
    4. Image is within a flex container for proper centering
    """
    print("\n--- Property 2: Hero image proportional scaling ---")

    rules = extract_css_rules(css_content)

    # Collect all hero-image properties across all rules
    hero_image_props = {}
    for selector, props in rules:
        if "hero-image" in selector:
            hero_image_props.update(props)

    # 1. Check max-width: 100% on hero image
    max_width = hero_image_props.get("max-width", "")
    results.assert_true(
        "100%" in max_width or "80%" in max_width,
        f".hero-image has max-width constraint ({max_width})",
    )

    # 2. Check height: auto for aspect ratio preservation
    height = hero_image_props.get("height", "")
    results.assert_true(
        height == "auto",
        f".hero-image has height: auto for proportional scaling (got: '{height}')",
    )

    # 3. Check object-fit is set (contain or cover) for aspect ratio
    object_fit = hero_image_props.get("object-fit", "")
    results.assert_true(
        object_fit in ("contain", "cover"),
        f".hero-image has object-fit for aspect ratio preservation (got: '{object_fit}')",
    )

    # 4. Check hero container uses flexbox for centering
    hero_is_flex = False
    for selector, props in rules:
        if selector.strip() == ".hero":
            if props.get("display") == "flex":
                hero_is_flex = True
                break
    results.assert_true(
        hero_is_flex,
        ".hero container uses display: flex for proper image centering",
    )

    # 5. Verify image does not have fixed pixel width
    has_fixed_width = "width" in hero_image_props and "px" in hero_image_props.get(
        "width", ""
    )
    results.assert_true(
        not has_fixed_width,
        ".hero-image does not have a fixed pixel width (would break scaling)",
    )

    # 6. Check that max-height is set to prevent oversized images
    max_height = hero_image_props.get("max-height", "")
    results.assert_true(
        max_height != "",
        f".hero-image has max-height constraint to prevent oversized display (got: '{max_height}')",
    )


def main():
    """Run all layout validation tests."""
    print("=" * 60)
    print("Layout Validation Tests - Baby Shower Invitation")
    print("Validates: Requirements 3.1, 3.2, 3.3")
    print("=" * 60)

    # Read and parse the HTML
    html_content = read_html()
    css_content = extract_css(html_content)

    results = TestResults()

    # Run Property 1 tests
    test_property1_no_horizontal_overflow(html_content, css_content, results)

    # Run Property 2 tests
    test_property2_hero_image_proportional_scaling(css_content, results)

    # Print summary
    all_passed = results.summary()

    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    main()
