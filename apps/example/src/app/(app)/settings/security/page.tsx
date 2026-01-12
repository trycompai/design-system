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
  Input,
  Label,
  Stack,
  Text,
} from '@trycompai/design-system';
import { Mobile, Password, Security } from '@carbon/icons-react';

export default function SettingsSecurityPage() {
  return (
    <Stack gap="6">
      <Stack gap="1">
        <Heading level="1">Security</Heading>
        <Text variant="muted">Manage your security settings and preferences.</Text>
      </Stack>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Security size={20} className="text-green-600" />
            <CardTitle>Security Status</CardTitle>
          </div>
          <CardDescription>Your account security is strong.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <Badge variant="default">85%</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
        <CardContent>
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
            <div className="flex justify-end">
              <Button>Update Password</Button>
            </div>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Mobile size={20} className="text-primary" />
              </div>
              <Stack gap="1">
                <div className="flex items-center gap-2">
                  <Text weight="medium">Authenticator App</Text>
                  <Badge variant="default">Enabled</Badge>
                </div>
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
        </CardContent>
      </Card>
    </Stack>
  );
}
