/* Tela inicial: novo atendimento, pesquisa única e movimentados por último. */
/* ================= início ================= */
/* busca única: protocolo, pedido, Kommerce, NF, CPF/CNPJ, nome, e-mail ou telefone */
function novoCardHTML(){const k=S.keep&&(S.keep.cli||S.keep.cliNovo)?(S.keep.cli?CLIENTES[S.keep.cli]:S.keep.cliNovo):null;
 return `<section class="card novohero" aria-labelledby="nvt"><div class="nvh"><span class="nvi"><i class="fa fa-plus"></i></span><div><h2 id="nvt">Novo atendimento</h2><p>Digite ou escolha o assunto para começar.</p></div></div>
  ${k?`<div class="hint"><i class="fa fa-user"></i><span>Cliente <b>${esc(k.nome)}</b> já vem preenchido. <button type="button" class="lnk" id="nokeep">Outro cliente</button></span></div>`:''}
  ${comboHTML('cbas','Digite ou escolha o assunto… ex.: estorno, garantia, atraso')}</section>`}
function bindNovoCard(rr){bindCombo('cbas',asOn(),(a,sub)=>{N_SUBPRE=sub||'';startNovo(a)});$('nokeep')&&($('nokeep').onclick=()=>{S.keep=null;rr()})}
function renderHome(){if(MODE==='pv')return renderFila();
 app.innerHTML=`<div class="sackhome">${novoCardHTML()}
  <div class="card sbig"><h2><i class="fa fa-folder-open-o" style="color:var(--head)"></i> Pesquisar atendimento</h2>
   ${searchBodyHTML()}</div>${recentHTML()}</div>`;
 app.querySelectorAll('[data-as]').forEach(b=>b.onclick=()=>{N_SUBPRE='';startNovo(b.dataset.as)});
 bindNovoCard(renderHome);bindCommon();bindSearch(renderHome)}
function recentHTML(){const k=p=>{const t=p.tram[p.tram.length-1]?.[0]||p.ab,[a,b]=t.split(' '),[d,m,y]=a.split('/');return y+m+d+(b||'')};
 const L=PROTOS.slice().sort((a,b)=>k(b).localeCompare(k(a))).slice(0,6);if(!L.length)return '';
 return `<div class="card sbig rcnt"><h2><i class="fa fa-history" style="color:var(--head)"></i> Movimentados por último</h2><p class="soft rcnt-s">Os protocolos com registro mais recente. Clique para abrir.</p>
  <div class="rcl">${L.map(p=>{const c=cliOf(p),l=p.tram[p.tram.length-1];return `<button type="button" class="rci" data-open="${p.num}">${asIc(p.as)}<span class="rct"><b>${esc(asTxt(p))}</b><span>${esc(c?.nome||'')}</span></span><span class="rcm"><span class="rcn">${p.num}</span>${stPill(p)}<small>${esc((l?.[0]||p.ab).slice(0,5))}</small></span></button>`}).join('')}</div></div>`}
function protosByDoc(d){const c=cliByDoc(d);return PROTOS.filter(p=>c?p.cli===c:digits(p.cliNovo?.doc)===d)}
const normT=v=>String(v||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
const SKIND={proto:['fa-file-text-o','Protocolo'],ped:['fa-shopping-cart','Pedido'],kom:['fa-shopping-bag','Pedido Kommerce'],nf:['fa-file-o','Nota fiscal'],doc:['fa-id-card-o','CPF/CNPJ'],nome:['fa-user','Cliente'],email:['fa-envelope-o','E-mail'],tel:['fa-phone','Telefone']};
function buscaTudo(q){const d=digits(q),t=normT(q),R=[],seen=new Set();
 const add=(k,key,tit,sub,fn,exact=1)=>{if(seen.has(key))return;seen.add(key);R.push({k,tit,sub,fn,exact})};
 const cliR=(k,ck,how,exact)=>{const c=CLIENTES[ck],n=protosByDoc(digits(c.doc)).length;add(k,'c'+ck,c.nome,`${c.doc.length>14?'CNPJ':'CPF'} ${c.doc} · ${n} protocolo${n!==1?'s':''}${how?' · '+how:''}`,()=>go('cli',{doc:digits(c.doc)}),exact)};
 const pedR=(k,n,how,exact)=>{const o=ORDERS[n],c=CLIENTES[o.cli],np=protosOf(n).length;add(k,'o'+n,`Pedido #${n}`,`${c?esc(c.nome)+' · ':''}${np} protocolo${np!==1?'s':''}${how?' · '+how:''}`,()=>go('cli',{ped:n}),exact)};
 const proR=(p,exact)=>{const c=cliOf(p);add('proto','p'+p.num,`Protocolo ${p.num}`,`${esc(asTxt(p))}${c?' · '+esc(c.nome):''} · ${p.status}`,()=>go('proto',{p:p.num}),exact)};
 if(d){PROTOS.filter(p=>p.num===d).forEach(p=>proR(p,1));
  Object.keys(ORDERS).forEach(n=>{const o=ORDERS[n];if(n===d)pedR('ped',n,'',1);if(o.kom&&digits(o.kom)===d)pedR('kom',n,'Kommerce '+o.kom,1);if(o.nf&&digits(o.nf)===d)pedR('nf',n,'NF '+o.nf,1)});
  Object.keys(CLIENTES).forEach(k=>{const c=CLIENTES[k];if(digits(c.doc)===d)cliR('doc',k,'',1);else if(d.length>=8&&digits(c.tel).endsWith(d))cliR('tel',k,c.tel,1)});
  PROTOS.filter(p=>!p.cli&&p.cliNovo&&digits(p.cliNovo.doc)===d).slice(0,1).forEach(p=>add('doc','n'+d,p.cliNovo.nome,`${p.cliNovo.doc} · cliente sem cadastro`,()=>go('cli',{doc:d})));
  if(!R.length&&d.length>=4){/* número parcial */
   PROTOS.filter(p=>p.num.includes(d)).slice(0,5).forEach(p=>proR(p,0));
   Object.keys(ORDERS).filter(n=>n.includes(d)||digits(ORDERS[n].kom).includes(d)||digits(ORDERS[n].nf).includes(d)).slice(0,5).forEach(n=>pedR('ped',n,'',0));
   Object.keys(CLIENTES).filter(k=>digits(CLIENTES[k].doc).includes(d)||digits(CLIENTES[k].tel).includes(d)).slice(0,5).forEach(k=>cliR('doc',k,'',0))}}
 if(/[a-z]/.test(t)&&t.length>=3){
  Object.keys(CLIENTES).forEach(k=>{const c=CLIENTES[k];if(normT(c.nome).includes(t))cliR('nome',k,'',normT(c.nome)===t?1:0);else if(c.email&&normT(c.email).includes(t))cliR('email',k,c.email,normT(c.email)===t?1:0)});
  PROTOS.filter(p=>!p.cli&&p.cliNovo&&normT(p.cliNovo.nome).includes(t)).forEach(p=>add('nome','n'+digits(p.cliNovo.doc),p.cliNovo.nome,`${p.cliNovo.doc} · cliente sem cadastro`,()=>go('cli',{doc:digits(p.cliNovo.doc)}),0))}
 return R}
function pesquisar(){const q=(HQ.q||'').trim();HQ.res=null;HQ.msg='';
 if(!q){HQ.msg='Digite algum dado para pesquisar: protocolo, pedido, CPF/CNPJ, nome…';return false}
 if(!digits(q)&&normT(q).length<3){HQ.msg='Digite pelo menos 3 letras do nome.';return false}
 const R=buscaTudo(q);
 if(R.length===1){HQ.q='';R[0].fn();return true}
 if(!R.length){HQ.msg=`Nada encontrado para <b>${esc(q)}</b>. Confira o número ou tente outro dado (protocolo, pedido, Kommerce, NF, CPF/CNPJ, nome, e-mail ou telefone).`;return false}
 HQ.res=R;return false}
function searchBodyHTML(){const R=HQ.res;
 return `<form id="pform"><input id="pq" value="${esc(HQ.q||'')}" placeholder="Protocolo, pedido, Kommerce, nota fiscal, CPF/CNPJ, nome, e-mail ou telefone" aria-label="Pesquisar atendimento" autocomplete="off"><button type="submit" class="gbtn blue"><i class="fa fa-search"></i> Pesquisar</button></form>
  <p class="soft shint">Digite qualquer dado. O sistema identifica sozinho se é protocolo, pedido, CPF/CNPJ ou cliente. Atalho: tecla <kbd>/</kbd></p>
  ${HQ.msg?`<div class="err">${HQ.msg}</div>`:''}
  ${R?`<div class="sres"><div class="sreshd"><b>${R.length} resultado${R.length>1?'s':''}</b> para “${esc(HQ.q)}”${R.some(r=>!r.exact)?' · correspondência parcial':''} · escolha um</div>${R.map((r,i)=>`<button type="button" class="sritem" data-sr="${i}"><span class="srico"><i class="fa ${SKIND[r.k][0]}"></i></span><span class="srtx"><b>${esc(r.tit)}</b><span>${r.sub}</span></span><span class="srk">${SKIND[r.k][1]}</span><i class="fa fa-angle-right srgo"></i></button>`).join('')}</div>`:''}`}
function bindSearch(rr){const pq=$('pq');if(!pq)return;
 pq.oninput=e=>{HQ.q=e.target.value};
 $('pform').onsubmit=e=>{e.preventDefault();if(pesquisar())return;rr();$('pq')?.focus()};
 app.querySelectorAll('[data-sr]').forEach(b=>b.onclick=()=>{const r=HQ.res[+b.dataset.sr];HQ.q='';HQ.res=null;r.fn()})}
