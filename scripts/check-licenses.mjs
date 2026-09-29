import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const lock = JSON.parse(await readFile("package-lock.json", "utf8"));
const emojis = JSON.parse(
  await readFile("node_modules/emojis-list/package.json", "utf8")
);
const json5 = JSON.parse(await readFile("node_modules/json5/package.json", "utf8"));
const emojiSourceLicense = await readFile("node_modules/emojis-list/LICENSE.md", "utf8");
const emojiShippedLicense = await readFile(
  "licenses/emojis-list-3.0.0-MIT.txt",
  "utf8"
);
const json5SourceLicense = await readFile("node_modules/json5/LICENSE.md", "utf8");
const json5ShippedLicense = await readFile("licenses/json5-2.2.3-MIT.txt", "utf8");
const notices = await readFile("THIRD_PARTY_LICENSES.md", "utf8");

assert.deepEqual(packageJson.dependencies, {
  "emojis-list": "npm:@stackline/emojis-list@1.0.0",
  json5: "npm:@stackline/json5@1.0.0",
});
assert.equal(emojis.name, "@stackline/emojis-list");
assert.equal(emojis.version, "1.0.0");
assert.equal(emojis.license, "MIT");
assert.deepEqual(emojis.dependencies || {}, {});
assert.equal(json5.name, "@stackline/json5");
assert.equal(json5.version, "1.0.0");
assert.equal(json5.license, "MIT");
assert.equal(emojiShippedLicense, emojiSourceLicense);
assert.equal(json5ShippedLicense, json5SourceLicense);
assert.match(notices, /emojis-list 3\.0\.0/);
assert.match(notices, /json5 2\.2\.3/);

const production = Object.entries(lock.packages)
  .filter(([location, metadata]) => location && !metadata.dev)
  .map(([location]) => location)
  .sort();
assert.deepEqual(production, ["node_modules/emojis-list", "node_modules/json5"]);

console.log("Production dependency and license inventory passed (2 leaf components).");
