'use client';

import {
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
  AppShellSidebar,
  AppShellSidebarHeader,
  AppShellUserMenu,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  CommandSearch,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HStack,
  Logo,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  ThemeToggle,
} from '@trycompai/design-system';
import {
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import {
  getActiveRailItem,
  getSidebarConfig,
  railItems,
  type NavItem,
} from './nav-config';

// =============================================================================
// Project Selector
// =============================================================================

const projects = [
  { id: 'example', name: 'Example App', color: 'bg-primary', plan: 'Pro' },
  { id: 'side', name: 'Side Project', color: 'bg-blue-500', plan: 'Free' },
  { id: 'personal', name: 'Personal', color: 'bg-purple-500', plan: 'Free' },
];

function ProjectSelector() {
  const [currentProject, setCurrentProject] = React.useState(projects[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium hover:bg-background/50 transition-colors"
        >
          {currentProject.name}
          <ChevronDownIcon className="size-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" style={{ minWidth: '220px' }}>
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuGroup>
          {projects.map((project) => (
            <DropdownMenuItem
              key={project.id}
              onClick={() => setCurrentProject(project)}
            >
              <div className={`size-2 rounded-full ${project.color}`} />
              <span className="flex-1">{project.name}</span>
              {currentProject.id === project.id && (
                <CheckIcon className="size-4 text-primary" />
              )}
              <span className="text-xs text-muted-foreground">{project.plan}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PlusIcon className="size-4" />
          Create new project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// =============================================================================
// Navbar Logo
// =============================================================================

function NavbarLogo() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <HStack gap="xs" align="center">
      <Link href="/">
        <Logo style={{ height: 22, width: 'auto' }} variant={isDark ? 'light' : 'dark'} />
      </Link>
      <span className="pl-3 pr-1 text-muted-foreground">/</span>
      <ProjectSelector />
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
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <div className="relative">
            <BellIcon />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-destructive text-[10px] font-medium text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" style={{ width: '320px', padding: 0 }}>
        <div className="p-3 border-b border-border">
          <HStack justify="between" align="center">
            <Text weight="semibold">Notifications</Text>
            {unreadCount > 0 && (
              <Badge variant="secondary">{unreadCount} new</Badge>
            )}
          </HStack>
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer ${
                notification.unread ? 'bg-primary/5' : ''
              }`}
            >
              <HStack justify="between" align="start">
                <Stack gap="xs">
                  <Text size="sm" weight="medium">
                    {notification.title}
                  </Text>
                  <Text size="sm" variant="muted">
                    {notification.description}
                  </Text>
                </Stack>
                {notification.unread && (
                  <div className="size-2 rounded-full bg-primary mt-1.5" />
                )}
              </HStack>
              <Text size="xs" variant="muted">
                {notification.time}
              </Text>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-border">
          <Button variant="ghost" size="sm">
            View all notifications
          </Button>
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
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" style={{ minWidth: '200px' }}>
        <div className="px-2 py-1.5">
          <Text size="sm" weight="medium">John Doe</Text>
          <Text size="xs" variant="muted">john@example.com</Text>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <UserIcon />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <SettingsIcon />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-2 py-1.5">
          <Text size="sm">Theme</Text>
          <ThemeToggle size="sm" isDark={isDark} onChange={handleThemeChange} />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
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
      { id: 'new-project', label: 'Create new project', icon: <PlusIcon className="size-4" /> },
      { id: 'invite', label: 'Invite team member', icon: <UserIcon className="size-4" /> },
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
    <Link href={item.href} passHref legacyBehavior>
      <AppShellNavItem icon={item.icon} isActive={isActive}>
        {item.label}
      </AppShellNavItem>
    </Link>
  );
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

  // Check if a nav item is active
  const isNavItemActive = (href: string) => {
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
            <NotificationsPopover />
            <UserMenu />
          </AppShellUserMenu>
        }
      />
      <AppShellBody>
        <AppShellRail>
          {railItems.map((item) => (
            <Link key={item.id} href={item.href} passHref legacyBehavior>
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
              icon={sidebarConfig.icon}
              title={sidebarConfig.title}
            />
            <AppShellNav>
              {sidebarConfig.groups.map((group) => (
                <AppShellNavGroup key={group.id} label={group.label}>
                  {group.items.map((item) => (
                    <SidebarNavItem
                      key={item.id}
                      item={item}
                      isActive={isNavItemActive(item.href)}
                    />
                  ))}
                </AppShellNavGroup>
              ))}
            </AppShellNav>
            {sidebarConfig.footer && (
              <AppShellNavFooter>
                {sidebarConfig.footer.map((item) => (
                  <SidebarNavItem
                    key={item.id}
                    item={item}
                    isActive={isNavItemActive(item.href)}
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
