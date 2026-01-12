import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Heading } from '../atoms/heading';
import { Stack } from '../atoms/stack';
import { Text } from '../atoms/text';

const settingRowVariants = cva(
  'flex w-full items-start justify-between gap-4 py-4 first:pt-0 last:pb-0',
  {
    variants: {
      size: {
        default: 'py-4',
        sm: 'py-3',
        lg: 'py-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface SettingRowProps
  extends Omit<React.ComponentProps<'div'>, 'className'>,
    VariantProps<typeof settingRowVariants> {
  /** The setting label */
  label: string;
  /** Optional description text */
  description?: string;
  /** Whether the setting is disabled */
  disabled?: boolean;
}

/**
 * A horizontal row for a single setting with label/description on the left
 * and a control (switch, button, select, etc.) on the right.
 */
function SettingRow({
  label,
  description,
  disabled,
  size,
  children,
  ...props
}: SettingRowProps) {
  return (
    <div
      data-slot="setting-row"
      data-disabled={disabled || undefined}
      className={settingRowVariants({ size })}
      {...props}
    >
      <div className="min-w-0 flex-1">
        <Stack gap="1">
          <Text weight="medium" variant={disabled ? 'muted' : undefined}>
            {label}
          </Text>
          {description && (
            <Text size="sm" variant="muted">
              {description}
            </Text>
          )}
        </Stack>
      </div>
      <div className="flex shrink-0 items-center">{children}</div>
    </div>
  );
}

interface SettingGroupProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  /** Whether to show dividers between rows */
  divided?: boolean;
}

/**
 * Groups multiple SettingRow components together, optionally with dividers.
 */
function SettingGroup({ divided = true, children, ...props }: SettingGroupProps) {
  return (
    <div
      data-slot="setting-group"
      data-divided={divided || undefined}
      className={
        divided
          ? '[&>[data-slot=setting-row]:not(:last-child)]:border-border [&>[data-slot=setting-row]:not(:last-child)]:border-b'
          : ''
      }
      {...props}
    >
      {children}
    </div>
  );
}

interface SettingLabelProps extends Omit<React.ComponentProps<'div'>, 'className'> {}

/**
 * Custom label area for complex setting rows. Use when you need more than just text.
 */
function SettingLabel({ children, ...props }: SettingLabelProps) {
  return (
    <div data-slot="setting-label" className="min-w-0 flex-1" {...props}>
      {children}
    </div>
  );
}

interface SettingControlProps extends Omit<React.ComponentProps<'div'>, 'className'> {}

/**
 * Control area for setting rows. Use when you need multiple controls or custom layout.
 */
function SettingControl({ children, ...props }: SettingControlProps) {
  return (
    <div data-slot="setting-control" className="flex shrink-0 items-center gap-2" {...props}>
      {children}
    </div>
  );
}

interface SettingsCardProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  /** Card title */
  title: string;
  /** Optional description */
  description?: string;
  /** Hint text shown in footer (left side) */
  hint?: React.ReactNode;
  /** Action button/content shown in footer (right side) */
  action?: React.ReactNode;
}

/**
 * A self-contained settings card with title, description, content area, and footer.
 * Footer shows hint text on left and action button on right.
 */
function SettingsCard({ title, description, hint, action, children, ...props }: SettingsCardProps) {
  const hasFooter = hint || action;

  return (
    <div
      data-slot="settings-card"
      className="bg-card text-card-foreground rounded-xl border shadow-sm"
      {...props}
    >
      <div className="px-6 pt-6 pb-4">
        <Stack gap="1">
          <Text weight="semibold">{title}</Text>
          {description && (
            <Text size="sm" variant="muted">
              {description}
            </Text>
          )}
        </Stack>
      </div>
      <div className="px-6 pb-6">{children}</div>
      {hasFooter && (
        <div className="border-t bg-muted px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-muted-foreground text-sm">{hint}</div>
            <div className="flex shrink-0 items-center gap-2">{action}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SettingControl, SettingGroup, SettingLabel, SettingRow, SettingsCard };
