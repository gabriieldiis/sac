/* Tela Assuntos e tópicos: ativar, criar e definir quem resolve. */
/* ================= Assuntos e tópicos: gestão do que aparece no atendimento ================= */
/* um sub-assunto inativo fica marcado com .off na própria entrada do array (["nome","r"|"v"]) */
const asOn=()=>Object.keys(AS).filter(a=>!AS[a].off);
const subsOn=a=>AS[a].s.filter(x=>!x.off);
const AQ={sel:'Consulta de Pedido',q:'',f:'all',nv:null,log:[]};
const ICOPTS=['fa-tag','fa-question-circle','fa-file-text-o','fa-truck','fa-credit-card','fa-gift','fa-star','fa-wrench','fa-users','fa-building','fa-envelope','fa-shield'];
const PNM={x:'Obrigatório',o:'Opcional',n:'Não pede'};

const useCount=(a,s)=>PROTOS.filter(p=>p.as===a&&(s===undefined||p.sub===s)).length;
function admLog(t){AQ.log.unshift([now(),t]);}

function renderAdm(){const all=Object.keys(AS),on=asOn();
 const subTot=all.reduce((n,a)=>n+subsOn(a).filter(x=>x[0]!=='Outro').length,0),offN=all.filter(a=>AS[a].off).length+all.reduce((n,a)=>n+AS[a].s.filter(x=>x.off).length,0);
 if(!AS[AQ.sel])AQ.sel=all[0];
 const q=nrm(AQ.q.trim());
 const list=all.filter(a=>(AQ.f==='all'||(AQ.f==='on'?!AS[a].off:AS[a].off))&&(!q||nrm(a).includes(q)||AS[a].s.some(x=>nrm(x[0]).includes(q)))).sort((a,b)=>a.localeCompare(b));
 let h=`<div class="card adm-top"><h2><i class="fa fa-sliders"></i> Assuntos e tópicos</h2><span class="soft adm-desc">Ativo aparece no Novo atendimento na hora; inativo some da escolha, mas os protocolos antigos não mudam.</span>
  <div class="adm-kpis"><span><b>${on.length}</b> assuntos ativos</span><span><b>${subTot}</b> tópicos ativos</span><span><b>${offN}</b> inativos</span></div></div>`;
 h+=`<div class="adm-grid"><div class="card adm-list"><div class="adm-lh"><div class="hsearch adm-q"><i class="fa fa-search"></i><input type="search" id="aq" placeholder="Buscar assunto ou tópico…" value="${esc(AQ.q)}" autocomplete="off" aria-label="Buscar assunto ou tópico"></div>
   <div class="choice adm-f">${[['all','Todos'],['on','Ativos'],['off','Inativos']].map(([k,l])=>`<button type="button" data-af="${k}" aria-pressed="${AQ.f===k}">${l}</button>`).join('')}</div>
   <button type="button" class="gbtn sm" data-newas=""><i class="fa fa-plus"></i> Novo assunto</button></div>
  <ul class="adm-ul" role="listbox" aria-label="Assuntos">${list.map(a=>{const x=AS[a],n=subsOn(a).filter(s=>s[0]!=='Outro').length;
   return `<li role="option" tabindex="0" aria-selected="${a===AQ.sel}" data-asel="${esc(a)}" class="${a===AQ.sel?'sel':''} ${x.off?'off':''}">${asIc(a)}<div class="al-t"><b>${esc(a)}</b><span>${n} tópico${n!==1?'s':''} · pedido ${PNM[x.p].toLowerCase()}${x.novo?' · <em class="newb">novo</em>':''}</span></div><span class="al-st ${x.off?'off':'on'}">${x.off?'Inativo':'Ativo'}</span></li>`}).join('')||'<li class="adm-empty">Nada encontrado.</li>'}</ul></div>
  <div class="adm-det">${AQ.nv!==null?newAsHTML():detHTML(AQ.sel)}</div></div>`;
 if(AQ.log.length)h+=`<div class="card adm-log"><div class="adm-st"><i class="fa fa-history"></i> Alterações feitas agora</div><ul>${AQ.log.slice(0,8).map(([d,t])=>`<li><span>${d.slice(11)}</span> ${t}</li>`).join('')}</ul></div>`;
 app.innerHTML=h;bindAdm()}

function detHTML(a){const x=AS[a],subs=x.s,u=useCount(a);
 return `<div class="card adm-card"><div class="ad-h">${asIc(a)}<div><h3>${esc(a)}</h3><span class="soft">${u} protocolo${u!==1?'s':''} usam este assunto${x.novo?' · criado agora':''}</span></div>
   ${isOutAs(a)?'<span class="pill grey">Sistema</span>':`<label class="sw" title="${x.off?'Ativar':'Inativar'} o assunto"><input type="checkbox" data-aon ${x.off?'':'checked'}><span></span><b>${x.off?'Inativo':'Ativo'}</b></label>`}</div>
  ${x.off?`<div class="hint amber"><i class="fa fa-eye-slash"></i><span>Inativo: não aparece no Novo atendimento. ${u?`Os ${u} protocolo${u>1?'s':''} que já usam este assunto não mudam.`:'Nenhum protocolo usa este assunto.'}</span></div>`:''}
  <div class="ad-row"><span class="ad-l">Pede pedido?</span><div class="choice">${['x','o','n'].map(k=>`<button type="button" data-ap="${k}" aria-pressed="${x.p===k}" ${isOutAs(a)?'disabled':''}>${PNM[k]}</button>`).join('')}</div></div>
  <div class="ad-sub"><div class="ad-sh"><b>Tópicos (sub-assuntos)</b><span class="soft">${subsOn(a).length-1} ativos de ${subs.length-1}</span></div>
   <table class="tb ad-tb"><thead><tr><th>Tópico</th><th>Quem resolve</th><th>Esqueleto</th><th>Uso</th><th>Situação</th></tr></thead><tbody>
   ${subs.map((s,i)=>{const sys=s[0]==='Outro',n=useCount(a,s[0]),ed=AQ.ske&&AQ.ske.as===a&&AQ.ske.sub===s[0];return `<tr class="${s.off?'off':''}${ed?' sked':''}"><td><span class="ad-sn"><i class="fa ${sys?'fa-pencil-square-o':subIc(s[0])}"></i> ${esc(s[0])}${s.novo?' <em class="newb">novo</em>':''}</span>${sys?'<small class="soft">obriga o atendente a escrever qual é</small>':''}</td>
    <td>${sys?'<span class="soft">definido no registro</span>':`<div class="choice sm">${[['v','Atendimento'],['r','Pós-Venda']].map(([k,l])=>`<button type="button" data-sr="${i}|${k}" aria-pressed="${s[1]===k}" ${s.off?'disabled':''}>${l}</button>`).join('')}</div>`}</td>
    <td>${skBtn(a,s[0],i)}</td><td>${n}</td><td>${sys?'<span class="pill grey">Sempre ativo</span>':`<label class="sw sm"><input type="checkbox" data-son="${i}" ${s.off?'':'checked'}><span></span><b>${s.off?'Inativo':'Ativo'}</b></label>`}</td></tr>${ed?`<tr class="ske-row"><td colspan="5">${skEdHTML()}</td></tr>`:''}`}).join('')}</tbody></table>
   ${isOutAs(a)?'<div class="hint"><i class="fa fa-info-circle"></i><span>"Outros" é do sistema: serve para o atendente escrever um assunto que ainda não existe. O que ele escreve fica no protocolo.</span></div>':`<form class="ad-add" id="adsub" novalidate><input id="adsn" placeholder="Novo tópico de ${esc(a)}… ex.: Entregue em outro endereço" maxlength="60" autocomplete="off" aria-label="Nome do novo tópico"><div class="choice sm">${[['v','Resolve no atendimento'],['r','Pós-Venda']].map(([k,l],j)=>`<button type="button" data-nr="${k}" aria-pressed="${j===1}">${l}</button>`).join('')}</div><button type="submit" class="gbtn sm"><i class="fa fa-plus"></i> Adicionar tópico</button></form>`}
  </div>
 </div>`}

function newAsHTML(){const v=AQ.nv;
 return `<div class="card adm-card"><div class="ad-h"><span class="asic" style="background:${ASC[v.p]}"><i class="fa ${v.ic}"></i></span><div><h3>Novo assunto</h3><span class="soft">Fica ativo na hora e aparece para o atendente.</span></div><button type="button" class="lbtn sm" id="nvx" style="margin-left:auto">Cancelar</button></div>
  <form id="nvf" class="ad-form" novalidate>
   <label class="f2"><span>Nome do assunto <span class="req">*</span></span><input id="nvn" value="${esc(v.n)}" maxlength="50" autocomplete="off" placeholder="Ex.: Nota fiscal de serviço"></label>
   <div class="f2"><span>Pede pedido?</span><div class="choice">${['x','o','n'].map(k=>`<button type="button" data-nvp="${k}" aria-pressed="${v.p===k}">${PNM[k]}</button>`).join('')}</div></div>
   <div class="f2"><span>Ícone</span><div class="icpick">${ICOPTS.map(i=>`<button type="button" data-nvi="${i}" aria-pressed="${v.ic===i}" aria-label="${i}"><i class="fa ${i}"></i></button>`).join('')}</div></div>
   <div class="f2"><span>Primeiros tópicos <span class="req">*</span> <span class="soft" style="font-weight:400">· um por linha (dá para adicionar mais depois). "Outro" entra sozinho.</span></span><textarea id="nvs" rows="4" placeholder="Ex.:&#10;Nota com CNPJ errado&#10;Pedido de 2ª via">${esc(v.s)}</textarea></div>
   ${v.err?`<div class="err"><i class="fa fa-exclamation-circle"></i> ${v.err}</div>`:''}
   <div><button type="submit" class="gbtn"><i class="fa fa-check"></i> Criar assunto</button></div></form></div>`}

function bindAdm(){bindCommon();
 const aq=$('aq');aq.oninput=()=>{AQ.q=aq.value;const pos=aq.selectionStart;renderAdm();const n=$('aq');n.focus();n.setSelectionRange(pos,pos)};
 app.querySelectorAll('[data-af]').forEach(b=>b.onclick=()=>{AQ.f=b.dataset.af;renderAdm()});
 app.querySelectorAll('[data-asel]').forEach(li=>{li.onclick=()=>{AQ.sel=li.dataset.asel;AQ.nv=null;AQ.ske=null;renderAdm();if(innerWidth<=1000)$('app').querySelector('.adm-det').scrollIntoView({behavior:'smooth'})};li.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();li.click()}}});
 app.querySelectorAll('[data-newas]').forEach(b=>b.onclick=()=>{AQ.nv={n:b.dataset.newas||'',p:'o',ic:'fa-tag',s:'',err:''};renderAdm();setTimeout(()=>$('nvn')?.focus(),20)});
 const a=AQ.sel,x=AS[a];bindSkEd(a);
 const on=app.querySelector('[data-aon]');on&&(on.onchange=()=>{x.off=!on.checked;admLog(`${x.off?'Inativou':'Ativou'} o assunto <b>${esc(a)}</b>`);toast(x.off?'Assunto inativado: não aparece mais no Novo atendimento':'Assunto ativado');renderAdm()});
 app.querySelectorAll('[data-ap]').forEach(b=>b.onclick=()=>{if(x.p===b.dataset.ap)return;x.p=b.dataset.ap;admLog(`<b>${esc(a)}</b>: pedido agora é ${PNM[x.p].toLowerCase()}`);renderAdm()});
 app.querySelectorAll('[data-son]').forEach(c=>c.onchange=()=>{const s=x.s[+c.dataset.son];s.off=!c.checked;admLog(`${s.off?'Inativou':'Ativou'} o tópico <b>${esc(s[0])}</b> em ${esc(a)}`);renderAdm()});
 app.querySelectorAll('[data-sr]').forEach(b=>b.onclick=()=>{const [i,k]=b.dataset.sr.split('|'),s=x.s[+i];if(s[1]===k)return;s[1]=k;admLog(`<b>${esc(s[0])}</b> (${esc(a)}) agora ${k==='r'?'vai para o Pós-Venda':'resolve no atendimento'}`);renderAdm()});
 let nr='r';app.querySelectorAll('[data-nr]').forEach(b=>b.onclick=()=>{nr=b.dataset.nr;app.querySelectorAll('[data-nr]').forEach(o=>o.setAttribute('aria-pressed',o===b))});
 const addSub=(t,k)=>{t=t.trim().replace(/\s+/g,' ');if(t.length<3){toast('Escreva o nome do tópico (pelo menos 3 letras)');return false}
  if(/^outros?$/i.test(t)){toast('"Outro" já existe e é do sistema');return false}
  if(x.s.some(s=>nrm(s[0])===nrm(t))){toast('Esse tópico já existe em '+a);return false}
  const e=[t.charAt(0).toUpperCase()+t.slice(1),k];e.novo=true;x.s.splice(x.s.length-1,0,e);admLog(`Adicionou o tópico <b>${esc(e[0])}</b> em ${esc(a)}`);toast('Tópico adicionado: já aparece no Novo atendimento');renderAdm();return true};
 const f=$('adsub');f&&(f.onsubmit=e=>{e.preventDefault();addSub($('adsn').value,nr)});
 // novo assunto
 const nv=AQ.nv;if(!nv)return;
 $('nvx').onclick=()=>{AQ.nv=null;renderAdm()};
 const keep=()=>{nv.n=$('nvn').value;nv.s=$('nvs').value};
 app.querySelectorAll('[data-nvp]').forEach(b=>b.onclick=()=>{keep();nv.p=b.dataset.nvp;renderAdm()});
 app.querySelectorAll('[data-nvi]').forEach(b=>b.onclick=()=>{keep();nv.ic=b.dataset.nvi;renderAdm()});
 $('nvf').onsubmit=e=>{e.preventDefault();keep();const n=nv.n.trim().replace(/\s+/g,' '),subs=[...new Set(nv.s.split('\n').map(t=>t.trim().replace(/\s+/g,' ')).filter(t=>t.length>=3&&!/^outros?$/i.test(t)))];
  nv.err=n.length<3?'Escreva o nome do assunto (pelo menos 3 letras).':/^outros?$/i.test(n)?'"Outros" já existe e é do sistema.':Object.keys(AS).some(k=>nrm(k)===nrm(n))?'Já existe um assunto com esse nome.':!subs.length?'Coloque pelo menos um tópico.':'';
  if(nv.err){renderAdm();return}
  const nm=n.charAt(0).toUpperCase()+n.slice(1);AS[nm]={p:nv.p,s:subs.map(t=>{const e=[t.charAt(0).toUpperCase()+t.slice(1),'r'];e.novo=true;return e}),novo:true};AS[nm].s.push(['Outro','v']);ASI[nm]=nv.ic;
  admLog(`Criou o assunto <b>${esc(nm)}</b> com ${subs.length} tópico${subs.length>1?'s':''}`);AQ.sel=nm;AQ.nv=null;AQ.f='all';toast('Assunto criado: já aparece no Novo atendimento');renderAdm()}}
$('nav-adm').onclick=e=>{e.preventDefault();go('adm')};
