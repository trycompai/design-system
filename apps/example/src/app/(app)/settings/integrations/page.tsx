'use client';

import {
  PageLayout,
  PageHeader,
  PageHeaderDescription,
} from '@trycompai/design-system';

export default function IntegrationsPage() {
  // Permanently loading state to demonstrate PageLayout skeleton
  return (
    <PageLayout loading padding="default">
      <PageHeader title="Integrations">
        <PageHeaderDescription>
          Connect your favorite tools and services
        </PageHeaderDescription>
      </PageHeader>
    </PageLayout>
  );
}
