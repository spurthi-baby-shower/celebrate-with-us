# Design Document

## Overview

A single-page static baby shower invitation website built with plain HTML and CSS, enhanced with elegant CSS animations and visual effects. The page presents event details for the baby shower of Spurthi Rani A & Harish J in an elegant, mobile-responsive layout using a soft pastel color palette. The existing `image.png` is used prominently as the centerpiece hero image. Minimal JavaScript is used only for Intersection Observer-based scroll-triggered animations. No JavaScript frameworks, build tools, or animation libraries are required.

## Architecture

### High-Level Structure

The site consists of a single `index.html` file with embedded CSS (via a `<style>` block), a minimal inline `<script>` for Intersection Observer, and one local image asset (`image.png`). External dependencies are limited to a Google Fonts CDN link for decorative typography.

```
celebrate-with-us/
├── index.html       # Single-page invitation with embedded styles and minimal JS
└── image.png        # Hero/centerpiece image asset
```

### Technology Choices

- **HTML5**: Semantic markup for content structure
- **CSS3**: Embedded styles with CSS custom properties, keyframe animations, transitions, flexbox layout, and media queries for responsiveness
- **Google Fonts (CDN)**: Serif/decorative font for headings (e.g., Playfair Display or Great Vibes)
- **Minimal JavaScript**: Inline script (~20 lines) for Intersection Observer to trigger entrance animations on scroll; no animation libraries

### Animation Architecture

The animation system is layered into three tiers:

1. **Page-level animations**: Fade-in on initial load (applied to `<body>` or wrapper)
2. **Section-level animations**: Staggered entrance animations triggered by visibility (CSS animation-delay + Intersection Observer)
3. **Element-level animations**: Continuous decorative effects (shimmer, glow, particles) and hover transitions

All animations are defined as CSS `@keyframes` and controlled via CSS classes. The Intersection Observer adds a `.visible` class to sections as they enter the viewport, triggering their entrance animation.

```
┌─────────────────────────────────────────┐
│  Page Load                              │
│  └─ body fade-in (opacity 0 → 1, 1s)   │
│                                         │
│  ┌─ Section 1 (delay: 0s)              │
│  │  └─ slide-up + fade-in              │
│  ├─ Section 2 (delay: 0.2s)            │
│  │  └─ slide-up + fade-in              │
│  ├─ Section 3 (delay: 0.4s)            │
│  │  └─ slide-up + fade-in              │
│  └─ ...                                 │
│                                         │
│  Continuous Effects:                    │
│  ├─ Gold glow (box-shadow pulse)        │
│  ├─ Gold shimmer (gradient shift)       │
│  ├─ Floating particles (translate Y)    │
│  └─ Hover transitions (scale/color)     │
└─────────────────────────────────────────┘
```

## Components

### 1. Document Head

Responsible for metadata, viewport configuration, font loading, and embedded styles.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baby Shower - Spurthi Rani A & Harish J</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400&display=swap" rel="stylesheet">
  <style>/* All styles embedded here */</style>
</head>
```

### 2. Hero Section

The top visual area containing the centerpiece `image.png` and primary greeting. This is the first section to animate in.

```html
<section class="hero content-section" data-delay="0">
  <img src="image.png" alt="Baby shower decoration" class="hero-image">
  <h1 class="event-title gold-accent">Baby Shower</h1>
</section>
```

**Styling approach:**
- Image constrained with `max-width: 100%` and `height: auto` for proportional scaling
- Centered layout using flexbox
- Rounded corners and subtle shadow for elegance
- Image displayed prominently as the centerpiece visual element

### 3. Event Details Section

Displays the core event information: parents' names, date, time, and venue.

```html
<section class="event-details content-section" data-delay="1">
  <p class="parents-names gold-accent">Spurthi Rani A & Harish J</p>
  <div class="detail-item">
    <span class="detail-label">Date</span>
    <span class="detail-value">July 6, 2026</span>
  </div>
  <div class="detail-item">
    <span class="detail-label">Time</span>
    <span class="detail-value">10 AM</span>
  </div>
  <div class="detail-item">
    <span class="detail-label">Venue</span>
    <span class="detail-value">Samudhaya Bhavana, Challakere</span>
  </div>
</section>
```

**Styling approach:**
- Each detail item separated with adequate whitespace
- Visual hierarchy through font size and weight differentiation
- Gold accent dividers or decorative separators between items

### 4. Footer Section

A minimal closing message or decorative flourish.

```html
<footer class="footer content-section" data-delay="2">
  <p>We look forward to celebrating with you!</p>
</footer>
```

### 5. Floating Particles Container

Background decorative elements rendered as CSS-animated pseudo-elements or lightweight `<div>` elements.

```html
<div class="particles" aria-hidden="true">
  <span class="particle"></span>
  <span class="particle"></span>
  <span class="particle"></span>
  <span class="particle"></span>
  <span class="particle"></span>
  <span class="particle"></span>
  <span class="particle"></span>
  <span class="particle"></span>
</div>
```

**Styling approach:**
- Absolutely positioned container covering the full page
- `pointer-events: none` so particles don't interfere with content interaction
- `aria-hidden="true"` for accessibility (purely decorative)
- Each particle has randomized size, position, animation-duration, and animation-delay via CSS custom properties or nth-child selectors
- Particles float upward using `translateY` keyframes with gentle horizontal drift

### 6. Animation System (CSS)

#### Keyframe Definitions

```css
/* Page fade-in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Section entrance: slide up + fade in */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gold shimmer effect */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Gold glow pulse */
@keyframes glowPulse {
  0%, 100% { text-shadow: 0 0 8px rgba(201, 168, 76, 0.3); }
  50% { text-shadow: 0 0 16px rgba(201, 168, 76, 0.6); }
}

/* Floating particle */
@keyframes floatUp {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% {
    transform: translateY(-20px) translateX(20px);
    opacity: 0;
  }
}
```

#### Animation Classes

```css
/* Page-level fade-in */
body {
  animation: fadeIn 1s ease-out forwards;
}

/* Section entrance (triggered by .visible class) */
.content-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.content-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays */
.content-section[data-delay="0"] { transition-delay: 0s; }
.content-section[data-delay="1"] { transition-delay: 0.2s; }
.content-section[data-delay="2"] { transition-delay: 0.4s; }

/* Gold accent glow + shimmer */
.gold-accent {
  color: var(--color-gold);
  text-shadow: 0 0 10px rgba(201, 168, 76, 0.4);
  animation: glowPulse 3s ease-in-out infinite;
  background: linear-gradient(
    90deg,
    var(--color-gold) 0%,
    var(--color-gold-light) 50%,
    var(--color-gold) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite, glowPulse 3s ease-in-out infinite;
}

/* Hover transitions */
.detail-item,
.gold-accent,
.footer p {
  transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
}

.detail-item:hover {
  transform: scale(1.02);
}

.gold-accent:hover {
  text-shadow: 0 0 20px rgba(201, 168, 76, 0.8);
}

/* Floating particles */
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--color-gold-light);
  border-radius: 50%;
  animation: floatUp 8s linear infinite;
  opacity: 0;
}

.particle:nth-child(2) { left: 15%; animation-delay: 1s; animation-duration: 10s; }
.particle:nth-child(3) { left: 30%; animation-delay: 2s; animation-duration: 7s; }
.particle:nth-child(4) { left: 45%; animation-delay: 0.5s; animation-duration: 9s; }
.particle:nth-child(5) { left: 60%; animation-delay: 3s; animation-duration: 11s; }
.particle:nth-child(6) { left: 75%; animation-delay: 1.5s; animation-duration: 8s; }
.particle:nth-child(7) { left: 85%; animation-delay: 2.5s; animation-duration: 10s; }
.particle:nth-child(8) { left: 95%; animation-delay: 0.8s; animation-duration: 12s; }
```

#### Accessibility: Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .content-section {
    opacity: 1;
    transform: none;
  }

  .particle {
    display: none;
  }
}
```

### 7. Intersection Observer Script (Minimal JS)

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('.content-section');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      sections.forEach(function(section) { observer.observe(section); });
    } else {
      // Fallback: show all sections immediately
      sections.forEach(function(section) { section.classList.add('visible'); });
    }
  });
</script>
```

## Interfaces

### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Color Palette */
  --color-pink: #f8e8e8;
  --color-cream: #fdf6f0;
  --color-gold: #c9a84c;
  --color-gold-light: #e8d5a3;
  --color-text-primary: #4a3728;
  --color-text-secondary: #6b5344;

  /* Typography */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Lato', 'Segoe UI', sans-serif;

  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Animation Timing */
  --anim-fade-duration: 1s;
  --anim-entrance-duration: 0.6s;
  --anim-stagger-delay: 0.2s;
  --anim-shimmer-duration: 4s;
  --anim-glow-duration: 3s;
  --anim-particle-duration: 8s;
  --anim-hover-duration: 0.3s;
}
```

### Responsive Breakpoints

```css
/* Mobile-first base styles (320px+) */
/* Tablet adjustments */
@media (min-width: 600px) { /* ... */ }
/* Desktop adjustments */
@media (min-width: 1024px) { /* ... */ }
```

### Animation Class API

| Class | Purpose | Trigger |
|-------|---------|---------|
| `.content-section` | Marks element for entrance animation | Intersection Observer adds `.visible` |
| `.visible` | Activates entrance animation | Added by JS on viewport entry |
| `.gold-accent` | Applies glow + shimmer to gold elements | Always active (CSS) |
| `.particle` | Floating background element | Always active (CSS) |
| `data-delay="N"` | Controls stagger order (N × 0.2s) | CSS attribute selector |

## Data Models

This is a static page with no dynamic data. All content is hardcoded in the HTML. The conceptual data model is:

| Field | Value | Location in HTML |
|-------|-------|-----------------|
| Event Title | "Baby Shower" | `<h1>` in Hero Section |
| Parents' Names | "Spurthi Rani A & Harish J" | `.parents-names` |
| Date | "July 6, 2026" | `.detail-value` |
| Time | "10 AM" | `.detail-value` |
| Venue | "Samudhaya Bhavana, Challakere" | `.detail-value` |
| Image | `image.png` | `<img>` in Hero Section (centerpiece) |

## Error Handling

Given the static nature of the page, error handling is minimal:

- **Image load failure**: The `alt` attribute provides fallback text if `image.png` fails to load
- **Font load failure**: CSS font stacks include system fallback fonts (Georgia for serif, Segoe UI for sans-serif)
- **Viewport extremes**: CSS `max-width` and `min-width` constraints prevent layout breakage at extreme viewport sizes
- **Intersection Observer unavailable**: Fallback immediately adds `.visible` to all sections (graceful degradation)
- **prefers-reduced-motion active**: All animations disabled/reduced; content displays statically with no motion

## Performance Considerations

- **Embedded CSS**: Eliminates an extra HTTP request for a stylesheet
- **Font display swap**: `display=swap` in the Google Fonts URL ensures text is visible immediately with fallback fonts while custom fonts load
- **Image optimization**: The `image.png` should be kept under ~1.5 MB to meet the 2 MB total page weight budget
- **Minimal JavaScript**: ~20 lines of inline JS for Intersection Observer; no external scripts or animation libraries
- **CSS animations over JS**: GPU-accelerated CSS transforms and opacity changes for smooth 60fps animations
- **Particle count limited**: 8 particles keeps DOM lightweight while providing visual richness
- **`will-change` hints**: Applied sparingly to animated elements to enable compositor-layer promotion without excessive memory use

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Responsive layout without horizontal overflow

*For any* viewport width between 320px and 1920px, the Invitation_Page SHALL render without producing a horizontal scrollbar, and all text content SHALL remain visible within the viewport boundaries.

**Validates: Requirements 3.1, 3.2**

### Property 2: Hero image proportional scaling

*For any* viewport width between 320px and 1920px, the Hero_Section image SHALL have a rendered width that does not exceed the viewport width and SHALL maintain its original aspect ratio (no distortion).

**Validates: Requirements 3.3**

### Property 3: Page fade-in completes within 1 second

*For any* page load, the body element's fade-in animation SHALL have a total duration of at most 1 second and SHALL transition opacity from 0 to 1.

**Validates: Requirements 6.1**

### Property 4: Staggered section entrance ordering

*For any* ordered sequence of content sections on the page, each section's animation delay SHALL be strictly greater than the previous section's delay, ensuring sequential reveal.

**Validates: Requirements 6.2**

### Property 5: Gold accent elements have glow and shimmer effects

*For any* element with the `.gold-accent` class, the element SHALL have both a text-shadow producing a glow effect and a shimmer animation applied via CSS.

**Validates: Requirements 6.3, 6.4**

### Property 6: Hover transitions on interactive elements

*For any* interactive or decorative element (detail items, gold accents, footer text), the element SHALL have a CSS transition property defined with a duration of at least 300ms, and a `:hover` state that produces a visible change.

**Validates: Requirements 6.6**

### Property 7: Animation durations prevent rapid motion

*For any* CSS animation or transition defined on the Invitation_Page, the duration SHALL be at least 300ms to prevent rapid, distracting motion.

**Validates: Requirements 6.8**

### Property 8: Reduced motion disables all animations

*For any* element with animations or transitions, when the `prefers-reduced-motion: reduce` media query is active, the element SHALL have its animations effectively disabled (duration near zero or animation set to none) and content SHALL be immediately visible without motion.

**Validates: Requirements 6.9**
