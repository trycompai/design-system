'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  Button,
  BreadcrumbItem,
  BreadcrumbList,
  Card,
  CardContent,
  CardHeader,
  Heading,
  HStack,
  PageLayout,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@trycompai/design-system';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { getVendorById } from '../vendors.data';
import { getRiskBadge, getStatusBadge } from '../vendors.ui';

function getVendorIdFromParams(params: ReturnType<typeof useParams>): number | null {
  const raw = (params as Record<string, string | string[] | undefined>)?.vendorId;
  const str = Array.isArray(raw) ? raw[0] : raw;
  if (!str) return null;
  const id = Number.parseInt(str, 10);
  return Number.isFinite(id) ? id : null;
}

export default function VendorDetailPage() {
  const params = useParams();

  const vendorId = getVendorIdFromParams(params);
  const vendor = vendorId == null ? undefined : getVendorById(vendorId);

  return (
    <PageLayout padding="none" container={false} gap="4">
      {/* Breadcrumb is intentionally rendered with a Button(link) so the back icon + link are one click target. */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Button
              variant="link"
              size="sm"
              iconLeft={<ArrowLeftIcon />}
              render={<Link href="/vendors" />}
            >
              Vendors
            </Button>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Heading level="1">{vendor?.name ?? 'Vendor'}</Heading>

      {!vendor ? (
        <Card>
          <CardHeader>
            <Heading level="3">Vendor not found</Heading>
          </CardHeader>
          <CardContent>
            <Text size="sm" variant="muted">
              That vendor doesn’t exist (or the URL is wrong).
            </Text>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview">
          <TabsList variant="underline">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="example-1">Example tab</TabsTrigger>
            <TabsTrigger value="example-2">Example tab</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="pt-4">
              <Stack gap="6">
                <HStack gap="4" align="center">
                  <Avatar size="lg">
                    <AvatarImage src={vendor.logo} />
                    <AvatarFallback>{vendor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <Stack gap="1">
                    <HStack gap="2" align="center">
                      <Text size="sm" weight="medium">
                        {vendor.name}
                      </Text>
                      <Badge variant="secondary">ID: {vendor.id}</Badge>
                    </HStack>

                    <HStack gap="2" align="center">
                      {getRiskBadge(vendor.riskLevel)}
                      {getStatusBadge(vendor.status)}
                      <Text size="sm" variant="muted">
                        Last assessed: {vendor.lastAssessment}
                      </Text>
                    </HStack>
                  </Stack>
                </HStack>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <Heading level="4">Category</Heading>
                    </CardHeader>
                    <CardContent>
                      <Text size="sm" variant="muted">
                        {vendor.category}
                      </Text>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading level="4">Risk</Heading>
                    </CardHeader>
                    <CardContent>{getRiskBadge(vendor.riskLevel)}</CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading level="4">Status</Heading>
                    </CardHeader>
                    <CardContent>{getStatusBadge(vendor.status)}</CardContent>
                  </Card>
                </div>
              </Stack>
            </div>
          </TabsContent>

          <TabsContent value="example-1">
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <Heading level="4">Example tab</Heading>
                </CardHeader>
                <CardContent>
                  <Text size="sm" variant="muted">
                    Placeholder.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="example-2">
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <Heading level="4">Example tab</Heading>
                </CardHeader>
                <CardContent>
                  <Text size="sm" variant="muted">
                    Placeholder.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </PageLayout>
  );
}

