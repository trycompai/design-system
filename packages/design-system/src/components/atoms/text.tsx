import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      success: 'text-green-600 dark:text-green-400',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
    leading: {
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
    },
    font: {
      sans: 'font-sans',
      mono: 'font-mono tabular-nums',
    },
  },
  defaultVariants: {
    size: 'base',
    variant: 'default',
    weight: 'normal',
    leading: 'normal',
    font: 'sans',
  },
});

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'className'>, VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

function Text({ as: Component = 'p', size, variant, weight, leading, font, ...props }: TextProps) {
  const resolvedSize = size ?? 'base';
  const isDefaultSize = size === undefined;
  return (
    <Component
      data-slot="text"
      data-size={resolvedSize}
      data-default-size={isDefaultSize ? 'true' : undefined}
      className={textVariants({ size: resolvedSize, variant, weight, leading, font })}
      {...props}
    />
  );
}

export { Text, textVariants };
