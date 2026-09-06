# KERNEL SUCCESSOR GIT-NATIVE — QUALIFICATION

STATUS: CANDIDATE_QUALIFIED_WITH_SEMANTIC_PARITY_LIMIT
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

## Recovery path A

FAIL_CLOSED / EXHAUSTED.
Canonical hashes and File Library identities exist for legacy ACTIVE kernels, but the authorized retrieval surface does not provide reliable complete byte export for every required payload. UAO 1.7 is the decisive blocker. No legacy payload was reconstructed, supplemented or guessed.

## Successor path B

Materialized on candidate branch:
- UAO-KERNEL 2.0
- UAR-KERNEL 1.1
- UAS-KERNEL 2.4
- UAB-KERNEL 1.2
- UAA-KERNEL 1.2
- UAL-KERNEL 1.2
- KERNEL_REGISTRY_1.0_CANDIDATE.json
- CONTROL_PLANE_HEAD_SUCCESSOR_1.0_CANDIDATE.json

All successor kernel payloads are complete Git text objects and were reread from Git. Registry binds exact SHA-256 identities. No ACTIVE state or canonical HEAD was modified.

## Cold-start probe

Candidate reconstruction path:
EMPTY_SESSION
-> externally anchored UCP 1.1-R4
-> candidate HEAD
-> exact Git successor registry
-> exact six successor kernel payloads
-> exact selected governance rules
-> UAO governance-policy hook
-> READY

Structural result: PASS.
No File Library or conversation-memory dependency is required by the successor path.

## Primitive repair

/refresh: redefined as UCP/HEAD/artifact revalidation followed by projection rebuild; projections are not authority.
/dump: defined as VERIFIED_DUMP_BUNDLE with manifest, HEAD identity, artifact hashes/locators, selected policies and recovery metadata.
/restore --check: read-only validation under current UCP semantics before any mutation.
Governed continuation: explicit causal hook added in UAO 2.0: HEAD rules -> fetch -> identity validation -> mandatory orchestration input -> disposition after causal execution unit.

## Contradictory finding

SEMANTIC_PARITY_WITH_ALL_LEGACY_BYTES: NOT_PROVABLE.
Reason: the exact complete legacy payload set cannot be retrieved through the authorized surface. Therefore the successor is a new governed kernel set, not an asserted byte- or semantic-equivalent migration.

Known core roles, authority classes, entrypoints and handoff boundaries are preserved in the successor design, but hidden/unretrieved legacy clauses cannot be proven preserved.

## Rollback

Before promotion, rollback target is the current canonical CONTROL_PLANE_HEAD identity and UAO 1.7/File-Library-based kernel set. Promotion must use fresh HEAD/CAS. If successor post-apply verification fails, restore the prior exact HEAD selection. Constitutional UCP/bootstrap are unchanged.

## G2 decision

Human judgment is required because promotion would intentionally replace the legacy kernel set with newly versioned Git-native successor semantics whose full semantic parity with inaccessible legacy bytes cannot be proven.

RECOMMENDATION: GO only if the priority is durable cold-start persistence and the bounded successor contracts are accepted as the new normative semantics. Otherwise HOLD until complete legacy payloads can be supplied externally.
