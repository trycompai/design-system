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
  Button,
  CommandSearch,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HStack,
  Logo,
} from '@trycompai/design-system';
import {
  BarChart3Icon,
  BellIcon,
  ChevronDownIcon,
  FolderIcon,
  HelpCircleIcon,
  HomeIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

// Project selector dropdown
function ProjectSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium hover:bg-background/50 transition-colors"
        >
          Example App
          <ChevronDownIcon className="size-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" style={{ minWidth: '220px' }}>
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="size-2 rounded-full bg-primary" />
          <span className="flex-1">Example App</span>
          <span className="text-xs text-muted-foreground">Pro</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="size-2 rounded-full bg-blue-500" />
          <span className="flex-1">Side Project</span>
          <span className="text-xs text-muted-foreground">Free</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PlusIcon className="size-4" />
          Create new project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Logo with project selector
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
      <Logo style={{ height: 22, width: 'auto' }} variant={isDark ? 'light' : 'dark'} />
      <span className="pl-3 pr-1 text-muted-foreground">/</span>
      <ProjectSelector />
    </HStack>
  );
}

// User menu dropdown
function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon-sm">
          <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Search command groups
const searchGroups = [
  {
    id: 'pages',
    label: 'Pages',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon className="size-4" /> },
      { id: 'projects', label: 'Projects', icon: <FolderIcon className="size-4" /> },
      { id: 'analytics', label: 'Analytics', icon: <BarChart3Icon className="size-4" /> },
      { id: 'team', label: 'Team', icon: <UsersIcon className="size-4" /> },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon className="size-4" /> },
    ],
  },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <AppShell showAIChat>
      <AppShellNavbar
        startContent={<NavbarLogo />}
        centerContent={<CommandSearch groups={searchGroups} placeholder="Search..." />}
        endContent={
          <AppShellUserMenu>
            <Button variant="ghost" size="icon-sm">
              <BellIcon />
            </Button>
            <UserMenu />
          </AppShellUserMenu>
        }
      />
      <AppShellBody>
        <AppShellRail>
          <AppShellRailItem
            icon={<HomeIcon />}
            label="Home"
            isActive={isActive('/')}
            onClick={() => router.push('/')}
          />
          <AppShellRailItem
            icon={<FolderIcon />}
            label="Projects"
            isActive={isActive('/projects')}
            onClick={() => router.push('/projects')}
          />
          <AppShellRailItem
            icon={<BarChart3Icon />}
            label="Analytics"
            isActive={isActive('/analytics')}
            onClick={() => router.push('/analytics')}
          />
          <AppShellRailItem
            icon={<SettingsIcon />}
            label="Settings"
            isActive={isActive('/settings')}
            onClick={() => router.push('/settings')}
          />
        </AppShellRail>
        <AppShellMain>
          <AppShellSidebar collapsible>
            <AppShellSidebarHeader
              icon={<HomeIcon />}
              title="Dashboard"
            />
            <AppShellNav>
              <AppShellNavGroup label="Overview">
                <AppShellNavItem
                  icon={<HomeIcon />}
                  isActive={isActive('/')}
                  onClick={() => router.push('/')}
                >
                  Dashboard
                </AppShellNavItem>
                <AppShellNavItem
                  icon={<BarChart3Icon />}
                  isActive={isActive('/analytics')}
                  onClick={() => router.push('/analytics')}
                >
                  Analytics
                </AppShellNavItem>
              </AppShellNavGroup>
              <AppShellNavGroup label="Workspace">
                <AppShellNavItem
                  icon={<FolderIcon />}
                  isActive={isActive('/projects')}
                  onClick={() => router.push('/projects')}
                >
                  Projects
                </AppShellNavItem>
                <AppShellNavItem
                  icon={<UsersIcon />}
                  isActive={isActive('/team')}
                  onClick={() => router.push('/team')}
                >
                  Team
                </AppShellNavItem>
              </AppShellNavGroup>
            </AppShellNav>
            <AppShellNavFooter>
              <AppShellNavItem
                icon={<ShieldIcon />}
                isActive={isActive('/security')}
                onClick={() => router.push('/security')}
              >
                Security
              </AppShellNavItem>
              <AppShellNavItem
                icon={<SettingsIcon />}
                isActive={isActive('/settings')}
                onClick={() => router.push('/settings')}
              >
                Settings
              </AppShellNavItem>
              <AppShellNavItem icon={<HelpCircleIcon />}>Help & Support</AppShellNavItem>
            </AppShellNavFooter>
          </AppShellSidebar>
          <AppShellContent padding="none">
            <div className="p-6">
              {children}
            </div>
          </AppShellContent>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  );
}
