import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AppShell,
  AppShellBody,
  AppShellContent,
  AppShellNav,
  AppShellNavbar,
  AppShellNavFooter,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellSearch,
  AppShellSidebar,
  AppShellUserMenu,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Heading,
  HStack,
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  Text,
  useAppShell,
} from '@trycompai/design-system';
import {
  BellIcon,
  BookOpenIcon,
  ChevronDownIcon,
  CodeIcon,
  HomeIcon,
  KeyIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PanelLeftIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const OrgSelector = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="sm">
        <HStack gap="xs" align="center">
          <div className="size-5 rounded bg-emerald-500" />
          <Text size="sm" weight="medium">Personal</Text>
          <ChevronDownIcon className="size-3" />
        </HStack>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuLabel>Organizations</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <div className="size-4 rounded bg-emerald-500" />
        Personal
      </DropdownMenuItem>
      <DropdownMenuItem>
        <div className="size-4 rounded bg-blue-500" />
        Acme Corp
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Logo = () => (
  <HStack gap="sm" align="center">
    <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
      C
    </div>
    <Text weight="semibold" size="sm">Comp</Text>
  </HStack>
);

const SidebarNav = () => {
  const { toggleSidebar } = useAppShell();
  return (
    <>
      <AppShellNav>
        <AppShellNavGroup label="Getting started">
          <AppShellNavItem icon={<HomeIcon />} isActive>Overview</AppShellNavItem>
          <AppShellNavItem icon={<BookOpenIcon />}>Quickstart</AppShellNavItem>
        </AppShellNavGroup>
        <AppShellNavGroup label="Build">
          <AppShellNavItem icon={<LayoutDashboardIcon />}>Dashboard</AppShellNavItem>
          <AppShellNavItem icon={<KeyIcon />}>API Keys</AppShellNavItem>
          <AppShellNavItem icon={<UsersIcon />}>Team</AppShellNavItem>
          <AppShellNavItem icon={<SettingsIcon />}>Settings</AppShellNavItem>
        </AppShellNavGroup>
      </AppShellNav>
      <AppShellNavFooter>
        <AppShellNavItem icon={<BookOpenIcon />}>Docs</AppShellNavItem>
        <AppShellNavItem icon={<CodeIcon />}>API reference</AppShellNavItem>
        <AppShellNavItem icon={<PanelLeftIcon />} onClick={toggleSidebar}>Collapse</AppShellNavItem>
      </AppShellNavFooter>
    </>
  );
};

const UserMenuDemo = () => (
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
      <DropdownMenuSeparator />
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

export const Default: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<Logo />}
        centerContent={<AppShellSearch />}
        endContent={
          <AppShellUserMenu>
            <Button variant="ghost" size="icon-sm">
              <BellIcon />
            </Button>
            <UserMenuDemo />
          </AppShellUserMenu>
        }
      />
      <AppShellBody>
        <AppShellSidebar>
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent>
          <PageHeader title="Dashboard">
            <PageHeaderDescription>Welcome back! Here&apos;s an overview of your account.</PageHeaderDescription>
            <PageHeaderActions>
              <Button>Create New</Button>
            </PageHeaderActions>
          </PageHeader>
          <Text>Your main content goes here.</Text>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};

export const CollapsibleSidebar: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<OrgSelector />}
        endContent={
          <AppShellUserMenu>
            <UserMenuDemo />
          </AppShellUserMenu>
        }
      />
      <AppShellBody>
        <AppShellSidebar collapsible>
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent>
          <Heading level="1">Collapsible Sidebar</Heading>
          <Text variant="muted">
            Click the sidebar toggle in the navbar to show/hide the sidebar.
          </Text>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={
          <HStack gap="xs" align="center">
            <OrgSelector />
            <Text variant="muted" size="sm">/</Text>
            <Text size="sm">Dashboard</Text>
            <Text variant="muted" size="sm">/</Text>
            <Text size="sm">Settings</Text>
          </HStack>
        }
        endContent={
          <AppShellUserMenu>
            <Badge variant="secondary">Pro</Badge>
            <UserMenuDemo />
          </AppShellUserMenu>
        }
      />
      <AppShellBody>
        <AppShellSidebar>
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent>
          <Heading level="1">With Breadcrumbs</Heading>
          <Text variant="muted">Using startContent to add breadcrumbs navigation.</Text>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};

export const MinimalNavbar: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar showSidebarToggle={false} endContent={<UserMenuDemo />} />
      <AppShellBody>
        <AppShellSidebar>
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent>
          <Heading level="1">Minimal Navbar</Heading>
          <Text variant="muted">Just the sidebar toggle and user menu.</Text>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<OrgSelector />}
        endContent={<UserMenuDemo />}
      />
      <AppShellBody>
        <AppShellSidebar>
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent padding="none">
          <div className="bg-muted h-full p-6">
            <Heading level="1">No Content Padding</Heading>
            <Text variant="muted">Content area has no padding for full-width layouts.</Text>
          </div>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};

export const WideSidebar: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<OrgSelector />}
        endContent={<UserMenuDemo />}
      />
      <AppShellBody>
        <AppShellSidebar width="lg">
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent>
          <Heading level="1">Wide Sidebar</Heading>
          <Text variant="muted">Using width="lg" for a wider sidebar.</Text>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};
