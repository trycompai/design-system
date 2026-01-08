import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Heading,
  HStack,
  Input,
  PageLayout,
  SettingsCard,
  Stack,
  Text,
} from '@trycompai/design-system';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Settings',
  component: SettingsCard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    title: 'Settings Card',
  },
} satisfies Meta<typeof SettingsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function FullSettingsDemo() {
  const [name, setName] = useState('Mariano Fuentes');
  const [email, setEmail] = useState('mariano@trycomp.ai');

  const nameChanged = name !== 'Mariano Fuentes';
  const emailChanged = email !== 'mariano@trycomp.ai';

  return (
    <PageLayout>
      <Stack gap="6">
        <Heading level="1">General</Heading>

        <SettingsCard
          title="Your Name"
          description="This is your display name on the platform."
          hint="Max 32 characters."
          action={<Button disabled={!nameChanged}>Save Changes</Button>}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </SettingsCard>

        <SettingsCard
          title="Your Email"
          description="This will be the email you use to log in and receive notifications. A confirmation is required for changes."
          hint={<a href="#" className="underline">Manage email preferences</a>}
          action={<Button disabled={!emailChanged}>Save Changes</Button>}
        >
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </SettingsCard>

        <SettingsCard
          title="Your Avatar"
          description="This is your avatar image on your account. Click your avatar to upload a new image."
          hint="Square image recommended. Accepted file types: .png, .jpg. Max file size: 2MB."
          action={<Button disabled>Save changes</Button>}
        >
          <Avatar size="xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>
        </SettingsCard>
      </Stack>
    </PageLayout>
  );
}

export const FullSettingsPage: Story = {
  render: () => <FullSettingsDemo />,
};

function NameSettingDemo() {
  const defaultValue = 'Mariano Fuentes';
  const [value, setValue] = useState(defaultValue);
  const hasChanges = value !== defaultValue;

  return (
    <SettingsCard
      title="Your Name"
      description="This is your display name on the platform."
      hint="Max 32 characters."
      action={<Button disabled={!hasChanges}>Save Changes</Button>}
    >
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </SettingsCard>
  );
}

export const SingleCard: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => <NameSettingDemo />,
};

function EmailSettingDemo() {
  const defaultValue = 'mariano@trycomp.ai';
  const [value, setValue] = useState(defaultValue);
  const hasChanges = value !== defaultValue;

  return (
    <SettingsCard
      title="Your Email"
      description="This will be the email you use to log in and receive notifications. A confirmation is required for changes."
      hint={<a href="#" className="underline">Manage email preferences</a>}
      action={<Button disabled={!hasChanges}>Save Changes</Button>}
    >
      <Input type="email" value={value} onChange={(e) => setValue(e.target.value)} />
    </SettingsCard>
  );
}

export const WithEmail: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => <EmailSettingDemo />,
};

export const WithAvatar: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <SettingsCard
      title="Your Avatar"
      description="This is your avatar image on your account. Click your avatar to upload a new image."
      hint="Square image recommended. Accepted file types: .png, .jpg. Max file size: 2MB."
      action={<Button disabled>Save changes</Button>}
    >
      <Avatar size="xl">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>MF</AvatarFallback>
      </Avatar>
    </SettingsCard>
  ),
};

export const DangerZone: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <SettingsCard
      title="Delete Account"
      description="Permanently delete your account and all associated data. This action cannot be undone."
      action={<Button variant="destructive">Delete Account</Button>}
    >
      <Text size="sm" variant="muted">
        Once you delete your account, there is no going back. Please be certain.
      </Text>
    </SettingsCard>
  ),
};

export const NoFooter: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <SettingsCard
      title="Usage Statistics"
      description="Your current usage for this billing period."
    >
      <Stack gap="2">
        <HStack justify="between">
          <Text size="sm">API Calls</Text>
          <Text size="sm" weight="medium">12,847 / 50,000</Text>
        </HStack>
        <HStack justify="between">
          <Text size="sm">Storage</Text>
          <Text size="sm" weight="medium">2.4 GB / 10 GB</Text>
        </HStack>
      </Stack>
    </SettingsCard>
  ),
};
