/* Casos especiais pedidos pelo SACK (documento "SISTEMA ERP", nov/2026):
   · Troca de volume / Falta de volume: o sistema mostra os volumes do pedido e os itens de cada um; o atendente marca quais.
   · Devolução: motivos da devolução (os mesmos do SACK atual) e os itens que o cliente quer devolver, com quantidade.
   · Cancelamento (Exceção): sem sub-assunto; só cancela pedido sem nota fiscal e o motivo fica registrado junto.
   · Abatimento: sem sub-assunto; só entra num protocolo já aberto (ação "Abatimento" no protocolo). */

/* ---------- volumes e itens de cada volume ---------- */
const VOL_SUBS={'Troca de volume':'vieram trocados','Falta de volume':'faltaram'};
const needVol=()=>N&&N.ped&&N.as==='Consulta de Pedido'&&!!VOL_SUBS[N.sub];
function volList(o,ped){return volumesDoPedido(o,ped).map(v=>({cod:v.cod,lab:v.lab||v.semCod,itens:v.itens}))}
const itTxt=it=>`${it[2]?it[2]+'× ':''}${esc(it[1])}${it[0]?` <span class="soft">· cód. ${it[0]}</span>`:''}`;
function volPickHTML(){const o=ORDERS[N.ped],L=volList(o,N.ped),sel=N.vsel||[];
 return `<fieldset class="xcase vpick"><legend><i class="fa fa-cubes"></i> Quais volumes ${VOL_SUBS[N.sub]}? <span class="req">*</span></legend>
  <p class="soft xc-h">O pedido tem ${L.length} volume${L.length>1?'s':''}. Marque ${L.length>1?'os que o cliente informou':'o volume'}. Abra o volume para ver os produtos que estão nele.</p>
  <div class="vp-l">${L.length>1?`<button type="button" class="lnk sm2 vacc-all" data-vaccall>Abrir todos os volumes</button>`:''}${L.map((v,i)=>`<div class="vp-r${sel.includes(i)?' on':''}"><input type="checkbox" data-vsel="${i}" id="vsel${i}" ${sel.includes(i)?'checked':''} aria-label="Marcar o volume ${esc(v.cod||'sem número '+(i+1))}">${volAcc({cod:v.cod,lab:v.lab,semCod:'Volume '+(i+1),itens:v.itens},L.length<=2)}</div>`).join('')}</div></fieldset>`}
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
  <tbody>${o.itens.map(([c,d,q,v])=>{const on=D.it[c]!=null,qq=on?D.it[c]:q;return `<tr class="${on?'on':''}"><td class="ck"><input type="checkbox" data-dit="${c}" ${on?'checked':''} aria-label="Devolver ${esc(d)}"></td><td>${c}</td><td><div class="dprod">${prodImg(c)}<span>${esc(d)}</span></div></td>
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

/* ---------- campos extras por assunto (CAMPOS em dados/assuntos.js) ---------- */
function camposFor(as,sub){return (CAMPOS[as]||[]).filter(c=>!c.subs||c.subs.includes(sub))}
function campoVal(c){const v=(N.cxv||{})[c.k];if(v!=null)return v;const o=N.ped?ORDERS[N.ped]:null,cl=N.cli?CLIENTES[N.cli]:N.cliNovo;
 return c.pre==='nf'?(o&&o.nf&&o.nf!=='—'?o.nf:''):c.pre==='doc'?(cl&&cl.doc||''):''}
function camposHTML(){const L=camposFor(N.as,N.sub);if(!L.length)return '';
 return `<fieldset class="xcase xcampos"><legend><i class="fa fa-pencil-square-o"></i> Dados para o registro</legend>
  <div class="xc-g">${L.map(c=>`<label class="f2${c.ta?' w':''}"><span>${c.l} <span class="req">*</span>${c.pre?' <span class="soft" style="font-weight:400">· já preenchido</span>':''}</span>${c.ta?`<textarea data-cxv="${c.k}" rows="2" placeholder="${esc(c.ph||'')}">${esc(campoVal(c))}</textarea>`:`<input type="text" data-cxv="${c.k}" value="${esc(campoVal(c))}" autocomplete="off">`}</label>`).join('')}</div></fieldset>`}
function camposFaltando(){return camposFor(N.as,N.sub).filter(c=>!String(campoVal(c)).trim()).map(c=>c.l.toLowerCase())}
function camposResumo(){return camposFor(N.as,N.sub).map(c=>`<div><b>${c.l}:</b> ${esc(String(campoVal(c)).trim())}</div>`).join('')}
document.addEventListener('input',e=>{const t=e.target;if(!N||!t.matches('[data-cxv]'))return;(N.cxv=N.cxv||{})[t.dataset.cxv]=t.value});
