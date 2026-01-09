'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  Heading,
  Stack,
  Text,
} from '@trycompai/design-system';
import { MailIcon, PlusIcon } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'Developer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'online',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    email: 'emma@example.com',
    role: 'Designer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'away',
  },
  {
    id: 4,
    name: 'James Rodriguez',
    email: 'james@example.com',
    role: 'Developer',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'offline',
  },
  {
    id: 5,
    name: 'Lisa Park',
    email: 'lisa@example.com',
    role: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'online',
  },
  {
    id: 6,
    name: 'David Kim',
    email: 'david@example.com',
    role: 'Developer',
    avatar: 'https://i.pravatar.cc/150?img=6',
    status: 'offline',
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'away':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-400';
  }
}

function getRoleBadgeVariant(role: string) {
  switch (role) {
    case 'Admin':
      return 'default' as const;
    case 'Developer':
      return 'secondary' as const;
    case 'Designer':
      return 'outline' as const;
    default:
      return 'secondary' as const;
  }
}

export default function TeamPage() {
  return (
    <Stack gap="6">
      <div className="flex items-center justify-between">
        <Stack gap="1">
          <Heading level="1">Team</Heading>
          <Text variant="muted">Manage your team members and their roles.</Text>
        </Stack>
        <Button>
          <PlusIcon />
          Invite Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent>
              <div className="flex items-start gap-4 pt-6">
                <div className="relative">
                  <Avatar size="lg">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                  />
                </div>
                <Stack gap="1">
                  <div className="flex items-center gap-2">
                    <Text weight="semibold">{member.name}</Text>
                    <Badge variant={getRoleBadgeVariant(member.role)}>
                      {member.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MailIcon className="size-3" />
                    <Text size="sm" variant="muted">
                      {member.email}
                    </Text>
                  </div>
                </Stack>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Stack>
  );
}
