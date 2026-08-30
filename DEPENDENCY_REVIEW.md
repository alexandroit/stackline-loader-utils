# Production Dependency Review

Review date: 2026-08-30. Recheck by: 2026-11-30.

| Dependency | Exact version | Runtime dependencies | Maintenance evidence | Decision |
| --- | ---: | ---: | --- | --- |
| `json5` | `2.2.3` | 0 | npm latest is `2.2.3`; `json5/json5` is public, enabled and not archived; repository activity was observed after the release; npm audit reports zero vulnerabilities | Accepted for compatibility with the `loader-utils@2.0.4` JSON5 query contract |

Primary sources:

- https://www.npmjs.com/package/json5/v/2.2.3
- https://github.com/json5/json5
- https://github.com/json5/json5/releases/tag/v2.2.3

Age alone is not treated as abandonment. The dependency is pinned exactly, has no transitive runtime closure, and is covered by clean-install, lockfile inventory and npm advisory gates. A future archive, deprecation, unresolved advisory or ownership problem blocks release until this decision is replaced.
