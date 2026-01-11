'use client';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  HStack,
  Stack,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@trycompai/design-system';
import { ArrowLeft, Calendar, CheckmarkFilled, CircleFilled, UserMultiple } from '@carbon/icons-react';
import Link from 'next/link';
import { use } from 'react';

const projectData = {
  '1': { name: 'Website Redesign', status: 'In Progress', members: 5, dueDate: 'Feb 15, 2024' },
  '2': { name: 'Mobile App v2.0', status: 'On Track', members: 8, dueDate: 'Mar 1, 2024' },
  '3': { name: 'API Integration', status: 'At Risk', members: 3, dueDate: 'Jan 30, 2024' },
  '4': { name: 'Security Audit', status: 'Completed', members: 2, dueDate: 'Jan 10, 2024' },
  '5': { name: 'Data Migration', status: 'Overdue', members: 4, dueDate: 'Jan 5, 2024' },
  '6': { name: 'Design System', status: 'In Progress', members: 3, dueDate: 'Apr 1, 2024' },
};

const tasks = [
  { id: 1, title: 'Setup project repository', completed: true },
  { id: 2, title: 'Create wireframes', completed: true },
  { id: 3, title: 'Design homepage mockup', completed: true },
  { id: 4, title: 'Implement responsive navigation', completed: false },
  { id: 5, title: 'Build component library', completed: false },
  { id: 6, title: 'User testing', completed: false },
];

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = projectData[id as keyof typeof projectData] || projectData['1'];

  return (
    <Stack gap="6">
      <HStack gap="4" align="center">
        <Link href="/projects">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <Stack gap="1">
          <Heading level="1">{project.name}</Heading>
          <HStack gap="4">
            <Badge>{project.status}</Badge>
            <HStack gap="1" align="center">
              <UserMultiple size={16} className="text-muted-foreground" />
              <Text variant="muted" size="sm">{project.members} members</Text>
            </HStack>
            <HStack gap="1" align="center">
              <Calendar size={16} className="text-muted-foreground" />
              <Text variant="muted" size="sm">Due {project.dueDate}</Text>
            </HStack>
          </HStack>
        </Stack>
      </HStack>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Overall completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap="4">
                  <div className="flex items-center justify-between">
                    <Text>Tasks Completed</Text>
                    <Text weight="semibold">3 / 6</Text>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '50%' }} />
                  </div>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap="3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500" />
                    <Text size="sm">Design mockup approved</Text>
                    <Text variant="muted" size="sm">2h ago</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    <Text size="sm">New file uploaded</Text>
                    <Text variant="muted" size="sm">4h ago</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-yellow-500" />
                    <Text size="sm">Comment added</Text>
                    <Text variant="muted" size="sm">1d ago</Text>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>Track project tasks and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50"
                  >
                    {task.completed ? (
                      <CheckmarkFilled size={20} className="text-green-600" />
                    ) : (
                      <CircleFilled size={20} className="text-muted-foreground" />
                    )}
                    <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardContent>
              <div className="py-8 text-center">
                <Text variant="muted">No files uploaded yet</Text>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>Manage project configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="muted">Settings coming soon...</Text>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Stack>
  );
}
