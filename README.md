# @stackline/loader-utils

Maintained utilities for webpack loaders. This package preserves the current `loader-utils@3.3.1` API while retaining the legacy helper surface required by `loader-utils@2.0.4` consumers, including Webpack 4 loaders and deep imports.

[![npm version](https://img.shields.io/npm/v/%40stackline%2Floader-utils)](https://www.npmjs.com/package/@stackline/loader-utils)
[![CI](https://github.com/alexandroit/stackline-loader-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/alexandroit/stackline-loader-utils/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/%40stackline%2Floader-utils)](LICENSE)

## Why This Fork Exists

The upstream `webpack/loader-utils` repository was archived in March 2025. Stackline maintains this fork so projects can retain the established API while using an actively tested package with:

- one pinned, zero-transitive production dependency with documented maintenance evidence;
- clean direct and legacy-name installations;
- zero known npm audit vulnerabilities;
- regression and differential tests against `loader-utils@2.0.4` and `3.3.1`;
- Node.js 12.13 through current Node.js compatibility checks;
- TypeScript declarations validated with TypeScript 3.9 and current TypeScript;
- reproducible release artifacts, SBOMs and immutable GitHub releases.

This is an independent fork and is not affiliated with webpack or the JS Foundation.

## Install

New projects can use the scoped name:

```bash
npm install @stackline/loader-utils
```

```js
const loaderUtils = require("@stackline/loader-utils");
```

For an existing project that imports `loader-utils`, use an npm alias and keep every source import unchanged:

```bash
npm install loader-utils@npm:@stackline/loader-utils
```

```js
const loaderUtils = require("loader-utils");
```

## API

### `isUrlRequest(url)`

Returns whether a URL should be handled as a webpack request.

```js
if (loaderUtils.isUrlRequest("images/logo.svg")) {
  // Handle the value as a module request.
}
```

### `urlToRequest(url, root?)`

Converts a resource URL to a webpack module request.

```js
loaderUtils.urlToRequest("styles/main.css");
// "./styles/main.css"

loaderUtils.urlToRequest("/images/logo.svg", "/public");
// "/public/images/logo.svg"
```

### `interpolateName(loaderContext, name?, options?)`

Interpolates `[ext]`, `[name]`, `[path]`, `[folder]`, `[query]`, `[hash]` and `[contenthash]` filename tokens.

```js
const filename = loaderUtils.interpolateName(
  { resourcePath: "/src/logo.svg" },
  "assets/[name].[contenthash:8].[ext]",
  { content: Buffer.from("file contents") }
);
```

Supported digest templates include `xxhash64`, `md4`, `native-md4`, Node.js crypto algorithms, `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64` and `base64safe`.

### `getHashDigest(buffer, hashType?, digestType?, maxLength?)`

Creates a loader-compatible content digest.

```js
loaderUtils.getHashDigest(
  Buffer.from("file contents"),
  "sha256",
  "base64safe",
  12
);
```

## Compatibility

| Surface | Support |
| --- | --- |
| Runtime | Node.js 12.13+ |
| Modules | CommonJS, dynamic ESM import |
| TypeScript | 3.9 and current |
| Baselines | `loader-utils@2.0.4` helpers and `3.3.1` current API |
| Deep imports | Preserved |
| Production dependencies | `json5@2.2.3` (0 transitive) |

The scoped package uses its own `1.x` release line. `@stackline/loader-utils@1.0.1` is the first release suitable for both current API consumers and loaders that still invoke the retained `getOptions` path.

## Verification

```bash
npm ci
npm run verify
```

The release gate runs linting, the complete upstream suite, differential compatibility tests, security regressions, TypeScript 3.9/current checks, coverage thresholds, direct and alias installation smoke tests, package validation and full/prod npm audits.

## Documentation

- [Migration guide](MIGRATION.md)
- [Compatibility policy](COMPATIBILITY.md)
- [Production dependency review](DEPENDENCY_REVIEW.md)
- [Security policy](SECURITY.md)
- [Public documentation](https://alexandro.net/docs/vanilla/loader-utils/)

## License and Attribution

MIT. The original copyright and license are preserved in [LICENSE](LICENSE). See [NOTICE](NOTICE) and [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) for provenance and attribution.
