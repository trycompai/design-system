'use client';

import {
  Badge,
  Checkbox,
  Heading,
  HStack,
  PageHeader,
  PageHeaderDescription,
  PageLayout,
  Progress,
  Stack,
  Text,
} from '@trycompai/design-system';

export default function OverviewPage() {
  return (
    <PageLayout padding="default" container={false}>
      <PageHeader title="Overview">
        <PageHeaderDescription>
          Track your progress towards SOC 2 compliance.
        </PageHeaderDescription>
      </PageHeader>

      {/* SOC 2 Progress Section */}
      <Stack gap="md">
        <HStack justify="between" align="center">
          <Heading level="3">SOC 2 Type II</Heading>
          <Badge>In Progress</Badge>
        </HStack>
        <Stack gap="sm">
          <HStack justify="between" align="baseline">
            <HStack align="baseline" gap="xs">
              <Text size="lg" weight="semibold">67%</Text>
              <Text variant="muted" size="sm">complete</Text>
            </HStack>
            <Text variant="muted" size="sm">98 of 146 controls</Text>
          </HStack>
          <Progress value={67} />
        </Stack>
      </Stack>

      {/* Next Steps Section */}
      <Stack gap="md">
        <Heading level="3">Next steps</Heading>
        <Stack gap="none">
          <div className="flex items-start gap-3 py-3 border-b border-border/40">
            <Checkbox />
            <Stack gap="none">
              <Text size="sm" weight="medium">Complete security awareness training</Text>
              <Text variant="muted" size="xs">3 team members haven&apos;t completed annual training</Text>
            </Stack>
          </div>
          <div className="flex items-start gap-3 py-3 border-b border-border/40">
            <Checkbox />
            <Stack gap="none">
              <Text size="sm" weight="medium">Review and approve access policies</Text>
              <Text variant="muted" size="xs">2 policies pending approval from admin</Text>
            </Stack>
          </div>
          <div className="flex items-start gap-3 py-3 border-b border-border/40">
            <Checkbox />
            <Stack gap="none">
              <Text size="sm" weight="medium">Connect your cloud infrastructure</Text>
              <Text variant="muted" size="xs">AWS and GCP integrations available</Text>
            </Stack>
          </div>
          <div className="flex items-start gap-3 py-3">
            <Checkbox />
            <Stack gap="none">
              <Text size="sm" weight="medium">Schedule your first audit</Text>
              <Text variant="muted" size="xs">Contact our team to begin the audit process</Text>
            </Stack>
          </div>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
