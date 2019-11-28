import { Test } from "../../BDD";

function insertTab(text: string) {
  return `  ${text.split("\n").join("\n  ")}`;
}

export function parse(tests: Test[]): string {
  return tests.map(t => {
    if (t.result) {
      return `${t.name} 😇`;
    }
    return `${t.name} 😡\n${insertTab(t.error)}`;
  }).join("\n");
}
