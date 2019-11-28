interface Handler {
    (): void | Promise<void>;
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
export declare type Test = SucceedTest | FailedTest;
export declare function describe(name: string, runner: Handler): Promise<void>;
export declare function before(runner: Handler): Promise<void>;
export declare function after(runner: Handler): Promise<void>;
export declare function it(name: string, runner: Handler): Promise<void>;
export declare function run(): Promise<Test[]>;
/**
 * for test.
 */
export declare function clear(): void;
export {};
