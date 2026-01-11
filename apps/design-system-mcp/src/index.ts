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
    };
  }

  // appDir is .../apps/design-system-mcp/src
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
          name: "design_system_list_components",
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
          name: "design_system_get_component_source",
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
          name: "design_system_search",
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
          name: "design_system_list_stories",
          description: "List Storybook story files in apps/storybook/stories.",
          inputSchema: { type: "object", properties: {} },
        },
        {
          name: "design_system_get_story_source",
          description:
            "Fetch a Storybook story source by story name (e.g. 'Card' for Card.stories.tsx).",
          inputSchema: {
            type: "object",
            properties: { name: { type: "string" } },
            required: ["name"],
          },
        },
        {
          name: "design_system_suggest_story_for_component",
          description:
            "Best-guess the Storybook story name for a component id (e.g. molecules/card -> Card).",
          inputSchema: {
            type: "object",
            properties: { componentId: { type: "string" } },
            required: ["componentId"],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const name = request.params.name;
      const args = request.params.arguments ?? {};

      if (name === "design_system_list_components") {
        const { category } = zListComponentsArgs.parse(args);
        const components = await listDesignSystemComponents(repoPaths);
        const filtered = category
          ? components.filter((c) => c.category === category)
          : components;

        return { content: jsonText({ repoPaths, components: filtered }) };
      }

      if (name === "design_system_get_component_source") {
        const { id } = zGetComponentSourceArgs.parse(args);
        const components = await listDesignSystemComponents(repoPaths);
        const comp = components.find((c) => c.id.toLowerCase() === id.toLowerCase());
        if (!comp) {
          return {
            content: jsonText({
              error: `Component not found: ${id}`,
              hint: "Use design_system_list_components to see valid ids.",
            }),
          };
        }

        const source = await readTextFile(comp.filePath);
        return { content: jsonText({ component: comp, source }) };
      }

      if (name === "design_system_search") {
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

      if (name === "design_system_list_stories") {
        zListStoriesArgs.parse(args);
        const stories = await listStorybookStories(repoPaths);
        return { content: jsonText({ repoPaths, stories }) };
      }

      if (name === "design_system_get_story_source") {
        const { name: storyName } = zGetStorySourceArgs.parse(args);
        const story = await findStoryByName(repoPaths, storyName);
        if (!story) {
          return {
            content: jsonText({
              error: `Story not found: ${storyName}`,
              hint: "Use design_system_list_stories to see valid names.",
            }),
          };
        }
        const source = await readTextFile(story.filePath);
        return { content: jsonText({ story, source }) };
      }

      if (name === "design_system_suggest_story_for_component") {
        const { componentId } = zSuggestStoryForComponentArgs.parse(args);
        const components = await listDesignSystemComponents(repoPaths);
        const comp = components.find(
          (c) => c.id.toLowerCase() === componentId.toLowerCase(),
        );
        if (!comp) {
          return {
            content: jsonText({
              error: `Component not found: ${componentId}`,
              hint: "Use design_system_list_components to see valid ids.",
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

