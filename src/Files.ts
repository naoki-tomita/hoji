import { readdirSync, statSync } from "fs";
import { join } from "path";

export function resolveRoot(path: string) {
  const root = path.substring(0, path.indexOf("/"));
  return root === "." ? process.cwd() : root;
}

export function readdirRecursively(root: string): string[] {
  const dirs = readdirSync(root);
  return ([] as string[]).concat(...dirs.map(d => {
    const dir = join(root, d);
    return statSync(dir).isFile() ? [dir] : readdirRecursively(dir);
  }));
}
