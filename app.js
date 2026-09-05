let DATA=null, REGISTRY=null, CURRENT_BUNDLE=null;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const qs=id=>document.querySelector(id);
async function fetchFresh(path){const sep=path.includes("?")?"&":"?";const r=await fetch(`${path}${sep}v=${Date.now()}`,{cache:"no-store"});if(!r.ok)throw new Error(`${path}: HTTP ${r.status}`);return r.json();}
async function load(){[DATA,REGISTRY]=await Promise.all([fetchFresh("state/control-plane.json"),fetchFresh("state/learning-registry.json")]);render();}
function selectOptions(values){return `<option value="">Tous</option>${[...new Set(values.filter(Boolean))].sort().map(v=>`<option>${esc(v)}</option>`).join("")}`;}
function render(){
 qs("#snapshot").textContent=`Snapshot ${DATA.snapshot_id} · ${DATA.generated_at}`;
 qs("#control").textContent=DATA.system_state.control_status;
 qs("#sourceState").textContent=`Source state: ${DATA.source_state_identity}`;
 const lr=DATA.learning_registry||{};
 qs("#overview").innerHTML=`<div class="grid">
 <div class="card"><div class="muted">Kernels</div><div class="metric">${DATA.kernels.length}</div></div>
 <div class="card"><div class="muted">Works connus</div><div class="metric">${DATA.works.length}</div></div>
 <div class="card"><div class="muted">Learnings persistants</div><div class="metric">${lr.registered??REGISTRY.learnings.length}</div><div class="muted">${esc(lr.coverage||REGISTRY.coverage.status)}</div></div>
 <div class="card"><div class="muted">Attention</div><div class="metric">${DATA.attention_items.length}</div></div></div>
 <h2>Human attention</h2>${DATA.attention_items.map(x=>`<div class="card attention"><b>${esc(x.label)}</b></div>`).join("")||'<div class="card">Aucune attention immédiate.</div>'}
 <h2>Warnings</h2>${DATA.warnings.map(x=>`<div class="card warn"><span class="tag">${esc(x.status)}</span> ${esc(x.message)}</div>`).join("")}`;
 qs("#kernels").innerHTML=`<h2>Kernels</h2><table><tr><th>Name</th><th>Version</th><th>Status</th><th>Freshness</th><th>Identity</th></tr>${DATA.kernels.map(k=>`<tr><td>${esc(k.name)}</td><td>${esc(k.version)}</td><td>${esc(k.status)}</td><td>${esc(k.freshness)}</td><td title="${esc(k.state_identity)}">${esc(k.state_identity.slice(0,22))}…</td></tr>`).join("")}</table>`;
 qs("#works").innerHTML=`<h2>Works</h2>${DATA.works.map(w=>`<div class="card"><b>${esc(w.work_name)}</b><p>${esc(w.work_id)} · ${esc(w.status)} · ${esc(w.freshness)}</p><p>Next: ${esc(w.next_action_candidate)}</p></div>`).join("")}<p class="muted">Coverage: ${esc(JSON.stringify(DATA.coverage.works))}</p>`;
 renderLearnings();
 qs("#action-list").innerHTML=`<h2>Suggested actions</h2>${DATA.suggested_actions.map(a=>`<label class="row"><input type="checkbox" value="${esc(a.action_id)}"><span><b>${esc(a.label)}</b><br><span class="muted">${esc(a.reason)}</span><br><span class="tag">${esc(a.requested_mode)}</span> <span class="tag">${esc(a.material_change_hint)}/${esc(a.required_gate_hint)}</span></span></label>`).join("")||'<div class="card">Aucune action learning ciblable tant que le registre est vide.</div>'}`;
}
function renderLearnings(){
 const ls=REGISTRY.learnings||[];
 qs("#learning-filters").innerHTML=`<select id="f-status">${selectOptions(ls.map(x=>x.status))}</select><select id="f-scope">${selectOptions(ls.map(x=>x.scope))}</select><select id="f-freshness">${selectOptions(ls.map(x=>x.freshness_class))}</select><select id="f-applicability">${selectOptions(ls.map(x=>x.applicability))}</select>`;
 ["#f-status","#f-scope","#f-freshness","#f-applicability"].forEach(id=>qs(id).addEventListener("change",renderLearningRows));
 renderLearningRows();
}
function renderLearningRows(){
 const ls=REGISTRY.learnings||[], val=id=>qs(id)?.value||"";
 const filtered=ls.filter(l=>(!val("#f-status")||l.status===val("#f-status"))&&(!val("#f-scope")||l.scope===val("#f-scope"))&&(!val("#f-freshness")||l.freshness_class===val("#f-freshness"))&&(!val("#f-applicability")||l.applicability===val("#f-applicability")));
 qs("#learning-rows").innerHTML=filtered.length?filtered.map(l=>`<details class="card"><summary><b>${esc(l.learning_id)}</b> · ${esc(l.status)} · ${esc(l.scope)} · ${esc(l.applicability)}</summary><p>${esc(l.statement)}</p><p><b>Confidence:</b> ${esc(l.confidence)} · <b>Freshness:</b> ${esc(l.freshness_class)}</p><p><b>Review:</b> ${esc(l.review_after||"—")} · <b>Valid until:</b> ${esc(l.valid_until||"—")}</p><p><b>Invalidate if:</b> ${esc(JSON.stringify(l.invalidate_if))}</p><p><b>Evidence:</b> ${esc(JSON.stringify(l.source_evidence))}</p><p><b>Provenance:</b> ${esc(JSON.stringify(l.provenance))}</p></details>`).join(""):`<div class="card warn">Registre canonique établi mais vide. EMPTY_ESTABLISHED_REGISTRY ≠ PROVEN_NO_LEARNING.</div>`;
}
document.addEventListener("click",e=>{
 if(e.target.matches("nav button")){document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));qs("#"+e.target.dataset.view).classList.remove("hidden");}
 if(e.target.id==="generate")generate();
 if(e.target.id==="copy"&&CURRENT_BUNDLE)navigator.clipboard.writeText(JSON.stringify(CURRENT_BUNDLE,null,2));
 if(e.target.id==="copyPrompt"&&CURRENT_BUNDLE)navigator.clipboard.writeText(`/audit /solve /build\nExecute ce HUMAN_CONTROL_ACTION_BUNDLE comme intention humaine sélectionnée. Revalide snapshot, registry identity, learning identity, scope, applicability, autorité, classe matérielle et gate avant toute mutation. N'exécute aucune action stale.\n\n${JSON.stringify(CURRENT_BUNDLE,null,2)}`);
 if(e.target.id==="download"&&CURRENT_BUNDLE){let b=new Blob([JSON.stringify(CURRENT_BUNDLE,null,2)],{type:"application/json"}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=CURRENT_BUNDLE.bundle_id+".json";a.click();URL.revokeObjectURL(u);}
});
function generate(){
 const ids=[...document.querySelectorAll('#action-list input:checked')].map(x=>x.value);
 const actions=DATA.suggested_actions.filter(a=>ids.includes(a.action_id));
 if(!actions.length){qs("#bundle").textContent="Sélectionne au moins une action.";return;}
 CURRENT_BUNDLE={schema:"human-control-plane.action-bundle.v1",bundle_id:`HCP-BUNDLE-${Date.now()}`,source_snapshot_id:DATA.snapshot_id,generated_at:new Date().toISOString(),actions,execution_policy:qs("#policy").value,human_selection_proof:{selection_method:"WEB_UI_EXPLICIT_CHECKBOX_SELECTION",selected_action_ids:ids},optional_notes:`Registry ${REGISTRY.registry_identity}; hints are non-authoritative.`};
 qs("#bundle").textContent=JSON.stringify(CURRENT_BUNDLE,null,2);
}
load().catch(e=>document.body.innerHTML=`<main><h1>Snapshot unavailable</h1><pre>${esc(e)}</pre></main>`);