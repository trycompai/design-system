import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      // Numeric values for backward compatibility
      '0': 'gap-0',
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '6': 'gap-6',
      '8': 'gap-8',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
  },
  defaultVariants: {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: 'nowrap',
  },
});

type StackElement = 'div' | 'section' | 'nav' | 'ul' | 'ol' | 'main' | 'article' | 'aside' | 'header' | 'footer';

interface StackProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'>,
    VariantProps<typeof stackVariants> {
  as?: StackElement;
}

function Stack({
  as: Component = 'div',
  direction,
  gap,
  align,
  justify,
  wrap,
  ...props
}: StackProps) {
  return (
    <Component
      data-slot="stack"
      className={stackVariants({ direction, gap, align, justify, wrap })}
      {...props}
    />
  );
}

type VStackProps = Omit<StackProps, 'direction'>;

function VStack({ gap, align, justify, wrap, ...props }: VStackProps) {
  return <Stack direction="column" gap={gap} align={align} justify={justify} wrap={wrap} {...props} />;
}

type HStackProps = Omit<StackProps, 'direction'>;

function HStack({ gap, align, justify, wrap, ...props }: HStackProps) {
  return <Stack direction="row" gap={gap} align={align} justify={justify} wrap={wrap} {...props} />;
}

export { Stack, VStack, HStack, stackVariants };
export type { StackProps, VStackProps, HStackProps };
