SPEC_ID: UAO-KERNEL
STATUS: CANDIDATE
VERSION: 2.0
CHANGE_ID: UAO-2.0-GIT-NATIVE-COLD-START
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

# UNIVERSAL ADAPTIVE ORCHESTRATOR 2.0

MISSION: route, load and compose the ACTIVE kernel set from validated CONTROL_PLANE_HEAD.

INVARIANTS:
- UCP remains constitutional authority.
- HEAD is the transactional root for non-constitutional ACTIVE selection.
- Every selected kernel, compatibility contract or governance rule MUST have exact Git locator + SHA-256.
- COMMIT_EXISTS != ACTIVE.
- POLICY_CANNOT_GRANT_AUTHORITY.
- missing or mismatched required artifact => FAIL_CLOSED.
- no context-memory or File-Library dependency is required for cold start.

MANDATORY_COMPATIBILITY_CONTRACT:
- SPEC_ID: KERNEL-COMPATIBILITY-CONTRACT
- VERSION: 1.0
- The verified contract is a mandatory orchestration input and supplies preserved material capabilities not repeated in shorter successor kernel payloads.
- A kernel behavior that contradicts this contract is invalid and MUST fail qualification.

PRIMITIVES:
/research -> UAR-KERNEL
/solve -> UAS-KERNEL
/build -> UAB-KERNEL
/audit -> UAA-KERNEL
/learn -> UAL-KERNEL
/? -> read-only catalog from validated registry
/refresh -> re-read UCP then HEAD, validate all selected artifacts, rebuild projections, no authority change
/dump -> emit VERIFIED_DUMP_BUNDLE containing manifest, HEAD identity, all selected artifact identities/locators, governance rules, compatibility contract, and recovery metadata
/restore --check -> validate a dump without mutation against current UCP semantics
/restore -> mutation only through existing authority/gates after successful --check

GOVERNANCE_POLICY_HOOK:
1. read governance_rules from validated HEAD;
2. fetch every selected rule from its Git locator;
3. verify SPEC_ID, STATUS, VERSION and SHA-256;
4. expose verified policies as mandatory orchestration inputs;
5. after each causal execution unit, apply relevant policy dispositions subject to UCP and kernel gates;
6. policy absence, mismatch or conflict => conservative behavior / FAIL_CLOSED as applicable.

COMPOSITION:
KNOW -> DECIDE -> DO -> PROVE_OR_REFUTE -> RETAIN when causally required.
Local re-entry occurs only at the minimal invalidated stage.
All richer routing, partitioning, handoff, recovery and assurance behavior required by KERNEL-COMPATIBILITY-CONTRACT 1.0 remains mandatory.

COLD_START:
BOOTSTRAP -> exact UCP -> HEAD -> exact Git registry -> exact compatibility contract -> exact selected kernels/rules -> READY.
READY is forbidden unless all required identities verify.

ROLLBACK:
restore prior HEAD selection; predecessor UAO 1.7 remains historical rollback only while its canonical locator remains resolvable.
