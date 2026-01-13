'use client';

import { PageHeader, PageLayout } from '@trycompai/design-system';

export default function IntegrationsLoadingPage() {
  // Permanently loading state to debug PageLayout skeleton
  return (
    <PageLayout
      loading
      padding="default"
      header={<PageHeader title="Integrations" />}
    />
  );
}
