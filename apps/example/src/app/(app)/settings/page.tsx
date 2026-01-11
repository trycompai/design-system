'use client';

import {
  Button,
  Input,
  Label,
  PageHeader,
  PageLayout,
  SettingsCard,
  Stack,
} from '@trycompai/design-system';

export default function SettingsGeneralPage() {
  return (
    <PageLayout padding="none" container={false}>
      <PageHeader title="General Settings" />

      <Stack gap="6">
        <SettingsCard
          title="Organization Name"
          description="This is your organization's display name."
          hint="Please use 32 characters at maximum."
          action={<Button>Save</Button>}
        >
          <Input defaultValue="Acme Corp" />
        </SettingsCard>

        <SettingsCard
          title="Organization URL"
          description="Your organization's unique URL on the platform."
          hint="Only lowercase letters, numbers, and hyphens allowed."
          action={<Button>Save</Button>}
        >
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">comp.ai/</span>
            <Input defaultValue="acme-corp" />
          </div>
        </SettingsCard>

        <SettingsCard
          title="Support Email"
          description="Where should we send important notifications?"
          action={<Button>Save</Button>}
        >
          <Stack gap="4">
            <Stack gap="2">
              <Label htmlFor="supportEmail">Email Address</Label>
              <Input id="supportEmail" type="email" defaultValue="support@acme.com" />
            </Stack>
          </Stack>
        </SettingsCard>

        <SettingsCard
          title="Danger Zone"
          description="Irreversible and destructive actions."
        >
          <div className="flex items-center justify-between py-2">
            <Stack gap="1">
              <span className="text-sm font-medium">Delete Organization</span>
              <span className="text-sm text-muted-foreground">
                Permanently delete your organization and all its data.
              </span>
            </Stack>
            <Button variant="destructive">Delete Organization</Button>
          </div>
        </SettingsCard>
      </Stack>
    </PageLayout>
  );
}
