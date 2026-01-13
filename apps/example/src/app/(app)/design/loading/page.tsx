'use client';

import {
  PageLayout,
  PageHeader,
  PageHeaderDescription,
  PageHeaderActions,
  Stack,
  Text,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Skeleton,
} from '@trycompai/design-system';
import * as React from 'react';

export default function LoadingStatePage() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <PageLayout loading={isLoading} padding="default">
      <PageHeader title="Loading States">
        <PageHeaderDescription>
          This page demonstrates the loading state of PageLayout
        </PageHeaderDescription>
        <PageHeaderActions>
          <Button
            variant="outline"
            onClick={() => setIsLoading(!isLoading)}
          >
            {isLoading ? 'Show Content' : 'Show Loading'}
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <Stack gap="lg">
        <Text>
          The PageLayout component supports a <code className="bg-muted px-1.5 py-0.5 rounded text-sm">loading</code> prop
          that displays skeleton placeholders while content is being fetched.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>View your metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="muted" size="sm">Quick access to your dashboard analytics and insights.</Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="muted" size="sm">Create and export detailed compliance reports.</Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure options</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="muted" size="sm">Customize your workspace and preferences.</Text>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manual Skeleton Usage</CardTitle>
            <CardDescription>You can also use Skeleton components directly</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="md">
              <div className="flex items-center gap-3">
                <Skeleton style={{ width: 40, height: 40, borderRadius: '50%' }} />
                <div className="flex-1 space-y-2">
                  <Skeleton style={{ width: '60%', height: 16 }} />
                  <Skeleton style={{ width: '40%', height: 12 }} />
                </div>
              </div>
              <Skeleton style={{ width: '100%', height: 100 }} />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </PageLayout>
  );
}
