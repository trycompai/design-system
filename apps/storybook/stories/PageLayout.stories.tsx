import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  CardHeader,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Grid,
  Heading,
  HStack,
  PageHeader,
  PageLayout,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@trycompai/design-system';

const meta = {
  title: 'Pages/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'center'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg'],
    },
    container: {
      control: 'boolean',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
  args: {
    variant: 'default',
    padding: 'default',
    container: true,
    maxWidth: 'lg',
  },
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'default',
    container: true,
  },
  render: (args) => (
    <PageLayout {...args}>
      <Stack gap="6">
        <Heading level="1">Page Title</Heading>
        <Text variant="muted">
          Content is centered with a max-width container by default. Resize the window to see the
          effect.
        </Text>
        <Card>
          <CardContent>
            <Text>Page content goes here</Text>
          </CardContent>
        </Card>
      </Stack>
    </PageLayout>
  ),
};

export const FullWidth: Story = {
  args: {
    variant: 'default',
    padding: 'default',
    container: false,
  },
  render: (args) => (
    <PageLayout {...args}>
      <Stack gap="6">
        <Heading level="1">Full Width Page</Heading>
        <Text variant="muted">
          This page has no container - content stretches to full width. Useful for dashboards, maps,
          or custom layouts.
        </Text>
        <Grid cols="4" gap="4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent>
                <Stack align="center">
                  <Text>Card {i}</Text>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Stack>
    </PageLayout>
  ),
};

export const Centered: Story = {
  args: {
    variant: 'center',
    padding: 'default',
    container: true,
    maxWidth: 'sm',
  },
  render: (args) => (
    <PageLayout {...args}>
      <Card width="full">
        <CardHeader>
          <Stack align="center" gap="xs">
            <Heading level="2">Sign In</Heading>
            <Text variant="muted">Welcome back! Please sign in to continue.</Text>
          </Stack>
        </CardHeader>
        <CardContent>
          <Stack gap="3">
            <Button width="full">Sign In with Email</Button>
            <Button variant="outline" width="full">
              Continue with Google
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </PageLayout>
  ),
};

export const AuthPage: Story = {
  args: {
    variant: 'center',
    padding: 'lg',
    container: true,
    maxWidth: 'md',
  },
  render: (args) => (
    <PageLayout {...args}>
      <Card width="full">
        <CardHeader>
          <Stack align="center" gap="md">
            <Avatar size="lg">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Stack align="center" gap="xs">
              <Heading level="1">Create an account</Heading>
              <Text variant="muted">Get started with your free account today</Text>
            </Stack>
          </Stack>
        </CardHeader>
        <CardContent>
          <Stack gap="4">
            <Button width="full">Sign up with Email</Button>
            <HStack gap="2" align="center">
              <hr className="flex-1" />
              <Text variant="muted" size="xs">
                Or continue with
              </Text>
              <hr className="flex-1" />
            </HStack>
            <HStack gap="2">
              <Button variant="outline" width="full">
                Google
              </Button>
              <Button variant="outline" width="full">
                GitHub
              </Button>
            </HStack>
          </Stack>
        </CardContent>
      </Card>
    </PageLayout>
  ),
};

export const CustomMaxWidth: Story = {
  args: {
    variant: 'default',
    padding: 'default',
    container: true,
    maxWidth: '2xl',
  },
  render: (args) => (
    <PageLayout {...args}>
      <Stack gap="6">
        <Heading level="1">Wide Container</Heading>
        <Text variant="muted">
          This page uses a wider max-width (1400px) for more content-heavy pages.
        </Text>
        <Grid cols="3" gap="4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent>
                <Stack align="center">
                  <Text>Wide Card {i}</Text>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Stack>
    </PageLayout>
  ),
};

export const WithTabs: Story = {
  args: {
    variant: 'default',
    padding: 'default',
    container: true,
  },
  render: (args) => (
    <PageLayout {...args}>
      <Stack gap="6">
        <PageHeader title="My expenses" />
        <Tabs defaultValue="all">
          <TabsList variant="underline">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="reimbursements">Reimbursements</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>There are no expenses</EmptyTitle>
                <EmptyDescription>
                  Your expenses will appear here once you add them.
                </EmptyDescription>
              </EmptyHeader>
              <Button>Add expense</Button>
            </Empty>
          </TabsContent>
          <TabsContent value="reimbursements">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No reimbursements</EmptyTitle>
                <EmptyDescription>
                  Submitted reimbursement requests will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </TabsContent>
        </Tabs>
      </Stack>
    </PageLayout>
  ),
};

export const LongPage: Story = {
  args: {
    variant: 'default',
    padding: 'default',
    container: true,
    maxWidth: 'lg',
  },
  render: (args) => (
    <PageLayout {...args}>
      <Stack gap="6">
        <Heading level="1">Long Page Example</Heading>
        <Text variant="muted">
          Scroll to the bottom to verify the vertical padding matches the top.
        </Text>
        <Stack gap="4">
          {Array.from({ length: 16 }, (_, index) => (
            <Card key={index}>
              <CardHeader>
                <Heading level="3">Section {index + 1}</Heading>
              </CardHeader>
              <CardContent>
                <Text variant="muted">
                  Placeholder content for section {index + 1}.
                </Text>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </PageLayout>
  ),
};
