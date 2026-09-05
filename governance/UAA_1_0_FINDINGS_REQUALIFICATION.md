# UAA 1.0 — Findings Requalification

STATUS: WORKING_ASSESSMENT
TARGET: UAA_ACTIVE.md / UAA-KERNEL / ACTIVE / 1.0
SOURCE: qualification report supplied by the human on 2026-09-05
METHOD: KERNEL_QUALIFICATION_PROTOCOL_V1

This file does not modify or promote UAA. It prevents premature repair by separating local defects from system/composition requirements.

| Finding | Requalification | Confidence | Action now |
|---|---|---:|---|
| UAA-F01 absence of intrinsic/comparative qualification | SYSTEM_LEVEL_REQUIREMENT / likely UAS+UAA composition responsibility, not yet a proven local UAA defect | HIGH | Do not add baseline/ablation machinery to UAA. Test qualification composition first. |
| UAA-F02 stop rule changes only verdict | LOCAL_KERNEL_DEFECT candidate | HIGH | Validate with behavioral counterexample; if reproduced, minimal wording change to include defect set/risk/required action. |
| UAA-F03 absolute evidence hierarchy | LOCAL_KERNEL_DEFECT candidate | MEDIUM | Test domains where representativeness/provenance beats nominal directness before changing rule. |
| UAA-F04 inferred requirement reconstruction weakly controlled | LOCAL_KERNEL_DEFECT or INTERFACE defect candidate | MEDIUM | Test false-fail/false-pass cases with inferred requirements; repair only if material. |
| UAA-F05 handoff omits gaps/risks/blocked tests/assumptions | INTERFACE_OR_HANDOFF_DEFECT candidate | MEDIUM | Test an audit→build cycle where omission changes downstream interpretation. |

## Immediate decision

Do not refactor UAA and do not add a generic QUALIFICATION_AUDIT mode yet.

The first discriminating work is behavioral validation of F02–F05 plus a composition test showing whether UAS already supplies the design-value challenge missing from UAA.

## Acceptance gate for any UAA 1.1 candidate

A change may enter a candidate only when:
1. the failure is reproduced or logically decisive;
2. causal ownership is established;
3. the minimal change fixes it;
4. existing standalone audit behavior is preserved;
5. audit/build and solve/build/audit composition is not degraded;
6. added complexity is smaller than the material risk removed.

No ACTIVE mutation is authorized by this assessment.