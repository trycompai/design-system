import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'gap-1 rounded-sm px-1.5 py-1 text-[10px] font-semibold uppercase tracking-wider leading-none [text-box-trim:both] [text-box-edge:cap_alphabetic] transition-colors has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&>svg]:size-2.5! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:ring-ring/50 focus-visible:ring-[3px] overflow-hidden antialiased select-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground [a]:hover:bg-primary/90',
        secondary:
          'bg-muted text-muted-foreground [a]:hover:bg-muted/80',
        destructive:
          'bg-destructive/10 text-destructive [a]:hover:bg-destructive/15 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/15',
        outline:
          'border border-border/50 bg-transparent text-foreground [a]:hover:bg-muted/30',
        ghost:
          'bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground',
        link: 'bg-transparent text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type BadgeProps = Omit<useRender.ComponentProps<'span'>, 'className'> &
  VariantProps<typeof badgeVariants>;

function Badge({ variant = 'default', render, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: badgeVariants({ variant }),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
