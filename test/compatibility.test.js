"use strict";

const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const baseline = require("loader-utils-baseline");
const maintained = require("../");

const publicMethods = [
  "getHashDigest",
  "interpolateName",
  "isUrlRequest",
  "urlToRequest",
];

function compare(method, args) {
  let baselineResult;
  let baselineError;
  let maintainedResult;
  let maintainedError;

  try {
    baselineResult = baseline[method](...args);
  } catch (error) {
    baselineError = error;
  }

  try {
    maintainedResult = maintained[method](...args);
  } catch (error) {
    maintainedError = error;
  }

  assert.equal(maintainedError && maintainedError.name, baselineError && baselineError.name);
  assert.equal(
    maintainedError && maintainedError.message,
    baselineError && baselineError.message
  );
  assert.deepEqual(maintainedResult, baselineResult);
}

describe("loader-utils 3.3.1 compatibility", () => {
  it("exports the same public method names", () => {
    assert.deepEqual(Object.keys(maintained).sort(), Object.keys(baseline).sort());
    assert.deepEqual(Object.keys(maintained).sort(), publicMethods.sort());
  });

  it("matches URL classification and request conversion", () => {
    const values = [
      "",
      "index.css",
      "./index.css",
      "../index.css",
      "/images/logo.png",
      "~module/file.js",
      "https://example.com/a.css",
      "data:text/plain,hello",
      "C:\\work\\file.js",
      "#fragment",
      "?query=1",
    ];

    for (const value of values) {
      compare("isUrlRequest", [value]);
      compare("urlToRequest", [value]);
      compare("urlToRequest", [value, "/root"]);
    }
  });

  it("matches digest generation", () => {
    const content = Buffer.from("Stackline compatibility fixture", "utf8");
    for (const algorithm of ["xxhash64", "md4", "md5", "sha1", "sha256"]) {
      for (const digest of ["hex", "base64", "base52", "base64safe"]) {
        compare("getHashDigest", [content, algorithm, digest, 16]);
      }
    }
  });

  it("matches filename interpolation", () => {
    const contexts = [
      {},
      { resourcePath: "/src/images/logo.svg" },
      { resourcePath: "C:\\src\\images\\logo.svg", resourceQuery: "?v=1#hash" },
    ];
    const templates = [
      "[name].[ext]",
      "[path][name].[contenthash:8].[ext][query]",
      "[folder]/[sha256:hash:base64safe:12].[ext]",
    ];

    for (const context of contexts) {
      for (const template of templates) {
        compare("interpolateName", [context, template, { content: "fixture" }]);
      }
    }
  });
});
