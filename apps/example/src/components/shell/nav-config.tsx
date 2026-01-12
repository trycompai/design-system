import {
  Book,
  Building,
  ChartPie,
  Dashboard,
  Document,
  Help,
  Home,
  Password,
  Plug,
  Security,
  Settings,
  TaskComplete,
  UserMultiple,
  Wallet,
  Warning,
} from '@carbon/icons-react';
import type { ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface NavItemWithChildren {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  children?: NavItem[];
}

export interface RailItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
  /** Which paths should highlight this rail item */
  activePaths: string[];
}

export interface SidebarConfig {
  title: string;
  icon: ReactNode;
  items: NavItemWithChildren[];
  footer?: NavItem[];
}

// Rail items - top-level app modules (compliance product)
export const railItems: RailItem[] = [
  {
    id: 'compliance',
    label: 'Compliance',
    href: '/',
    icon: <Security />,
    activePaths: ['/', '/policies', '/controls', '/risks', '/vendors', '/integrations'],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    href: '/cybersecurity',
    icon: <Password />,
    activePaths: ['/cybersecurity'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: <ChartPie />,
    activePaths: ['/analytics'],
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <Settings />,
    activePaths: ['/settings'],
  },
];

// Sidebar configurations per section
export const sidebarConfigs: Record<string, SidebarConfig> = {
  compliance: {
    title: 'Compliance',
    icon: <Security />,
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <Home />,
        children: [
          { id: 'overview', label: 'Overview', href: '/' },
          { id: 'quickstart', label: 'Quickstart', href: '#' },
        ],
      },
      {
        id: 'policies',
        label: 'Policies',
        icon: <Document />,
        href: '/policies',
      },
      {
        id: 'controls',
        label: 'Controls',
        icon: <TaskComplete />,
        href: '/controls',
      },
      {
        id: 'risks',
        label: 'Risks',
        icon: <Warning />,
        href: '/risks',
      },
      {
        id: 'vendors',
        label: 'Vendors',
        icon: <Building />,
        href: '/vendors',
      },
      {
        id: 'integrations',
        label: 'Integrations',
        icon: <Plug />,
        href: '#',
      },
    ],
    footer: [
      { id: 'settings', label: 'Settings', href: '/settings', icon: <Settings /> },
    ],
  },
  cybersecurity: {
    title: 'Cybersecurity',
    icon: <Password />,
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/cybersecurity', icon: <Dashboard /> },
      { id: 'vulnerabilities', label: 'Vulnerabilities', href: '#', icon: <Warning /> },
      { id: 'assets', label: 'Assets', href: '#', icon: <Building /> },
    ],
    footer: [
      { id: 'help', label: 'Help', href: '#', icon: <Help /> },
    ],
  },
  analytics: {
    title: 'Analytics',
    icon: <ChartPie />,
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/analytics', icon: <Dashboard /> },
      { id: 'compliance-reports', label: 'Compliance Reports', href: '#', icon: <Document /> },
      { id: 'audit-logs', label: 'Audit Logs', href: '#', icon: <TaskComplete /> },
    ],
    footer: [
      { id: 'help', label: 'Help', href: '#', icon: <Help /> },
    ],
  },
  settings: {
    title: 'Settings',
    icon: <Settings />,
    items: [
      {
        id: 'organization',
        label: 'Organization',
        icon: <Building />,
        children: [
          { id: 'general', label: 'General', href: '/settings' },
          { id: 'team', label: 'Team', href: '#' },
          { id: 'billing', label: 'Billing', href: '#' },
        ],
      },
      {
        id: 'account',
        label: 'Account',
        icon: <UserMultiple />,
        children: [
          { id: 'profile', label: 'Profile', href: '#' },
          { id: 'security', label: 'Security', href: '/settings/security' },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Help & Support', href: '#', icon: <Help /> },
    ],
  },
};

// Helper to get active rail item from pathname
export function getActiveRailItem(pathname: string): string {
  for (const item of railItems) {
    if (item.activePaths.some(path =>
      path === '/' ? pathname === '/' : pathname.startsWith(path)
    )) {
      return item.id;
    }
  }
  return 'compliance';
}

// Helper to get sidebar config from pathname
export function getSidebarConfig(pathname: string): SidebarConfig {
  const activeRail = getActiveRailItem(pathname);
  return sidebarConfigs[activeRail] || sidebarConfigs.compliance;
}

// Helper to check if a nav item or any of its children is active
export function isNavItemActive(item: NavItemWithChildren, pathname: string): boolean {
  if (item.href) {
    if (item.href === '/') return pathname === '/';
    return pathname === item.href || pathname.startsWith(item.href + '/');
  }
  if (item.children) {
    return item.children.some(child => {
      if (child.href === '/') return pathname === '/';
      return pathname === child.href || pathname.startsWith(child.href + '/');
    });
  }
  return false;
}
