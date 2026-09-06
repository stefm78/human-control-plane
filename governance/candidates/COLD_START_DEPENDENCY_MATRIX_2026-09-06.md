# COLD-START DEPENDENCY MATRIX — 2026-09-06

Qualification status against current canonical state.

| Component | Canonical selection source | Exact Git payload available from HEAD path | Cold-start status |
|---|---|---:|---|
| UCP 1.1-R4 | external bootstrap anchor -> Git | YES | PASS |
| CONTROL_PLANE_HEAD | UCP-configured Git object | YES | PASS |
| UAO 1.7 | HEAD -> CHATGPT_FILE_LIBRARY | NO via Git-only path | BLOCKER |
| KERNEL-GIT-DURABILITY-RULE 1.0 | HEAD -> Git | YES | PASS |
| GOVERNED-CONTINUATION-POLICY 1.0 | HEAD -> Git | YES | selected payload PASS; causal consumer proof HOLD |
| UAR/UAS/UAB/UAA/UAL | resolved through UAO/state semantics, not independently enumerated in current HEAD | NOT PROVEN HEAD-sufficient | HOLD |
| /refresh | UAO contract + UCP R4 semantics | contract mismatch identified | FAIL pending successor contract |
| /dump | UAO contract | real primitive; R4 verified bundle not yet proven | HOLD |
| /restore --check | UAO contract | real primitive; exact full reconstruction unavailable | HOLD |

## Key conclusion
The persistence defect is not only storage of UAO 1.7. Current HEAD is also not yet self-sufficient for direct cold-start resolution of UAR/UAS/UAB/UAA/UAL identities and locators independent of UAO/session-derived state. A compliant successor should either enumerate these selected kernel identities in HEAD or reference an exact Git registry from HEAD that does so.

No ACTIVE mutation performed.
