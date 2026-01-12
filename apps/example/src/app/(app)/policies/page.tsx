'use client';

import {
  Badge,
  Button,
  HStack,
  PageHeader,
  PageHeaderActions,
  PageLayout,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@trycompai/design-system';
import { Add, Launch, OverflowMenuHorizontal } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const goToPolicy = (id: number) => router.push(`/policies/${id}`);

  return (
    <PageLayout >
      <PageHeader title="Policies">
        <PageHeaderActions>
          <Button iconLeft={<Add size={16} />}>New Policy</Button>
        </PageHeaderActions>
      </PageHeader>

      <Table variant="bordered">
        <TableHeader>
          <TableRow>
            <TableHead>Policy Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Controls</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>
              <div className="text-right">
                <span className="sr-only">Actions</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy) => (
            <TableRow
              key={policy.id}
              role="link"
              tabIndex={0}
              aria-label={`View policy: ${policy.name}`}
              style={{ cursor: 'pointer' }}
              onClick={() => goToPolicy(policy.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToPolicy(policy.id);
                }
              }}
            >
              <TableCell>
                <Text size="sm" weight="medium">
                  {policy.name}
                </Text>
              </TableCell>
              <TableCell>{getStatusBadge(policy.status)}</TableCell>
              <TableCell>
                <Text size="sm" variant="muted">
                  {policy.owner}
                </Text>
              </TableCell>
              <TableCell>
                <Text size="sm" variant="muted">
                  {policy.controls}
                </Text>
              </TableCell>
              <TableCell>
                <Text size="sm" variant="muted">
                  {policy.lastUpdated}
                </Text>
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <HStack align="center" gap="2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPolicy(policy.id);
                      }}
                    >
                      <Launch size={12} />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="More actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <OverflowMenuHorizontal size={16} />
                    </Button>
                  </HStack>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
}
