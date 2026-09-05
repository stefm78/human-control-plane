let DATA=null, REGISTRY=null, CURRENT_BUNDLE=null;
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const qs=id=>document.querySelector(id);
const HELP={
 snapshot:["Snapshot","Photo figée de l’état affiché. Elle sert à savoir exactement sur quel état une lecture ou une action est fondée."],
 source:["Source state","Identité de l’état canonique ayant produit ce snapshot. Si elle change, une action préparée auparavant doit être revalidée."],
 control:["Control status","État global du dispositif de gouvernance. ESTABLISHED signifie que le Control Plane est constitué ; cela ne signifie pas que tous les travaux sont terminés."],
 kernel:["Kernel","Capacité gouvernée spécialisée. Un kernel a un rôle précis : connaître, décider, construire, auditer ou apprendre."],
 freshness:["Freshness","Indique si l’information a été vérifiée récemment. STALE signifie : information historique à rafraîchir avant d’agir, pas nécessairement information fausse."],
 identity:["Identity","Empreinte qui permet de distinguer exactement une version d’un état ou artefact. Elle évite de croire que deux objets portant le même nom sont identiques."],
 work:["Work","Unité de travail suivie. Son statut décrit le dernier état connu ; sa freshness indique si cet état peut encore être utilisé tel quel."],
 attention:["Human attention","Éléments pour lesquels une intervention ou une vigilance humaine est réellement utile. Ce n’est pas une liste générale d’erreurs."],
 warning:["Warning","Signal à comprendre avant de conclure ou d’agir. Un warning n’est pas automatiquement un blocker."],
 learning:["Learning","Connaissance réutilisable persistée avec portée, provenance, confiance et conditions d’invalidation. Un registre vide ne prouve pas qu’aucun apprentissage n’existe ailleurs."],
 applicability:["Applicability","Indique dans quelles situations un learning peut être réutilisé. Une connaissance hors de son périmètre ne doit pas être généralisée automatiquement."],
 action:["Suggested action","Action proposée à partir de l’état courant. Elle n’est pas exécutée par le site : la sélection produit une intention humaine à revalider avant mutation."],
 gate:["Gate","Niveau de contrôle requis avant une mutation. Un HUMAN_GATE signifie qu’une décision ou autorisation humaine est indispensable."],
 policy:["Execution policy","BEST_EFFORT_INDEPENDENT exécute les actions indépendantes possibles ; ORDERED_STOP_ON_BLOCKER respecte l’ordre et s’arrête au premier blocker ; ALL_OR_STOP exige que l’ensemble soit exécutable avant de commencer."],
 bundle:["Action bundle","Paquet d’intention humaine sélectionné dans l’interface. Il transporte les actions choisies et leurs références ; ce n’est ni une preuve d’autorisation permanente ni une exécution directe."],
 authority:["Authority class","Classe indiquant jusqu’où une capacité peut aller. Elle ne remplace jamais les gates, contraintes et revalidations applicables à l’action concrète."],
 status:["Status","État métier de l’objet. Il doit être lu avec Freshness : par exemple READY + STALE veut dire « était prêt lors de la dernière observation, à revalider maintenant »."],
 coverage:["Coverage","Ce que le snapshot sait réellement couvrir. Une couverture partielle doit rester visible : absence de donnée ≠ preuve d’absence."],
 provenance:["Provenance","Origine vérifiable d’une information ou d’un artefact. Elle permet de remonter à la source au lieu de faire confiance au seul affichage."],
 technical:["Termes techniques","Les identifiants, SHA et noms canoniques restent visibles pour la traçabilité. L’aide donne leur sens opérationnel sans les remplacer." ]
};
const h=(key,label="?")=>`<button class="help" data-help="${key}" aria-label="Aide : ${esc(HELP[key]?.[0]||key)}">${esc(label)}</button>`;
async function fetchFresh(path){const sep=path.includes("?")?"&":"?";const r=await fetch(`${path}${sep}v=${Date.now()}`,{cache:"no-store"});if(!r.ok)throw new Error(`${path}: HTTP ${r.status}`);return r.json();}
async function load(){[DATA,REGISTRY]=await Promise.all([fetchFresh("state/control-plane.json"),fetchFresh("state/learning-registry.json")]);render();}
function selectOptions(values){return `<option value="">Tous</option>${[...new Set(values.filter(Boolean))].sort().map(v=>`<option>${esc(v)}</option>`).join("")}`;}
function plainFreshness(v){return v==="STALE"?"À revalider":v==="VERIFIED"?"Vérifié":v||"—";}
function showHelp(key){const item=HELP[key]||HELP.technical;qs("#helpTitle").textContent=item[0];qs("#helpBody").innerHTML=`<p>${esc(item[1])}</p>`;qs("#helpPanel").classList.remove("hidden");qs("#helpToggle").setAttribute("aria-expanded","true");}
function showGeneralHelp(){qs("#helpTitle").textContent="Comment lire ce Control Plane";qs("#helpBody").innerHTML=`<p>Commence par <b>Human attention</b> et les <b>Warnings</b>. Pour un travail, lis toujours son <b>Status</b> avec sa <b>Freshness</b>. Les identités et SHA servent à la traçabilité ; ils ne sont pas nécessaires pour comprendre la situation générale.</p><div class="explain"><strong>Règle de lecture</strong>État connu + fraîcheur + provenance + gate éventuel = information exploitable.</div><div class="explain"><strong>Règle de prudence</strong>STALE ne veut pas dire faux. Une absence dans le snapshot ne prouve pas une absence réelle.</div><div class="explain"><strong>Règle d’action</strong>Le site prépare une intention humaine ; toute mutation reste revalidée par la gouvernance.</div>`;qs("#helpPanel").classList.remove("hidden");qs("#helpToggle").setAttribute("aria-expanded","true");}
function render(){
 qs("#snapshot").innerHTML=`Snapshot ${esc(DATA.snapshot_id)} · ${esc(DATA.generated_at)} ${h("snapshot")}`;
 qs("#control").innerHTML=`${esc(DATA.system_state.control_status)} ${h("control")}`;
 qs("#sourceState").innerHTML=`Source state: <span class="technical">${esc(DATA.source_state_identity)}</span> ${h("source")}`;
 const lr=DATA.learning_registry||{};
 qs("#overview").innerHTML=`<p class="section-intro">Cette vue répond d’abord à trois questions : <b>où faut-il regarder ?</b>, <b>qu’est-ce qui est encore fiable ?</b> et <b>une action humaine est-elle nécessaire ?</b></p><div class="grid">
 <div class="card"><div class="muted">Kernels ${h("kernel")}</div><div class="metric">${DATA.kernels.length}</div></div>
 <div class="card"><div class="muted">Works connus ${h("work")}</div><div class="metric">${DATA.works.length}</div></div>
 <div class="card"><div class="muted">Learnings persistants ${h("learning")}</div><div class="metric">${lr.registered??REGISTRY.learnings.length}</div><div class="muted">${esc(lr.coverage||REGISTRY.coverage.status)}</div></div>
 <div class="card"><div class="muted">Attention ${h("attention")}</div><div class="metric">${DATA.attention_items.length}</div></div></div>
 <h2>Human attention ${h("attention")}</h2>${DATA.attention_items.map(x=>`<div class="card attention"><b>${esc(x.label)}</b></div>`).join("")||'<div class="card">Aucune attention immédiate.</div>'}
 <h2>Warnings ${h("warning")}</h2>${DATA.warnings.map(x=>`<div class="card warn"><span class="tag">${esc(x.status)}</span> ${esc(x.message)}</div>`).join("")||'<div class="card">Aucun warning dans ce snapshot.</div>'}`;
 qs("#kernels").innerHTML=`<h2>Kernels ${h("kernel")}</h2><p class="section-intro">Les kernels sont les capacités gouvernées du système. Les colonnes techniques permettent de vérifier exactement quelle version est active.</p><table><tr><th>Name ${h("kernel")}</th><th>Version</th><th>Status ${h("status")}</th><th>Freshness ${h("freshness")}</th><th>Identity ${h("identity")}</th></tr>${DATA.kernels.map(k=>`<tr><td>${esc(k.name)}</td><td>${esc(k.version)}</td><td>${esc(k.status)}</td><td><span class="plain-status">${esc(plainFreshness(k.freshness))}</span><br><span class="muted">${esc(k.freshness)}</span></td><td title="${esc(k.state_identity)}" class="technical">${esc(k.state_identity.slice(0,22))}…</td></tr>`).join("")}</table>`;
 qs("#works").innerHTML=`<h2>Works ${h("work")}</h2><p class="section-intro">Un statut historique n’est actionnable que si sa fraîcheur le permet. Quand un work est STALE, rafraîchis sa source autoritative avant de poursuivre.</p>${DATA.works.map(w=>`<div class="card"><b>${esc(w.work_name)}</b><p><span class="technical">${esc(w.work_id)}</span> · <b>${esc(w.status)}</b> ${h("status")} · <span class="plain-status">${esc(plainFreshness(w.freshness))}</span> ${h("freshness")}</p><p><b>Prochaine action candidate :</b> ${esc(w.next_action_candidate)}</p></div>`).join("")}<p class="muted">Coverage ${h("coverage")}: ${esc(JSON.stringify(DATA.coverage.works))}</p>`;
 renderLearnings();
 qs("#action-list").innerHTML=`<h2>Suggested actions ${h("action")}</h2><p class="section-intro">Cocher une action ne l’exécute pas. Cela construit un bundle d’intention humaine qui devra encore être revalidé contre l’état courant, l’autorité et les gates.</p>${DATA.suggested_actions.map(a=>`<label class="row"><input type="checkbox" value="${esc(a.action_id)}"><span><b>${esc(a.label)}</b><br><span class="muted">${esc(a.reason)}</span><br><span class="tag">${esc(a.requested_mode)}</span> <span class="tag">${esc(a.material_change_hint)}/${esc(a.required_gate_hint)}</span> ${h("gate")}</span></label>`).join("")||'<div class="card">Aucune action learning ciblable tant que le registre est vide.</div>'}`;
 qs("#policy-help").innerHTML=`<p class="policy-note muted">Politique d’exécution ${h("policy")} — elle définit le comportement du bundle face aux blockers ; elle n’augmente aucune autorité.</p>`;
}
function renderLearnings(){
 const ls=REGISTRY.learnings||[];
 qs("#learning-filters").innerHTML=`<span class="muted">Filtres :</span><select id="f-status" aria-label="Statut">${selectOptions(ls.map(x=>x.status))}</select><select id="f-scope" aria-label="Portée">${selectOptions(ls.map(x=>x.scope))}</select><select id="f-freshness" aria-label="Fraîcheur">${selectOptions(ls.map(x=>x.freshness_class))}</select><select id="f-applicability" aria-label="Applicabilité">${selectOptions(ls.map(x=>x.applicability))}</select> ${h("applicability")}`;
 ["#f-status","#f-scope","#f-freshness","#f-applicability"].forEach(id=>qs(id).addEventListener("change",renderLearningRows));
 renderLearningRows();
}
function renderLearningRows(){
 const ls=REGISTRY.learnings||[], val=id=>qs(id)?.value||"";
 const filtered=ls.filter(l=>(!val("#f-status")||l.status===val("#f-status"))&&(!val("#f-scope")||l.scope===val("#f-scope"))&&(!val("#f-freshness")||l.freshness_class===val("#f-freshness"))&&(!val("#f-applicability")||l.applicability===val("#f-applicability")));
 qs("#learning-rows").innerHTML=filtered.length?filtered.map(l=>`<details class="card"><summary><b>${esc(l.learning_id)}</b> · ${esc(l.status)} · ${esc(l.scope)} · ${esc(l.applicability)}</summary><p>${esc(l.statement)}</p><p><b>Confidence:</b> ${esc(l.confidence)} · <b>Freshness:</b> ${esc(l.freshness_class)} ${h("freshness")}</p><p><b>Review:</b> ${esc(l.review_after||"—")} · <b>Valid until:</b> ${esc(l.valid_until||"—")}</p><p><b>Invalidate if:</b> ${esc(JSON.stringify(l.invalidate_if))}</p><p><b>Evidence:</b> ${esc(JSON.stringify(l.source_evidence))}</p><p><b>Provenance ${h("provenance")}:</b> ${esc(JSON.stringify(l.provenance))}</p></details>`).join(""):`<div class="card warn"><b>Registre établi mais vide.</b><p>Aucun learning n’est actuellement enregistré dans ce registre canonique. Cela ne prouve pas qu’aucun apprentissage n’existe ailleurs.</p><span class="technical">EMPTY_ESTABLISHED_REGISTRY ≠ PROVEN_NO_LEARNING</span></div>`;
}
document.addEventListener("click",e=>{
 const help=e.target.closest?.("[data-help]");if(help){e.preventDefault();showHelp(help.dataset.help);return;}
 if(e.target.matches("nav button[data-view]")){document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));qs("#"+e.target.dataset.view).classList.remove("hidden");}
 if(e.target.id==="helpToggle")showGeneralHelp();
 if(e.target.id==="helpClose"){qs("#helpPanel").classList.add("hidden");qs("#helpToggle").setAttribute("aria-expanded","false");}
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