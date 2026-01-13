import path from "node:path";

export function repoRootFromAppDir(appDir: string) {
  // apps/design-system-mcp -> repo root
  return path.resolve(appDir, "..", "..");
}

export type RepoPaths = {
  repoRoot: string;
  designSystemSrcComponentsDir: string;
  storybookStoriesDir: string;
  globalsStylesPath: string;
  agentsMdPath: string;
  claudeMdPath: string;
};

export function getRepoPaths(appDir: string): RepoPaths {
  const repoRoot = repoRootFromAppDir(appDir);

  return {
    repoRoot,
    designSystemSrcComponentsDir: path.join(
      repoRoot,
      "packages",
      "design-system",
      "src",
      "components",
    ),
    storybookStoriesDir: path.join(repoRoot, "apps", "storybook", "stories"),
    globalsStylesPath: path.join(
      repoRoot,
      "packages",
      "design-system",
      "src",
      "styles",
      "globals.css",
    ),
    agentsMdPath: path.join(repoRoot, "packages", "design-system", "agents.md"),
    claudeMdPath: path.join(repoRoot, "CLAUDE.md"),
  };
}

