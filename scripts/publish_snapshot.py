#!/usr/bin/env python3
from pathlib import Path
import json, hashlib, shutil, sys
if len(sys.argv)!=2: raise SystemExit("usage: publish_snapshot.py <snapshot.json>")
src=Path(sys.argv[1]); data=json.loads(src.read_text(encoding="utf-8"))
required={"schema","snapshot_identity","snapshot_id","generated_at","source_state_identity","source_of_truth","system_state","kernels","works","partitions","learnings","artifacts","gates","warnings","attention_items","suggested_actions","coverage"}
missing=required-set(data)
if missing: raise SystemExit("missing: "+", ".join(sorted(missing)))
if data["schema"]!="human-control-plane.snapshot.v1": raise SystemExit("wrong schema")
dst=Path(__file__).resolve().parents[1]/"state"/"control-plane.json"
shutil.copy2(src,dst)
print("snapshot",data["snapshot_id"])
print("source_state",data["source_state_identity"])
print("file_sha256",hashlib.sha256(dst.read_bytes()).hexdigest())
print("NOTE: local publication only; repo commit/push remains a distinct explicit publication event.")
