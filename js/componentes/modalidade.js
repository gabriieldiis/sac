/* Selo e barra da modalidade (CD, Super Expressa, Retirada). */
/* ================= modalidade do pedido: CD, Super Expressa (loja) ou Retirada ================= */
const MODB={cd:['Entrega pelo CD','fa-truck','cd'],loja:['Entrega Super Expressa','fa-bolt','loja'],pick:['Retirada na loja','fa-shopping-bag','pick']};
function modBadge(o,sm){const m=MODB[o.mod]||MODB.cd;return `<span class="modb m-${m[2]}${sm?' sm':''}" title="${esc(MODN[o.mod]||m[0])}"><i class="fa ${m[1]}"></i> ${m[0]}</span>`}
function modBar(o){const E=Object.fromEntries(o.entrega),m=MODB[o.mod]||MODB.cd;
 const sub=o.mod==='cd'?`Sai do CD · transportadora <b>${esc(o.carrier)}</b>`:o.mod==='loja'?`Sai da loja <b>${esc(E['Loja de saída']||o.loja)}</b> direto para o cliente · ${esc(o.carrier)}`:`Cliente retira na loja <b>${esc(E['Loja de retirada']||o.loja)}</b>`;
 return `<div class="modbar m-${m[2]}"><span class="mb-ic"><i class="fa ${m[1]}"></i></span><div><b>${m[0]}</b><span>${sub}</span></div></div>`}
