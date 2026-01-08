'use client';

import * as React from 'react';
import { SearchIcon } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '../organisms/command';
import { Kbd } from '../atoms/kbd';

// ============ TYPES ============

export interface CommandSearchItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
  keywords?: string[];
}

export interface CommandSearchGroup {
  id: string;
  label: string;
  items: CommandSearchItem[];
}

export interface CommandSearchProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Text shown when no results are found */
  emptyText?: string;
  /** Groups of searchable items */
  groups?: CommandSearchGroup[];
  /** Flat list of items (alternative to groups) */
  items?: CommandSearchItem[];
  /** Callback when an item is selected */
  onSelect?: (item: CommandSearchItem) => void;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether to show the trigger input */
  showTrigger?: boolean;
  /** Width of the trigger input */
  triggerWidth?: 'sm' | 'md' | 'lg' | 'full';
}

// ============ COMPONENT ============

function CommandSearch({
  placeholder = 'Search...',
  emptyText = 'No results found.',
  groups = [],
  items = [],
  onSelect,
  open: openProp,
  onOpenChange,
  showTrigger = true,
  triggerWidth = 'md',
}: CommandSearchProps) {
  const [_open, _setOpen] = React.useState(false);
  const open = openProp ?? _open;
  const setOpen = onOpenChange ?? _setOpen;

  // Listen for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  const handleSelect = (item: CommandSearchItem) => {
    setOpen(false);
    item.onSelect?.();
    onSelect?.(item);
  };

  const widthClasses = {
    sm: 'w-48 md:w-56',
    md: 'w-56 md:w-72',
    lg: 'w-72 md:w-96',
    full: 'w-full max-w-md',
  };

  // Combine flat items into a default group if provided
  const allGroups = items.length > 0
    ? [{ id: 'default', label: '', items }, ...groups]
    : groups;

  return (
    <>
      {showTrigger && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`${widthClasses[triggerWidth]} inline-flex items-center gap-2 rounded-lg border border-input/50 bg-background/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
        >
          <SearchIcon className="size-4" />
          <span className="flex-1 text-left">{placeholder}</span>
          <Kbd>⌘K</Kbd>
        </button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {allGroups.map((group) => (
              <CommandGroup key={group.id} heading={group.label || undefined}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.label}
                    keywords={item.keywords}
                    onSelect={() => handleSelect(item)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export { CommandSearch };
