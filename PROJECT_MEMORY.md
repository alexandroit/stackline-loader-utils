# Project Memory

## Identity

- npm: `@stackline/loader-utils`
- legacy alias: `loader-utils@npm:@stackline/loader-utils`
- GitHub: `alexandroit/stackline-loader-utils`
- docs: `https://alexandro.net/docs/vanilla/loader-utils/`
- license: MIT
- upstream: `webpack/loader-utils`
- source baselines: `3.3.1`, commit `06fcc0aac9928779d5e2e0fdc58dddd5d4c49ea3`, plus retained helper APIs from `2.0.4`

## Immutable Decisions

- Preserve the `loader-utils@3.3.1` CommonJS API, `loader-utils@2.0.4` helper APIs and deep imports.
- Preserve Node.js 12.13 compatibility and TypeScript 3.9 declarations.
- Keep production dependencies exact, recursively reviewed and audit-clean. `json5@2.2.3` is accepted through 2026-11-30 and has no dependencies.
- Every release must pass warning-free direct and legacy-name installs, `npm ls --all`, production and full npm audits, baseline differential tests, package validation and compatibility matrices.
- Never remove upstream attribution, history or the MIT notice.
- Never publish a tarball that differs from the artifact verified by release gates.

## Dependency Chain Role

This package is the maintained leaf used to remove archived `loader-utils` from `@stackline/resolve-url-loader`. Dependency remediation is always leaf-first.

## Release Record

- `1.0.0` was published only to local Verdaccio as a preflight artifact. The real `resolve-url-loader` Webpack 4 suite exposed that a pure `3.3.1` API baseline omitted `getOptions`; it must never be promoted to public npm.
- `1.0.1` restores the six `2.0.4` helper APIs, keeps the four current `3.3.1` APIs, hardens unsafe query keys and is the first public-release candidate.
