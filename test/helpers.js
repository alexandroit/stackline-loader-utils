"use strict";

const assert = require("node:assert/strict");
const nodeTest = require("node:test");

function expectation(actual, negated) {
  function check(value, message) {
    if (negated) assert.ok(!value, message);
    else assert.ok(value, message);
  }

  return {
    get not() {
      return expectation(actual, !negated);
    },
    toBe(expected) {
      if (negated) assert.notStrictEqual(actual, expected);
      else assert.strictEqual(actual, expected);
    },
    toBeDefined() {
      check(actual !== undefined, "expected value to be defined");
    },
    toBeGreaterThanOrEqual(expected) {
      check(actual >= expected, `${actual} is not greater than or equal to ${expected}`);
    },
    toBeLessThanOrEqual(expected) {
      check(actual <= expected, `${actual} is not less than or equal to ${expected}`);
    },
    toThrow(expected) {
      if (negated) assert.doesNotThrow(actual);
      else assert.throws(actual, expected);
    },
  };
}

module.exports = {
  describe: nodeTest.describe,
  expect: (actual) => expectation(actual, false),
  it: nodeTest.it,
  test: nodeTest.test,
};
