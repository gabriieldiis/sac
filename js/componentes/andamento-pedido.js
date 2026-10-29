/* Linha do tempo do pedido e números de volume/rastreio. */
/* ================= linha do tempo do pedido (só dados do ERP) ================= */
const TRACK={Jadlog:'https://www.jadlog.com.br/jadlog/tracking',Loggi:'https://www.loggi.com/rastreador/'};
const VOL={'67431409':'01516419142BR','67537740':'01516422081BR','22700145':'01516470233BR','67509350':'LG5688823412','22633366':'568882354'};
function trackURL(o){return TRACK[o.carrier]||''}
function delayTag(o){if(!o.atraso)return '';const u=trackURL(o);
 return u?`<a class="pill dred dlink" href="${u}" target="_blank" rel="noopener" title="Abrir o rastreio no site da ${o.carrier}"><i class="fa fa-clock-o"></i> Pedido em atraso <i class="fa fa-external-link"></i></a>`:`<span class="pill dred"><i class="fa fa-clock-o"></i> Pedido em atraso</span>`}
function stepIc(l){l=l.toLowerCase();return l.includes('pagamento')?'fa-credit-card':l.startsWith('nfe')?'fa-file-text-o':l.includes('separado')?'fa-cube':l.includes('pronto')?'fa-shopping-bag':l.includes('transportadora')?'fa-truck':l.includes('saiu')?'fa-road':l.includes('retirado')?'fa-handshake-o':l.includes('entregue')?'fa-home':'fa-circle'}
function stepLbl(l){return l==='Transportadora'?'Entregue à transportadora':l.startsWith('NFe')?'Nota fiscal '+l.slice(4):l}
function timelineHTML(o,ped){const done=o.steps.filter(s=>s[1]),next=o.steps.filter(s=>!s[1]),inTr=o.mod!=='pick'&&!o.entregue&&!o.cancel&&done.some(s=>/transportadora|saiu/i.test(s[0]));
 const n=[{ic:'fa-shopping-cart',t:'Pedido feito',d:o.data.slice(0,5),st:'ok'},...done.map(s=>({ic:stepIc(s[0]),t:stepLbl(s[0]),d:s[1],st:'ok'}))];
 if(o.cancel)n.push({ic:'fa-times',t:'Cancelado',d:o.cancel,st:'x'});
 else if(inTr)n.push({ic:'fa-map-marker',t:'Em transporte',d:'acompanhe no site da '+o.carrier,st:'tr'});
 else if(next.length&&!o.entregue)n.push({ic:stepIc(next[0][0]),t:stepLbl(next[0][0]),d:'aguardando',st:'nx'});
 if(o.deveria&&!o.entregue&&!o.cancel)n.push({ic:'fa-calendar',t:'Previsão de entrega',d:o.deveria,st:o.atraso?'late':'nx'});
 if(o.retirar&&!o.cancel)n.push({ic:'fa-calendar',t:'Retirar até',d:o.retirar,st:'late'});
 return `<ol class="tline">${n.map(x=>`<li class="${x.st}"><span class="ti"><i class="fa ${x.ic}"></i></span><b>${x.t}</b><small>${esc(x.d)}</small></li>`).join('')}</ol>`}
function trackBarHTML(o,ped){const u=trackURL(o);if(!u||o.mod==='pick'||o.cancel)return '';const v=VOL[ped];
 return `<div class="trackbar ${o.atraso?'late':''}"><i class="fa ${o.atraso?'fa-exclamation-circle':'fa-truck'}"></i><span>${o.atraso?`<b>Passou da previsão de entrega (${o.deveria}).</b> Veja a situação atual no site da ${o.carrier}.`:`Situação da entrega: consulte no site da ${o.carrier}.`}</span>
  <span class="tbtns"><a class="gbtn sm ${o.atraso?'red':'blue'}" href="${u}" target="_blank" rel="noopener"><i class="fa fa-external-link"></i> Rastrear na ${o.carrier}</a>${v?`<button type="button" class="lbtn sm" data-cpv="${v}" title="Copiar o nº do volume para colar no rastreio"><i class="fa fa-copy"></i> Volume ${v}</button>`:''}</span></div>`}
function orderMainHTML(ped){const o=ORDERS[ped];return `<div class="card omain">${orderRowHTML(ped)}<div class="ostep">${timelineHTML(o,ped)}</div>${trackBarHTML(o,ped)}</div>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-cpv]');if(b)copyTxt(b.dataset.cpv,'Nº do volume copiado')});
