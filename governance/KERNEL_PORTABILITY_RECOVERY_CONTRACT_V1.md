# KERNEL PORTABILITY & RECOVERY CONTRACT V1

STATUS: CANDIDATE_METHOD
TYPE: META_CAPABILITY_CONTRACT
AUTHORITY: governed by UCP/UAO; does not grant authority
COMMANDS_PROPOSED: /dump, /restore

## 1. Purpose

Provide a small, verifiable recovery and portability mechanism for an exact kernel or for the governed kernel system.

The mechanism is:

DUMP → VERIFY → RESTORE_CHECK → HUMAN_GATE_WHEN_REQUIRED → PRE_RESTORE_DUMP → RESTORE → VERIFY → REPORT.

It is not a new reasoning kernel. It is orchestration, packaging, integrity verification and governed mutation using existing UAS/UAB/UAA responsibilities when needed.

## 2. User surface

Target forms:

`/dump @UAA_ACTIVE.md`
`/dump @UAS_ACTIVE.md`
`/dump system`

`/restore <dump> --check`
`/restore <dump>`

Do not add optional modes until demonstrated need justifies them.

## 3. Dump semantics

A dump is an immutable archive representing the exact logical state needed to understand, audit and, where authorized, reconstruct the target.

Dumping is read-only with respect to the captured system. Creation of the archive is an output mutation only.

### Kernel dump closure

Include only material closure:

- exact target ACTIVE kernel file;
- UCP and UAO applicable to the target;
- directly material companion kernels and composition contracts needed to interpret target behavior;
- canonical control-plane state/snapshot portions or files needed to establish target state;
- target qualification ledger/evidence when present;
- recovery contract/schema;
- provenance and integrity data.

Do not export the entire Library merely because it is accessible.

### System dump closure

Include:

- UCP ACTIVE;
- UAO ACTIVE;
- all ACTIVE kernels in the canonical registry;
- canonical control-plane state and snapshot;
- learning registry metadata required to reconstruct system state;
- qualification state relevant to ACTIVE kernels;
- recovery/qualification governance artifacts required to interpret the package;
- provenance and integrity data.

## 4. Archive structure

Recommended canonical structure:

```
00_MANIFEST.json
01_README.md
kernel/
authority/
dependencies/
state/
qualification/
governance/
provenance/
  FILE_IDENTITIES.json
  HASHES.sha256
  DUMP_PROVENANCE.json
```

Exact empty directories need not be emitted.

## 5. Manifest contract

Every dump MUST record:

- schema_version;
- dump_id;
- created_at;
- scope: KERNEL | SYSTEM;
- target identity;
- source control-plane identity when available;
- applicable UCP/UAO identities;
- included files;
- each file's logical role;
- canonical source reference;
- content SHA-256;
- restore disposition;
- dependencies;
- missing required artifacts;
- exclusions that matter to interpretation;
- qualification state when available;
- dump completeness status.

Restore disposition is exactly one of:

- RESTORABLE
- CONTEXT_ONLY
- EVIDENCE_ONLY

Presence in the archive NEVER implies permission to restore the file.

## 6. Dump completeness

Dump status:

`COMPLETE | INCOMPLETE`

If a required artifact cannot be accessed, do not omit it silently. Record:

`MISSING_REQUIRED_ARTIFACT`

with expected identity/role when known and the reason it could not be captured.

A dump may still be useful for audit when INCOMPLETE, but restore feasibility must treat missing RESTORABLE material as blocking unless independently reconstructed and verified under authority.

## 7. Integrity

Every included payload file MUST have SHA-256 recorded in the manifest or HASHES.sha256.

Verification recomputes hashes before restore planning.

Archive identity SHOULD be derived from the canonical manifest plus payload hashes rather than archive byte layout, so ZIP metadata differences do not change logical dump identity.

## 8. Restore semantics

Restore is not blind archive extraction.

Canonical pipeline:

VERIFY_ARCHIVE
→ IDENTIFY_CURRENT_CANONICAL_STATE
→ COMPUTE_SEMANTIC_DIFF
→ CLASSIFY_MUTATIONS_AND_AUTHORITY
→ BUILD_RESTORE_PLAN
→ REQUIRED_HUMAN_GATE
→ CREATE_PRE_RESTORE_DUMP
→ REVALIDATE_CURRENT_STATE
→ APPLY_MINIMAL_RESTORE
→ VERIFY_RESTORED_IDENTITIES
→ RECONCILE_DERIVED_STATE
→ REPORT.

Only files marked RESTORABLE are candidates for mutation.

CONTEXT_ONLY and EVIDENCE_ONLY files MUST NOT be written back merely because they exist in the dump.

## 9. Restore check

`/restore <dump> --check` is non-mutating.

It MUST return at least:

- RESTORE_FEASIBILITY: PASS | HOLD | FAIL;
- dump identity and integrity;
- current target identity;
- intended restored identity;
- semantic changes;
- files that would change;
- files explicitly not restored;
- authority class required per mutation;
- human gates;
- dependency conflicts;
- stale-state conflicts;
- rollback feasibility;
- next required action.

A check result is not permission to execute restore.

## 10. Authority and human control

Restore MUST obey current authority, not authority recorded in the old dump.

An archive cannot grant itself permission.

Current UCP and current explicit user authority remain controlling unless the governing constitutional process explicitly authorizes otherwise.

Any restore that would:

- replace an ACTIVE kernel;
- alter UAO routing/composition;
- alter UCP;
- promote a candidate;
- expand authority;
- change promotion oracle/gates;
- change publication authority;

must be classified under current UCP before mutation and stop at the required HUMAN_GATE.

Restoring an older UCP/UAO from inside a dump can never be used to bypass the current governing authority.

## 11. Pre-restore safety dump

Before the first persistent restore mutation, create a dump of the exact state that will be displaced.

Requirements:

- scope sufficient to reverse the planned mutation;
- integrity verified;
- identity recorded in restore report;
- failure to create/verify it blocks restore whenever rollback is materially required.

This safety dump is not optional merely because the requested target dump is old or trusted.

## 12. Minimal restore

Restore only the causal delta necessary to reach the requested logical state.

Prefer:

UNCHANGED → leave untouched.
MATCHING_IDENTITY → leave untouched.
DERIVED_PROJECTION → regenerate/reconcile from canonical restored state rather than blindly restoring stale projection.
CONFLICTING_EXTERNAL_STATE → stop or reconcile explicitly; never overwrite silently.

Use `LOCAL_DELTA > GLOBAL_RECONSTRUCTION`.

## 13. Post-restore verification

A restore is not DONE when files were written.

Verify:

- restored file identities/hashes;
- SPEC_ID/STATUS/VERSION where applicable;
- UCP→UAO→kernel bootstrap/routing consistency;
- dependency closure;
- control-plane state reconciliation;
- no unauthorized files changed;
- rollback artifact exists when required.

Result:

`RESTORE_DONE | RESTORE_PARTIAL | RESTORE_BLOCKED | RESTORE_FAILED | HUMAN_GATE`.

## 14. Rollback

Rollback uses the verified pre-restore dump through the same restore pipeline. It is not a privileged bypass path.

`ROLLBACK == RESTORE(previous_verified_state)`

subject to current authority and integrity checks.

## 15. Failure rules

Fail closed on:

- invalid manifest;
- hash mismatch;
- ambiguous target identity;
- missing required RESTORABLE artifact;
- unresolved current-state conflict capable of changing restore correctness;
- insufficient authority;
- required human gate not satisfied;
- inability to establish required rollback when rollback is claimed/required.

Do not partially mutate first and discover these conditions later when they were preflight-detectable.

## 16. Portability

A COMPLETE dump should be usable as an exact independent-review handoff even when restore is not possible.

Portability does not mean universal executability. The receiving environment must distinguish:

- content present in archive;
- capabilities/tools available there;
- current authority there;
- external resources not embedded in archive.

Never claim an archive is self-sufficient when external dependencies remain.

## 17. Anti-overengineering invariant

This capability remains a small meta-layer. Do not create a new kernel unless repeated evidence shows existing UAO + UAB/UAA/UAS composition cannot correctly implement recovery.

Do not add backup policies, retention schedules, encryption, remote replication, incremental archives or automatic periodic dumps until a concrete requirement exists.

## 18. Promotion gate

This contract is CANDIDATE_METHOD until at least these behavioral tests pass:

1. kernel dump COMPLETE on one ACTIVE kernel;
2. tampered payload rejected by verification;
3. missing required artifact produces INCOMPLETE rather than silent success;
4. restore --check computes correct semantic delta without mutation;
5. restore refuses CONTEXT_ONLY writeback;
6. restore stops at HUMAN_GATE for ACTIVE/governance mutation;
7. pre-restore dump is created before authorized mutation;
8. successful bounded restore verifies exact intended identity;
9. rollback restores the displaced verified state;
10. system dump demonstrates bounded closure rather than Library-wide export.

Only after evidence should `/dump` and `/restore` be proposed for ACTIVE UAO routing.