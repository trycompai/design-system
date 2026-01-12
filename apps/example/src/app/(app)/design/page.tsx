'use client';

import {
  Badge,
  Button,
  Checkbox,
  Input,
  Kbd,
  Label,
  Progress,
  Separator,
  Slider,
  Spinner,
  Switch,
  Textarea,
  Toggle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@trycompai/design-system';
import { Bold, Italic, Underline, Plus, Settings } from 'lucide-react';

export default function DesignPage() {
  return (
    <div className="p-8 space-y-16 max-w-4xl">
      <header>
        <h1 className="text-2xl font-semibold">Design System</h1>
        <p className="text-muted-foreground">Theme testing & component inspection</p>
      </header>

      {/* Border Radius */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Border Radius Tokens</h2>
        <div className="flex gap-6 items-end">
          <div className="space-y-2 text-center">
            <div className="size-16 bg-primary rounded-sm" />
            <code className="text-xs text-muted-foreground block">sm</code>
          </div>
          <div className="space-y-2 text-center">
            <div className="size-16 bg-primary rounded-md" />
            <code className="text-xs text-muted-foreground block">md</code>
          </div>
          <div className="space-y-2 text-center">
            <div className="size-16 bg-primary rounded-lg" />
            <code className="text-xs text-muted-foreground block">lg</code>
          </div>
          <div className="space-y-2 text-center">
            <div className="size-16 bg-primary rounded-xl" />
            <code className="text-xs text-muted-foreground block">xl</code>
          </div>
        </div>
        <div className="p-4 bg-muted rounded-md font-mono text-xs space-y-1">
          <div>--radius-sm: calc(var(--radius) - 2px)</div>
          <div>--radius-md: calc(var(--radius) - 1px)</div>
          <div>--radius-lg: var(--radius)</div>
          <div>--radius-xl: calc(var(--radius) + 2px)</div>
        </div>
      </section>

      <Separator />

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Colors</h2>
        <div className="grid grid-cols-6 gap-3">
          <div className="space-y-2 text-center">
            <div className="h-12 bg-primary rounded-md" />
            <code className="text-xs text-muted-foreground">primary</code>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-12 bg-secondary rounded-md" />
            <code className="text-xs text-muted-foreground">secondary</code>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-12 bg-muted rounded-md" />
            <code className="text-xs text-muted-foreground">muted</code>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-12 bg-accent rounded-md" />
            <code className="text-xs text-muted-foreground">accent</code>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-12 bg-destructive rounded-md" />
            <code className="text-xs text-muted-foreground">destructive</code>
          </div>
          <div className="space-y-2 text-center">
            <div className="h-12 bg-border rounded-md border" />
            <code className="text-xs text-muted-foreground">border</code>
          </div>
        </div>
      </section>

      <Separator />

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Variants</p>
            <div className="flex gap-3 flex-wrap">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Sizes</p>
            <div className="flex gap-3 items-center flex-wrap">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">With Icons</p>
            <div className="flex gap-3 flex-wrap">
              <Button iconLeft={<Plus />}>Add Item</Button>
              <Button variant="outline" iconRight={<Settings />}>Settings</Button>
              <Button size="icon"><Plus /></Button>
              <Button size="icon" variant="outline"><Settings /></Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">States</p>
            <div className="flex gap-3 flex-wrap">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="flex gap-3 flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </section>

      <Separator />

      {/* Form Controls */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Form Controls</h2>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input">Input</Label>
              <Input id="input" placeholder="Type something..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Type more..." />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox id="checkbox" />
              <Label htmlFor="checkbox">Checkbox label</Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch id="switch" />
              <Label htmlFor="switch">Switch label</Label>
            </div>

            <div className="space-y-2">
              <Label>Slider</Label>
              <Slider defaultValue={[50]} max={100} />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Toggles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Toggle</h2>
        <div className="flex gap-2">
          <Toggle aria-label="Bold">
            <Bold className="size-4" />
          </Toggle>
          <Toggle aria-label="Italic">
            <Italic className="size-4" />
          </Toggle>
          <Toggle aria-label="Underline">
            <Underline className="size-4" />
          </Toggle>
        </div>
      </section>

      <Separator />

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Card</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content with some text.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Another Card</CardTitle>
              <CardDescription>With different content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button size="sm">Action</Button>
                <Button size="sm" variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Progress */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Progress</h2>
        <div className="space-y-3 max-w-md">
          <Progress value={25} />
          <Progress value={50} />
          <Progress value={75} />
        </div>
      </section>

      <Separator />

      {/* Kbd */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Keyboard</h2>
        <div className="flex items-center gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <span className="text-muted-foreground mx-2">or</span>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </div>
      </section>

      <Separator />

      {/* Loading States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Loading States</h2>
        <div className="flex items-center gap-6">
          <Spinner />
          <div className="space-y-2">
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </section>

      <Separator />

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Typography</h2>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Heading 1</h1>
          <h2 className="text-2xl font-semibold">Heading 2</h2>
          <h3 className="text-xl font-semibold">Heading 3</h3>
          <h4 className="text-lg font-semibold">Heading 4</h4>
          <p>Regular text paragraph</p>
          <p className="text-muted-foreground">Muted text</p>
          <p className="text-sm">Small text</p>
        </div>
      </section>
    </div>
  );
}
