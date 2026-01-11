'use client';

import {
  Badge,
  Card,
  CardContent,
  Grid,
  Heading,
  HStack,
  PageHeader,
  PageLayout,
  Progress,
  Stack,
  Text,
} from '@trycompai/design-system';
import { CheckmarkFilled, Security, Warning, WarningAltFilled } from '@carbon/icons-react';

const securityMetrics = [
  {
    title: 'Security Score',
    value: '87',
    suffix: '/100',
    change: '+5',
    status: 'good',
  },
  {
    title: 'Open Vulnerabilities',
    value: '12',
    suffix: '',
    change: '-3',
    status: 'warning',
  },
  {
    title: 'Assets Protected',
    value: '156',
    suffix: '',
    change: '+8',
    status: 'good',
  },
  {
    title: 'Critical Issues',
    value: '2',
    suffix: '',
    change: '0',
    status: 'critical',
  },
];

const recentThreats = [
  { id: 1, type: 'Phishing Attempt', severity: 'high', time: '2 hours ago', status: 'blocked' },
  { id: 2, type: 'Suspicious Login', severity: 'medium', time: '5 hours ago', status: 'investigating' },
  { id: 3, type: 'Malware Detection', severity: 'high', time: '1 day ago', status: 'resolved' },
  { id: 4, type: 'Data Exfiltration Attempt', severity: 'critical', time: '2 days ago', status: 'blocked' },
];

export default function CybersecurityPage() {
  return (
    <PageLayout padding="none" container={false}>
      <PageHeader title="Cybersecurity Dashboard" />

      <Grid cols="4" gap="4">
        {securityMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent>
              <Stack gap="2">
                <Text size="sm" variant="muted">{metric.title}</Text>
                <HStack align="baseline" gap="xs">
                  <Text size="lg" weight="semibold">{metric.value}</Text>
                  {metric.suffix && <Text variant="muted">{metric.suffix}</Text>}
                </HStack>
                <HStack gap="1" align="center">
                  {metric.status === 'good' && <CheckmarkFilled size={12} className="text-green-600" />}
                  {metric.status === 'warning' && <Warning size={12} className="text-yellow-600" />}
                  {metric.status === 'critical' && <WarningAltFilled size={12} className="text-red-600" />}
                  <Text size="xs" variant="muted">{metric.change} from last week</Text>
                </HStack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Stack gap="4">
            <HStack justify="between" align="center">
              <Heading level="3">Recent Threats</Heading>
              <Badge variant="secondary">{recentThreats.length} detected</Badge>
            </HStack>

            <Stack gap="none">
              {recentThreats.map((threat) => (
                <div key={threat.id} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                  <HStack gap="3" align="center">
                    <div className={`size-8 rounded-full flex items-center justify-center ${
                      threat.severity === 'critical' ? 'bg-red-100 text-red-600' :
                      threat.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      <WarningAltFilled size={16} />
                    </div>
                    <Stack gap="none">
                      <Text size="sm" weight="medium">{threat.type}</Text>
                      <Text size="xs" variant="muted">{threat.time}</Text>
                    </Stack>
                  </HStack>
                  <Badge variant={
                    threat.status === 'blocked' ? 'default' :
                    threat.status === 'resolved' ? 'secondary' :
                    'outline'
                  }>
                    {threat.status}
                  </Badge>
                </div>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Grid cols="2" gap="4">
        <Card>
          <CardContent>
            <Stack gap="4">
              <Heading level="3">Security Posture</Heading>
              <Stack gap="2">
                <HStack justify="between">
                  <Text size="sm">Network Security</Text>
                  <Text size="sm" weight="medium">92%</Text>
                </HStack>
                <Progress value={92} />
              </Stack>
              <Stack gap="2">
                <HStack justify="between">
                  <Text size="sm">Endpoint Protection</Text>
                  <Text size="sm" weight="medium">88%</Text>
                </HStack>
                <Progress value={88} />
              </Stack>
              <Stack gap="2">
                <HStack justify="between">
                  <Text size="sm">Identity & Access</Text>
                  <Text size="sm" weight="medium">95%</Text>
                </HStack>
                <Progress value={95} />
              </Stack>
              <Stack gap="2">
                <HStack justify="between">
                  <Text size="sm">Data Protection</Text>
                  <Text size="sm" weight="medium">78%</Text>
                </HStack>
                <Progress value={78} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack gap="4">
              <Heading level="3">Compliance Status</Heading>
              <Stack gap="3">
                <HStack justify="between" align="center">
                  <HStack gap="2" align="center">
                    <Security size={16} className="text-green-600" />
                    <Text size="sm">SOC 2 Type II</Text>
                  </HStack>
                  <Badge>Compliant</Badge>
                </HStack>
                <HStack justify="between" align="center">
                  <HStack gap="2" align="center">
                    <Security size={16} className="text-green-600" />
                    <Text size="sm">ISO 27001</Text>
                  </HStack>
                  <Badge>Compliant</Badge>
                </HStack>
                <HStack justify="between" align="center">
                  <HStack gap="2" align="center">
                    <Warning size={16} className="text-yellow-600" />
                    <Text size="sm">GDPR</Text>
                  </HStack>
                  <Badge variant="secondary">In Progress</Badge>
                </HStack>
                <HStack justify="between" align="center">
                  <HStack gap="2" align="center">
                    <Security size={16} className="text-green-600" />
                    <Text size="sm">HIPAA</Text>
                  </HStack>
                  <Badge>Compliant</Badge>
                </HStack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </PageLayout>
  );
}
