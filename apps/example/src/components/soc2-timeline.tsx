'use client';

import {
  Avatar,
  AvatarFallback,
  HStack,
  Stack,
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
  Text,
} from '@trycompai/design-system';
import { CheckIcon } from 'lucide-react';

export type Soc2StageValue = 'trust' | 'team' | 'evidence' | 'audit_ready';

export type Soc2Stage = {
  value: Soc2StageValue;
  title: string;
  timeframe: string;
  summary: string;
};

export const SOC2_STAGES: Soc2Stage[] = [
  {
    value: 'trust',
    title: 'Trust Center',
    timeframe: 'by May 16, 2025',
    summary: 'Enable Trust Center and configure frameworks so customers can track your status.',
  },
  {
    value: 'team',
    title: 'Team & Policies',
    timeframe: 'by Jun 30, 2025',
    summary: 'Add employees, publish policies, and get everyone trained and signing.',
  },
  {
    value: 'evidence',
    title: 'Evidence collection',
    timeframe: 'by Sep 15, 2025',
    summary: 'Start evidence collection and automate where possible to stay continuously compliant.',
  },
  {
    value: 'audit_ready',
    title: 'Audit ready',
    timeframe: 'Nov 12, 2025 - Nov 26, 2025',
    summary: 'Request an LOE if needed and schedule support — then you’re ready for audit handoff.',
  },
];

function StageIndicator({
  state,
  stepNumber,
}: {
  state: 'complete' | 'current' | 'upcoming';
  stepNumber: number;
}) {
  const style =
    state === 'complete'
      ? { backgroundColor: 'var(--color-success)', color: 'white' }
      : state === 'current'
        ? {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
          }
        : {
            backgroundColor: 'var(--color-muted)',
            color: 'var(--color-muted-foreground)',
          };

  return (
    <Avatar size="sm" aria-hidden>
      <AvatarFallback style={style}>
        {state === 'complete' ? <CheckIcon size={14} /> : stepNumber}
      </AvatarFallback>
    </Avatar>
  );
}

export function Soc2Timeline({ currentStage = 'team' }: { currentStage?: Soc2StageValue }) {
  return <Soc2TimelineControlled defaultValue={currentStage} />;
}

export function Soc2TimelineControlled({
  value,
  defaultValue = 'team',
  onValueChange,
  showDetails = true,
  completedStages,
}: {
  value?: Soc2StageValue;
  defaultValue?: Soc2StageValue;
  onValueChange?: (value: Soc2StageValue) => void;
  showDetails?: boolean;
  completedStages?: Partial<Record<Soc2StageValue, boolean>>;
}) {
  const resolvedValue = value ?? defaultValue;

  return (
    <Tabs
      defaultValue={value ? undefined : defaultValue}
      value={value}
      onValueChange={onValueChange as (value: string) => void}
    >
      <TabsList variant="underline">
        {SOC2_STAGES.map((stage, idx) => {
          const isCompleted = completedStages?.[stage.value] ?? false;
          const state: 'complete' | 'current' | 'upcoming' =
            isCompleted ? 'complete' : stage.value === resolvedValue ? 'current' : 'upcoming';

          return (
            <TabsTrigger key={stage.value} value={stage.value}>
              <HStack align="center" gap="sm">
                <StageIndicator state={state} stepNumber={idx + 1} />
                <Stack gap="none">
                  <Text size="sm" weight="medium">
                    {stage.title}
                  </Text>
                  <Text size="xs" variant="muted">
                    {stage.timeframe}
                  </Text>
                </Stack>
              </HStack>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {showDetails
        ? SOC2_STAGES.map((stage, idx) => {
            const isCompleted = completedStages?.[stage.value] ?? false;
            const state: 'complete' | 'current' | 'upcoming' =
              isCompleted ? 'complete' : stage.value === resolvedValue ? 'current' : 'upcoming';

            return (
              <TabsContent key={stage.value} value={stage.value}>
                <HStack justify="between" align="center">
                  <Text size="sm" variant="muted">
                    {stage.summary}
                  </Text>
                  <Text size="sm" variant="muted">
                    {state === 'complete'
                      ? 'Completed'
                      : state === 'current'
                        ? `Current phase • ${idx + 1} of ${SOC2_STAGES.length}`
                        : 'Upcoming'}
                  </Text>
                </HStack>
              </TabsContent>
            );
          })
        : null}
    </Tabs>
  );
}

