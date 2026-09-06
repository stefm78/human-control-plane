SPEC_ID: UAO-COMPOSED-ACTIVE-RESOLUTION
STATUS: CANDIDATE
VERSION: 1.0
CHANGE_ID: UAO-COMPOSED-ACTIVE-RESOLUTION-1.0
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE
SCOPE: UAO_ACTIVE_RESOLUTION_ONLY

# MINIMAL COMPOSED UAO ACTIVE RESOLUTION

## 1. PURPOSE

Permit an ACTIVE UAO logical version to be represented by an exact immutable base plus one or more exact immutable amendments, without reconstructing or copying the base bytes.

This is a bounded extension of the existing UAO load/integrity model and the existing manifest/dependency/hash concepts. It is not a new kernel, registry, authority source, or generic package manager.

UCP always prevails.

## 2. MOTIVATING DEFECT

Current UAO 1.7 is canonically identified by exact SHA-256 and File Library locator, but its full bytes are not exportable through the current execution surface. UAO 1.9 is a qualified amendment relative to exact UAO 1.7. Requiring a monolithic 1.9 payload would force conjectural reconstruction or a human byte-transfer step.

The resolver removes that accidental storage coupling while preserving exact identity of every material component.

## 3. COMPOSED ACTIVE MANIFEST

A composed UAO ACTIVE identity MUST be represented by one immutable manifest stored in the configured Git operational persistence repository.

Required fields:

schema: uao.composed-active.v1
spec_id: UAO-KERNEL
status: ACTIVE
version
base:
  spec_id
  version
  sha256
  locator
amendments[]:
  spec_id
  version
  sha256
  locator
  applies_to_base_sha256
composition_order[]
composition_semantics: BASE_THEN_AMENDMENTS
manifest_sha256

The manifest is the durable composition description. It is not constitutional authority.

## 4. EXACTNESS

Resolution succeeds only when:

1. current UCP is validated;
2. current CONTROL_PLANE_HEAD is validated;
3. HEAD identifies the exact composed manifest;
4. manifest bytes match the exact manifest SHA-256 recorded by HEAD;
5. every base/amendment locator resolves;
6. every component's bytes match its declared SHA-256;
7. base SPEC_ID/STATUS/VERSION match the manifest;
8. every amendment declares the expected UAO target/base identity;
9. composition order is explicit and contains no duplicate or missing component;
10. no material conflict exists between amendments.

Any failure => STOP_FAIL_CLOSED.

No component may be reconstructed from summaries, excerpts, conversation history, semantic similarity, or a known hash without the exact retrievable payload.

## 5. SEMANTICS

Effective UAO behavior is interpreted as:

EXACT_BASE
THEN
EXACT_AMENDMENT_1
THEN ...

An amendment may only add or explicitly replace semantics within its qualified scope. All base semantics not explicitly replaced remain in force.

UNKNOWN_CONFLICT > SILENT_OVERRIDE.

This candidate does not define arbitrary patch syntax. Natural-language amendments remain governed specifications and must explicitly state their scope/base, as UAO 1.9 already does.

## 6. HEAD INTEGRATION

CONTROL_PLANE_HEAD may identify UAO using either the existing single-artifact locator or a composed-manifest locator.

A composed locator MUST include:
provider: Git
repository
branch
object
sha256
schema: uao.composed-active.v1

The composed manifest becomes the exact operational UAO identity selected by HEAD; component identities remain independently verifiable dependencies.

This does not change the configured Git provider/repository/branch/HEAD_OBJECT defined by UCP and therefore does not change the constitutional persistence boundary.

## 7. AUTHORITY

COMPOSITION_DOES_NOT_GRANT_AUTHORITY.
GIT_WRITE_PERMISSION != PROMOTION_AUTHORITY.
COMMIT_EXISTS != ACTIVE.
A composed manifest with STATUS ACTIVE is inert until an authorized HEAD mutation selects its exact identity.

Promotion of an amendment still requires the gate/class applicable to that amendment. Promotion of this resolution semantic itself requires G2 before HEAD may rely on it.

A4-A6 remain human-controlled.

## 8. CAS / STALE STATE

Before any HEAD mutation:
CURRENT_HEAD_IDENTITY == EXPECTED_BASE_HEAD_IDENTITY
else STALE => NO MUTATION => RELOAD.

Candidate/manifests may be prepared before the gate. Selection into HEAD occurs only after the required human promotion decision and fresh revalidation.

## 9. ROLLBACK

Rollback of a composed UAO selection is the previous verified CONTROL_PLANE_HEAD identity plus its resolvable UAO dependencies.

For the initial use case, rollback target is the current exact UAO 1.7 entry:
sha256:39a8431c6270ea0e316cefaefdf220160508a6d04eb7f11978a09530224b6468
locator: CHATGPT_FILE_LIBRARY / UAO_ACTIVE.md / file_00000000557482468c15f295d6be5a8a

No base bytes need be copied because rollback reselects the already-active exact base locator.

## 10. BOUNDEDNESS

This mechanism applies only to UAO composed ACTIVE resolution.

It MUST NOT automatically generalize to UCP, other kernels, arbitrary artifacts, packages, plugins, or dependency graphs.
It MUST NOT change bootstrap trust-root semantics.
It MUST NOT replace /dump or /restore.
It MUST NOT create a second control-plane HEAD.

Generalization requires separate evidence and governance.

## 11. QUALIFICATION ORACLE

Required before G2 promotion:

Q1 exact base + exact amendment resolves => PASS;
Q2 wrong base hash => FAIL_CLOSED;
Q3 wrong amendment hash => FAIL_CLOSED;
Q4 amendment targets another base => FAIL_CLOSED;
Q5 missing component => FAIL_CLOSED;
Q6 stale HEAD before selection => NO_MUTATION;
Q7 manifest present in Git but not selected by HEAD => NOT_ACTIVE;
Q8 rollback reselects prior exact UAO 1.7 => PASS when prior locator remains resolvable;
Q9 UCP/A4-A6 authority unchanged => PASS;
Q10 no unrelated kernel/load semantics changed => PASS.

## 12. INITIAL INTENDED USE

After this candidate itself receives G2 promotion, UAO 1.9 may be activated as:

BASE: exact ACTIVE UAO 1.7
AMENDMENT: exact qualified/human-approved UAO 1.9 candidate payload, promoted as amendment
EFFECTIVE_VERSION: 1.9

This candidate does not itself promote UAO 1.9 and does not consume the prior UAO 1.9 G2 decision until composed-resolution semantics are ACTIVE and current state is revalidated.