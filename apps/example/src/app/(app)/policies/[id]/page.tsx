'use client';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HStack,
  PageHeader,
  PageHeaderActions,
  PageLayout,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@trycompai/design-system';
import { Edit, TrashCan } from '@carbon/icons-react';
import Link from 'next/link';
import { use } from 'react';

// Mock data - in real app would fetch based on id
const policiesData: Record<string, {
  id: number;
  name: string;
  status: string;
  owner: string;
  lastUpdated: string;
  description: string;
  controls: { id: number; name: string; status: string }[];
}> = {
  '1': {
    id: 1,
    name: 'Access Control Policy',
    status: 'approved',
    owner: 'Sarah Chen',
    lastUpdated: 'Jan 15, 2024',
    description: 'This policy defines the requirements for controlling access to organizational information systems and data.',
    controls: [
      { id: 1, name: 'User Access Management', status: 'compliant' },
      { id: 2, name: 'Password Requirements', status: 'compliant' },
      { id: 3, name: 'Access Review Process', status: 'needs-attention' },
      { id: 4, name: 'Privileged Access Controls', status: 'compliant' },
    ],
  },
  '2': {
    id: 2,
    name: 'Data Classification Policy',
    status: 'approved',
    owner: 'Mike Johnson',
    lastUpdated: 'Jan 10, 2024',
    description: 'This policy establishes guidelines for classifying and handling organizational data based on sensitivity levels.',
    controls: [
      { id: 5, name: 'Data Classification Scheme', status: 'compliant' },
      { id: 6, name: 'Data Handling Procedures', status: 'compliant' },
      { id: 7, name: 'Data Labeling Requirements', status: 'non-compliant' },
    ],
  },
  '3': {
    id: 3,
    name: 'Incident Response Policy',
    status: 'pending',
    owner: 'Sarah Chen',
    lastUpdated: 'Jan 8, 2024',
    description: 'This policy outlines the procedures for identifying, reporting, and responding to security incidents.',
    controls: [
      { id: 8, name: 'Incident Detection', status: 'compliant' },
      { id: 9, name: 'Incident Reporting', status: 'needs-attention' },
      { id: 10, name: 'Incident Response Team', status: 'compliant' },
    ],
  },
};

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

function getControlStatusBadge(status: string) {
  switch (status) {
    case 'compliant':
      return <Badge>Compliant</Badge>;
    case 'needs-attention':
      return <Badge variant="secondary">Needs Attention</Badge>;
    case 'non-compliant':
      return <Badge variant="destructive">Non-Compliant</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function PolicyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const policy = policiesData[id] || policiesData['1'];

  const breadcrumbs = [
    { label: 'Policies', href: '/policies' },
    { label: policy.name },
  ];

  return (
    <PageLayout>
      <PageHeader
        title={policy.name}
        breadcrumbs={breadcrumbs}
      >
        <PageHeaderActions>
          <Button variant="outline" iconLeft={<Edit size={16} />}>
            Edit
          </Button>
          <Button variant="destructive" iconLeft={<TrashCan size={16} />}>
            Delete
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <Stack gap="6">
          {/* Policy Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="4">
                <Text>{policy.description}</Text>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Stack gap="1">
                    <Text size="sm" variant="muted">Status</Text>
                    {getStatusBadge(policy.status)}
                  </Stack>
                  <Stack gap="1">
                    <Text size="sm" variant="muted">Owner</Text>
                    <Text weight="medium">{policy.owner}</Text>
                  </Stack>
                  <Stack gap="1">
                    <Text size="sm" variant="muted">Last Updated</Text>
                    <Text weight="medium">{policy.lastUpdated}</Text>
                  </Stack>
                  <Stack gap="1">
                    <Text size="sm" variant="muted">Controls</Text>
                    <Text weight="medium">{policy.controls.length}</Text>
                  </Stack>
                </div>
              </Stack>
            </CardContent>
          </Card>

          {/* Related Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Related Controls</CardTitle>
              <CardDescription>Controls that are mapped to this policy.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table variant="bordered">
                <TableHeader>
                  <TableRow>
                    <TableHead>Control Name</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policy.controls.map((control) => (
                    <TableRow key={control.id}>
                      <TableCell>
                        <Text size="sm" weight="medium">{control.name}</Text>
                      </TableCell>
                      <TableCell>
                        {getControlStatusBadge(control.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
      </Stack>
    </PageLayout>
  );
}
