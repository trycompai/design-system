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

**Components do NOT accept `className` or `style` props. Use variants and props only.**

Components use `class-variance-authority` (CVA) for strict variant-based styling. The `className` and `style` props are intentionally omitted to prevent style overrides and maintain design consistency.

### Prohibited Patterns

```tsx
// WRONG - className is not a valid prop
<Button className="bg-red-500">Delete</Button>

// WRONG - style prop is not allowed
<Button style={{ backgroundColor: 'red' }}>Delete</Button>

// WRONG - inline styles via wrapper for component styling
<div style={{ color: 'red' }}><Text>Hello</Text></div>
```

### Correct Patterns

```tsx
// Correct - use variants
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="lg">Large Outline</Button>
<Text variant="muted" size="sm">Subtitle</Text>

// Correct - wrapper div for LAYOUT only (width, margins, grid)
<div className="w-full">
  <Button>Full Width</Button>
</div>

// Correct - wrapper div for positioning
<div className="mt-4 flex gap-2">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</div>
```

### When to Add New Variants

If a variant doesn't exist, add it to the component's CVA definition rather than using workarounds:

```tsx
// In the component file, add to CVA variants:
const buttonVariants = cva('...', {
  variants: {
    variant: {
      // ... existing variants
      warning: 'bg-yellow-500 text-white',  // Add new variant
    },
  },
});
```

## Component Patterns

### Organization/Project Selectors

Use `OrganizationSelector` for workspace/org switching. Never create custom dropdowns with `className` overrides:

```tsx
// Correct
<OrganizationSelector
  organizations={orgs}
  value={selectedOrg}
  onValueChange={setSelectedOrg}
  size="sm"
/>

// Wrong - custom dropdown with className
<DropdownMenu>
  <DropdownMenuTrigger className="custom-styles">...</DropdownMenuTrigger>
</DropdownMenu>
```

### Data Tables

Tables should include a search/filter header. Use the `DataTableHeader` pattern:

```tsx
<DataTableHeader>
  <DataTableSearch placeholder="Search..." />
  <DataTableFilters>
    {/* Filter buttons/dropdowns */}
  </DataTableFilters>
</DataTableHeader>
<DataTable columns={columns} data={data} />
```

### Compound Components

When building complex components, use the compound component pattern with internal subcomponents marked with `__slot` properties:

```tsx
function MyComponent({ children }) {
  // Extract slot children
  const slots = extractSlots(children, [MyComponentHeader, MyComponentBody]);
  // ...
}

// Mark slots for detection
(MyComponentHeader as any).__slot = 'header';
```

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
