#!/usr/bin/env node
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

import { readTextFile } from "./fs-utils.js";
import {
  bestGuessStoryNameFromComponentFileStem,
  listDesignSystemComponents,
} from "./design-system-index.js";
import { listStorybookStories, findStoryByName } from "./storybook-index.js";
import { getRepoPaths } from "./paths.js";

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Parse component source to extract structured documentation
 */
function parseComponentDocs(source: string, componentId: string) {
  const docs: {
    id: string;
    exports: string[];
    props: Array<{
      name: string;
      interface: string;
      properties: Array<{ name: string; type: string; optional: boolean; description?: string }>;
    }>;
    variants: Array<{
      component: string;
      variantName: string;
      options: string[];
    }>;
    hasClassName: boolean;
  } = {
    id: componentId,
    exports: [],
    props: [],
    variants: [],
    hasClassName: false,
  };

  // Extract exported function/const names (including forwardRef)
  const exportMatches = source.matchAll(/(?:export\s+)?const\s+(\w+)\s*=\s*(?:React\.)?forwardRef/g);
  for (const match of exportMatches) {
    if (match[1]) {
      docs.exports.push(match[1]);
    }
  }

  // Also get regular exports
  const regularExportMatches = source.matchAll(/export\s+(?:function|const)\s+(\w+)(?!\s*=\s*(?:React\.)?forwardRef)/g);
  for (const match of regularExportMatches) {
    if (match[1] && !match[1].includes('Variants') && !docs.exports.includes(match[1])) {
      docs.exports.push(match[1]);
    }
  }

  // Extract type Props (e.g., type ButtonProps = ...)
  const typePropsMatches = source.matchAll(/type\s+(\w+Props)\s*=\s*[^&]*&\s*\{([^}]+)\}/gs);
  for (const match of typePropsMatches) {
    const typeName = match[1];
    const body = match[2];
    if (!typeName || !body) continue;

    const properties: Array<{ name: string; type: string; optional: boolean; description?: string }> = [];

    // Parse JSDoc comments and properties
    const lines = body.split('\n');
    let currentComment = '';

    for (const line of lines) {
      // Match JSDoc style comments
      const commentMatch = line.match(/\/\*\*\s*(.+?)\s*\*\//);
      if (commentMatch) {
        currentComment = commentMatch[1] || '';
        continue;
      }

      // Match property definitions
      const propMatch = line.match(/^\s*(\w+)(\?)?:\s*(.+?);?\s*$/);
      if (propMatch) {
        const propName = propMatch[1];
        const optional = propMatch[2] === '?';
        const propType = propMatch[3]?.trim().replace(/;$/, '') || 'unknown';

        if (propName && propName !== 'children') {
          properties.push({
            name: propName,
            type: propType,
            optional,
            description: currentComment || undefined,
          });
        }
        currentComment = '';
      }
    }

    if (properties.length > 0) {
      docs.props.push({
        name: typeName.replace('Props', ''),
        interface: typeName,
        properties,
      });
    }
  }

  // Extract CVA variants - improved regex that handles nested objects
  const cvaMatch = source.match(/const\s+(\w+Variants)\s*=\s*cva\s*\(\s*(?:"[^"]*"|'[^']*'|`[^`]*`|\[[^\]]*\])\s*,\s*\{[\s\S]*?variants:\s*\{([\s\S]*?)\}\s*,\s*defaultVariants/);
  if (cvaMatch) {
    const variantName = cvaMatch[1];
    const variantsBlock = cvaMatch[2];

    if (variantName && variantsBlock) {
      // Extract each variant category by finding top-level keys
      // Match pattern: "variantName: {" at the start of a line (with indentation)
      const categoryMatches = variantsBlock.matchAll(/^\s{6}(\w+):\s*\{/gm);

      for (const catMatch of categoryMatches) {
        const categoryName = catMatch[1];
        if (!categoryName) continue;

        // Find the content of this category by looking for keys at the next indent level
        const categoryRegex = new RegExp(`${categoryName}:\\s*\\{([\\s\\S]*?)^\\s{6}\\}`, 'm');
        const categoryContent = variantsBlock.match(categoryRegex);

        if (categoryContent && categoryContent[1]) {
          const options: string[] = [];
          // Extract option names (keys with values)
          const optionMatches = categoryContent[1].matchAll(/^\s+['"]?(\w+(?:-\w+)*)['"]?:/gm);
          for (const optMatch of optionMatches) {
            if (optMatch[1]) {
              options.push(optMatch[1]);
            }
          }

          if (options.length > 0) {
            docs.variants.push({
              component: variantName.replace('Variants', ''),
              variantName: categoryName,
              options,
            });
          }
        }
      }
    }
  }

  // Check if className is in any props (it shouldn't be!)
  docs.hasClassName = source.includes('className?:') || source.includes('className:');

  return docs;
}

/**
 * Generate agent-friendly documentation for a component
 */
function formatComponentDocsForAgent(
  docs: ReturnType<typeof parseComponentDocs>,
  storySource: string | null,
  componentSource: string
): string {
  let output = `# ${docs.exports[0] || docs.id} Component\n\n`;

  // Critical warning
  output += `## CRITICAL: No className Prop\n`;
  output += `This component does NOT accept \`className\` or \`style\` props. Use variants and props only.\n\n`;

  // Exported components
  if (docs.exports.length > 0) {
    output += `## Exports\n`;
    output += docs.exports.map(e => `- \`${e}\``).join('\n') + '\n\n';
  }

  // Variants (most important for agents)
  if (docs.variants.length > 0) {
    output += `## Available Variants\n`;
    for (const v of docs.variants) {
      output += `### ${v.component} - ${v.variantName}\n`;
      output += `Options: ${v.options.map(o => `\`${o}\``).join(', ')}\n\n`;
    }
  }

  // Props
  if (docs.props.length > 0) {
    output += `## Props\n`;
    for (const p of docs.props) {
      output += `### ${p.interface}\n`;
      if (p.properties.length > 0) {
        output += '| Prop | Type | Required | Description |\n';
        output += '|------|------|----------|-------------|\n';
        for (const prop of p.properties) {
          output += `| ${prop.name} | \`${prop.type}\` | ${prop.optional ? 'No' : 'Yes'} | ${prop.description || '-'} |\n`;
        }
        output += '\n';
      }
    }
  }

  // Usage example from story
  if (storySource) {
    // Extract a simple usage example from the story
    const storyMatch = storySource.match(/export\s+const\s+\w+:\s*Story\s*=\s*\{[\s\S]*?render:\s*\([^)]*\)\s*=>\s*\(([\s\S]*?)\),?\s*\}/);
    if (storyMatch && storyMatch[1]) {
      output += `## Usage Example\n\`\`\`tsx\n${storyMatch[1].trim()}\n\`\`\`\n\n`;
    }
  }

  // Quick example based on variants
  if (docs.variants.length > 0) {
    output += `## Quick Examples\n\`\`\`tsx\n`;
    const mainExport = docs.exports[0] || 'Component';
    for (const v of docs.variants.slice(0, 2)) {
      output += `<${mainExport} ${v.variantName}="${v.options[0]}">${mainExport}</${mainExport}>\n`;
    }
    output += `\`\`\`\n`;
  }

  return output;
}

/**
 * Parse CSS variables from globals.css into structured design tokens
 */
function parseDesignTokens(cssSource: string) {
  const tokens: {
    light: Record<string, string>;
    dark: Record<string, string>;
    tailwindTheme: Record<string, string>;
  } = {
    light: {},
    dark: {},
    tailwindTheme: {},
  };

  // Parse :root variables (light mode)
  const rootMatch = cssSource.match(/:root\s*\{([^}]+)\}/);
  if (rootMatch && rootMatch[1]) {
    const vars = rootMatch[1].matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi);
    for (const match of vars) {
      const name = match[1];
      const value = match[2];
      if (name && value) {
        tokens.light[name] = value.trim();
      }
    }
  }

  // Parse .dark variables
  const darkMatch = cssSource.match(/\.dark\s*\{([^}]+)\}/);
  if (darkMatch && darkMatch[1]) {
    const vars = darkMatch[1].matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi);
    for (const match of vars) {
      const name = match[1];
      const value = match[2];
      if (name && value) {
        tokens.dark[name] = value.trim();
      }
    }
  }

  // Parse @theme inline variables
  const themeMatch = cssSource.match(/@theme\s+inline\s*\{([^}]+)\}/);
  if (themeMatch && themeMatch[1]) {
    const vars = themeMatch[1].matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi);
    for (const match of vars) {
      const name = match[1];
      const value = match[2];
      if (name && value) {
        tokens.tailwindTheme[name] = value.trim();
      }
    }
  }

  return tokens;
}

/**
 * Get installation instructions for different frameworks
 */
function getInstallationInstructions(framework: string) {
  const baseSteps = [
    {
      title: "Install the package",
      command: "pnpm add @trycompai/design-system",
    },
    {
      title: "Import global styles",
      description: "Add this import to your root layout or entry file:",
      code: `import '@trycompai/design-system/styles/globals.css';`,
    },
  ];

  const frameworkMap: Record<string, { framework: string; steps: Array<{ title: string; description?: string; command?: string; code?: string; file?: string }> }> = {
    "next-app": {
      framework: "Next.js App Router",
      steps: [
        ...baseSteps,
        {
          title: "Setup root layout",
          file: "app/layout.tsx",
          code: `import '@trycompai/design-system/styles/globals.css';
import { cn } from '@trycompai/design-system';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        {children}
      </body>
    </html>
  );
}`,
        },
      ],
    },
    "next-pages": {
      framework: "Next.js Pages Router",
      steps: [
        ...baseSteps,
        {
          title: "Setup _app.tsx",
          file: "pages/_app.tsx",
          code: `import '@trycompai/design-system/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}`,
        },
      ],
    },
    vite: {
      framework: "Vite + React",
      steps: [
        ...baseSteps,
        {
          title: "Setup main.tsx",
          file: "src/main.tsx",
          code: `import '@trycompai/design-system/styles/globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        },
      ],
    },
    general: {
      framework: "General",
      steps: [
        ...baseSteps,
        {
          title: "Import styles in your entry file",
          description: "Make sure globals.css is imported before any component usage.",
        },
        {
          title: "Use components",
          code: `import { Button, Card, Stack, Text } from '@trycompai/design-system';

// IMPORTANT: Components do NOT accept className
// Use variants and props only
<Button variant="primary" size="lg">Click me</Button>
<Card maxWidth="md">Content</Card>
<Stack gap="4" align="center">...</Stack>`,
        },
      ],
    },
  };

  return frameworkMap[framework] || frameworkMap.general;
}

function getAppDir() {
  return path.dirname(fileURLToPath(import.meta.url));
}

function getRepoRootOverrideOrNull() {
  const v = process.env.DS_REPO_ROOT?.trim();
  if (!v) return null;
  return path.resolve(v);
}

function getRepoPathsResolved() {
  const repoRootOverride = getRepoRootOverrideOrNull();
  if (repoRootOverride) {
    return {
      repoRoot: repoRootOverride,
      designSystemSrcComponentsDir: path.join(
        repoRootOverride,
        "packages",
        "design-system",
        "src",
        "components",
      ),
      storybookStoriesDir: path.join(repoRootOverride, "apps", "storybook", "stories"),
      globalsStylesPath: path.join(
        repoRootOverride,
        "packages",
        "design-system",
        "src",
        "styles",
        "globals.css",
      ),
      agentsMdPath: path.join(repoRootOverride, "packages", "design-system", "agents.md"),
      claudeMdPath: path.join(repoRootOverride, "CLAUDE.md"),
    };
  }

  // appDir is .../apps/mcp/src
  return getRepoPaths(path.join(getAppDir(), ".."));
}

const zListComponentsArgs = z.object({
  category: z.enum(["atoms", "molecules", "organisms"]).optional(),
});

const zGetComponentSourceArgs = z.object({
  id: z.string().min(1),
});

const zSearchArgs = z.object({
  query: z.string().min(1),
  limit: z.number().int().min(1).max(50).optional().default(20),
  includeSource: z.boolean().optional().default(false),
});

const zListStoriesArgs = z.object({});
const zGetStorySourceArgs = z.object({
  name: z.string().min(1),
});

const zSuggestStoryForComponentArgs = z.object({
  componentId: z.string().min(1),
});

function jsonText(payload: unknown) {
  return [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }];
}

async function main() {
  const repoPaths = getRepoPathsResolved();

  const server = new Server(
    { name: "design-system-mcp", version: "0.1.0" },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "list_components",
          description:
            "List all design system component source files (atoms/molecules/organisms).",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                enum: ["atoms", "molecules", "organisms"],
                description: "Optional filter.",
              },
            },
          },
        },
        {
          name: "get_component_source",
          description:
            "Fetch the source for a design system component by id (e.g. 'molecules/card').",
          inputSchema: {
            type: "object",
            properties: {
              id: { type: "string" },
            },
            required: ["id"],
          },
        },
        {
          name: "search",
          description:
            "Search component ids (and optionally component source) for a query string.",
          inputSchema: {
            type: "object",
            properties: {
              query: { type: "string" },
              limit: { type: "number", minimum: 1, maximum: 50 },
              includeSource: {
                type: "boolean",
                description: "If true, searches within file contents too (slower).",
              },
            },
            required: ["query"],
          },
        },
        {
          name: "list_stories",
          description: "List Storybook story files in apps/storybook/stories.",
          inputSchema: { type: "object", properties: {} },
        },
        {
          name: "get_story_source",
          description:
            "Fetch a Storybook story source by story name (e.g. 'Card' for Card.stories.tsx).",
          inputSchema: {
            type: "object",
            properties: { name: { type: "string" } },
            required: ["name"],
          },
        },
        {
          name: "suggest_story_for_component",
          description:
            "Best-guess the Storybook story name for a component id (e.g. molecules/card -> Card).",
          inputSchema: {
            type: "object",
            properties: { componentId: { type: "string" } },
            required: ["componentId"],
          },
        },
        {
          name: "get_theme",
          description:
            "Get the design system theme including CSS variables, color tokens, and design tokens for light/dark mode. Returns parsed tokens from globals.css.",
          inputSchema: { type: "object", properties: {} },
        },
        {
          name: "get_usage_guidelines",
          description:
            "Get the usage guidelines and rules for the design system. IMPORTANT: Components do NOT accept className - use variants and props only. This returns the agents.md file with all usage patterns.",
          inputSchema: { type: "object", properties: {} },
        },
        {
          name: "installation",
          description:
            "Get installation and setup instructions for using the design system in a project.",
          inputSchema: {
            type: "object",
            properties: {
              framework: {
                type: "string",
                enum: ["next-app", "next-pages", "vite", "general"],
                description: "The framework you're using.",
              },
            },
          },
        },
        {
          name: "get_component_docs",
          description:
            "Get comprehensive documentation for a component including props, variants, and usage examples. THIS IS THE RECOMMENDED TOOL for understanding how to use a component. CRITICAL: Components do NOT accept className - use variants only.",
          inputSchema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Component id (e.g., 'atoms/button', 'molecules/card'). Use list_components to see all available ids.",
              },
            },
            required: ["id"],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const name = request.params.name;
      const args = request.params.arguments ?? {};

      if (name === "list_components") {
        const { category } = zListComponentsArgs.parse(args);
        const components = await listDesignSystemComponents(repoPaths);
        const filtered = category
          ? components.filter((c) => c.category === category)
          : components;

        return { content: jsonText({ repoPaths, components: filtered }) };
      }

      if (name === "get_component_source") {
        const { id } = zGetComponentSourceArgs.parse(args);
        const components = await listDesignSystemComponents(repoPaths);
        const comp = components.find((c) => c.id.toLowerCase() === id.toLowerCase());
        if (!comp) {
          return {
            content: jsonText({
              error: `Component not found: ${id}`,
              hint: "Use list_components to see valid ids.",
            }),
          };
        }

        const source = await readTextFile(comp.filePath);
        return { content: jsonText({ component: comp, source }) };
      }

      if (name === "search") {
        const { query, limit, includeSource } = zSearchArgs.parse(args);
        const q = query.toLowerCase();

        const components = await listDesignSystemComponents(repoPaths);
        const hits: Array<
          | { kind: "component"; id: string; filePath: string; match: "id" | "source" }
          | { kind: "story"; name: string; filePath: string; match: "name" }
        > = [];

        for (const c of components) {
          if (c.id.toLowerCase().includes(q) || c.fileStem.toLowerCase().includes(q)) {
            hits.push({ kind: "component", id: c.id, filePath: c.filePath, match: "id" });
            if (hits.length >= limit) break;
          }

          if (includeSource) {
            const source = await readTextFile(c.filePath);
            if (source.toLowerCase().includes(q)) {
              hits.push({
                kind: "component",
                id: c.id,
                filePath: c.filePath,
                match: "source",
              });
              if (hits.length >= limit) break;
            }
          }
        }

        if (hits.length < limit) {
          const stories = await listStorybookStories(repoPaths);
          for (const s of stories) {
            if (s.name.toLowerCase().includes(q)) {
              hits.push({ kind: "story", name: s.name, filePath: s.filePath, match: "name" });
              if (hits.length >= limit) break;
            }
          }
        }

        return { content: jsonText({ query, limit, hits }) };
      }

      if (name === "list_stories") {
        zListStoriesArgs.parse(args);
        const stories = await listStorybookStories(repoPaths);
        return { content: jsonText({ repoPaths, stories }) };
      }

      if (name === "get_story_source") {
        const { name: storyName } = zGetStorySourceArgs.parse(args);
        const story = await findStoryByName(repoPaths, storyName);
        if (!story) {
          return {
            content: jsonText({
              error: `Story not found: ${storyName}`,
              hint: "Use list_stories to see valid names.",
            }),
          };
        }
        const source = await readTextFile(story.filePath);
        return { content: jsonText({ story, source }) };
      }

      if (name === "suggest_story_for_component") {
        const { componentId } = zSuggestStoryForComponentArgs.parse(args);
        const components = await listDesignSystemComponents(repoPaths);
        const comp = components.find(
          (c) => c.id.toLowerCase() === componentId.toLowerCase(),
        );
        if (!comp) {
          return {
            content: jsonText({
              error: `Component not found: ${componentId}`,
              hint: "Use list_components to see valid ids.",
            }),
          };
        }

        const suggested = bestGuessStoryNameFromComponentFileStem(comp.fileStem);
        const story = await findStoryByName(repoPaths, suggested);

        return {
          content: jsonText({
            componentId: comp.id,
            suggestedStoryName: suggested,
            exists: Boolean(story),
            story,
          }),
        };
      }

      if (name === "get_theme") {
        const cssSource = await readTextFile(repoPaths.globalsStylesPath);
        const tokens = parseDesignTokens(cssSource);
        return {
          content: [
            {
              type: "text" as const,
              text: `Design System Theme Tokens

Use these semantic tokens for consistent theming. The design system uses Tailwind CSS v4 with CSS variables.

Key token categories:
- colors: background, foreground, primary, secondary, muted, accent, destructive, success, warning, info
- semantic variants: Each color has a foreground variant (e.g., primary-foreground) for text on that background
- chart colors: chart-1 through chart-5 for data visualization
- sidebar: sidebar-specific colors for app shells
- radius: border radius tokens (sm, md, lg, xl)

Dark mode is handled automatically via .dark class selector.`,
            },
            { type: "text" as const, text: JSON.stringify(tokens, null, 2) },
          ],
        };
      }

      if (name === "get_usage_guidelines") {
        const agentsMd = await readTextFile(repoPaths.agentsMdPath);
        return {
          content: [
            {
              type: "text" as const,
              text: `CRITICAL: Components do NOT accept className or style props. Use variants and props only.

This design system enforces strict styling through class-variance-authority (cva). For layout concerns (width, margins, grid positioning), use wrapper elements.

Below are the complete usage guidelines:`,
            },
            { type: "text" as const, text: agentsMd },
          ],
        };
      }

      if (name === "installation") {
        const framework = (args as { framework?: string }).framework || "general";
        const instructions = getInstallationInstructions(framework);
        return { content: jsonText(instructions) };
      }

      if (name === "get_component_docs") {
        const { id } = zGetComponentSourceArgs.parse(args);
        const components = await listDesignSystemComponents(repoPaths);
        const comp = components.find((c) => c.id.toLowerCase() === id.toLowerCase());

        if (!comp) {
          return {
            content: jsonText({
              error: `Component not found: ${id}`,
              hint: "Use list_components to see valid ids.",
              availableComponents: components.map(c => c.id),
            }),
          };
        }

        // Get component source
        const componentSource = await readTextFile(comp.filePath);

        // Parse structured docs from source
        const parsedDocs = parseComponentDocs(componentSource, comp.id);

        // Try to get associated story for examples
        const suggestedStoryName = bestGuessStoryNameFromComponentFileStem(comp.fileStem);
        const story = await findStoryByName(repoPaths, suggestedStoryName);
        let storySource: string | null = null;
        if (story) {
          storySource = await readTextFile(story.filePath);
        }

        // Format for agent consumption
        const formattedDocs = formatComponentDocsForAgent(parsedDocs, storySource, componentSource);

        return {
          content: [
            { type: "text" as const, text: formattedDocs },
            {
              type: "text" as const,
              text: JSON.stringify({
                componentId: comp.id,
                category: comp.category,
                exports: parsedDocs.exports,
                variants: parsedDocs.variants,
                props: parsedDocs.props,
                hasStory: Boolean(story),
                storyName: story?.name,
              }, null, 2),
            },
          ],
        };
      }

      return {
        content: jsonText({
          error: `Unknown tool: ${name}`,
        }),
      };
    } catch (err) {
      return {
        content: jsonText({
          error: err instanceof Error ? err.message : String(err),
        }),
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// eslint-disable-next-line no-void
void main();

