'use client';

import { Search } from '@carbon/icons-react';
import * as React from 'react';

// ============================================================================
// DataTableHeader
// ============================================================================

export interface DataTableHeaderProps {
  children?: React.ReactNode;
}

function DataTableHeader({ children }: DataTableHeaderProps) {
  return (
    <div
      data-slot="data-table-header"
      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
    >
      {children}
    </div>
  );
}

// ============================================================================
// DataTableSearch
// ============================================================================

export interface DataTableSearchProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Current search value */
  value?: string;
  /** Callback when search value changes */
  onChange?: (value: string) => void;
}

function DataTableSearch({
  placeholder = 'Search...',
  value,
  onChange,
}: DataTableSearchProps) {
  return (
    <div
      data-slot="data-table-search"
      className="relative flex-1 max-w-sm"
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"
      />
    </div>
  );
}

// ============================================================================
// DataTableFilters
// ============================================================================

export interface DataTableFiltersProps {
  children?: React.ReactNode;
}

function DataTableFilters({ children }: DataTableFiltersProps) {
  return (
    <div
      data-slot="data-table-filters"
      className="flex items-center gap-2 shrink-0"
    >
      {children}
    </div>
  );
}

export { DataTableHeader, DataTableSearch, DataTableFilters };
