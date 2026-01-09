import type { Meta, StoryObj } from '@storybook/react-vite';
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
  AppShellUserMenu,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CommandSearch,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Grid,
  Heading,
  HStack,
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageLayout,
  Stack,
  Text,
  ThemeToggle,
  useAppShell,
} from '@trycompai/design-system';
import {
  BellIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  CodeIcon,
  CreditCardIcon,
  HomeIcon,
  KeyIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PanelLeftIcon,
  PieChartIcon,
  SettingsIcon,
  ShieldCheckIcon,
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
      <DropdownMenuGroup>
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="size-4 rounded bg-emerald-500" />
          Personal
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="size-4 rounded bg-blue-500" />
          Acme Corp
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

const LogoIcon = () => (
  <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
    C
  </div>
);

const ProjectSelector = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium hover:bg-background/50 transition-colors"
      >
        <div className="size-2 rounded-full bg-blue-500" />
        Acme Corp
        <ChevronDownIcon className="size-3 text-muted-foreground" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" style={{ minWidth: '220px' }}>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="size-2 rounded-full bg-blue-500" />
          <span className="flex-1">Acme Corp</span>
          <span className="text-xs text-muted-foreground">Pro</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="size-2 rounded-full bg-purple-500" />
          <span className="flex-1">Side Project</span>
          <span className="text-xs text-muted-foreground">Free</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="size-2 rounded-full bg-orange-500" />
          <span className="flex-1">Personal</span>
          <span className="text-xs text-muted-foreground">Free</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <KeyIcon className="size-4" />
        Create new project
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Logo = () => (
  <HStack gap="sm" align="center">
    <LogoIcon />
    <ProjectSelector />
  </HStack>
);

const searchGroups = [
  {
    id: 'pages',
    label: 'Pages',
    items: [
      { id: 'overview', label: 'Overview', icon: <HomeIcon className="size-4" />, shortcut: '⌘1' },
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon className="size-4" />, shortcut: '⌘2' },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon className="size-4" />, shortcut: '⌘,' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { id: 'new-project', label: 'Create new project', icon: <KeyIcon className="size-4" /> },
      { id: 'invite-team', label: 'Invite team member', icon: <UsersIcon className="size-4" /> },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    items: [
      { id: 'docs', label: 'Documentation', icon: <BookOpenIcon className="size-4" /> },
      { id: 'api', label: 'API Reference', icon: <CodeIcon className="size-4" /> },
    ],
  },
];

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

const RailSidebarNav = () => (
  <>
    <AppShellNav>
      <AppShellNavGroup label="HR">
        <AppShellNavItem icon={<UsersIcon />} isActive>Employees</AppShellNavItem>
        <AppShellNavItem icon={<BriefcaseIcon />}>Recruiting</AppShellNavItem>
        <AppShellNavItem icon={<BookOpenIcon />}>Learning</AppShellNavItem>
      </AppShellNavGroup>
      <AppShellNavGroup label="Manage">
        <AppShellNavItem icon={<SettingsIcon />}>Settings</AppShellNavItem>
      </AppShellNavGroup>
    </AppShellNav>
    <AppShellNavFooter>
      <AppShellNavItem icon={<BookOpenIcon />}>Help</AppShellNavItem>
    </AppShellNavFooter>
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
      <DropdownMenuGroup>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <div className="flex items-center justify-between px-2 py-1.5">
          <Text size="sm">Theme</Text>
          <ThemeToggle size="sm" />
        </div>
      </DropdownMenuGroup>
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
        centerContent={<CommandSearch groups={searchGroups} placeholder="Search..." />}
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
        <AppShellRail>
          <AppShellRailItem icon={<ShieldCheckIcon />} label="Compliance" isActive />
          <AppShellRailItem icon={<KeyIcon />} label="Cybersecurity" />
          <AppShellRailItem icon={<LayoutDashboardIcon />} label="App Browser" />
        </AppShellRail>
        <AppShellMain>
          <AppShellSidebar collapsible>
            <SidebarNav />
          </AppShellSidebar>
          <AppShellContent>
            <PageHeader title="Compliance">
              <PageHeaderDescription>Monitor and manage your compliance posture.</PageHeaderDescription>
              <PageHeaderActions>
                <Button>Run Assessment</Button>
              </PageHeaderActions>
            </PageHeader>
            <Text>Use <strong>⌘\</strong> to toggle the sidebar.</Text>
          </AppShellContent>
        </AppShellMain>
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
        <AppShellMain>
          <AppShellSidebar collapsible>
            <SidebarNav />
          </AppShellSidebar>
          <AppShellContent>
            <Heading level="1">Collapsible Sidebar</Heading>
            <Text variant="muted">
              Click the sidebar toggle in the navbar to show/hide the sidebar.
            </Text>
          </AppShellContent>
        </AppShellMain>
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

export const WithRail: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<Logo />}
        centerContent={<CommandSearch groups={searchGroups} placeholder="Search..." />}
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
        <AppShellRail>
          <AppShellRailItem icon={<UsersIcon />} label="HR" isActive />
          <AppShellRailItem icon={<CreditCardIcon />} label="Finance" />
          <AppShellRailItem icon={<ShieldCheckIcon />} label="Compliance" />
          <AppShellRailItem icon={<PieChartIcon />} label="Analytics" />
          <AppShellRailItem icon={<SettingsIcon />} label="Settings" />
        </AppShellRail>
        <AppShellMain>
          <AppShellSidebar collapsible>
            <RailSidebarNav />
          </AppShellSidebar>
          <AppShellContent>
            <PageHeader title="Employees">
              <PageHeaderDescription>Manage your team members and their information.</PageHeaderDescription>
              <PageHeaderActions>
                <Button>Add Employee</Button>
              </PageHeaderActions>
            </PageHeader>
            <Text>Rippling-style layout with app rail on the left. Use <strong>⌘\</strong> to toggle the sidebar.</Text>
          </AppShellContent>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  ),
};

export const WithPageLayoutContainer: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<Logo />}
        endContent={<UserMenuDemo />}
      />
      <AppShellBody>
        <AppShellSidebar>
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent padding="none">
          <PageLayout padding="default">
            <PageHeader title="Settings">
              <PageHeaderDescription>
                Content is centered with a max-width container.
              </PageHeaderDescription>
              <PageHeaderActions>
                <Button>Save Changes</Button>
              </PageHeaderActions>
            </PageHeader>
            <Stack gap="4">
              <Card>
                <CardContent>
                  <Stack gap="xs">
                    <Heading level="3">General Settings</Heading>
                    <Text variant="muted">Configure your account preferences.</Text>
                  </Stack>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Stack gap="xs">
                    <Heading level="3">Notifications</Heading>
                    <Text variant="muted">Manage how you receive notifications.</Text>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </PageLayout>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};

export const WithPageLayoutFullWidth: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<Logo />}
        endContent={<UserMenuDemo />}
      />
      <AppShellBody>
        <AppShellSidebar>
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent padding="none">
          <PageLayout container={false} padding="default">
            <PageHeader title="Dashboard">
              <PageHeaderDescription>
                Full-width layout for data-heavy pages like dashboards.
              </PageHeaderDescription>
            </PageHeader>
            <Grid cols="4" gap="4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i}>
                  <CardContent>
                    <Stack align="center" gap="xs">
                      <Text weight="medium">Metric {i}</Text>
                      <Text variant="muted">Value</Text>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </PageLayout>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};

export const MutedSidebar: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<Logo />}
        endContent={<UserMenuDemo />}
      />
      <AppShellBody>
        <AppShellSidebar variant="muted">
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent>
          <PageHeader title="Muted Sidebar">
            <PageHeaderDescription>
              Sidebar with muted background - active items use white background for contrast.
            </PageHeaderDescription>
          </PageHeader>
          <Text>The muted variant provides subtle contrast between sidebar and content.</Text>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};

export const PrimarySidebar: Story = {
  render: () => (
    <AppShell>
      <AppShellNavbar
        showSidebarToggle={false}
        startContent={<Logo />}
        endContent={<UserMenuDemo />}
      />
      <AppShellBody>
        <AppShellSidebar variant="primary">
          <SidebarNav />
        </AppShellSidebar>
        <AppShellContent>
          <PageHeader title="Primary Sidebar">
            <PageHeaderDescription>
              Sidebar with primary (emerald) background - nav items use inverted colors.
            </PageHeaderDescription>
          </PageHeader>
          <Text>The primary variant creates a bold, branded look.</Text>
        </AppShellContent>
      </AppShellBody>
    </AppShell>
  ),
};
