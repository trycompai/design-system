import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Spinner } from './spinner';

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent text-sm font-medium leading-none [text-box-trim:both] [text-box-edge:cap_alphabetic] focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 ease-out active:scale-[0.97] active:duration-75 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border-border! bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/15 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 focus-visible:border-destructive/40 dark:bg-destructive/20 dark:hover:bg-destructive/30',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      width: {
        auto: '',
        full: 'w-full',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-8',
        'icon-xs':
          "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7',
        'icon-lg': 'size-9',
        // Round icon buttons - for avatar triggers and circular icons
        'icon-round': 'size-8 rounded-full',
        'icon-round-xs': "size-6 rounded-full [&_svg:not([class*='size-'])]:size-3",
        'icon-round-sm': 'size-7 rounded-full',
        'icon-round-lg': 'size-9 rounded-full',
        // Calendar day button - special size for calendar day cells
        'calendar-day': [
          // Base sizing
          'relative isolate z-10 aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal',
          // Selection states
          'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground',
          'data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-middle=true]:rounded-none',
          'data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius)',
          'data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius)',
          // Focus states (from parent day cell)
          'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:ring-[3px]',
          // Dark mode hover
          'dark:hover:text-foreground',
          // Nested span styling for additional content
          '[&>span]:text-xs [&>span]:opacity-70',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
      width: 'auto',
      size: 'default',
    },
  },
);

type ButtonProps = Omit<ButtonPrimitive.Props, 'className'> &
  VariantProps<typeof buttonVariants> & {
    /** Show loading spinner and disable button */
    loading?: boolean;
    /** Icon to show on the left side of the button */
    iconLeft?: React.ReactNode;
    /** Icon to show on the right side of the button */
    iconRight?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      width = 'auto',
      size = 'default',
      loading = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        data-loading={loading || undefined}
        disabled={isDisabled}
        className={buttonVariants({ variant, width, size })}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : iconLeft ? (
          <span data-icon="inline-start" className="shrink-0">
            {iconLeft}
          </span>
        ) : null}
        {children}
        {!loading && iconRight ? (
          <span data-icon="inline-end" className="shrink-0">
            {iconRight}
          </span>
        ) : null}
      </ButtonPrimitive>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
