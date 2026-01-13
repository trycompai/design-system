import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ApprovalBanner,
  Stack,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@trycompai/design-system';
import { fn } from 'storybook/test';

const meta = {
  title: 'Organisms/ApprovalBanner',
  component: ApprovalBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onApprove: fn(),
    onReject: fn(),
  },
} satisfies Meta<typeof ApprovalBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Action Required by You',
    description:
      'This policy is awaiting approval from you. Please review the details and either approve or reject the changes.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Action Required by You',
    description:
      'This policy is awaiting approval from you. Please review the details and either approve or reject the changes.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Review Requested',
    description:
      'A team member has requested your review on this document. Please take a moment to review and provide feedback.',
  },
};

export const CustomButtonText: Story = {
  args: {
    title: 'Confirm Policy Changes',
    description:
      'You are about to publish changes to the Security Policy. This will notify all affected team members.',
    approveText: 'Publish Changes',
    rejectText: 'Discard',
  },
};

export const ApproveOnly: Story = {
  args: {
    variant: 'info',
    title: 'Welcome to the Team!',
    description:
      'Please review and acknowledge the company policies before continuing.',
    approveText: 'I Acknowledge',
    hideReject: true,
  },
};

export const Loading: Story = {
  args: {
    title: 'Processing Approval',
    description: 'Please wait while we process your approval request.',
    approveLoading: true,
  },
};

export const WithConfirmationDialogs: Story = {
  args: {
    title: 'Data Retention Policy v2.1',
    description:
      'This policy update requires your approval before it can be published.',
    approveConfirmation: {
      title: 'Approve Policy',
      description:
        'Are you sure you want to approve this policy? It will be published immediately.',
      confirmText: 'Yes, Approve',
      cancelText: 'Cancel',
      onCancel: () => console.log('Approve dialog cancelled'),
    },
    rejectConfirmation: {
      title: 'Reject Policy',
      description:
        'Are you sure you want to reject this policy? The author will be notified.',
      confirmText: 'Yes, Reject',
      cancelText: 'Cancel',
      onCancel: () => console.log('Reject dialog cancelled'),
    },
  },
};

export const InlineWithConfirmation: Story = {
  args: {
    layout: 'inline',
    title: 'Policy awaiting your approval',
    description: 'Data Retention Policy v2.1 • Submitted by John Doe',
    approveConfirmation: {
      title: 'Confirm Approval',
      description:
        'This will approve the policy and notify the submitter.',
    },
    rejectConfirmation: {
      title: 'Confirm Rejection',
      description:
        'This will reject the policy. The submitter will be asked to revise.',
    },
  },
};

// This example shows how parent manages state and receives form data
const WithCustomDialogContentExample = () => {
  const [approver, setApprover] = React.useState('john');
  const [notes, setNotes] = React.useState('');
  const [rejectReason, setRejectReason] = React.useState('');

  const handleApprove = () => {
    // Parent has access to all form data
    console.log('Approved with:', { approver, notes });
    alert(`Approved!\nApprover: ${approver}\nNotes: ${notes || '(none)'}`);
  };

  const handleReject = () => {
    console.log('Rejected with reason:', rejectReason);
    alert(`Rejected!\nReason: ${rejectReason || '(none)'}`);
  };

  return (
    <ApprovalBanner
      title="Security Policy v3.0"
      description="This policy requires approval from a senior team member."
      onApprove={handleApprove}
      onReject={handleReject}
      approveConfirmation={{
        title: 'Approve Policy',
        description: 'Select an approver to sign off on this policy.',
        content: (
          <Stack gap="4">
            <Stack gap="2">
              <Label htmlFor="approver">Approver</Label>
              <Select value={approver} onValueChange={(v) => v && setApprover(v)}>
                <SelectTrigger id="approver">
                  <SelectValue placeholder="Select approver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith (CTO)</SelectItem>
                  <SelectItem value="jane">Jane Doe (CISO)</SelectItem>
                  <SelectItem value="bob">Bob Wilson (VP Engineering)</SelectItem>
                </SelectContent>
              </Select>
            </Stack>
            <Stack gap="2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes for the approver..."
              />
            </Stack>
          </Stack>
        ),
        confirmText: 'Submit for Approval',
      }}
      rejectConfirmation={{
        title: 'Reject Policy',
        content: (
          <Stack gap="2">
            <Label htmlFor="reason">Reason for rejection</Label>
            <Textarea
              id="reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejecting this policy..."
            />
          </Stack>
        ),
        confirmText: 'Submit Rejection',
      }}
    />
  );
};

export const WithCustomDialogContent: Story = {
  args: {
    title: 'Security Policy v3.0',
    description: 'This policy requires approval from a senior team member.',
  },
  render: () => <WithCustomDialogContentExample />,
};

export const AllVariants: Story = {
  args: {
    title: 'All Variants',
    description: 'Showing all banner variants',
  },
  render: () => (
    <Stack gap="6">
      <Stack gap="4">
        <ApprovalBanner
          variant="warning"
          title="Action Required by You"
          description="This policy is awaiting approval from you. Please review the details."
          onApprove={() => {}}
          onReject={() => {}}
        />
        <ApprovalBanner
          variant="info"
          title="Review Requested"
          description="A team member has requested your review on this document."
          onApprove={() => {}}
          onReject={() => {}}
        />
        <ApprovalBanner
          variant="default"
          title="Pending Confirmation"
          description="Please confirm the changes before proceeding."
          onApprove={() => {}}
          onReject={() => {}}
        />
      </Stack>
      <Stack gap="4">
        <ApprovalBanner
          layout="inline"
          variant="warning"
          title="Action Required by You"
          description="This policy is awaiting approval from you."
          onApprove={() => {}}
          onReject={() => {}}
        />
        <ApprovalBanner
          layout="inline"
          variant="info"
          title="Review Requested"
          description="A team member has requested your review."
          onApprove={() => {}}
          onReject={() => {}}
        />
        <ApprovalBanner
          layout="inline"
          variant="default"
          title="Pending Confirmation"
          description="Please confirm the changes before proceeding."
          onApprove={() => {}}
          onReject={() => {}}
        />
      </Stack>
    </Stack>
  ),
};

export const Inline: Story = {
  args: {
    layout: 'inline',
    title: 'Policy awaiting your approval',
    description: 'Data Retention Policy v2.1 • Submitted by John Doe',
  },
};

export const InlineWithDropdown: Story = {
  args: {
    layout: 'inline',
    title: 'Policy awaiting your approval',
    description: 'Data Retention Policy v2.1 • Submitted by John Doe',
    additionalActions: [
      {
        id: 'delegate',
        label: 'Delegate to someone else',
        onClick: () => console.log('Delegate'),
      },
      {
        id: 'remind',
        label: 'Remind me later',
        onClick: () => console.log('Remind'),
      },
    ],
  },
};

export const InlineApproveOnly: Story = {
  args: {
    layout: 'inline',
    variant: 'info',
    title: 'Acknowledge company policies',
    description: 'Please review and accept before continuing',
    hideReject: true,
    approveText: 'I Acknowledge',
  },
};

export const LayoutComparison: Story = {
  args: {
    title: 'Layout Comparison',
    description: 'Comparing stacked vs inline layouts',
  },
  render: () => (
    <Stack gap="6">
      <div>
        <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
          Stacked Layout (default)
        </p>
        <ApprovalBanner
          layout="stacked"
          variant="warning"
          title="Action Required by You"
          description="This policy is awaiting approval from you. Please review the details and either approve or reject the changes."
          onApprove={() => {}}
          onReject={() => {}}
        />
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
          Inline Layout (compact with split button)
        </p>
        <ApprovalBanner
          layout="inline"
          variant="warning"
          title="Action Required by You"
          description="This policy is awaiting approval from you."
          onApprove={() => {}}
          onReject={() => {}}
        />
      </div>
    </Stack>
  ),
};
