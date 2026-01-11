'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { ExternalLinkIcon, MoreHorizontalIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { vendors } from './vendors.data';
import { getRiskBadge, getStatusBadge } from './vendors.ui';

export default function VendorsPage() {
  const router = useRouter();

  const goToVendor = (id: number) => router.push(`/vendors/${id}`);

  return (
    <PageLayout padding="none" container={false}>
      <PageHeader title="Vendors">
        <PageHeaderActions>
          <Button iconLeft={<PlusIcon />}>New Vendor</Button>
        </PageHeaderActions>
      </PageHeader>

      <Table variant="bordered">
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
                  <Avatar size="lg">
                    <AvatarImage src={vendor.logo} />
                    <AvatarFallback>{vendor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Text size="sm" weight="medium">
                    {vendor.name}
                  </Text>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToVendor(vendor.id);
                      }}
                    >
                      <ExternalLinkIcon className="size-3" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="More actions"
                      onClick={(e) => e.stopPropagation()}
                    >
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
