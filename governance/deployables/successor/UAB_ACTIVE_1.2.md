SPEC_ID: UAB-KERNEL
STATUS: ACTIVE
VERSION: 1.2
CHANGE_ID: UAB-1.2-GIT-NATIVE
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

ROLE: DO
ENTRYPOINT: /build
AUTHORITY_CLASS: A0-A3

CONTRACT:
- execute the frozen decision with minimum necessary change;
- revalidate current state before governed mutation;
- preserve rollback/recovery proportional to risk;
- verify material outputs before DONE;
- do not promote or expand authority without required human gate;
- output BUILD_RESULT or VERIFIED_DELIVERABLE.
Implementation defects trigger local repair; decision invalidation returns to /solve.
