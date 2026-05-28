# Implementation Plan: Baby Shower Invitation

## Overview

Build a single-page static baby shower invitation website using a single `index.html` file with embedded CSS and minimal inline JavaScript (~20 lines for Intersection Observer). The page features a hero section with `image.png` as the centerpiece visual, event details section, and footer, all styled with a soft pastel color palette (pink, cream, gold) and elegant typography via Google Fonts. The page includes layered CSS animations: page fade-in, staggered section entrances, gold shimmer/glow effects, floating particles, and hover transitions — all respecting `prefers-reduced-motion`.

## Tasks

- [x] 1. Create the base HTML structure with document head
  - [x] 1.1 Create `index.html` with HTML5 boilerplate, viewport meta tag, page title, Google Fonts link (Playfair Display + Lato), and an empty `<style>` block
    - Set charset to UTF-8
    - Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    - Title: "Baby Shower - Spurthi Rani A & Harish J"
    - Link Google Fonts with `display=swap` and `preconnect`
    - _Requirements: 4.1, 4.2, 4.3, 5.2_

- [ ] 2. Build the page content sections
  - [x] 2.1 Add the Hero Section markup
    - Create a `<section class="hero content-section" data-delay="0">` containing `image.png` with appropriate `alt` text and an `<h1 class="event-title gold-accent">` with "Baby Shower"
    - The image is the centerpiece visual element displayed prominently
    - _Requirements: 1.1, 2.2_

  - [x] 2.2 Add the Event Details Section markup
    - Create a `<section class="event-details content-section" data-delay="1">` with parents' names ("Spurthi Rani A & Harish J" with class `gold-accent`), date ("July 6, 2026"), time ("10 AM"), and venue ("Samudhaya Bhavana, Challakere")
    - Use `.detail-item` wrappers with `.detail-label` and `.detail-value` spans
    - _Requirements: 1.2, 1.3, 1.4, 1.5_

  - [x] 2.3 Add the Footer Section markup
    - Create a `<footer class="footer content-section" data-delay="2">` with closing message "We look forward to celebrating with you!"
    - _Requirements: 2.4_

  - [x] 2.4 Add the Floating Particles container markup
    - Create a `<div class="particles" aria-hidden="true">` with 8 `<span class="particle">` elements
    - Set `aria-hidden="true"` for accessibility (purely decorative)
    - _Requirements: 6.5_

- [x] 3. Implement base CSS styles
  - [x] 3.1 Define CSS custom properties and base styles
    - Add `:root` variables for the pastel color palette (pink: #f8e8e8, cream: #fdf6f0, gold: #c9a84c, gold-light: #e8d5a3), typography (Playfair Display for headings, Lato for body), spacing tokens, and animation timing tokens
    - Set base body styles with cream background, primary text color, and font-family
    - _Requirements: 2.1, 2.3_

  - [x] 3.2 Style the Hero Section
    - Center the hero content using flexbox
    - Constrain image with `max-width: 100%` and `height: auto` for proportional scaling
    - Add rounded corners and subtle box-shadow to the image
    - Style the event title with the heading font, appropriate size, and gold accent color
    - Display image prominently as the centerpiece visual
    - _Requirements: 2.2, 2.3, 2.4, 3.3_

  - [x] 3.3 Style the Event Details Section
    - Apply visual hierarchy with font size/weight differentiation
    - Add adequate whitespace between detail items using spacing tokens
    - Style parents' names prominently with the heading font
    - Add gold accent dividers or decorative separators between items
    - _Requirements: 1.4, 2.1, 2.3, 2.4_

  - [x] 3.4 Style the Footer Section
    - Apply subtle styling with secondary text color
    - Add top border or separator using gold-light accent
    - _Requirements: 2.1_

  - [x] 3.5 Add responsive media queries
    - Implement mobile-first base styles (320px+)
    - Add tablet breakpoint at 600px with adjusted font sizes and spacing
    - Add desktop breakpoint at 1024px with max-width container constraint
    - Ensure no horizontal scrollbar at any viewport width between 320px and 1920px
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 4. Implement the animation system
  - [x] 4.1 Add page-level fade-in animation
    - Define `@keyframes fadeIn` (opacity 0 → 1)
    - Apply `animation: fadeIn 1s ease-out forwards` to the body element
    - _Requirements: 6.1_

  - [x] 4.2 Add section entrance animation styles
    - Style `.content-section` with initial `opacity: 0` and `transform: translateY(30px)`
    - Add transition properties for opacity and transform (0.6s ease-out)
    - Style `.content-section.visible` to `opacity: 1` and `transform: translateY(0)`
    - Add staggered delays using `data-delay` attribute selectors (0s, 0.2s, 0.4s)
    - _Requirements: 6.2_

  - [x] 4.3 Add gold accent glow and shimmer effects
    - Define `@keyframes glowPulse` (text-shadow pulsing between 8px and 16px spread)
    - Define `@keyframes shimmer` (background-position shift from -200% to 200%)
    - Style `.gold-accent` with gradient background, `background-clip: text`, shimmer animation (4s linear infinite), and glow pulse animation (3s ease-in-out infinite)
    - _Requirements: 6.3, 6.4_

  - [x] 4.4 Add floating particles CSS animation
    - Define `@keyframes floatUp` (translateY from 100vh to -20px with horizontal drift, opacity fade in/out)
    - Style `.particles` container as absolutely positioned, full-page, `pointer-events: none`
    - Style `.particle` elements with small size (6px), gold-light color, border-radius 50%, and `floatUp` animation
    - Use `nth-child` selectors to vary left position, animation-delay, and animation-duration for each of the 8 particles
    - _Requirements: 6.5_

  - [x] 4.5 Add hover transition effects
    - Add `transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease` to `.detail-item`, `.gold-accent`, and `.footer p`
    - Add `:hover` state with `transform: scale(1.02)` on detail items
    - Add `:hover` state with enhanced text-shadow on gold accents
    - _Requirements: 6.6, 6.8_

  - [x] 4.6 Add prefers-reduced-motion support
    - Add `@media (prefers-reduced-motion: reduce)` query
    - Set `animation-duration: 0.01ms !important` and `transition-duration: 0.01ms !important` on all elements
    - Force `.content-section` to `opacity: 1` and `transform: none`
    - Hide `.particle` elements with `display: none`
    - _Requirements: 6.9_

- [x] 5. Add Intersection Observer script
  - [x] 5.1 Add inline JavaScript for scroll-triggered entrance animations
    - Add a `<script>` block before `</body>` with ~20 lines of code
    - Use `DOMContentLoaded` event listener
    - Query all `.content-section` elements
    - Create an `IntersectionObserver` with `threshold: 0.1` that adds `.visible` class on entry and unobserves
    - Add fallback: if `IntersectionObserver` is not supported, immediately add `.visible` to all sections
    - _Requirements: 4.1, 6.2, 6.7_

- [ ] 6. Checkpoint - Verify the page renders correctly with animations
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Final validation and polish
  - [x] 7.1 Verify all content, accessibility, and animation behavior
    - Confirm all five event details are present and correctly displayed (title, date, time, names, venue)
    - Verify image has meaningful alt text and displays prominently as centerpiece
    - Verify font fallback stacks are in place (Georgia for serif, Segoe UI for sans-serif)
    - Confirm total page weight (excluding cached fonts) is under 2 MB
    - Verify animations are tasteful and not distracting (all durations ≥ 300ms)
    - Verify particles container has `aria-hidden="true"`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.1, 6.8_

  - [x] 7.2 Write visual regression or layout validation tests
    - **Property 1: Responsive layout without horizontal overflow** — verify no horizontal scrollbar at viewport widths 320px, 600px, 1024px, 1920px
    - **Property 2: Hero image proportional scaling** — verify image width does not exceed viewport and aspect ratio is maintained
    - **Validates: Requirements 3.1, 3.2, 3.3**

  - [x] 7.3 Write animation correctness tests
    - **Property 3: Page fade-in completes within 1 second** — verify body fade-in animation duration is at most 1s, transitioning opacity 0 to 1
    - **Validates: Requirements 6.1**

  - [x] 7.4 Write staggered entrance ordering tests
    - **Property 4: Staggered section entrance ordering** — verify each section's animation delay is strictly greater than the previous section's delay
    - **Validates: Requirements 6.2**

  - [x] 7.5 Write gold accent effect tests
    - **Property 5: Gold accent elements have glow and shimmer** — verify elements with `.gold-accent` have text-shadow and shimmer animation applied
    - **Validates: Requirements 6.3, 6.4**

  - [x] 7.6 Write hover transition tests
    - **Property 6: Hover transitions on interactive elements** — verify detail items, gold accents, and footer text have transition duration ≥ 300ms and a visible `:hover` state change
    - **Validates: Requirements 6.6**

  - [x] 7.7 Write animation duration safety tests
    - **Property 7: Animation durations prevent rapid motion** — verify all CSS animations and transitions have duration ≥ 300ms
    - **Validates: Requirements 6.8**

  - [~] 7.8 Write reduced motion accessibility tests
    - **Property 8: Reduced motion disables all animations** — verify that with `prefers-reduced-motion: reduce` active, animations are effectively disabled and content is immediately visible
    - **Validates: Requirements 6.9**

- [ ] 8. Final checkpoint - Ensure page is complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The implementation uses a single `index.html` file with all CSS embedded in a `<style>` block and ~20 lines of inline JavaScript for Intersection Observer
- The existing `image.png` in the project root is used prominently as the centerpiece hero image
- All animations use CSS exclusively (keyframes + transitions); JavaScript is only for adding the `.visible` class via Intersection Observer
- The animation system is layered: page-level fade-in → section-level staggered entrances → element-level shimmer/glow/particles → hover transitions
- `prefers-reduced-motion` support ensures accessibility compliance

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["3.2", "3.3", "3.4"] },
    { "id": 4, "tasks": ["3.5", "4.1"] },
    { "id": 5, "tasks": ["4.2", "4.3", "4.4", "4.5"] },
    { "id": 6, "tasks": ["4.6", "5.1"] },
    { "id": 7, "tasks": ["7.1"] },
    { "id": 8, "tasks": ["7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8"] }
  ]
}
```
