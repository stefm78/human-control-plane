SPEC_ID: KERNEL-RESTORE-CHECK
STATUS: CANDIDATE
VERSION: 1.0
TARGET: VERIFIED_DUMP_BUNDLE_1.0_CANDIDATE
MUTATION_PERFORMED: NONE

# /restore --check qualification

CURRENT_AUTHORITY_WINS: PASS
DUMP_INTEGRITY: PASS_PREPROMOTION_GIT_READBACK
RESTORE_FEASIBILITY: PASS_WITH_G2_GATE
CURRENT_TARGET: canonical UCP 1.1-R4 -> canonical HEAD -> UAO 1.7/File-Library kernel set
INTENDED_TARGET: same UCP 1.1-R4 -> successor HEAD -> Git-native successor registry -> exact deployable successor kernel set
SEMANTIC_DELTA: C2 successor routing/persistence/control-plane semantics; no constitutional authority delta
CANONICAL_MUTATION_IF_APPLIED: governance/CONTROL_PLANE_HEAD.json selection plus exact durable deployment of already-frozen payload bytes to canonical branch if not already present
CONTEXT_EVIDENCE_WRITEBACK: FORBIDDEN
AUTHORITY_REQUIRED: G2 human promotion + current UCP/CAS revalidation
ROLLBACK: restore prior exact canonical HEAD identity after revalidation; predecessor remains selected unless/until successful promotion
STALE_STATE_RULE: any HEAD identity mismatch before apply => ZERO_MUTATION / RELOAD / REQUALIFY
POST_APPLY_REQUIRED: reread UCP, reread new HEAD, reread registry, verify all selected SHA-256, run primitive smoke probes, verify projections are derived

VERDICT: PASS_RESTORE_CHECK_PREPROMOTION
