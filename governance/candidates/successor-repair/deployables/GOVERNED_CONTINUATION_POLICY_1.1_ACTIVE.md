SPEC_ID: GOVERNED-CONTINUATION-POLICY
STATUS: ACTIVE
VERSION: 1.1
CHANGE_ID: GCP-1.1-ORCHESTRATOR-AGNOSTIC
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE
SCOPE: ORCHESTRATION_CONTINUATION_ONLY

# GOVERNED CONTINUATION POLICY 1.1 — DEPLOYABLE

PURPOSE: reduce mechanical human re-prompting while preserving every material human decision, independently of any particular orchestrator version.

BOUNDARY:
- independent continuation policy consumed only by the orchestrator currently selected by the validated authoritative HEAD/registry;
- does not select, replace, patch, compose into, or confer ACTIVE status on any orchestrator;
- controls continuation depth only; grants no authority or capability;
- UCP, selected kernel contracts and gates prevail; A4-A6 remain human-controlled;
- POLICY_CANNOT_GRANT_AUTHORITY; POLICY_CANNOT_BYPASS_GATE; POLICY_CANNOT_EXPAND_SCOPE;
- if no compatible orchestrator is authoritatively selected, the policy has no effect and continuation is conservative/fail-closed as applicable.

CONTINUATION_DISPOSITIONS:
CONTINUE
CONTINUE_WITH_CHECKPOINT
ASK_HUMAN
STOP_FAIL_CLOSED

CONTINUATION_RULE:
No new prompt is required merely because a kernel, phase, handoff, verification, or bounded repair completed. Interrupt only for material judgment, authority boundary, unresolved material ambiguity, risk limit, material scope change, or explicit governance gate.

AUTONOMY_MODES:
A0_MANUAL = stop after each material execution unit.
A1_ASSISTED = continue read/research/solve/audit/preparation inside mandate; governed mutation only when explicitly authorized and otherwise permitted.
A2_GOVERNED = continue bounded reversible operational actions already authorized; mutation requires current-state revalidation, CAS when applicable, verification and adequate rollback/recovery.
A3_MISSION = continue across existing kernel handoffs and local re-entry, including research->solve->build->audit->local repair->re-audit, until DONE or a real human decision point.
These are continuation-depth modes, not UCP authority classes. Absence of a mode is conservative.

MISSION_MANDATE:
For nontrivial continuation maintain OBJECTIVE, SCOPE, AUTONOMY_MODE, AUTHORIZED_ACTION_CLASSES, FORBIDDEN_ACTIONS, RISK_BUDGET, ACCEPTANCE_CRITERIA, STOP_CONDITIONS, ROLLBACK_EXPECTATION, and BASE_STATE_IDENTITY when material. Do not infer broader scope because more work appears useful. Material scope drift => ASK_HUMAN or STOP_FAIL_CLOSED.

RISK_GATE:
Evaluate IMPACT, IRREVERSIBILITY, UNCERTAINTY, SCOPE_DELTA, AUTHORITY_REQUIRED, VERIFICATION_STRENGTH, ROLLBACK_QUALITY and CUMULATIVE_RISK qualitatively.
Low residual risk + in mandate + no new authority => CONTINUE.
Bounded risk needing durable recovery/trace => CONTINUE_WITH_CHECKPOINT.
Material judgment, scope expansion, insufficient mandate, A4-A6, required G2/G3 decision, or exhausted risk budget => ASK_HUMAN.
Constitutional conflict, stale state before mutation, unverifiable required identity, required rollback missing/inadequate, or unsafe ambiguity => STOP_FAIL_CLOSED.

ANTI_SALAMI:
Track MUTATION_COUNT, CUMULATIVE_SCOPE_DELTA, qualitative CUMULATIVE_RISK, ROLLBACK_QUALITY, VERIFICATION_CONFIDENCE and UNRESOLVED_FINDINGS. Escalate when cumulative effect becomes material. Never decompose C2/C3 to evade G2/G3.

HUMAN_DECISION_POINT:
At ASK_HUMAN expose DECISION_REQUIRED, WHY_HUMAN_JUDGMENT_IS_REQUIRED, OPTIONS, RECOMMENDATION, MATERIAL_CONSEQUENCES, CURRENT_STATE_IDENTITY when material, SAFE_RESUME_CONDITION.
Do not request a pasted next prompt when no material choice exists and execution remains within mandate.

ITERATIVE_REPAIR:
Under A3_MISSION, local repair and re-audit may continue without interruption only when repair stays in objective/scope, authority already exists, material class/gate does not increase, rollback/recovery is adequate, no competing material preference needs human judgment, and risk budget remains acceptable. This policy creates no repair capability.

CHECKPOINTS:
Preserve only minimum recovery/audit/stale-detection state. Human Control Plane may project AUTONOMY_MODE, MISSION_STATUS, CURRENT_STEP, RISK_STATE, RISK_BUDGET_STATE, LAST_VERIFICATION, MUTATIONS_PERFORMED, ROLLBACK_STATUS and NEXT_HUMAN_DECISION_POINT. Projection is never authority.

STOP_REVOCATION:
Human may stop, narrow, downgrade or revoke continuation at any time.
Stop on EXPLICIT_STOP, OBJECTIVE_COMPLETE, ACCEPTANCE_CRITERIA_MET, HUMAN_GATE, RISK_BUDGET_EXHAUSTED, SCOPE_DRIFT_MATERIAL, AUTHORITY_INSUFFICIENT, STALE_STATE_BEFORE_MUTATION, REQUIRED_VERIFICATION_FAILED, ROLLBACK_INADEQUATE_WHEN_REQUIRED, or CONSTITUTIONAL_CONFLICT.

DEFAULT_SAFETY:
Never infer autonomy from impatience, silence, prior acceptance or tool availability. Explicit multi-kernel execution may authorize continuation only across named/causally required kernels and never beyond material scope or existing authority. Uncertain mechanical-vs-material decision => ASK_HUMAN.

SELECTION_AND_CONSUMPTION:
- policy has effect only when explicitly selected ACTIVE by validated authoritative HEAD or an authorized operational registry reachable from that HEAD;
- the policy never determines which orchestrator is ACTIVE;
- the consumer MUST be the orchestrator independently selected by that same validated authority graph;
- the consumer MUST verify this policy's exact SPEC_ID, STATUS, VERSION and SHA-256 before applying it;
- mismatch between selected orchestrator, policy selection or consumer contract => STOP_FAIL_CLOSED;
- COMMIT_EXISTS != ACTIVE; GIT_WRITE_PERMISSION != PROMOTION_AUTHORITY.

ROLLBACK:
Rollback of this policy means removing or replacing its ACTIVE selection through the authoritative operational state using current UCP/CAS semantics. It MUST NOT imply selection of any particular orchestrator. The orchestrator selected by the resulting authoritative HEAD/registry remains authoritative. Revalidate prior HEAD and rollback target before mutation.
