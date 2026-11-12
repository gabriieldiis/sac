/* Painel lateral "Cliente e pedido" (modo Dividido). */
/* ================= painel lateral "Cliente e pedido" (cada dado aparece uma vez) ================= */
/* volumes do pedido: código para copiar e colar no protocolo */
function volsOf(o,ped){if(o.volumes)return o.volumes;if(VOLS[ped])return VOLS[ped].map(v=>[v[0],v[3]]);return VOL[ped]?[[VOL[ped],'']]:[]}
/* volumes do pedido SEMPRE com os itens de cada um (pedido do SACK):
   1) o.volItens, quando o pedido traz a composição de cada volume;
   2) senão, os itens são distribuídos pelos volumes conhecidos (códigos + quantidade informada na entrega);
   3) sem nº de volume, aparece um volume só, com todos os itens. */
function volumesDoPedido(o,ped){if(o.volItens)return o.volItens;
 const vs=volsOf(o,ped),E=Object.fromEntries(o.entrega||[]),qn=+String(E['Volumes']||'').replace(/\D/g,'')||0,n=Math.max(1,vs.length,qn&&qn<30?qn:0);
 const codes=vs.map(v=>v[0]),labs=vs.map(v=>v[1]||'');
 while(codes.length<n){const b=codes[codes.length-1];if(!b){codes.push('');labs.push('');continue}const m=b.match(/^(.*?)(\d+)(\D*)$/);codes.push(m?m[1]+String(+m[2]+1).padStart(m[2].length,'0')+m[3]:'');labs.push('')}
 let L=o.itens.map(([c,d,q])=>({c,d,q}));
 while(L.length<n){let i=-1,mx=1;L.forEach((x,j)=>{if(x.q>mx){mx=x.q;i=j}});if(i<0)break;const x=L[i],a=Math.ceil(x.q/2);L.splice(i,1,{...x,q:a},{...x,q:x.q-a})}
 while(L.length<n){const x=L[L.length-1];L.push({...x,parte:true})}
 const G=Array.from({length:n},()=>[]);const per=L.length/n;L.forEach((x,j)=>G[Math.min(n-1,Math.floor(j/per))].push(x));
 const nf=o.nf&&o.nf!=='—';
 return G.map((g,i)=>({cod:codes[i]||'',lab:labs[i]||(n>1?`${i+1}/${n}`:''),semCod:!codes[i]?(nf?'nº do volume não informado':'nº gerado no faturamento'):'',
  itens:[...g.reduce((m,x)=>{const k=x.c+(x.parte?'p':'');if(!m.has(k))m.set(k,{c:x.c,d:x.d,q:0,parte:x.parte});m.get(k).q+=x.parte?0:x.q;return m},new Map()).values()].map(x=>[x.c,x.parte?x.d+' (parte)':x.d,x.parte?null:x.q])}))}
/* foto do produto (mesma do site); sem código ou sem foto, aparece um ícone */
const prodImg=(c,big)=>c?`<a class="pimg ${big?'':'sm'}" href="${PURL(c)}" target="_blank" rel="noopener" title="Abrir o produto no site"><img src="${IMG(c)}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa fa-picture-o'}))"></a>`:`<span class="pimg ${big?'':'sm'} noimg" aria-hidden="true"><i class="fa fa-cube"></i></span>`;
const volItensHTML=v=>`<ul class="vprod">${v.itens.length?v.itens.map(([c,d,q])=>`<li>${prodImg(c)}<div class="vpd"><span>${esc(d)}</span><small>${c?'Cód. '+c:'sem código'}</small></div><b class="vpq">${q?q+' un.':'—'}</b></li>`).join(''):'<li class="soft">Itens não informados</li>'}</ul>`;
/* volume em sanfona: fechado mostra o nº e quantos itens; aberto mostra os itens com foto. extra = etiquetas no cabeçalho */
function volAcc(v,open,extra){const n=v.itens.length;
 return `<details class="vacc"${open?' open':''}><summary><i class="fa fa-chevron-right vacc-ch" aria-hidden="true"></i><span class="vacc-c">${v.cod?`<b>${esc(v.cod)}</b>`:`<b class="vacc-sc">${esc(v.semCod)}</b>`}${v.lab?`<small>${esc(v.lab)}</small>`:''}</span>${extra||''}<span class="vacc-n">${n} ${n===1?'item':'itens'}</span>${v.cod?`<button type="button" class="ske-b vacc-cp" data-cpv="${esc(v.cod)}" title="Copiar o nº do volume" aria-label="Copiar o volume ${esc(v.cod)}"><i class="fa fa-copy"></i></button>`:''}</summary>${volItensHTML(v)}</details>`}
function volLines(o,ped){const L=volumesDoPedido(o,ped);
 return `<div class="vaccs">${L.length>1?`<button type="button" class="lnk sm2 vacc-all" data-vaccall>Abrir todos os volumes</button>`:''}${L.map(v=>volAcc(v,L.length===1)).join('')}</div>`}
/* copiar o nº sem abrir/fechar a sanfona; "abrir todos" */
document.addEventListener('click',e=>{if(e.target.closest('summary [data-cpv]'))e.preventDefault();const b=e.target.closest('[data-vaccall]');if(!b)return;const D=[...b.closest('.vaccs,.vp-l,.vbox').querySelectorAll('.vacc')],op=!D.every(d=>d.open);D.forEach(d=>d.open=op);b.textContent=op?'Fechar todos os volumes':'Abrir todos os volumes'},true);
function kv(l,v,x,cls){return `<div class="kv${cls?' '+cls:''}"><span>${l}</span><b>${v}</b>${x?`<em>${x}</em>`:''}</div>`}
function cliBlockHTML(c,o){o=o||{};const isCnpj=digits(c.doc).length===14;
 return `<section class="op-sec"><div class="op-t"><i class="fa fa-user"></i> Cliente ${o.chg?`<button type="button" class="lnk chg" data-chg="${o.chg}">Alterar</button>`:''}</div>
  <div class="op-name">${esc(c.nome)}${o.novo?` <span class="pill ${c.anon?'grey':'blue'}" style="font-size:11px">${c.anon?'não identificado':'novo na base'}</span>`:''}</div>
  <div class="kvs">${kv(isCnpj?'CNPJ':'CPF',maskDoc(c.doc))}${c.tel?kv('Telefone',esc(c.tel)):''}${c.cidade?kv('Cidade',esc(c.cidade)):''}${c.email?kv('E-mail',esc(c.email),'','w'):''}</div></section>`}
function vtlHTML(o){const done=o.steps.filter(s=>s[1]),next=o.steps.filter(s=>!s[1]),inTr=o.mod!=='pick'&&!o.entregue&&!o.cancel&&done.some(s=>/transportadora|saiu/i.test(s[0]));
 const SH=l=>/pagamento/i.test(l)?'Pagamento':/^NFe/.test(l)?'Nota fiscal':/^Transportadora$/.test(l)?'Transportadora':/^Separado/.test(l)?'Separado':/^Pedido entregue/.test(l)?'Entregue':/Saiu com/i.test(l)?'Saiu com entregador':stepLbl(l);
 const n=[{ic:'fa-shopping-cart',t:'Pedido feito',d:o.data.slice(0,5),st:'ok'},...done.map(s=>({ic:stepIc(s[0]),t:SH(s[0]),full:stepLbl(s[0]),d:s[1],st:'ok'}))];
 /* linha do tempo sempre completa: verde = etapa feita, contorno verde = onde o pedido está agora, cinza = etapas que ainda vão acontecer */
 const fut=l=>({ic:stepIc(l[0]),t:SH(l[0]),full:stepLbl(l[0]),d:'',st:'fu'});
 if(o.cancel)n.push({ic:'fa-ban',t:'Cancelado',d:o.cancel,st:'x'});
 else if(o.furo)n.push({ic:'fa-exclamation-triangle',t:'Furo de estoque',d:o.furoEm,st:'x'},...next.map(fut));
 else if(o.extravio)n.push({ic:'fa-exclamation-circle',t:'Extraviado',d:o.extravio,st:'x'},...next.map(fut));
 else if(inTr)n.push({ic:'fa-map-marker',t:'Em transporte',d:'agora',st:'cur'},...next.map(fut));
 else if(next.length&&!o.entregue)n.push({ic:stepIc(next[0][0]),t:SH(next[0][0]),full:stepLbl(next[0][0]),d:'aguardando',st:'cur'},...next.slice(1).map(fut));
 const C=n.find(x=>x.st==='cur'||x.st==='x')||n[n.length-1];
 return `<ol class="htl2" aria-label="Andamento do pedido">${n.map(x=>`<li class="${x.st}"${x.st==='cur'?' aria-current="step"':''} title="${esc((x.full||x.t)+(x.st==='fu'?' · ainda não aconteceu':x.d?' · '+x.d:''))}"><span class="ti"><i class="fa ${x.ic}"></i></span><b>${x.t}</b>${x.d?`<small>${esc(/^\d\d\/\d\d/.test(x.d)?x.d.slice(0,5):x.d)}</small>`:x.st==='fu'?'<small class="sr">ainda não aconteceu</small>':''}</li>`).join('')}</ol><div class="htl-cur ${C.st==='x'?'x':''}">Etapa atual: <b>${C.t}</b>${C.d?' · '+esc(C.d):''}</div>`}
function deliveryBoxHTML(o,ped){const u=trackURL(o),v=VOL[ped];
 if(o.aviso&&!shippedOf(o))return `<div class="dbox ${o.aviso[0]}"><i class="fa ${o.aviso[1]}"></i><div><b>${o.aviso[2]}</b><span>${o.aviso[3]}</span></div></div>`;
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
 const ent=pick?(o.retirar?kv('Retirar até',o.retirar):'')+kv('Volume e itens',volLines(o,ped),'','w')
  :kv('Endereço',esc(end),`<button type="button" class="lnk sm2" data-cpt="${esc(end)}"><i class="fa fa-copy"></i> copiar</button>`,'w')+(!VOLS[ped]?kv(volumesDoPedido(o,ped).length>1?'Volumes e itens':'Volume e itens',volLines(o,ped),'','w'):'')+kv('Frete',money(fr));
 const prods=o.itens.map(([c,d,q,val])=>`<li><a class="pimg sm" href="${PURL(c)}" target="_blank" rel="noopener" title="Abrir no site"><img src="${IMG(c)}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa fa-picture-o'}))"></a><div><a href="${PURL(c)}" target="_blank" rel="noopener">${esc(d)}</a><span>Cód. ${c} · ${q} × ${money(val)}</span></div><b>${money(val*q)}</b></li>`).join('');
 const oc=o.tl.filter(x=>!CARRIER_SRC.includes(x[1])).slice().reverse();
 return `<section class="op-sec op-key"><div class="op-t"><i class="fa fa-shopping-cart"></i> Pedido #${ped} ${o2.chg?`<button type="button" class="lnk chg" data-chg="${o2.chg}">Alterar</button>`:''}</div>
  ${modBar(o)}
  <div class="op-meta">${o.cancel?`<span class="pill red"><i class="fa fa-ban"></i> Cancelado em ${o.cancel}</span>`:o.furo||o.extravio||o.entregue||(o.aviso&&!shippedOf(o))?'':`<span class="pill blue">${esc(o.stt)}</span>`}<span>${[o.data,esc(o.origem),o.kom!==ped?'Kommerce '+o.kom:'',o.nf&&o.nf!=='—'?'NF '+o.nf:'NF não emitida'].filter(Boolean).join(' · ')}</span></div>
  ${op.length?`<div class="op-prot">${op.map(p=>`<button type="button" class="pill amber pbtn" data-pmodal="${p.num}"><i class="fa fa-folder-open-o"></i> Protocolo ${p.num} aberto para este pedido</button>`).join('')}</div>`:''}
  ${deliveryBoxHTML(o,ped)}
  ${o2.noAnd?'':`<div class="op-and"><span class="op-st">Andamento</span>${vtlHTML(o)}</div>`}</section>
 ${ent?`<section class="op-sec"><div class="op-t"><i class="fa ${pick?'fa-shopping-bag':o.mod==='loja'?'fa-motorcycle':'fa-truck'}"></i> ${pick?'Retirada':'Entrega'}</div><div class="kvs">${ent}</div></section>`:''}
 <section class="op-sec"><div class="op-t"><i class="fa fa-credit-card"></i> Pagamento</div><div class="kvs">${kv('Forma',esc(o.pag))}${kv('Valor total',money(o.total))}</div></section>
 <details class="op-sec op-d"><summary><i class="fa fa-cube"></i> Produtos <span class="soft">(${o.itens.length})</span></summary><ul class="plist">${prods}</ul></details>
 <details class="op-sec op-d"><summary><i class="fa fa-list"></i> Ocorrências no ERP <span class="soft">(${oc.length})</span></summary><table class="tb"><tbody>${oc.map(([d,s,t])=>`<tr><td style="white-space:nowrap;color:#555555">${d}</td><td>${esc(t)}</td></tr>`).join('')}</tbody></table></details>`}
function sidePanelHTML(c,ped,o){o=o||{};if(document.documentElement.classList.contains('one'))return wideInfoHTML(c,ped,o);const col=ped&&!S.opx;return `<aside class="card opanel${col?' col':''}" aria-label="Cliente e pedido">${c?cliBlockHTML(c,{chg:o.chgCli,novo:o.novo}):''}${ped?orderBlockHTML(ped,{chg:o.chgPed,self:o.self,noAnd:o.noAnd}):o.noPed?`<section class="op-sec"><div class="op-t"><i class="fa fa-shopping-cart"></i> Pedido ${o.chgPed?`<button type="button" class="lnk chg" data-chg="${o.chgPed}">Alterar</button>`:''}</div><p class="soft" style="margin:0">${o.noPed}</p></section>`:''}${ped?`<button type="button" class="op-tog" onclick="S.opx=!S.opx;render()">${col?'<i class="fa fa-chevron-down"></i> Ver cliente, andamento, entrega e produtos':'<i class="fa fa-chevron-up"></i> Recolher'}</button>`:''}</aside>`}
function stickTop(){const ps=app.querySelector('.psticky');document.documentElement.style.setProperty('--stk',(ps?ps.offsetHeight+58:62)+'px')}
