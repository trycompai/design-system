import fs from "node:fs/promises";
import path from "node:path";

export async function pathExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function readTextFile(filePath: string) {
  return await fs.readFile(filePath, "utf8");
}

export type WalkEntry = {
  absPath: string;
  relPath: string;
};

export async function walkFiles(
  baseDir: string,
  opts?: {
    includeExtensions?: string[];
    ignore?: (relPath: string) => boolean;
  },
): Promise<WalkEntry[]> {
  const includeExtensions = opts?.includeExtensions ?? [];

  const out: WalkEntry[] = [];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const absPath = path.join(dir, entry.name);
      const relPath = path.relative(baseDir, absPath);

      if (opts?.ignore?.(relPath)) continue;

      if (entry.isDirectory()) {
        await walk(absPath);
        continue;
      }

      if (includeExtensions.length > 0) {
        const ext = path.extname(entry.name);
        if (!includeExtensions.includes(ext)) continue;
      }

      out.push({ absPath, relPath });
    }
  }

  await walk(baseDir);
  return out;
}

