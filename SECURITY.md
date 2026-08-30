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

The published package has zero production dependencies. Every release gate still performs clean-install, recursive tree and npm advisory checks so this guarantee cannot regress unnoticed.

## Security Baseline

The source begins from `loader-utils@3.3.1`, which includes the upstream ReDoS correction released in `3.2.1`. Regression coverage exercises multi-megabyte malformed URL input under a hard process deadline and verifies that attacker-shaped objects do not mutate `Object.prototype`.

User-provided `options.regExp` is executable regular-expression configuration and should only be supplied by trusted loader configuration, matching the upstream contract.
