"use strict";

const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const { describe, it } = require("node:test");
const loaderUtils = require("../");

describe("security regressions", () => {
  it("drops dangerous keys from query strings and JSON5 objects", () => {
    delete Object.prototype.polluted;
    const flat = loaderUtils.parseQuery(
      "?safe=yes&__proto__=polluted&constructor=bad&prototype=bad"
    );
    const nested = loaderUtils.parseQuery(
      "?{safe:true,__proto__:{polluted:true},constructor:{prototype:{polluted:true}}}"
    );
    const objectOptions = loaderUtils.getOptions({
      query: JSON.parse(
        '{"safe":true,"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}}}'
      ),
    });
    const inheritedOptions = loaderUtils.getOptions({
      query: Object.assign(Object.create({ polluted: true }), { safe: true }),
    });

    assert.equal(flat.safe, "yes");
    assert.equal(nested.safe, true);
    assert.equal(objectOptions.safe, true);
    assert.equal(inheritedOptions.safe, true);
    assert.equal(inheritedOptions.polluted, undefined);
    for (const value of [flat, nested, objectOptions, inheritedOptions]) {
      assert.equal(Object.prototype.hasOwnProperty.call(value, "__proto__"), false);
      assert.equal(Object.prototype.hasOwnProperty.call(value, "constructor"), false);
      assert.equal(Object.prototype.hasOwnProperty.call(value, "prototype"), false);
    }
    assert.equal(Object.prototype.polluted, undefined);
    assert.equal({}.polluted, undefined);
  });

  it("does not mutate Object.prototype from attacker-shaped objects", () => {
    delete Object.prototype.polluted;
    const context = JSON.parse(
      '{"resourcePath":"/__proto__/constructor.js","options":{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}}}}'
    );

    assert.equal(
      loaderUtils.interpolateName(context, "[path][name].[ext]", {
        content: "safe",
      }),
      "/__proto__/constructor.js"
    );
    assert.equal(Object.prototype.polluted, undefined);
    assert.equal({}.polluted, undefined);
  });

  it("handles malformed large URL input within a hard process deadline", () => {
    const entry = path.join(__dirname, "..", "lib", "index.js");
    const script = [
      `const u = require(${JSON.stringify(entry)});`,
      'const input = "a".repeat(2_000_000) + "?" + "~".repeat(10_000);',
      "u.isUrlRequest(input);",
      "u.urlToRequest(input);",
    ].join("");
    const result = spawnSync(process.execPath, ["-e", script], {
      encoding: "utf8",
      timeout: 2000,
    });

    assert.equal(result.signal, null, result.error && result.error.message);
    assert.equal(result.status, 0, result.stderr);
  });

  it("rejects unsupported digest algorithms with a controlled error", () => {
    assert.throws(
      () => loaderUtils.getHashDigest("content", "not-a-real-digest"),
      /digest method not supported|unknown message digest|unsupported/i
    );
  });
});
