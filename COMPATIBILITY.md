# Compatibility Policy

`@stackline/loader-utils` is a maintained, security-hardened fork of `loader-utils@2.0.4`.

## Preserved Contract

- `require("loader-utils")` when installed through an npm alias;
- `require("@stackline/loader-utils")` for direct scoped use;
- all ten root exports in their original order;
- `getHashDigest`, `interpolateName`, `isUrlRequest` and `urlToRequest` with `2.0.4` defaults and edge behavior;
- `getOptions`, `parseQuery`, `stringifyRequest`, `getRemainingRequest`, `getCurrentRequest` and `parseString`;
- CommonJS behavior and dynamic ESM import;
- published `lib/*` deep imports;
- Node.js 12.13 or newer;
- filename tokens, digest defaults and error behavior from the baseline;
- TypeScript 3.9-compatible declarations.

## Version Mapping

| Stackline release | Upstream behavior baseline |
| --- | --- |
| `1.0.0` | Verdaccio-only `3.3.1` preflight; never promote |
| `1.0.1` | Verdaccio-only mixed-semantics preflight; never promote |
| `1.0.2+` | Complete `loader-utils@2.0.4` contract with security hardening |

Patch releases may add tests, documentation, declarations and security hardening that does not intentionally change the public contract. Any intentional breaking change requires a new major version.

## Continuous Evidence

The suite executes a broad differential matrix against an independently installed `loader-utils@2.0.4`, including hash algorithms, every custom base, truncation, URL roots, query forms, request serialization and deterministic emoji interpolation. The package is also installed under both its scoped name and the legacy `loader-utils` key before release, then exercised by real Webpack 4 and 5 builds in `@stackline/resolve-url-loader`.
