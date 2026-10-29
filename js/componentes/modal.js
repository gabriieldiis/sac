/* Modelo único de modal: cabeçalho azul em uma linha, faixa clara com o contexto, corpo e rodapé.
   Use sempre mBox() para montar um modal novo. */
function mHead(id,icon,title,xAttr,tags){
 return `<div class="phd mhd"><div class="phd-t"><span class="mic"><i class="fa ${icon}"></i></span><b class="mtt" id="${id}">${title}</b></div><span class="phtags">${tags||''}${xAttr?`<button type="button" class="pm-x" ${xAttr} aria-label="Fechar"><i class="fa fa-times"></i></button>`:''}</span></div>`}
/* o: {xAttr, labelledby, head, band, body, foot, cls, role} */
function mBox(o){return `<div class="pm-bg" ${o.xAttr}></div><div class="pm-box card mbox ${o.cls||''}" role="${o.role||'dialog'}" aria-modal="true" aria-labelledby="${o.labelledby}">${o.head}${o.band?`<div class="pwho mband">${o.band}</div>`:''}${o.body?`<div class="mbody">${o.body}</div>`:''}${o.foot?`<div class="pm-foot">${o.foot}</div>`:''}</div>`}

/* protocolo em sanfona: fechado mostra o cabeçalho do resumo; aberto mostra cliente, pedido e os últimos registros */
function pAccHTML(p,open){
 return `<details class="pacc"${open?' open':''}><summary class="phd lite"><span class="phd-t"><i class="fa fa-chevron-right pacc-ch" aria-hidden="true"></i><span class="lbl">Protocolo</span><b>${p.num}</b><span class="mt">${asIc(p.as,'sm')} ${esc(asTxt(p))} › ${esc(subTxt(p))}</span></span><span class="phtags">${ageTag(p,'sm')}${stPill(p)}<button type="button" class="gbtn sm" data-pmgo="${p.num}"><i class="fa fa-folder-open"></i> Abrir</button></span></summary>
  ${whoHTML(p)}<div class="phist">${histHTML(p,3)}</div></details>`}
