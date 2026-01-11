import * as React from 'react';

import { Heading } from '../atoms/heading';
import { Text } from '../atoms/text';
import { Stack } from '../atoms/stack';

interface PageHeaderProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  title: string;
  description?: string;
  /** Additional descriptive text below description */
  meta?: string;
  actions?: React.ReactNode;
}

function PageHeader({ title, description, meta, actions, children, ...props }: PageHeaderProps) {
  const childArray = React.Children.toArray(children);
  const extractedActionChildren: React.ReactNode[] = [];
  const nonActionChildren: React.ReactNode[] = [];

  childArray.forEach((child) => {
    if (
      React.isValidElement(child) &&
      (child.type === PageHeaderActions ||
        (typeof child.type === 'function' &&
          (child.type as unknown as { __pageHeaderSlot?: string }).__pageHeaderSlot === 'actions'))
    ) {
      extractedActionChildren.push((child.props as { children?: React.ReactNode }).children);
      return;
    }
    nonActionChildren.push(child);
  });

  const resolvedActions =
    actions ??
    (extractedActionChildren.length > 0 ? extractedActionChildren : undefined);

  return (
    <div data-slot="page-header" className="flex items-start justify-between gap-4" {...props}>
      <Stack gap="1">
        <Heading level="1">{title}</Heading>
        {description && (
          <Text size="sm" variant="muted">
            {description}
          </Text>
        )}
        {meta && (
          <Text size="xs" variant="muted">
            {meta}
          </Text>
        )}
        {nonActionChildren}
      </Stack>
      {resolvedActions &&
        (React.isValidElement(resolvedActions) && resolvedActions.type === PageHeaderActions ? (
          resolvedActions
        ) : (
          <PageHeaderActions>{resolvedActions}</PageHeaderActions>
        ))}
    </div>
  );
}

function PageHeaderTitle({ ...props }: Omit<React.ComponentProps<typeof Heading>, 'className'>) {
  return <Heading data-slot="page-header-title" level="1" {...props} />;
}

function PageHeaderDescription({ ...props }: Omit<React.ComponentProps<typeof Text>, 'className'>) {
  return <Text data-slot="page-header-description" size="sm" variant="muted" {...props} />;
}

function PageHeaderActions({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div data-slot="page-header-actions" className="flex shrink-0 items-center gap-3" {...props} />
  );
}

// Mark compound slots so PageHeader can detect them even if module instances differ.
(PageHeaderActions as unknown as { __pageHeaderSlot?: string }).__pageHeaderSlot = 'actions';

export { PageHeader, PageHeaderActions, PageHeaderDescription, PageHeaderTitle };
