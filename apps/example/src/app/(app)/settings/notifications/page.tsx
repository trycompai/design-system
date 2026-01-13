'use client';

import {
  HStack,
  PageHeader,
  PageLayout,
  Section,
  Stack,
  Switch,
  Text,
} from '@trycompai/design-system';

export default function SettingsNotificationsPage() {
  return (
    <PageLayout>
      <PageHeader title="Notifications" />

      <Stack gap="6">
        <Section
          title="Email Notifications"
          description="Choose which emails you want to receive."
        >
          <Stack gap="6">
            <HStack justify="between" align="center">
              <Stack gap="1">
                <Text weight="medium">Marketing emails</Text>
                <Text variant="muted" size="sm">
                  Receive emails about new products and features.
                </Text>
              </Stack>
              <Switch />
            </HStack>
            <HStack justify="between" align="center">
              <Stack gap="1">
                <Text weight="medium">Security alerts</Text>
                <Text variant="muted" size="sm">
                  Receive emails about your account security.
                </Text>
              </Stack>
              <Switch defaultChecked />
            </HStack>
            <HStack justify="between" align="center">
              <Stack gap="1">
                <Text weight="medium">Product updates</Text>
                <Text variant="muted" size="sm">
                  Receive emails about product updates and changes.
                </Text>
              </Stack>
              <Switch defaultChecked />
            </HStack>
            <HStack justify="between" align="center">
              <Stack gap="1">
                <Text weight="medium">Weekly digest</Text>
                <Text variant="muted" size="sm">
                  Get a weekly summary of your activity.
                </Text>
              </Stack>
              <Switch />
            </HStack>
          </Stack>
        </Section>

        <Section
          title="Push Notifications"
          description="Configure push notification settings."
        >
          <Stack gap="6">
            <HStack justify="between" align="center">
              <Stack gap="1">
                <Text weight="medium">Desktop notifications</Text>
                <Text variant="muted" size="sm">
                  Show notifications on your desktop.
                </Text>
              </Stack>
              <Switch defaultChecked />
            </HStack>
            <HStack justify="between" align="center">
              <Stack gap="1">
                <Text weight="medium">Mobile notifications</Text>
                <Text variant="muted" size="sm">
                  Receive push notifications on mobile.
                </Text>
              </Stack>
              <Switch defaultChecked />
            </HStack>
          </Stack>
        </Section>
      </Stack>
    </PageLayout>
  );
}
