import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'gap-1 font-semibold uppercase tracking-wider leading-none [text-box-trim:both] [text-box-edge:cap_alphabetic] transition-colors has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&>svg]:pointer-events-none inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 focus-visible:ring-ring/50 focus-visible:ring-[3px] overflow-hidden antialiased select-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/90',
        accent: 'bg-primary/10 text-primary [a]:hover:bg-primary/15',
        secondary: 'bg-muted text-muted-foreground [a]:hover:bg-muted/80',
        destructive:
          'bg-destructive/10 text-destructive [a]:hover:bg-destructive/15 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/15',
        outline: 'border border-border/50 bg-transparent text-foreground [a]:hover:bg-muted/30',
        ghost: 'bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground',
        link: 'bg-transparent text-primary underline-offset-4 hover:underline',
      },
      shape: {
        default: 'rounded-sm',
        pill: 'rounded-full',
      },
      size: {
        default: 'px-1.5 py-1 text-[10px] [&>svg]:size-2.5!',
        sm: 'px-1 py-0.5 text-[9px] [&>svg]:size-2.5!',
        lg: 'px-2 py-1.5 text-[11px] [&>svg]:size-3!',
        xl: 'px-2.5 py-2 text-xs [&>svg]:size-3.5!',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'default',
      size: 'default',
    },
  },
);

type BadgeProps = Omit<useRender.ComponentProps<'span'>, 'className'> &
  VariantProps<typeof badgeVariants>;

function Badge({
  variant = 'default',
  shape = 'default',
  size = 'default',
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: badgeVariants({ variant, shape, size }),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      shape,
      size,
    },
  });
}

export { Badge, badgeVariants };
