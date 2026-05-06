# CodeGrid — Digital Agency Website

<div align="center">

![CodeGrid](https://img.shields.io/badge/CodeGrid-Tech-FF5520?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![Mobile](https://img.shields.io/badge/Mobile-Responsive-blue?style=for-the-badge)

**A modern, performant digital agency website built with clean HTML, CSS, and vanilla JavaScript.**

[Live Demo](https://code-grid-tech.vercel.app) · [Report Bug](#) · [Request Feature](#)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Sections](#sections)
- [Design System](#design-system)
- [Animations & Interactions](#animations--interactions)
- [Responsive Design](#responsive-design)
- [Assets](#assets)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

CodeGrid is the official website of a young, ambitious Istanbul-based software agency. The site is designed to communicate professionalism, speed, and creativity — reflecting the agency's core values through its dark-themed, minimalist aesthetic with bold orange accents.

The website serves as a portfolio, service showcase, and client acquisition tool. Every design decision was made with conversion and trust-building in mind: from the alternating dark/light section rhythm to the animated Istanbul marker on the Turkey map.

---

## Features

- **Alternating section backgrounds** — Dark and light sections create visual rhythm and guide the reader's eye naturally down the page
- **Scroll-triggered animations** — Sections and elements fade in sequentially using `IntersectionObserver`, with 150ms stagger delays
- **Interactive Turkey map** — A real SVG map of Turkey with an animated Istanbul marker (pulse/heartbeat effect) showing the agency's origin
- **Responsive hamburger menu** — Mobile navigation with a clean dropdown (not full-screen overlay) that keeps page content visible
- **Accordion FAQ** — Smooth expand/collapse for frequently asked questions
- **Process timeline** — Vertical step-by-step layout with Lucide icons, orange accent highlights, and key phrase emphasis
- **Project showcase** — Portfolio grid with "Coming Soon" placeholder cards
- **Contact section** — Direct contact form and info

---

## Tech Stack

| Technology         | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| HTML5              | Semantic markup                                    |
| CSS3               | Styling, animations, responsive layout             |
| Vanilla JavaScript | Interactions, IntersectionObserver, hamburger menu |
| Lucide Icons       | SVG icon set for the process section               |
| SVG                | Turkey map (`turkey.svg`)                          |
| Vercel             | Hosting & deployment                               |

No frameworks, no build tools, no dependencies — just clean, fast, native web technologies.

---

## Project Structure

```
codegrid/
├── index.html          # Main HTML file (all sections)
├── style.css           # All styles including responsive breakpoints
├── script.js           # Interactions: scroll animations, hamburger, accordion
├── turkey.svg          # Turkey map SVG (orange stroke, transparent fill)
└── README.md           # This file
```

---

## Sections

### 1. Hero

The first impression. Full-viewport dark background with the CodeGrid headline, a strong subheadline, and a primary CTA button ("Bize Ulaşın →"). No animations on load — intentionally immediate.

### 2. Biz Kimiz? (About)

Two-column layout: descriptive text on the left, the Turkey SVG map on the right. The map features an animated Istanbul marker (heartbeat pulse effect in white) indicating the agency's base. Text highlights key phrases in bold.

### 3. Projeler (Projects)

A 3-column grid showcasing completed projects with:

- Project thumbnail/screenshot
- Category tags (pill badges)
- Title and description
- Demo link
- "Yakında" (Coming Soon) placeholder cards for future projects — minimal, centered, subtle background

### 4. Nasıl Çalışıyoruz? (Process)

A vertical, kutusuz (box-free) timeline of 5 steps:

1. **Keşif & Brifing** — Discovery & Briefing (~2–3 days)
2. **Analiz & Strateji** — Analysis & Strategy (~2–3 days)
3. **Tasarım & Prototip** — Design & Prototype (~1–2 weeks)
4. **Geliştirme & Test** — Development & Testing (~2–6 weeks)
5. **Teslim & Destek** — Delivery & Support (Ongoing)

Each step has a Lucide icon, bold title, description with orange-highlighted action verbs, and a duration badge. Steps animate in sequentially on scroll.

### 5. SSS (FAQ)

Accordion-style FAQ with 7 questions covering:

- How to start a project
- Project timelines
- Pricing model
- Post-delivery support
- Site renewal
- Mobile app availability (responsive web only)
- Starting from scratch

### 6. İletişim (Contact)

Contact information and a form for project inquiries.

---

## Design System

### Colors

| Token            | Value                             | Usage                                         |
| ---------------- | --------------------------------- | --------------------------------------------- |
| Background Dark  | `#111111`                         | Dark sections (Hero, About, Process, Contact) |
| Background Light | `#ffffff`                         | Light sections (Projects, FAQ)                |
| Accent           | `#E84B1A` / `#FF5520`             | CTAs, icons, highlights, map strokes          |
| Text Primary     | `#ffffff` (dark) / `#111` (light) | Headings                                      |
| Text Secondary   | `rgba(255,255,255,0.65)`          | Body text on dark                             |
| Text Muted       | `rgba(255,255,255,0.4)`           | Tags, badges, secondary info                  |

### Typography

- **Headings**: Extra bold (`font-weight: 800`), large scale
- **Body**: Regular weight, generous `line-height: 1.7–1.8`
- **Accent phrases**: Key verbs and phrases wrapped in `<span>` with orange color

### Spacing

Sections use consistent `padding-top` and `padding-bottom` values so that navigating via the navbar anchors always shows a full, balanced section view. All sections use `scroll-margin-top` to account for the fixed navbar height.

---

## Animations & Interactions

### Scroll Fade-In

All section content uses `IntersectionObserver` with a shared `.fade-in-up` utility class:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Elements animate sequentially with 150ms stagger delays per group.

### Istanbul Marker (Turkey Map)

A heartbeat pulse effect using layered divs and CSS animations:

```css
@keyframes liqBeat {
  0%,
  100% {
    transform: scale(1);
  }
  30% {
    transform: scale(0.7);
  }
  60% {
    transform: scale(1.1);
  }
}
@keyframes liqExpand {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(4.5);
    opacity: 0;
  }
}
```

### Hamburger Menu (Mobile)

Toggles a dropdown below the navbar on mobile. The menu does not overlay the full screen — page content remains visible beneath it.

### FAQ Accordion

Click to expand/collapse answers. Only CSS transitions, no external libraries.

---

## Responsive Design

| Breakpoint              | Layout                                         |
| ----------------------- | ---------------------------------------------- |
| Desktop (`> 1024px`)    | Full two-column layouts, large typography      |
| Tablet (`769px–1024px`) | Adjusted column ratios, map centered           |
| Mobile (`≤ 768px`)      | Single column, stacked sections, hamburger nav |

### Mobile-specific adjustments

- All `grid-template-columns` collapse to `1fr`
- `flex-direction: column` for all flex layouts
- Turkey map: `width: 100%`, `margin: 0 auto`
- Section padding: `60px 20px`
- Headings: `clamp()` for fluid font sizing
- `overflow-x: hidden` on `html` and `body` to prevent horizontal scroll

---

## Assets

### turkey.svg

A detailed SVG outline of Turkey's borders, sourced and integrated inline. Styled with:

- `fill: transparent` (shows section background through)
- `stroke: #E84B1A` (agency accent color)
- `stroke-width: 1.5` (desktop) / `2px` (mobile, more visible)
- `viewBox="0 0 1820 780"` (crops watermark, preserves full map)

---

## Getting Started

Since this is a pure HTML/CSS/JS project, no build step is required.

```bash
# Clone the repository
git clone https://github.com/your-username/codegrid.git

# Navigate to the project
cd codegrid

# Open in browser (or use a local server)
open index.html

# Or with VS Code Live Server
# Right-click index.html → Open with Live Server
```

---

## Deployment

The site is deployed on **Vercel** with zero configuration.

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

Or simply connect the GitHub repository to Vercel for automatic deployments on every push to `main`.

---

## Contributing

This is a client project. If you're part of the CodeGrid team:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test on desktop and mobile (especially iPhone 12 Pro viewport: 390px)
4. Commit: `git commit -m "feat: your change description"`
5. Push and open a pull request

---

<div align="center">

Made with passion in **Istanbul** 🇹🇷

**CodeGrid** — _Markanızı dijital dünyaya taşıyoruz._

</div>
