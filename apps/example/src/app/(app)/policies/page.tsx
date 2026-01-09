'use client';

import {
  Badge,
  Button,
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageLayout,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@trycompai/design-system';
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react';

const policies = [
  {
    id: 1,
    name: 'Access Control Policy',
    status: 'approved',
    owner: 'Sarah Chen',
    lastUpdated: 'Jan 15, 2024',
    controls: 12,
  },
  {
    id: 2,
    name: 'Data Classification Policy',
    status: 'approved',
    owner: 'Mike Johnson',
    lastUpdated: 'Jan 10, 2024',
    controls: 8,
  },
  {
    id: 3,
    name: 'Incident Response Policy',
    status: 'pending',
    owner: 'Sarah Chen',
    lastUpdated: 'Jan 8, 2024',
    controls: 15,
  },
  {
    id: 4,
    name: 'Business Continuity Policy',
    status: 'draft',
    owner: 'Alex Rivera',
    lastUpdated: 'Jan 5, 2024',
    controls: 6,
  },
  {
    id: 5,
    name: 'Vendor Management Policy',
    status: 'approved',
    owner: 'Emma Wilson',
    lastUpdated: 'Dec 20, 2023',
    controls: 10,
  },
  {
    id: 6,
    name: 'Change Management Policy',
    status: 'pending',
    owner: 'Mike Johnson',
    lastUpdated: 'Dec 15, 2023',
    controls: 9,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'approved':
      return <Badge>Approved</Badge>;
    case 'pending':
      return <Badge variant="secondary">Pending Review</Badge>;
    case 'draft':
      return <Badge variant="outline">Draft</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function PoliciesPage() {
  return (
    <PageLayout padding="default" container={false}>
      <PageHeader title="Policies">
        <PageHeaderDescription>
          Manage your organization&apos;s security and compliance policies.
        </PageHeaderDescription>
        <PageHeaderActions>
          <Button iconLeft={<PlusIcon />}>New Policy</Button>
        </PageHeaderActions>
      </PageHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Policy Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Controls</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy.id}>
              <TableCell>
                <Text weight="medium">{policy.name}</Text>
              </TableCell>
              <TableCell>{getStatusBadge(policy.status)}</TableCell>
              <TableCell>
                <Text variant="muted">{policy.owner}</Text>
              </TableCell>
              <TableCell>
                <Text variant="muted">{policy.controls}</Text>
              </TableCell>
              <TableCell>
                <Text variant="muted">{policy.lastUpdated}</Text>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontalIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
}
