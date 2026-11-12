/* Layout Corrido: tudo numa coluna, lido de cima para baixo.
   Ficha única (igual no novo atendimento, no protocolo e na consulta): quem é o cliente › situação do pedido › andamento › entrega | nota e pagamento › detalhes. */
function orderState(o,ped){const u=trackURL(o),last=o.steps.filter(s=>s[1]).pop(),clean=t=>String(t||'').replace(/^Cancelad[oa][^.]*?\d\d\/\d\d\.?\s*/i,'');
 if(o.cancel)return {tone:'bad',ic:'fa-ban',t:`Cancelado em ${o.cancel}`,s:clean(o.say)};
 if(o.furo)return {tone:'bad',ic:'fa-exclamation-triangle',t:`Parado por furo de estoque desde ${o.furoEm}`,s:'Pergunte ao cliente se prefere aguardar, trocar por similar ou cancelar o item.',x:(furoBoxHTML(o,ped).match(/<ul class="furol">[\s\S]*?<\/ul>/)||[''])[0]};
 if(shippedOf(o)&&!VOLS[ped]){const u=trackURL(o);return o.entregue?{tone:'good',ic:'fa-check-circle',t:`Entregue em ${o.entregue}`,s:`${o.mod==='loja'?'Entrega da loja':'Transportadora'} ${o.carrier}`,u}:{tone:'info',ic:'fa-truck',t:u?`Confira o rastreio da ${o.carrier}`:'Confira a situação da entrega',s:u?'O prazo e a situação atual da entrega estão no site da transportadora. Olhe sempre antes de responder o cliente.':'Confira com a loja antes de responder o cliente.',u}}
 if(o.extravio)return {tone:'bad',ic:'fa-exclamation-circle',t:`Extraviado em ${o.extravio}`,s:o.aviso?o.aviso[3]:''};
 if(o.aviso)return {tone:o.aviso[0]==='late'?'bad':o.aviso[0]==='track'?'warn':o.aviso[0]==='ok'?'good':'info',ic:o.aviso[1],t:o.aviso[2],s:o.aviso[3]};
 if(VOLS[ped])return {tone:'warn',ic:'fa-cubes',t:o.stt,s:'',x:volBoxHTML(o,ped)};
 if(o.entregue)return {tone:'good',ic:'fa-check-circle',t:`Entregue em ${o.entregue}`,s:o.mod==='pick'?'':`${o.mod==='loja'?'Entrega da loja':'Transportadora'} ${o.carrier}`,u};
 if(o.mod==='pick')return {tone:'info',ic:'fa-shopping-bag',t:/Retirado/.test(last?.[0]||'')?`Retirado em ${last[1].slice(0,5)}`:o.retirar?`Pronto para retirada · retirar até ${o.retirar}`:o.stt,s:''};
 return {tone:'info',ic:'fa-truck',t:o.stt||'Em transporte',s:u?`Confira o prazo no rastreio da ${o.carrier} antes de responder o cliente.`:'Confira a situação com a loja antes de responder o cliente.',u}}
function wideInfoHTML(c,ped,o){const O=ped?ORDERS[ped]:null;
 const chg=k=>k?`<button type="button" class="lnk chg" data-chg="${k}">Alterar</button>`:'';
 const cli=c?cliLineHTML(c,o):'';
 if(!O)return `<section class="card ficha fx" aria-label="Cliente">${cli}${o.noPed||o.chgPed?`<div class="fc-top fx-np"><span class="fc-ped"><i class="fa fa-shopping-cart"></i> ${o.noPed?esc(o.noPed):'Sem pedido'}</span>${chg(o.chgPed)}</div>`:''}</section>`;
 const m=MODB[O.mod]||MODB.cd,E=Object.fromEntries(O.entrega),st=orderState(O,ped),v=VOL[ped];
 const nf=O.nf&&O.nf!=='—'?O.nf:'',tot=O.itens.reduce((a,i)=>a+i[2]*i[3],0),fr=Math.max(0,O.total-tot),end=E['Endereço']||'';
 const op=protosOf(ped).filter(p=>isOpen(p)&&p.num!==S.p&&p.num!==o.self);
 const where=O.mod==='pick'?`Loja ${esc(E['Loja de retirada']||O.loja)}`:O.mod==='loja'?`Sai da loja ${esc(E['Loja de saída']||O.loja)} · ${esc(O.carrier)}`:`Sai do CD · ${esc(O.carrier)}`;
 const acts=(st.u?`<a class="gbtn sm trk" href="${st.u}" target="_blank" rel="noopener"><i class="fa fa-external-link"></i> Rastrear na ${esc(O.carrier)}</a>`:'');
 const oc=O.tl.filter(x=>!CARRIER_SRC.includes(x[1])).slice().reverse();
 const moreH=`<details><summary><i class="fa fa-cube"></i> Produtos <span class="soft">${O.itens.length} · ${money(tot)}</span></summary><div class="scroll"><table class="cprod"><thead><tr><th></th><th>Produto</th><th>Qtd</th><th>Unitário</th><th>Total</th></tr></thead><tbody>${O.itens.map(([cd,d,q,vv])=>`<tr><td><a class="pimg sm" href="${PURL(cd)}" target="_blank" rel="noopener"><img src="${IMG(cd)}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa fa-picture-o'}))"></a></td><td><a href="${PURL(cd)}" target="_blank" rel="noopener">${esc(d)}</a><small>Cód. ${cd}</small></td><td>${q}</td><td>${money(vv)}</td><td><b>${money(vv*q)}</b></td></tr>`).join('')}</tbody></table></div></details>
   <details><summary><i class="fa fa-list"></i> Ocorrências no ERP <span class="soft">${oc.length}</span></summary><table class="tb"><tbody>${oc.map(([d,s2,t])=>`<tr><td style="white-space:nowrap;color:#555555">${d}</td><td>${esc(t)}</td></tr>`).join('')}</tbody></table></details>`;
 const step=!!o.step,isPick=O.mod==='pick',vols=volumesDoPedido(O,ped);
 const dl=(l,val,x)=>`<div class="fx-r"><dt>${l}</dt><dd>${val}${x||''}</dd></div>`;
 const entrega=isPick?dl('Loja',esc(E['Loja de retirada']||O.loja))+(O.retirar?dl('Retirar até',O.retirar):'')+dl('Volume e itens',volLines(O,ped))
  :(end?dl('Endereço',esc(end),cpx(end,'Endereço copiado')):'')+dl(vols.length>1?'Volumes e itens':'Volume e itens',volLines(O,ped))+dl('Transportadora',esc(O.carrier||'—'));
 const pagto=dl('Nota fiscal',nf||'<span class="soft">não emitida</span>',nf?cpx(nf,'Nº da nota copiado'):'')
  +dl('Valor',`${money(O.total)} <span class="soft">${esc(O.pag)}${isPick?'':' · frete '+money(fr)}</span>`)
  +dl('Compra',`${O.data} <span class="soft">${esc(O.origem)}</span>`)
  +(O.kom!==ped?dl('Kommerce',O.kom,cpx(O.kom,'Nº Kommerce copiado')):'');
 const opR=op.length?`<div class="fx-op"><i class="fa fa-folder-open"></i><span>${op.length>1?`${op.length} protocolos abertos`:'Protocolo aberto'} para este pedido:</span>${op.map(p=>`<button type="button" class="lnk" data-pmodal="${p.num}">${p.num} · ${esc(subTxt(p))}</button>`).join('')}</div>`:'';
 return `<section class="card ficha fx${step?' nsec done fstep':''}" aria-label="Cliente e pedido">
  ${cli}
  <div class="fx-h">${step?'<span class="nn"><i class="fa fa-check"></i></span>':''}<span class="fx-pl">Pedido</span><b class="fx-n">#${ped}</b><span class="fc-mod m-${m[2]}"><i class="fa ${m[1]}"></i> ${m[0]}<span>${where}</span></span>${o.cur?'<span class="pill blue cvcur"><i class="fa fa-search"></i> Pedido consultado</span>':''}${o.chgPed?`<button type="button" class="lnk chg" data-chg="${o.chgPed}">Alterar pedido</button>`:''}</div>
  <div class="fx-st t-${st.tone}"><i class="fa ${st.ic}" aria-hidden="true"></i><div class="fx-stt"><b>${esc(st.t)}</b>${st.s?`<span>${esc(st.s)}</span>`:''}</div>${acts?`<div class="fx-acts">${acts}</div>`:''}</div>
  ${st.x?`<div class="fx-x">${st.x}</div>`:''}${opR}
  <div class="op-and ped-and fx-tl">${vtlHTML(O)}</div>
  <div class="fx-split"><section class="fx-col"><h4><i class="fa ${isPick?'fa-shopping-bag':'fa-map-marker'}"></i> ${isPick?'Retirada':'Entrega'}</h4><dl>${entrega}</dl></section>
   <section class="fx-col"><h4><i class="fa fa-file-text-o"></i> Nota e pagamento</h4><dl>${pagto}</dl></section></div>
  <div class="fc-more">${moreH}</div>
 </section>`}
function cliLineHTML(c,o){o=o||{};const doc=digits(c.doc).length===14?'CNPJ':'CPF';
 const it=(l,val,cp)=>`<span class="fc-ci"><small>${l}</small><b>${val}</b>${cp||''}</span>`;
 return `<div class="fc-cli"><span class="fc-cn"><i class="fa fa-user"></i> <b>${esc(c.nome)}</b>${o.novo?` <span class="pill ${c.anon?'grey':'blue'}" style="font-size:11px">${c.anon?'não identificado':'novo na base'}</span>`:''}${o.chgCli?` <button type="button" class="lnk chg" data-chg="${o.chgCli}">Alterar</button>`:''}</span>
  ${it(doc,maskDoc(c.doc),cpx(c.doc,doc+' copiado'))}${c.tel?it('Telefone',esc(c.tel),cpx(c.tel,'Telefone copiado')):''}${c.email?it('E-mail',esc(c.email),cpx(c.email,'E-mail copiado')):''}${c.cidade?it('Cidade',esc(c.cidade)):''}</div>`}
function cpx(v,msg){return v?`<button type="button" class="lnk sm2 cpx" data-cpx="${esc(v)}" data-cpm="${esc(msg||'Copiado')}"><i class="fa fa-copy"></i> copiar</button>`:''}
function cliCard(c,o){o=o||{};if(!c)return '';const doc=digits(c.doc).length===14?'CNPJ':'CPF';
 return `<div class="card ccard"><h4><i class="fa fa-user"></i> Cliente${o.chgCli?` <button type="button" class="lnk chg" data-chg="${o.chgCli}" style="margin-left:auto;text-transform:none;letter-spacing:0;font-size:12.5px">Alterar</button>`:''}</h4>
  <div class="ckvs"><div class="ckv"><span>Nome</span><b>${esc(c.nome)}</b>${o.novo?' <span class="pill blue" style="font-size:11px">novo na base</span>':''}</div>
  <div class="ckv"><span>${doc}</span><b>${maskDoc(c.doc)}</b>${cpx(c.doc,doc+' copiado')}</div>${c.tel?`<div class="ckv"><span>Telefone</span><b>${esc(c.tel)}</b>${cpx(c.tel,'Telefone copiado')}</div>`:''}${c.email?`<div class="ckv"><span>E-mail</span><b>${esc(c.email)}</b>${cpx(c.email,'E-mail copiado')}</div>`:''}${c.cidade?`<div class="ckv"><span>Cidade</span><b>${esc(c.cidade)}</b></div>`:''}</div></div>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-cpx]');if(b)copyTxt(b.dataset.cpx,b.dataset.cpm)});
