interface Handler {
  (): void | Promise<void>
}

interface Runner {
  name: string;
  runner: Handler;
}

interface SucceedTest extends Runner {
  result: true;
}

interface FailedTest extends Runner {
  result: false;
  error: string;
}

export type Test = SucceedTest | FailedTest;

interface Describe {
  name: string;
  before: Runner[];
  it: Test[];
  after: Runner[];
  children: Describe[];
}

let current: Describe = { name: "", before: [], after: [], it: [], children: [] };
const root: Describe[] = [current];

export async function describe(name: string, runner: Handler) {
  const context: Describe = { name, before: [], after: [], it: [], children: [] };
  const last = current;
  current.children.push(context);
  current = context;
  try {
    await runner();
  } catch (e) {
    console.error(e);
  }
  current = last;
}

export async function before(runner: Handler) {
  current.before.push({ name: `${current.name} before`, runner });
}

export async function after(runner: Handler) {
  current.after.push({ name: `${current.name} after`, runner });
}

export async function it(name: string, runner: Handler) {
  current.it.push({ name: `${current.name}`, runner, result: true });
}

async function asyncRun(runners: Runner[]) {
  for (const runner of runners) {
    try {
      await runner.runner();
    } catch (e) {
      console.error(`Failed to execute test in "${runner.name.trim()}".`);
      console.error(e);
    }
  }
}

async function asyncTest(tests: Test[]) {
  for (const test of tests) {
    try {
      await test.runner();
    } catch (e) {
      test.result = false;
      (test as FailedTest).error = e;
      console.error(`Failed to execute test in "${test.name.trim()}".`);
      console.error(e);
    }
  }
}

async function _run(tests: Describe[]) {
  for (const test of tests) {
    await asyncRun(test.before);
    await asyncTest(test.it);
    await _run(test.children);
    await asyncRun(test.after);
  }
}

function correctResults(describes: Describe[]): Test[] {
  return ([] as Test[]).concat(
    ...describes.map(describe => describe.it),
    ...describes.map(describe => correctResults(describe.children))
  );
}

export async function run() {
  await _run(root);
  return correctResults(root);
}

/**
 * for test.
 */
export function clear() {
  root.splice(0, root.length);
}
