# @trycompai/design-system-mcp

MCP (Model Context Protocol) server for the `@trycompai/design-system` component library. Provides AI assistants like Claude Code, Cursor, and GitHub Copilot with access to component documentation, design tokens, and usage guidelines.

## Installation

### Claude Code

```bash
claude mcp add trycompai-design-system -- npx -y @trycompai/design-system-mcp
```

### Cursor / VS Code

Add to your `.cursor/mcp.json` or `.vscode/mcp.json`:

```json
{
  "mcpServers": {
    "trycompai-design-system": {
      "command": "npx",
      "args": ["-y", "@trycompai/design-system-mcp"]
    }
  }
}
```

### Environment Variable

If running outside the design-system repo, set `DS_REPO_ROOT` to point to the repo:

```bash
DS_REPO_ROOT=/path/to/design-system npx @trycompai/design-system-mcp
```

## Available Tools

### Component Documentation (Recommended for Agents)

| Tool | Description |
|------|-------------|
| `design_system_get_component_docs` | **RECOMMENDED** - Get comprehensive docs for a component including props, variants, and usage examples |
| `design_system_list_components` | List all component source files (atoms/molecules/organisms) |
| `design_system_get_component_source` | Fetch raw component source by id (e.g., `molecules/card`) |
| `design_system_search` | Search component ids and optionally source content |

### Usage Guidelines

| Tool | Description |
|------|-------------|
| `design_system_get_usage_guidelines` | Get usage rules - **IMPORTANT: Components do NOT accept className** |
| `design_system_installation` | Get framework-specific installation instructions |

### Design Tokens

| Tool | Description |
|------|-------------|
| `design_system_get_theme` | Get CSS variables and design tokens for light/dark mode |

### Storybook Stories

| Tool | Description |
|------|-------------|
| `design_system_list_stories` | List all Storybook story files |
| `design_system_get_story_source` | Fetch story source by name (e.g., `Card`) |
| `design_system_suggest_story_for_component` | Best-guess story name for a component id |

## Critical Usage Note

**Components do NOT accept `className` or `style` props.** Use variants and props only:

```tsx
// Will NOT compile
<Button className="bg-red-500">Delete</Button>

// Correct
<Button variant="destructive">Delete</Button>
```

For layout concerns, use wrapper elements:

```tsx
<div className="w-full">
  <Button>Full Width</Button>
</div>
```

## Development

From the design-system repo root:

```bash
# Run the MCP server
pnpm --filter @trycompai/design-system-mcp dev

# Run smoke test
pnpm --filter @trycompai/design-system-mcp smoke

# Build
pnpm --filter @trycompai/design-system-mcp build
```

## License

MIT
