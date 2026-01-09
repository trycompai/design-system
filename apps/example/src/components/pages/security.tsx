'use client';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Stack,
  Text,
} from '@trycompai/design-system';
import { ShieldCheckIcon, KeyIcon, SmartphoneIcon, GlobeIcon, AlertTriangleIcon } from 'lucide-react';

const securityItems = [
  {
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account',
    icon: SmartphoneIcon,
    enabled: true,
    action: 'Manage',
  },
  {
    title: 'Password',
    description: 'Last changed 30 days ago',
    icon: KeyIcon,
    enabled: true,
    action: 'Change',
  },
  {
    title: 'Login Sessions',
    description: '3 active sessions',
    icon: GlobeIcon,
    enabled: true,
    action: 'View All',
  },
];

const recentActivity = [
  { action: 'Password changed', location: 'San Francisco, CA', time: '30 days ago', suspicious: false },
  { action: 'New login', location: 'San Francisco, CA', time: '2 hours ago', suspicious: false },
  { action: 'New login', location: 'New York, NY', time: '1 day ago', suspicious: true },
  { action: 'API key created', location: 'San Francisco, CA', time: '5 days ago', suspicious: false },
];

export function SecurityPage() {
  return (
    <Stack gap="6">
      <Stack gap="1">
        <Heading level="1">Security</Heading>
        <Text variant="muted">Protect your account with these security features.</Text>
      </Stack>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="size-5 text-green-600" />
            <CardTitle>Security Status</CardTitle>
          </div>
          <CardDescription>Your account security score is excellent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
            <Badge variant="default">90%</Badge>
          </div>
        </CardContent>
      </Card>

      <div>
        <Heading level="3">Security Settings</Heading>
        <div className="grid gap-4 mt-4">
          {securityItems.map((item) => (
            <Card key={item.title}>
              <CardContent>
                <div className="flex items-center gap-4 pt-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                  </div>
                  <Stack gap="1">
                    <div className="flex items-center gap-2">
                      <Text weight="medium">{item.title}</Text>
                      {item.enabled && <Badge variant="default">Enabled</Badge>}
                    </div>
                    <Text variant="muted" size="sm">
                      {item.description}
                    </Text>
                  </Stack>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm">
                      {item.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Heading level="3">Recent Security Activity</Heading>
        <Card>
          <CardContent>
            <Stack gap="4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between pt-4 first:pt-6">
                  <div className="flex items-center gap-3">
                    {activity.suspicious && (
                      <AlertTriangleIcon className="size-4 text-yellow-600" />
                    )}
                    <Stack gap="1">
                      <div className="flex items-center gap-2">
                        <Text weight="medium">{activity.action}</Text>
                        {activity.suspicious && (
                          <Badge variant="outline">Review</Badge>
                        )}
                      </div>
                      <Text variant="muted" size="sm">
                        {activity.location}
                      </Text>
                    </Stack>
                  </div>
                  <Text variant="muted" size="sm">
                    {activity.time}
                  </Text>
                </div>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </div>
    </Stack>
  );
}
