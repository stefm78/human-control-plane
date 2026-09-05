# Human Control Plane — Phase 9B

First real published projection of the governed ChatGPT Library control-plane state.

- Snapshot: `HCP-SNAP-20260905T120215Z`
- Snapshot identity: `sha256-canonical-payload:446a6c620578d73e85f4140e3eff3a904b195ebca11c9b74e750e172d01e8ac3`
- Source state identity: `sha256-canonical-payload:28fe8949101cce49717c9278dad57a1ed76d0e6d802467486c124baef24537d7`

## Authority boundary
This repository is a projection only.
It can display, suggest, select and package actions.
It cannot mutate governed state.

## Local run
Serve this directory with a static HTTP server, e.g.:
`python -m http.server 8080`

## Refresh contract
`CURRENT_STATE → INSPECT_SOURCES → REVALIDATE_IDENTITIES → UPDATE_ONLY_MATERIAL_DELTAS → VERIFY → FREEZE_SNAPSHOT → OPTIONAL_PUBLISH`

`LOCAL_DELTA > GLOBAL_RECONSTRUCTION`
