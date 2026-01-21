import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Stack } from '../atoms/stack';
import { Skeleton } from '../atoms/skeleton';
import { Heading } from '../atoms/heading';

const pageLayoutVariants = cva('min-h-full bg-background text-foreground', {
  variants: {
    variant: {
      default: 'flex flex-col',
      center: 'flex items-center justify-center',
    },
    padding: {
      none: '',
      sm: 'px-1.5 sm:px-2 py-2 sm:py-3',
      default: 'px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 sm:py-3 md:py-4 lg:py-5',
      lg: 'px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4 md:py-5 lg:py-6',
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
  /** @deprecated Use header prop instead. Page title to display during loading state. */
  loadingTitle?: string;
  /** Header element (e.g., PageHeader) that renders regardless of loading state. */
  header?: React.ReactNode;
}

function PageLayoutSkeleton({ title, includeHeader = true }: { title?: string; includeHeader?: boolean }) {
  return (
    <Stack gap="lg">
      {/* Header skeleton - only shown if no header prop is provided */}
      {includeHeader && (
        <div className="space-y-2">
          {title ? (
            <Heading level="1">{title}</Heading>
          ) : (
            <Skeleton style={{ width: '30%', height: 24 }} />
          )}
          <Skeleton style={{ width: '50%', height: 16 }} />
        </div>
      )}
      {/* Content skeleton */}
      <div className="space-y-4">
        <Skeleton style={{ width: '100%', height: 200 }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton style={{ width: '100%', height: 120 }} />
          <Skeleton style={{ width: '100%', height: 120 }} />
          <Skeleton style={{ width: '100%', height: 120 }} />
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
  loadingTitle,
  header,
  children,
  ...props
}: PageLayoutProps) {
  // For center variant, default to smaller max-width (sm) for auth-style pages
  const resolvedMaxWidth = maxWidth ?? (variant === 'center' ? 'sm' : 'xl');

  const content = loading ? (
    <div data-slot="page-layout-content" className="pb-6">
      <Stack gap={gap}>
        {header}
        <PageLayoutSkeleton title={loadingTitle} includeHeader={!header} />
      </Stack>
    </div>
  ) : (
    <div data-slot="page-layout-content" className="pb-6">
      <Stack gap={gap}>
        {header}
        {children}
      </Stack>
    </div>
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
