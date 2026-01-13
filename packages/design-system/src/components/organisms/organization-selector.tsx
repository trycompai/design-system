'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
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
  emptySearchText?: string;
  /** Text shown when organizations list is empty */
  emptyListText?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Whether organizations are being loaded */
  loading?: boolean;
  /** Text shown while loading */
  loadingText?: string;
  /** Error message to display */
  error?: string;
  /** Size variant for the trigger */
  size?: 'sm' | 'default';
  /** Max width for the organization name in trigger (e.g., '150px') */
  maxWidth?: string;
  /** Keyboard shortcut to open (e.g., 'o' for Cmd+O). Set to null to disable. */
  hotkey?: string | null;
  /** Whether to open as a full-screen modal (like Cmd+K) instead of dropdown */
  modal?: boolean;
}

// ============================================================================
// Internal Components
// ============================================================================

function LoadingSpinner() {
  return (
    <svg
      className="size-4 animate-spin text-muted-foreground"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function EmptyState({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span className="text-muted-foreground text-sm">{text}</span>
    </div>
  );
}

function OrganizationItemContent({ org, maxWidth }: { org: Organization; maxWidth?: string }) {
  return (
    <>
      {org.icon && <span className="shrink-0">{org.icon}</span>}
      <span className="truncate" style={maxWidth ? { maxWidth } : undefined}>{org.name}</span>
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
  emptySearchText = 'No organizations found',
  emptyListText = 'No organizations available',
  disabled = false,
  loading = false,
  loadingText = 'Loading organizations...',
  error,
  size = 'default',
  maxWidth = '150px',
  hotkey = 'o',
  modal = false,
}: OrganizationSelectorProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const selectedValue = value ?? internalValue;
  const selectedOrg = organizations.find((org) => org.id === selectedValue);

  // Keyboard shortcut to open (Cmd/Ctrl + hotkey)
  React.useEffect(() => {
    if (!hotkey || disabled || loading) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === hotkey.toLowerCase() && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (modal) {
          setOpen(true);
        } else {
          triggerRef.current?.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hotkey, disabled, loading, modal]);

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
      setOpen(false); // Close modal on selection
    },
    [value, onValueChange]
  );

  const triggerSizeClass = size === 'sm' ? 'h-7' : 'h-8';

  // Determine content state
  const hasError = Boolean(error);
  const isEmpty = organizations.length === 0;
  const hasNoResults = filteredOrganizations.length === 0 && !isEmpty;

  const triggerButton = (
    <button
      ref={triggerRef}
      type="button"
      data-slot="organization-selector-trigger"
      data-size={size}
      disabled={disabled || loading}
      onClick={modal ? () => setOpen(true) : undefined}
      className={`gap-1.5 rounded-lg border border-transparent bg-transparent py-2 pr-2.5 pl-2.5 text-sm transition-colors select-none hover:bg-accent [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 ${triggerSizeClass}`}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span className="text-muted-foreground">Loading...</span>
        </>
      ) : selectedOrg ? (
        <OrganizationItemContent org={selectedOrg} maxWidth={maxWidth} />
      ) : (
        <span className="text-muted-foreground">{placeholder}</span>
      )}
      {!loading && <ChevronDown className="text-muted-foreground size-3.5 shrink-0" />}
    </button>
  );

  // Modal mode: full-screen dialog like Cmd+K
  if (modal) {
    return (
      <>
        {triggerButton}
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Backdrop
              data-slot="dialog-overlay"
              className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50"
            />
            <DialogPrimitive.Popup
              data-slot="command-dialog-content"
              className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 rounded-xl p-0 ring-1 duration-100 sm:max-w-lg group/dialog-content fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden outline-none"
            >
              <div className="sr-only">
                <DialogPrimitive.Title>Select Organization</DialogPrimitive.Title>
                <DialogPrimitive.Description>
                  Search and select an organization from the list
                </DialogPrimitive.Description>
              </div>
              <CommandPrimitive
                data-slot="command"
                className="bg-popover text-popover-foreground rounded-xl p-1 flex size-full flex-col overflow-hidden"
                filter={(value, search) => {
                  const org = organizations.find((o) => o.id === value);
                  if (!org) return 0;
                  const query = search.toLowerCase();
                  if (org.id.toLowerCase().includes(query)) return 1;
                  if (org.name.toLowerCase().includes(query)) return 1;
                  return 0;
                }}
              >
                {/* Search Input */}
                <div data-slot="command-input-wrapper" className="p-1 pb-0">
                  <div
                    data-slot="input-group"
                    role="group"
                    className="border-input/30 bg-input/30 h-8 rounded-lg border shadow-none transition-[color,box-shadow] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] group/input-group relative flex w-full min-w-0 items-center outline-none"
                  >
                    <CommandPrimitive.Input
                      data-slot="command-input"
                      placeholder={searchPlaceholder}
                      className="w-full flex-1 bg-transparent px-2.5 py-1 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <div
                      data-slot="input-group-addon"
                      data-align="inline-end"
                      className="text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 pr-2 text-sm font-medium select-none"
                    >
                      <Search className="size-4 shrink-0 opacity-50" />
                    </div>
                  </div>
                </div>

                {/* Organization List */}
                <CommandPrimitive.List
                  data-slot="command-list"
                  className="no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto"
                >
                  {loading ? (
                    <EmptyState icon={<LoadingSpinner />} text={loadingText} />
                  ) : hasError ? (
                    <EmptyState text={error!} />
                  ) : isEmpty ? (
                    <EmptyState text={emptyListText} />
                  ) : (
                    <CommandPrimitive.Group data-slot="command-group" className="text-foreground overflow-hidden p-1">
                      <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm">
                        {emptySearchText}
                      </CommandPrimitive.Empty>
                      {organizations.map((org) => (
                        <CommandPrimitive.Item
                          key={org.id}
                          data-slot="command-item"
                          value={org.id}
                          onSelect={() => handleValueChange(org.id)}
                          className="data-[selected=true]:bg-muted data-[selected=true]:text-foreground relative flex cursor-default items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                        >
                          <OrganizationItemContent org={org} />
                          {selectedValue === org.id && (
                            <Checkmark className="ml-auto size-4" />
                          )}
                        </CommandPrimitive.Item>
                      ))}
                    </CommandPrimitive.Group>
                  )}
                </CommandPrimitive.List>
              </CommandPrimitive>
            </DialogPrimitive.Popup>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </>
    );
  }

  // Dropdown mode (default): inline combobox
  return (
    <ComboboxPrimitive.Root value={selectedValue} onValueChange={handleValueChange}>
      <ComboboxPrimitive.Trigger
        ref={triggerRef}
        data-slot="organization-selector-trigger"
        data-size={size}
        disabled={disabled}
        className={`gap-1.5 rounded-lg border border-transparent bg-transparent py-2 pr-2.5 pl-2.5 text-sm transition-colors select-none hover:bg-accent [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 ${triggerSizeClass}`}
      >
        {selectedOrg ? (
          <OrganizationItemContent org={selectedOrg} maxWidth={maxWidth} />
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown className="text-muted-foreground size-3.5 shrink-0" />
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
              {loading ? (
                <EmptyState icon={<LoadingSpinner />} text={loadingText} />
              ) : hasError ? (
                <EmptyState text={error!} />
              ) : isEmpty ? (
                <EmptyState text={emptyListText} />
              ) : hasNoResults ? (
                <EmptyState text={emptySearchText} />
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
