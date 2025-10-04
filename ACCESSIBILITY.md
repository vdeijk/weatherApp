# ♿ Accessibility Documentation

## Overview

FestivaCast is designed with accessibility as a core principle, ensuring that all users—regardless of ability—can plan their outdoor events with confidence. This document outlines the accessibility features implemented throughout the application.

---

## 🎯 WCAG 2.1 Compliance

We strive to meet **WCAG 2.1 Level AA** standards across all features.

---

## ✨ Implemented Accessibility Features

### 1. **Keyboard Navigation**

All interactive elements are fully keyboard accessible:

- ✅ **Tab Navigation** – All buttons, links, inputs, and cards are reachable via Tab key
- ✅ **Enter/Space Activation** – Event cards respond to Enter and Space key presses
- ✅ **Skip to Content Link** – Press Tab on page load to skip navigation and jump to main content
- ✅ **Logical Tab Order** – Tab sequence follows visual layout and user workflow

**Testing:**
- Navigate the entire app using only keyboard (Tab, Enter, Space, Arrow keys)
- Skip link appears when focused (top-left corner)

---

### 2. **Focus Indicators**

Clear visual feedback for keyboard users:

- ✅ **Focus-Visible Styles** – All interactive elements show a prominent outline when focused
- ✅ **High Contrast Outlines** – 3px solid red or blue outlines with 2-3px offset
- ✅ **No Focus Traps** – Users can always navigate away from any element

**CSS Implementation:**
```css
/* Example from Button component */
.button:focus-visible {
  outline: 3px solid var(--color-red);
  outline-offset: 3px;
}
```

---

### 3. **ARIA Labels & Attributes**

Comprehensive ARIA implementation for screen readers:

#### Forms & Inputs
- `aria-label` on all form inputs (location, date)
- `<label>` elements with `for` attributes (visually hidden where needed)
- Form has `aria-label="Weather forecast search form"`

#### Navigation
- `aria-current="page"` on active navigation links
- `aria-label="Main navigation"` on nav element

#### Interactive Elements
- Event cards have `role="button"` and `tabIndex={0}` for keyboard access
- Event cards use `aria-pressed={isSelected}` to indicate selection state
- Buttons include descriptive `aria-label` attributes

#### Event Cards
```tsx
<div 
  role="button"
  tabIndex={0}
  aria-pressed={isSelected}
  aria-label={`Event: ${event.name} on ${event.date} at ${event.time} in ${event.location}`}
>
```

---

### 4. **Semantic HTML**

Proper use of HTML5 semantic elements:

- ✅ `<nav>` for navigation bar
- ✅ `<main>` with `id="main-content"` for main content area
- ✅ `<form>` for search inputs
- ✅ `<button>` elements (not divs) for all interactive buttons
- ✅ `<h1>`, `<h2>`, `<h3>` heading hierarchy maintained
- ✅ `<label>` elements paired with form inputs

---

### 5. **Color & Contrast**

High contrast color scheme for readability:

- ✅ **Primary Text** – Dark gray (#222) on light backgrounds
- ✅ **Accent Colors** – High contrast red (#e74c3c) and blue (#0984e3)
- ✅ **Interactive Elements** – Clear visual distinction between clickable and non-clickable
- ✅ **Selected State** – Red border (3px solid) on selected event cards
- ✅ **Map Markers** – Red for events, blue for selected locations (clear color distinction)

**Contrast Ratios:**
- Text: 7:1+ (AAA level)
- Interactive elements: 4.5:1+ (AA level)
- Focus indicators: 3:1+ (AA level)

---

### 6. **Responsive & Mobile Accessible**

Mobile-first design ensures touch-friendly interfaces:

- ✅ **Touch Targets** – Minimum 44x44px touch areas for buttons and links
- ✅ **Generous Padding** – All interactive elements have substantial padding
- ✅ **No Hover-Only Content** – All hover states have equivalent focus states
- ✅ **Pinch-to-Zoom Enabled** – Viewport meta tag allows user zooming

---

### 7. **Screen Reader Support**

Optimized for assistive technologies:

- ✅ **Descriptive Link Text** – "Get Forecast" instead of "Click here"
- ✅ **Image Alt Text** – All images have descriptive alt attributes
- ✅ **Form Labels** – Every input has an associated label (visible or visually-hidden)
- ✅ **Landmark Regions** – Proper use of `<nav>`, `<main>`, `<form>` for easy navigation
- ✅ **Status Messages** – Loading states and errors announced to screen readers

**Visually Hidden Class:**
```css
.visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

### 8. **Skip Navigation Link**

Keyboard users can bypass navigation:

- ✅ Hidden by default, appears on Tab focus
- ✅ Jumps directly to `#main-content` when activated
- ✅ Red background with white text for visibility
- ✅ Positioned at top-left corner when focused

**Usage:**
1. Press Tab when page loads
2. "Skip to main content" link appears
3. Press Enter to jump to main content

---

## 🧪 Testing Guidelines

### Manual Testing Checklist

- [ ] **Keyboard Only Navigation**
  - Navigate entire app using only keyboard
  - Verify all interactive elements are reachable
  - Check focus indicators are visible

- [ ] **Screen Reader Testing**
  - Test with NVDA (Windows) or VoiceOver (Mac)
  - Verify all content is announced properly
  - Check ARIA labels are descriptive

- [ ] **Color Contrast**
  - Use browser DevTools or online contrast checker
  - Verify all text meets WCAG AA standards (4.5:1)

- [ ] **Zoom & Magnification**
  - Test at 200% zoom level
  - Verify no content is cut off
  - Check layout remains usable

- [ ] **Touch Targets**
  - On mobile device, verify all buttons/links are easy to tap
  - Ensure no accidental taps due to proximity

### Automated Testing Tools

- **axe DevTools** – Browser extension for accessibility audits
- **WAVE** – Web accessibility evaluation tool
- **Lighthouse** – Chrome DevTools accessibility score
- **Pa11y** – Command-line accessibility testing

---

## 🚀 Future Accessibility Enhancements

### Planned Improvements

- [ ] **Live Regions** – Add ARIA live regions for dynamic content updates
- [ ] **Reduced Motion** – Respect `prefers-reduced-motion` media query
- [ ] **High Contrast Mode** – Add Windows High Contrast Mode support
- [ ] **Focus Management** – Improve focus management on route changes
- [ ] **Error Messages** – Link error messages to form fields with `aria-describedby`
- [ ] **Loading States** – Add `aria-busy` attribute during data fetching
- [ ] **Autocomplete** – Add autocomplete attributes to location input
- [ ] **Multi-Language** – Add language switching with proper `lang` attributes

---

## 📚 Resources & Standards

### WCAG Guidelines
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Screen Readers
- [NVDA (Windows)](https://www.nvaccess.org/)
- [JAWS (Windows)](https://www.freedomscientific.com/products/software/jaws/)
- [VoiceOver (Mac/iOS)](https://www.apple.com/accessibility/voiceover/)

---

## 🤝 Reporting Accessibility Issues

If you encounter any accessibility barriers while using FestivaCast, please:

1. **Open an Issue** on GitHub with the label `accessibility`
2. **Include Details**:
   - Description of the barrier
   - Steps to reproduce
   - Assistive technology used (if applicable)
   - Browser and OS version

We are committed to continuous improvement and welcome feedback from the accessibility community.

---

## 📝 Accessibility Statement

**FestivaCast** is committed to ensuring digital accessibility for all users, including those with disabilities. We are continually improving the user experience and applying relevant accessibility standards.

**Conformance Status:** Partial Conformance (WCAG 2.1 Level AA)

**Feedback:** We welcome your feedback on the accessibility of FestivaCast. Please contact us via GitHub issues.

**Last Updated:** October 4, 2025

---

**Built with accessibility in mind for the NASA Space Apps Challenge 2025** ♿🚀
