import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Stack } from '../atoms/stack';

const pageLayoutVariants = cva('min-h-full bg-background text-foreground', {
  variants: {
    variant: {
      default: 'flex flex-col',
      center: 'flex items-center justify-center',
    },
    padding: {
      none: '',
      sm: 'px-4',
      default: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'default',
  },
});

const containerVariants = cva('mx-auto w-full', {
  variants: {
    maxWidth: {
      sm: 'max-w-screen-sm', // 640px
      md: 'max-w-screen-md', // 768px
      lg: 'max-w-screen-lg', // 1024px
      xl: 'max-w-[1200px]',
      '2xl': 'max-w-[1400px]',
    },
  },
  defaultVariants: {
    maxWidth: 'xl',
  },
});

interface PageLayoutProps
  extends Omit<React.ComponentProps<'div'>, 'className' | 'children'>,
    VariantProps<typeof pageLayoutVariants> {
  children?: React.ReactNode;
  /** Whether to wrap content in a centered container. Defaults to true. */
  container?: boolean;
  /** Max width of the container. Only applies when container is true. */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Vertical gap between children. Defaults to 'lg' (gap-6). */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '0' | '1' | '2' | '3' | '4' | '6' | '8';
}

function PageLayout({
  variant,
  padding,
  container = true,
  maxWidth,
  gap = 'lg',
  children,
  ...props
}: PageLayoutProps) {
  // For center variant, default to smaller max-width (sm) for auth-style pages
  const resolvedMaxWidth = maxWidth ?? (variant === 'center' ? 'sm' : 'lg');

  const content = (
    <Stack gap={gap}>
      {children}
    </Stack>
  );

  return (
    <div
      data-slot="page-layout"
      data-variant={variant}
      className={pageLayoutVariants({ variant, padding })}
      {...props}
    >
      {container ? (
        <div
          data-slot="page-layout-container"
          className={cn(
            containerVariants({ maxWidth: resolvedMaxWidth }),
            variant === 'center' && 'flex items-center justify-center'
          )}
        >
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
}

export { PageLayout, pageLayoutVariants };
