import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  OrganizationSelector,
  type Organization,
  Stack,
  Label,
} from '@trycompai/design-system';
import * as React from 'react';

const meta = {
  title: 'Organisms/OrganizationSelector',
  component: OrganizationSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OrganizationSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample organizations
const organizations: Organization[] = [
  { id: 'org_acme123', name: 'Acme Corp', color: '#10b981' },
  { id: 'org_beta456', name: 'Beta Inc', color: '#3b82f6' },
  { id: 'org_gamma789', name: 'Gamma LLC', color: '#8b5cf6' },
  { id: 'org_delta012', name: 'Delta Systems', color: '#f59e0b' },
  { id: 'org_epsilon', name: 'Epsilon Technologies', color: '#ef4444' },
];

// Generate many organizations for testing large lists
const manyOrganizations: Organization[] = Array.from({ length: 60 }, (_, i) => ({
  id: `org_${String(i + 1).padStart(3, '0')}`,
  name: `Organization ${i + 1}`,
  color: `hsl(${(i * 37) % 360}, 70%, 50%)`,
}));

export const Default: Story = {
  render: () => (
    <div className="w-[280px]">
      <OrganizationSelector
        organizations={organizations}
        placeholder="Select organization"
      />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="w-[280px]">
      <OrganizationSelector
        organizations={organizations}
        defaultValue="org_beta456"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledExample() {
    const [selectedOrg, setSelectedOrg] = React.useState('org_acme123');

    return (
      <Stack gap="md">
        <div className="w-[280px]">
          <OrganizationSelector
            organizations={organizations}
            value={selectedOrg}
            onValueChange={setSelectedOrg}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Selected: <code className="bg-muted px-1 rounded">{selectedOrg}</code>
        </p>
      </Stack>
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[280px]">
      <Stack gap="sm">
        <Label>Organization</Label>
        <OrganizationSelector
          organizations={organizations}
          placeholder="Choose an organization"
        />
      </Stack>
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="w-[280px]">
      <OrganizationSelector
        organizations={organizations}
        defaultValue="org_gamma789"
        size="sm"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[280px]">
      <OrganizationSelector
        organizations={organizations}
        defaultValue="org_acme123"
        disabled
      />
    </div>
  ),
};

export const ManyOrganizations: Story = {
  render: () => (
    <div className="w-[280px]">
      <OrganizationSelector
        organizations={manyOrganizations}
        placeholder="Select from 60+ organizations"
        searchPlaceholder="Search by name or ID..."
      />
    </div>
  ),
};

export const SearchByID: Story = {
  render: () => (
    <Stack gap="md">
      <p className="text-sm text-muted-foreground max-w-xs">
        Try searching by organization ID (e.g., &quot;org_001&quot;) or name
        (e.g., &quot;Organization 15&quot;)
      </p>
      <div className="w-[280px]">
        <OrganizationSelector
          organizations={manyOrganizations}
          placeholder="Search by ID or name"
        />
      </div>
    </Stack>
  ),
};

export const CustomEmptyState: Story = {
  render: () => (
    <div className="w-[280px]">
      <OrganizationSelector
        organizations={organizations}
        emptyText="No matching organizations. Try a different search term."
      />
    </div>
  ),
};

export const ModalMode: Story = {
  render: function ModalModeExample() {
    const [selectedOrg, setSelectedOrg] = React.useState('');

    return (
      <Stack gap="md">
        <p className="text-sm text-muted-foreground max-w-xs">
          Click the trigger or press <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">⌘O</kbd> to open in a centered modal dialog.
        </p>
        <OrganizationSelector
          organizations={manyOrganizations}
          value={selectedOrg}
          onValueChange={setSelectedOrg}
          modal
          placeholder="Select organization (⌘O)"
        />
        {selectedOrg && (
          <p className="text-sm text-muted-foreground">
            Selected: <code className="bg-muted px-1 rounded">{selectedOrg}</code>
          </p>
        )}
      </Stack>
    );
  },
};

export const WithCreateAction: Story = {
  render: function CreateActionExample() {
    const [selectedOrg, setSelectedOrg] = React.useState('');

    return (
      <Stack gap="md">
        <div className="w-[280px]">
          <OrganizationSelector
            organizations={organizations}
            value={selectedOrg}
            onValueChange={setSelectedOrg}
            createLabel="Create organization"
            onCreate={() => alert('Create organization')}
          />
        </div>
        {selectedOrg && (
          <p className="text-sm text-muted-foreground">
            Selected: <code className="bg-muted px-1 rounded">{selectedOrg}</code>
          </p>
        )}
      </Stack>
    );
  },
};
