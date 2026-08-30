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

The published package has one exact production dependency, `json5@2.2.3`, with zero transitive dependencies. Its maintenance evidence and review expiry are recorded in [DEPENDENCY_REVIEW.md](DEPENDENCY_REVIEW.md). Every release gate performs clean-install, recursive tree, license inventory and npm advisory checks.

## Security Baseline

The source begins from `loader-utils@3.3.1`, which includes the upstream ReDoS correction released in `3.2.1`. Retained query helpers reject `__proto__`, `prototype` and `constructor`. Regression coverage exercises multi-megabyte malformed URL input under a hard process deadline and verifies that attacker-shaped objects do not mutate `Object.prototype`.

User-provided `options.regExp` is executable regular-expression configuration and should only be supplied by trusted loader configuration, matching the upstream contract.
