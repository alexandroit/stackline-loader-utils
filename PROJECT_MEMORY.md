# Project Memory

## Identity

- npm: `@stackline/loader-utils`
- legacy alias: `loader-utils@npm:@stackline/loader-utils`
- GitHub: `alexandroit/stackline-loader-utils`
- docs: `https://alexandro.net/docs/vanilla/loader-utils/`
- license: MIT
- upstream: `webpack/loader-utils`
- source baseline: `3.3.1`, commit `06fcc0aac9928779d5e2e0fdc58dddd5d4c49ea3`

## Immutable Decisions

- Preserve the `loader-utils@3.3.1` CommonJS API and deep imports.
- Preserve Node.js 12.13 compatibility and TypeScript 3.9 declarations.
- Keep the production dependency count at zero.
- Every release must pass warning-free direct and legacy-name installs, `npm ls --all`, production and full npm audits, baseline differential tests, package validation and compatibility matrices.
- Never remove upstream attribution, history or the MIT notice.
- Never publish a tarball that differs from the artifact verified by release gates.

## Dependency Chain Role

This package is the maintained leaf used to remove archived `loader-utils` from `@stackline/resolve-url-loader`. Dependency remediation is always leaf-first.

## Release Record

No Stackline release has been published yet.
