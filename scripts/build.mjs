import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const sourceFiles = [
  "lib/getHashDigest.js",
  "lib/hash/BatchedHash.js",
  "lib/hash/BulkUpdateDecorator.js",
  "lib/hash/md4.js",
  "lib/hash/wasm-hash.js",
  "lib/hash/xxhash64.js",
  "lib/index.js",
  "lib/interpolateName.js",
  "lib/isUrlRequest.js",
  "lib/urlToRequest.js",
];

const files = {};
for (const path of sourceFiles) {
  const source = await readFile(path);
  files[path] = createHash("sha256").update(source).digest("hex");
}

await mkdir("dist", { recursive: true });
await writeFile(
  "dist/build-manifest.json",
  `${JSON.stringify({ format: 1, files }, null, 2)}\n`
);
console.log(`Validated ${sourceFiles.length} production source files.`);
