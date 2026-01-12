import { ArrowLeft } from '@carbon/icons-react';
import * as React from 'react';

import { Heading } from '../atoms/heading';
import { Breadcrumb, type BreadcrumbItemData } from './breadcrumb';

interface PageHeaderProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  title: string;
  actions?: React.ReactNode;
  /** Breadcrumb items to display above the title */
  breadcrumbs?: BreadcrumbItemData[];
  /** Back button href - displays a back arrow link above the title */
  backHref?: string;
  /** Back button label (default: "Back") */
  backLabel?: string;
  /** Tabs to display below the header (typically TabsList) */
  tabs?: React.ReactNode;
}

function PageHeader({ title, actions, breadcrumbs, backHref, backLabel = 'Back', tabs, children, ...props }: PageHeaderProps) {
  const childArray = React.Children.toArray(children);
  const extractedActionChildren: React.ReactNode[] = [];

  childArray.forEach((child) => {
    if (
      React.isValidElement(child) &&
      (child.type === PageHeaderActions ||
        (typeof child.type === 'function' &&
          (child.type as unknown as { __pageHeaderSlot?: string }).__pageHeaderSlot === 'actions'))
    ) {
      extractedActionChildren.push((child.props as { children?: React.ReactNode }).children);
    }
  });

  const resolvedActions =
    actions ??
    (extractedActionChildren.length > 0 ? extractedActionChildren : undefined);

  return (
    <div data-slot="page-header" className="flex flex-col gap-1" {...props}>
      {/* Navigation: breadcrumbs or back button */}
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <div className="overflow-hidden">
          <Breadcrumb items={breadcrumbs} separator="chevron" />
        </div>
      ) : backHref ? (
        <a
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-2 transition-colors w-fit"
        >
          <ArrowLeft className="size-4" />
          <span>{backLabel}</span>
        </a>
      ) : null}

      {/* Main header row */}
      <div className="flex items-center justify-between gap-4 min-w-0">
        <div className="min-w-0 flex-1 truncate">
          <Heading level="1">{title}</Heading>
        </div>
        {resolvedActions && (
          <div className="shrink-0">
            {React.isValidElement(resolvedActions) && resolvedActions.type === PageHeaderActions ? (
              resolvedActions
            ) : (
              <PageHeaderActions>{resolvedActions}</PageHeaderActions>
            )}
          </div>
        )}
      </div>

      {/* Tabs section */}
      {tabs && (
        <div className="mt-2 -mb-px">
          {tabs}
        </div>
      )}
    </div>
  );
}

function PageHeaderActions({ ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div data-slot="page-header-actions" className="flex shrink-0 items-center gap-2" {...props} />
  );
}

// Mark compound slots so PageHeader can detect them even if module instances differ.
(PageHeaderActions as unknown as { __pageHeaderSlot?: string }).__pageHeaderSlot = 'actions';

export { PageHeader, PageHeaderActions };
