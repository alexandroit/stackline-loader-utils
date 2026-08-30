# Compatibility Policy

`@stackline/loader-utils` is a maintained compatibility superset of `loader-utils@3.3.1` and the helper APIs retained from `loader-utils@2.0.4`.

## Preserved Contract

- `require("loader-utils")` when installed through an npm alias;
- `require("@stackline/loader-utils")` for direct scoped use;
- `getHashDigest`, `interpolateName`, `isUrlRequest` and `urlToRequest`;
- `getOptions`, `parseQuery`, `stringifyRequest`, `getRemainingRequest`, `getCurrentRequest` and `parseString` for legacy loader paths;
- CommonJS behavior and dynamic ESM import;
- published `lib/*` deep imports;
- Node.js 12.13 or newer;
- filename tokens, digest defaults and error behavior from the baseline;
- TypeScript 3.9-compatible declarations.

## Version Mapping

| Stackline release | Upstream behavior baseline |
| --- | --- |
| `1.0.0` | `loader-utils@3.3.1` preflight baseline |
| `1.0.1+` | `loader-utils@3.3.1` plus retained `2.0.4` helper APIs |

Patch releases may add tests, documentation, declarations and security hardening that does not intentionally change the public contract. Any intentional breaking change requires a new major version.

## Continuous Evidence

The suite executes the original upstream cases and differential harnesses against independently installed `loader-utils@2.0.4` and `loader-utils@3.3.1`. The package is also installed under both its scoped name and the legacy `loader-utils` key before release.
