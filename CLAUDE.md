# Find My Genie — Design System Showcase

**Repo:** https://github.com/adityaraj-kang/FMG-User_Side_Visual_Exploration.git

## What This Project Is

A mobile app design system showcase for **Find My Genie** — an AI-powered service marketplace. The user describes a service need (plumber, towing, electrician, etc.), the AI agent deploys 20+ parallel voice agents to negotiate with vendors, and returns the 2 best deals (cheapest and fastest).

This repo renders **16 visual theme iterations** of the same HomeScreen in a single React app — 3 Designer's Choice variations (DC Light / DC Color / DC Fill) + 5 brand-inspired directions + 5 Uber-inspired layout variations (3D icon styles) + 3 new compact explorations (Unicons).

## Tech Stack

- **React 19** + **TypeScript ~5.9** + **Vite 7.3** + **Tailwind CSS v4**
- **Phosphor Icons** (`@phosphor-icons/react`) — weight-based theming for nav/utility icons
- **Unicons** (`@iconscout/react-unicons`) — line-style service icons for 3 new explorations (Dash, Aura, Matrix)
- **SVG 3D Icons** — 40 custom SVG assets (8 services × 5 styles) for original Uber variation service icons
- **html-to-image** — DOM-to-PNG export for downloading phone frame screenshots at 2x resolution
- **No lucide-react** — fully removed, all icons are Phosphor + Unicons + custom SVGs
- **Fonts** (Google Fonts): Outfit, Plus Jakarta Sans, Roboto, Lora, DM Sans, Space Grotesk, Inter, Bebas Neue, Nunito, Nunito Sans, JetBrains Mono

## Architecture

```
src/app/
├── App.tsx                    # Root: ThemeProvider + theme selector + HomeScreen + Download PNG button
├── context/ThemeContext.tsx    # React Context for theme state (useTheme hook)
├── types/theme.ts             # ThemeTokens interface (with layout, icon style fields)
├── themes/
│   ├── index.ts               # exports themes[] array (16 themes) + named exports
│   ├── designers-choice.ts    # Designer's Choice — 3 variations (DC Light, DC Color, DC Fill) via shared base
│   ├── material-you.ts        # Google Material You (light)
│   ├── apple-ios.ts           # Apple iOS (light)
│   ├── claude.ts              # Claude/Anthropic (light)
│   ├── uber.ts                # Uber (dark)
│   ├── premium.ts             # "Current" — Genie DS v3.0 (dark)
│   ├── uber-nightride.ts      # Nightride — horizontal scroll, glossy 3D, blue
│   ├── uber-grid.ts           # Grid — 2-col hero cards, flat vivid, white
│   ├── uber-signal.ts         # Signal — pill categories, gradient outlined, teal
│   ├── uber-soft.ts           # Soft — bento grid, clay 3D, purple
│   ├── uber-mono.ts           # Mono — vertical stack, isometric, terminal green
│   ├── uber-dash.ts           # Dash — chip/pill rows, Unicons, warm orange
│   ├── uber-aura.ts           # Aura — floating cards, Unicons, muted gold
│   └── uber-matrix.ts         # Matrix — 3-col compact tiles, Unicons, soft violet
├── screens/HomeScreen.tsx     # Layout: Header → SuggestionsGrid → RecentActivity → SearchBar → BottomNav (forwardRef)
└── components/
    ├── Header.tsx             # Greeting + notification bell (9 variation-specific greetings)
    ├── SearchBar.tsx          # ⚠️ AI chat entry point (per-variation CTA colors)
    ├── SuggestionsGrid.tsx    # 10 layout sub-components routed by theme.layout.suggestionsStyle
    ├── RecentActivity.tsx     # 4 activity styles (standard, timeline, card, minimal + ASCII)
    ├── BottomNav.tsx          # 4-tab navigation (Mono labels, Soft glow)
    ├── StatusBar.tsx          # Phone chrome (9:41, signal, wifi, battery)
    ├── MobileFrame.tsx        # iPhone frame wrapper (forwardRef for PNG export)
    ├── ServiceIcons.tsx       # Service names data array (no icon components)
    └── icons/
        ├── types.ts           # ServiceIconName, NavIconName, UtilityIconName, PhosphorWeight
        ├── ServiceIcon.tsx    # Phosphor + branching to ServiceIcon3D or UniconsServiceIcon
        ├── ServiceIcon3D.tsx  # 3D SVG icon renderer (40 assets, 5 styles)
        ├── UniconsServiceIcon.tsx # Unicons adapter for Dash/Aura/Matrix service icons
        ├── NavIcon.tsx        # Phosphor icon + active/inactive weight pairs (16 themes)
        ├── UtilityIcon.tsx    # Phosphor utility icons (16 theme weight entries)
        └── index.ts           # Barrel exports (includes ServiceIcon3D, UniconsServiceIcon)

src/assets/icons/              # 3D SVG icon assets
├── glossy/                    # Nightride: rounded rect bg, linear gradients, specular highlights
├── flat/                      # Grid: solid flat colors, no gradients/shadows
├── outlined/                  # Signal: wireframe gradient strokes (white → teal)
├── clay/                      # Soft: radial gradient circles, matte pastel colors
└── isometric/                 # Mono: polygon flat fills, 3 gray tones + green accent
```

## The 16 Theme Iterations

### Designer's Choice — 3 Variations (DC Family)

All 3 share the same layout, greeting, spacing, CTA, and behavior — they differ **only** in service icon weight and color.

| ID | Label | Mode | Icon Weight | Icon Color | Accent | Heading Font |
|----|-------|------|-------------|------------|--------|-------------|
| `designers-choice` | DC Light | dark | `'light'` (thin outlines) | Uniform gray `#ABABAB` | `#FF4D00` orange | DM Sans |
| `dc-line-color` | DC Color | dark | `'regular'` (medium outlines) | Per-service unique colors | `#FF4D00` orange | DM Sans |
| `dc-fill-color` | DC Fill | dark | `'fill'` (solid filled) | Per-service unique colors | `#FF4D00` orange | DM Sans |

**Shared DC Characteristics:**
- **Greeting:** "What do you need, Dinesh?" (action-oriented, accent on name)
- **Section Heading:** "Top Services" instead of "Suggestions"
- **Icon Containers:** Gray (#1F1F1F) 56px rounded squares matching Uber's style
- **In-Progress Status:** Orange (#FF4D00) pulsing dot and status text (instead of white)
- **Timestamp:** "Requested 2 min ago" (emphasizes speed narrative)
- **Activity Style:** Standard (grouped card with rounded bg)
- **CTA Button:** Orange (#FF4D00) with black text
- **Bottom Nav:** No top border, black background matching Uber variations
- **Spacing:** Optimized tight spacing to fit 852px frame (sectionGap: 20px)
- **Location pin:** "Atlanta" location indicator above greeting

**DC Icon Color Palette** (used by DC Color and DC Fill):
- Towing: `#FF6A2B`, Plumber: `#2E93FA`, HVAC: `#00E096`, Electrician: `#FFC043`
- Lawn Care: `#34C759`, Handyman: `#FF8C00`, Roofing: `#A1A1A1`, Pest Control: `#FF2D55`

**Architecture:** `designers-choice.ts` uses a `dcBase` object (shared config) with spread syntax to produce 3 exports: `designersChoiceTheme`, `dcLineColorTheme`, `dcFillColorTheme`. The `iconColors` field is empty `{}` for DC Light (falls back to gray) and populated for DC Color/Fill.

### Original 5 — Brand Directions

| ID | Label | Mode | Heading Font | Body Font | Accent | Phosphor Weight |
|----|-------|------|-------------|-----------|--------|-----------------|
| `material-you` | Google | light | Plus Jakarta Sans | Roboto | `#6750A4` | regular → fill |
| `apple-ios` | iOS | light | System (-apple-system) | System | `#007AFF` | regular → fill |
| `claude` | Claude | light | Lora (serif) | DM Sans | `#C96442` | thin → light |
| `uber` | Uber | dark | DM Sans | DM Sans | `#FFFFFF` | bold → fill |
| `premium` | Current | dark | Outfit | Plus Jakarta Sans | `#FF4D00` | regular → fill |

### 5 Uber-Inspired Variations (3D SVG Icons)

| ID | Label | Layout | 3D Icon Style | Accent | Heading Font |
|----|-------|--------|---------------|--------|-------------|
| `uber-nightride` | Nightride | Horizontal scroll | Glossy 3D | `#276EF1` blue | Space Grotesk |
| `uber-grid` | Grid | 2-col hero cards | Flat vivid | `#FFFFFF` white | DM Sans 800 |
| `uber-signal` | Signal | Pill categories | Gradient outlined | `#00D4AA` teal | Bebas Neue |
| `uber-soft` | Soft | Bento grid | Clay 3D | `#7B61FF` purple | Nunito |
| `uber-mono` | Mono | Vertical stack | Isometric | `#00FF88` green | JetBrains Mono |

### 3 New Explorations (Unicons, Small Icons)

| ID | Label | Layout | Icon Style | Accent | Heading Font |
|----|-------|--------|------------|--------|-------------|
| `uber-dash` | Dash | Chip/pill rows | Unicons 18px in 28px circles | `#FF6B35` warm orange | DM Sans 700 |
| `uber-aura` | Aura | Floating cards | Unicons 20px inline | `#C9A96E` muted gold | Plus Jakarta Sans 600 |
| `uber-matrix` | Matrix | 3-col compact tiles | Unicons 22px in 36px containers | `#A78BFA` soft violet | Space Grotesk 600 |

> **Key principle:** All Uber variations are dark-mode, Uber-*inspired* (not copies). Original 5 use 3D SVG icons (48-72px). New 3 use Unicons (18-22px) in compact, mobile-native-feeling layouts.

## Layout System (SuggestionsGrid)

The `SuggestionsGrid` component routes to 10 different sub-components based on `theme.layout?.suggestionsStyle`:

| Style Token | Component | Used By |
|-------------|-----------|---------|
| `'grid-4col'` (default) | `DefaultGridView` | DC Light, DC Color, DC Fill, Material You, Claude, Uber, Premium |
| Apple list | `AppleListView` | iOS |
| `'horizontal-scroll'` | `HorizontalScrollView` | Nightride |
| `'grid-2col'` | `TwoColumnHeroView` | Grid |
| `'pill-categories'` | `PillCategoriesView` | Signal |
| `'bento'` | `BentoGridView` | Soft |
| `'vertical-stack'` | `VerticalStackView` | Mono |
| `'chip-rows'` | `ChipRowsView` | Dash |
| `'floating-cards'` | `FloatingCardsView` | Aura |
| `'compact-tile-grid'` | `CompactTileGridView` | Matrix |

## Activity Styles (RecentActivity)

| Style | Visual | Used By |
|-------|--------|---------|
| `'standard'` | Card with rounded bg, pulse dot | DC Light, DC Color, DC Fill, Original 5 themes |
| `'timeline'` | Left accent bar per row | Nightride |
| `'card'` | Separate rounded cards per activity | Soft |
| `'minimal'` | Bare rows, full-width dividers | Grid, Signal, Mono |

**Designer's Choice Status Customizations (all 3 DC variations):**
- In-progress status uses orange (#FF4D00) pulsing dot and status text (instead of default statusActive color)
- Timestamp shows "Requested 2 min ago" instead of "Just now" to emphasize speed narrative
- "Genie calling plumbers near you..." (uses "Genie" instead of "AI")

Mono has a special `MonoActivityRow` with ASCII progress indicators: `[||||..]` for in-progress, `[ok]` for served.

## Icon System

### Phosphor Icons (Nav & Utility)
All nav and utility icons from `@phosphor-icons/react`. Weight varies per theme (16 entries each in `NavIcon.tsx` and `UtilityIcon.tsx`).

### Phosphor Service Icons (DC Family + Original 5 Brand Themes)
When no `serviceIconStyle` is set (defaults to `'phosphor'`), `ServiceIcon.tsx` renders Phosphor icons with theme-specific weights.

**Service Icon Mapping:**
- Towing → `Truck`, Plumber → `PipeWrench`, HVAC → `Snowflake`, Electrician → `Lightning`
- Lawn Care → `Tree`, Handyman → `Hammer`, Roofing → `HouseLine`, Pest Control → `Bug`

> **Note:** Roofing uses `HouseLine` (not `House`) to avoid visual conflict with the Home nav icon which uses `House`. `HouseLine` has a roof-line emphasis that distinguishes it.

**DC icon color logic** (in `DefaultGridView`):
```typescript
isDC ? (theme.iconColors?.[service.name] || c.textSecondary) : ...
```
- DC Light: `iconColors` is `{}` → falls back to `c.textSecondary` (#ABABAB) → uniform gray
- DC Color / DC Fill: `iconColors` is populated → per-service unique color

**DC icon weight** (in `ServiceIcon.tsx` `themeWeights` map):
- `'designers-choice': 'light'` — thin outline strokes
- `'dc-line-color': 'regular'` — medium outline strokes (better color visibility)
- `'dc-fill-color': 'fill'` — solid filled icons

### 3D SVG Icons (Service Icons for Original 5 Uber Variations)
When `theme.serviceIconStyle` is a `3d-*` variant, `ServiceIcon.tsx` branches to `ServiceIcon3D.tsx` which renders `<img>` tags from statically imported SVG assets.

5 icon styles × 8 services = 40 SVG files:
- **Glossy** (Nightride): Rounded rect backgrounds, linear gradients, specular highlights, drop shadows
- **Flat vivid** (Grid): Solid flat colors, no gradients or shadows
- **Gradient outlined** (Signal): Wireframe strokes with gradient from white to teal
- **Clay 3D** (Soft): Radial gradient circles, matte pastel colors, gaussian blur shadows
- **Isometric** (Mono): Polygon flat fills in 3 gray tones with #00FF88 accent

### Unicons (Service Icons for New 3 Explorations)
When `theme.serviceIconStyle === 'unicons'`, `ServiceIcon.tsx` branches to `UniconsServiceIcon.tsx` which renders `@iconscout/react-unicons` line-style icons (MIT-like license, 4500+ icons).

Mapping: Towing→UilTruck, Plumber→UilWrench, HVAC→UilSnowflake, Electrician→UilBolt, Lawn Care→UilTrees, Handyman→UilConstructor, Roofing→UilEstate, Pest Control→UilBug.

Type declarations in `src/unicons.d.ts` (Unicons ships without `.d.ts` files).

## Variation-Specific Component Behavior

### Header Greetings
- **DC Light / DC Color / DC Fill:** "What do you need, Dinesh?" (action-oriented, orange accent on name) + "Atlanta" location pin
- **Nightride:** "Evening, Dinesh." (single line)
- **Grid:** "Hey Dinesh" (compact)
- **Signal:** "DINESH" (uppercase Bebas Neue)
- **Soft:** "Good evening," / "Dinesh" (two lines)
- **Mono:** `> dinesh_` (terminal prompt with blinking cursor CSS animation)
- **Dash:** "What do you need, Dinesh?" (accent on name)
- **Aura:** "Dinesh." (minimal with period)
- **Matrix:** "Evening, Dinesh" (casual)

### BottomNav
- **DC Light / DC Color / DC Fill:** No top border, black background (matches Uber variations)
- **Mono:** Lowercase labels via `monoLabels` map (home, grid, logs, user)
- **Soft:** Radial gradient glow behind active icon
- **All Uber variations:** No top border, background matches `c.background`

### SearchBar
- **DC Light / DC Color / DC Fill:** Orange CTA button (#FF4D00) with black icon
- Each variation has its own `chatInput` config (placeholder, leading icon, trailing icon)
- CTA button color: `c.ctaGreen || c.accent` for uber variations and DC family
- CTA icon color: `#000000` (dark text on colored button)

## DC Family Branching Pattern

All 3 DC variations share behavior via an `isDC` boolean defined inline in each component:

```typescript
const isDC = id === 'designers-choice' || id === 'dc-line-color' || id === 'dc-fill-color';
```

This follows the same convention as `isUberVariation = id.startsWith('uber-')`. Components that use this pattern:
- `Header.tsx` — location pin, greeting
- `SuggestionsGrid.tsx` — heading text, margins, row gap, icon color logic
- `SearchBar.tsx` — CTA button color, border
- `RecentActivity.tsx` — heading margin, divider margin, in-progress status color, served row
- `BottomNav.tsx` — no-border, black background
- `HomeScreen.tsx` — full sectionGap (not capped to 16px)

## ThemeTokens Extended Fields (Sessions 5 & 6)

```typescript
// Added to ThemeTokens interface:
layout?: {
  suggestionsStyle?: 'grid-4col' | 'horizontal-scroll' | 'grid-2col' | 'pill-categories'
    | 'bento' | 'vertical-stack' | 'chip-rows' | 'floating-cards' | 'compact-tile-grid';
  suggestionCardHeight?: string;
  activityStyle?: 'standard' | 'timeline' | 'minimal' | 'card';
  headerStyle?: 'standard' | 'compact' | 'hero';
};
serviceIconStyle?: 'phosphor' | '3d-glossy' | 'flat-vivid' | 'gradient-outlined'
  | '3d-clay' | '3d-isometric' | 'unicons';
serviceIconAssets?: Record<string, string>;
serviceSubtitles?: Record<string, string>;
```

All new fields are optional — existing themes continue to work without changes.

## Critical Design Decisions

1. **SearchBar is the AI chat entry point** — user describes service needs here. Each theme has its own `chatInput` config (placeholder, leading icon, trailing icon) in the theme tokens.
2. **Chat input is at the bottom for ALL 16 themes** — no Apple-at-top exception.
3. **RecentActivity has exactly 2 statuses:**
   - `in-progress`: pulsing dot (or ASCII `[||||..]` for Mono), "AI calling plumbers near you...", vendor negotiation count
   - `served`: check icon (or `[ok]` for Mono), 2 best deals inline
4. **The "Current" theme follows the Genie Design System v3.0** — full DS reference at `/Users/adityaraj0421/Downloads/genie_design_system (1).md`
5. **Uber variations use `theme.id.startsWith('uber-')` pattern** for grouping shared behavior (transparent bell bg, no top border on nav, CTA color logic)
6. **DC family uses `isDC` boolean pattern** — `id === 'designers-choice' || id === 'dc-line-color' || id === 'dc-fill-color'` for shared behavior across 3 variations
7. **Triple icon approach:** Phosphor for all nav/utility icons (16 themes), 3D SVG assets for service icons in original 5 uber variations, Unicons for service icons in 3 new explorations
8. **MobileFrame scroll area architecture:** MobileFrame (852px) has a `flex-1 overflow-y-auto` scroll area (776px visible). Both the content wrapper AND BottomNav (60-72px) are children inside this scroll area — BottomNav is NOT fixed. Total content + BottomNav must ≤ 776px.
9. **NEVER use `flex: 1` inside `overflow-y-auto`** — it expands beyond viewport instead of constraining. Size sections to natural content height. Each theme's `sectionGap` is tuned individually to fill the 776px scroll area precisely — do NOT use a global cap.
10. **Roofing uses `HouseLine` (not `House`)** — to avoid visual conflict with the Home nav icon. `HouseLine` has a roof-line emphasis that distinguishes it from the plain `House` silhouette.

## Theme Selector Strip (App.tsx)

Single horizontally scrollable row with category dividers at indices 3, 8, 13:

```
[DC Light] [DC Color] [DC Fill] | [Google] [iOS] [Claude] [Uber] [Current] | [Nightride] [Grid] [Signal] [Soft] [Mono] | [Dash] [Aura] [Matrix]
 Index 0     1          2         3         4      5        6       7          8            9      10       11     12       13      14      15
```

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

## Conventions

- All component styling uses inline `style={{}}` reading from theme tokens — no hardcoded hex values
- Theme-specific branches use `theme.id === 'premium'`, `theme.id === 'apple-ios'`, etc.
- Uber variation branches use `theme.id.startsWith('uber-')` for shared behavior
- DC family branches use `isDC` boolean (see "DC Family Branching Pattern" section)
- Components access theme via `const { theme } = useTheme()` then destructure `theme.typography`, `theme.colors`, `theme.spacing`
- **Adding a new theme:** create `themes/new-theme.ts` → add to `themes/index.ts` array → add weight entry in `icons/ServiceIcon.tsx`, `NavIcon.tsx`, `UtilityIcon.tsx` → if variation: add icon style + layout config → update App.tsx divider positions and count
- **Adding a new DC variation:** add export to `designers-choice.ts` using `...dcBase` spread → add to `themes/index.ts` → add weight entries in icon files → add ID to all `isDC` checks across 6 components
- **Adding a new layout:** add sub-component in `SuggestionsGrid.tsx` → add case to switch → add style token to `ThemeTokens.layout.suggestionsStyle` union type
- **Adding a new icon library:** create adapter component (like `UniconsServiceIcon.tsx`) → add branching in `ServiceIcon.tsx` → add to `serviceIconStyle` union type → add `.d.ts` if library lacks TypeScript declarations

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
5. **Session 5 (5 Uber-Inspired Variations):** Added 5 new Uber-inspired theme variations (Nightride, Grid, Signal, Soft, Mono) each with unique layouts, 3D icon styles, and typographic personalities. Key changes:
   - Extended `ThemeTokens` with `layout`, `serviceIconStyle`, `serviceIconAssets`, `serviceSubtitles` fields
   - Created 40 SVG icon assets across 5 style directories (`glossy/`, `flat/`, `outlined/`, `clay/`, `isometric/`)
   - Built `ServiceIcon3D` component with hybrid icon branching in `ServiceIcon.tsx`
   - Created 5 theme token files with full variation-specific configs
   - Refactored `SuggestionsGrid.tsx` with 7 layout sub-components (horizontal scroll, 2-col hero, pill categories, bento grid, vertical stack + existing 2)
   - Updated `RecentActivity.tsx` with 4 activity styles (standard, timeline, card, minimal) + Mono ASCII progress
   - Updated `Header.tsx` with 5 variation-specific greetings (terminal cursor, uppercase, two-line, etc.)
   - Updated `BottomNav.tsx` (Mono lowercase labels, Soft glow) and `SearchBar.tsx` (per-variation CTA colors)
   - Split `App.tsx` theme selector into 2 rows ("Brand Directions" + "Uber-Inspired Variations")
   - Added 6 new Google Fonts (Space Grotesk, Inter, Bebas Neue, Nunito, Nunito Sans, JetBrains Mono)
   - TypeScript type check + production build pass cleanly
6. **Session 6 (3 New Compact Explorations — Unicons):** Added 3 new theme variations (Dash, Aura, Matrix) focused on small icons in compact, mobile-native-feeling layouts. Key changes:
   - Installed `@iconscout/react-unicons` for scalable line-style service icons (replaces large 3D SVGs)
   - Created `UniconsServiceIcon.tsx` adapter mapping ServiceIconName → Unicons components
   - Added `src/unicons.d.ts` type declarations (Unicons ships without `.d.ts`)
   - Extended `ThemeTokens` with `'chip-rows' | 'floating-cards' | 'compact-tile-grid'` layout styles and `'unicons'` icon style
   - Created 3 theme token files: `uber-dash.ts` (warm orange chips), `uber-aura.ts` (muted gold floating cards), `uber-matrix.ts` (soft violet compact tiles)
   - Built 3 new layout sub-components in `SuggestionsGrid.tsx`: `ChipRowsView` (horizontal scroll pills), `FloatingCardsView` (premium single-column cards with glow), `CompactTileGridView` (3-col dense grid with left accent border)
   - Updated `ServiceIcon.tsx` branching: Unicons path added before 3D SVG path
   - Updated `NavIcon.tsx` and `UtilityIcon.tsx` with 3 new weight entries each
   - Updated `Header.tsx` with 3 new greeting styles (Dash: action-oriented, Aura: minimal, Matrix: casual)
   - Split `App.tsx` theme selector into 3 rows: "Brand Directions" (5), "Uber-Inspired Variations" (5), "New Explorations" (3)
   - Used ONLY already-loaded Google Fonts — no new font additions
   - TypeScript type check + production build pass cleanly (390.89 KB)
7. **Session 7 (Theme Selector Strip + Initial Overflow Fix):** Collapsed the 3-row theme selector into a single horizontally scrollable strip with separators between groups. Applied initial `minHeight: 240px` wrapper on SuggestionsGrid and capped 3 overflow-prone layouts (BentoGridView, FloatingCardsView). This partially helped but left 11 of 13 themes with significant underflow (50-261px gaps) and 2 themes still overflowing.
8. **Session 8 (Vertical Overflow & Underflow Fix — All 13 Themes):** Comprehensive fix for content not filling the 852px phone frame across all themes. Root cause: `minHeight: 240px` was too blunt — content heights ranged from 462px (Dash) to 812px (Soft) against ~723px available scrollable area. Key changes:
   - **Strategy:** Replaced `minHeight: '240px'` with `flex: 1` on the SuggestionsGrid wrapper in `HomeScreen.tsx`, combined with per-layout content tuning in each of the 10 sub-components
   - **`flex: 1` cascade:** MobileFrame → HomeScreen wrapper → SuggestionsGrid wrapper → Sub-component root — each level passes "fill remaining space" to its children, absorbing residual underflow as natural spacing
   - **DefaultGridView** (Material You, Claude, Uber, Premium): Added `flex: 1` + `rowGap: '20px'` to spread the 4×2 grid vertically
   - **AppleListView** (iOS): Added `flex: 1`, increased from 5 → 6 items
   - **HorizontalScrollView** (Nightride): Added `flex: 1` + new "AI-Powered Deals" promo banner (~90px) below scroll container
   - **TwoColumnHeroView** (Grid): Added `flex: 1`, increased card height from 128px → 148px via theme token
   - **PillCategoriesView** (Signal): Added `flex: 1`, increased detail card internal padding from 8px → 16px
   - **BentoGridView** (Soft) — OVERFLOW FIX: Added `flex: 1`, reduced grid row height 110px → 90px, gap to 10px, heading margin 16px → 12px
   - **VerticalStackView** (Mono): Added `flex: 1`, increased from 5 → 7 items
   - **ChipRowsView** (Dash) — MAJOR UNDERFLOW FIX: Added `flex: 1` + new "Popular Near You" section with 4 compact service rows (icon circle + name + chevron)
   - **FloatingCardsView** (Aura) — OVERFLOW FIX: Added `flex: 1`, reduced from 5 → 4 cards
   - **CompactTileGridView** (Matrix): Added `flex: 1`, increased from 6 → 8 tiles (all services), tile height 76px → 88px
   - **Theme tokens:** `uber-nightride.ts` card height 152px → 180px, `uber-grid.ts` card height 128px → 148px
   - **Result:** All 13 themes now fit within the frame — 0-79px of flex absorption creates natural spacing, only Soft has ~13px of minimal scroll
   - **Files modified:** `HomeScreen.tsx`, `SuggestionsGrid.tsx`, `uber-nightride.ts`, `uber-grid.ts`
   - TypeScript type check + production build pass cleanly (391.12 KB)
9. **Session 9 (Overflow Fix — Remove flex:1, Fit All Content Without Scrolling):** Session 8's `flex: 1` approach backfired — inside `overflow-y-auto`, `flex: 1` *expands* beyond viewport instead of constraining, causing 9/13 themes to overflow (up to 149px). Key changes:
   - **Root cause:** `flex: 1` in a scroll container inflates children beyond visible area. BottomNav (60-72px) is inside the scroll area, not fixed — real content budget is 776px - BottomNav ≈ 704-716px
   - **Removed all `flex: 1`** from HomeScreen wrapper AND all 10 sub-component root divs in SuggestionsGrid.tsx
   - **Capped sectionGap** to max 16px in HomeScreen.tsx: `Math.min(parseInt(s.sectionGap), 16)`
   - **DefaultGridView:** rowGap 20px → 12px
   - **AppleListView:** 6 → 4 items
   - **HorizontalScrollView:** Removed AI Promo Banner entirely
   - **PillCategoriesView:** Complete detail card redesign — vertical centered layout → horizontal compact layout (icon | text | "Go" button in single row)
   - **BentoGridView:** Grid rows 90px → 72px
   - **VerticalStackView:** 7 → 6 items
   - **ChipRowsView:** Removed "Popular Near You" section entirely
   - **FloatingCardsView:** 4 → 3 cards
   - **Theme tokens:** `uber-grid.ts` card height 148px → 140px
   - **Verification:** JS measurement script confirmed 0px overflow on all 13 themes; visual screenshots verified
   - **Files modified:** `HomeScreen.tsx`, `SuggestionsGrid.tsx`, `uber-grid.ts`
   - TypeScript type check + production build pass cleanly (389.42 KB)
10. **Session 10 (Designer's Choice — Finalized Direction):** Created a new "Designer's Choice" theme as the finalized UI direction, based on Uber's layout structure with custom modifications. This became the 14th theme, positioned first in the theme selector. Key changes:
    - **Created `designers-choice.ts` theme file** with orange accent (#FF4D00), light-weight Phosphor icons, 56px icon containers
    - **Icon system:** Uses Phosphor icons (weight: 'light') with uniform gray color (#ABABAB)
    - **User-focused greeting:** "What do you need, Dinesh?" with orange accent on name
    - **Section heading:** Changed "Suggestions" → "Top Services"
    - **Activity text:** Changed "AI calling" → "Genie calling" for brand consistency
    - **Updated icon weight entries** in `ServiceIcon.tsx`, `NavIcon.tsx`, `UtilityIcon.tsx` (all now have 14 theme entries)
    - **Component updates across 6 files** for Designer's Choice branching
    - **App.tsx theme selector:** Updated count from 13 → 14, adjusted divider positions to (1, 6, 11)
    - **Design polish:** Orange in-progress status, speed-focused timestamps, iterative spacing fixes
    - TypeScript type check + production build pass cleanly (391.42 KB)
11. **Session 11 (3 DC Variations + Roofing Icon Fix):** Expanded Designer's Choice from 1 theme into 3 variations (DC Light / DC Color / DC Fill) and fixed a Roofing/Home icon conflict. Key changes:
    - **Refactored `designers-choice.ts`** from single export to `dcBase` + 3 exports using spread syntax (`designersChoiceTheme`, `dcLineColorTheme`, `dcFillColorTheme`)
    - **DC Light** (id: `designers-choice`): Light-weight outlines, uniform gray — unchanged from Session 10
    - **DC Color** (id: `dc-line-color`): Regular-weight outlines with per-service color coding (8 unique colors)
    - **DC Fill** (id: `dc-fill-color`): Filled solid icons with per-service color coding
    - **Icon color logic:** `isDC ? (theme.iconColors?.[service.name] || c.textSecondary)` — DC Light falls back to gray (empty `iconColors`), DC Color/Fill use populated `iconColors` map
    - **Added `isDC` boolean pattern** across 6 components (`Header.tsx`, `SuggestionsGrid.tsx`, `SearchBar.tsx`, `RecentActivity.tsx`, `BottomNav.tsx`, `HomeScreen.tsx`) to share behavior across 3 DC variations
    - **Added weight entries** in `ServiceIcon.tsx` (`'dc-line-color': 'regular'`, `'dc-fill-color': 'fill'`), `NavIcon.tsx`, and `UtilityIcon.tsx` for both new themes
    - **Updated `themes/index.ts`:** Added 2 new imports and array entries at positions 1, 2
    - **Updated `App.tsx`:** Count 14 → 16, divider positions (1, 6, 11) → (3, 8, 13)
    - **Fixed Roofing icon conflict:** Changed Roofing service icon from `House` to `HouseLine` in `ServiceIcon.tsx` — both nav Home and service Roofing previously used identical `House` icon. `HouseLine` has a roof-line emphasis that visually distinguishes it.
    - **Files modified:** `designers-choice.ts`, `themes/index.ts`, `ServiceIcon.tsx`, `NavIcon.tsx`, `UtilityIcon.tsx`, `SuggestionsGrid.tsx`, `Header.tsx`, `SearchBar.tsx`, `RecentActivity.tsx`, `BottomNav.tsx`, `HomeScreen.tsx`, `App.tsx` (12 files total)
    - TypeScript type check + production build pass cleanly (395.72 KB)
12. **Session 12 (Native-Fit Spacing — All 16 Themes ≤7px Gap):** Comprehensive per-theme spacing tuning to eliminate empty space at the bottom of all 16 phone frames. Replaced the global `Math.min(parseInt(sectionGap), 16)` cap with per-theme native sectionGap values. Key changes:
    - **Root cause:** The global 16px sectionGap cap from Session 9 was too aggressive — it left 30-67px of empty space in themes with shorter headers (no DC location pin)
    - **Removed global cap** in `HomeScreen.tsx` — each theme's sectionGap is now used directly
    - **Per-theme sectionGap tuning** (sectionGap appears twice in layout, so +Xpx adds 2X total height):
      - `uber.ts`: 28→47px, `claude.ts`: 28→43px, `uber-mono.ts`: 28→44px, `uber-aura.ts`: 28→43px
      - `premium.ts`: 24→34px, `uber-nightride.ts`: 28→34px, `uber-matrix.ts`: 20→27px
      - `uber-signal.ts`: 32→20px, `uber-dash.ts`: 32→24px (reduced to make room for expanded content)
    - **Layout content expansion** in `SuggestionsGrid.tsx`:
      - **ChipRowsView (Dash):** Added 3rd chip row + "Popular Near You" 2-item compact list
      - **PillCategoriesView (Signal):** Converted horizontal detail card to vertical centered layout with full-width "Get Quotes" button
      - **HorizontalScrollView (Nightride):** Added AI promo banner below scroll container
      - **DefaultGridView:** Conditional rowGap — 12px for DC/Google, 20px for others
    - **Final measurements:** All 16 themes 0px overflow; max gap is 7px (Grid, Soft); 10/16 themes ≤1px gap
    - **Files modified:** `HomeScreen.tsx`, `SuggestionsGrid.tsx`, 9 theme files
    - TypeScript type check + production build pass cleanly (396.77 KB)
13. **Session 13 (Download as PNG + Code Cleanup):** Added per-frame PNG export functionality and cleaned up code. Key changes:
    - **Installed `html-to-image`** for lightweight DOM-to-PNG capture (~5KB library)
    - **Converted `MobileFrame.tsx`** from plain function to `forwardRef` — exposes the outer div ref for screenshot capture
    - **Converted `HomeScreen.tsx`** to `forwardRef` — passes ref through to MobileFrame
    - **Added Download PNG button** in `App.tsx` below the phone frame:
      - Captures at 2x pixel ratio (786×1704px) for Retina-quality output
      - Downloads as `fmg-{theme-id}.png` (e.g., `fmg-designers-choice.png`)
      - Subtle glass-style button with hover effect matching the dark UI
    - **Code cleanup:** Removed 2 redundant ternary operators in `SearchBar.tsx` and `RecentActivity.tsx`
    - TypeScript type check + production build pass cleanly (411.09 KB)

## Session Maintenance

At the end of significant work sessions, ask Claude to **"Update CLAUDE.md with what we did"** so future sessions start with full context.
