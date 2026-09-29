# @stackline/loader-utils

> Maintained, security-hardened fork compatible with loader-utils 2.0.4 consumers.

[![npm version](https://img.shields.io/npm/v/@stackline/loader-utils.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/loader-utils)
[![license](https://img.shields.io/npm/l/@stackline/loader-utils.svg?style=flat-square)](https://github.com/alexandroit/stackline-loader-utils)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-loader-utils-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-loader-utils)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/loader-utils/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/loader-utils/)** | **[npm](https://www.npmjs.com/package/@stackline/loader-utils)** | **[Issues](https://github.com/alexandroit/stackline-loader-utils/issues)** | **[Repository](https://github.com/alexandroit/stackline-loader-utils)**

**Current package version:** `1.0.5`

---

## Why this package?

Maintained, security-hardened utilities for webpack loaders. This package preserves the complete public API and behavior of `loader-utils@2.0.4`, including Webpack 4 option parsing and legacy deep imports.

<a id="why-this-fork-exists"></a>

### Why This Fork Exists

The upstream `webpack/loader-utils` repository was archived in March 2025. Stackline maintains this fork so projects can retain the established API while using an actively tested package with:

- two pinned leaf dependencies with documented current maintenance evidence;
- clean direct and legacy-name installations;
- zero known npm audit vulnerabilities;
- exhaustive differential tests against `loader-utils@2.0.4` and downstream Webpack 4/5 builds;
- Node.js 12.13 through current Node.js compatibility checks;
- TypeScript declarations validated with TypeScript 3.9 and current TypeScript;
- reproducible release artifacts, SBOMs and immutable GitHub releases.

This is an independent fork and is not affiliated with webpack or the JS Foundation.

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/loader-utils@1.0.5` |
| Node.js runtime | `>=12.13.0` |
| CommonJS / primary entry | `./lib/index.js` |
| Type declarations | `./index.d.ts` |

| Surface | Support |
| --- | --- |
| Runtime | Node.js 12.13+ |
| Modules | CommonJS, dynamic ESM import |
| TypeScript | 3.9 and current |
| Baseline | Complete `loader-utils@2.0.4` API |
| Deep imports | Preserved |
| Production dependencies | `emojis-list: npm:@stackline/emojis-list@1.0.0`, `json5: npm:@stackline/json5@1.0.0` (both leaf packages) |

The scoped package uses its own `1.x` release line. `@stackline/loader-utils@1.0.3` is the first public release, validated against the complete `2.0.4` contract and real `resolve-url-loader` Webpack 4/5 builds.

## Installation

<a id="install"></a>

### Install

New projects can use the scoped name:

## Usage

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

## Features and Integrations

<a id="documentation"></a>

### Documentation

- [Migration guide](https://github.com/alexandroit/stackline-loader-utils/blob/main/MIGRATION.md)
- [Compatibility policy](https://github.com/alexandroit/stackline-loader-utils/blob/main/COMPATIBILITY.md)
- [Production dependency review](https://github.com/alexandroit/stackline-loader-utils/blob/main/DEPENDENCY_REVIEW.md)
- [Security policy](https://github.com/alexandroit/stackline-loader-utils/blob/main/SECURITY.md)
- [Public documentation](https://alexandro.net/docs/vanilla/loader-utils/)

## Security

Review inputs and the package-specific compatibility limits before processing untrusted data. Report suspected vulnerabilities as described in the [security policy](https://github.com/alexandroit/stackline-loader-utils/blob/main/SECURITY.md).

## API Surface

<a id="api"></a>

### API

#### Loader context helpers

`getOptions`, `parseQuery`, `stringifyRequest`, `getRemainingRequest`, `getCurrentRequest` and `parseString` retain their `loader-utils@2.0.4` signatures and behavior. Query parsing additionally ignores `__proto__`, `prototype` and `constructor` keys.

```js
const options = loaderUtils.getOptions(this);
const request = loaderUtils.stringifyRequest(this, this.resourcePath);
```

#### `isUrlRequest(url)`

Returns whether a URL should be handled as a webpack request.

```js
if (loaderUtils.isUrlRequest("images/logo.svg")) {
  // Handle the value as a module request.
}
```

#### `urlToRequest(url, root?)`

Converts a resource URL to a webpack module request.

```js
loaderUtils.urlToRequest("styles/main.css");
// "./styles/main.css"

loaderUtils.urlToRequest("/images/logo.svg", "/public");
// "/public/images/logo.svg"
```

#### `interpolateName(loaderContext, name?, options?)`

Interpolates `[ext]`, `[name]`, `[path]`, `[folder]`, `[query]`, `[hash]` and `[contenthash]` filename tokens.

```js
const filename = loaderUtils.interpolateName(
  { resourcePath: "/src/logo.svg" },
  "assets/[name].[contenthash:8].[ext]",
  { content: Buffer.from("file contents") }
);
```

Supported digest templates include `xxhash64`, `md4`, `native-md4`, Node.js crypto algorithms, `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64` and `base64safe`.

#### `getHashDigest(buffer, hashType?, digestType?, maxLength?)`

Creates a loader-compatible content digest.

```js
loaderUtils.getHashDigest(
  Buffer.from("file contents"),
  "sha256",
  "base64safe",
  12
);
```

## Local Development

```sh
git clone https://github.com/alexandroit/stackline-loader-utils.git
cd stackline-loader-utils
npm ci
npm run verify
```

Release tooling uses Node.js 24.20.0 and npm 11.19.0. The consumer runtime contract remains the one documented above.

## Consumer Smoke Test

Run the repository's existing consumer/package check after installing development dependencies:

```sh
npm run test:smoke
```

## Release Checklist

<a id="verification"></a>

### Verification

```bash
npm ci
npm run verify
```

The release gate runs linting, the complete upstream suite, differential compatibility tests, security regressions, TypeScript 3.9/current checks, coverage thresholds, direct and alias installation smoke tests, package validation and full/prod npm audits.

Run `npm run verify` and inspect the package contents before release. Publish a new version through the [GitHub Actions publishing workflow](https://github.com/alexandroit/stackline-loader-utils/actions/workflows/publish.yml), using the SHA-512 digest of the reviewed tarball. Verify the exact published version, tarball integrity, and npm provenance after the run.

## License

<a id="license-and-attribution"></a>

### License and Attribution

MIT. The original copyright and license are preserved in [LICENSE](https://github.com/alexandroit/stackline-loader-utils/blob/main/LICENSE). See [NOTICE](https://github.com/alexandroit/stackline-loader-utils/blob/main/NOTICE) and [THIRD_PARTY_LICENSES.md](https://github.com/alexandroit/stackline-loader-utils/blob/main/THIRD_PARTY_LICENSES.md) for provenance and attribution.

Dependency maintenance for this release is documented in [DEPENDENCY_UPDATES.md](DEPENDENCY_UPDATES.md).

## Credits and original authors

- Stackline Maintainers.
- Tobias Koppers.
- JS Foundation and other contributors.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
