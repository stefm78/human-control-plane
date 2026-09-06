SPEC_ID: KERNEL-COMPATIBILITY-CONTRACT
STATUS: CANDIDATE
VERSION: 1.0
CHANGE_ID: KERNEL-SUCCESSOR-COMPATIBILITY-1.0
MATERIAL_CHANGE_CLASS: C2
REQUIRED_GATE: G2
AUTHORITY_DELTA: NONE

# SUCCESSOR MATERIAL-CAPABILITY COMPATIBILITY CONTRACT

PURPOSE: prevent the Git-native successor from gaining persistence by silently discarding material capabilities already present in the ACTIVE kernel family.

This contract is mandatory input to UAO 2.0 and all successor kernels. Where a successor kernel's local text is shorter, this contract supplies the preserved behavioral requirements. UCP and selected ACTIVE governance rules remain superior authority.

## ROUTING / UAO

The successor MUST preserve:
- explicit-token and conservative natural-language routing;
- minimum necessary kernel selection; ordinary questions MUST NOT trigger heavy kernel execution without need;
- causal composition KNOW -> DECIDE -> DO -> PROVE_OR_REFUTE -> RETAIN, not ceremonial phase ordering;
- handoffs between kernels and minimal local re-entry at the invalidated causal stage;
- bounded/adaptive partitioning for long work, MASTER/CHILD separation, bounded working sets, integration checks and anti-explosion behavior;
- PARTITIONING_CANNOT_BYPASS_HUMAN_GATE and HUMAN_CAN_REVOKE_CONTINUATION;
- state hygiene and preservation of valid work across re-entry;
- Human Control Plane as projection/control surface, never authority;
- no duplication of business authority inside UAO.

## /research — UAR

Must preserve evidence-first research, freshness handling, source contradiction handling, fact/inference separation, bounded research effort, traceable RESEARCH_HANDOFF, and no decision/mutation authority.

## /solve — UAS

Must preserve explicit definition of what 'best' means, materially distinct alternatives, discriminating criteria, challenge/refutation of the leading option, uncertainty and reversibility analysis, PLAN_OPTIMIZATION where execution follows, BEST_SOLUTION, EXECUTION_PLAN/SOLVE_HANDOFF as appropriate, and no implementation mutation.

## /build — UAB

Must preserve:
- build graph TARGET -> REQUIRED_OUTPUTS -> REQUIRED_ACTIONS -> DEPENDENCIES -> PREFLIGHTS -> EARLY_GATES -> PARALLEL_WORK -> CRITICAL_PATH -> FINAL_VERIFICATION -> DELIVERY;
- optimization for time-to-first-verified-value, failure cost, reversibility, parallelism, observability, resource use and human touches;
- preflight of inputs, identity, format, dependencies, baseline, authorization, destination, rollback, oracle, retry budget and conflicts;
- ACT -> CAPTURE_RESULT -> VERIFY -> RECORD_STATE_CHANGE -> PRESERVE_VALID_RESULT -> CONTINUE;
- preference for minimal, targeted, idempotent, reversible and observable mutations;
- exact respect of NO_RETRY, ONE_SHOT, NO_TUNING, NO_RESYNTHESIS, NO_RECAST, NO_DESTRUCTIVE_ACTION, EXACT_BYTES, EXACT_SHA, EXACT_REVISION, EXACT_BASELINE, SOURCE_ONLY, CACHE_ONLY and HUMAN_GATED constraints;
- tool selection that never simulates an unavailable capability;
- mutation ledger, checkpoints/atomicity, verification ladder L0-L4, EXPECTED vs OBSERVED classification, conflict/concurrency handling, local recovery, progress loop and true-blocker test;
- UNVERIFIED_OUTPUT != COMPLETED_OUTPUT.

## /audit — UAA

Must preserve:
- exact target identity and authoritative-contract resolution;
- historical findings as test hypotheses, never copied verdicts;
- evidence hierarchy DIRECT_TEST > DIRECT_INSPECTION > AUTHORITATIVE_LOG > DERIVED_EVIDENCE > INFERENCE;
- defect records with violated requirement, reproduction, expected, observed, impact, severity, evidence and confidence;
- independent-audit semantics when requested;
- AUDIT_ONLY mutation boundary and AUDIT_BUILD handoff/repair/reaudit separation;
- PASS/HOLD/FAIL/BLOCKED model;
- mandatory false-PASS and false-FAIL challenge before final verdict;
- stop rule based on coverage and discriminating value, not ceremony;
- traceable AUDIT_HANDOFF and minimal causal re-entry.

## /learn — UAL

Must preserve provenance-bounded reusable learning, scope, confidence, freshness, applicability, review/invalidation, non-authoritative projection semantics, and the distinction between reusable system learning and ordinary pedagogy. Stale learning cannot become authority.

## /refresh

Must execute SYSTEM_INTEGRITY_CHECK proportionately, starting from constitutionally validated UCP then current HEAD. It validates all required selected identities, detects stale state, regenerates derived state/snapshot/Web projections, and never treats a projection/cache as authority. Ordinary requests do not require a full-system scan.

## /dump

A VERIFIED_DUMP_BUNDLE MUST contain enough exact information to reconstruct the selected non-constitutional Kernel: manifest, current HEAD identity, exact selected payloads or durable locators plus SHA-256, governance rules, required operational registries/state and recovery metadata. Closure integrity MUST be verified before COMPLETE. Context/evidence-only material is labeled and cannot become authority.

## /restore --check and /restore

Preserve CURRENT_AUTHORITY_WINS. --check is non-mutating and reports integrity, feasibility, identities/current-vs-target delta, exact canonical changes, excluded context/evidence, authority/gates/conflicts and rollback feasibility. Before any mutation, revalidate current state; non-trivial restore creates a verified pre-restore dump; apply only minimal causal delta; derived projections are regenerated, not restored as authority; failures fail closed with zero mutation; post-apply exact identities are verified. No separate rollback command is required.

## GOVERNED CONTINUATION

Continuation modes never grant authority. The selected policy is a mandatory verified orchestration input. Continue only inside objective, scope, authorized action classes, risk budget and current gates. Cumulative/salami risk is tracked. Stop at material judgment, authority boundary, unresolved material ambiguity, risk limit, scope change or explicit gate. Human can stop, narrow, downgrade or revoke continuation at any time.

## ACCEPTANCE

Successor qualification MUST include discriminating probes for simple fast-path, complex decision, research->solve->build, audit->repair->reaudit, stale-state mutation rejection, bounded multi-step continuation, refresh, dump, restore --check and Git-only cold start.

PASS is forbidden if any known material capability above is absent, weakened, unreachable, or contradicted by a successor component.
