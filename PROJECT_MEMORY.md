# Project Memory

## Identity

- npm: `@stackline/loader-utils`
- legacy alias: `loader-utils@npm:@stackline/loader-utils`
- GitHub: `alexandroit/stackline-loader-utils`
- docs: `https://alexandro.net/docs/vanilla/loader-utils/`
- license: MIT
- upstream: `webpack/loader-utils`
- compatibility baseline: `2.0.4`, commit `6688b5028106f144ee9f543bebc8e6a87b57829f`; selected hardening internals from `3.3.1`

## Immutable Decisions

- Preserve the complete `loader-utils@2.0.4` CommonJS API, overlapping semantics, export order and deep imports.
- Preserve Node.js 12.13 compatibility and TypeScript 3.9 declarations.
- Keep production dependencies exact, recursively reviewed and audit-clean. `emojis-list@3.0.0` and `json5@2.2.3` are accepted through 2026-11-30 and each has no dependencies.
- Every release must pass warning-free direct and legacy-name installs, `npm ls --all`, production and full npm audits, baseline differential tests, package validation and compatibility matrices.
- Never remove upstream attribution, history or the MIT notice.
- Never publish a tarball that differs from the artifact verified by release gates.

## Dependency Chain Role

This package is the maintained leaf used to remove archived `loader-utils` from `@stackline/resolve-url-loader`. Dependency remediation is always leaf-first.

## Release Record

- `1.0.0` was published only to local Verdaccio as a preflight artifact. The real `resolve-url-loader` Webpack 4 suite exposed that a pure `3.3.1` API baseline omitted `getOptions`; it must never be promoted to public npm.
- `1.0.1` was also Verdaccio-only. The real downstream contract suite found that shared URL semantics still followed `3.3.1`; it must never be promoted.
- `1.0.2` targets the complete `2.0.4` contract, removes `big.js` through a differential-tested native base encoder, retains two maintained leaf dependencies and is the first public-release candidate.
