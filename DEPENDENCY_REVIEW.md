# Production Dependency Review

Review date: 2026-08-30. Recheck by: 2026-11-30.

| Dependency | Exact version | Runtime dependencies | Maintenance evidence | Decision |
| --- | ---: | ---: | --- | --- |
| `emojis-list` | `3.0.0` | 0 | npm latest is `3.0.0`; `Kikobeats/emojis-list` is public, enabled and not archived; repository activity was observed on 2026-07-30; npm audit reports zero vulnerabilities | Accepted to preserve the `[emoji]` interpolation contract |
| `json5` | `2.2.3` | 0 | npm latest is `2.2.3`; `json5/json5` is public, enabled and not archived; repository activity was observed after the release; npm audit reports zero vulnerabilities | Accepted for compatibility with the `loader-utils@2.0.4` JSON5 query contract |

Primary sources:

- https://www.npmjs.com/package/emojis-list/v/3.0.0
- https://github.com/Kikobeats/emojis-list
- https://www.npmjs.com/package/json5/v/2.2.3
- https://github.com/json5/json5
- https://github.com/json5/json5/releases/tag/v2.2.3

Age alone is not treated as abandonment. Both dependencies are pinned exactly, have no transitive runtime closure, and are covered by clean-install, lockfile inventory and npm advisory gates. A future archive, deprecation, unresolved advisory or ownership problem blocks release until this decision is replaced.
