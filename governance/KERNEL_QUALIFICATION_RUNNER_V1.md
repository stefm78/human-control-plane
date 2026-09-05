# KERNEL QUALIFICATION RUNNER V1

STATUS: READY_FOR_USE
TYPE: GOVERNED_METHOD
AUTHORITY: A0 qualification state; no ACTIVE kernel mutation or promotion
USES: KERNEL_QUALIFICATION_PROTOCOL_V1, KERNEL_QUALIFICATION_TEST_MATRIX_V1

## Purpose

Turn one generic request into a resumable qualification run that knows what has been covered, what remains, and when qualification is complete.

Canonical user request:

`/audit /solve @<KERNEL_ACTIVE.md> — qualification complète du kernel`

The user MUST NOT have to repeat the command merely to obtain the next arbitrary slice of work. One invocation runs all reasonably accessible discriminating tests available in the current execution. If a real external/human/tool gate prevents completion, persist the ledger and resume from that gate on the next invocation.

## Run identity

Each qualification run has:

- RUN_ID: `KQ-<SPEC_ID>-<TARGET_STATE_ID_SHORT>`
- TARGET_FILE
- SPEC_ID
- VERSION
- STATUS
- TARGET_STATE_IDENTITY when available
- STARTED_AT
- LAST_UPDATED_AT
- PROTOCOL_VERSION
- MATRIX_VERSION

A target identity change invalidates only evidence whose applicability changed. Do not restart valid unaffected evidence.

## Capability inventory

Before testing, derive a `CAPABILITY_INVENTORY` from the complete target kernel specification.

A capability is a material behavior, mechanism, boundary, output, handoff, stop condition, mode, re-entry rule or composition contract. Do not create one item per sentence.

Every material capability receives a stable local ID and one state:

`UNASSESSED | STATIC_COVERED | BEHAVIORAL_COVERED | COMPARATIVE_COVERED | BLOCKED | NOT_APPLICABLE | INVALIDATED`.

The ledger MUST make it possible to answer whether every material kernel function has been considered.

## Coverage dimensions

Maintain four separate coverage sets:

1. COMPONENT_COVERAGE — internal material mechanisms.
2. STANDALONE_COVERAGE — representative scenario families.
3. COMPOSITION_COVERAGE — supported material handoffs/compositions.
4. SYSTEM_COVERAGE — only system questions capable of changing the kernel/system architectural decision.

`COVERED` never means `PROVEN`. Record evidence level separately.

## Test selection loop

Repeat internally:

1. Load current ledger or initialize it.
2. Identify uncovered or unresolved items.
3. Rank candidate tests by expected ability to change:
   - verdict;
   - defect set;
   - ownership;
   - risk characterization;
   - required action;
   - architectural decision.
4. Execute the cheapest high-value discriminating test that is reasonably accessible.
5. Record evidence and update only affected ledger items.
6. Recompute convergence.
7. Continue automatically while another accessible test has material expected decision value.

Do NOT stop because one FAIL is already sufficient if another cheap test can materially change repair scope, defect set, risk or ownership.

Do NOT continue merely to reach 100% numerical coverage when remaining items cannot materially affect the decision.

## Evidence record

For each test record:

- TEST_ID
- TARGET_CAPABILITIES
- LEVEL: COMPONENT | STANDALONE | COMPOSITION | SYSTEM
- METHOD
- RESULT: PASS | FAIL | HOLD | BLOCKED | NOT_APPLICABLE
- EVIDENCE_LEVEL: STATIC | BEHAVIORAL | COMPARATIVE
- OBSERVATION
- FINDING_IDS
- OWNERSHIP_EFFECT
- DECISION_EFFECT
- ARTIFACT_OR_SOURCE_REFERENCE
- REUSABLE_IF_TARGET_CHANGES: YES | NO | CONDITIONAL

Never upgrade STATIC evidence to BEHAVIORAL or COMPARATIVE by inference.

## Finding lifecycle

Findings use:

`CANDIDATE → REPRODUCED → OWNERSHIP_ESTABLISHED → REPAIRABLE | REJECTED | BLOCKED`.

Each reproduced finding must be assigned one ownership class from the qualification protocol before a repair is proposed.

## Convergence states

The run state is exactly one of:

- `QUALIFICATION_IN_PROGRESS`
- `QUALIFICATION_BLOCKED`
- `QUALIFICATION_COMPLETE`
- `TARGET_INVALIDATED`

`QUALIFICATION_COMPLETE` requires all of the following:

1. every material capability is at least considered and is not `UNASSESSED`;
2. all material standalone scenario families are covered or explicitly justified as not applicable;
3. all material supported compositions capable of changing the decision are covered, blocked with residual risk explicitly accepted by the verdict, or justified as not applicable;
4. system-level ownership/value questions material to the target have been resolved sufficiently for the architectural decision;
5. no reasonably accessible remaining test is likely to materially change verdict, defect set, ownership, risk characterization, required action or architectural decision;
6. unresolved BLOCKED items are explicitly visible and are not silently converted into PASS.

A run may be `QUALIFICATION_COMPLETE` with residual uncertainty only when that uncertainty cannot reasonably change the required decision. Otherwise it is `QUALIFICATION_BLOCKED`.

## Required end-of-run output

Always output:

- RUN_STATE
- TARGET_IDENTITY
- GLOBAL_VERDICT
- CAPABILITY_COVERAGE: covered / total material capabilities
- EVIDENCE_PROFILE: static / behavioral / comparative / blocked
- COMPOSITION_COVERAGE
- MATERIAL_FINDINGS
- REJECTED_FINDINGS
- OWNERSHIP_MAP
- RESIDUAL_RISK
- MINIMAL_REPAIR_SET
- DO_NOT_CHANGE
- NEXT_REQUIRED_ACTION

If complete, `NEXT_REQUIRED_ACTION: NONE` unless a repair/promotion is separately requested.

If blocked, `NEXT_REQUIRED_ACTION` MUST identify the real missing human/tool/external dependency, not tell the user to rerun blindly.

## Persistence

Persist one ledger per target identity under:

`qualification/runs/<RUN_ID>.json`

and an optional human-readable summary under:

`qualification/runs/<RUN_ID>.md`.

The JSON ledger is the resumable state. The Markdown summary is a projection only.

Do not use conversation history as the sole source of qualification progress when a persisted ledger exists.

## Mutation boundary

This runner may create/update qualification ledgers and evidence artifacts. It MUST NOT:

- modify an ACTIVE kernel;
- promote a candidate kernel;
- expand kernel authority;
- redefine UCP/UAO authority;
- convert a qualification finding directly into a kernel mutation.

Repair remains a separate governed action after qualification and ownership are established.

## Anti-overengineering rule

The runner itself must remain orchestration/state, not become another reasoning kernel. UAA provides prove/refute behavior; UAS provides best-design/necessity judgment. This runner only ensures coverage, evidence accounting, resumability and convergence.

If repeated use shows the runner adds no material value over ordinary `/audit /solve`, remove it rather than expanding it.