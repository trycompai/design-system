# Design System MCP Server

This app exposes the design system source code + Storybook stories over **MCP (Model Context Protocol)** so other apps/agents can query the library consistently.

## What this MCP provides

Tools (all read-only):

- `design_system_list_components`: list atoms/molecules/organisms source files
- `design_system_get_component_source`: fetch a component source file by id (ex: `molecules/card`)
- `design_system_search`: search component ids (and optionally component source)
- `design_system_list_stories`: list Storybook story files
- `design_system_get_story_source`: fetch story source by name (ex: `Card`)
- `design_system_suggest_story_for_component`: best-guess story name for a component id

## Run locally

From repo root:

```bash
pnpm -w --filter @comp/design-system-mcp dev
```

## Smoke test

```bash
pnpm -w --filter @comp/design-system-mcp smoke
```

## Use from another app (MCP client)

Any MCP client can spawn this server over stdio.

- **Recommended**: run from this repo (so it can read `packages/design-system/src` and `apps/storybook/stories`)
- **If running outside the repo**: set `DS_REPO_ROOT=/absolute/path/to/design-system-repo`

## Cursor config (example)

Add a server entry that runs the MCP server over stdio. Example (adjust to your setup):

```json
{
  "mcpServers": {
    "design-system": {
      "command": "pnpm",
      "args": ["-w", "--filter", "@comp/design-system-mcp", "dev"]
    }
  }
}
```

