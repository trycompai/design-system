import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRightIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import * as React from 'react';

import { Kbd } from '../atoms/kbd';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../molecules/input-group';

// ============ CONTEXT ============

type AppShellContextProps = {
  /** Desktop sidebar expanded state */
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  /** Mobile drawer open state (separate from desktop) */
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
  toggleMobileDrawer: () => void;
};

const AppShellContext = React.createContext<AppShellContextProps | null>(null);

function useAppShell() {
  const context = React.useContext(AppShellContext);
  if (!context) {
    throw new Error('useAppShell must be used within an AppShell.');
  }
  return context;
}

// ============ VARIANTS ============

const appShellNavbarVariants = cva(
  'flex h-14 shrink-0 items-center gap-2 bg-background/50 px-4',
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

const appShellSidebarVariants = cva(
  'shrink-0 bg-background p-2 overflow-hidden hidden md:flex md:flex-col rounded-l-xl mt-2 mb-2 ml-2 border-r border-border',
  {
    variants: {
      width: {
        sm: 'w-48',
        default: 'w-64',
        lg: 'w-72',
        xl: 'w-80',
      },
    },
    defaultVariants: {
      width: 'default',
    },
  },
);

const appShellContentVariants = cva('flex flex-1 flex-col overflow-auto bg-background mt-2 mr-2 mb-2 rounded-r-xl min-h-0', {
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

interface AppShellProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  /** Default sidebar open state */
  defaultSidebarOpen?: boolean;
  /** Controlled sidebar open state */
  sidebarOpen?: boolean;
  /** Callback when sidebar state changes */
  onSidebarOpenChange?: (open: boolean) => void;
}

interface AppShellNavbarProps
  extends Omit<React.ComponentProps<'header'>, 'className'>,
    VariantProps<typeof appShellNavbarVariants> {
  /** Shows sidebar toggle button */
  showSidebarToggle?: boolean;
  /** Content for the start slot (after sidebar toggle) */
  startContent?: React.ReactNode;
  /** Content for the center slot (typically search) */
  centerContent?: React.ReactNode;
  /** Content for the end slot (typically user menu) */
  endContent?: React.ReactNode;
}

interface AppShellSidebarProps
  extends Omit<React.ComponentProps<'aside'>, 'className'>,
    VariantProps<typeof appShellSidebarVariants> {
  /** Collapsible on mobile */
  collapsible?: boolean;
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

interface AppShellBodyProps extends Omit<React.ComponentProps<'div'>, 'className'> {}

interface AppShellRailProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  /** Show the sidebar toggle button in the rail */
  showSidebarToggle?: boolean;
}

interface AppShellRailItemProps extends Omit<React.ComponentProps<'button'>, 'className'> {
  isActive?: boolean;
  icon: React.ReactNode;
  label?: string;
}

// ============ COMPONENTS ============

function AppShell({
  defaultSidebarOpen = true,
  sidebarOpen: sidebarOpenProp,
  onSidebarOpenChange,
  children,
  ...props
}: AppShellProps) {
  // Desktop sidebar state
  const [_sidebarOpen, _setSidebarOpen] = React.useState(defaultSidebarOpen);
  const sidebarOpen = sidebarOpenProp ?? _sidebarOpen;

  // Mobile drawer state (always starts closed)
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  const setSidebarOpen = React.useCallback(
    (open: boolean) => {
      if (onSidebarOpenChange) {
        onSidebarOpenChange(open);
      } else {
        _setSidebarOpen(open);
      }
    },
    [onSidebarOpenChange],
  );

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen, setSidebarOpen]);

  const toggleMobileDrawer = React.useCallback(() => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  }, [mobileDrawerOpen]);

  // Listen for Cmd+\ to toggle sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '\\' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  const contextValue = React.useMemo<AppShellContextProps>(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      mobileDrawerOpen,
      setMobileDrawerOpen,
      toggleMobileDrawer,
    }),
    [sidebarOpen, setSidebarOpen, toggleSidebar, mobileDrawerOpen, toggleMobileDrawer],
  );

  return (
    <AppShellContext.Provider value={contextValue}>
      <div
        data-slot="app-shell"
        data-sidebar-open={sidebarOpen}
        className="flex h-svh w-full flex-col bg-muted overflow-hidden"
        {...props}
      >
        {children}
      </div>
    </AppShellContext.Provider>
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
  const { toggleSidebar, sidebarOpen, toggleMobileDrawer } = useAppShell();

  return (
    <header data-slot="app-shell-navbar" className={`${appShellNavbarVariants({ position })} relative`} {...props}>
      {/* Left section: sidebar toggle + start content */}
      <div className="flex items-center gap-2 z-10">
        {/* Mobile hamburger menu - always visible on mobile, controls mobile drawer */}
        <button
          type="button"
          onClick={toggleMobileDrawer}
          className="inline-flex md:hidden size-8 items-center justify-center rounded-md hover:bg-background/50"
          aria-label="Toggle menu"
        >
          <PanelLeftIcon className="size-4" />
        </button>
        {/* Desktop toggle - only visible when prop is true */}
        {showSidebarToggle && (
          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden md:inline-flex size-8 items-center justify-center rounded-md hover:bg-background/50"
            aria-label="Toggle sidebar"
          >
            <PanelLeftIcon className="size-4" />
          </button>
        )}
        {startContent}
      </div>

      {/* Center section: absolutely positioned for true center */}
      {centerContent && (
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">{centerContent}</div>
        </div>
      )}

      {/* Right section: user menu + end content */}
      <div className="flex items-center gap-2 z-10 ml-auto">{endContent}</div>

      {/* Allow additional children for custom layouts */}
      {children}
    </header>
  );
}

function AppShellBody({ children, ...props }: AppShellBodyProps) {
  return (
    <div data-slot="app-shell-body" className="flex flex-1 overflow-hidden bg-background/50 min-h-0" {...props}>
      {children}
    </div>
  );
}

function AppShellRail({ showSidebarToggle = true, children, ...props }: AppShellRailProps) {
  const { sidebarOpen, toggleSidebar } = useAppShell();

  return (
    <div
      data-slot="app-shell-rail"
      className="hidden md:flex flex-col items-center w-14 shrink-0 py-2 gap-1"
      {...props}
    >
      {/* App/module items */}
      <div className="flex flex-col items-center gap-1 flex-1">
        {children}
      </div>
      {/* Sidebar toggle at bottom */}
      {showSidebarToggle && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex size-10 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <PanelLeftIcon className={`size-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
        </button>
      )}
    </div>
  );
}

function AppShellRailItem({ isActive, icon, label, ...props }: AppShellRailItemProps) {
  return (
    <button
      data-slot="app-shell-rail-item"
      data-active={isActive}
      className={`flex size-10 items-center justify-center rounded-md transition-colors ${
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
      }`}
      title={label}
      aria-label={label}
      {...props}
    >
      <span className="size-5 [&>svg]:size-5">{icon}</span>
    </button>
  );
}

function AppShellSidebar({
  width = 'default',
  collapsible = true,
  children,
  ...props
}: AppShellSidebarProps) {
  const { sidebarOpen, mobileDrawerOpen, setMobileDrawerOpen } = useAppShell();

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}
      {/* Mobile sidebar - slide over */}
      <aside
        data-slot="app-shell-sidebar-mobile"
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-muted p-2 transform transition-transform duration-200 ease-in-out md:hidden ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        {...props}
      >
        {children}
      </aside>
      {/* Desktop sidebar */}
      {(!collapsible || sidebarOpen) && (
        <aside
          data-slot="app-shell-sidebar"
          className={appShellSidebarVariants({ width })}
          {...props}
        >
          {children}
        </aside>
      )}
    </>
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

// ============ NAV COMPONENTS ============

interface AppShellNavProps extends Omit<React.ComponentProps<'nav'>, 'className'> {}

interface AppShellNavGroupProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  label?: string;
}

interface AppShellNavItemProps extends Omit<React.ComponentProps<'button'>, 'className'> {
  isActive?: boolean;
  icon?: React.ReactNode;
}

interface AppShellNavFooterProps extends Omit<React.ComponentProps<'div'>, 'className'> {}

function AppShellNav({ children, ...props }: AppShellNavProps) {
  return (
    <nav data-slot="app-shell-nav" className="flex-1 space-y-4 py-2" {...props}>
      {children}
    </nav>
  );
}

function AppShellNavGroup({ label, children, ...props }: AppShellNavGroupProps) {
  return (
    <div data-slot="app-shell-nav-group" {...props}>
      {label && (
        <div className="px-2 pb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function AppShellNavItem({ isActive, icon, children, ...props }: AppShellNavItemProps) {
  return (
    <button
      data-slot="app-shell-nav-item"
      data-active={isActive}
      className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-background/60 ${
        isActive ? 'bg-background text-foreground font-medium shadow-sm' : 'text-muted-foreground hover:text-foreground'
      }`}
      {...props}
    >
      {icon && <span className="size-4 shrink-0 [&>svg]:size-4">{icon}</span>}
      {children}
    </button>
  );
}

function AppShellNavFooter({ children, ...props }: AppShellNavFooterProps) {
  return (
    <div data-slot="app-shell-nav-footer" className="mt-auto border-t border-border/40 pt-2 space-y-1" {...props}>
      {children}
    </div>
  );
}

export {
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellNav,
  AppShellNavbar,
  AppShellNavFooter,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellRail,
  AppShellRailItem,
  AppShellSearch,
  AppShellSidebar,
  AppShellUserMenu,
  appShellContentVariants,
  appShellNavbarVariants,
  appShellSearchVariants,
  appShellSidebarVariants,
  useAppShell,
};
