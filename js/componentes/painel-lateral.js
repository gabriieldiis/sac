/* Painel lateral "Cliente e pedido" (modo Dividido). */
/* ================= painel lateral "Cliente e pedido" (cada dado aparece uma vez) ================= */
function kv(l,v,x,cls){return `<div class="kv${cls?' '+cls:''}"><span>${l}</span><b>${v}</b>${x?`<em>${x}</em>`:''}</div>`}
function cliBlockHTML(c,o){o=o||{};const isCnpj=digits(c.doc).length===14;
 return `<section class="op-sec"><div class="op-t"><i class="fa fa-user"></i> Cliente ${o.chg?`<button type="button" class="lnk chg" data-chg="${o.chg}">Alterar</button>`:''}</div>
  <div class="op-name">${esc(c.nome)}${o.novo?' <span class="pill blue" style="font-size:11px">novo na base</span>':''}</div>
  <div class="kvs">${kv(isCnpj?'CNPJ':'CPF',maskDoc(c.doc))}${c.tel?kv('Telefone',esc(c.tel)):''}${c.cidade?kv('Cidade',esc(c.cidade)):''}${c.email?kv('E-mail',esc(c.email),'','w'):''}</div></section>`}
function vtlHTML(o){const done=o.steps.filter(s=>s[1]),next=o.steps.filter(s=>!s[1]),inTr=o.mod!=='pick'&&!o.entregue&&!o.cancel&&done.some(s=>/transportadora|saiu/i.test(s[0]));
 const SH=l=>/pagamento/i.test(l)?'Pagamento':/^NFe/.test(l)?'Nota fiscal':/^Transportadora$/.test(l)?'Transportadora':/^Separado/.test(l)?'Separado':/^Pedido entregue/.test(l)?'Entregue':/Saiu com/i.test(l)?'Saiu com entregador':stepLbl(l);
 const n=[{ic:'fa-shopping-cart',t:'Pedido feito',d:o.data.slice(0,5),st:'ok'},...done.map(s=>({ic:stepIc(s[0]),t:SH(s[0]),full:stepLbl(s[0]),d:s[1],st:'ok'}))];
 if(o.cancel)n.push({ic:'fa-ban',t:'Cancelado',d:o.cancel,st:'x'});
 else if(o.furo)n.push({ic:'fa-exclamation-triangle',t:'Furo de estoque',d:o.furoEm,st:'x'});
 else if(o.extravio)n.push({ic:'fa-exclamation-circle',t:'Extraviado',d:o.extravio,st:'x'});
 else if(inTr)n.push({ic:'fa-map-marker',t:'Em transporte',d:'',st:'tr'});
 else if(next.length&&!o.entregue)n.push({ic:stepIc(next[0][0]),t:SH(next[0][0]),d:'aguardando',st:'nx'});
 return `<ol class="htl2" aria-label="Andamento do pedido">${n.map(x=>`<li class="${x.st}" title="${esc((x.full||x.t)+(x.d?' · '+x.d:''))}"><span class="ti"><i class="fa ${x.ic}"></i></span><b>${x.t}</b>${x.d?`<small>${esc(/^\d\d\/\d\d/.test(x.d)?x.d.slice(0,5):x.d)}</small>`:''}</li>`).join('')}</ol>${(()=>{const L=n[n.length-1];return `<div class="htl-cur ${L.st}">Etapa atual: <b>${L.t}</b>${L.d?' · '+esc(L.d):''}</div>`})()}`}
function deliveryBoxHTML(o,ped){const u=trackURL(o),v=VOL[ped];
 if(o.aviso)return `<div class="dbox ${o.aviso[0]}"><i class="fa ${o.aviso[1]}"></i><div><b>${o.aviso[2]}</b><span>${o.aviso[3]}</span></div></div>`;
 if(o.furo)return furoBoxHTML(o,ped);
 if(o.cancel)return '';/* cancelado: a etiqueta do pedido e o andamento já mostram */
 if(VOLS[ped])return volBoxHTML(o,ped);
 if(o.mod==='pick')return '';/* retirada: a loja está na modalidade e o prazo em Entrega */
 if(o.entregue)return `<div class="dbox ok"><i class="fa fa-check-circle"></i><div><b>Entregue em ${o.entregue}</b><span>${o.mod==='loja'?'Entrega da loja':'Transportadora'} ${esc(o.carrier)}</span>${u?`<div class="dbtns"><a class="lbtn sm" href="${u}" target="_blank" rel="noopener"><i class="fa fa-external-link"></i> Ver rastreio</a></div>`:''}</div></div>`;
 return trackBoxHTML(o,u,v)}
function trackBoxHTML(o,u,v,extra){const loja=o.mod==='loja';
 return `<div class="dbox track"><i class="fa fa-search"></i><div><b>${u?`Confira o rastreio da ${esc(o.carrier)}`:loja?'Confira com a loja a situação da entrega':'Confira a situação da entrega'}</b><span>O prazo e a situação atual da entrega estão ${u?'no site da transportadora':'com a loja'}. Olhe sempre antes de responder o cliente.</span>${extra||''}
  ${u||v?`<div class="dbtns">${u?`<a class="gbtn sm trk" href="${u}" target="_blank" rel="noopener"><i class="fa fa-external-link"></i> Rastrear na ${esc(o.carrier)}</a>`:''}${v?`<button type="button" class="lbtn sm" data-cpv="${v}" title="Copiar o nº do volume"><i class="fa fa-copy"></i> Volume ${v}</button>`:''}</div>`:''}</div></div>`}
function orderBlockHTML(ped,o2){o2=o2||{};const o=ORDERS[ped],E=Object.fromEntries(o.entrega),pick=o.mod==='pick',tot=o.itens.reduce((a,i)=>a+i[2]*i[3],0),fr=Math.max(0,o.total-tot);
 const op=protosOf(ped).filter(p=>isOpen(p)&&p.num!==S.p&&p.num!==o2.self);
 const end=E['Endereço']||'';
 const ent=pick?(o.retirar?kv('Retirar até',o.retirar):'')
  :kv('Endereço',esc(end),`<button type="button" class="lnk sm2" data-cpt="${esc(end)}"><i class="fa fa-copy"></i> copiar</button>`,'w')+kv('Frete',money(fr));
 const prods=o.itens.map(([c,d,q,val])=>`<li><a class="pimg sm" href="${PURL(c)}" target="_blank" rel="noopener" title="Abrir no site"><img src="${IMG(c)}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa fa-picture-o'}))"></a><div><a href="${PURL(c)}" target="_blank" rel="noopener">${esc(d)}</a><span>Cód. ${c} · ${q} × ${money(val)}</span></div><b>${money(val*q)}</b></li>`).join('');
 const oc=o.tl.filter(x=>!CARRIER_SRC.includes(x[1])).slice().reverse();
 return `<section class="op-sec op-key"><div class="op-t"><i class="fa fa-shopping-cart"></i> Pedido #${ped} ${o2.chg?`<button type="button" class="lnk chg" data-chg="${o2.chg}">Alterar</button>`:''}</div>
  ${modBar(o)}
  <div class="op-meta">${o.cancel?`<span class="pill red"><i class="fa fa-ban"></i> Cancelado em ${o.cancel}</span>`:o.furo||o.extravio||o.entregue||o.aviso?'':`<span class="pill blue">${esc(o.stt)}</span>`}<span>${[o.data,esc(o.origem),o.kom!==ped?'Kommerce '+o.kom:'',o.nf&&o.nf!=='—'?'NF '+o.nf:'NF não emitida'].filter(Boolean).join(' · ')}</span></div>
  ${op.length?`<div class="op-prot">${op.map(p=>`<button type="button" class="pill amber pbtn" data-pmodal="${p.num}"><i class="fa fa-folder-open-o"></i> Protocolo ${p.num} aberto para este pedido</button>`).join('')}</div>`:''}
  ${deliveryBoxHTML(o,ped)}
  ${o2.noAnd?'':`<div class="op-and"><span class="op-st">Andamento</span>${vtlHTML(o)}</div>`}</section>
 ${ent?`<section class="op-sec"><div class="op-t"><i class="fa ${pick?'fa-shopping-bag':o.mod==='loja'?'fa-motorcycle':'fa-truck'}"></i> ${pick?'Retirada':'Entrega'}</div><div class="kvs">${ent}</div></section>`:''}
 <section class="op-sec"><div class="op-t"><i class="fa fa-credit-card"></i> Pagamento</div><div class="kvs">${kv('Forma',esc(o.pag))}${kv('Valor total',money(o.total))}</div></section>
 <details class="op-sec op-d"><summary><i class="fa fa-cube"></i> Produtos <span class="soft">(${o.itens.length})</span></summary><ul class="plist">${prods}</ul></details>
 <details class="op-sec op-d"><summary><i class="fa fa-list"></i> Ocorrências no ERP <span class="soft">(${oc.length})</span></summary><table class="tb"><tbody>${oc.map(([d,s,t])=>`<tr><td style="white-space:nowrap;color:#777">${d}</td><td>${esc(t)}</td></tr>`).join('')}</tbody></table></details>`}
function sidePanelHTML(c,ped,o){o=o||{};if(document.documentElement.classList.contains('one'))return wideInfoHTML(c,ped,o);const col=ped&&!S.opx;return `<aside class="card opanel${col?' col':''}" aria-label="Cliente e pedido">${c?cliBlockHTML(c,{chg:o.chgCli,novo:o.novo}):''}${ped?orderBlockHTML(ped,{chg:o.chgPed,self:o.self,noAnd:o.noAnd}):o.noPed?`<section class="op-sec"><div class="op-t"><i class="fa fa-shopping-cart"></i> Pedido ${o.chgPed?`<button type="button" class="lnk chg" data-chg="${o.chgPed}">Alterar</button>`:''}</div><p class="soft" style="margin:0">${o.noPed}</p></section>`:''}${ped?`<button type="button" class="op-tog" onclick="S.opx=!S.opx;render()">${col?'<i class="fa fa-chevron-down"></i> Ver cliente, andamento, entrega e produtos':'<i class="fa fa-chevron-up"></i> Recolher'}</button>`:''}</aside>`}
function stickTop(){const ps=app.querySelector('.psticky');document.documentElement.style.setProperty('--stk',(ps?ps.offsetHeight+58:62)+'px')}
