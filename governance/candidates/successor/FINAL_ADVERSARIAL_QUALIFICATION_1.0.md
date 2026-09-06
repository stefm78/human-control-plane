SPEC_ID: KERNEL-SUCCESSOR-FINAL-QUALIFICATION
STATUS: PASS_READY_FOR_G2
VERSION: 1.0
TARGET: KERNEL-SUCCESSOR-GIT-NATIVE-1.0
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
MUTATION_TO_CANONICAL_ACTIVE: NONE

# FINAL ADVERSARIAL QUALIFICATION

## Defects found and repaired

F01 MATERIAL_CAPABILITY_REGRESSION: initial successor payloads were too compressed versus known ACTIVE UAO/UAB/UAA behavior. Repaired by mandatory KERNEL-COMPATIBILITY-CONTRACT 1.0 preserving routing/partitioning/handoffs, solve optimization, build graph/preflight/mutation ledger/checkpoints/verification/conflict/recovery, audit evidence/independence/false-pass/false-fail, learn semantics, refresh/dump/restore and continuation guarantees.

F02 CANDIDATE_TO_ACTIVE_BYTE_DRIFT: initial payloads had STATUS CANDIDATE, so promotion would have changed bytes. Repaired by exact deployable payloads already containing STATUS ACTIVE but carrying no authority until selected by governed HEAD. COMMIT_EXISTS != ACTIVE remains mandatory.

## Probe matrix

S1 SIMPLE_FAST_PATH: PASS — compatibility contract requires minimum necessary routing and forbids heavy kernel execution for ordinary questions without need.
S2 COMPLEX_DECISION: PASS — UAS + compatibility contract require definition of best, alternatives, discriminating criteria, leader challenge, uncertainty/reversibility and solve handoff.
S3 RESEARCH_SOLVE_BUILD: PASS_REAL — this qualification used evidence retrieval, decision, candidate construction and Git verification without ACTIVE mutation.
S4 AUDIT_REPAIR_REAUDIT: PASS_REAL — F01/F02 were found, repaired only on candidate branch, then reread/requalified.
S5 STALE_STATE_BEFORE_MUTATION: PASS_REAL — stale/wrong Git content identity was rejected with zero mutation; UCP and successor require fresh CAS before governed mutation.
S6 GOVERNED_CONTINUATION: PASS_PREPROMOTION — UAO 2.0 has explicit governance-policy load/verify/application hook; compatibility contract preserves bounded continuation, anti-salami risk and human revocation. Current mission continued across intermediate steps and stopped at G2.
S7 REFRESH: PASS_PREPROMOTION — contract is UCP -> current HEAD -> selected identity validation -> projection regeneration; cache/projection never authority.
S8 DUMP: PASS_REAL_PREPROMOTION — VERIFIED_DUMP_BUNDLE_1.0_CANDIDATE materialized with candidate HEAD, registry, all successor payloads, governance rules and constitutional context.
S9 RESTORE_CHECK: PASS_REAL_PREPROMOTION — RESTORE_CHECK_1.0_CANDIDATE completed without mutation; CURRENT_AUTHORITY_WINS, C2 delta, G2 requirement, stale-state zero-mutation and rollback are explicit.
S10 GIT_ONLY_COLD_START: PASS_PREPROMOTION — bootstrap/UCP -> candidate HEAD -> registry -> compatibility contract -> exact deployable kernels -> governance rules is resolvable from Git with no File Library dependency. Exact SHA-256 values were computed from complete payload bytes and bound into registry/HEAD. Production post-apply reread remains mandatory after promotion.

## Primitive verdicts

/research PASS
/solve PASS
/build PASS
/audit PASS
/learn PASS
/? PASS
/refresh PASS_PREPROMOTION
/dump PASS_PREPROMOTION
/restore PASS_PREPROMOTION
governed continuation PASS_PREPROMOTION

## Identity

UAO 2.0 sha256 05b47b8b1e47704b6d4decfde6dbcad86aa91e62a680c6a24c195eb55c546900
UAR 1.1 sha256 b338159ecf9d7b6bf4537282c68cdaab80b8d5baa4b4ae4a45b2421ce3a8bafd
UAS 2.4 sha256 d2d738eac91e7234ec3e7b027d6bd1976f0b93cbb9f1ac42471ab2a0a8792cf2
UAB 1.2 sha256 7a2b1e98e4951030b27ad541a66e1f63aadd08e5d2ba460b945d655c1c9662d4
UAA 1.2 sha256 93fcd8eb583ae4c165e6668ad91c9afef7e252467613b65faa8143a324236557
UAL 1.2 sha256 e68d3a4a15db99743b8af44f127ebd8dffe9f997e90324baeccaa676f32aac2d
COMPATIBILITY 1.0 sha256 0d2c2c566aa5059adf7854d5a062476945dd4e09032955fd1f421cc53b8acbc4
REGISTRY 1.0 sha256 fbc0fbbf6173228b275f66cb7f215ce8b2622f0f95f2012ab0c2c176ea4e9888
CANDIDATE_HEAD sha256 194e244ac7360387dab80237be817ef857b6a0650c31498a4070a4d9fb12566e

## Residual risk

- Byte-for-byte semantic parity with unavailable legacy payloads cannot be proven; known material legacy capabilities discovered through accessible authoritative references are captured by the compatibility contract.
- Full causal proof on the production-selected HEAD necessarily requires post-promotion smoke/reload verification; promotion MUST fail closed and rollback if that verification fails.
- Deployable bytes must be present on the canonical Git branch before HEAD selection; exact bytes/hashes must not change during that publication step.

## Rollback

Prior canonical HEAD remains rollback target. Before promotion record/revalidate its exact identity. If post-apply verification fails, restore that exact HEAD using current UCP/CAS semantics and verify UAO 1.7 resolution.

## Verdict

PASS_READY_FOR_G2.
No ACTIVE or canonical HEAD mutation has been performed by this qualification.
