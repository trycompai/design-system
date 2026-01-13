import * as React from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from '@carbon/icons-react';

import { Spinner } from '../atoms/spinner';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../organisms/dropdown-menu';

const splitButtonVariants = cva(
  'inline-flex items-stretch rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [&_[data-slot=split-button-divider]]:bg-primary-foreground/20',
        outline: 'border border-border bg-background [&_[data-slot=split-button-divider]]:bg-border',
        secondary: 'bg-secondary text-secondary-foreground [&_[data-slot=split-button-divider]]:bg-secondary-foreground/20',
        ghost: '[&_[data-slot=split-button-divider]]:bg-border',
        destructive: 'bg-destructive/10 text-destructive [&_[data-slot=split-button-divider]]:bg-destructive/20',
      },
      size: {
        xs: 'h-5 text-[11px]',
        sm: 'h-6 text-xs',
        default: 'h-7 text-[13px]',
        lg: 'h-8 text-[13px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const splitButtonMainVariants = cva(
  'inline-flex items-center justify-center gap-1 font-medium leading-none rounded-l-md transition-all duration-200 ease-out outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-primary/90 active:bg-primary/80',
        outline: 'hover:bg-muted active:bg-muted/80',
        secondary: 'hover:bg-secondary/80 active:bg-secondary/70',
        ghost: 'hover:bg-accent active:bg-accent/80',
        destructive: 'hover:bg-destructive/15 active:bg-destructive/20',
      },
      size: {
        xs: "px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "px-2 [&_svg:not([class*='size-'])]:size-3.5",
        default: "px-2 [&_svg:not([class*='size-'])]:size-4",
        lg: "px-2.5 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const splitButtonTriggerVariants = cva(
  'inline-flex items-center justify-center rounded-r-md transition-all duration-200 ease-out outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-primary/90 active:bg-primary/80',
        outline: 'hover:bg-muted active:bg-muted/80',
        secondary: 'hover:bg-secondary/80 active:bg-secondary/70',
        ghost: 'hover:bg-accent active:bg-accent/80',
        destructive: 'hover:bg-destructive/15 active:bg-destructive/20',
      },
      size: {
        xs: "w-5 [&_svg:not([class*='size-'])]:size-3",
        sm: "w-6 [&_svg:not([class*='size-'])]:size-3.5",
        default: "w-7 [&_svg:not([class*='size-'])]:size-4",
        lg: "w-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type SplitButtonAction = {
  /** Unique identifier for the action */
  id: string;
  /** Label to display in the dropdown */
  label: React.ReactNode;
  /** Callback when action is clicked */
  onClick?: () => void;
  /** Whether the action is destructive */
  variant?: 'default' | 'destructive';
  /** Icon to show before the label */
  icon?: React.ReactNode;
  /** Whether to show a separator after this item */
  separator?: boolean;
  /** Whether this action is disabled */
  disabled?: boolean;
};

type SplitButtonProps = VariantProps<typeof splitButtonVariants> & {
  /** Content of the main button */
  children: React.ReactNode;
  /** Additional actions shown in the dropdown */
  actions: SplitButtonAction[];
  /** Callback when main button is clicked */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Show loading spinner and disable button */
  loading?: boolean;
  /** Icon to show on the left side of the button */
  iconLeft?: React.ReactNode;
  /** Dropdown menu alignment */
  menuAlign?: 'start' | 'center' | 'end';
  /** Side of the trigger to show the dropdown */
  menuSide?: 'top' | 'bottom';
};

function SplitButton({
  children,
  actions,
  onClick,
  variant = 'default',
  size = 'default',
  menuAlign = 'end',
  menuSide = 'bottom',
  disabled,
  loading,
  iconLeft,
}: SplitButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <div
      data-slot="split-button"
      className={splitButtonVariants({ variant, size })}
    >
      <button
        type="button"
        data-slot="split-button-main"
        onClick={onClick}
        disabled={isDisabled}
        className={splitButtonMainVariants({ variant, size })}
      >
        {loading ? (
          <Spinner />
        ) : iconLeft ? (
          <span data-icon="inline-start">{iconLeft}</span>
        ) : null}
        {children}
      </button>
      <span
        data-slot="split-button-divider"
        className="w-px self-stretch"
        aria-hidden="true"
      />
      <MenuPrimitive.Root>
        <MenuPrimitive.Trigger
          disabled={isDisabled}
          className={splitButtonTriggerVariants({ variant, size })}
        >
          <ChevronDown />
        </MenuPrimitive.Trigger>
        <DropdownMenuContent align={menuAlign} side={menuSide}>
          {actions.map((action) => (
            <React.Fragment key={action.id}>
              <DropdownMenuItem
                onClick={action.onClick}
                variant={action.variant}
                disabled={action.disabled}
              >
                {action.icon}
                {action.label}
              </DropdownMenuItem>
              {action.separator && <DropdownMenuSeparator />}
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </MenuPrimitive.Root>
    </div>
  );
}

export { SplitButton };
export type { SplitButtonProps, SplitButtonAction };
