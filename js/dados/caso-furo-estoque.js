/* Caso de exemplo: furo de estoque. */
/* ================= exemplo: furo de estoque ================= */
Object.assign(ORDERS,{'67620318':{cli:'c7',kom:'22661904',nf:'—',data:'13/10/2026',total:1418.70,mod:'cd',carrier:'Jadlog',state:'furo',origem:'Site Kalunga',loja:'CD',
 say:'Pedido retido na separação: 1 item sem estoque no CD.',sub:'',ic:'fa-exclamation-triangle',col:'#dd4b39',pill:['red','Furo de estoque'],prev:'—',src:[],
 tl:[['13/10','ERP','Compra aprovada · cartão de crédito 4x'],['14/10 07:40','CD','Furo de estoque: Impressora HP Smart Tank 724 (cód. 220293) sem saldo no endereço de separação'],['14/10 08:05','ERP','Pedido retido em separação aguardando definição']],
 entrega:[['Endereço','R. Exemplo, 220 · Centro · Lorena/SP'],['Transportadora','Jadlog Logística']],
 itens:[['220293','Impressora multifuncional HP Smart Tank 724',1,1249],['671714','Teclado e mouse sem fio TC212 Multi',1,129.90],['614174','Lixa massa e madeira 800-120 Tigre FL',20,0.80]],pag:'Cartão de crédito 4x',
 stt:'Furo de estoque',fones:'(12) 96113-3365',furo:['220293'],furoEm:'14/10',steps:[['Analisando pagamento','13/10 10:02'],['NFe',null],['Separado',null],['Transportadora',null],['Saiu para entrega',null],['Pedido entregue',null]]}});
function furoBoxHTML(o,ped){const it=o.itens.filter(i=>o.furo.includes(i[0])),ok=o.itens.filter(i=>!o.furo.includes(i[0]));
 return `<div class="dbox furo"><i class="fa fa-exclamation-triangle"></i><div><b>Furo de estoque: ${it.length} ite${it.length>1?'ns':'m'} sem estoque no CD</b><span>O pedido está parado na separação desde ${o.furoEm}. Os outros ${ok.length} itens estão separados esperando a definição.</span>
  <ul class="furol">${it.map(([c,d,q,v])=>`<li><a class="pimg sm" href="${PURL(c)}" target="_blank" rel="noopener"><img src="${IMG(c)}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('i'),{className:'fa fa-picture-o'}))"></a><span><b>${esc(d)}</b><small>Cód. ${c} · ${q} un. · ${money(v*q)}</small></span><span class="pill red"><i class="fa fa-times"></i> sem estoque</span></li>`).join('')}</ul>
  <span class="furo-h"><i class="fa fa-lightbulb-o"></i> Pergunte ao cliente se prefere <b>aguardar a reposição</b>, <b>trocar por similar</b> ou <b>cancelar o item</b>.</span></div></div>`}
/* nota fiscal: todo pedido faturado tem NF (cancelado antes de faturar e furo de estoque ainda não) */
Object.entries(ORDERS).forEach(([k,o])=>{if((!o.nf||o.nf==='—')&&!o.cancel&&!o.furo)o.nf='160'+k.slice(-5)});
