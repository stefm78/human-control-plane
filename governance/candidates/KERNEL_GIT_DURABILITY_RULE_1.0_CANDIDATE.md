SPEC_ID: KERNEL-GIT-DURABILITY-RULE
STATUS: CANDIDATE
VERSION: 1.0
CHANGE_ID: KERNEL-GIT-DURABILITY-1.0
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

# MINIMAL GIT DURABILITY RULE

## 1. PURPOSE

Prevent recurrence of the UAO 1.7 recovery defect: no future non-constitutional kernel may become ACTIVE when its exact byte payload is available only through a storage surface that the governed execution path cannot retrieve completely and verify byte-for-byte.

This rule uses the Git operational persistence authority already granted by UCP 1.1-R4. It creates no new provider, authority source, kernel, resolver, registry, or identity model.

## 2. RULE

Before promotion of any future non-constitutional kernel to ACTIVE, the exact deployable payload MUST be durably persisted in the configured Git operational persistence repository and be completely retrievable through the governed execution path.

Required pre-promotion evidence:
- exact deployable payload bytes;
- Git repository, branch and object path;
- content SHA-256 computed from those exact bytes;
- successful Git reread of the complete payload;
- recomputed SHA-256 equality;
- SPEC_ID / VERSION / deployable STATUS validation;
- rollback target identity and locator;
- fresh CONTROL_PLANE_HEAD identity before any active selection mutation.

If any required evidence is unavailable:
PROMOTION_BLOCKED_FAIL_CLOSED.

## 3. IDENTITY

Byte-exact SHA-256 remains the content identity model.
Git commit/blob identity is provenance/storage metadata and MUST NOT replace the declared content SHA-256.
Known hash without retrievable exact bytes is insufficient for a new promotion.

## 4. ACTIVE SELECTION

Git persistence of a candidate or deployable payload does not activate it.

COMMIT_EXISTS != ACTIVE.
GIT_WRITE_PERMISSION != PROMOTION_AUTHORITY.

Only an authorized promotion gate followed by fresh HEAD/CAS validation and successful post-apply verification may select the new ACTIVE identity.

## 5. LEGACY UAO 1.7

UAO 1.7 is a bounded legacy exception because it became ACTIVE before this durability invariant and its exact SHA-256 and File Library locator remain canonical, while its complete bytes cannot currently be exported by the governed execution surface.

Legacy treatment:
- UAO 1.7 remains ACTIVE and unchanged;
- its identity MUST NOT be weakened, recomputed from excerpts, or reconstructed conjecturally;
- its File Library locator remains canonical while 1.7 is ACTIVE;
- no claim is made that 1.7 has been migrated to Git;
- the exception authorizes no future File-Library-only promotion;
- rollback to 1.7 remains valid only while its current exact canonical locator remains resolvable under current UCP semantics.

This is containment of historical state, not normalization of the defect.

## 6. UAO 1.9

The already-qualified governed-continuation amendment UAO 1.9 is not promoted by this rule.

Its existing G2 human decision is preserved as historical authorization for that exact amendment, subject to fresh current-state validation at APPLY.

However, UAO 1.9 cannot become ACTIVE through a newly invented base+amendment resolver unless that resolver is separately qualified and promoted. The current composed-resolution candidate remains non-ACTIVE.

The preferred path for 1.9 remains:
1. obtain a complete deployable UAO 1.9 payload whose semantics include the exact required UAO base;
2. persist that exact payload in Git;
3. verify byte identity and semantics;
4. revalidate current HEAD/CAS and applicable gate authorization;
5. select and verify it.

If exact base material remains inaccessible, UAO 1.9 APPLY remains HOLD. This durability rule does not manufacture missing bytes.

## 7. SCOPE

Applies prospectively to non-constitutional kernel promotions governed by Git operational persistence under current UCP.

Does not change:
- UCP/bootstrap trust root;
- configured Git repository/branch/HEAD object;
- A4-A6 authority;
- promotion classification/gates;
- byte-exact identity semantics;
- File Library read semantics;
- existing ACTIVE identities.

UCP changes remain governed separately by C3/G3.

## 8. MINIMALITY

Rejected as unnecessary for this defect:
- generic base+amendment package manager;
- second HEAD;
- new persistence provider;
- semantic-hash identity;
- reconstruction from summaries;
- automatic migration of legacy ACTIVE artifacts;
- general dump/restore promotion.

The durable invariant is simply:

FUTURE_ACTIVE => EXACT_PAYLOAD_IN_GIT + COMPLETE_REREAD + SHA256_VERIFY + AUTHORIZED_HEAD_SELECTION.

## 9. QUALIFICATION ORACLE

Q1 future candidate exact bytes persisted in Git, reread and hash-match => eligible to proceed to its normal promotion gate.
Q2 Git payload truncated/unreadable => promotion blocked.
Q3 Git payload hash mismatch => promotion blocked.
Q4 File-Library-only future candidate => promotion blocked.
Q5 Git commit exists without human-required promotion decision => NOT_ACTIVE.
Q6 stale HEAD before selection => NO_MUTATION.
Q7 legacy UAO 1.7 remains unchanged => PASS.
Q8 UAO 1.9 missing exact deployable payload => HOLD, no reconstruction.
Q9 UCP/A4-A6 unchanged => PASS.
Q10 no resolver/package-manager introduced => PASS.

## 10. ROLLBACK

Promotion of this rule changes prospective governance behavior only. Rollback is removal/non-selection of this rule before it governs a future promotion; it does not mutate UAO 1.7 or any ACTIVE kernel payload.

Any later ACTIVE selection performed under this rule retains its own required rollback target and normal UCP gate semantics.
