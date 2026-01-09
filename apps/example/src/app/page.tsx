import { AppLayout } from '@/components/app-layout';
import { DashboardPage } from '@/components/pages/dashboard';

export default function Home() {
  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  );
}
