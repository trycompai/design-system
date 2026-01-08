import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Stack, VStack, HStack, Badge } from '@trycompai/design-system';

const meta = {
  title: 'Atoms/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded bg-primary text-primary-foreground">
    {children}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByText(/[1-3]/);
    await expect(items).toHaveLength(3);
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'row',
  },
  render: (args) => (
    <Stack {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  ),
};

export const VStackExample: Story = {
  name: 'VStack',
  render: () => (
    <VStack gap="md">
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByText(/[1-3]/);
    await expect(items).toHaveLength(3);
  },
};

export const HStackExample: Story = {
  name: 'HStack',
  render: () => (
    <HStack gap="md">
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </HStack>
  ),
};

export const GapVariations: Story = {
  render: () => (
    <VStack gap="xl">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">gap="none"</p>
        <HStack gap="none">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">gap="xs"</p>
        <HStack gap="xs">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">gap="sm"</p>
        <HStack gap="sm">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">gap="md" (default)</p>
        <HStack gap="md">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">gap="lg"</p>
        <HStack gap="lg">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">gap="xl"</p>
        <HStack gap="xl">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </HStack>
      </div>
    </VStack>
  ),
};

export const AlignmentVariations: Story = {
  render: () => (
    <HStack gap="xl">
      <VStack gap="sm">
        <p className="text-sm text-muted-foreground">align="start"</p>
        <HStack align="start" gap="sm">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            S
          </div>
          <div className="flex h-12 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            M
          </div>
          <div className="flex h-16 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            L
          </div>
        </HStack>
      </VStack>
      <VStack gap="sm">
        <p className="text-sm text-muted-foreground">align="center"</p>
        <HStack align="center" gap="sm">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            S
          </div>
          <div className="flex h-12 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            M
          </div>
          <div className="flex h-16 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            L
          </div>
        </HStack>
      </VStack>
      <VStack gap="sm">
        <p className="text-sm text-muted-foreground">align="end"</p>
        <HStack align="end" gap="sm">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            S
          </div>
          <div className="flex h-12 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            M
          </div>
          <div className="flex h-16 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            L
          </div>
        </HStack>
      </VStack>
    </HStack>
  ),
};

export const JustifyVariations: Story = {
  render: () => (
    <VStack gap="lg">
      <VStack gap="xs">
        <p className="text-sm text-muted-foreground">justify="start"</p>
        <div className="w-80 rounded border border-border p-2">
          <HStack justify="start" gap="sm">
            <Box>1</Box>
            <Box>2</Box>
          </HStack>
        </div>
      </VStack>
      <VStack gap="xs">
        <p className="text-sm text-muted-foreground">justify="center"</p>
        <div className="w-80 rounded border border-border p-2">
          <HStack justify="center" gap="sm">
            <Box>1</Box>
            <Box>2</Box>
          </HStack>
        </div>
      </VStack>
      <VStack gap="xs">
        <p className="text-sm text-muted-foreground">justify="end"</p>
        <div className="w-80 rounded border border-border p-2">
          <HStack justify="end" gap="sm">
            <Box>1</Box>
            <Box>2</Box>
          </HStack>
        </div>
      </VStack>
      <VStack gap="xs">
        <p className="text-sm text-muted-foreground">justify="between"</p>
        <div className="w-80 rounded border border-border p-2">
          <HStack justify="between" gap="sm">
            <Box>1</Box>
            <Box>2</Box>
          </HStack>
        </div>
      </VStack>
    </VStack>
  ),
};

export const NestedStacks: Story = {
  render: () => (
    <VStack gap="lg">
      <HStack gap="md">
        <VStack gap="sm">
          <Box>1</Box>
          <Box>2</Box>
        </VStack>
        <VStack gap="sm">
          <Box>3</Box>
          <Box>4</Box>
        </VStack>
      </HStack>
      <HStack gap="md">
        <Box>5</Box>
        <Box>6</Box>
        <Box>7</Box>
      </HStack>
    </VStack>
  ),
};

export const Wrapping: Story = {
  render: () => (
    <div className="w-48">
      <HStack gap="sm" wrap="wrap">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
      </HStack>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-border p-4">
      <VStack gap="md">
        <HStack justify="between" align="center">
          <span className="font-semibold">User Profile</span>
          <Badge variant="secondary">Pro</Badge>
        </HStack>
        <VStack gap="xs">
          <span className="text-sm text-muted-foreground">Email</span>
          <span>user@example.com</span>
        </VStack>
        <VStack gap="xs">
          <span className="text-sm text-muted-foreground">Member since</span>
          <span>January 2024</span>
        </VStack>
        <HStack gap="sm" justify="end">
          <Badge variant="outline">Settings</Badge>
          <Badge>Edit</Badge>
        </HStack>
      </VStack>
    </div>
  ),
};

export const AsNavigation: Story = {
  render: () => (
    <Stack as="nav" direction="row" gap="lg" align="center">
      <span className="font-semibold">Logo</span>
      <HStack as="ul" gap="md">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </HStack>
    </Stack>
  ),
};
