import { describe, before, it, after, run, clear } from "../src/BDD";

let counter = 0;
function calledAt(num: number) {
  return function() {
    counter++;
    if (counter !== num) {
      throw Error(`Call count is incorrect. It should call at ${num} but, it called at ${counter}`);
    }
  }
}


console.log("----------------- sync test");
describe("describe1", () => {
  calledAt(1)();
  before(calledAt(3));
  it("describe1 it1", calledAt(4));
  describe("describe2", () => {
    calledAt(2)();
    before(calledAt(5));
    it("describe2 it", calledAt(6));
    after(calledAt(7));
  });
  after(calledAt(8));
});

run();
clear();