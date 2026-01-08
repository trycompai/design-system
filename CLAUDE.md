# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo containing `@trycompai/design-system`, a shadcn-style React component library with Tailwind CSS v4. The design system ships raw TypeScript/TSX source files (no pre-built dist).

## Commands

```bash
# Development
pnpm dev              # Run all dev servers
pnpm storybook        # Start Storybook at http://localhost:6006

# Build & Quality
pnpm build            # Build all packages
pnpm typecheck        # Type check entire monorepo
pnpm lint             # Check formatting with Prettier
pnpm format           # Fix formatting with Prettier

# Testing (from apps/storybook)
pnpm test             # Run all tests
pnpm test:storybook   # Browser tests via Playwright
pnpm test:unit        # Unit tests (jsdom)
pnpm test:coverage    # Coverage report

# Filter to specific package
pnpm --filter @trycompai/design-system typecheck
pnpm --filter @comp/storybook test
```

## Architecture

```
apps/
  storybook/          # Component documentation & testing (Storybook 10, Vitest, Playwright)
packages/
  design-system/      # Main component library (@trycompai/design-system)
  eslint-config/      # Shared ESLint configs (@repo/eslint-config)
  typescript-config/  # Shared TypeScript configs (@repo/typescript-config)
```

### Component Organization

Components in `packages/design-system/src/components/` follow atomic design:
- `atoms/` - Basic building blocks (Button, Input, Badge, etc.)
- `molecules/` - Combined components (Card, Tabs, Dialog, etc.)
- `organisms/` - Complex sections (Sidebar, NavigationMenu, AppShell, etc.)

### Key Files

| File | Purpose |
|------|---------|
| `packages/design-system/agents.md` | Component usage rules (MUST READ) |
| `packages/design-system/src/styles/globals.css` | CSS variables, theming, dark mode |
| `packages/design-system/lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) |

## Critical: Component Styling Rules

**Components do NOT accept `className`. Use variants and props only.**

Components use `class-variance-authority` (CVA) for strict variant-based styling. The `className` prop is intentionally removed to prevent style overrides.

```tsx
// Will NOT compile - className is not a valid prop
<Button className="bg-red-500">Delete</Button>

// Correct - use variants
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="lg">Large Outline</Button>
```

For layout concerns (width, margins, grid positioning), wrap with a plain `<div>`:

```tsx
<div className="w-full">
  <Button>Full Width</Button>
</div>
```

If a variant doesn't exist, add it to the component's CVA definition rather than using a wrapper div for styling.

## Adding Components

1. Create component in `packages/design-system/src/components/{atoms|molecules|organisms}/`
2. Use CVA for variants, omit `className` prop
3. Export from the category's `index.ts`
4. Add story in `apps/storybook/stories/ComponentName.stories.tsx`

## Tech Stack

- React 19, TypeScript 5.9+
- Tailwind CSS v4 (new `@import` syntax, CSS variables)
- Base UI (headless primitives)
- class-variance-authority, clsx, tailwind-merge
- Storybook 10, Vitest, Playwright
