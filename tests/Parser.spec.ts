import { parse as simpleParser } from "../src/Reporter/Parser/SimpleParser";
import { Test } from "../src/BDD";

console.log(simpleParser([
  { result: true, name: "Foo" } as Test,
  { result: false, name :"Bar", error: "Failed\nExec\nTest" } as Test,
]));