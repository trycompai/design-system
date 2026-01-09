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
  AppShellSidebarHeader,
  AppShellUserMenu,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  Checkbox,
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
  Logo as CompLogo,
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageLayout,
  Progress,
  Stack,
  Text,
  ThemeToggle,
} from '@trycompai/design-system';
import * as React from 'react';
import {
  AlertTriangleIcon,
  BellIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BuildingIcon,
  ChevronDownIcon,
  ClipboardCheckIcon,
  CodeIcon,
  CreditCardIcon,
  FileTextIcon,
  HomeIcon,
  KeyIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PieChartIcon,
  PlugIcon,
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

const ProjectSelector = () => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium hover:bg-background/50 transition-colors"
      >
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

const Logo = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // Check initial state
    setIsDark(document.documentElement.classList.contains('dark'));

    // Watch for changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <HStack gap="xs" align="center">
      <CompLogo style={{ height: 22, width: 'auto' }} variant={isDark ? 'light' : 'dark'} />
      <Text variant="muted" className="pl-3 pr-1">/</Text>
      <ProjectSelector />
    </HStack>
  );
};

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

const SidebarNav = () => (
  <>
    <AppShellSidebarHeader
      icon={<ShieldCheckIcon />}
      title="Compliance"
    />
    <AppShellNav>
      <AppShellNavGroup label="Getting started">
        <AppShellNavItem icon={<HomeIcon />} isActive>Overview</AppShellNavItem>
        <AppShellNavItem icon={<BookOpenIcon />}>Quickstart</AppShellNavItem>
      </AppShellNavGroup>
      <AppShellNavGroup label="Compliance">
        <AppShellNavItem icon={<FileTextIcon />}>Policies</AppShellNavItem>
        <AppShellNavItem icon={<ClipboardCheckIcon />}>Controls</AppShellNavItem>
        <AppShellNavItem icon={<AlertTriangleIcon />}>Risks</AppShellNavItem>
        <AppShellNavItem icon={<BuildingIcon />}>Vendors</AppShellNavItem>
        <AppShellNavItem icon={<PlugIcon />}>Integrations</AppShellNavItem>
      </AppShellNavGroup>
    </AppShellNav>
    <AppShellNavFooter>
      <AppShellNavItem icon={<SettingsIcon />}>Settings</AppShellNavItem>
    </AppShellNavFooter>
  </>
);

const RailSidebarNav = () => (
  <>
    <AppShellSidebarHeader
      icon={<UsersIcon />}
      title="HR"
    />
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

const UserMenuDemo = () => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const handleThemeChange = (dark: boolean) => {
    setIsDark(dark);
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

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
            <ThemeToggle size="sm" isDark={isDark} onChange={handleThemeChange} />
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
};

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
          <AppShellContent padding="none">
            <PageLayout padding="default" container={false}>
              <PageHeader title="Overview">
                <PageHeaderDescription>Track your progress towards SOC 2 compliance.</PageHeaderDescription>
              </PageHeader>

              {/* SOC 2 Progress Section */}
              <Stack gap="md">
                <HStack justify="between" align="center">
                  <Heading level="3">SOC 2 Type II</Heading>
                  <Badge>In Progress</Badge>
                </HStack>
                <Stack gap="sm">
                  <HStack justify="between" align="baseline">
                    <HStack align="baseline" gap="xs">
                      <Text size="lg" weight="semibold">67%</Text>
                      <Text variant="muted" size="sm">complete</Text>
                    </HStack>
                    <Text variant="muted" size="sm">98 of 146 controls</Text>
                  </HStack>
                  <Progress value={67} />
                </Stack>
              </Stack>

              {/* Next Steps Section */}
              <Stack gap="md">
                <Heading level="3">Next steps</Heading>
                <Stack gap="none">
                  <div className="flex items-start gap-3 py-3 border-b border-border/40">
                    <Checkbox />
                    <Stack gap="none">
                      <Text size="sm" weight="medium">Complete security awareness training</Text>
                      <Text variant="muted" size="xs">3 team members haven't completed annual training</Text>
                    </Stack>
                  </div>
                  <div className="flex items-start gap-3 py-3 border-b border-border/40">
                    <Checkbox />
                    <Stack gap="none">
                      <Text size="sm" weight="medium">Review and approve access policies</Text>
                      <Text variant="muted" size="xs">2 policies pending approval from admin</Text>
                    </Stack>
                  </div>
                  <div className="flex items-start gap-3 py-3">
                    <Checkbox />
                    <Stack gap="none">
                      <Text size="sm" weight="medium">Connect your cloud infrastructure</Text>
                      <Text variant="muted" size="xs">AWS and GCP integrations available</Text>
                    </Stack>
                  </div>
                </Stack>
              </Stack>
            </PageLayout>
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

export const WithAIChat: Story = {
  render: () => (
    <AppShell showAIChat>
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
          <AppShellContent padding="none">
            <PageLayout padding="default" container={false}>
              <PageHeader title="AI Assistant">
                <PageHeaderDescription>Click the floating button in the bottom-right to open the AI chat.</PageHeaderDescription>
              </PageHeader>

              <Stack gap="md">
                <Text>
                  This example shows the optional AI chat feature. A floating sparkles button appears in the
                  bottom-right corner. Click it to open a chat panel for AI-powered assistance.
                </Text>
                <Text variant="muted">
                  The AI chat can be customized by passing content to the <code>aiChatContent</code> prop, or
                  it will use a default chat interface.
                </Text>
              </Stack>
            </PageLayout>
          </AppShellContent>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  ),
};
