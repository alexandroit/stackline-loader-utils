"use strict";

const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const baseline = require("loader-utils-baseline");
const maintained = require("../");

function compare(method, args) {
  let expected;
  let expectedError;
  let actual;
  let actualError;

  try {
    expected = baseline[method](...args);
  } catch (error) {
    expectedError = error;
  }
  try {
    actual = maintained[method](...args);
  } catch (error) {
    actualError = error;
  }

  assert.equal(actualError && actualError.name, expectedError && expectedError.name);
  assert.equal(actualError && actualError.message, expectedError && expectedError.message);
  assert.deepEqual(actual, expected);
}

describe("loader-utils 2.0.4 public contract", () => {
  it("preserves export names and order", () => {
    assert.deepEqual(Object.keys(maintained), Object.keys(baseline));
  });

  it("matches query and option parsing for non-malicious input", () => {
    const queries = [
      "?",
      "?enabled",
      "?+enabled,-disabled",
      "?name=value&truth=true&falsy=false&empty=null",
      "?item[]=one&item[]=two",
      "?encoded%20name=encoded%20value",
      "?{sourceMap:true,root:'/assets',nested:{enabled:true},list:[1,2]}",
    ];
    for (const query of queries) {
      compare("parseQuery", [query]);
      compare("getOptions", [{ query }]);
    }
    compare("parseQuery", ["invalid"]);
    compare("getOptions", [{ query: { sourceMap: true } }]);
    compare("getOptions", [{ query: 1 }]);
    compare("getOptions", [{}]);
  });

  it("matches request inspection and serialization", () => {
    const context = {
      context: "/project",
      loaderIndex: 1,
      loaders: [
        { request: "/loaders/a.js" },
        { request: "/loaders/b.js?x=1" },
        { request: "/loaders/c.js" },
      ],
      resource: "/project/src/input.scss?module",
    };
    compare("getCurrentRequest", [context]);
    compare("getRemainingRequest", [context]);
    compare("getCurrentRequest", [{ ...context, currentRequest: "cached-current" }]);
    compare("getRemainingRequest", [
      { ...context, remainingRequest: "cached-remaining" },
    ]);

    for (const request of [
      "/project/src/input.scss",
      "/project/loader.js?x=/absolute!/project/src/input.scss",
      "relative.js!../other.js",
      "C:\\project\\loader.js?x=1",
    ]) {
      compare("stringifyRequest", [context, request]);
    }
    compare("stringifyRequest", [
      { options: { context: "/project" } },
      "/project/src/input.scss",
    ]);
  });

  it("matches URL classification and conversion", () => {
    const urls = [
      "",
      "file.css",
      "./file.css",
      "../file.css",
      "/root/file.css",
      "//cdn.example/file.css",
      "https://example.com/file.css",
      "data:text/plain,hello",
      "#fragment",
      "{template}",
      "~module/file.css",
      "C:\\project\\file.css",
      "\\\\server\\share\\file.css",
    ];
    for (const url of urls) {
      for (const root of [undefined, false, true, "/assets", "~module"]) {
        compare("isUrlRequest", [url, root]);
        compare("urlToRequest", [url, root]);
      }
    }
    compare("urlToRequest", ["/file.css", 42]);
  });

  it("matches digest encodings and truncation", () => {
    const inputs = [Buffer.alloc(0), Buffer.from("a"), Buffer.from("test string")];
    const algorithms = ["md4", "md5", "sha1", "sha256", "sha512"];
    const encodings = [
      "hex",
      "base64",
      "base26",
      "base32",
      "base36",
      "base49",
      "base52",
      "base58",
      "base62",
    ];
    for (const input of inputs) {
      for (const algorithm of algorithms) {
        for (const encoding of encodings) {
          for (const length of [undefined, 1, 6, 9999]) {
            compare("getHashDigest", [input, algorithm, encoding, length]);
          }
        }
      }
    }
    compare("getHashDigest", [Buffer.from("default")]);
  });

  it("matches filename interpolation including deterministic emoji selection", () => {
    const contexts = [
      {},
      { resourcePath: "/project/src/logo.svg" },
      { resourcePath: "/project/src/logo.svg", resourceQuery: "?v=1#fragment" },
    ];
    const templates = [
      "[name].[ext]",
      "[path][name].[hash:8].[ext][query]",
      "[folder]/[sha256:contenthash:base64:12].[ext]",
      "[1]-[name].[ext]",
    ];
    for (const context of contexts) {
      for (const template of templates) {
        compare("interpolateName", [
          context,
          template,
          { content: "fixture", context: "/project", regExp: /src\/(.*)\.svg$/ },
        ]);
      }
    }

    const originalRandom = Math.random;
    Math.random = () => 0;
    try {
      compare("interpolateName", [
        { resourcePath: "/emoji.txt" },
        "[emoji:2].[ext]",
        { content: "deterministic-emoji-fixture" },
      ]);
    } finally {
      Math.random = originalRandom;
    }
  });

  it("matches string parsing", () => {
    for (const value of [
      "plain",
      '"double quoted"',
      "'single quoted'",
      "line\\nfeed",
      "unterminated\\",
    ]) {
      compare("parseString", [value]);
    }
  });
});
