'use client';

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Stack,
  Text,
} from '@trycompai/design-system';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, UsersIcon, FolderIcon, ActivityIcon } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: TrendingUpIcon,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180',
    trend: 'up',
    icon: UsersIcon,
  },
  {
    title: 'Projects',
    value: '12',
    change: '+2',
    trend: 'up',
    icon: FolderIcon,
  },
  {
    title: 'Active Tasks',
    value: '573',
    change: '-23',
    trend: 'down',
    icon: ActivityIcon,
  },
];

const recentActivity = [
  { id: 1, action: 'New user signup', user: 'john@example.com', time: '2 minutes ago' },
  { id: 2, action: 'Project created', user: 'sarah@example.com', time: '15 minutes ago' },
  { id: 3, action: 'Task completed', user: 'mike@example.com', time: '1 hour ago' },
  { id: 4, action: 'Comment added', user: 'emma@example.com', time: '2 hours ago' },
  { id: 5, action: 'File uploaded', user: 'alex@example.com', time: '3 hours ago' },
];

export function DashboardPage() {
  return (
    <Stack gap="6">
      <Stack gap="1">
        <Heading level="1">Dashboard</Heading>
        <Text variant="muted">Welcome back! Here&apos;s what&apos;s happening with your projects.</Text>
      </Stack>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>{stat.title}</CardDescription>
                <stat.icon className="size-4 text-muted-foreground" />
              </div>
              <CardTitle>
                <span className="text-2xl font-bold">{stat.value}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm">
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="size-3 text-green-600" />
                ) : (
                  <ArrowDownIcon className="size-3 text-red-600" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <Stack gap="1">
                    <Text>{activity.action}</Text>
                    <Text variant="muted" size="sm">
                      {activity.user}
                    </Text>
                  </Stack>
                  <Text variant="muted" size="sm">
                    {activity.time}
                  </Text>
                </div>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Project health overview</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="4">
              <div className="flex items-center justify-between">
                <Text>Tasks Completed</Text>
                <Badge variant="default">89%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <Text>On Track</Text>
                <Badge variant="secondary">8 projects</Badge>
              </div>
              <div className="flex items-center justify-between">
                <Text>At Risk</Text>
                <Badge variant="outline">2 projects</Badge>
              </div>
              <div className="flex items-center justify-between">
                <Text>Overdue</Text>
                <Badge variant="destructive">1 project</Badge>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </Stack>
  );
}
