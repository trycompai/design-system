# Storybook Component Usage Rules

## Core Principles

1. **Components do NOT accept `className`** - use variants and props only
2. **Never use `<div>` with padding/margin** - use layout components instead
3. **Only use design system components** - if something is missing, create a new component

The design system enforces strict styling through `class-variance-authority` (cva). Stories should demonstrate proper component composition using only design system primitives.

---

## ❌ NEVER Pass className to Components

Components in this design system do not accept `className`. This is intentional - all styling should come from component variants and props.

```tsx
// ❌ These will NOT compile - className is not a valid prop
<Button className="bg-red-500">Delete</Button>
<Card className="shadow-xl">Content</Card>
<Badge className="uppercase">Status</Badge>
<Stack className="mt-4">Content</Stack>
<Text className="text-center">Centered</Text>
```

```tsx
// ✅ Use component variants and props instead
<Button variant="destructive">Delete</Button>
<Card elevation="high">Content</Card>
<Badge variant="secondary">Status</Badge>
<Stack gap="4">Content</Stack>
<Text align="center">Centered</Text>
```

---

## ❌ NEVER Use Divs for Layout

Don't wrap components in divs with Tailwind classes for spacing or layout.

```tsx
// ❌ Don't do this
<div className="p-4">
  <Card>Content</Card>
</div>

<div className="mt-8 mb-4">
  <Heading>Title</Heading>
</div>

<div className="space-y-4">
  <Button>One</Button>
  <Button>Two</Button>
</div>

<div className="flex gap-4 items-center">
  <Avatar />
  <Text>Name</Text>
</div>

<div className="max-w-xl mx-auto">
  <Card>Centered content</Card>
</div>
```

## ✅ ALWAYS Use Design System Components

```tsx
// Use Stack for vertical/horizontal spacing
<Stack gap="4">
  <Button>One</Button>
  <Button>Two</Button>
</Stack>

// Use HStack for horizontal layouts
<HStack gap="4" align="center">
  <Avatar />
  <Text>Name</Text>
</HStack>

// Use PageLayout for page-level structure
<PageLayout padding="default">
  <Heading>Title</Heading>
  <Card>Content</Card>
</PageLayout>

// Use PageLayout with container for centered max-width content
<PageLayout maxWidth="xl">
  <Card>Centered content</Card>
</PageLayout>

// Use PageLayout without container for full-width
<PageLayout container={false}>
  <div className="grid grid-cols-4 gap-4">
    {items.map(item => <Card key={item.id}>{item.name}</Card>)}
  </div>
</PageLayout>

// Use Container for max-width sections
<Container size="lg">
  <Card>Content</Card>
</Container>
```

## Layout Component Reference

### Stack & HStack

For spacing between elements:

```tsx
<Stack gap="xs">      // 4px
<Stack gap="sm">      // 8px
<Stack gap="md">      // 12px
<Stack gap="lg">      // 16px
<Stack gap="xl">      // 24px
<Stack gap="2xl">     // 32px
<Stack gap="3xl">     // 48px

// Numeric gaps also work
<Stack gap="4">       // Tailwind's gap-4 (16px)
<Stack gap="6">       // Tailwind's gap-6 (24px)

// Alignment
<Stack align="start" | "center" | "end" | "stretch">
<Stack justify="start" | "center" | "end" | "between">

// Horizontal stack shorthand
<HStack gap="4" align="center">
```

### PageLayout

For page-level structure:

```tsx
// Default: centered container with max-width (1024px)
<PageLayout>
  {content}
</PageLayout>

// Full-width for dashboards
<PageLayout container={false}>
  {content}
</PageLayout>

// Custom max-width
<PageLayout maxWidth="sm" | "md" | "lg" | "xl" | "2xl">
  {content}
</PageLayout>

// Centered auth-style pages
<PageLayout variant="center">
  <Card>Login form</Card>
</PageLayout>

// Control padding
<PageLayout padding="none" | "sm" | "default" | "lg">
```

### Container

For max-width sections within a page:

```tsx
<Container size="sm" | "md" | "lg" | "xl" | "2xl" | "full">
<Container padding="none" | "sm" | "default" | "lg">
```

### Grid

For grid layouts:

```tsx
<Grid cols={1 | 2 | 3 | 4 | 6 | 12} gap="4">
  {children}
</Grid>
```

## When Divs ARE Acceptable (Rare Cases)

Only use raw `<div>` when absolutely necessary:

1. **Complex CSS Grid layouts** (when Grid component doesn't fit):

   ```tsx
   <div className="grid grid-cols-4 gap-4">
     {items.map(...)}
   </div>
   ```

2. **Positioning contexts** (absolute/relative):
   ```tsx
   <div className="relative">
     <Card />
     <div className="absolute top-0 right-0">
       <Badge>New</Badge>
     </div>
   </div>
   ```

**If you find yourself reaching for a div often for the same pattern, that's a signal to create a new design system component.**

## Story Structure Pattern

```tsx
export const MyStory: Story = {
  render: () => (
    <PageLayout>
      <PageHeader title="Page Title">
        <PageHeaderDescription>Description</PageHeaderDescription>
        <PageHeaderActions>
          <Button>Action</Button>
        </PageHeaderActions>
      </PageHeader>
      <Stack gap="6">
        <Card>
          <CardContent>
            <Stack gap="4">{/* Content */}</Stack>
          </CardContent>
        </Card>
      </Stack>
    </PageLayout>
  ),
};
```

## If a Prop or Variant Doesn't Exist

**Do NOT work around it with className or wrapper divs.** Instead:

1. **Check the component file** - the prop might exist and you missed it
2. **Add a new variant/prop** to the component's `cva` definition in the design system
3. **Create a new component** if it's a genuinely new pattern

```tsx
// Example: Need centered text but Text doesn't have align prop?
// ❌ Don't do this
<div className="text-center">
  <Text>Centered</Text>
</div>

// ✅ Add the prop to the Text component in the design system
// Then use it properly
<Text align="center">Centered</Text>
```

```tsx
// Example: Adding a variant to a component
// In packages/design-system/src/components/atoms/text.tsx
const textVariants = cva('...', {
  variants: {
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    // ... other variants
  },
});
```

**The goal is zero escape hatches. If you need something, build it into the system.**

---

## Import All From Design System

```tsx
import {
  // Layout
  Stack,
  HStack,
  VStack,
  Grid,
  Container,
  PageLayout,

  // Page structure
  PageHeader,
  PageHeaderDescription,
  PageHeaderActions,
  Section,
  SectionHeader,
  SectionTitle,
  SectionContent,

  // Components
  Card,
  CardHeader,
  CardContent,
  Button,
  Text,
  Heading,
  // ... etc
} from '@trycompai/design-system';
```

---

## Summary

| Need                  | Solution                                                     |
| --------------------- | ------------------------------------------------------------ |
| Spacing between items | `<Stack gap="4">` or `<HStack gap="4">`                      |
| Page structure        | `<PageLayout>` with `container`, `maxWidth`, `padding` props |
| Centered content      | `<PageLayout maxWidth="lg">` or `<Container size="lg">`      |
| Full-width layout     | `<PageLayout container={false}>`                             |
| Grid layout           | `<Grid cols={3} gap="4">`                                    |
| Text styling          | `<Text size="sm" variant="muted" weight="bold">`             |
| Component styling     | Use component's variant/size props                           |
| Missing prop          | Add it to the design system component                        |
| New pattern           | Create a new design system component                         |
