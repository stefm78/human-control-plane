SPEC_ID: KERNEL-SUCCESSOR-GCP-1.1-QUALIFICATION
STATUS: PASS_READY_FOR_NEW_G2
VERSION: 1.0
TARGET: KERNEL-SUCCESSOR-GIT-NATIVE-1.0-GCP-1.1
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE
ACTIVE_MUTATION: NONE

# FINAL QUALIFICATION — GCP 1.1 REPAIR

## Authoritative starting state

UCP 1.1-R4 unchanged. Canonical CONTROL_PLANE_HEAD blob 067f69f56342f0202ac631ea57f48a700b54088c selects UAO 1.7. No ACTIVE mutation was made during this repair.

## Root cause repaired

GCP 1.0 was coupled to UAO 1.7 through BOUNDARY, UAO_1_9_DISPOSITION and ROLLBACK semantics. GCP 1.1 removes orchestrator-specific ACTIVE claims. The policy now applies only when selected by the authoritative HEAD/registry and is consumed only by the independently selected orchestrator. It cannot select an orchestrator or grant authority.

Preserved invariants: POLICY_CANNOT_GRANT_AUTHORITY; POLICY_CANNOT_BYPASS_GATE; POLICY_CANNOT_EXPAND_SCOPE; A4-A6 human control; conservative behavior on mismatch.

## Additional contradictory search

F01 fixed: explicit UAO 1.7 ACTIVE coupling removed.
F02 fixed: rollback no longer implies any particular orchestrator.
F03 fixed: consumer is bound to the independently selected orchestrator from the same authority graph.
F04 fixed during qualification: pre-promotion/pending-decision fields would have caused candidate-to-ACTIVE byte drift. Exact post-apply deployable HEAD bytes are now frozen before G2 and encode only the gate required, not a fictitious completed decision.
No other material contradiction was found among UAO 2.0, compatibility contract 1.0, registry 1.1, durability rule 1.0, GCP 1.1 and rollback metadata.

## Exact future graph

GCP 1.1 deployable SHA256: 038f82a17f15a4ce3d2303ac8b1301239ec7e87f7f7a669a89dafedb738ad8a7
GCP 1.1 Git blob: bde0b6a8e3bb5f2489376e01f1354ecd0d8edf25
Registry 1.1 SHA256: 8359b4de99875778c882dabd00c19da62c50f51ac9cb4ac97cc949dd9a8d2e65
Registry 1.1 Git blob: 8b77ab30e98e741e2d58cfa45c801c0f72a2642d
Future HEAD SHA256: 560b26c28f550c8150a1a916bd6328725fbb7ab84fed329864c911f462165d30
Future HEAD Git blob: a4838b24a344ea1fe765d4a3e846bf4ae3a86496
UAO 2.0 SHA256: 05b47b8b1e47704b6d4decfde6dbcad86aa91e62a680c6a24c195eb55c546900
Rollback HEAD Git blob: 067f69f56342f0202ac631ea57f48a700b54088c
Rollback UAO: 1.7 / 39a8431c6270ea0e316cefaefdf220160508a6d04eb7f11978a09530224b6468

## Probe results

S1 simple fast-path: PASS — compatibility contract still enforces minimum necessary routing.
S2 complex decision: PASS — UAS/compatibility behavior unchanged.
S3 research->solve->build: PASS — kernel graph unchanged; repaired policy only controls continuation depth.
S4 audit->repair->reaudit: PASS_REAL — post-apply contradiction was detected, rollback executed, GCP repaired, additional byte-drift defect found and repaired, then graph requalified.
S5 stale-state before mutation: PASS — canonical rollback state is explicitly the expected CAS base for any future cutover.
S6 governed continuation: PASS — policy consumer is now selected-orchestrator agnostic, authority-neutral, anti-salami and fail-closed on graph mismatch.
S7 /refresh: PASS — UAO 2.0 and compatibility contract require UCP -> HEAD -> exact selected artifacts and projections remain non-authoritative.
S8 /dump: PASS_PREPROMOTION — future graph has exact durable locators, hashes and rollback metadata sufficient for VERIFIED_DUMP_BUNDLE closure after publication to main.
S9 /restore --check: PASS_PREPROMOTION — exact current and target heads plus rollback identities are available; check remains non-mutating.
S10 Git-only cold start simulation: PASS — BOOTSTRAP -> UCP -> future HEAD -> registry 1.1 -> compatibility -> UAO/kernels -> durability rule + GCP 1.1 is closed and has no File Library dependency in the successor graph.

Required invariants in simulated future state:
EMPTY_SESSION + BOOTSTRAP => EXACT_ACTIVE_KERNEL : PASS
IDENTITY(reconstructed_kernel) == IDENTITY(selected_active_kernel) : PASS

## Materiality / prior GO reuse

REUSE_PREVIOUS_G2_GO: REJECTED.
Reason: GCP changes from version 1.0 to 1.1, exact bytes and SHA256 change, and its normative consumer/rollback semantics change. This is a governance-policy semantic change classified C2. Although authority delta remains NONE and the change is a repair, the previous G2 approved a different exact governance rule identity. Reusing that GO would violate exact-candidate promotion discipline.

## Verdict

PASS_READY_FOR_NEW_G2.
No ACTIVE, canonical HEAD, UCP, bootstrap or A4-A6 boundary was modified.

Only remaining human decision:
GO PROMOTION KERNEL-SUCCESSOR-GIT-NATIVE-1.0-GCP-1.1 EXACT
