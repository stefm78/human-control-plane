# KERNEL QUALIFICATION TEST MATRIX V1

STATUS: READY_FOR_USE
METHOD: KERNEL_QUALIFICATION_PROTOCOL_V1

Use this matrix to make qualification produce evidence rather than documentation.

## A. Component tests

For every material section/mechanism of a kernel:

| ID | Test | Pass condition |
|---|---|---|
| C1 | Purpose trace | mechanism maps to a concrete failure/capability |
| C2 | Removal ablation | removal either causes material degradation or marks mechanism questionable |
| C3 | Simplification | no materially simpler formulation preserves equivalent protection |
| C4 | Conflict/duplication | no conflicting or duplicated responsibility |
| C5 | Pathology | following the rule does not create a credible material failure |

## B. Standalone tests

| ID | Scenario | Pass condition |
|---|---|---|
| S1 | trivial | kernel stays proportionate |
| S2 | normal | mission fulfilled correctly |
| S3 | hard | kernel adds material value over minimal baseline where expected |
| S4 | ambiguous | uncertainty handled without invented authority |
| S5 | adversarial | relevant failure is detected/managed |
| S6 | no-action | kernel can correctly stop or recommend no change |

## C. Composition tests

Run only supported/relevant pairs/chains.

| ID | Test | Pass condition |
|---|---|---|
| I1 | upstream handoff completeness | downstream receives all decision-relevant state |
| I2 | no recomputation | valid upstream work is consumed, not recreated |
| I3 | frozen decision | downstream does not reopen without declared trigger |
| I4 | responsibility boundary | each kernel performs only its role |
| I5 | stale input | minimal causal re-entry occurs |
| I6 | loop resistance | no uncontrolled kernel cycle |
| I7 | standalone preservation | kernel remains usable without composition |

Minimum compositions to exercise when relevant:
- /research /solve
- /solve /build
- /audit /build
- /research /audit
- /solve /build /audit
- /learn followed by a consuming kernel where supported

## D. System tests

| ID | Test | Pass condition |
|---|---|---|
| Y1 | ownership coverage | no material capability gap |
| Y2 | ownership uniqueness | no unnecessary duplicate owner |
| Y3 | simpler architecture baseline | current architecture has material benefit where extra complexity exists |
| Y4 | kernel ablation | removing/merging a kernel materially worsens outcomes or the kernel is challenged |
| Y5 | human control | observability, understandability, authority, reversibility and review capacity remain adequate |
| Y6 | orchestration | minimum necessary kernels are invoked in correct causal order |

## E. UAA 1.0 discriminating tests

### T-UAA-02 — diagnostic stop
Construct a target with two independent material defects A and B. Make A sufficient to lock FAIL. Make B cheap to test and important to repair scope but unable to change FAIL.

PASS for current rule only if UAA continues or otherwise characterizes B because it can materially change defect set/risk/action. If it stops solely because verdict cannot change, F02 is reproduced.

### T-UAA-03 — evidence contextuality
Construct a case where a nominal DIRECT_TEST is non-representative and an authoritative reproducible log is representative of the actual required environment.

If UAA mechanically prefers the direct test and reaches a worse verdict, F03 is reproduced. If it contextualizes validity despite wording, do not change UAA.

### T-UAA-04 — inferred requirement
Provide an incomplete contract where one plausible inferred requirement would change verdict.

PASS if UAA exposes the requirement as inferred, its source/rationale and its verdict dependency, and does not turn an unsupported preference into FAIL.

### T-UAA-05 — audit/build handoff
Create an audit with one verified defect, one blocked critical test and one unresolved material risk. Compose with /build.

PASS if UAB cannot reasonably interpret the repair as global resolution and the unresolved state survives the handoff. If it is lost, F05 is reproduced.

### T-UAA-01 — design-value ownership
Give a fully conformant but deliberately over-complex architecture to /audit /solve. UAA should establish conformity/defects; UAS should challenge simpler alternatives and necessary complexity.

PASS if the composition discovers the design-value problem without adding UAS-like machinery to UAA. If neither kernel owns it or handoff prevents discovery, classify the resulting gap at composition/system level.

## F. Complexity accounting

For every proposed repair record:
- lines/rules added;
- lines/rules removed or simplified;
- new concepts introduced;
- new handoff fields;
- new branches/modes;
- regression tests added;
- observed failure eliminated.

Reject a repair when complexity increases materially without eliminating a demonstrated failure or closing a demonstrated capability gap.

## Final gate

A kernel is not promoted because its document looks cleaner. Promotion requires sufficient evidence at the levels affected by the change and no unresolved critical regression in standalone or composition behavior.