import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const cardVariants = cva(
  'bg-card text-card-foreground border border-border overflow-hidden rounded-md py-4 text-sm has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-md *:[img:last-child]:rounded-b-md group/card flex flex-col',
  {
    variants: {
      width: {
        auto: '', // shrink to content (default behavior)
        full: 'w-full', // fill parent container
        sm: 'w-sm', // 24rem (384px)
        md: 'w-md', // 28rem (448px)
        lg: 'w-lg', // 32rem (512px)
        xl: 'w-xl', // 36rem (576px)
        '2xl': 'w-2xl', // 42rem (672px)
        '3xl': 'w-3xl', // 48rem (768px)
      },
      maxWidth: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        full: 'max-w-full',
      },
      spacing: {
        default: 'gap-4 data-[size=sm]:gap-3',
        tight: 'gap-3 data-[size=sm]:gap-2.5',
        relaxed: 'gap-6 data-[size=sm]:gap-4',
      },
      disabled: {
        true: 'opacity-60 pointer-events-none select-none',
      },
    },
    defaultVariants: {
      width: 'auto',
      spacing: 'default',
      disabled: undefined,
    },
  },
);

interface CardProps
  extends
    Omit<React.ComponentProps<'div'>, 'className' | 'title'>,
    VariantProps<typeof cardVariants> {
  size?: 'default' | 'sm';
  /** Card title - renders in CardHeader */
  title?: React.ReactNode;
  /** Card description - renders below title in CardHeader */
  description?: React.ReactNode;
  /** Action element(s) in the header (e.g., buttons, badges) */
  headerAction?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
}

function Card({
  size = 'default',
  width,
  maxWidth,
  spacing,
  disabled,
  title,
  description,
  headerAction,
  footer,
  children,
  ...props
}: CardProps) {
  const hasHeader = title || description || headerAction;

  // Check if children contain compound components (have data-slot)
  const hasCompoundChildren = React.Children.toArray(children).some((child) => {
    if (React.isValidElement(child)) {
      // Prefer checking component identity. `data-slot` is applied inside the component render,
      // so it won't exist on `child.props` unless manually passed in.
      if (child.type === CardHeader || child.type === CardContent || child.type === CardFooter) {
        return true;
      }

      // Fallback for direct DOM usage.
      const props = child.props as Record<string, unknown>;
      return (
        props['data-slot'] === 'card-header' ||
        props['data-slot'] === 'card-content' ||
        props['data-slot'] === 'card-footer'
      );
    }
    return false;
  });

  return (
    <div
      data-slot="card"
      data-size={size}
      data-disabled={disabled ? '' : undefined}
      className={cardVariants({ width, maxWidth, spacing, disabled: disabled ? true : undefined })}
      {...props}
    >
      {hasHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {headerAction && <CardAction>{headerAction}</CardAction>}
        </CardHeader>
      )}
      {hasCompoundChildren ? children : children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </div>
  );
}

function CardHeader({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div
      data-slot="card-header"
      className="gap-1 rounded-t-md px-4 group-data-[size=sm]/card:px-3 [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]"
      {...props}
    />
  );
}

function CardTitle({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div
      data-slot="card-title"
      className="text-base leading-snug font-medium group-data-[size=sm]/card:text-sm"
      {...props}
    />
  );
}

function CardDescription({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return <div data-slot="card-description" className="text-muted-foreground text-sm" {...props} />;
}

function CardAction({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div
      data-slot="card-action"
      className="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
      {...props}
    />
  );
}

function CardContent({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div data-slot="card-content" className="px-4 group-data-[size=sm]/card:px-3" {...props} />
  );
}

function CardFooter({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div
      data-slot="card-footer"
      className="bg-muted rounded-b-md border-t p-4 group-data-[size=sm]/card:p-3 flex items-center justify-between gap-4"
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
