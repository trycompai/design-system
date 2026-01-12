'use client';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageHeader,
  PageHeaderActions,
  PageLayout,
  Stack,
  Text,
} from '@trycompai/design-system';
import { Add, Calendar, Folder, UserMultiple } from '@carbon/icons-react';
import Link from 'next/link';

const projects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with new branding',
    status: 'In Progress',
    statusVariant: 'default' as const,
    members: 5,
    dueDate: 'Feb 15, 2024',
  },
  {
    id: '2',
    name: 'Mobile App v2.0',
    description: 'Major update to the mobile application with new features',
    status: 'On Track',
    statusVariant: 'secondary' as const,
    members: 8,
    dueDate: 'Mar 1, 2024',
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integration with third-party payment providers',
    status: 'At Risk',
    statusVariant: 'outline' as const,
    members: 3,
    dueDate: 'Jan 30, 2024',
  },
  {
    id: '4',
    name: 'Security Audit',
    description: 'Comprehensive security review and penetration testing',
    status: 'Completed',
    statusVariant: 'secondary' as const,
    members: 2,
    dueDate: 'Jan 10, 2024',
  },
  {
    id: '5',
    name: 'Data Migration',
    description: 'Migrate legacy data to new cloud infrastructure',
    status: 'Overdue',
    statusVariant: 'destructive' as const,
    members: 4,
    dueDate: 'Jan 5, 2024',
  },
  {
    id: '6',
    name: 'Design System',
    description: 'Build a comprehensive component library for the team',
    status: 'In Progress',
    statusVariant: 'default' as const,
    members: 3,
    dueDate: 'Apr 1, 2024',
  },
];

export default function ProjectsPage() {
  return (
    <PageLayout>
      <PageHeader title="Projects">
        <PageHeaderActions>
          <Button iconLeft={<Add size={16} />}>New Project</Button>
        </PageHeaderActions>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Folder size={20} className="text-primary" />
                    </div>
                    <Stack gap="1">
                      <CardTitle>{project.name}</CardTitle>
                    </Stack>
                  </div>
                  <Badge variant={project.statusVariant}>{project.status}</Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <UserMultiple size={16} />
                    <span>{project.members} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{project.dueDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
