let DATA=null, CURRENT_BUNDLE=null;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function load(){DATA=await fetch("state/control-plane.json").then(r=>r.json());render();}
function render(){
 document.querySelector("#snapshot").textContent=`Snapshot ${DATA.snapshot_id} · ${DATA.generated_at}`;
 document.querySelector("#control").textContent=DATA.system_state.control_status;
 document.querySelector("#sourceState").textContent=`Source state: ${DATA.source_state_identity}`;
 document.querySelector("#overview").innerHTML=`<div class="grid">
 <div class="card"><div class="muted">Kernels</div><div class="metric">${DATA.kernels.length}</div></div>
 <div class="card"><div class="muted">Works connus</div><div class="metric">${DATA.works.length}</div></div>
 <div class="card"><div class="muted">Learnings UAL inventoriés</div><div class="metric">${DATA.learnings.length}</div><div class="muted">${esc(DATA.coverage.learnings?.status||DATA.coverage.learnings)}</div></div>
 <div class="card"><div class="muted">Attention</div><div class="metric">${DATA.attention_items.length}</div></div></div>
 <h2>Human attention</h2>${DATA.attention_items.map(x=>`<div class="card attention"><b>${esc(x.label)}</b></div>`).join("")}
 <h2>Warnings</h2>${DATA.warnings.map(x=>`<div class="card warn"><span class="tag">${esc(x.status)}</span> ${esc(x.message)}</div>`).join("")}`;
 document.querySelector("#kernels").innerHTML=`<h2>Kernels</h2><table><tr><th>Name</th><th>Version</th><th>Status</th><th>Freshness</th><th>Identity</th></tr>${DATA.kernels.map(k=>`<tr><td>${esc(k.name)}</td><td>${esc(k.version)}</td><td>${esc(k.status)}</td><td>${esc(k.freshness)}</td><td title="${esc(k.state_identity)}">${esc(k.state_identity.slice(0,22))}…</td></tr>`).join("")}</table>`;
 document.querySelector("#works").innerHTML=`<h2>Works</h2>${DATA.works.map(w=>`<div class="card"><b>${esc(w.work_name)}</b><p>${esc(w.work_id)} · ${esc(w.status)} · ${esc(w.freshness)}</p><p>Next: ${esc(w.next_action_candidate)}</p></div>`).join("")}<p class="muted">Coverage: ${esc(DATA.coverage.works)}</p>`;
 document.querySelector("#learnings").innerHTML=`<h2>Learnings</h2>${DATA.learnings.length?DATA.learnings.map(l=>`<div class="card">${esc(l.statement)}</div>`).join(""):`<div class="card warn">Aucun registre canonique de learnings n'a été établi par ce snapshot. EMPTY ≠ PROVEN NONE.</div>`}`;
 document.querySelector("#action-list").innerHTML=`<h2>Suggested actions</h2>${DATA.suggested_actions.map(a=>`<label class="row"><input type="checkbox" value="${esc(a.action_id)}"><span><b>${esc(a.label)}</b><br><span class="muted">${esc(a.reason)}</span><br><span class="tag">${esc(a.requested_mode)}</span> <span class="tag">${esc(a.material_change_hint)}/${esc(a.required_gate_hint)}</span></span></label>`).join("")}`;
}
document.addEventListener("click",e=>{
 if(e.target.matches("nav button")){document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));document.querySelector("#"+e.target.dataset.view).classList.remove("hidden");}
 if(e.target.id==="generate") generate();
 if(e.target.id==="copy" && CURRENT_BUNDLE) navigator.clipboard.writeText(JSON.stringify(CURRENT_BUNDLE,null,2));
 if(e.target.id==="copyPrompt" && CURRENT_BUNDLE) navigator.clipboard.writeText(`/audit /solve /build\nExecute ce HUMAN_CONTROL_ACTION_BUNDLE comme intention humaine sélectionnée. Revalide le snapshot, les identités, l'autorité, la classe matérielle et les gates avant toute mutation. N'exécute aucune action stale et respecte UCP.\n\n${JSON.stringify(CURRENT_BUNDLE,null,2)}`);
 if(e.target.id==="download" && CURRENT_BUNDLE){let b=new Blob([JSON.stringify(CURRENT_BUNDLE,null,2)],{type:"application/json"}),u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=CURRENT_BUNDLE.bundle_id+".json";a.click();URL.revokeObjectURL(u);}
});
function generate(){
 const ids=[...document.querySelectorAll('#action-list input:checked')].map(x=>x.value);
 const actions=DATA.suggested_actions.filter(a=>ids.includes(a.action_id));
 if(!actions.length){document.querySelector("#bundle").textContent="Sélectionne au moins une action.";return;}
 CURRENT_BUNDLE={schema:"human-control-plane.action-bundle.v1",bundle_id:`HCP-BUNDLE-${Date.now()}`,source_snapshot_id:DATA.snapshot_id,generated_at:new Date().toISOString(),actions,execution_policy:document.querySelector("#policy").value,human_selection_proof:{selection_method:"WEB_UI_EXPLICIT_CHECKBOX_SELECTION",selected_action_ids:ids},optional_notes:"Hints are non-authoritative; ChatGPT must revalidate."};
 document.querySelector("#bundle").textContent=JSON.stringify(CURRENT_BUNDLE,null,2);
}
load().catch(e=>document.body.innerHTML=`<main><h1>Snapshot unavailable</h1><pre>${esc(e)}</pre></main>`);