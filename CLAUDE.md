# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev          # Start all dev servers (Storybook at http://localhost:6006)
pnpm storybook    # Start Storybook directly

# Build & Quality
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm typecheck    # Type check all packages
pnpm format       # Format code with Prettier

# Testing
pnpm test              # Run all tests
pnpm test:unit         # Run unit tests only (in apps/storybook)
pnpm test:storybook    # Run Storybook interaction tests
pnpm test:coverage     # Generate coverage report
```

To run commands for a specific package, use `pnpm --filter <package>`:
```bash
pnpm --filter @trycompai/design-system typecheck
pnpm --filter @comp/storybook test
```

## Architecture

This is a Turborepo monorepo with two main areas:

- **packages/design-system**: React component library (`@trycompai/design-system`)
- **apps/storybook**: Storybook documentation and component playground

Supporting packages:
- **packages/eslint-config**: Shared ESLint configurations
- **packages/typescript-config**: Shared TypeScript configurations

## Design System Component Guidelines

**Components do NOT accept `className`. Use variants and props only.**

This design system uses `class-variance-authority` (cva) for strict styling. The `className` prop has been removed from all components.

```tsx
// ❌ WRONG - will not compile
<Button className="bg-red-500">Delete</Button>

// ✅ CORRECT - use variants
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="lg">Large Outline</Button>
```

For layout concerns (width, positioning, margins), use wrapper elements:
```tsx
<div className="w-full">
  <Button>Full Width</Button>
</div>
```

If a variant doesn't exist, add it to the component's `cva` definition in the component file, don't use wrapper divs to apply styles.

## Key Dependencies

- React 19 with Tailwind CSS v4
- @base-ui/react (Radix UI alternative) for accessible primitives
- class-variance-authority for component variants
- Vitest + Playwright for testing
- Storybook 10 for component documentation

## Component Structure

Components live in `packages/design-system/src/` and are exported through `src/index.ts`. The `cn()` utility for class merging is exported from `@trycompai/design-system/cn`.

Available component categories:
- Layout: Container, Stack, Grid, PageLayout, Section
- Typography: Heading, Text
- Forms: Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch
- Data Display: Card, Badge, Avatar, Table, Progress
- Feedback: Alert, AlertDialog, Dialog, Sheet, Drawer, Tooltip
- Navigation: Tabs, Breadcrumb, Pagination, NavigationMenu, DropdownMenu
