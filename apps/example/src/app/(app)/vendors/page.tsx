'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
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
import { ExternalLinkIcon, MoreHorizontalIcon, PlusIcon, ShieldCheckIcon } from 'lucide-react';

const vendors = [
  {
    id: 1,
    name: 'Amazon Web Services',
    category: 'Cloud Infrastructure',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Dec 15, 2023',
    logo: 'https://logo.clearbit.com/aws.amazon.com',
  },
  {
    id: 2,
    name: 'Google Cloud Platform',
    category: 'Cloud Infrastructure',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Dec 10, 2023',
    logo: 'https://logo.clearbit.com/cloud.google.com',
  },
  {
    id: 3,
    name: 'Slack',
    category: 'Communication',
    riskLevel: 'medium',
    status: 'approved',
    lastAssessment: 'Nov 28, 2023',
    logo: 'https://logo.clearbit.com/slack.com',
  },
  {
    id: 4,
    name: 'Salesforce',
    category: 'CRM',
    riskLevel: 'medium',
    status: 'pending',
    lastAssessment: 'Nov 15, 2023',
    logo: 'https://logo.clearbit.com/salesforce.com',
  },
  {
    id: 5,
    name: 'Datadog',
    category: 'Monitoring',
    riskLevel: 'low',
    status: 'approved',
    lastAssessment: 'Oct 30, 2023',
    logo: 'https://logo.clearbit.com/datadoghq.com',
  },
  {
    id: 6,
    name: 'Stripe',
    category: 'Payments',
    riskLevel: 'high',
    status: 'review',
    lastAssessment: 'Oct 15, 2023',
    logo: 'https://logo.clearbit.com/stripe.com',
  },
];

function getRiskBadge(risk: string) {
  switch (risk) {
    case 'low':
      return <Badge>Low Risk</Badge>;
    case 'medium':
      return <Badge variant="secondary">Medium Risk</Badge>;
    case 'high':
      return <Badge variant="destructive">High Risk</Badge>;
    default:
      return <Badge variant="outline">{risk}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'approved':
      return (
        <HStack gap="1" align="center">
          <ShieldCheckIcon className="size-4 text-green-600" />
          <Text size="sm">Approved</Text>
        </HStack>
      );
    case 'pending':
      return <Text size="sm" variant="muted">Pending Review</Text>;
    case 'review':
      return <Text size="sm" variant="muted">Under Review</Text>;
    default:
      return <Text size="sm" variant="muted">{status}</Text>;
  }
}

export default function VendorsPage() {
  return (
    <PageLayout padding="none" container={false}>
      <PageHeader title="Vendors">
        <PageHeaderActions>
          <Button iconLeft={<PlusIcon />}>New Vendor</Button>
        </PageHeaderActions>
      </PageHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last assessment</TableHead>
            <TableHead>
              <div className="text-right">
                <span className="sr-only">Actions</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>
                <HStack gap="3" align="center">
                  <Avatar size="lg">
                    <AvatarImage src={vendor.logo} />
                    <AvatarFallback>{vendor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Text weight="medium">{vendor.name}</Text>
                </HStack>
              </TableCell>
              <TableCell>
                <Text size="sm" variant="muted">
                  {vendor.category}
                </Text>
              </TableCell>
              <TableCell>{getRiskBadge(vendor.riskLevel)}</TableCell>
              <TableCell>{getStatusBadge(vendor.status)}</TableCell>
              <TableCell>
                <Text size="sm" variant="muted">
                  {vendor.lastAssessment}
                </Text>
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <HStack align="center" gap="2">
                    <Button variant="ghost" size="sm">
                      <ExternalLinkIcon className="size-3" />
                      View
                    </Button>
                    <Button variant="ghost" size="icon-sm" aria-label="More actions">
                      <MoreHorizontalIcon />
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
