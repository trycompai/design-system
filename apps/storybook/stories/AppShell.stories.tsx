import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AppShell,
  AppShellContent,
  AppShellNavbar,
  AppShellSearch,
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
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderTitle,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  Stack,
  Text,
} from '@trycompai/design-system';
import {
  BellIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
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
  argTypes: {
    sidebarSide: {
      control: 'select',
      options: ['left', 'right'],
    },
    sidebarVariant: {
      control: 'select',
      options: ['sidebar', 'floating', 'inset'],
    },
    sidebarCollapsible: {
      control: 'select',
      options: ['offExamples', 'icon', 'none'],
    },
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarDemo = () => (
  <>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <HomeIcon />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutDashboardIcon />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UsersIcon />
                <span>Team</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </>
);

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
      <AppShell sidebar={<SidebarDemo />}>
        <AppShellNavbar
          showSidebarToggle
          centerContent={<AppShellSearch placeholder="Search..." />}
          endContent={
            <AppShellUserMenu>
              <Button variant="ghost" size="icon-sm">
                <BellIcon />
              </Button>
              <UserMenuDemo />
            </AppShellUserMenu>
          }
        />
        <AppShellContent>
          <PageHeader title="Dashboard">
            <PageHeaderDescription>Welcome back! Here&apos;s an overview of your account.</PageHeaderDescription>
            <PageHeaderActions>
              <Button>Create New</Button>
            </PageHeaderActions>
          </PageHeader>
          <Text>Your main content goes here.</Text>
        </AppShellContent>
      </AppShell>
  ),
};

export const WithFloatingSidebar: Story = {
  render: () => (
    <div className="h-screen">
      <AppShell sidebar={<SidebarDemo />} sidebarVariant="floating">
        <AppShellNavbar
          showSidebarToggle
          centerContent={<AppShellSearch placeholder="Search..." />}
          endContent={
            <AppShellUserMenu>
              <UserMenuDemo />
            </AppShellUserMenu>
          }
        />
        <AppShellContent>
          <Heading level="1">Floating Sidebar Variant</Heading>
          <Text variant="muted">The sidebar floats with rounded corners and shadow.</Text>
        </AppShellContent>
      </AppShell>
    </div>
  ),
};

export const WithInsetSidebar: Story = {
  render: () => (
    <div className="h-screen">
      <AppShell sidebar={<SidebarDemo />} sidebarVariant="inset">
        <AppShellNavbar
          showSidebarToggle
          centerContent={<AppShellSearch placeholder="Search..." />}
          endContent={
            <AppShellUserMenu>
              <UserMenuDemo />
            </AppShellUserMenu>
          }
        />
        <AppShellContent>
          <Heading level="1">Inset Sidebar Variant</Heading>
          <Text variant="muted">The content area has an inset appearance with rounded corners.</Text>
        </AppShellContent>
      </AppShell>
    </div>
  ),
};

export const IconCollapsible: Story = {
  render: () => (
    <div className="h-screen">
      <AppShell sidebar={<SidebarDemo />} sidebarCollapsible="icon">
        <AppShellNavbar
          showSidebarToggle
          centerContent={<AppShellSearch placeholder="Search..." />}
          endContent={
            <AppShellUserMenu>
              <UserMenuDemo />
            </AppShellUserMenu>
          }
        />
        <AppShellContent>
          <Heading level="1">Icon Collapsible</Heading>
          <Text variant="muted">
            Toggle the sidebar to see it collapse to icons only. Use Cmd/Ctrl + B keyboard shortcut.
          </Text>
        </AppShellContent>
      </AppShell>
    </div>
  ),
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <div className="h-screen">
      <AppShell sidebar={<SidebarDemo />}>
        <AppShellNavbar
          showSidebarToggle
          startContent={
            <Stack direction="row" gap="1" align="center">
              <Text variant="muted" size="sm">
                Dashboard
              </Text>
              <Text variant="muted" size="sm">
                /
              </Text>
              <Text size="sm">Settings</Text>
            </Stack>
          }
          endContent={
            <AppShellUserMenu>
              <Badge variant="secondary">Pro</Badge>
              <UserMenuDemo />
            </AppShellUserMenu>
          }
        />
        <AppShellContent>
          <Heading level="1">With Breadcrumbs</Heading>
          <Text variant="muted">Using startContent to add breadcrumbs navigation.</Text>
        </AppShellContent>
      </AppShell>
    </div>
  ),
};

export const MinimalNavbar: Story = {
  render: () => (
    <div className="h-screen">
      <AppShell sidebar={<SidebarDemo />}>
        <AppShellNavbar showSidebarToggle endContent={<UserMenuDemo />} />
        <AppShellContent>
          <Heading level="1">Minimal Navbar</Heading>
          <Text variant="muted">Just the sidebar toggle and user menu.</Text>
        </AppShellContent>
      </AppShell>
    </div>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <div className="h-screen">
      <AppShell sidebar={<SidebarDemo />}>
        <AppShellNavbar
          showSidebarToggle
          centerContent={<AppShellSearch placeholder="Search..." />}
          endContent={<UserMenuDemo />}
        />
        <AppShellContent padding="none">
          <div className="bg-muted h-full">
            <Heading level="1">No Content Padding</Heading>
            <Text variant="muted">Content area has no padding for full-width layouts.</Text>
          </div>
        </AppShellContent>
      </AppShell>
    </div>
  ),
};
