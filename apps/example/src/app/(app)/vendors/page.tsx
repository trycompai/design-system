'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DataTableFilters,
  DataTableHeader,
  DataTableSearch,
  HStack,
  PageHeader,
  PageHeaderActions,
  PageLayout,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Stack,
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
import * as React from 'react';

import { vendors as allVendors } from './vendors.data';
import { getRiskBadge, getStatusBadge } from './vendors.ui';

export default function VendorsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const goToVendor = (id: number) => router.push(`/vendors/${id}`);

  // Filter vendors based on search query
  const vendors = React.useMemo(() => {
    if (!searchQuery.trim()) return allVendors;
    const query = searchQuery.toLowerCase();
    return allVendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(query) ||
        vendor.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <PageLayout>
      <PageHeader title="Vendors">
        <PageHeaderActions>
          <Button iconLeft={<Add size={16} />}>New Vendor</Button>
        </PageHeaderActions>
      </PageHeader>

      <Stack gap="sm">
        <DataTableHeader>
          <DataTableSearch
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <DataTableFilters>
            <Select>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All risks</SelectItem>
                <SelectItem value="high">High risk</SelectItem>
                <SelectItem value="medium">Medium risk</SelectItem>
                <SelectItem value="low">Low risk</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="review">Under review</SelectItem>
              </SelectContent>
            </Select>
          </DataTableFilters>
        </DataTableHeader>

        <Table variant="bordered">
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
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
            <TableRow
              key={vendor.id}
              role="link"
              tabIndex={0}
              aria-label={`View vendor: ${vendor.name}`}
              style={{ cursor: 'pointer' }}
              onClick={() => goToVendor(vendor.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToVendor(vendor.id);
                }
              }}
            >
              <TableCell>
                <HStack gap="3" align="center">
                  <Avatar size="default">
                    <AvatarImage src={vendor.logo} />
                    <AvatarFallback>{vendor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Stack gap="none">
                    <Text size="sm" weight="medium">
                      {vendor.name}
                    </Text>
                    <Text size="xs" variant="muted">
                      {vendor.category}
                    </Text>
                  </Stack>
                </HStack>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToVendor(vendor.id);
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
      </Stack>
    </PageLayout>
  );
}
