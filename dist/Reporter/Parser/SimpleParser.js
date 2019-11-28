"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function insertTab(text) {
    return `  ${text.split("\n").join("\n  ")}`;
}
function parse(tests) {
    return tests.map(t => {
        if (t.result) {
            return `${t.name} 😇`;
        }
        return `${t.name} 😡\n${insertTab(t.error)}`;
    }).join("\n");
}
exports.parse = parse;
