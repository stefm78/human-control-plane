# KERNEL RECOVERY TEST MATRIX V1

STATUS: READY_FOR_USE
CONTRACT: KERNEL_PORTABILITY_RECOVERY_CONTRACT_V1

## Objective

Prove that dump/restore provides real recovery and independent-review value without creating an unsafe universal backup subsystem.

## A. Dump tests

| ID | Test | Pass condition |
|---|---|---|
| D1 | Exact target identity | manifest identifies exact canonical target and state identity |
| D2 | Authority context | applicable UCP/UAO identities captured |
| D3 | Dependency closure | all and only materially required companions/state included |
| D4 | File integrity | every payload has recorded SHA-256 |
| D5 | Missing required artifact | dump becomes INCOMPLETE with explicit missing artifact |
| D6 | Restore disposition | every payload is RESTORABLE, CONTEXT_ONLY or EVIDENCE_ONLY |
| D7 | Bounded scope | unrelated Library content is absent |
| D8 | Qualification state | current target qualification state included when materially present |
| D9 | Independent readability | README/manifest allow reviewer to understand target without conversation history |

## B. Verification tests

| ID | Test | Pass condition |
|---|---|---|
| V1 | Untampered dump | all hashes and manifest relationships verify |
| V2 | Payload tamper | verification fails closed |
| V3 | Manifest tamper | verification fails closed or identity changes visibly |
| V4 | Missing payload | required missing payload blocks restore feasibility |
| V5 | Extra payload | unmanifested payload is ignored/rejected, never silently restored |

## C. Restore-check tests

| ID | Test | Pass condition |
|---|---|---|
| R1 | No-op current state | semantic diff reports no mutation needed |
| R2 | One-file rollback | exact intended delta identified |
| R3 | Context-only difference | context file is not proposed for writeback |
| R4 | Current authority wins | old dump authority cannot lower current gate |
| R5 | Stale current state | conflicting current identity is surfaced before mutation |
| R6 | Missing required dependency | feasibility HOLD/FAIL rather than partial optimism |
| R7 | Derived state | projection/state regeneration is distinguished from canonical restore |

## D. Restore execution tests

| ID | Test | Pass condition |
|---|---|---|
| E1 | Human gate | ACTIVE/governance mutation stops until required approval exists |
| E2 | Pre-restore dump | displaced state is captured and verified before first mutation |
| E3 | Revalidation | state is rechecked immediately before mutation |
| E4 | Minimal delta | unchanged files are not rewritten |
| E5 | Exact restore | resulting target identity matches intended dump identity |
| E6 | Dependency verification | restored target remains consistent with governing UCP/UAO and companions |
| E7 | Unauthorized surface | no file outside approved restore plan changes |
| E8 | Failure containment | preflight-detectable failure causes zero target mutation |

## E. Rollback tests

| ID | Test | Pass condition |
|---|---|---|
| B1 | Rollback source | exact pre-restore dump is selected |
| B2 | Same safety pipeline | rollback uses verify/diff/gate/revalidate, not privileged bypass |
| B3 | Identity recovery | displaced state identity is restored exactly |
| B4 | Audit trail | restore and rollback reports preserve both transitions |

## F. System dump tests

| ID | Test | Pass condition |
|---|---|---|
| S1 | Registry closure | all canonical ACTIVE kernels are represented |
| S2 | State closure | control-plane state/snapshot and required registry metadata represented |
| S3 | No Library clone | unrelated files are not included |
| S4 | Governance distinction | canonical authority is distinguishable from Git/Web projections |
| S5 | Review handoff | package is sufficient to establish exact system identity or explicitly INCOMPLETE |

## Promotion gate

Do not modify ACTIVE UAO merely because these specifications exist.

Minimum evidence before proposing UAO promotion:

- D1-D7 behavioral PASS on a real ACTIVE kernel;
- V1-V5 behavioral PASS using generated/tampered fixtures;
- R1-R7 behavioral PASS;
- E1 and E2 demonstrated without bypass;
- at least one bounded restore E3-E7 PASS in an authorized reversible test surface;
- B1-B4 PASS;
- S1-S5 PASS on a system dump dry-run or real dump.

If implementation constraints make exact restore impossible in the current platform, keep `/dump` as an audit/portability capability and report `/restore` as BLOCKED rather than weakening the contract.