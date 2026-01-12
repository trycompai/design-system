'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  PageHeader,
  PageLayout,
  Stack,
  Text,
} from '@trycompai/design-system';

export default function SettingsGeneralPage() {
  return (
    <PageLayout>
      <PageHeader title="General" />

      <Stack gap="6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Name</CardTitle>
            <CardDescription>This is your organization's display name.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input defaultValue="Acme Corp" />
          </CardContent>
          <CardFooter>
            <Text size="sm" variant="muted">Please use 32 characters at maximum.</Text>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organization URL</CardTitle>
            <CardDescription>Your organization's unique URL on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">comp.ai/</span>
              <Input defaultValue="acme-corp" />
            </div>
          </CardContent>
          <CardFooter>
            <Text size="sm" variant="muted">Only lowercase letters, numbers, and hyphens allowed.</Text>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Email</CardTitle>
            <CardDescription>Where should we send important notifications?</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="2">
              <Label htmlFor="supportEmail">Email Address</Label>
              <Input id="supportEmail" type="email" defaultValue="support@acme.com" />
            </Stack>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Stack gap="1">
                <Text weight="medium">Delete Organization</Text>
                <Text size="sm" variant="muted">
                  Permanently delete your organization and all its data.
                </Text>
              </Stack>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </Stack>
    </PageLayout>
  );
}
