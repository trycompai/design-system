import * as React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Text } from '../atoms/text';

type PaginationConfig = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  siblingCount?: number;
  showPrevNext?: boolean;
  showEdges?: boolean;
};

type PaginationItemValue = number | 'ellipsis';

function getPaginationRange({
  page,
  pageCount,
  siblingCount,
  showEdges,
}: {
  page: number;
  pageCount: number;
  siblingCount: number;
  showEdges: boolean;
}): PaginationItemValue[] {
  if (pageCount <= 1) {
    return [];
  }

  const totalNumbers = siblingCount * 2 + (showEdges ? 5 : 3);
  if (pageCount <= totalNumbers) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = showEdges ? leftSibling > 2 : leftSibling > 1;
  const showRightEllipsis = showEdges ? rightSibling < pageCount - 1 : rightSibling < pageCount;

  const range: PaginationItemValue[] = [];
  if (showEdges) {
    range.push(1);
  }

  if (showLeftEllipsis) {
    range.push('ellipsis');
  }

  const start = showEdges ? Math.max(leftSibling, 2) : leftSibling;
  const end = showEdges ? Math.min(rightSibling, pageCount - 1) : rightSibling;
  for (let current = start; current <= end; current += 1) {
    range.push(current);
  }

  if (showRightEllipsis) {
    range.push('ellipsis');
  }

  if (showEdges) {
    range.push(pageCount);
  }

  return range;
}

function renderPagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showPrevNext = true,
  showEdges = true,
}: PaginationConfig) {
  if (pageCount <= 1) {
    return null;
  }

  const range = getPaginationRange({
    page,
    pageCount,
    siblingCount,
    showEdges,
  });

  return (
    <Pagination>
      <PaginationContent>
        {showPrevNext && page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onPageChange(page - 1);
              }}
            />
          </PaginationItem>
        )}
        {range.map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={item === page}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        {showPrevNext && page < pageCount && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onPageChange(page + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

function Table({
  variant = 'default',
  pagination,
  ...props
}: Omit<React.ComponentProps<'table'>, 'className'> & {
  variant?: 'default' | 'bordered';
  pagination?: PaginationConfig;
}) {
  const [internalPage, setInternalPage] = React.useState(pagination?.page ?? 1);
  React.useEffect(() => {
    if (pagination && pagination.page !== internalPage) {
      setInternalPage(pagination.page);
    }
  }, [pagination, internalPage]);

  const paginationContent = pagination
    ? renderPagination({
        ...pagination,
        page: internalPage,
        onPageChange: (nextPage) => {
          setInternalPage(nextPage);
          pagination.onPageChange(nextPage);
        },
      })
    : null;
  const showPageSizeSelector = Boolean(pagination?.pageSize && pagination?.onPageSizeChange);
  const rawPageSize = pagination?.pageSize ?? 20;
  const pageSizeOptions = pagination?.pageSizeOptions ?? [20, 50, 100];
  const normalizedPageSizeOptions = pageSizeOptions.includes(rawPageSize)
    ? pageSizeOptions
    : [rawPageSize, ...pageSizeOptions];

  return (
    <div
      data-slot="table-container"
      data-variant={variant}
      className="relative w-full data-[variant=bordered]:border data-[variant=bordered]:rounded-lg"
    >
      <div data-slot="table-scroll" className="w-full overflow-x-auto">
        <table
          data-slot="table"
          className="w-full caption-bottom text-sm [&_[data-slot=text][data-default-size=true]]:text-sm"
          {...props}
        />
      </div>
      {pagination && (
        <div
          data-slot="table-pagination"
          data-has-size={showPageSizeSelector ? 'true' : 'false'}
          className="grid items-center border-t bg-muted/40 px-3 py-2 data-[variant=bordered]:rounded-b-lg grid-cols-[1fr_auto_1fr] gap-3"
        >
          {showPageSizeSelector && (
            <div
              data-slot="table-pagination-size"
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Text as="span" size="xs" variant="muted">
                Rows per page
              </Text>
              <div className="w-20">
                <Select
                  value={String(rawPageSize)}
                  onValueChange={(value) => pagination?.onPageSizeChange?.(Number(value))}
                >
                  <SelectTrigger size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="start">
                    {normalizedPageSizeOptions.map((option) => (
                      <SelectItem key={option} value={String(option)}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div data-slot="table-pagination-controls" className="flex items-center justify-center">
            {paginationContent}
          </div>
          <div data-slot="table-pagination-spacer" />
        </div>
      )}
    </div>
  );
}

function TableHeader({ ...props }: Omit<React.ComponentProps<'thead'>, 'className'>) {
  return <thead data-slot="table-header" className="bg-muted [&_tr]:border-b" {...props} />;
}

function TableBody({ ...props }: Omit<React.ComponentProps<'tbody'>, 'className'>) {
  return <tbody data-slot="table-body" className="[&_tr:last-child]:border-0" {...props} />;
}

function TableFooter({ ...props }: Omit<React.ComponentProps<'tfoot'>, 'className'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className="bg-muted border-t font-medium [&>tr]:last:border-b-0"
      {...props}
    />
  );
}

function TableRow({ ...props }: Omit<React.ComponentProps<'tr'>, 'className'>) {
  return (
    <tr
      data-slot="table-row"
      className="hover:bg-muted data-[state=selected]:bg-accent border-b transition-colors"
      {...props}
    />
  );
}

function TableHead({ ...props }: Omit<React.ComponentProps<'th'>, 'className'>) {
  return (
    <th
      data-slot="table-head"
      className="text-muted-foreground h-10 px-3 text-left align-middle text-xs font-medium uppercase tracking-wide whitespace-nowrap [&:has([role=checkbox])]:pr-0 [[data-variant=bordered]_&]:border-r [[data-variant=bordered]_&]:last:border-r-0"
      {...props}
    />
  );
}

function TableCell({ ...props }: Omit<React.ComponentProps<'td'>, 'className'>) {
  return (
    <td
      data-slot="table-cell"
      className="px-3 py-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [[data-variant=bordered]_&]:border-r [[data-variant=bordered]_&]:last:border-r-0 [&_[data-slot=button]]:relative [&_[data-slot=button]]:z-10"
      {...props}
    />
  );
}

function TableCaption({ ...props }: Omit<React.ComponentProps<'caption'>, 'className'>) {
  return (
    <caption data-slot="table-caption" className="text-muted-foreground mt-4 text-sm" {...props} />
  );
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
