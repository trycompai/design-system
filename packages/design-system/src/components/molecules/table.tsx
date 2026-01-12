import * as React from 'react';

function Table({
  variant = 'default',
  ...props
}: Omit<React.ComponentProps<'table'>, 'className'> & {
  variant?: 'default' | 'bordered';
}) {
  return (
    <div
      data-slot="table-container"
      data-variant={variant}
      className="relative w-full overflow-x-auto data-[variant=bordered]:border data-[variant=bordered]:rounded-lg"
    >
      <table
        data-slot="table"
        className="w-full caption-bottom text-sm [&_[data-slot=text][data-default-size=true]]:text-sm"
        {...props}
      />
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
      className="px-3 py-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [[data-variant=bordered]_&]:border-r [[data-variant=bordered]_&]:last:border-r-0"
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
