'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageHeader,
  PageLayout,
  Stack,
  Text,
} from '@trycompai/design-system';
import { ArrowDownRight, ArrowUpRight } from '@carbon/icons-react';

const metrics = [
  { label: 'Page Views', value: '124,892', change: '+12.5%', trend: 'up' },
  { label: 'Unique Visitors', value: '45,234', change: '+8.2%', trend: 'up' },
  { label: 'Bounce Rate', value: '32.1%', change: '-2.3%', trend: 'down' },
  { label: 'Avg. Session', value: '4m 32s', change: '+0.8%', trend: 'up' },
];

const topPages = [
  { page: '/dashboard', views: '23,456', percentage: 18.8 },
  { page: '/projects', views: '18,234', percentage: 14.6 },
  { page: '/settings', views: '12,567', percentage: 10.1 },
  { page: '/team', views: '9,876', percentage: 7.9 },
  { page: '/analytics', views: '8,432', percentage: 6.8 },
];

export default function AnalyticsPage() {
  return (
    <PageLayout>
      <PageHeader title="Analytics" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle>
                <span className="text-2xl font-bold">{metric.value}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm">
                {metric.trend === 'up' ? (
                  <ArrowUpRight size={16} className="text-green-600" />
                ) : (
                  <ArrowDownRight size={16} className="text-green-600" />
                )}
                <span className="text-green-600">{metric.change}</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily visitors over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <Text variant="muted">Chart visualization would go here</Text>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="4">
              {topPages.map((page) => (
                <div key={page.page} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Text weight="medium">{page.page}</Text>
                    <Text variant="muted" size="sm">
                      {page.views} views
                    </Text>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${page.percentage * 5}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right">
                    <Text size="sm" variant="muted">
                      {page.percentage}%
                    </Text>
                  </div>
                </div>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
