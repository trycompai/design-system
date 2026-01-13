'use client';

import {
  Badge,
  Button,
  DataTableFilters,
  DataTableHeader,
  DataTableSearch,
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
import { Add, Filter, OverflowMenuHorizontal, Warning } from '@carbon/icons-react';
import * as React from 'react';

const allRisks = [
  {
    id: 1,
    title: 'Missing vendor SOC 2 report',
    severity: 'high',
    status: 'open',
    owner: 'Security team',
    updatedAt: 'Jan 18, 2024',
  },
  {
    id: 2,
    title: 'MFA not enforced for all admins',
    severity: 'high',
    status: 'in_progress',
    owner: 'IT',
    updatedAt: 'Jan 16, 2024',
  },
  {
    id: 3,
    title: 'Access reviews not documented',
    severity: 'medium',
    status: 'open',
    owner: 'GRC',
    updatedAt: 'Jan 12, 2024',
  },
  {
    id: 4,
    title: 'Backup retention policy out of date',
    severity: 'low',
    status: 'resolved',
    owner: 'Engineering',
    updatedAt: 'Jan 5, 2024',
  },
];

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="secondary">Medium</Badge>;
    case 'low':
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge variant="outline">{severity}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'open':
      return <Badge variant="outline">Open</Badge>;
    case 'in_progress':
      return <Badge>In progress</Badge>;
    case 'resolved':
      return <Badge variant="secondary">Resolved</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function RisksPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter risks based on search query
  const risks = React.useMemo(() => {
    if (!searchQuery.trim()) return allRisks;
    const query = searchQuery.toLowerCase();
    return allRisks.filter(
      (risk) =>
        risk.title.toLowerCase().includes(query) ||
        risk.owner.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <PageLayout>
      <PageHeader title="Risks">
        <PageHeaderActions>
          <Button iconLeft={<Add size={16} />}>New Risk</Button>
        </PageHeaderActions>
      </PageHeader>

      <DataTableHeader>
        <DataTableSearch
          placeholder="Search risks..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <DataTableFilters>
          <Button variant="outline" size="sm" iconLeft={<Filter size={16} />}>
            Filter
          </Button>
        </DataTableFilters>
      </DataTableHeader>

      <Table variant="bordered">
        <TableHeader>
          <TableRow>
            <TableHead>Risk</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>
              <div className="text-right">
                <span className="sr-only">Actions</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {risks.map((risk) => (
            <TableRow key={risk.id}>
              <TableCell>
                <HStack gap="2" align="center">
                  <Warning size={16} className="text-muted-foreground" />
                  <Text size="sm" weight="medium">
                    {risk.title}
                  </Text>
                </HStack>
              </TableCell>
              <TableCell>{getSeverityBadge(risk.severity)}</TableCell>
              <TableCell>{getStatusBadge(risk.status)}</TableCell>
              <TableCell>
                <Text size="sm" variant="muted">
                  {risk.owner}
                </Text>
              </TableCell>
              <TableCell>
                <Text size="sm" variant="muted">
                  {risk.updatedAt}
                </Text>
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <Button variant="outline" size="icon-sm" aria-label="More actions">
                    <OverflowMenuHorizontal size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageLayout>
  );
}

