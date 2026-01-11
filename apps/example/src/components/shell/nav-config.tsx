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
  icon: ReactNode;
}

export interface NavGroup {
  id: string;
  label?: string;
  items: NavItem[];
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
  groups: NavGroup[];
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
    groups: [
      {
        id: 'getting-started',
        label: 'Getting started',
        items: [
          { id: 'overview', label: 'Overview', href: '/', icon: <Home /> },
          { id: 'quickstart', label: 'Quickstart', href: '#', icon: <Book /> },
        ],
      },
      {
        id: 'compliance',
        label: 'Compliance',
        items: [
          { id: 'policies', label: 'Policies', href: '/policies', icon: <Document /> },
          { id: 'controls', label: 'Controls', href: '/controls', icon: <TaskComplete /> },
          { id: 'risks', label: 'Risks', href: '/risks', icon: <Warning /> },
          { id: 'vendors', label: 'Vendors', href: '/vendors', icon: <Building /> },
          { id: 'integrations', label: 'Integrations', href: '#', icon: <Plug /> },
        ],
      },
    ],
    footer: [
      { id: 'settings', label: 'Settings', href: '/settings', icon: <Settings /> },
    ],
  },
  cybersecurity: {
    title: 'Cybersecurity',
    icon: <Password />,
    groups: [
      {
        id: 'security',
        label: 'Security',
        items: [
          { id: 'dashboard', label: 'Dashboard', href: '/cybersecurity', icon: <Dashboard /> },
          { id: 'vulnerabilities', label: 'Vulnerabilities', href: '#', icon: <Warning /> },
          { id: 'assets', label: 'Assets', href: '#', icon: <Building /> },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Help', href: '#', icon: <Help /> },
    ],
  },
  analytics: {
    title: 'Analytics',
    icon: <ChartPie />,
    groups: [
      {
        id: 'reports',
        label: 'Reports',
        items: [
          { id: 'dashboard', label: 'Dashboard', href: '/analytics', icon: <Dashboard /> },
          { id: 'compliance-reports', label: 'Compliance Reports', href: '#', icon: <Document /> },
          { id: 'audit-logs', label: 'Audit Logs', href: '#', icon: <TaskComplete /> },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Help', href: '#', icon: <Help /> },
    ],
  },
  settings: {
    title: 'Settings',
    icon: <Settings />,
    groups: [
      {
        id: 'organization',
        label: 'Organization',
        items: [
          { id: 'general', label: 'General', href: '/settings', icon: <Settings /> },
          { id: 'team', label: 'Team', href: '#', icon: <UserMultiple /> },
          { id: 'billing', label: 'Billing', href: '#', icon: <Wallet /> },
        ],
      },
      {
        id: 'account',
        label: 'Account',
        items: [
          { id: 'profile', label: 'Profile', href: '#', icon: <UserMultiple /> },
          { id: 'security', label: 'Security', href: '/settings/security', icon: <Password /> },
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
