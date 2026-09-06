# COLD START PROBE — 2026-09-06

Scope: read-only qualification against current canonical UCP -> HEAD. No ACTIVE mutation.

## Inputs allowed
- external bootstrap-bound UCP identity
- Git access to stefm78/human-control-plane

## Inputs forbidden
- prior conversation memory as authority
- cached CONTROL_PLANE_STATE as authority
- semantic reconstruction of unavailable payloads

## Canonical observations
- UCP 1.1-R4 is retrievable from Git at governance/UCP_ACTIVE.md and is the configured constitutional payload.
- CONTROL_PLANE_HEAD is retrievable from Git and selects UAO 1.7 through CHATGPT_FILE_LIBRARY.
- HEAD selects KERNEL-GIT-DURABILITY-RULE 1.0 and GOVERNED-CONTINUATION-POLICY 1.0 through exact Git locators.

## Probe result
A cold start using bootstrap + Git only cannot completely reconstruct the selected ACTIVE orchestrator because UAO 1.7 is not resolved from Git by HEAD.

Result:
- UCP resolution: PASS
- HEAD resolution: PASS
- Git-selected governance rules: PASS
- UAO exact payload via Git-only path: FAIL/UNAVAILABLE
- complete ACTIVE kernel reconstruction: HOLD
- IDENTITY(RECONSTRUCTED_KERNEL) == IDENTITY(CANONICAL_KERNEL): NOT_PROVEN

## Fail-closed conclusion
Current Kernel does not yet satisfy EMPTY_SESSION + BOOTSTRAP => EXACT_ACTIVE_KERNEL under a Git-only non-conversational reconstruction model.
No approximation of UAO 1.7 is permitted.
