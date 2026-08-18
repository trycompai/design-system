import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Stack } from '@trycompai/design-system';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
    shape: {
      control: 'select',
      options: ['default', 'pill'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent',
    variant: 'accent',
  },
};

export const Pill: Story = {
  args: {
    children: 'Pill',
    shape: 'pill',
  },
};

export const CountIndicator: Story = {
  render: () => (
    <Stack direction="row" gap="sm">
      <Badge variant="accent" shape="pill">
        3
      </Badge>
      <Badge variant="accent" shape="pill">
        12
      </Badge>
      <Badge variant="accent" shape="pill">
        New
      </Badge>
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="row" gap="sm" wrap="wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </Stack>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <Stack direction="row" gap="sm" wrap="wrap">
      <Badge shape="default">Default</Badge>
      <Badge shape="pill">Pill</Badge>
      <Badge variant="accent" shape="pill">
        5
      </Badge>
      <Badge variant="destructive" shape="pill">
        Error
      </Badge>
    </Stack>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <Stack direction="row" gap="2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="outline">Draft</Badge>
    </Stack>
  ),
};
