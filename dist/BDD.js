"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let current = { name: "", before: [], after: [], it: [], children: [] };
const root = [current];
async function describe(name, runner) {
    const context = { name, before: [], after: [], it: [], children: [] };
    const last = current;
    current.children.push(context);
    current = context;
    try {
        await runner();
    }
    catch (e) {
        console.error(e);
    }
    current = last;
}
exports.describe = describe;
async function before(runner) {
    current.before.push({ name: `${current.name} before`, runner });
}
exports.before = before;
async function after(runner) {
    current.after.push({ name: `${current.name} after`, runner });
}
exports.after = after;
async function it(name, runner) {
    current.it.push({ name: `${current.name}`, runner, result: true });
}
exports.it = it;
async function asyncRun(runners) {
    for (const runner of runners) {
        try {
            await runner.runner();
        }
        catch (e) {
            console.error(`Failed to execute test in "${runner.name.trim()}".`);
            console.error(e);
        }
    }
}
async function asyncTest(tests) {
    for (const test of tests) {
        try {
            await test.runner();
        }
        catch (e) {
            test.result = false;
            test.error = e;
            console.error(`Failed to execute test in "${test.name.trim()}".`);
            console.error(e);
        }
    }
}
async function _run(tests) {
    for (const test of tests) {
        await asyncRun(test.before);
        await asyncTest(test.it);
        await _run(test.children);
        await asyncRun(test.after);
    }
}
function correctResults(describes) {
    return [].concat(...describes.map(describe => describe.it), ...describes.map(describe => correctResults(describe.children)));
}
async function run() {
    await _run(root);
    return correctResults(root);
}
exports.run = run;
/**
 * for test.
 */
function clear() {
    root.splice(0, root.length);
}
exports.clear = clear;
