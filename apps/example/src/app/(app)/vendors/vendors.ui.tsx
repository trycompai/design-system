import { Badge, HStack, Text } from '@trycompai/design-system';
import { ShieldCheckIcon } from 'lucide-react';

export function getRiskBadge(risk: string) {
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

export function getStatusBadge(status: string) {
  switch (status) {
    case 'approved':
      return (
        <HStack gap="1" align="center">
          <ShieldCheckIcon className="size-4 text-green-600" />
          <Text size="sm">Approved</Text>
        </HStack>
      );
    case 'pending':
      return (
        <Text size="sm" variant="muted">
          Pending Review
        </Text>
      );
    case 'review':
      return (
        <Text size="sm" variant="muted">
          Under Review
        </Text>
      );
    default:
      return (
        <Text size="sm" variant="muted">
          {status}
        </Text>
      );
  }
}

