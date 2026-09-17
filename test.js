import assert from "node:assert";
import { add, subtract, multiply, divide } from "./index.js";

assert.strictEqual(add(2, 3), 5);
assert.strictEqual(subtract(5, 2), 3);
assert.strictEqual(multiply(4, 3), 12);
assert.strictEqual(divide(10, 2), 5);

try {
  divide(1, 0);
  throw new Error("expected divide by zero to throw");
} catch (err) {
  assert.strictEqual(err.message, "Cannot divide by zero");
}

console.log("all tests passed");
