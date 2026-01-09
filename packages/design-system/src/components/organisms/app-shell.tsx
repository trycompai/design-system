import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRightIcon, PanelLeftIcon, SearchIcon } from 'lucide-react';
import * as React from 'react';

import { Kbd } from '../atoms/kbd';
import { Stack } from '../atoms/stack';
import { AIChat } from '../molecules/ai-chat';
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
  /** Rail content for mobile drawer */
  railContent: React.ReactNode;
  setRailContent: (content: React.ReactNode) => void;
  /** Sidebar content for mobile drawer */
  sidebarContent: React.ReactNode;
  setSidebarContent: (content: React.ReactNode) => void;
  /** Sidebar variant for mobile drawer styling */
  sidebarVariant: 'default' | 'muted' | 'primary';
  setSidebarVariant: (variant: 'default' | 'muted' | 'primary') => void;
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

const sidebarWidths = {
  sm: 'w-48',
  default: 'w-64',
  lg: 'w-72',
  xl: 'w-80',
} as const;

const appShellSidebarVariants = cva(
  'shrink-0 overflow-hidden hidden md:flex md:flex-col transition-[width,padding,opacity] duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-background border-r border-border/40',
        muted: 'bg-muted border-r border-border/40',
        primary: 'bg-primary border-r border-primary-foreground/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const appShellContentVariants = cva('flex flex-1 flex-col overflow-auto bg-background min-h-0', {
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
  /** Show the floating AI chat button */
  showAIChat?: boolean;
  /** Custom content for the AI chat panel */
  aiChatContent?: React.ReactNode;
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
  /** Width of the sidebar */
  width?: keyof typeof sidebarWidths;
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

// Rail indicator context for tracking active item position
type RailIndicatorContextProps = {
  registerItem: (id: string, element: HTMLElement | null) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const RailIndicatorContext = React.createContext<RailIndicatorContextProps | null>(null);

// ============ COMPONENTS ============

function AppShell({
  defaultSidebarOpen = true,
  sidebarOpen: sidebarOpenProp,
  onSidebarOpenChange,
  showAIChat = false,
  aiChatContent,
  children,
  ...props
}: AppShellProps) {
  // Desktop sidebar state
  const [_sidebarOpen, _setSidebarOpen] = React.useState(defaultSidebarOpen);
  const sidebarOpen = sidebarOpenProp ?? _sidebarOpen;

  // Mobile drawer state (always starts closed)
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  // Content for mobile drawer (populated by Rail and Sidebar components)
  const [railContent, setRailContent] = React.useState<React.ReactNode>(null);
  const [sidebarContent, setSidebarContent] = React.useState<React.ReactNode>(null);
  const [sidebarVariant, setSidebarVariant] = React.useState<'default' | 'muted' | 'primary'>('default');

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

  // Listen for Cmd+\ to toggle sidebar (desktop) or mobile drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '\\' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Check if we're on mobile (md breakpoint is 768px)
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (isMobile) {
          setMobileDrawerOpen((prev) => !prev);
        } else {
          setSidebarOpen(!sidebarOpen);
        }
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
      railContent,
      setRailContent,
      sidebarContent,
      setSidebarContent,
      sidebarVariant,
      setSidebarVariant,
    }),
    [sidebarOpen, setSidebarOpen, toggleSidebar, mobileDrawerOpen, toggleMobileDrawer, railContent, sidebarContent, sidebarVariant],
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
        {showAIChat && <AIChat>{aiChatContent}</AIChat>}
      </div>
    </AppShellContext.Provider>
  );
}

function AppShellNavbar({
  position = 'sticky',
  showSidebarToggle = false,
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
  const { mobileDrawerOpen, setMobileDrawerOpen, railContent, sidebarContent, sidebarVariant } = useAppShell();

  return (
    <div data-slot="app-shell-body" className="flex flex-1 overflow-hidden bg-background/50 min-h-0 gap-0" {...props}>
      {/* Mobile drawer - shows both rail and sidebar */}
      <div className="md:hidden">
        {/* Backdrop */}
        {mobileDrawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileDrawerOpen(false)}
          />
        )}
        {/* Drawer panel */}
        <div
          data-slot="app-shell-mobile-drawer"
          className={`fixed inset-y-0 left-0 z-50 flex transform transition-transform duration-200 ease-in-out ${
            mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Rail section - only show if there are rail items */}
          {railContent && (
            <div className="flex flex-col items-center w-16 shrink-0 py-3 gap-1 bg-muted border-r border-border/40">
              {railContent}
            </div>
          )}
          {/* Sidebar section */}
          <div
            data-variant={sidebarVariant}
            className={`flex flex-col w-64 p-2 ${
              sidebarVariant === 'primary' ? 'bg-primary' : sidebarVariant === 'muted' ? 'bg-muted' : 'bg-background'
            }`}
          >
            {sidebarContent}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

// Wrapper for sidebar + content that maintains consistent left edge
function AppShellMain({ children, ...props }: Omit<React.ComponentProps<'div'>, 'className'>) {
  return (
    <div
      data-slot="app-shell-main"
      className="flex flex-1 min-h-0 ml-2 mr-2 mb-2 rounded-xl overflow-hidden bg-background"
      {...props}
    >
      {children}
    </div>
  );
}

function AppShellRail({ showSidebarToggle = true, children, ...props }: AppShellRailProps) {
  const { sidebarOpen, toggleSidebar, setRailContent } = useAppShell();
  const itemsContainerRef = React.useRef<HTMLDivElement>(null);
  const indicatorRef = React.useRef<HTMLSpanElement>(null);
  const itemsRef = React.useRef<Map<string, HTMLElement>>(new Map());
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const isFirstRender = React.useRef(true);

  // Register rail content for mobile drawer
  React.useEffect(() => {
    setRailContent(children);
    return () => setRailContent(null);
  }, [children, setRailContent]);

  const registerItem = React.useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      itemsRef.current.set(id, element);
    } else {
      itemsRef.current.delete(id);
    }
  }, []);

  // Update indicator position when active item changes
  React.useEffect(() => {
    if (!activeId || !itemsContainerRef.current || !indicatorRef.current) {
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = '0';
      }
      return;
    }

    const activeElement = itemsRef.current.get(activeId);
    if (!activeElement) {
      indicatorRef.current.style.opacity = '0';
      return;
    }

    const containerRect = itemsContainerRef.current.getBoundingClientRect();
    const itemRect = activeElement.getBoundingClientRect();

    // Calculate center position of the item relative to items container
    // Item center Y relative to container, minus half the indicator height (h-6 = 24px, so 12px)
    const top = itemRect.top - containerRect.top + (itemRect.height / 2) - 12;

    // On first render, position instantly but fade in gently
    if (isFirstRender.current) {
      // Disable all transitions, set position, keep opacity at 0
      indicatorRef.current.style.transition = 'none';
      indicatorRef.current.style.top = `${top}px`;
      indicatorRef.current.style.opacity = '0';
      // Force reflow
      indicatorRef.current.offsetHeight;
      // Re-enable transitions, then fade in
      indicatorRef.current.style.transition = '';
      // Use requestAnimationFrame to ensure the transition is applied
      requestAnimationFrame(() => {
        if (indicatorRef.current) {
          indicatorRef.current.style.opacity = '1';
        }
      });
      isFirstRender.current = false;
    } else {
      indicatorRef.current.style.top = `${top}px`;
      indicatorRef.current.style.opacity = '1';
    }
  }, [activeId]);

  const contextValue = React.useMemo<RailIndicatorContextProps>(
    () => ({ registerItem, activeId, setActiveId }),
    [registerItem, activeId]
  );

  return (
    <RailIndicatorContext.Provider value={contextValue}>
      <div
        data-slot="app-shell-rail"
        className="hidden md:flex flex-col items-center w-14 shrink-0 py-2 gap-1"
        {...props}
      >
        {/* App/module items with indicator */}
        <div ref={itemsContainerRef} className="flex flex-col items-center gap-1 flex-1 relative">
          {/* Animated indicator pill */}
          <span
            ref={indicatorRef}
            className="absolute right-0 w-1 h-6 rounded-full bg-primary transition-all duration-300 ease-out pointer-events-none -mr-2"
            style={{ opacity: 0, top: 0 }}
          />
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
    </RailIndicatorContext.Provider>
  );
}

function AppShellRailItem({ isActive, icon, label, ...props }: AppShellRailItemProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const context = React.useContext(RailIndicatorContext);
  const itemId = React.useId();

  // Register this item with the rail
  React.useEffect(() => {
    context?.registerItem(itemId, buttonRef.current);
    return () => context?.registerItem(itemId, null);
  }, [context, itemId]);

  // Update active state in context
  React.useEffect(() => {
    if (isActive) {
      context?.setActiveId(itemId);
    }
  }, [isActive, context, itemId]);

  return (
    <button
      ref={buttonRef}
      data-slot="app-shell-rail-item"
      data-active={isActive}
      className={`flex size-10 items-center justify-center rounded-md transition-all duration-200 cursor-pointer ${
        isActive
          ? 'bg-primary/10 text-primary'
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
  variant = 'default',
  collapsible = true,
  children,
  ...props
}: AppShellSidebarProps) {
  const { sidebarOpen, setSidebarContent, setSidebarVariant } = useAppShell();
  const isCollapsed = collapsible && !sidebarOpen;

  // Register sidebar content and variant for mobile drawer
  React.useEffect(() => {
    setSidebarContent(children);
    setSidebarVariant(variant ?? 'default');
    return () => {
      setSidebarContent(null);
      setSidebarVariant('default');
    };
  }, [children, variant, setSidebarContent, setSidebarVariant]);

  return (
    <>
      {/* Desktop sidebar - always rendered, animated collapse */}
      <aside
        data-slot="app-shell-sidebar"
        data-variant={variant}
        data-collapsed={isCollapsed}
        className={`${appShellSidebarVariants({ variant })} ${
          isCollapsed ? 'w-0 p-0 border-0' : `${sidebarWidths[width]} p-2`
        }`}
        {...props}
      >
        {/* Inner container maintains width to prevent text squishing */}
        <div
          className={`flex flex-col h-full w-60 transition-opacity duration-100 ${
            isCollapsed ? 'opacity-0' : 'opacity-100 delay-75'
          }`}
        >
          {children}
        </div>
      </aside>
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

interface AppShellSidebarHeaderProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  /** Icon for the current app/context */
  icon?: React.ReactNode;
  /** Title of the current app/context */
  title: string;
  /** Optional description or subtitle */
  description?: string;
  /** Optional action element (e.g., dropdown, button) */
  action?: React.ReactNode;
}

interface AppShellNavProps extends Omit<React.ComponentProps<'nav'>, 'className'> {}

interface AppShellNavGroupProps extends Omit<React.ComponentProps<'div'>, 'className'> {
  label?: string;
}

interface AppShellNavItemProps extends Omit<React.ComponentProps<'button'>, 'className'> {
  isActive?: boolean;
  icon?: React.ReactNode;
}

interface AppShellNavFooterProps extends Omit<React.ComponentProps<'div'>, 'className'> {}

function AppShellSidebarHeader({ icon, title, description, action, children, ...props }: AppShellSidebarHeaderProps) {
  return (
    <div
      data-slot="app-shell-sidebar-header"
      className={[
        'flex items-center gap-3 px-2 py-2 mb-2 border-b',
        'border-border/40',
        '[[data-variant=primary]_&]:border-primary-foreground/20',
      ].join(' ')}
      {...props}
    >
      {icon && (
        <span
          className={[
            'flex size-8 items-center justify-center rounded-lg shrink-0',
            'bg-muted/50 dark:bg-muted text-foreground',
            '[[data-variant=primary]_&]:bg-primary-foreground/15 [[data-variant=primary]_&]:text-primary-foreground',
            '[&>svg]:size-4',
          ].join(' ')}
        >
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <div
          className={[
            'font-semibold text-sm truncate',
            'text-foreground',
            '[[data-variant=primary]_&]:text-primary-foreground',
          ].join(' ')}
        >
          {title}
        </div>
        {description && (
          <div
            className={[
              'text-xs truncate',
              'text-muted-foreground',
              '[[data-variant=primary]_&]:text-primary-foreground/70',
            ].join(' ')}
          >
            {description}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {children}
    </div>
  );
}

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
        <div
          className={[
            'px-2 pb-1 text-xs font-medium uppercase tracking-wider',
            // Default & muted variants
            'text-muted-foreground',
            // Primary variant - light text
            '[[data-variant=primary]_&]:text-primary-foreground/70',
          ].join(' ')}
        >
          {label}
        </div>
      )}
      <Stack gap="1">{children}</Stack>
    </div>
  );
}

function AppShellNavItem({ isActive, icon, children, ...props }: AppShellNavItemProps) {
  return (
    <button
      data-slot="app-shell-nav-item"
      data-active={isActive}
      className={[
        'flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm cursor-pointer',
        // Smooth transitions for premium feel
        'transition-all duration-150 ease-out',
        // Subtle scale on hover for premium touch
        'active:scale-[0.98]',
        // Base styles for default/muted sidebar variants
        isActive
          ? [
              // Active state - default variant: softer in light, stronger in dark
              '[[data-variant=default]_&]:bg-muted/50 [[data-variant=default]_&]:dark:bg-muted [[data-variant=default]_&]:text-foreground',
              // Active state - muted variant (gray bg sidebar): use white bg
              '[[data-variant=muted]_&]:bg-background [[data-variant=muted]_&]:text-foreground [[data-variant=muted]_&]:shadow-sm',
              // Active state - primary variant: use white/10 overlay
              '[[data-variant=primary]_&]:bg-primary-foreground/15 [[data-variant=primary]_&]:text-primary-foreground',
              'font-medium',
            ].join(' ')
          : [
              // Inactive - default/muted variants
              'text-muted-foreground hover:text-foreground',
              '[[data-variant=default]_&]:hover:bg-muted/30 [[data-variant=default]_&]:dark:hover:bg-muted/60',
              '[[data-variant=muted]_&]:hover:bg-background/60',
              // Inactive - primary variant
              '[[data-variant=primary]_&]:text-primary-foreground/70 [[data-variant=primary]_&]:hover:text-primary-foreground [[data-variant=primary]_&]:hover:bg-primary-foreground/10',
            ].join(' '),
      ].join(' ')}
      {...props}
    >
      {icon && <span className="size-4 shrink-0 [&>svg]:size-4 transition-transform duration-150 group-hover:scale-110">{icon}</span>}
      {children}
    </button>
  );
}

function AppShellNavFooter({ children, ...props }: AppShellNavFooterProps) {
  return (
    <div
      data-slot="app-shell-nav-footer"
      className={[
        'mt-auto border-t pt-2 space-y-1',
        'border-border/40',
        '[[data-variant=primary]_&]:border-primary-foreground/20',
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellMain,
  AppShellNav,
  AppShellNavbar,
  AppShellNavFooter,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellRail,
  AppShellRailItem,
  AppShellSearch,
  AppShellSidebar,
  AppShellSidebarHeader,
  AppShellUserMenu,
  appShellContentVariants,
  appShellNavbarVariants,
  appShellSearchVariants,
  appShellSidebarVariants,
  useAppShell,
};
