# Migration

## Keep Existing Imports

Replace the registry dependency with an npm alias:

```json
{
  "dependencies": {
    "loader-utils": "npm:@stackline/loader-utils@1.0.2"
  }
}
```

No JavaScript or TypeScript import changes are required:

```js
const loaderUtils = require("loader-utils");
```

## Use the Scoped Name

New code can depend directly on the maintained package:

```json
{
  "dependencies": {
    "@stackline/loader-utils": "1.0.2"
  }
}
```

```js
const loaderUtils = require("@stackline/loader-utils");
```

## Compatibility Baseline

The `1.0.x` Stackline line targets the complete `loader-utils@2.0.4` contract: all ten root exports, export order, overlapping URL/hash behavior, JSON5 query parsing, emoji interpolation and deep imports. This allows existing Webpack 4 loader paths to migrate without source changes.

## Lockfile Verification

After changing the dependency, regenerate the lockfile and verify the complete installed tree:

```bash
npm install
npm ls --all
npm audit --omit=dev --audit-level=low
```
