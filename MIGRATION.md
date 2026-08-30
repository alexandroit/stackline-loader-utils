# Migration

## Keep Existing Imports

Replace the registry dependency with an npm alias:

```json
{
  "dependencies": {
    "loader-utils": "npm:@stackline/loader-utils@1.0.1"
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
    "@stackline/loader-utils": "1.0.1"
  }
}
```

```js
const loaderUtils = require("@stackline/loader-utils");
```

## Compatibility Baseline

The `1.0.x` Stackline line preserves the four current exports and behavior of `loader-utils@3.3.1`. It also retains `getOptions`, `parseQuery`, `stringifyRequest`, `getRemainingRequest`, `getCurrentRequest` and `parseString` from `loader-utils@2.0.4`, allowing existing Webpack 4 loader paths to migrate without source changes.

## Lockfile Verification

After changing the dependency, regenerate the lockfile and verify the complete installed tree:

```bash
npm install
npm ls --all
npm audit --omit=dev --audit-level=low
```
