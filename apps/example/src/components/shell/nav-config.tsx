import {
  BarChart3Icon,
  BellIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  HomeIcon,
  KeyIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
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

// Rail items - top-level app modules
export const railItems: RailItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <HomeIcon />,
    activePaths: ['/', '/analytics'],
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    icon: <FolderIcon />,
    activePaths: ['/projects'],
  },
  {
    id: 'team',
    label: 'Team',
    href: '/team',
    icon: <UsersIcon />,
    activePaths: ['/team'],
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
  home: {
    title: 'Dashboard',
    icon: <HomeIcon />,
    groups: [
      {
        id: 'overview',
        label: 'Overview',
        items: [
          { id: 'dashboard', label: 'Dashboard', href: '/', icon: <HomeIcon /> },
          { id: 'analytics', label: 'Analytics', href: '/analytics', icon: <BarChart3Icon /> },
        ],
      },
    ],
    footer: [
      { id: 'help', label: 'Help & Support', href: '#', icon: <HelpCircleIcon /> },
    ],
  },
  projects: {
    title: 'Projects',
    icon: <FolderIcon />,
    groups: [
      {
        id: 'workspace',
        label: 'Workspace',
        items: [
          { id: 'all-projects', label: 'All Projects', href: '/projects', icon: <FolderIcon /> },
          { id: 'documents', label: 'Documents', href: '/projects/documents', icon: <FileTextIcon /> },
        ],
      },
    ],
    footer: [
      { id: 'settings', label: 'Project Settings', href: '/projects/settings', icon: <SettingsIcon /> },
    ],
  },
  team: {
    title: 'Team',
    icon: <UsersIcon />,
    groups: [
      {
        id: 'people',
        label: 'People',
        items: [
          { id: 'members', label: 'Team Members', href: '/team', icon: <UsersIcon /> },
          { id: 'roles', label: 'Roles & Permissions', href: '/team/roles', icon: <KeyIcon /> },
        ],
      },
    ],
    footer: [
      { id: 'invite', label: 'Invite Members', href: '/team/invite', icon: <UserIcon /> },
    ],
  },
  settings: {
    title: 'Settings',
    icon: <SettingsIcon />,
    groups: [
      {
        id: 'account',
        label: 'Account',
        items: [
          { id: 'profile', label: 'Profile', href: '/settings', icon: <UserIcon /> },
          { id: 'notifications', label: 'Notifications', href: '/settings/notifications', icon: <BellIcon /> },
          { id: 'security', label: 'Security', href: '/settings/security', icon: <ShieldIcon /> },
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
  return 'home';
}

// Helper to get sidebar config from pathname
export function getSidebarConfig(pathname: string): SidebarConfig {
  const activeRail = getActiveRailItem(pathname);
  return sidebarConfigs[activeRail] || sidebarConfigs.home;
}
