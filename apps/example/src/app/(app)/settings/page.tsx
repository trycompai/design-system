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
  Text,
} from '@trycompai/design-system';

export default function SettingsProfilePage() {
  return (
    <Stack gap="6">
      <Stack gap="1">
        <Heading level="1">Profile</Heading>
        <Text variant="muted">Manage your profile information.</Text>
      </Stack>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
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
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                defaultValue="john@example.com"
              />
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
    </Stack>
  );
}
