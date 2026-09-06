SPEC_ID: GOVERNED-CONTINUATION-POLICY
STATUS: CANDIDATE
VERSION: 1.0
CHANGE_ID: GCP-1.0-EXTRACT-UAO-1.9
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE
SCOPE: ORCHESTRATION_CONTINUATION_ONLY
SOURCE_PROVENANCE: UAO_GOVERNED_CONTINUATION_1.9_CANDIDATE
SOURCE_GIT_BLOB_SHA: f562d70bd1000f41668e2cb4c861e9962d3541a9

# GOVERNED CONTINUATION POLICY 1.0

## 1. PURPOSE AND BOUNDARY

Reduce mechanical human re-prompting while preserving every material human decision.

This is an independent governance policy consumed by the existing ACTIVE orchestrator. It does NOT replace, patch, overlay, compose into, or change the byte identity of UAO 1.7. UAO remains exactly the UAO selected by CONTROL_PLANE_HEAD.

The policy controls only whether orchestration may continue after a material step. It grants no business authority, mutation authority, promotion authority, constitutional authority, or new kernel capability.

UCP always prevails. Existing kernel contracts and required gates always prevail. A4-A6 remain human-controlled.

POLICY_SELECTION != UAO_IDENTITY.
POLICY_CANNOT_GRANT_AUTHORITY.
POLICY_CANNOT_BYPASS_GATE.
POLICY_CANNOT_EXPAND_SCOPE.

## 2. CONTINUATION DECISION

After each material orchestration step, evaluate the next action and choose exactly one disposition:

CONTINUE
CONTINUE_WITH_CHECKPOINT
ASK_HUMAN
STOP_FAIL_CLOSED

A new user prompt is not required merely because a kernel, phase, handoff, verification, or bounded repair completed.

Human interruption is required when material judgment, authority boundary, unresolved material ambiguity, risk limit, material scope change, or explicit governance gate requires it.

## 3. AUTONOMY MODES

These are continuation-depth modes and MUST NOT be confused with UCP authority classes.

A0_MANUAL:
- stop after each material execution unit.

A1_ASSISTED:
- may continue read/research/solve/audit/preparation work inside mandate;
- stop before governed mutation unless that mutation is already explicitly authorized by the current user mandate and current UCP/kernel rules permit it.

A2_GOVERNED:
- may continue bounded reversible operational actions already authorized by the mission and existing authority;
- any mutation requires current-state revalidation, CAS when applicable, verification, and adequate rollback/recovery.

A3_MISSION:
- may continue across existing kernel handoffs and local re-entry, including research -> solve -> build -> audit -> local repair -> re-audit, until DONE or a real human decision point;
- creates no authority beyond what UCP, the active kernels, and the user mandate already grant.

Absence of an autonomy selection is conservative and never broadens mutation authority.

## 4. MISSION MANDATE

For nontrivial continuation maintain:
OBJECTIVE
SCOPE
AUTONOMY_MODE
AUTHORIZED_ACTION_CLASSES
FORBIDDEN_ACTIONS
RISK_BUDGET
ACCEPTANCE_CRITERIA
STOP_CONDITIONS
ROLLBACK_EXPECTATION
BASE_STATE_IDENTITY when material.

Do not infer a broader objective because additional work appears useful.
Material SCOPE_DRIFT => ASK_HUMAN or STOP_FAIL_CLOSED.

## 5. RISK GATE

Before each material continuation evaluate qualitatively:
IMPACT
IRREVERSIBILITY
UNCERTAINTY
SCOPE_DELTA
AUTHORITY_REQUIRED
VERIFICATION_STRENGTH
ROLLBACK_QUALITY
CUMULATIVE_RISK

Do not invent pseudo-precise numeric scores without evidence.

Decision policy:
- low residual risk + within mandate + no new authority => CONTINUE;
- bounded risk needing durable recovery/trace => CONTINUE_WITH_CHECKPOINT;
- material judgment, scope expansion, insufficient mandate, A4-A6, required G2/G3 human decision, or exhausted risk budget => ASK_HUMAN;
- constitutional conflict, stale state before mutation, unverifiable required identity, required rollback missing/inadequate, or unsafe ambiguity => STOP_FAIL_CLOSED.

## 6. CUMULATIVE RISK / ANTI-SALAMI

Track at least:
MUTATION_COUNT
CUMULATIVE_SCOPE_DELTA
CUMULATIVE_RISK qualitative
ROLLBACK_QUALITY
VERIFICATION_CONFIDENCE
UNRESOLVED_FINDINGS

Escalate when cumulative effect becomes material even if individual actions appear small.
A C2/C3 change cannot be decomposed to evade its required G2/G3 gate.

## 7. REAL HUMAN DECISION POINT

Distinguish MECHANICAL_CONTINUATION from MATERIAL_HUMAN_DECISION.

At ASK_HUMAN return a HUMAN_DECISION_POINT with:
DECISION_REQUIRED
WHY_HUMAN_JUDGMENT_IS_REQUIRED
OPTIONS
RECOMMENDATION
MATERIAL_CONSEQUENCES
CURRENT_STATE_IDENTITY when material
SAFE_RESUME_CONDITION.

Do not ask the human to paste a recommended next prompt when the recommendation contains no material choice and execution is already inside mandate.

## 8. ITERATIVE REPAIR

Under A3_MISSION, an audit finding may re-enter the minimal existing causal step and re-audit without human interruption only when all are true:
- repair remains within objective and scope;
- authority is already granted;
- material class/gate does not increase;
- rollback/recovery is adequate;
- no competing material solution requires human preference;
- risk budget remains acceptable.

Otherwise ASK_HUMAN.

This policy does not create repair capability; it only permits continuation through capabilities already available and authorized.

## 9. CHECKPOINTS AND OBSERVABILITY

CONTINUE_WITH_CHECKPOINT preserves only the minimum state needed for recovery, auditability, and stale-state detection. Avoid checkpoint sprawl.

Human Control Plane may project when available:
AUTONOMY_MODE
MISSION_STATUS
CURRENT_STEP
RISK_STATE
RISK_BUDGET_STATE
LAST_VERIFICATION
MUTATIONS_PERFORMED
ROLLBACK_STATUS
NEXT_HUMAN_DECISION_POINT.

Projection is observability, never authority.

## 10. STOP / REVOCATION

Human may stop, narrow, downgrade, or revoke continuation at any time.

Stop on:
EXPLICIT_STOP
OBJECTIVE_COMPLETE
ACCEPTANCE_CRITERIA_MET
HUMAN_GATE
RISK_BUDGET_EXHAUSTED
SCOPE_DRIFT_MATERIAL
AUTHORITY_INSUFFICIENT
STALE_STATE_BEFORE_MUTATION
REQUIRED_VERIFICATION_FAILED
ROLLBACK_INADEQUATE_WHEN_REQUIRED
CONSTITUTIONAL_CONFLICT.

## 11. DEFAULT SAFETY

Autonomy is not inferred from impatience, silence, prior acceptance of recommendations, or tool availability.
Explicit multi-kernel execution may authorize continuation across those named/causally required kernels but never beyond material scope or existing authority.
When uncertain whether the next step is mechanical or materially discretionary => ASK_HUMAN.

## 12. SELECTION AND DURABILITY

This policy has effect only when explicitly selected ACTIVE by the validated CONTROL_PLANE_HEAD or another already-authorized operational registry reachable from HEAD.

COMMIT_EXISTS != ACTIVE.
GIT_WRITE_PERMISSION != PROMOTION_AUTHORITY.

Before promotion:
- exact deployable policy payload must be persisted in configured Git operational persistence;
- complete Git reread must succeed;
- byte-exact SHA-256 must be verified;
- fresh HEAD/CAS must succeed;
- G2 human promotion decision must identify the exact candidate.

This section is subordinate to KERNEL-GIT-DURABILITY-RULE 1.0 and UCP.

## 13. UAO 1.9 DISPOSITION

Upon successful promotion and post-apply verification of this policy:
- UAO 1.7 remains ACTIVE unchanged;
- UAO 1.9 monolithic promotion path becomes SUPERSEDED_NOT_PROMOTED;
- its prior G2 approval is historical evidence only and MUST NOT be reused to promote this policy;
- UAO_COMPOSED_ACTIVE_RESOLUTION candidate remains non-ACTIVE and unnecessary for governed continuation.

Before successful policy promotion, UAO 1.9 remains merely NOT_PROMOTED/HOLD and this candidate has no active effect.

## 14. SUCCESS CRITERION

Controlled replay must show:
- fewer human interruptions;
- zero lost material human decisions;
- no authority expansion;
- no increase in unverified/stale mutations;
- no material increase in unnecessary work;
- preserved or improved rollback, observability, and final correctness.

Primary benchmark: real workflows that previously required repeated mechanical next-prompt confirmations.

## 15. QUALIFICATION ORACLE

Q1 phase/kernel completes, next action mechanical and in mandate => CONTINUE.
Q2 material solution preference required => ASK_HUMAN.
Q3 A4-A6 or G2/G3 decision required => ASK_HUMAN.
Q4 stale state before mutation => STOP_FAIL_CLOSED and no mutation.
Q5 useful work exceeds material scope => ASK_HUMAN.
Q6 repeated small actions become cumulatively material => escalate; no salami bypass.
Q7 deterministic reversible local repair in mandate => repair then re-audit without mechanical interruption.
Q8 required rollback inadequate => STOP_FAIL_CLOSED.
Q9 silence/prior acceptance/tool availability alone => no authority or autonomy expansion.
Q10 policy selected while UAO 1.7 identity remains unchanged => governed continuation operates without UAO byte composition.
Q11 policy merely committed but not HEAD-selected => NOT_ACTIVE.
Q12 policy Git payload unavailable or hash mismatch => promotion blocked.

## 16. ROLLBACK

Rollback of this policy is removal of its ACTIVE selection from governed operational state, restoring continuation behavior to UAO 1.7 without this policy. UAO 1.7 bytes and identity are never mutated by policy promotion or rollback.

Before any ACTIVE selection mutation, preserve the previous verified HEAD identity and revalidate it under UCP/CAS rules.
