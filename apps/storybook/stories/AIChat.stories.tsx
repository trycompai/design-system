import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AIChat,
  AIChatBody,
  AIChatFooter,
  AIChatHeader,
  Stack,
  Text,
} from '@trycompai/design-system';
import { MessageCircleIcon, SparklesIcon, XIcon } from 'lucide-react';
import * as React from 'react';

const meta = {
  title: 'Components/AIChat',
  component: AIChat,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the trigger button',
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
      description: 'Visual variant of the trigger button',
    },
    panelSize: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the chat panel',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the panel is open by default',
    },
  },
} satisfies Meta<typeof AIChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="h-[600px] bg-muted p-8 relative">
      <Text>Click the floating button in the bottom-right corner to open the AI chat.</Text>
      <AIChat {...args} />
    </div>
  ),
};

export const OpenByDefault: Story = {
  render: () => (
    <div className="h-[600px] bg-muted p-8 relative">
      <Text>The chat panel is open by default.</Text>
      <AIChat defaultOpen />
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="h-[600px] bg-muted p-8 relative">
      <Text>Smaller trigger button and panel size.</Text>
      <AIChat size="sm" panelSize="sm" defaultOpen />
    </div>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <div className="h-[600px] bg-muted p-8 relative">
      <Text>Larger trigger button and panel size.</Text>
      <AIChat size="lg" panelSize="lg" defaultOpen />
    </div>
  ),
};

export const SecondaryVariant: Story = {
  render: () => (
    <div className="h-[600px] bg-muted p-8 relative">
      <Text>Secondary variant with dark button color.</Text>
      <AIChat variant="secondary" defaultOpen />
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div className="h-[600px] bg-muted p-8 relative">
      <Text>Using compound components for custom content.</Text>
      <AIChat defaultOpen>
        <AIChatHeader>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <SparklesIcon className="size-4" />
            </span>
            <div>
              <div className="font-semibold text-sm">Compliance AI</div>
              <div className="text-xs text-muted-foreground">Your SOC 2 expert</div>
            </div>
          </div>
        </AIChatHeader>
        <AIChatBody>
          <Stack gap="md">
            {/* AI Message */}
            <div className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <SparklesIcon className="size-3.5" />
              </span>
              <div className="flex-1 rounded-2xl rounded-tl-sm bg-muted/50 dark:bg-muted px-3 py-2 text-sm">
                Hello! I'm your SOC 2 compliance assistant. I can help you with:
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>- Understanding control requirements</li>
                  <li>- Writing security policies</li>
                  <li>- Preparing for audits</li>
                </ul>
              </div>
            </div>
            {/* User Message */}
            <div className="flex gap-3 flex-row-reverse">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                JD
              </span>
              <div className="flex-1 rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-3 py-2 text-sm">
                What controls do I need for access management?
              </div>
            </div>
            {/* AI Response */}
            <div className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <SparklesIcon className="size-3.5" />
              </span>
              <div className="flex-1 rounded-2xl rounded-tl-sm bg-muted/50 dark:bg-muted px-3 py-2 text-sm">
                For SOC 2 access management, you'll need controls for:
                <ol className="mt-2 space-y-1 text-muted-foreground">
                  <li>1. User provisioning and deprovisioning</li>
                  <li>2. Role-based access control (RBAC)</li>
                  <li>3. Multi-factor authentication (MFA)</li>
                  <li>4. Periodic access reviews</li>
                </ol>
              </div>
            </div>
          </Stack>
        </AIChatBody>
        <AIChatFooter>
          <div className="flex items-center gap-2 rounded-xl bg-muted/50 dark:bg-muted px-3 py-2">
            <input
              type="text"
              placeholder="Ask about compliance..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
            >
              <MessageCircleIcon className="size-4" />
            </button>
          </div>
        </AIChatFooter>
      </AIChat>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="h-[600px] bg-muted p-8 relative">
        <Stack gap="md">
          <Text>Controlled mode - state managed externally.</Text>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md w-fit"
          >
            {open ? 'Close Chat' : 'Open Chat'}
          </button>
        </Stack>
        <AIChat open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};
