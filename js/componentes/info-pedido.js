/* Bloco "mais informações do pedido". */
/* ================= mais informações do pedido ================= */
const IMG=c=>`https://img.kalunga.com.br/fotosdeprodutos/${c}i.webp`;
const PURL=c=>`https://www.kalunga.com.br/busca/1?q=${encodeURIComponent(c)}`;
const CARRIER_SRC=['Jadlog','Loggi'];
function tile(ic,l,v,extra,wide){return `<div class="itile${wide?' wide':''}"><i class="fa ${ic}"></i><div><span>${l}</span><b>${v}</b>${extra||''}</div></div>`}
function orderInfoHTML(o,ped,lite){const tot=o.itens.reduce((a,i)=>a+i[2]*i[3],0),E=Object.fromEntries(o.entrega),v=VOL[ped],u=trackURL(o),pick=o.mod==='pick';
 const prods=o.itens.map(([c,d,q,val])=>`<div class="prod"><a class="pimg" href="${PURL(c)}" target="_blank" rel="noopener" title="Abrir no site"><img src="${IMG(c)}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa fa-picture-o'}))"></a>
   <div class="pdesc"><b>${esc(d)}</b><span>Cód. ${c} · <a href="${PURL(c)}" target="_blank" rel="noopener">Ver no site <i class="fa fa-external-link"></i></a></span></div>
   <div class="pnum"><span>Qtd</span><b>${q}</b></div><div class="pnum"><span>Unitário</span><b>${money(val)}</b></div><div class="pnum"><span>Total</span><b>${money(val*q)}</b></div></div>`).join('');
 const frete=Math.max(0,o.total-tot);
 let ent='';
 if(pick)ent=tile('fa-shopping-bag','Retirada na loja',esc(E['Loja de retirada']||o.loja),'',true)+(o.retirar?tile('fa-calendar','Retirar até',o.retirar):'');
 else{const end=E['Endereço']||'';
  ent=tile('fa-map-marker','Endereço de entrega',esc(end),`<button type="button" class="lnk sm2" data-cpt="${esc(end)}"><i class="fa fa-copy"></i> Copiar endereço</button>`,true)
   +tile(o.mod==='loja'?'fa-motorcycle':'fa-truck',o.mod==='loja'?'Entrega da loja':'Transportadora',esc(o.mod==='loja'?(E['Loja de saída']||o.loja)+' · '+o.carrier:E['Transportadora']||o.carrier),u?`<a class="lnk sm2" href="${u}" target="_blank" rel="noopener"><i class="fa fa-external-link"></i> Rastrear</a>`:'')
   +(v?tile('fa-barcode','Nº do volume',v,`<button type="button" class="lnk sm2" data-cpv="${v}"><i class="fa fa-copy"></i> Copiar</button>`):'')
   +(o.deveria?tile('fa-calendar',o.entregue?'Entregue em':'Previsão de entrega',o.entregue||o.deveria,o.atraso&&!o.entregue?'<em class="late">já passou</em>':''):'')
   +tile('fa-money','Frete',money(frete))}
 if(lite==='ent')return {ent,pag:tile('fa-credit-card','Forma',esc(o.pag))+tile('fa-money','Valor',money(o.total))};
 const oc=o.tl.filter(x=>!CARRIER_SRC.includes(x[1])).slice().reverse();
 return `<div class="card"><details class="more" style="border:0"><summary><span><i class="fa fa-info-circle" style="color:#888"></i> Mais informações do pedido <span class="soft" style="font-weight:400">· ${lite?'produtos e ocorrências':'produtos, entrega, pagamento, ocorrências'}</span></span></summary><div class="oinfo">
  <section><h3><i class="fa fa-cube"></i> Produtos</h3><div class="prods">${prods}</div><div class="ptot"><span>Frete <b>${money(frete)}</b></span><span>Total da compra <b>${money(o.total)}</b></span></div></section>
  ${lite?'':`<section><h3><i class="fa fa-truck"></i> Entrega</h3><div class="tiles">${ent}</div></section>`}
  <div class="ogrid">${lite?'':`<section><h3><i class="fa fa-credit-card"></i> Pagamento</h3><div class="tiles">${tile('fa-credit-card','Forma',esc(o.pag))}${tile('fa-money','Valor',money(o.total))}</div></section>`}
  <section><h3><i class="fa fa-list"></i> Ocorrências no ERP</h3><table class="tb"><tbody>${oc.map(([d,s,t])=>`<tr><td style="white-space:nowrap;color:#777">${d}</td><td>${esc(t)}</td></tr>`).join('')}</tbody></table></section></div></div></details></div>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-cpt]');if(b)copyTxt(b.dataset.cpt,'Endereço copiado')});
