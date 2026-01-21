import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Input,
  Label,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetBody,
  Stack,
} from '@trycompai/design-system';

const meta = {
  title: 'Organisms/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <Stack gap="4">
            <Stack gap="2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </Stack>
            <Stack gap="2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@johndoe" />
            </Stack>
          </Stack>
        </SheetBody>
        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open Left</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through different sections.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <Stack gap="2">
            <div className="w-full">
              <Button variant="ghost">Dashboard</Button>
            </div>
            <div className="w-full">
              <Button variant="ghost">Projects</Button>
            </div>
            <div className="w-full">
              <Button variant="ghost">Settings</Button>
            </div>
            <div className="w-full">
              <Button variant="ghost">Help</Button>
            </div>
          </Stack>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open Top</SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>You have a new message from the system.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open Bottom</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Actions</SheetTitle>
          <SheetDescription>Choose an action to perform.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <Stack direction="row" gap="2">
            <div className="flex-1">
              <Button>Share</Button>
            </div>
            <div className="flex-1">
              <Button variant="outline">Copy Link</Button>
            </div>
            <div className="flex-1">
              <Button variant="outline">Download</Button>
            </div>
          </Stack>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
};
