import * as React from 'react';

import { Heading } from '../atoms/heading';
import { Text } from '../atoms/text';
import { Stack } from '../atoms/stack';

interface SectionProps extends Omit<React.ComponentProps<'section'>, 'className'> {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  /** Gap between header and content. Default is "4" */
  gap?: '2' | '3' | '4' | '6' | '8';
  /** Visual variant. "sheet" is optimized for use inside Sheet/Drawer */
  variant?: 'default' | 'sheet';
}

function Section({
  title,
  description,
  actions,
  gap,
  variant = 'default',
  children,
  ...props
}: SectionProps) {
  const hasHeader = title || description || actions;
  const resolvedGap = gap ?? (variant === 'sheet' ? '3' : '4');
  const headingLevel = variant === 'sheet' ? '4' : '3';
  const textSize = variant === 'sheet' ? 'xs' : 'sm';

  return (
    <section data-slot="section" data-variant={variant} className="w-full" {...props}>
      <Stack gap={resolvedGap}>
        {hasHeader && (
          <div className="flex items-start justify-between gap-4">
            <Stack gap="1">
              {title && <Heading level={headingLevel}>{title}</Heading>}
              {description && (
                <Text size={textSize} variant="muted">
                  {description}
                </Text>
              )}
            </Stack>
            {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
          </div>
        )}
        {children}
      </Stack>
    </section>
  );
}

function SectionHeader({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div data-slot="section-header" className="flex items-start justify-between gap-4" {...props} />
  );
}

function SectionTitle({
  size = 'default',
  ...props
}: Omit<React.ComponentProps<typeof Heading>, 'className' | 'level'> & {
  size?: 'default' | 'sm';
}) {
  return <Heading data-slot="section-title" level={size === 'sm' ? '4' : '3'} {...props} />;
}

function SectionDescription({
  size = 'default',
  ...props
}: Omit<React.ComponentProps<typeof Text>, 'className' | 'size'> & {
  size?: 'default' | 'sm';
}) {
  return (
    <Text
      data-slot="section-description"
      size={size === 'sm' ? 'xs' : 'sm'}
      variant="muted"
      {...props}
    />
  );
}

function SectionActions({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div data-slot="section-actions" className="flex shrink-0 items-center gap-2" {...props} />
  );
}

function SectionContent({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return <div data-slot="section-content" className="w-full" {...props} />;
}

export { Section, SectionActions, SectionContent, SectionDescription, SectionHeader, SectionTitle };
