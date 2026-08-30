import assert from "node:assert/strict";
import loaderUtils from "../lib/index.js";

assert.equal(typeof loaderUtils.getHashDigest, "function");
assert.equal(typeof loaderUtils.interpolateName, "function");
assert.equal(typeof loaderUtils.isUrlRequest, "function");
assert.equal(typeof loaderUtils.urlToRequest, "function");
assert.equal(loaderUtils.urlToRequest("styles/main.css"), "./styles/main.css");

const deepImport = await import("../lib/getHashDigest.js");
assert.equal(typeof deepImport.default, "function");
