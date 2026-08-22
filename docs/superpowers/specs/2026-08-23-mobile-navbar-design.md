# Mobile Navbar Tightening - Design

Date: 2026-08-23

## Problem

Below the 52rem breakpoint the sticky header feels cramped: the full brand name and the gold CTA sit close together with large gaps and a tall 60px bar.

## Decision

Option 1: CSS-only spacing and sizing fixes. No markup, JS, copy, color, or desktop changes.

## Changes

One new rule block scoped to `@media(max-width:51.99rem)`, placed at the end of the header section of styles.css to respect source order:

- `.head-in`: min-height 60px to 54px, gap 1rem to .6rem, flex-wrap nowrap
- `.mark`: font-size 1.05rem to .95rem
- `.head-nav`: gap 1.6rem to 1rem
- `.site-head .btn-sm`: reduced padding and font-size so brand and CTA fit with visible air between them

## Untouched

Colors, copy, breakpoints above 52rem, sticky/backdrop behavior, all other sections.

## Verification

1. Open index.html directly from disk, resize to 390px width: single row, no wrap, no horizontal scroll, clear space between brand and button.
2. Resize above 52rem: header identical to current desktop rendering.
