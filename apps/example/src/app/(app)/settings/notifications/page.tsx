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
  Switch,
  Text,
} from '@trycompai/design-system';

export default function SettingsNotificationsPage() {
  return (
    <PageLayout>
      <PageHeader title="Notifications" />

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose which emails you want to receive.</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="6">
            <div className="flex items-center justify-between">
              <Stack gap="1">
                <Text weight="medium">Marketing emails</Text>
                <Text variant="muted" size="sm">
                  Receive emails about new products and features.
                </Text>
              </Stack>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Stack gap="1">
                <Text weight="medium">Security alerts</Text>
                <Text variant="muted" size="sm">
                  Receive emails about your account security.
                </Text>
              </Stack>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Stack gap="1">
                <Text weight="medium">Product updates</Text>
                <Text variant="muted" size="sm">
                  Receive emails about product updates and changes.
                </Text>
              </Stack>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Stack gap="1">
                <Text weight="medium">Weekly digest</Text>
                <Text variant="muted" size="sm">
                  Get a weekly summary of your activity.
                </Text>
              </Stack>
              <Switch />
            </div>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Configure push notification settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="6">
            <div className="flex items-center justify-between">
              <Stack gap="1">
                <Text weight="medium">Desktop notifications</Text>
                <Text variant="muted" size="sm">
                  Show notifications on your desktop.
                </Text>
              </Stack>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Stack gap="1">
                <Text weight="medium">Mobile notifications</Text>
                <Text variant="muted" size="sm">
                  Receive push notifications on mobile.
                </Text>
              </Stack>
              <Switch defaultChecked />
            </div>
          </Stack>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
