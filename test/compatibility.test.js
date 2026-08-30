"use strict";

const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const baselineV2 = require("loader-utils-v2-baseline");
const baselineV3 = require("loader-utils-v3-baseline");
const maintained = require("../");

const publicMethods = [
  "getCurrentRequest",
  "getHashDigest",
  "getOptions",
  "getRemainingRequest",
  "interpolateName",
  "isUrlRequest",
  "parseQuery",
  "parseString",
  "stringifyRequest",
  "urlToRequest",
];

function compare(baseline, method, args) {
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

describe("loader-utils compatibility", () => {
  it("exports the v3 API plus retained v2 compatibility helpers", () => {
    assert.deepEqual(Object.keys(maintained).sort(), publicMethods.sort());
    for (const method of Object.keys(baselineV3)) {
      assert.equal(typeof maintained[method], typeof baselineV3[method]);
    }
    for (const method of Object.keys(baselineV2)) {
      assert.equal(typeof maintained[method], typeof baselineV2[method]);
    }
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
      compare(baselineV3, "isUrlRequest", [value]);
      compare(baselineV3, "urlToRequest", [value]);
      compare(baselineV3, "urlToRequest", [value, "/root"]);
    }
  });

  it("matches digest generation", () => {
    const content = Buffer.from("Stackline compatibility fixture", "utf8");
    for (const algorithm of ["xxhash64", "md4", "md5", "sha1", "sha256"]) {
      for (const digest of ["hex", "base64", "base52", "base64safe"]) {
        compare(baselineV3, "getHashDigest", [content, algorithm, digest, 16]);
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
        compare(baselineV3, "interpolateName", [
          context,
          template,
          { content: "fixture" },
        ]);
      }
    }
  });

  it("matches v2 loader option and request helpers", () => {
    const objectOptions = { sourceMap: true, root: "/assets" };
    const contexts = [
      { query: objectOptions },
      { query: "?sourceMap=true&root=%2Fassets&items[]=a&items[]=b" },
      { query: "?{sourceMap:true,root:'/assets'}" },
      { query: "" },
      {},
    ];
    for (const context of contexts) compare(baselineV2, "getOptions", [context]);

    const loaderContext = {
      context: "/project",
      loaderIndex: 1,
      loaders: [{ request: "a" }, { request: "b" }, { request: "c" }],
      resource: "/project/input.scss",
    };
    compare(baselineV2, "getCurrentRequest", [loaderContext]);
    compare(baselineV2, "getRemainingRequest", [loaderContext]);
    compare(baselineV2, "stringifyRequest", [
      loaderContext,
      "/project/loader.js?x=1!/project/input.scss",
    ]);

    for (const value of ['"quoted"', "'single'", "plain", "broken\\"] ) {
      compare(baselineV2, "parseString", [value]);
    }
  });
});
