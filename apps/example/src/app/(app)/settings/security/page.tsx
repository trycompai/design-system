'use client';

import {
  Badge,
  Button,
  HStack,
  Input,
  Label,
  PageHeader,
  PageLayout,
  Section,
  Stack,
  Text,
} from '@trycompai/design-system';
import { Mobile, Password, Security } from '@carbon/icons-react';

export default function SettingsSecurityPage() {
  return (
    <PageLayout>
      <PageHeader title="Security" />

      <Stack gap="6">
        <Section
          title="Security Status"
          description="Your account security is strong."
        >
          <HStack gap="md" align="center">
            <Security size={20} className="text-green-600" />
            <div className="flex-1">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <Badge variant="default">85%</Badge>
          </HStack>
        </Section>

        <Section
          title="Change Password"
          description="Update your password to keep your account secure."
        >
          <Stack gap="4">
            <Stack gap="2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </Stack>
            <Stack gap="2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </Stack>
            <Stack gap="2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </Stack>
            <HStack justify="end">
              <Button>Update Password</Button>
            </HStack>
          </Stack>
        </Section>

        <Section
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account."
        >
          <Stack gap="4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Mobile size={20} className="text-primary" />
              </div>
              <Stack gap="1">
                <HStack gap="sm" align="center">
                  <Text weight="medium">Authenticator App</Text>
                  <Badge variant="default">Enabled</Badge>
                </HStack>
                <Text variant="muted" size="sm">
                  Use an authenticator app to generate codes.
                </Text>
              </Stack>
              <div className="ml-auto">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <Password size={20} className="text-muted-foreground" />
              </div>
              <Stack gap="1">
                <Text weight="medium">Security Keys</Text>
                <Text variant="muted" size="sm">
                  Use a physical security key for authentication.
                </Text>
              </Stack>
              <div className="ml-auto">
                <Button variant="outline" size="sm">
                  Setup
                </Button>
              </div>
            </div>
          </Stack>
        </Section>
      </Stack>
    </PageLayout>
  );
}
