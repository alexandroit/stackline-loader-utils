"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { describe, it } = require("node:test");
const getHashDigest = require("../lib/getHashDigest");
const BatchedHash = require("../lib/hash/BatchedHash");
const BulkUpdateDecorator = require("../lib/hash/BulkUpdateDecorator");
const createXXHash64 = require("../lib/hash/xxhash64");
const { MAX_SHORT_STRING } = require("../lib/hash/wasm-hash");

function recorder() {
  const updates = [];
  return {
    updates,
    update(value, encoding) {
      updates.push([value, encoding]);
      return this;
    },
    digest(encoding) {
      return encoding ? `digest:${encoding}` : Buffer.from("digest");
    },
  };
}

describe("hash implementation branches", () => {
  it("batches compatible short strings and flushes incompatible values", () => {
    const target = recorder();
    const hash = new BatchedHash(target);

    assert.equal(hash.update("a").update("b"), hash);
    hash.update(Buffer.from("c"));
    hash.update("YWJj", "base64");
    hash.update("x".repeat(MAX_SHORT_STRING));
    assert.equal(hash.digest("hex"), "digest:hex");

    assert.equal(target.updates[0][0], "ab");
    assert.ok(Buffer.isBuffer(target.updates[1][0]));
    assert.equal(target.updates[2][1], "base64");
    assert.equal(target.updates[3][0].length, MAX_SHORT_STRING);
  });

  it("supports direct hash instances, factories, buffered flushes, and cache hits", () => {
    const direct = new BulkUpdateDecorator(crypto.createHash("sha256"));
    direct.update("prefix");
    direct.update(Buffer.from("buffer"));
    assert.equal(direct.digest("hex").length, 64);

    let factoryCalls = 0;
    const factory = () => {
      factoryCalls += 1;
      return crypto.createHash("sha256");
    };
    const first = new BulkUpdateDecorator(factory, "coverage-cache");
    first.update("cached");
    const expected = first.digest("hex");
    const second = new BulkUpdateDecorator(factory, "coverage-cache");
    second.update("cached");
    assert.equal(second.digest("hex"), expected);
    assert.equal(factoryCalls, 1);

    const overflow = new BulkUpdateDecorator(factory, "overflow");
    overflow.update("a".repeat(1500)).update("b".repeat(600));
    overflow.update("tail", "utf8");
    assert.equal(overflow.digest("hex").length, 64);

    const long = new BulkUpdateDecorator(factory, "long");
    long.update("x".repeat(2001));
    assert.equal(long.digest().length, 32);
  });

  it("covers streamed wasm strings, buffers, encodings, and instance reuse", () => {
    const longString = createXXHash64();
    longString.update("a".repeat(MAX_SHORT_STRING + 100));
    assert.equal(longString.digest("hex").length, 16);

    const unicode = createXXHash64();
    unicode.update("aé♥", "utf8");
    assert.equal(unicode.digest("base64").length, 12);

    const latin = createXXHash64();
    latin.update("é", "latin1");
    assert.equal(latin.digest("hex").length, 16);

    const encoded = createXXHash64();
    encoded.update("YWJj", "base64");
    assert.equal(encoded.digest().length, 8);

    const smallBuffer = createXXHash64();
    smallBuffer.update(Buffer.alloc(8, 1));
    smallBuffer.update(Buffer.alloc(40, 2));
    assert.equal(smallBuffer.digest("hex").length, 16);

    const largeBuffer = createXXHash64();
    largeBuffer.update(Buffer.alloc(200000, 3));
    assert.equal(largeBuffer.digest("hex").length, 16);
  });

  it("keeps native md4 failure controlled when OpenSSL disables the algorithm", () => {
    try {
      const result = getHashDigest("content", "native-md4", "hex");
      assert.equal(typeof result, "string");
    } catch (error) {
      assert.match(error.message, /disabled|digest|unsupported/i);
    }
  });
});
