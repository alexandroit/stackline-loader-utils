"use strict";

const assert = require("assert");
const loaderUtils = require("../");

assert.deepStrictEqual(loaderUtils.getOptions({ query: { sourceMap: true } }), {
  sourceMap: true,
});
assert.strictEqual(loaderUtils.getOptions({ query: "?sourceMap=true" }).sourceMap, true);
assert.strictEqual(loaderUtils.urlToRequest("styles/main.css"), "./styles/main.css");
assert.strictEqual(loaderUtils.isUrlRequest("https://example.com/a.css"), false);
assert.strictEqual(
  loaderUtils.interpolateName(
    { resourcePath: "/src/logo.svg" },
    "[name].[ext]",
    { content: "fixture" }
  ),
  "logo.svg"
);
assert.strictEqual(
  loaderUtils.getHashDigest("test string", "xxhash64", "hex"),
  "e9e2c351e3c6b198"
);
