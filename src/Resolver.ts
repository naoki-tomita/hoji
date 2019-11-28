import { glob } from "./Glob";

export async function resolve(globString: string) {
  return glob(globString);
}
