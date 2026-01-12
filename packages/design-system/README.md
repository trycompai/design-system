# @trycompai/design-system

A shadcn-style design system with Tailwind CSS v4. Ships raw TypeScript/TSX source files that your app compiles directly.

## Installation

```bash
npm install @trycompai/design-system
# or
bun add @trycompai/design-system
```

## Setup in Next.js

### 1. Configure Tailwind CSS

Add the design system to your `tailwind.config.ts` content paths:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include the design system components
    './node_modules/@trycompai/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
};

export default config;
```

### 2. Import Global Styles

Import the design system's CSS in your root layout:

```tsx
// app/layout.tsx
import '@trycompai/design-system/globals.css';
// or import alongside your own globals
import './globals.css';
```

### 3. Configure Next.js to Transpile

Add the package to `transpilePackages` in your `next.config.ts`:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@trycompai/design-system'],
};

export default nextConfig;
```

## Usage

Import components directly:

```tsx
import { Button, Card, CardHeader, CardContent } from '@trycompai/design-system';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>Hello</CardHeader>
      <CardContent>
        <Button variant="outline">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Available Exports

| Export                                     | Description                        |
| ------------------------------------------ | ---------------------------------- |
| `@trycompai/design-system`                 | All components                     |
| `@trycompai/design-system/icons`           | Carbon icons re-exported           |
| `@trycompai/design-system/cn`              | `cn()` utility for merging classes |
| `@trycompai/design-system/globals.css`     | Global CSS with theme variables    |
| `@trycompai/design-system/tailwind.config` | Tailwind configuration             |

## Components

The design system includes:

- **Layout**: `Container`, `Stack`, `Grid`, `PageLayout`, `Section`
- **Typography**: `Heading`, `Text`
- **Forms**: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Label`, `Field`
- **Data Display**: `Card`, `Badge`, `Avatar`, `Table`, `Progress`
- **Feedback**: `Alert`, `AlertDialog`, `Dialog`, `Sheet`, `Drawer`, `Tooltip`, `Popover`
- **Navigation**: `Tabs`, `Breadcrumb`, `Pagination`, `NavigationMenu`, `DropdownMenu`
- **Utility**: `Separator`, `Skeleton`, `Spinner`, `ScrollArea`, `Collapsible`

## Theme Switching

The design system uses CSS class-based theming. Dark mode is enabled by adding the `.dark` class to the `<html>` element.

### Theme Components

Two components are available for theme switching:

```tsx
import { ThemeSwitcher, ThemeToggle } from '@trycompai/design-system';

// 3-option switcher: light, dark, system
<ThemeSwitcher
  value={theme}
  onChange={(theme) => handleThemeChange(theme)}
  showSystem={true}  // optional, defaults to true
  size="default"     // 'sm' | 'default'
/>

// Simple light/dark toggle
<ThemeToggle
  isDark={isDark}
  onChange={(isDark) => handleToggle(isDark)}
  size="default"     // 'sm' | 'default'
/>
```

### Manual Implementation

To switch themes, toggle the `.dark` class on the document:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from '@trycompai/design-system';

function MyThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync with current theme on mount
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const handleThemeChange = (dark: boolean) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Optional: persist to localStorage
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  return <ThemeToggle isDark={isDark} onChange={handleThemeChange} />;
}
```

### With next-themes (Optional)

For more features like system preference detection and SSR support, you can use `next-themes`:

```bash
npm install next-themes
```

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// components/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { ThemeSwitcher } from '@trycompai/design-system';

export function MyThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return <ThemeSwitcher value={theme} onChange={setTheme} />;
}
```

## Design Principles

- **No className prop**: Components use variants and props, not className overrides
- **Semantic tokens**: Uses CSS variables for consistent theming
- **Dark mode**: Full dark mode support via `.dark` class
- **Accessible**: Built on Base UI primitives

## License

MIT
