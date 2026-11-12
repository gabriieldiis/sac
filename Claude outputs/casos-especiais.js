/* Casos especiais pedidos pelo SACK (documento "SISTEMA ERP", nov/2026):
   · Troca de volume / Falta de volume: o sistema mostra os volumes do pedido e os itens de cada um; o atendente marca quais.
   · Devolução: motivos da devolução (os mesmos do SACK atual) e os itens que o cliente quer devolver, com quantidade.
   · Cancelamento (Exceção): sem sub-assunto; só cancela pedido sem nota fiscal e o motivo fica registrado junto.
   · Abatimento: sem sub-assunto; só entra num protocolo já aberto (ação "Abatimento" no protocolo). */

/* ---------- volumes e itens de cada volume ---------- */
const VOL_SUBS={'Troca de volume':'vieram trocados','Falta de volume':'faltaram'};
const needVol=()=>N&&N.ped&&N.as==='Consulta de Pedido'&&!!VOL_SUBS[N.sub];
function volList(o,ped){if(o.volItens)return o.volItens;
 if(VOLS[ped])return VOLS[ped].map(v=>({cod:v[0],lab:VST[v[1]]?VST[v[1]][0]:'',itens:[[null,v[3],null]]}));
 const vs=volsOf(o,ped);
 if(vs.length>1&&vs.length===o.itens.length)return vs.map((v,i)=>({cod:v[0],lab:v[1],itens:[o.itens[i]]}));
 if(vs.length)return vs.map((v,i)=>({cod:v[0],lab:v[1],itens:i===0?o.itens:[]}));
 return [{cod:'',lab:'nº do volume não informado',itens:o.itens}]}
const itTxt=it=>`${it[2]?it[2]+'× ':''}${esc(it[1])}${it[0]?` <span class="soft">· cód. ${it[0]}</span>`:''}`;
function volPickHTML(){const o=ORDERS[N.ped],L=volList(o,N.ped),sel=N.vsel||[];
 return `<fieldset class="xcase vpick"><legend><i class="fa fa-cubes"></i> Quais volumes ${VOL_SUBS[N.sub]}? <span class="req">*</span></legend>
  <p class="soft xc-h">O pedido tem ${L.length} volume${L.length>1?'s':''}. Marque ${L.length>1?'os que o cliente informou':'o volume'}: os itens de cada volume aparecem ao lado.</p>
  <div class="vp-l">${L.map((v,i)=>`<label class="vp-r${sel.includes(i)?' on':''}"><input type="checkbox" data-vsel="${i}" ${sel.includes(i)?'checked':''}>
   <span class="vp-c"><b>${v.cod?esc(v.cod):'Volume '+(i+1)}</b>${v.lab?`<small>${esc(v.lab)}</small>`:''}</span>
   <span class="vp-i">${v.itens.length?v.itens.map(itTxt).join('<br>'):'<span class="soft">itens não informados</span>'}</span></label>`).join('')}</div></fieldset>`}
function volResumo(){const o=ORDERS[N.ped],L=volList(o,N.ped),S2=(N.vsel||[]).map(i=>L[i]);
 return `<div><b>Volumes que ${VOL_SUBS[N.sub]}:</b> ${S2.map(v=>`${v.cod||'volume sem nº'} (${v.itens.map(it=>txtOf(itTxt(it))).join(', ')||'itens não informados'})`).join('; ')}</div>`}

/* ---------- devolução: motivos e itens ---------- */
const DEV_MOT=['Não condiz com a foto','Não atende minhas necessidades','Produto com defeito','Itens errados','Etiqueta errada','Erro na compra','Baixa qualidade','Embalagem violada'];
const needDev=()=>N&&N.ped&&N.as==='Devolução'&&!!N.sub;
function devState(){if(!N.dev)N.dev={mot:[],it:{}};return N.dev}
function devTotal(){const o=ORDERS[N.ped],D=devState();return o.itens.reduce((a,[c,,q,v])=>a+(D.it[c]!=null?Math.min(q,D.it[c])*v:0),0)}
function devHTML(){const o=ORDERS[N.ped],D=devState();
 return `<fieldset class="xcase dmot"><legend><i class="fa fa-list-ul"></i> Motivo da devolução <span class="req">*</span></legend>
  <div class="dm-g">${DEV_MOT.map((m,i)=>`<label class="chk"><input type="checkbox" data-dmot="${i}" ${D.mot.includes(m)?'checked':''}> ${m}</label>`).join('')}</div></fieldset>
  <fieldset class="xcase dit"><legend><i class="fa fa-cube"></i> Itens que o cliente quer devolver <span class="req">*</span></legend>
  <div class="scroll"><table class="dtab"><thead><tr><th class="ck"><input type="checkbox" data-dall aria-label="Marcar todos os itens" ${o.itens.every(it=>D.it[it[0]]!=null)?'checked':''}></th><th>Código</th><th>Descrição</th><th class="n">Qtd. a devolver</th><th class="n">Unit.</th><th class="n">Total</th></tr></thead>
  <tbody>${o.itens.map(([c,d,q,v])=>{const on=D.it[c]!=null,qq=on?D.it[c]:q;return `<tr class="${on?'on':''}"><td class="ck"><input type="checkbox" data-dit="${c}" ${on?'checked':''} aria-label="Devolver ${esc(d)}"></td><td>${c}</td><td>${esc(d)}</td>
   <td class="n"><input type="number" min="1" max="${q}" value="${qq}" data-dq="${c}" ${on?'':'disabled'} aria-label="Quantidade a devolver de ${esc(d)}"> <span class="soft">de ${q}</span></td><td class="n">${money(v)}</td><td class="n" data-dtot="${c}">${on?money(qq*v):'—'}</td></tr>`}).join('')}</tbody>
  <tfoot><tr><td colspan="5" class="n">Total da devolução</td><td class="n"><b id="dtotal">${money(devTotal())}</b></td></tr></tfoot></table></div></fieldset>`}
function devResumo(){const o=ORDERS[N.ped],D=devState(),it=o.itens.filter(i=>D.it[i[0]]!=null);
 return `<div><b>Motivo da devolução:</b> ${D.mot.map(esc).join(', ')}</div><div><b>Itens a devolver:</b> ${it.map(([c,d,q,v])=>`${Math.min(q,D.it[c])}× ${esc(d)} (cód. ${c})`).join('; ')} · <b>Total ${money(devTotal())}</b></div>`}
function devRefresh(){const o=ORDERS[N.ped],D=devState();o.itens.forEach(([c,,q,v])=>{const td=document.querySelector(`[data-dtot="${c}"]`);if(td)td.textContent=D.it[c]!=null?money(Math.min(q,D.it[c])*v):'—'});const t=$('dtotal');if(t)t.textContent=money(devTotal())}

/* ---------- cancelamento (exceção): só pedido sem nota ---------- */
const isCancEx=()=>N&&N.as==='Cancelamento (Exceção)';
function cancBlock(o){if(!o)return '';if(o.cancel)return `Este pedido já foi cancelado em ${esc(o.cancel)}.`;
 if(o.nf&&o.nf!=='—')return `Este pedido já tem nota fiscal (NF ${esc(o.nf)}). O Cancelamento (Exceção) só cancela pedido sem nota: para pedido faturado, use Cancelamento Site ou Devolução.`;return ''}
function cancelaPedido(o){o.cancel=fmtD(TODAY).slice(0,5);o.stt='Cancelado';o.pill=['grey','Cancelado'];o.say=`Cancelado em ${o.cancel} pelo SAC (exceção).`;
 if(o.steps)o.steps=o.steps.filter(s=>s[1]).concat([['Cancelado',o.cancel+' '+new Date().toTimeString().slice(0,5)]])}

/* ---------- eventos dos blocos (sem redesenhar a tela, para não perder o texto digitado) ---------- */
document.addEventListener('change',e=>{const t=e.target;if(!N)return;
 if(t.matches('[data-vsel]')){const i=+t.dataset.vsel,s=new Set(N.vsel||[]);t.checked?s.add(i):s.delete(i);N.vsel=[...s].sort();t.closest('.vp-r').classList.toggle('on',t.checked);return}
 if(t.matches('[data-dmot]')){const D=devState(),m=DEV_MOT[+t.dataset.dmot];D.mot=t.checked?[...new Set([...D.mot,m])]:D.mot.filter(x=>x!==m);D.mot.sort((a,b)=>DEV_MOT.indexOf(a)-DEV_MOT.indexOf(b));return}
 if(t.matches('[data-dit]')){const D=devState(),c=t.dataset.dit,o=ORDERS[N.ped],q=o.itens.find(i=>i[0]===c)[2],inp=document.querySelector(`[data-dq="${c}"]`);if(t.checked)D.it[c]=Math.min(q,Math.max(1,+inp.value||q));else delete D.it[c];inp.disabled=!t.checked;t.closest('tr').classList.toggle('on',t.checked);
  const all=document.querySelector('[data-dall]');if(all)all.checked=o.itens.every(i=>D.it[i[0]]!=null);devRefresh();return}
 if(t.matches('[data-dall]')){const D=devState(),o=ORDERS[N.ped];o.itens.forEach(([c,,q])=>{const cb=document.querySelector(`[data-dit="${c}"]`),inp=document.querySelector(`[data-dq="${c}"]`);if(t.checked)D.it[c]=Math.min(q,Math.max(1,+inp.value||q));else delete D.it[c];cb.checked=t.checked;inp.disabled=!t.checked;cb.closest('tr').classList.toggle('on',t.checked)});devRefresh()}});
document.addEventListener('input',e=>{const t=e.target;if(!N||!t.matches('[data-dq]'))return;const D=devState(),c=t.dataset.dq,q=+t.max;let v=Math.round(+t.value||0);if(v>q){v=q;t.value=q}if(D.it[c]!=null){D.it[c]=Math.max(1,v);devRefresh()}});
