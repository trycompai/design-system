'use client';

import {
  Badge,
  Button,
  HStack,
  PageHeader,
  PageHeaderActions,
  PageLayout,
  Progress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@trycompai/design-system';
import { CheckCircleIcon, CircleIcon, FilterIcon, PlusIcon } from 'lucide-react';

const controlCategories = [
  {
    id: 'access-control',
    name: 'Access Control',
    description: 'User authentication and authorization controls',
    total: 24,
    passed: 20,
    failed: 2,
    pending: 2,
  },
  {
    id: 'data-protection',
    name: 'Data Protection',
    description: 'Encryption and data handling controls',
    total: 18,
    passed: 15,
    failed: 1,
    pending: 2,
  },
  {
    id: 'network-security',
    name: 'Network Security',
    description: 'Firewall and network monitoring controls',
    total: 15,
    passed: 12,
    failed: 0,
    pending: 3,
  },
  {
    id: 'incident-response',
    name: 'Incident Response',
    description: 'Security incident detection and response',
    total: 12,
    passed: 8,
    failed: 2,
    pending: 2,
  },
  {
    id: 'vendor-management',
    name: 'Vendor Management',
    description: 'Third-party risk assessment controls',
    total: 10,
    passed: 7,
    failed: 1,
    pending: 2,
  },
  {
    id: 'business-continuity',
    name: 'Business Continuity',
    description: 'Disaster recovery and backup controls',
    total: 8,
    passed: 5,
    failed: 1,
    pending: 2,
  },
];

export default function ControlsPage() {
  const totalControls = controlCategories.reduce((sum, c) => sum + c.total, 0);
  const passedControls = controlCategories.reduce((sum, c) => sum + c.passed, 0);

  return (
    <PageLayout padding="none" container={false}>
      <PageHeader title="Controls">
        <PageHeaderActions>
          <Button iconLeft={<PlusIcon />}>New Control</Button>
          <Button variant="secondary" iconLeft={<FilterIcon />}>Filter</Button>
        </PageHeaderActions>
      </PageHeader>

      <Stack gap="4">
        <HStack gap="4">
          <Badge>{passedControls} of {totalControls} controls passing</Badge>
          <Badge variant="secondary">{Math.round((passedControls / totalControls) * 100)}% complete</Badge>
        </HStack>

        <Table variant="bordered">
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>
                <div className="text-right">Total</div>
              </TableHead>
              <TableHead>
                <div className="text-right">Passed</div>
              </TableHead>
              <TableHead>
                <div className="text-right">Failed</div>
              </TableHead>
              <TableHead>
                <div className="text-right">Pending</div>
              </TableHead>
              <TableHead>
                <div className="text-right">
                  <span className="sr-only">Actions</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {controlCategories.map((category) => {
              const passRate = Math.round((category.passed / category.total) * 100);
              return (
                <TableRow key={category.id}>
                  <TableCell>
                    <Stack gap="none">
                      <Text size="sm" weight="medium">
                        {category.name}
                      </Text>
                      <Text size="sm" variant="muted">
                        {category.description}
                      </Text>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <div className="min-w-48">
                      <Stack gap="2">
                        <HStack justify="between" align="center">
                          <Text size="sm" variant="muted">
                            {passRate}%
                          </Text>
                          <Text size="sm" variant="muted">
                            {category.passed}/{category.total}
                          </Text>
                        </HStack>
                        <Progress value={passRate} />
                      </Stack>
                    </div>
                  </TableCell>
                  <TableCell>
                    <HStack justify="end" align="center">
                      <Text size="sm" variant="muted">
                        {category.total}
                      </Text>
                    </HStack>
                  </TableCell>
                  <TableCell>
                    <HStack justify="end" align="center" gap="1">
                      <CheckCircleIcon className="size-4 text-green-600" />
                      <Text size="sm">{category.passed}</Text>
                    </HStack>
                  </TableCell>
                  <TableCell>
                    <HStack justify="end" align="center" gap="1">
                      <CircleIcon className="size-4 text-red-500" />
                      <Text size="sm">{category.failed}</Text>
                    </HStack>
                  </TableCell>
                  <TableCell>
                    <HStack justify="end" align="center" gap="1">
                      <CircleIcon className="size-4 text-muted-foreground" />
                      <Text size="sm" variant="muted">
                        {category.pending}
                      </Text>
                    </HStack>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
    </PageLayout>
  );
}
