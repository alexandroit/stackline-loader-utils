import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const lock = JSON.parse(await readFile("package-lock.json", "utf8"));
const json5 = JSON.parse(await readFile("node_modules/json5/package.json", "utf8"));
const sourceLicense = await readFile("node_modules/json5/LICENSE.md", "utf8");
const shippedLicense = await readFile("licenses/json5-2.2.3-MIT.txt", "utf8");
const notices = await readFile("THIRD_PARTY_LICENSES.md", "utf8");

assert.deepEqual(packageJson.dependencies, { json5: "2.2.3" });
assert.equal(json5.version, "2.2.3");
assert.equal(json5.license, "MIT");
assert.equal(shippedLicense, sourceLicense);
assert.match(notices, /json5 2\.2\.3/);

const production = Object.entries(lock.packages)
  .filter(([location, metadata]) => location && !metadata.dev)
  .map(([location]) => location)
  .sort();
assert.deepEqual(production, ["node_modules/json5"]);

console.log("Production dependency and license inventory passed (1 component).");
