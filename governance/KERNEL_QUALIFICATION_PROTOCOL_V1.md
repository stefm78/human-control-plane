# KERNEL QUALIFICATION PROTOCOL V1

STATUS: CANDIDATE_METHOD
PURPOSE: qualify kernel architecture without growing every kernel into a universal kernel
MUTATION_AUTHORITY: NONE

## 1. Decision principle

A kernel is qualified at four distinct levels. A defect found at one level MUST NOT be repaired in another level unless causal ownership is demonstrated.

1. COMPONENT — internal mechanism.
2. STANDALONE — kernel used by itself.
3. COMPOSITION — kernel interacting with other kernels through routing, handoffs and re-entry.
4. SYSTEM — UCP + UAO + active kernels as a whole.

A kernel is not required to contain every capability needed to qualify itself. System-level quality may emerge from composition.

## 2. Anti-overengineering invariant

No new rule, section, mechanism or field is justified by plausibility alone.

A proposed addition requires:

OBSERVED_OR_PROVED_FAILURE
→ CAUSAL_OWNER
→ MINIMAL_CHANGE
→ DISCRIMINATING_ACCEPTANCE_TEST
→ REGRESSION_CHECK
→ COMPLEXITY_DELTA_JUSTIFIED.

If the same failure can be solved by an existing kernel, a composition rule, a handoff correction, or a simpler formulation, prefer that solution.

## 3. Ownership classes

Every finding MUST be classified before repair:

LOCAL_COMPONENT_DEFECT
LOCAL_KERNEL_DEFECT
INTERFACE_OR_HANDOFF_DEFECT
COMPOSITION_DEFECT
ORCHESTRATION_DEFECT
SYSTEM_LEVEL_REQUIREMENT
OTHER_KERNEL_RESPONSIBILITY
SPECIFICATION_AMBIGUITY
NOT_A_DEFECT.

No repair is authorized until ownership is established with sufficient confidence.

## 4. Level A — component qualification

For every material mechanism in the target kernel ask only:

- PURPOSE: what concrete failure does it prevent or what capability does it create?
- CORRECTNESS: can following it produce a wrong or pathological result?
- NECESSITY: what materially worsens if it is removed?
- SIMPLIFICATION: can a smaller rule preserve the same protection?
- INTERACTION: does it conflict with or duplicate another mechanism?

Classify:
ESSENTIAL | USEFUL | QUESTIONABLE | REDUNDANT | HARMFUL.

Do not optimize wording that has no material behavioral consequence.

## 5. Level B — standalone qualification

Test the kernel only against its declared mission and boundary.

Required scenario families:
- trivial case where the kernel should stay minimal;
- representative normal case;
- difficult case where the kernel should materially help;
- ambiguous/incomplete case;
- adversarial/failure case;
- case where doing nothing or stopping is correct.

Compare, when feasible, with a minimal baseline instruction performing the same declared role.

Evaluate only material outcomes: task success, correctness, false positive/negative risk where applicable, evidence quality, clarity, robustness, unnecessary work.

Do not penalize the kernel for capabilities deliberately assigned elsewhere.

## 6. Level C — composition qualification

Test every materially supported composition and handoff.

At each boundary verify:
- information required downstream is preserved;
- facts, assumptions, decisions, evidence and uncertainty remain distinguishable;
- no unnecessary recomputation;
- no responsibility leakage;
- no unauthorized reopening of frozen upstream work;
- stale or invalid upstream state triggers only the minimal causal re-entry;
- no loop or duplicated mutation;
- standalone behavior remains available when composition is absent.

Interface failures belong to the interface/composition until evidence proves a local kernel cause.

## 7. Level D — system qualification

Only at system level ask whether the architecture itself is worth having.

Evaluate:
- functional coverage without duplicated ownership;
- gaps between kernel responsibilities;
- routing correctness;
- composability;
- human-control properties;
- complexity versus a materially simpler architecture;
- whether removing or merging a kernel would preserve equivalent outcomes;
- whether system-level mechanisms are incorrectly duplicated inside kernels.

Use baseline comparison and ablation only where they can change an architectural decision.

## 8. Repair decision rule

For each verified finding determine the smallest causal repair surface in this order:

1. no change / finding rejected;
2. wording clarification;
3. simplify or correct an existing local mechanism;
4. handoff/interface correction;
5. orchestration/composition correction;
6. local kernel capability addition;
7. system architecture change.

Escalate to a larger repair surface only when the smaller surface cannot satisfy the acceptance test.

## 9. Evidence levels

STATIC — established from specification or artifact inspection.
BEHAVIORAL — observed through representative execution/test.
COMPARATIVE — observed against a meaningful baseline or alternative.

Never report a higher evidence level than actually obtained.

## 10. Qualification output

For each level report:

STATUS: PASS | HOLD | FAIL | NOT_SUFFICIENTLY_TESTED
FINDINGS: material findings only
EVIDENCE_LEVEL: STATIC | BEHAVIORAL | COMPARATIVE
RESIDUAL_RISK

Then report:

OWNERSHIP_MAP
MINIMAL_REPAIR_SET
DO_NOT_CHANGE
REGRESSION_TESTS
COMPLEXITY_DELTA
FINAL_SYSTEM_VERDICT.

## 11. Stop rule

Stop when no reasonably accessible test is likely to materially change any of:

VERDICT
DEFECT_SET
OWNERSHIP
RISK_CHARACTERIZATION
REQUIRED_ACTION
ARCHITECTURAL_DECISION.

Do not continue merely to increase coverage numerically.

## 12. Promotion principle

This protocol is initially a qualification method, not a mandatory new kernel layer.

It earns durable integration only if repeated use demonstrates that it finds material defects, prevents misattributed repairs, or enables meaningful simplification better than the existing process at acceptable cost.

Until then: use it, measure it, and avoid embedding it wholesale into UAA, UAS, UAO or UCP.