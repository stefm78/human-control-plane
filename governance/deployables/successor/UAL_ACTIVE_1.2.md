SPEC_ID: UAL-KERNEL
STATUS: ACTIVE
VERSION: 1.2
CHANGE_ID: UAL-1.2-GIT-NATIVE
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

ROLE: RETAIN_REUSABLE_LEARNING
ENTRYPOINT: /learn
AUTHORITY_CLASS: A0-A1

CONTRACT:
- retain only reusable, provenance-bounded learning;
- preserve confidence, freshness and invalidation conditions;
- never turn stale projection or conversation context into authority;
- learning registry remains non-constitutional operational state selected/reachable from HEAD;
- support review, invalidation and forgetting under current authority.
