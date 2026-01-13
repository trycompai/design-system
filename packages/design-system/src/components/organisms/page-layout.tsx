import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Stack } from '../atoms/stack';
import { Skeleton } from '../atoms/skeleton';

const pageLayoutVariants = cva('min-h-full bg-background text-foreground', {
  variants: {
    variant: {
      default: 'flex flex-col',
      center: 'flex items-center justify-center',
    },
    padding: {
      none: '',
      sm: 'px-1.5 sm:px-2',
      default: 'px-1.5 sm:px-2 md:px-3 lg:px-4',
      lg: 'px-2 sm:px-3 md:px-4 lg:px-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'none',
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
    maxWidth: '2xl',
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
  /** Whether the page is loading. Shows skeleton placeholder when true. */
  loading?: boolean;
}

function PageLayoutSkeleton() {
  return (
    <Stack gap="lg">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="50%" />
      </div>
      {/* Content skeleton */}
      <div className="space-y-4">
        <Skeleton variant="rectangular" height={200} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton variant="rectangular" height={120} />
          <Skeleton variant="rectangular" height={120} />
          <Skeleton variant="rectangular" height={120} />
        </div>
      </div>
    </Stack>
  );
}

function PageLayout({
  variant,
  padding,
  container = true,
  maxWidth,
  gap = 'lg',
  loading = false,
  children,
  ...props
}: PageLayoutProps) {
  // For center variant, default to smaller max-width (sm) for auth-style pages
  const resolvedMaxWidth = maxWidth ?? (variant === 'center' ? 'sm' : 'xl');

  const content = loading ? (
    <PageLayoutSkeleton />
  ) : (
    <Stack gap={gap}>
      {children}
    </Stack>
  );

  return (
    <div
      data-slot="page-layout"
      data-variant={variant}
      data-loading={loading || undefined}
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
