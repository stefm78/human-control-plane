SPEC_ID: KERNEL-PERSISTENCE-COLD-START
STATUS: CANDIDATE
VERSION: 1.0
CHANGE_ID: KERNEL-PERSISTENCE-COLD-START-1.0
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE
SCOPE: NON_CONSTITUTIONAL_KERNEL_PERSISTENCE_AND_RECOVERY

# PURPOSE

Make the active Kernel durably reconstructible from an empty conversational session under the invariant:

EMPTY_SESSION + BOOTSTRAP => EXACT_ACTIVE_KERNEL

This candidate does not alter the constitutional bootstrap, UCP trust anchor, A4-A6 authority, or promotion semantics.

# 1. PERSISTENCE INVARIANT

For every non-constitutional ACTIVE artifact required to reconstruct the Kernel, the exact deployable bytes MUST be durably retrievable from the configured Git operational persistence repository and independently verifiable by declared SHA-256 before the artifact may be selected by CONTROL_PLANE_HEAD.

Legacy exceptions already ACTIVE before this rule may remain selected only while their exact canonical identity and locator remain resolvable, but they prevent a PASS on cold-start reconstructibility until migrated through a separately qualified exact-payload promotion.

# 2. HEAD-SUFFICIENT RESOLUTION

CONTROL_PLANE_HEAD is the transactional root for governed non-constitutional state.
A cold-start resolver MUST be able to derive from validated HEAD, directly or through explicitly referenced registries reachable from HEAD:
- UAO identity and locator;
- UAR, UAS, UAB, UAA and UAL identities and locators;
- ACTIVE governance policies/rules identities and locators;
- required governed registries and operational recovery metadata.

No conversation memory, hidden cache, stale File Library state projection, or prior session knowledge may be required to determine the selected ACTIVE set.

# 3. STATE / PROJECTION SEPARATION

Authoritative operational state consists only of UCP-authorized Git HEAD plus governed registries/metadata reachable from HEAD.
CONTROL_PLANE_STATE snapshots, Web UI, caches, reports and generated dumps are projections or recovery artifacts unless explicitly selected as authority by UCP.
Projection state MUST NOT override HEAD.

# 4. GOVERNANCE POLICY APPLICATION HOOK

A governance policy selected ACTIVE by HEAD affects orchestration only if the ACTIVE orchestration contract explicitly supports policy resolution/application or an independently qualified resolver/hook reachable from HEAD establishes that behavior.

ACTIVE_SELECTED != PROVEN_EFFECTIVE.

Before claiming a policy operational, qualification MUST prove:
1. selected identity resolves exactly;
2. consumer/hook resolves exactly;
3. deterministic application point is defined;
4. authority remains bounded by UCP and kernel contracts;
5. disabling/removing selection restores prior behavior without mutating kernel bytes.

# 5. REFRESH CONTRACT

/refresh under UCP 1.1-R4 MUST:
1. validate constitutional UCP against the bootstrap-bound identity;
2. retrieve fresh CONTROL_PLANE_HEAD;
3. resolve exact selected non-constitutional identities from HEAD;
4. validate required policy/rule consumers/hooks;
5. detect stale projections and rebuild them only as derived outputs;
6. perform no ACTIVE mutation unless separately authorized and after fresh HEAD/CAS revalidation;
7. return explicit NO_CHANGE / PROJECTION_UPDATED / BLOCKED_FAIL_CLOSED / MUTATION_REQUIRES_GATE semantics.

Git/HEAD unavailable or required identity unverifiable => fail closed for mutation and for claims of complete reconstruction.

# 6. DUMP CONTRACT

/dump is read-only and produces VERIFIED_DUMP_BUNDLE only when it can package or reference all data required to verify reconstruction:
- bootstrap identity metadata (never replacing the external constitutional anchor);
- exact UCP identity and locator;
- exact HEAD identity and bytes;
- exact selected non-constitutional artifact identities and Git locators;
- governed registries/recovery metadata required by HEAD;
- manifest with SHA-256 for every packaged exact payload;
- declared legacy exceptions and unresolved reconstruction blockers.

A bundle containing unresolved legacy artifacts MAY be emitted only as PARTIAL_DUMP_NOT_RESTORABLE and MUST NOT be called VERIFIED_DUMP_BUNDLE.

# 7. RESTORE CHECK CONTRACT

/restore --check is A0/read-only and MUST perform a reconstruction qualification without selecting or mutating ACTIVE state:
1. validate external bootstrap anchor metadata supplied to the check;
2. verify UCP exact identity;
3. verify HEAD bytes/identity;
4. recursively resolve selected artifacts/registries;
5. recompute hashes;
6. verify consumer hooks required for governance policies;
7. compute canonical Kernel identity manifest;
8. compare reconstructed identity manifest with canonical expected identity.

PASS only if:
IDENTITY(RECONSTRUCTED_KERNEL) == IDENTITY(CANONICAL_KERNEL)
and no required artifact depends on unavailable conversation state/cache.

# 8. COLD-START QUALIFICATION

A promotion claiming full persistence MUST include a cold-start probe executed from a deliberately empty session model:
INPUTS: external bootstrap anchor + configured Git access only.
FORBIDDEN INPUTS: conversation memory, File Library semantic summaries, cached CONTROL_PLANE_STATE, previously loaded kernel text.
EXPECTED: exact resolution of all selected non-constitutional artifacts and successful /? routing inventory from reconstructed contracts.

If any ACTIVE artifact required for orchestration is not byte-exactly retrievable through the governed cold-start path, verdict = HOLD.

# 9. LEGACY UAO 1.7 BLOCKER

Current UAO 1.7 is selected by HEAD through CHATGPT_FILE_LIBRARY and is a known legacy exception under KERNEL-GIT-DURABILITY-RULE 1.0.
This candidate MUST NOT reconstruct, rewrite, approximate or migrate UAO 1.7 from excerpts or summaries.

Therefore current expected qualification is:
- persistence framework: qualifiable;
- full cold-start reconstructibility: HOLD until exact UAO 1.7 deployable bytes are obtained or an exact new UAO deployable candidate is independently built from authoritative source bytes and promoted through normal G2.

# 10. MINIMAL MIGRATION PATH

Preferred path:
1. obtain exact complete bytes for the currently selected UAO or an independently exact complete successor payload;
2. persist candidate payload in Git;
3. complete reread + SHA-256 equality;
4. qualify routing equivalence plus required R4 refresh/policy hooks;
5. perform contradictory cold-start probe on candidate branch;
6. present exact G2 candidate and rollback target;
7. only after explicit human G2 decision, revalidate HEAD/CAS and select new ACTIVE identity;
8. post-apply rerun cold-start and /restore --check.

No generic package manager, second HEAD, semantic-hash identity, guessed byte reconstruction or constitutional change is introduced.

# 11. ROLLBACK

Before any future APPLY, rollback target is the exact pre-apply CONTROL_PLANE_HEAD identity plus all previously selected ACTIVE artifact locators. Rollback is a governed HEAD selection reversal after fresh CAS and required authorization. Constitutional bootstrap/UCP remain unchanged.

# 12. QUALIFICATION ORACLE

Q1 empty session + bootstrap + Git only resolves complete selected Kernel => PASS.
Q2 selected required artifact depends on File Library-only legacy payload => HOLD.
Q3 HEAD exact but governance policy consumer absent => HOLD.
Q4 stale projection conflicts with HEAD => HEAD wins; projection rebuilt or quarantined.
Q5 /dump omits required exact identity => not VERIFIED_DUMP_BUNDLE.
Q6 /restore --check mutates ACTIVE => FAIL.
Q7 hash mismatch => FAIL_CLOSED.
Q8 no A4-A6 or constitutional authority delta => PASS.
Q9 UAO 1.7 bytes approximated from snippets => FAIL.
Q10 current state with UAO 1.7 File Library dependency => full cold-start verdict HOLD until migrated exactly.
