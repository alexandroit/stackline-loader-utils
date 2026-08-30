# Migration

## Keep Existing Imports

Replace the registry dependency with an npm alias:

```json
{
  "dependencies": {
    "loader-utils": "npm:@stackline/loader-utils@1.0.0"
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
    "@stackline/loader-utils": "1.0.0"
  }
}
```

```js
const loaderUtils = require("@stackline/loader-utils");
```

## Compatibility Baseline

The `1.0.x` Stackline line preserves the four exports and behavior of `loader-utils@3.3.1`. APIs removed by upstream in `loader-utils@3` are intentionally not restored; projects that still use `getOptions`, `parseQuery`, `stringifyRequest` or other `loader-utils@1` APIs must migrate those calls first.

## Lockfile Verification

After changing the dependency, regenerate the lockfile and verify the complete installed tree:

```bash
npm install
npm ls --all
npm audit --omit=dev --audit-level=low
```
