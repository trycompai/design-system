'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Moon, Screen, Sun } from '@carbon/icons-react';
import * as React from 'react';

const themeSwitcherVariants = cva(
  'inline-flex items-center rounded-full p-0.5 bg-muted',
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        default: 'gap-0.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const themeSwitcherButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'size-6 [&_svg]:size-3',
        default: 'size-7 [&_svg]:size-3.5',
      },
      isActive: {
        true: 'bg-background text-foreground shadow-sm',
        false: 'text-muted-foreground hover:text-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      isActive: false,
    },
  },
);

type Theme = 'light' | 'dark' | 'system';

interface ThemeSwitcherProps
  extends Omit<React.ComponentProps<'div'>, 'className' | 'onChange'>,
    VariantProps<typeof themeSwitcherVariants> {
  /** Current theme value */
  value?: Theme;
  /** Default theme value (uncontrolled) */
  defaultValue?: Theme;
  /** Called when theme changes */
  onChange?: (theme: Theme) => void;
  /** Show system option */
  showSystem?: boolean;
}

function ThemeSwitcher({
  value: valueProp,
  defaultValue = 'system',
  onChange,
  showSystem = true,
  size = 'default',
  ...props
}: ThemeSwitcherProps) {
  const [internalValue, setInternalValue] = React.useState<Theme>(defaultValue);
  const value = valueProp ?? internalValue;

  const handleChange = (newTheme: Theme) => {
    if (valueProp === undefined) {
      setInternalValue(newTheme);
    }
    onChange?.(newTheme);
  };

  const options: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun />, label: 'Light mode' },
    { value: 'dark', icon: <Moon />, label: 'Dark mode' },
    ...(showSystem
      ? [{ value: 'system' as Theme, icon: <Screen />, label: 'System theme' }]
      : []),
  ];

  return (
    <div
      data-slot="theme-switcher"
      role="radiogroup"
      aria-label="Theme"
      className={themeSwitcherVariants({ size })}
      {...props}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          aria-label={option.label}
          onClick={() => handleChange(option.value)}
          className={themeSwitcherButtonVariants({
            size,
            isActive: value === option.value,
          })}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

// Simple light/dark toggle for compact spaces
interface ThemeToggleProps extends Omit<React.ComponentProps<'button'>, 'className' | 'onChange'> {
  /** Current theme - true for dark, false for light */
  isDark?: boolean;
  /** Called when theme changes */
  onChange?: (isDark: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'default';
}

function ThemeToggle({
  isDark: isDarkProp,
  onChange,
  size = 'default',
  ...props
}: ThemeToggleProps) {
  const [internalIsDark, setInternalIsDark] = React.useState(false);
  const isDark = isDarkProp ?? internalIsDark;

  const handleToggle = () => {
    const newValue = !isDark;
    if (isDarkProp === undefined) {
      setInternalIsDark(newValue);
    }
    onChange?.(newValue);
  };

  const iconSize = size === 'sm' ? 'size-3' : 'size-3.5';
  const buttonSize = size === 'sm' ? 'h-6 w-12' : 'h-7 w-14';
  const thumbSize = size === 'sm' ? 'size-5' : 'size-6';
  const thumbTranslate = size === 'sm' ? 'translate-x-[26px]' : 'translate-x-[30px]';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={handleToggle}
      data-slot="theme-toggle"
      className={`${buttonSize} relative inline-flex items-center rounded-full bg-muted p-0.5 transition-colors`}
      {...props}
    >
      {/* Background icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={`${iconSize} text-amber-500`} />
        <Moon className={`${iconSize} text-blue-400`} />
      </span>
      {/* Sliding thumb */}
      <span
        className={`${thumbSize} relative z-10 flex items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-200 ${
          isDark ? thumbTranslate : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className={`${iconSize} text-blue-500`} />
        ) : (
          <Sun className={`${iconSize} text-amber-500`} />
        )}
      </span>
    </button>
  );
}

export { ThemeSwitcher, ThemeToggle };
export type { ThemeSwitcherProps, ThemeToggleProps, Theme };
