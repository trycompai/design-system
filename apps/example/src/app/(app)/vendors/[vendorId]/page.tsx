'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardHeader,
  Heading,
  HStack,
  PageHeader,
  PageLayout,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@trycompai/design-system';
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
    <Tabs defaultValue="overview">
      <PageLayout>
        <PageHeader
          title={vendor?.name ?? 'Vendor'}
          backHref="/vendors"
          backLabel="Vendors"
          tabs={
            vendor ? (
              <TabsList variant="underline">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assessments">Assessments</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
            ) : undefined
          }
        />

        {!vendor ? (
          <Card>
            <CardHeader>
              <Heading level="3">Vendor not found</Heading>
            </CardHeader>
            <CardContent>
              <Text size="sm" variant="muted">
                That vendor doesn't exist (or the URL is wrong).
              </Text>
            </CardContent>
          </Card>
        ) : (
          <>

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

          <TabsContent value="assessments">
              <Card>
                <CardHeader>
                  <Heading level="4">Assessments</Heading>
                </CardHeader>
                <CardContent>
                  <Text size="sm" variant="muted">
                    Vendor assessments coming soon...
                  </Text>
                </CardContent>
              </Card>
          </TabsContent>

          <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <Heading level="4">Documents</Heading>
                </CardHeader>
                <CardContent>
                  <Text size="sm" variant="muted">
                    Vendor documents coming soon...
                  </Text>
                </CardContent>
              </Card>
          </TabsContent>
          </>
        )}
      </PageLayout>
    </Tabs>
  );
}

