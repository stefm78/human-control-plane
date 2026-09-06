SPEC_ID: KERNEL-PERSISTENCE-COLD-START-G2-PACKET
STATUS: CANDIDATE_EVIDENCE
VERSION: 1.0
TARGET_SPEC_ID: KERNEL-PERSISTENCE-COLD-START
TARGET_VERSION: 1.0
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

# HUMAN DECISION PACKET

## Decision requested
Whether to authorize promotion work for KERNEL-PERSISTENCE-COLD-START 1.0 after contradictory qualification.

## Current evidence
- UCP and CONTROL_PLANE_HEAD are Git-retrievable.
- Current HEAD selects UAO 1.7 from CHATGPT_FILE_LIBRARY, so Git-only cold start cannot yet reconstruct the exact ACTIVE orchestrator.
- Selected governance rules are Git-addressable.
- Candidate defines persistence, HEAD-sufficient resolution, projection separation, policy consumer proof, /refresh, /dump, /restore --check, and cold-start gates without changing constitutional authority.

## Residual blocker
Exact complete deployable UAO payload is not presently available through the Git-only governed cold-start path. Candidate explicitly forbids approximation from excerpts or summaries.

## Recommended decision
HOLD PROMOTION until the candidate itself is contradicorily reviewed and an exact deployable successor/orchestrator payload is available in Git. The framework candidate may remain as non-ACTIVE design evidence meanwhile.

## Rollback
No ACTIVE state changed by this candidate branch. If later promoted, rollback target must be the exact pre-apply CONTROL_PLANE_HEAD identity and its selected artifact locators, restored only after fresh CAS and required authorization.
