'use client';

import {
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

export default function SettingsGeneralPage() {
  return (
    <PageLayout>
      <PageHeader title="General" />

      <Stack gap="6">
        <Section
          title="Organization Name"
          description="This is your organization's display name."
        >
          <Stack gap="3">
            <Input defaultValue="Acme Corp" />
            <HStack justify="between" align="center">
              <Text size="sm" variant="muted">Please use 32 characters at maximum.</Text>
              <Button>Save</Button>
            </HStack>
          </Stack>
        </Section>

        <Section
          title="Organization URL"
          description="Your organization's unique URL on the platform."
        >
          <Stack gap="3">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">comp.ai/</span>
              <Input defaultValue="acme-corp" />
            </div>
            <HStack justify="between" align="center">
              <Text size="sm" variant="muted">Only lowercase letters, numbers, and hyphens allowed.</Text>
              <Button>Save</Button>
            </HStack>
          </Stack>
        </Section>

        <Section
          title="Support Email"
          description="Where should we send important notifications?"
        >
          <Stack gap="3">
            <Stack gap="2">
              <Label htmlFor="supportEmail">Email Address</Label>
              <Input id="supportEmail" type="email" defaultValue="support@acme.com" />
            </Stack>
            <HStack justify="end">
              <Button>Save</Button>
            </HStack>
          </Stack>
        </Section>

        <Section
          title="Danger Zone"
          description="Irreversible and destructive actions."
        >
          <HStack justify="between" align="center">
            <Stack gap="1">
              <Text weight="medium">Delete Organization</Text>
              <Text size="sm" variant="muted">
                Permanently delete your organization and all its data.
              </Text>
            </Stack>
            <Button variant="destructive">Delete</Button>
          </HStack>
        </Section>
      </Stack>
    </PageLayout>
  );
}
