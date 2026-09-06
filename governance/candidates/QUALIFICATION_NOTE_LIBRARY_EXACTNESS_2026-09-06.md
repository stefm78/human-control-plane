# QUALIFICATION NOTE — FILE LIBRARY EXACTNESS

The legacy control-plane snapshot records exact SHA-256 identities and File Library file IDs for UAO/UAR/UAS/UAB/UAA/UAL. This is useful provenance, but not sufficient for Git cold-start migration unless each complete payload can be retrieved and rehashed byte-for-byte through the governed execution surface.

Observed exact identities:
- UAO 1.7: 39a8431c6270ea0e316cefaefdf220160508a6d04eb7f11978a09530224b6468
- UAR 1.0: f0ad46c5a851ae99f61ab759e315a7cdb282de44d233fa1fd648e1da78382c94
- UAS 2.3: 1680b15b8b9b6191838da8e6c9abafabcb46339d9cb05465e28fefa5917bf5b4
- UAB 1.1: 1bcb52f3939c4cabd26446477de70228a45f7e40ee023aea6c4f5eef49382c40
- UAA 1.1: b4bb5d344ef0b51eef13fb74c1cf5a1ae7b19340be78862e7c31430e49a2fab1
- UAL 1.1: a0e14879b92c847f21e08fcb46ab1882be71c992e15414bdc02b0d215fc68966

Some exact/promoted archives exist, and UAB 1.1/UAR manifests expose byte sizes and hashes, but the current qualification has not established complete byte-for-byte export for every ACTIVE kernel. Therefore no Git migration payload is asserted exact unless complete reread + recomputed SHA equality is independently demonstrated.

Fail-closed: known hash != retrievable exact bytes.
