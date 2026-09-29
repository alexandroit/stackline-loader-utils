# Third-Party Licenses

Current direct installations use `emojis-list: npm:@stackline/emojis-list@1.0.0` and `json5: npm:@stackline/json5@1.0.0`. Their runtime payload and original MIT license texts match the upstream baselines below; see [DEPENDENCY_UPDATES.md](DEPENDENCY_UPDATES.md) for release evidence. The original license filenames are retained as attribution to those baselines.

## Production Dependencies

| Component | License | Shipped text |
| --- | --- | --- |
| emojis-list 3.0.0 | MIT | `licenses/emojis-list-3.0.0-MIT.txt` |
| json5 2.2.3 | MIT | `licenses/json5-2.2.3-MIT.txt` |

Both components are installed as separate npm packages and retain their own licenses. Complete copies are shipped for reproducible review.

## Derived Source

The public contract is derived from `webpack/loader-utils@2.0.4`; selected security and hash internals were ported from `3.3.1`. Both remain under the same MIT License. The full original notice is preserved in [LICENSE](LICENSE), and provenance is recorded in [NOTICE](NOTICE).

Development-only tools are not included in the published npm artifact and retain their respective licenses.
