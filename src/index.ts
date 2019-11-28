import { describe, it, after, before, run } from "./BDD";

(global as any).describe = describe;
(global as any).it = it;
(global as any).after = after;
(global as any).before = before;

export { describe, it, after, before };
