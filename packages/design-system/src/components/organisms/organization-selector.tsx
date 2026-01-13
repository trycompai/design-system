'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { Checkmark, ChevronDown, Search } from '@carbon/icons-react';
import * as React from 'react';

// ============================================================================
// Types
// ============================================================================

export interface Organization {
  /** Unique organization identifier (searchable) */
  id: string;
  /** Organization display name (searchable) */
  name: string;
  /** Optional icon or avatar to display */
  icon?: React.ReactNode;
  /** Optional brand color for the indicator dot (e.g., "#10b981" or "bg-green-500") */
  color?: string;
}

export interface OrganizationSelectorProps {
  /** List of organizations to display */
  organizations: Organization[];
  /** Currently selected organization ID (controlled) */
  value?: string;
  /** Default selected organization ID (uncontrolled) */
  defaultValue?: string;
  /** Callback when selection changes */
  onValueChange?: (organizationId: string) => void;
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Text shown when no results match search */
  emptyText?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Size variant for the trigger */
  size?: 'sm' | 'default';
}

// ============================================================================
// Internal Components
// ============================================================================

function OrganizationColorDot({ color }: { color?: string }) {
  if (!color) return null;

  // Support both hex colors and Tailwind classes
  const isTailwindClass = color.startsWith('bg-');
  const style = isTailwindClass ? undefined : { backgroundColor: color };
  const className = isTailwindClass
    ? `size-2 shrink-0 rounded-full ${color}`
    : 'size-2 shrink-0 rounded-full';

  return <span className={className} style={style} />;
}

function OrganizationItemContent({ org }: { org: Organization }) {
  return (
    <>
      {org.icon ? (
        <span className="shrink-0">{org.icon}</span>
      ) : (
        <OrganizationColorDot color={org.color} />
      )}
      <span className="truncate">{org.name}</span>
    </>
  );
}

// ============================================================================
// Main Component
// ============================================================================

function OrganizationSelector({
  organizations,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select organization',
  searchPlaceholder = 'Search by name or ID...',
  emptyText = 'No organizations found',
  disabled = false,
  size = 'default',
}: OrganizationSelectorProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [searchQuery, setSearchQuery] = React.useState('');

  const selectedValue = value ?? internalValue;
  const selectedOrg = organizations.find((org) => org.id === selectedValue);

  // Filter organizations by ID or name (case-insensitive)
  const filteredOrganizations = React.useMemo(() => {
    if (!searchQuery.trim()) return organizations;
    const query = searchQuery.toLowerCase();
    return organizations.filter(
      (org) =>
        org.id.toLowerCase().includes(query) ||
        org.name.toLowerCase().includes(query)
    );
  }, [organizations, searchQuery]);

  const handleValueChange = React.useCallback(
    (newValue: string | null) => {
      const orgId = newValue ?? '';
      if (value === undefined) {
        setInternalValue(orgId);
      }
      onValueChange?.(orgId);
      setSearchQuery(''); // Clear search on selection
    },
    [value, onValueChange]
  );

  const triggerSizeClass = size === 'sm' ? 'h-7' : 'h-8';

  return (
    <ComboboxPrimitive.Root value={selectedValue} onValueChange={handleValueChange}>
      <ComboboxPrimitive.Trigger
        data-slot="organization-selector-trigger"
        data-size={size}
        disabled={disabled}
        className={`border-input dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive gap-2 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm transition-colors select-none focus-visible:ring-[3px] [&_svg:not([class*='size-'])]:size-4 flex w-full items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 ${triggerSizeClass}`}
      >
        <span className="flex flex-1 items-center gap-2 truncate">
          {selectedOrg ? (
            <OrganizationItemContent org={selectedOrg} />
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="text-muted-foreground size-4 shrink-0" />
      </ComboboxPrimitive.Trigger>

      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner
          side="bottom"
          sideOffset={4}
          align="start"
          className="isolate z-50"
        >
          <ComboboxPrimitive.Popup
            data-slot="organization-selector-content"
            className="bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 max-h-80 min-w-56 overflow-hidden rounded-lg shadow-md ring-1 duration-100 group/org-selector relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin)"
          >
            {/* Search Input */}
            <div className="border-b border-border p-2">
              <div className="bg-muted/50 flex items-center gap-2 rounded-md px-2.5">
                <Search className="text-muted-foreground size-4 shrink-0" />
                <ComboboxPrimitive.Input
                  data-slot="organization-selector-input"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Organization List */}
            <ComboboxPrimitive.List
              data-slot="organization-selector-list"
              className="no-scrollbar max-h-64 scroll-py-1 overflow-y-auto p-1 overscroll-contain"
            >
              {filteredOrganizations.length === 0 ? (
                <div className="text-muted-foreground flex w-full justify-center py-6 text-center text-sm">
                  {emptyText}
                </div>
              ) : (
                filteredOrganizations.map((org) => (
                  <ComboboxPrimitive.Item
                    key={org.id}
                    data-slot="organization-selector-item"
                    value={org.id}
                    className="data-highlighted:bg-accent data-highlighted:text-accent-foreground gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <OrganizationItemContent org={org} />
                    <ComboboxPrimitive.ItemIndicator
                      render={
                        <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
                      }
                    >
                      <Checkmark className="size-4" />
                    </ComboboxPrimitive.ItemIndicator>
                  </ComboboxPrimitive.Item>
                ))
              )}
            </ComboboxPrimitive.List>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  );
}

export { OrganizationSelector };
