'use client';

import {
  Alert,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Heading,
  HStack,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  PageHeader,
  PageLayout,
  Progress,
  Stack,
  Text,
} from '@trycompai/design-system';
import * as React from 'react';
import { ArrowRightIcon, CheckIcon, ExternalLinkIcon, PlayIcon } from 'lucide-react';

import {
  SOC2_STAGES,
  Soc2TimelineControlled,
  type Soc2StageValue,
} from '../../components/soc2-timeline';

type RoadmapTask = {
  title: string;
  description: string;
  estimate: string;
  actionLabel: string;
  actionHref?: string;
  actionKind: 'cta' | 'link' | 'video';
};

function estimateToMinutes(estimate: string): number {
  const lower = estimate.trim().toLowerCase();
  const hoursMatch = lower.match(/(\d+)\s*(h|hr|hrs|hour|hours)\b/);
  const minsMatch = lower.match(/(\d+)\s*(m|min|mins|minute|minutes)\b/);
  const hours = hoursMatch ? Number.parseInt(hoursMatch[1] ?? '0', 10) : 0;
  const mins = minsMatch ? Number.parseInt(minsMatch[1] ?? '0', 10) : 0;
  return hours * 60 + mins;
}

function formatMinutes(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return '0m';
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours <= 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

const STAGE_TASKS: Record<Soc2StageValue, RoadmapTask[]> = {
  trust: [
    {
      title: 'Enable Trust Center',
      description: 'Turn on the Trust Portal in Portal Settings',
      estimate: '5 min',
      actionLabel: 'Open settings',
      actionKind: 'link',
      actionHref: 'https://trycomp.ai/docs/trust-access',
    },
    {
      title: 'Configure compliance frameworks',
      description: 'Enable SOC 2 (and others) and set status to In Progress',
      estimate: '10 min',
      actionLabel: 'Configure frameworks',
      actionKind: 'cta',
    },
    {
      title: 'Set up your Trust Center URL',
      description: 'Add a vanity URL or custom domain, then go live',
      estimate: '10 min',
      actionLabel: 'Set URL',
      actionKind: 'cta',
    },
  ],
  team: [
    {
      title: 'Add all employees',
      description: 'Invite via People tab (manual or CSV upload)',
      estimate: '15 min',
      actionLabel: 'Add people',
      actionKind: 'cta',
    },
    {
      title: 'Publish policies',
      description: 'Publish all at once or review individually in Policies',
      estimate: '10 min',
      actionLabel: 'Publish policies',
      actionKind: 'cta',
    },
    {
      title: 'Kick off training & attestations',
      description: 'Employees sign policies and complete training',
      estimate: '5 min',
      actionLabel: 'Watch overview',
      actionKind: 'video',
    },
  ],
  evidence: [
    {
      title: 'Begin evidence collection',
      description: 'Start working through evidence tasks in Tasks tab',
      estimate: '30 min',
      actionLabel: 'Go to tasks',
      actionKind: 'cta',
    },
    {
      title: 'Review evidence gathering tips',
      description: 'Follow guidance and avoid common evidence pitfalls',
      estimate: '5 min',
      actionLabel: 'Read tips',
      actionKind: 'link',
    },
    {
      title: 'Set up automated evidence',
      description: 'Create automations for recurring evidence wherever possible',
      estimate: '20 min',
      actionLabel: 'Create automation',
      actionKind: 'cta',
    },
  ],
  audit_ready: [
    {
      title: 'Schedule a support call (optional)',
      description: 'Book time for a guided walkthrough if needed',
      estimate: '15 min',
      actionLabel: 'Schedule call',
      actionKind: 'link',
    },
    {
      title: 'Verify evidence coverage',
      description: 'Make sure required evidence is complete and current',
      estimate: '20 min',
      actionLabel: 'Review coverage',
      actionKind: 'cta',
    },
    {
      title: 'Finalize audit handoff',
      description: 'You’re ready to work with your auditor',
      estimate: '5 min',
      actionLabel: 'Mark ready',
      actionKind: 'cta',
    },
  ],
};

export default function OverviewPage() {
  const [stage, setStage] = React.useState<Soc2StageValue>(SOC2_STAGES[0]?.value ?? 'trust');

  const [taskState, setTaskState] = React.useState<Record<Soc2StageValue, boolean[]>>(() => {
    const initial = {} as Record<Soc2StageValue, boolean[]>;
    (Object.keys(STAGE_TASKS) as Soc2StageValue[]).forEach((key) => {
      initial[key] = STAGE_TASKS[key].map(() => false);
    });
    return initial;
  });

  const completedStages = React.useMemo(() => {
    const map: Partial<Record<Soc2StageValue, boolean>> = {};
    (Object.keys(STAGE_TASKS) as Soc2StageValue[]).forEach((key) => {
      map[key] = taskState[key]?.every(Boolean) ?? false;
    });
    return map;
  }, [taskState]);

  const totalTasks = React.useMemo(
    () => Object.values(STAGE_TASKS).reduce((acc, tasks) => acc + tasks.length, 0),
    [],
  );
  const completedTasks = React.useMemo(
    () => (Object.keys(STAGE_TASKS) as Soc2StageValue[]).reduce((acc, key) => acc + (taskState[key]?.filter(Boolean).length ?? 0), 0),
    [taskState],
  );
  const roadmapPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const remainingMinutes = React.useMemo(() => {
    let sum = 0;
    (Object.keys(STAGE_TASKS) as Soc2StageValue[]).forEach((key) => {
      const tasks = STAGE_TASKS[key];
      const state = taskState[key] ?? [];
      tasks.forEach((task, idx) => {
        if (!state[idx]) sum += estimateToMinutes(task.estimate);
      });
    });
    return sum;
  }, [taskState]);

  const stageMeta = SOC2_STAGES.find((s) => s.value === stage) ?? SOC2_STAGES[0];
  const tasks = STAGE_TASKS[stage];

  const stageIndex = Math.max(0, SOC2_STAGES.findIndex((s) => s.value === stage));
  const blockingStage = SOC2_STAGES.slice(0, stageIndex).find((s) => !completedStages[s.value]);
  const isLocked = Boolean(blockingStage);

  const completeTask = (taskIndex: number) => {
    setTaskState((prev) => {
      const next = { ...prev };
      const arr = [...(next[stage] ?? [])];
      arr[taskIndex] = true;
      next[stage] = arr;
      return next;
    });
  };

  return (
    <PageLayout padding="none" container={false}>
          <PageHeader title="Overview" />

      {/* Roadmap Summary + Phases */}
      <Stack gap="lg">
        <Card>
          <CardHeader>
            <Stack gap="md">
              <HStack justify="between" align="start">
                <Stack gap="xs">
                  <HStack align="center" gap="sm">
                    <Text size="sm" weight="medium">
                      SOC 2 Type II roadmap
                    </Text>
                    <Badge variant="secondary">On track</Badge>
                    <Badge variant="outline">Est. {formatMinutes(remainingMinutes)} remaining</Badge>
                  </HStack>
                  <Text size="sm" variant="muted">
                    Target audit window: Nov 12–Nov 26, 2025
                  </Text>
                </Stack>
                <Button variant="link" size="sm">
                  View details
                </Button>
              </HStack>

              <Stack gap="sm">
                <HStack justify="between" align="baseline">
                  <Text size="sm" variant="muted">
                    Roadmap completed
                  </Text>
                  <Text size="sm" weight="medium">
                    {roadmapPercent}%
                  </Text>
                </HStack>
                <Progress value={roadmapPercent} />
                <Text size="sm" variant="muted">
                  {completedTasks} of {totalTasks} tasks
                </Text>
              </Stack>
            </Stack>
          </CardHeader>
        </Card>

        <Stack gap="sm">
          <Soc2TimelineControlled
            value={stage}
            onValueChange={setStage}
            showDetails={false}
            completedStages={completedStages}
          />
        </Stack>

        <Stack gap="sm">
          {isLocked && (
            <Alert
              variant="warning"
              title="Complete the previous steps first"
              description={`You can preview “${stageMeta.title}”, but you’ll need to finish “${blockingStage?.title}” before you can check off these tasks.`}
            />
          )}

          <Card spacing="relaxed" disabled={isLocked}>
            <CardHeader>
              <Stack gap="sm">
                <HStack justify="between" align="center">
                  <Stack gap="xs">
                    <Heading level="3">{stageMeta.title}</Heading>
                  </Stack>
                </HStack>
                <Text size="sm" variant="muted">
                  {stageMeta.summary}
                </Text>
              </Stack>
            </CardHeader>

            <CardContent>
              <Stack gap="sm" aria-disabled={isLocked}>
                {tasks.map((task, idx) => {
                  const checked = taskState[stage]?.[idx] ?? false;
                  const actionIcon =
                    task.actionKind === 'video' ? (
                      <PlayIcon />
                    ) : task.actionKind === 'link' ? (
                      <ExternalLinkIcon />
                    ) : (
                      <ArrowRightIcon />
                    );

                  return (
                    <Item key={task.title} size="default" variant="outline">
                      <ItemMedia>
                        <Avatar size="sm" aria-hidden>
                          <AvatarFallback
                            style={
                              checked
                                ? { backgroundColor: 'var(--color-success)', color: 'white' }
                                : {
                                    backgroundColor: 'var(--color-muted)',
                                    color: 'var(--color-muted-foreground)',
                                  }
                            }
                          >
                            {checked ? <CheckIcon size={14} /> : idx + 1}
                          </AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>
                          <HStack align="center" gap="sm">
                            <span>{task.title}</span>
                            <Badge variant="outline">{task.estimate}</Badge>
                          </HStack>
                        </ItemTitle>
                        <ItemDescription>{task.description}</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        {checked ? (
                          <Badge variant="secondary">Done</Badge>
                        ) : (
                          <Button
                            variant={task.actionKind === 'link' ? 'outline' : 'default'}
                            iconRight={actionIcon}
                            onClick={() => {
                              if (task.actionHref) window.open(task.actionHref, '_blank', 'noopener,noreferrer');
                              completeTask(idx);
                            }}
                          >
                            {task.actionLabel}
                          </Button>
                        )}
                      </ItemActions>
                    </Item>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
