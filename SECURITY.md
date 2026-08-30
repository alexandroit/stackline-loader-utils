# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| Latest `1.x` | Yes |
| Older releases | Upgrade required |

## Reporting a Vulnerability

Do not open a public issue for an undisclosed vulnerability. Use GitHub's private vulnerability reporting for [`alexandroit/stackline-loader-utils`](https://github.com/alexandroit/stackline-loader-utils/security/advisories/new).

Include the affected version, runtime, minimal reproduction, impact and any known mitigation. Reports are acknowledged as soon as practical and coordinated disclosure is preferred.

## Dependency Standard

The published package has two exact production dependencies, `emojis-list@3.0.0` and `json5@2.2.3`. Both are current npm versions, have zero dependencies and have current non-archived upstream repositories. Maintenance evidence and review expiry are recorded in [DEPENDENCY_REVIEW.md](DEPENDENCY_REVIEW.md). Every release gate performs clean-install, recursive tree, license inventory and npm advisory checks.

## Security Baseline

The public contract follows `loader-utils@2.0.4`. Linear-time URL/hash internals and the upstream ReDoS correction from the later `3.2.1` line were ported without changing `2.0.4` outputs. Query helpers reject `__proto__`, `prototype` and `constructor`. Regression coverage exercises multi-megabyte malformed input under a hard process deadline and verifies that attacker-shaped objects do not mutate `Object.prototype`.

User-provided `options.regExp` is executable regular-expression configuration and should only be supplied by trusted loader configuration, matching the upstream contract.
