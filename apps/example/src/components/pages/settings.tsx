'use client';

import {
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
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@trycompai/design-system';

export function SettingsPage() {
  return (
    <Stack gap="6">
      <Stack gap="1">
        <Heading level="1">Settings</Heading>
        <Text variant="muted">Manage your account settings and preferences.</Text>
      </Stack>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Stack gap="2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" defaultValue="John" />
                  </Stack>
                  <Stack gap="2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                  </Stack>
                </div>
                <Stack gap="2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                </Stack>
                <Stack gap="2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about yourself" />
                </Stack>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="6">
                <div className="flex items-center justify-between">
                  <Stack gap="1">
                    <Text weight="medium">Email Notifications</Text>
                    <Text variant="muted" size="sm">
                      Receive email updates about your projects
                    </Text>
                  </Stack>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Stack gap="1">
                    <Text weight="medium">Push Notifications</Text>
                    <Text variant="muted" size="sm">
                      Receive push notifications on your devices
                    </Text>
                  </Stack>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Stack gap="1">
                    <Text weight="medium">Weekly Digest</Text>
                    <Text variant="muted" size="sm">
                      Get a weekly summary of your activity
                    </Text>
                  </Stack>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Stack gap="1">
                    <Text weight="medium">Marketing Emails</Text>
                    <Text variant="muted" size="sm">
                      Receive updates about new features and promotions
                    </Text>
                  </Stack>
                  <Switch />
                </div>
              </Stack>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="6">
                <Stack gap="4">
                  <Heading level="4">Change Password</Heading>
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

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <Stack gap="1">
                      <Text weight="medium">Two-Factor Authentication</Text>
                      <Text variant="muted" size="sm">
                        Add an extra layer of security to your account
                      </Text>
                    </Stack>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Stack>
  );
}
