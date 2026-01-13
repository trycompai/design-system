import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitButton, Stack } from '@trycompai/design-system';
import { Add, Download, Share, TrashCan } from '@trycompai/design-system/icons';
import { fn } from 'storybook/test';

const meta = {
  title: 'Molecules/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Save',
    actions: [
      { id: 'save-as', label: 'Save as draft', onClick: fn() },
      { id: 'save-copy', label: 'Save a copy', onClick: fn() },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    children: 'Download',
    iconLeft: <Download size={16} />,
    actions: [
      { id: 'pdf', label: 'Download as PDF', icon: <Download size={16} />, onClick: fn() },
      { id: 'csv', label: 'Download as CSV', icon: <Download size={16} />, onClick: fn() },
      { id: 'share', label: 'Share link', icon: <Share size={16} />, onClick: fn() },
    ],
  },
};

export const WithDestructiveAction: Story = {
  args: {
    children: 'Create',
    iconLeft: <Add size={16} />,
    actions: [
      { id: 'duplicate', label: 'Duplicate', onClick: fn() },
      { id: 'template', label: 'Save as template', onClick: fn(), separator: true },
      { id: 'delete', label: 'Delete', variant: 'destructive', icon: <TrashCan size={16} />, onClick: fn() },
    ],
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap="4" align="start">
      <SplitButton
        variant="default"
        actions={[{ id: 'alt', label: 'Alternative action' }]}
      >
        Default
      </SplitButton>
      <SplitButton
        variant="outline"
        actions={[{ id: 'alt', label: 'Alternative action' }]}
      >
        Outline
      </SplitButton>
      <SplitButton
        variant="secondary"
        actions={[{ id: 'alt', label: 'Alternative action' }]}
      >
        Secondary
      </SplitButton>
      <SplitButton
        variant="destructive"
        actions={[{ id: 'alt', label: 'Alternative action' }]}
      >
        Destructive
      </SplitButton>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="4" align="start">
      <SplitButton
        size="xs"
        actions={[{ id: 'alt', label: 'Alternative' }]}
      >
        Extra Small
      </SplitButton>
      <SplitButton
        size="sm"
        actions={[{ id: 'alt', label: 'Alternative' }]}
      >
        Small
      </SplitButton>
      <SplitButton
        size="default"
        actions={[{ id: 'alt', label: 'Alternative' }]}
      >
        Default
      </SplitButton>
      <SplitButton
        size="lg"
        actions={[{ id: 'alt', label: 'Alternative' }]}
      >
        Large
      </SplitButton>
    </Stack>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Processing',
    loading: true,
    actions: [
      { id: 'cancel', label: 'Cancel' },
    ],
  },
};
