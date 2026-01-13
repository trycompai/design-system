import path from "node:path";

import { pathExists, walkFiles } from "./fs-utils.js";
import type { RepoPaths } from "./paths.js";

export type StoryEntry = {
  /** e.g. "Card" */
  name: string;
  /** e.g. "Card.stories.tsx" */
  filename: string;
  /** absolute path */
  filePath: string;
};

export async function listStorybookStories(
  repoPaths: RepoPaths,
): Promise<StoryEntry[]> {
  const baseDir = repoPaths.storybookStoriesDir;
  if (!(await pathExists(baseDir))) return [];

  const files = await walkFiles(baseDir, {
    includeExtensions: [".ts", ".tsx"],
    ignore: (relPath) => !relPath.endsWith(".stories.tsx"),
  });

  const out: StoryEntry[] = files.map((f) => {
    const filename = path.basename(f.relPath);
    const name = filename.replace(/\.stories\.tsx$/, "");
    return { name, filename, filePath: f.absPath };
  });

  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

export async function findStoryByName(repoPaths: RepoPaths, name: string) {
  const stories = await listStorybookStories(repoPaths);
  return stories.find((s) => s.name.toLowerCase() === name.toLowerCase());
}

