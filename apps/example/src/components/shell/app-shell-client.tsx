'use client';

import {
  AppShell,
  AppShellAIChatTrigger,
  AppShellBody,
  AppShellContent,
  AppShellMain,
  AppShellNav,
  AppShellNavbar,
  AppShellNavFooter,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellNavItemCollapsible,
  AppShellNavSubItem,
  AppShellRail,
  AppShellRailItem,
  AppShellSidebar,
  AppShellSidebarHeader,
  AppShellUserMenu,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  CommandSearch,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HStack,
  Logo,
  LogoIcon,
  OrganizationSelector,
  type Organization,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  ThemeToggle,
} from '@trycompai/design-system';
import {
  Add,
  Logout,
  Notification,
  Settings,
  User,
} from '@carbon/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import {
  getActiveRailItem,
  getSidebarConfig,
  isNavItemActive,
  railItems,
  type NavItem,
  type NavItemWithChildren,
} from './nav-config';

// =============================================================================
// Organizations
// =============================================================================

const organizations: Organization[] = [
  { id: 'org_acme123', name: 'Acme Corp', color: '#10b981' },
  { id: 'org_beta456', name: 'Beta Inc', color: '#3b82f6' },
  { id: 'org_gamma789', name: 'Gamma LLC', color: '#8b5cf6' },
];

// =============================================================================
// Navbar Logo
// =============================================================================

function NavbarLogo() {
  const [isDark, setIsDark] = React.useState(false);
  const [selectedOrg, setSelectedOrg] = React.useState('org_acme123');

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <HStack gap="sm" align="center">
      <Link href="/">
        {/* Full logo on desktop, icon only on mobile */}
        <span className="hidden sm:block">
          <Logo style={{ height: 22, width: 'auto' }} variant={isDark ? 'light' : 'dark'} />
        </span>
        <span className="block sm:hidden">
          <LogoIcon style={{ height: 22, width: 22 }} variant={isDark ? 'light' : 'dark'} />
        </span>
      </Link>
      <span className="text-muted-foreground pl-3">/</span>
      <OrganizationSelector
        organizations={organizations}
        value={selectedOrg}
        onValueChange={setSelectedOrg}
        size="sm"
        modal
      />
    </HStack>
  );
}

// =============================================================================
// Notifications
// =============================================================================

const notifications = [
  {
    id: 1,
    title: 'New team member',
    description: 'Sarah joined the team',
    time: '5 minutes ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Project update',
    description: 'Website Redesign moved to Review',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Comment mention',
    description: 'Mike mentioned you in a comment',
    time: '2 hours ago',
    unread: false,
  },
];

function NotificationsPopover() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger className="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer">
        <div className="relative">
          <Notification size={16} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 size-3.5 rounded-full bg-destructive text-[9px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" style={{ width: '340px', padding: 0 }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Text weight="semibold" size="sm">Notifications</Text>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
        </div>
        <div className="max-h-80 overflow-auto divide-y divide-border">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                notification.unread ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <Text size="sm" weight="medium">{notification.title}</Text>
                  {notification.unread && (
                    <div className="size-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <div className="truncate">
                  <Text size="sm" variant="muted">{notification.description}</Text>
                </div>
                <Text size="xs" variant="muted">{notification.time}</Text>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border">
          <button
            type="button"
            className="w-full px-4 py-2.5 text-sm text-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// =============================================================================
// User Menu
// =============================================================================

function UserMenu() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleThemeChange = (dark: boolean) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-7 items-center justify-center rounded-full hover:bg-muted transition-colors cursor-pointer">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=john@example.com" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" style={{ minWidth: '200px' }}>
        <div className="px-2 py-1.5">
          <Text size="sm" weight="medium">John Doe</Text>
          <Text size="xs" variant="muted">john@example.com</Text>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/settings">
            <DropdownMenuItem>
              <User size={16} />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>
              <Settings size={16} />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-2 py-1.5">
          <Text size="sm">Theme</Text>
          <ThemeToggle size="sm" isDark={isDark} onChange={handleThemeChange} />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Logout size={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// =============================================================================
// Search Config
// =============================================================================

const searchGroups = [
  {
    id: 'pages',
    label: 'Pages',
    items: railItems.map((item) => ({
      id: item.id,
      label: item.label,
      icon: item.icon,
    })),
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { id: 'new-project', label: 'Create new project', icon: <Add size={16} /> },
      { id: 'invite', label: 'Invite team member', icon: <User size={16} /> },
    ],
  },
];

// =============================================================================
// Sidebar Nav Item (with Link)
// =============================================================================

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
}

function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  return (
    <Link href={item.href} className="block">
      <AppShellNavItem icon={item.icon} isActive={isActive}>
        {item.label}
      </AppShellNavItem>
    </Link>
  );
}

// Sidebar nav item that may have children
interface SidebarNavItemWithChildrenProps {
  item: NavItemWithChildren;
  pathname: string;
}

function SidebarNavItemWithChildren({ item, pathname }: SidebarNavItemWithChildrenProps) {
  const itemActive = isNavItemActive(item, pathname);

  // If item has children, render collapsible
  if (item.children && item.children.length > 0) {
    return (
      <AppShellNavItemCollapsible
        icon={item.icon}
        label={item.label}
        isActive={itemActive}
      >
        {item.children.map((child) => {
          const childActive = child.href === '/' ? pathname === '/' : pathname === child.href || pathname.startsWith(child.href + '/');
          return (
            <Link key={child.id} href={child.href} className="block">
              <AppShellNavSubItem isActive={childActive}>
                {child.label}
              </AppShellNavSubItem>
            </Link>
          );
        })}
      </AppShellNavItemCollapsible>
    );
  }

  // Regular item with direct href
  if (item.href) {
    return (
      <Link href={item.href} className="block">
        <AppShellNavItem icon={item.icon} isActive={itemActive}>
          {item.label}
        </AppShellNavItem>
      </Link>
    );
  }

  return null;
}

// =============================================================================
// Main App Shell Client Component
// =============================================================================

interface AppShellClientProps {
  children: React.ReactNode;
}

export function AppShellClient({ children }: AppShellClientProps) {
  const pathname = usePathname();
  const activeRailId = getActiveRailItem(pathname);
  const sidebarConfig = getSidebarConfig(pathname);

  // Check if a simple nav item is active
  const checkNavItemActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <AppShell showAIChat>
      <AppShellNavbar
        startContent={<NavbarLogo />}
        centerContent={<CommandSearch groups={searchGroups} placeholder="Search..." />}
        endContent={
          <AppShellUserMenu>
            <AppShellAIChatTrigger />
            <NotificationsPopover />
            <UserMenu />
          </AppShellUserMenu>
        }
      />
      <AppShellBody>
        <AppShellRail>
          {railItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <AppShellRailItem
                icon={item.icon}
                label={item.label}
                isActive={activeRailId === item.id}
              />
            </Link>
          ))}
        </AppShellRail>
        <AppShellMain>
          <AppShellSidebar collapsible>
            <AppShellSidebarHeader
              title={sidebarConfig.title}
            />
            <AppShellNav>
              {sidebarConfig.items.map((item) => (
                <SidebarNavItemWithChildren
                  key={item.id}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </AppShellNav>
            {sidebarConfig.footer && (
              <AppShellNavFooter>
                {sidebarConfig.footer.map((item) => (
                  <SidebarNavItem
                    key={item.id}
                    item={item}
                    isActive={checkNavItemActive(item.href)}
                  />
                ))}
              </AppShellNavFooter>
            )}
          </AppShellSidebar>
          <AppShellContent padding="none">
            <div className="p-6">{children}</div>
          </AppShellContent>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  );
}
