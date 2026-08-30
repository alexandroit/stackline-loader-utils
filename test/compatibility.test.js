"use strict";

const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const baseline = require("loader-utils-baseline");
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

describe("loader-utils 2.0.4 compatibility", () => {
  it("exports the same public method names", () => {
    assert.deepEqual(Object.keys(maintained).sort(), publicMethods.sort());
    for (const method of Object.keys(baseline)) {
      assert.equal(typeof maintained[method], typeof baseline[method]);
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
      compare(baseline, "isUrlRequest", [value]);
      compare(baseline, "isUrlRequest", [value, "/root"]);
      compare(baseline, "urlToRequest", [value]);
      compare(baseline, "urlToRequest", [value, "/root"]);
    }
  });

  it("matches digest generation", () => {
    const content = Buffer.from("Stackline compatibility fixture", "utf8");
    for (const algorithm of ["md4", "md5", "sha1", "sha256"]) {
      for (const digest of ["hex", "base64", "base26", "base52", "base62"]) {
        compare(baseline, "getHashDigest", [content, algorithm, digest, 16]);
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
      "[folder]/[sha256:hash:base64:12].[ext]",
    ];

    for (const context of contexts) {
      for (const template of templates) {
        compare(baseline, "interpolateName", [
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
    for (const context of contexts) compare(baseline, "getOptions", [context]);

    const loaderContext = {
      context: "/project",
      loaderIndex: 1,
      loaders: [{ request: "a" }, { request: "b" }, { request: "c" }],
      resource: "/project/input.scss",
    };
    compare(baseline, "getCurrentRequest", [loaderContext]);
    compare(baseline, "getRemainingRequest", [loaderContext]);
    compare(baseline, "stringifyRequest", [
      loaderContext,
      "/project/loader.js?x=1!/project/input.scss",
    ]);

    for (const value of ['"quoted"', "'single'", "plain", "broken\\"] ) {
      compare(baseline, "parseString", [value]);
    }
  });
});
