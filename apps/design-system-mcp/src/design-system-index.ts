import path from "node:path";

import { pathExists, walkFiles } from "./fs-utils.js";
import type { RepoPaths } from "./paths.js";

export type ComponentEntry = {
  /** e.g. "atoms/button" */
  id: string;
  /** e.g. "atoms" */
  category: string;
  /** e.g. "button" */
  fileStem: string;
  /** absolute path to file */
  filePath: string;
};

const CATEGORY_DIRS = ["atoms", "molecules", "organisms"] as const;

export async function listDesignSystemComponents(
  repoPaths: RepoPaths,
): Promise<ComponentEntry[]> {
  const baseDir = repoPaths.designSystemSrcComponentsDir;
  if (!(await pathExists(baseDir))) return [];

  const files = await walkFiles(baseDir, {
    includeExtensions: [".ts", ".tsx"],
    ignore: (relPath) => {
      const parts = relPath.split(path.sep);

      // ignore re-export barrels
      if (parts.at(-1) === "index.ts") return true;

      // ignore ui/index.ts (handled via atoms/molecules/organisms)
      if (parts[0] === "ui") return true;

      return false;
    },
  });

  const out: ComponentEntry[] = [];
  for (const file of files) {
    const relParts = file.relPath.split(path.sep);
    const category = relParts[0];
    if (!category || !CATEGORY_DIRS.includes(category as any)) continue;

    const stem = path.basename(file.relPath).replace(/\.(ts|tsx)$/, "");
    out.push({
      id: `${category}/${stem}`,
      category,
      fileStem: stem,
      filePath: file.absPath,
    });
  }

  out.sort((a, b) => a.id.localeCompare(b.id));
  return out;
}

export function bestGuessStoryNameFromComponentFileStem(stem: string) {
  // kebab-case / snake_case -> PascalCase-ish
  const parts = stem.split(/[-_]/g).filter(Boolean);
  return parts.map((p) => p[0]?.toUpperCase() + p.slice(1)).join("");
}

