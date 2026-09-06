SPEC_ID: UCP-CONTROL-PLANE
STATUS: ACTIVE
VERSION: 1.1-R4
BASE_VERSION: 1.0
CHANGE_ID: UCP-1.1-R4-SHA-ANCHORED-GIT-RETRIEVAL
MATERIAL_CHANGE_CLASS: C3
REQUIRED_GATE: G3
PROMOTION_AUTHORITY: HUMAN_ONLY

# UCP 1.1-R2 — MINIMAL OPERATIONAL PERSISTENCE AMENDMENT

All UCP 1.0 rules remain in force except the bounded bootstrap/persistence rules explicitly replaced below.

## 1. CONSTITUTIONAL TRUST ROOT — F01/F02 R4

For this version:
UCP_TRUST_ANCHOR_PROVIDER: USER_INSTALLED_CONSTITUTIONAL_BOOTSTRAP
UCP_RETRIEVAL_PROVIDER: Git
UCP_REPOSITORY: stefm78/human-control-plane
UCP_BRANCH: main
UCP_OBJECT: governance/UCP_ACTIVE.md

Git is a retrieval/storage provider, never the selector of constitutional identity.
The user-installed bootstrap is the constitutional trust anchor and MUST bind the exact UCP SHA256, SPEC_ID and VERSION before Git content can be applied.
Changing the anchor mechanism, retrieval provider/repository/branch/object, or constitutional identity semantics is C3/G3.

## 2. PRE-GIT IDENTITY BINDING / GIT RETRIEVAL — F02 R4

The constitutional bootstrap MUST possess the expected UCP identity before consulting Git.
The external constitutional anchor MUST bind:
SPEC_ID: UCP-CONTROL-PLANE
VERSION
SHA256

Retrieval succeeds only when the bytes retrieved from the fixed Git repository/branch/object:
- are retrievable;
- have SPEC_ID UCP-CONTROL-PLANE and STATUS ACTIVE;
- have exact bytes matching the bootstrap-bound SHA256 and VERSION.

Any mismatch, missing object, redirect to a different configured source, or materially plausible competing identity:
CONSTITUTIONAL_CONFLICT → FAIL_CLOSED.

Git content MUST NOT select, replace, weaken or rewrite the expected SHA256.
A Git commit, branch state, filename, tag or CONTROL_PLANE_HEAD is insufficient to establish constitutional identity.
CONTROL_PLANE_HEAD MUST NOT be consulted until the retrieved UCP bytes have matched the bootstrap-bound identity and UCP has been applied.

## 3. OPERATIONAL PERSISTENCE

Only after UCP validation, operational persistence authority is:
PROVIDER: Git
REPOSITORY: stefm78/human-control-plane
BRANCH: main
HEAD_OBJECT: governance/CONTROL_PLANE_HEAD.json

Scope: UAO/kernel identities, CONTROL_PLANE_STATE, governed registries, sub-UCP promotion records and operational recovery metadata.

Excluded: UCP, bootstrap, constitutional anchor, A4-A6 rules, human-sovereignty invariants, and this authority boundary.

Changing provider/repository/branch/head/boundary is C3/G3.

## 4. CONTROL_PLANE_HEAD / SESSION

HEAD is the transactional root for governed non-constitutional state.
Before mutation:
CURRENT_HEAD_IDENTITY == EXPECTED_BASE_HEAD_IDENTITY
else STALE → NO MUTATION → RELOAD.

A verified session snapshot may cache UCP identity, HEAD identity and required artifact identities.
Before active mutation/promotion: REVALIDATE_CURRENT_HEAD.
Git/HEAD unavailable → mutation/promotion FAIL_CLOSED.
CACHE_NEVER_BECOMES_AUTHORITY.
GIT_WRITE_PERMISSION != PROMOTION_AUTHORITY.
COMMIT_EXISTS != ACTIVE.

## 5. BOOTSTRAP RELATION

1. Read the exact UCP identity anchor from the user-installed bootstrap.
2. Retrieve UCP bytes only from the fixed Git repository/branch/object.
3. Validate retrieved bytes against the bootstrap-bound SHA256/SPEC_ID/VERSION; on mismatch fail closed.
4. Apply UCP only after exact identity validation.
5. Resolve and validate configured Git CONTROL_PLANE_HEAD.
6. Resolve UAO by exact HEAD identity and validate SPEC_ID/STATUS/identity.
7. Route only through identities reachable from validated HEAD.
8. Before governed active mutation/promotion, revalidate HEAD/CAS.

## 6. CONSTITUTIONAL ROLLBACK — F03

Before APPLY, the exact rollback package defined by the candidate manifest MUST be locally/human-accessibly available and hash-verified.

Rollback requires:
ROLLBACK_TARGET: UCP 1.0 + pre-change constitutional bootstrap/anchor
KNOWN_GOOD_IDENTITY: exact SHA256 and File Library identity for UCP 1.0 plus exact rollback bootstrap bytes
ROLLBACK_ACTION: human restores the rollback bootstrap/anchor and UCP trust-root selection; Git is ignored as authority until constitutional verification succeeds
DEPENDENCIES: access to the existing ChatGPT File Library rollback UCP 1.0 and user ability to restore the exact pre-change bootstrap
EXPECTED_EFFECT: restore UCP 1.0 bootstrap relation and pre-change authority model; Git returns to non-authoritative/projection status
VERIFICATION: resolve anchored UCP 1.0, verify exact identity, then verify UAO 1.7 routing under the restored bootstrap

If any rollback dependency is unavailable immediately before APPLY:
ROLLBACK_UNPROVEN → G3 APPLY BLOCKED.

## 7. AUTHORITY

CONSTITUTIONAL_AUTHORITY_DELTA_TO_GIT: NONE
HUMAN_A4_A6_CONTROL: PRESERVED
ACTIVE_MUTATION: NONE until explicit G3 human decision and APPLY.

## 8. DEPLOYMENT STATUS SEMANTICS — R4

This file is the exact deployable UCP payload and therefore contains STATUS: ACTIVE.
Its presence in sandbox or Git does NOT promote it: promotion occurs only when the HUMAN_ONLY G3 cutover installs the exact bootstrap that anchors this payload and post-apply verification succeeds.
Before that cutover it has no ACTIVE authority.
