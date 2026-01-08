import { cva, type VariantProps } from 'class-variance-authority';
import { SearchIcon } from 'lucide-react';
import * as React from 'react';

import { Kbd } from '../atoms/kbd';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../molecules/input-group';
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from './sidebar';

// ============ VARIANTS ============

const appShellVariants = cva('', {
  variants: {
    sidebarSide: {
      left: '',
      right: '',
    },
    sidebarVariant: {
      sidebar: '',
      floating: '',
      inset: '',
    },
  },
  defaultVariants: {
    sidebarSide: 'left',
    sidebarVariant: 'sidebar',
  },
});

const appShellNavbarVariants = cva(
  'flex h-14 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[variant=inset]/sidebar-wrapper:min-h-14',
  {
    variants: {
      position: {
        sticky: 'sticky top-0 z-40',
        fixed: 'fixed top-0 inset-x-0 z-40',
        static: '',
      },
    },
    defaultVariants: {
      position: 'sticky',
    },
  },
);

const appShellContentVariants = cva('flex flex-1 flex-col', {
  variants: {
    padding: {
      none: '',
      sm: 'p-4',
      default: 'p-4 md:p-6',
      lg: 'p-6 md:p-8',
    },
  },
  defaultVariants: {
    padding: 'default',
  },
});

const appShellSearchVariants = cva('', {
  variants: {
    searchWidth: {
      sm: 'w-48 md:w-64',
      md: 'w-64 md:w-80',
      lg: 'w-80 md:w-96',
      full: 'w-full max-w-md',
    },
  },
  defaultVariants: {
    searchWidth: 'md',
  },
});

// ============ TYPES ============

interface AppShellProps
  extends Omit<React.ComponentProps<'div'>, 'className'>,
    VariantProps<typeof appShellVariants> {
  /** Content for the sidebar slot */
  sidebar?: React.ReactNode;
  /** Default sidebar open state */
  defaultSidebarOpen?: boolean;
  /** Controlled sidebar open state */
  sidebarOpen?: boolean;
  /** Callback when sidebar state changes */
  onSidebarOpenChange?: (open: boolean) => void;
  /** Sidebar collapsible behavior */
  sidebarCollapsible?: 'offExamples' | 'icon' | 'none';
}

interface AppShellNavbarProps
  extends Omit<React.ComponentProps<'header'>, 'className'>,
    VariantProps<typeof appShellNavbarVariants> {
  /** Shows sidebar toggle button on the left */
  showSidebarToggle?: boolean;
  /** Content for the start slot (after sidebar toggle) */
  startContent?: React.ReactNode;
  /** Content for the center slot (typically search) */
  centerContent?: React.ReactNode;
  /** Content for the end slot (typically user menu) */
  endContent?: React.ReactNode;
}

interface AppShellContentProps
  extends Omit<React.ComponentProps<'main'>, 'className'>,
    VariantProps<typeof appShellContentVariants> {}

interface AppShellSearchProps
  extends Omit<React.ComponentProps<'input'>, 'className'>,
    VariantProps<typeof appShellSearchVariants> {
  /** Shows keyboard shortcut hint */
  showShortcut?: boolean;
}

interface AppShellUserMenuProps extends Omit<React.ComponentProps<'div'>, 'className'> {}

// ============ COMPONENTS ============

function AppShell({
  sidebar,
  sidebarSide = 'left',
  sidebarVariant = 'sidebar',
  sidebarCollapsible = 'offExamples',
  defaultSidebarOpen = true,
  sidebarOpen,
  onSidebarOpenChange,
  children,
  ...props
}: AppShellProps) {
  return (
    <SidebarProvider
      defaultOpen={defaultSidebarOpen}
      open={sidebarOpen}
      onOpenChange={onSidebarOpenChange}
      {...props}
    >
      <Sidebar
        side={sidebarSide ?? undefined}
        variant={sidebarVariant ?? undefined}
        collapsible={sidebarCollapsible}
      >
        {sidebar}
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

function AppShellNavbar({
  position = 'sticky',
  showSidebarToggle = true,
  startContent,
  centerContent,
  endContent,
  children,
  ...props
}: AppShellNavbarProps) {
  return (
    <header data-slot="app-shell-navbar" className={appShellNavbarVariants({ position })} {...props}>
      {/* Left section: sidebar toggle + start content */}
      <div className="flex items-center gap-2">
        {showSidebarToggle && <SidebarTrigger />}
        {startContent}
      </div>

      {/* Center section: search or custom content */}
      <div className="flex flex-1 items-center justify-center px-4">{centerContent}</div>

      {/* Right section: user menu + end content */}
      <div className="flex items-center gap-2 px-4">{endContent}</div>

      {/* Allow additional children for custom layouts */}
      {children}
    </header>
  );
}

function AppShellContent({ padding = 'default', children, ...props }: AppShellContentProps) {
  return (
    <main data-slot="app-shell-content" className={appShellContentVariants({ padding })} {...props}>
      {children}
    </main>
  );
}

function AppShellSearch({
  searchWidth = 'md',
  showShortcut = true,
  placeholder = 'Search...',
  ...props
}: AppShellSearchProps) {
  return (
    <div className={appShellSearchVariants({ searchWidth })}>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder={placeholder} {...props} />
        {showShortcut && (
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
}

function AppShellUserMenu({ children, ...props }: AppShellUserMenuProps) {
  return (
    <div data-slot="app-shell-user-menu" className="flex items-center gap-2" {...props}>
      {children}
    </div>
  );
}

export {
  AppShell,
  AppShellContent,
  AppShellNavbar,
  AppShellSearch,
  AppShellUserMenu,
  appShellContentVariants,
  appShellNavbarVariants,
  appShellSearchVariants,
  appShellVariants,
};
