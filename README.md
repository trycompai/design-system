# Design System Monorepo

A Turborepo containing the design system component library and Storybook documentation.

## Packages

- `@trycompai/design-system` - React component library with Tailwind CSS
- `@comp/storybook` - Storybook documentation and component playground
- `@comp/design-system-mcp` - MCP server that exposes the design system + stories over stdio

## Getting Started

Install dependencies:

```sh
pnpm install
```

## Development

Run Storybook:

```sh
pnpm storybook
```

This starts Storybook at http://localhost:6006

## Commands

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Start Storybook dev server |
| `pnpm build` | Build all packages |
| `pnpm typecheck` | Type check all packages |
| `pnpm lint` | Lint all packages |
| `pnpm test` | Run tests |
| `pnpm format` | Format code with Prettier |

## Building

Build all packages:

```sh
pnpm build
```

Build a specific package:

```sh
pnpm build --filter=@trycompai/design-system
```
