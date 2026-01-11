import path from "node:path";

export function repoRootFromAppDir(appDir: string) {
  // apps/design-system-mcp -> repo root
  return path.resolve(appDir, "..", "..");
}

export type RepoPaths = {
  repoRoot: string;
  designSystemSrcComponentsDir: string;
  storybookStoriesDir: string;
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
  };
}

