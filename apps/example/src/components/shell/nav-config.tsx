import {
  AlertTriangleIcon,
  BookOpenIcon,
  BuildingIcon,
  ClipboardCheckIcon,
  CreditCardIcon,
  FileTextIcon,
  HelpCircleIcon,
  HomeIcon,
  KeyIcon,
  LayoutDashboardIcon,
  PieChartIcon,
  PlugIcon,
  SettingsIcon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react';
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
    icon: <ShieldCheckIcon />,
    activePaths: ['/', '/policies', '/controls', '/risks', '/vendors', '/integrations'],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    href: '/cybersecurity',
    icon: <KeyIcon />,
    activePaths: ['/cybersecurity'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: <PieChartIcon />,
    activePaths: ['/analytics'],
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
    activePaths: ['/settings'],
  },
];

// Sidebar configurations per section
export const sidebarConfigs: Record<string, SidebarConfig> = {
  compliance: {
    title: 'Compliance',
    icon: <ShieldCheckIcon />,
    groups: [
      {
        id: 'getting-started',
        label: 'Getting started',
        items: [
          { id: 'overview', label: 'Overview', href: '/', icon: <HomeIcon /> },
          { id: 'quickstart', label: 'Quickstart', href: '/quickstart', icon: <BookOpenIcon /> },
        ],
      },
      {
        id: 'compliance',
        label: 'Compliance',
        items: [
          { id: 'policies', label: 'Policies', href: '/policies', icon: <FileTextIcon /> },
          { id: 'controls', label: 'Controls', href: '/controls', icon: <ClipboardCheckIcon /> },
          { id: 'risks', label: 'Risks', href: '/risks', icon: <AlertTriangleIcon /> },
          { id: 'vendors', label: 'Vendors', href: '/vendors', icon: <BuildingIcon /> },
          { id: 'integrations', label: 'Integrations', href: '/integrations', icon: <PlugIcon /> },
        ],
      },
    ],
    footer: [
      { id: 'settings', label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
    ],
  },
  cybersecurity: {
    title: 'Cybersecurity',
    icon: <KeyIcon />,
    groups: [
      {
        id: 'security',
        label: 'Security',
        items: [
          { id: 'dashboard', label: 'Dashboard', href: '/cybersecurity', icon: <LayoutDashboardIcon /> },
          { id: 'vulnerabilities', label: 'Vulnerabilities', href: '/cybersecurity/vulnerabilities', icon: <AlertTriangleIcon /> },
          { id: 'assets', label: 'Assets', href: '/cybersecurity/assets', icon: <BuildingIcon /> },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Help', href: '#', icon: <HelpCircleIcon /> },
    ],
  },
  analytics: {
    title: 'Analytics',
    icon: <PieChartIcon />,
    groups: [
      {
        id: 'reports',
        label: 'Reports',
        items: [
          { id: 'dashboard', label: 'Dashboard', href: '/analytics', icon: <LayoutDashboardIcon /> },
          { id: 'compliance-reports', label: 'Compliance Reports', href: '/analytics/compliance', icon: <FileTextIcon /> },
          { id: 'audit-logs', label: 'Audit Logs', href: '/analytics/audit', icon: <ClipboardCheckIcon /> },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Help', href: '#', icon: <HelpCircleIcon /> },
    ],
  },
  settings: {
    title: 'Settings',
    icon: <SettingsIcon />,
    groups: [
      {
        id: 'organization',
        label: 'Organization',
        items: [
          { id: 'general', label: 'General', href: '/settings', icon: <SettingsIcon /> },
          { id: 'team', label: 'Team', href: '/settings/team', icon: <UsersIcon /> },
          { id: 'billing', label: 'Billing', href: '/settings/billing', icon: <CreditCardIcon /> },
        ],
      },
      {
        id: 'account',
        label: 'Account',
        items: [
          { id: 'profile', label: 'Profile', href: '/settings/profile', icon: <UsersIcon /> },
          { id: 'security', label: 'Security', href: '/settings/security', icon: <KeyIcon /> },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Help & Support', href: '#', icon: <HelpCircleIcon /> },
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
