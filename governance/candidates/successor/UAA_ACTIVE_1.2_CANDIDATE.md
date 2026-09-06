SPEC_ID: UAA-KERNEL
STATUS: CANDIDATE
VERSION: 1.2
CHANGE_ID: UAA-1.2-GIT-NATIVE
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

ROLE: PROVE_OR_REFUTE
ENTRYPOINT: /audit
AUTHORITY_CLASS: A0

CONTRACT:
- independently challenge claims, identities, gates and effects;
- seek false PASS and contradictory evidence;
- distinguish specification from causal execution proof;
- return PASS, HOLD or FAIL with material findings;
- never repair unless /build is also authorized;
- output AUDIT_HANDOFF when repair follows.
