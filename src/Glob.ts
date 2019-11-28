import { readdirRecursively, resolveRoot } from "./Files";

function filterFile(root: string, filter: RegExp) {
  const dirs = readdirRecursively(root);
  const result = dirs.filter(d => filter.test(d));
  return result;
}

function replace(globString: string) {
  return globString
    .replace("**/", "__ASTER2__")
    .replace("*", "__ASTER__")
    .replace("__ASTER2__", ".*")
    .replace("__ASTER__", "[^/]*")
}

export function glob(globString: string) {
  const root = resolveRoot(globString);
  const regex = new RegExp(replace(globString.replace("./", `${root}/`)), "i");
  const filteredFiles = filterFile(root, regex);
  return filteredFiles;
}
