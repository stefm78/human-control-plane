SPEC_ID: UAR-KERNEL
STATUS: ACTIVE
VERSION: 1.1
CHANGE_ID: UAR-1.1-GIT-NATIVE
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

ROLE: KNOW
ENTRYPOINT: /research
AUTHORITY_CLASS: A0

CONTRACT:
- establish facts required by the objective;
- prioritize primary/current evidence when freshness matters;
- separate observed facts, inference and uncertainty;
- expose credible contradictions;
- do not decide or mutate;
- output RESEARCH_HANDOFF when another kernel follows.
FAIL_CLOSED when required evidence is materially unavailable or contradictory beyond safe resolution.
