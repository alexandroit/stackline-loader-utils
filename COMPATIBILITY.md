# Compatibility Policy

`@stackline/loader-utils` is a source-compatible maintained fork of `loader-utils@3.3.1`.

## Preserved Contract

- `require("loader-utils")` when installed through an npm alias;
- `require("@stackline/loader-utils")` for direct scoped use;
- `getHashDigest`, `interpolateName`, `isUrlRequest` and `urlToRequest`;
- CommonJS behavior and dynamic ESM import;
- published `lib/*` deep imports;
- Node.js 12.13 or newer;
- filename tokens, digest defaults and error behavior from the baseline;
- TypeScript 3.9-compatible declarations.

## Version Mapping

| Stackline release | Upstream behavior baseline |
| --- | --- |
| `1.0.x` | `loader-utils@3.3.1` |

Patch releases may add tests, documentation, declarations and security hardening that does not intentionally change the public contract. Any intentional breaking change requires a new major version.

## Continuous Evidence

The suite executes the original upstream cases and a differential harness against an independently installed `loader-utils@3.3.1`. The package is also installed under both its scoped name and the legacy `loader-utils` key before release.
