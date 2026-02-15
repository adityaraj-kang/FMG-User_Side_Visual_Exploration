# Find My Genie — Design System Showcase

**Repo:** https://github.com/adityaraj-kang/FMG-User_Side_Visual_Exploration.git

## What This Project Is

A mobile app design system showcase for **Find My Genie** — an AI-powered service marketplace. The user describes a service need (plumber, towing, electrician, etc.), the AI agent deploys 20+ parallel voice agents to negotiate with vendors, and returns the 2 best deals (cheapest and fastest).

This repo renders **5 visual theme iterations** of the same HomeScreen in a single React app, each mimicking a different brand's design language.

## Tech Stack

- **React 19** + **TypeScript ~5.9** + **Vite 7.3** + **Tailwind CSS v4**
- **Phosphor Icons** (`@phosphor-icons/react`) — single icon library, weight-based theming per iteration
- **No lucide-react** — fully removed, all icons are Phosphor
- **Fonts** (Google Fonts): Outfit, Plus Jakarta Sans, Roboto, Lora, DM Sans

## Architecture

```
src/app/
├── App.tsx                    # Root: ThemeProvider + theme selector tabs + HomeScreen
├── context/ThemeContext.tsx    # React Context for theme state (useTheme hook)
├── types/theme.ts             # ThemeTokens interface, ActivityDeal, ActivityItemData
├── themes/
│   ├── index.ts               # exports themes[] array + individual named exports
│   ├── material-you.ts        # Google Material You (light)
│   ├── apple-ios.ts           # Apple iOS (light)
│   ├── claude.ts              # Claude/Anthropic (light)
│   ├── uber.ts                # Uber (dark)
│   └── premium.ts             # "Current" — Genie DS v3.0 (dark)
├── screens/HomeScreen.tsx     # Layout: Header → SuggestionsGrid → RecentActivity → SearchBar → BottomNav
└── components/
    ├── Header.tsx             # Greeting + notification bell (UtilityIcon)
    ├── SearchBar.tsx          # ⚠️ AI chat entry point (NOT a search bar!)
    ├── SuggestionsGrid.tsx    # 8 service category cards/list (ServiceIcon)
    ├── RecentActivity.tsx     # 2 statuses: in-progress + served
    ├── BottomNav.tsx          # 4-tab navigation (NavIcon)
    ├── StatusBar.tsx          # Phone chrome (9:41, signal, wifi, battery)
    ├── MobileFrame.tsx        # iPhone frame wrapper
    ├── ServiceIcons.tsx       # Service names data array (no icon components)
    └── icons/
        ├── types.ts           # ServiceIconName, NavIconName, UtilityIconName, PhosphorWeight
        ├── ServiceIcon.tsx    # Phosphor icon + per-theme weight
        ├── NavIcon.tsx        # Phosphor icon + active/inactive weight pairs
        ├── UtilityIcon.tsx    # Phosphor utility icons (bell, search, arrow, etc.)
        └── index.ts           # Barrel exports
```

## The 5 Theme Iterations

| ID | Label | Mode | Heading Font | Body Font | Accent | Phosphor Weight (inactive → active) |
|----|-------|------|-------------|-----------|--------|--------------------------------------|
| `material-you` | Google | light | Plus Jakarta Sans | Roboto | `#6750A4` | regular → fill |
| `apple-ios` | iOS | light | System (-apple-system) | System | `#007AFF` | regular → fill |
| `claude` | Claude | light | Lora (serif) | DM Sans | `#C96442` | thin → light |
| `uber` | Uber | dark | DM Sans | DM Sans | `#FFFFFF` | bold → fill |
| `premium` | Current | dark | Outfit | Plus Jakarta Sans | `#FF4D00` | regular → fill |

> **Note:** The premium theme's internal `id` is `'premium'` but its display `name`/`label` is **"Current"**.

## Critical Design Decisions

1. **SearchBar is the AI chat entry point** — user describes service needs here. Each theme has its own `chatInput` config (placeholder, leading icon, trailing icon) in the theme tokens.
2. **Chat input is at the bottom for ALL 5 themes** — no Apple-at-top exception.
3. **RecentActivity has exactly 2 statuses:**
   - `in-progress`: pulsing dot, "AI calling plumbers near you...", vendor negotiation count
   - `served`: check icon, 2 best deals inline ("Best Price: $85 · Mike's Towing", "Fastest: 15 min · QuickFix Pro")
4. **The "Current" theme follows the Genie Design System v3.0** — full DS reference at `/Users/adityaraj0421/Downloads/genie_design_system (1).md`

## Genie Design System Quick Reference (Current Theme)

- **Brand color:** `#FF4D00` ("The Signal")
- **Backgrounds:** `#050505` (default), `#121212` (surface), `#1A1A1A` (input)
- **Text:** `#EDEDED` (primary), `#A1A1A1` (body), `#666666` (muted)
- **Borders:** `#333333` (subtle), `#555555` (strong)
- **Status:** `#00E096` (success), `#FF2D55` (error), `#FFC043` (warning), `#2E93FA` (info)
- **Typography:** Outfit (headings), Plus Jakarta Sans (body)
- **No glass effects** — solid surfaces with 1px borders
- **Radius:** 8px buttons, 12px cards, 24px modals
- **UX voice:** System language — "Enter Query...", "Scanning Grid...", not "Search here..."

## Icon System

All icons from `@phosphor-icons/react`. Weight varies per theme:

- **Service icons:** Truck, PipeWrench, Snowflake, Lightning, Tree, Hammer, HouseSimple, Bug
- **Nav icons:** House, GridFour, Clock, UserCircle
- **Utility icons:** Bell, Sparkle, ChatCircle, MagnifyingGlass, ArrowUp, Microphone, CaretRight, Check

Weight mappings live in `ServiceIcon.tsx`, `NavIcon.tsx`, and `UtilityIcon.tsx`.

## Conventions

- All component styling uses inline `style={{}}` reading from theme tokens — no hardcoded hex values
- Theme-specific branches use `theme.id === 'premium'`, `theme.id === 'apple-ios'`, etc.
- Components access theme via `const { theme } = useTheme()` then destructure `theme.typography`, `theme.colors`, `theme.spacing`
- **Adding a new theme:** create `themes/new-theme.ts` → add to `themes/index.ts` array → add weight entry in `icons/ServiceIcon.tsx`, `NavIcon.tsx`, `UtilityIcon.tsx`

## Commands

```bash
npm run dev     # Start dev server (Vite)
npm run build   # Production build (outputs to dist/)
npx tsc --noEmit  # Type check without emitting
```

## Project History

1. **Session 1:** Built initial 5 theme iterations with Lucide icons, basic SearchBar and RecentActivity
2. **Session 2:** Content model fix (SearchBar → AI chat entry, RecentActivity → 2 statuses), brand authenticity updates (correct fonts, colors per theme), attempted custom SVG icon sets per theme (40 service + 20 nav icons) — later replaced
3. **Session 3:** Replaced custom SVGs + Lucide with Phosphor Icons (weight-based theming), renamed Premium → "Current" and applied Genie Design System v3.0 (orange #FF4D00 accent, Outfit + Plus Jakarta Sans, solid surfaces, no glass effects), code cleanup (removed dead Vite scaffold files, updated .gitignore, fixed stale Inter font reference in index.css), created CLAUDE.md, pushed to GitHub
4. **Session 4 (Vercel Deployment Fix):** Fixed TypeScript TS6133 error blocking Vercel deployment — removed unused `s` (spacing) variable in `BottomNav.tsx` line 22. Build now completes successfully (`npm run build` passes locally and on Vercel).

## Session Maintenance

At the end of significant work sessions, ask Claude to **"Update CLAUDE.md with what we did"** so future sessions start with full context.
