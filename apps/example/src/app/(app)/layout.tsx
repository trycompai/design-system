import { AppShellClient } from '@/components/shell';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShellClient>{children}</AppShellClient>;
}
