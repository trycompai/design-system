'use client';

import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
  Text,
} from '@trycompai/design-system';

export type Soc2StageValue = 'trust' | 'team' | 'evidence' | 'audit_ready';

export type Soc2Stage = {
  value: Soc2StageValue;
  title: string;
  summary: string;
};

export const SOC2_STAGES: Soc2Stage[] = [
  {
    value: 'trust',
    title: 'Trust Center',
    summary: 'Enable Trust Center and configure frameworks so customers can track your status.',
  },
  {
    value: 'team',
    title: 'Team & Policies',
    summary: 'Add employees, publish policies, and get everyone trained and signing.',
  },
  {
    value: 'evidence',
    title: 'Evidence collection',
    summary: 'Start evidence collection and automate where possible to stay continuously compliant.',
  },
  {
    value: 'audit_ready',
    title: 'Audit ready',
    summary: "Request an LOE if needed and schedule support — then you're ready for audit handoff.",
  },
];

export function Soc2Timeline({ currentStage = 'team' }: { currentStage?: Soc2StageValue }) {
  return <Soc2TimelineControlled defaultValue={currentStage} />;
}

export function Soc2TimelineControlled({
  value,
  defaultValue = 'team',
  onValueChange,
  showDetails = true,
}: {
  value?: Soc2StageValue;
  defaultValue?: Soc2StageValue;
  onValueChange?: (value: Soc2StageValue) => void;
  showDetails?: boolean;
  completedStages?: Partial<Record<Soc2StageValue, boolean>>;
}) {
  return (
    <Tabs
      defaultValue={value ? undefined : defaultValue}
      value={value}
      onValueChange={onValueChange as (value: string) => void}
    >
      <TabsList variant="underline">
        {SOC2_STAGES.map((stage) => (
          <TabsTrigger key={stage.value} value={stage.value}>
            {stage.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {showDetails &&
        SOC2_STAGES.map((stage) => (
          <TabsContent key={stage.value} value={stage.value}>
            <Text size="sm" variant="muted">
              {stage.summary}
            </Text>
          </TabsContent>
        ))}
    </Tabs>
  );
}

