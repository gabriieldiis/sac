/* Data de "hoje" do protótipo, clientes, pedidos e funções utilitárias usadas por todas as telas. */
const TODAY=new Date(2026,9,16);
let PROTOS=[];
const SRC={ERP:'#0073b7',Loja:'#605ca8',Site:'#00a65a',Jadlog:'#c0392b',Loggi:'#3c5bd6',SAC:'#f39c12','E-mail':'#777'};
const CLIENTES={
 c1:{nome:'Marta Ribeiro',doc:'241.592.066-54',cidade:'Tremembé / SP',tel:'(11) 92528-7752',email:'marta.ribeiro@uol.com.br',desde:2019},
 c2:{nome:'Mário Alves',doc:'112.579.763-03',cidade:'São Carlos / SP',tel:'(16) 96452-7631',email:'mario.alves@gmail.com',desde:2017},
 c3:{nome:'Ana Paula Souza',doc:'355.561.876-81',cidade:'Salvador / BA',tel:'(71) 95215-1907',email:'anapaula.souza@hotmail.com',desde:2023},
 c4:{nome:'Leonardo Mendes',doc:'139.303.113-72',cidade:'Rio de Janeiro / RJ',tel:'(21) 92407-5791',email:'leonardo.mendes@gmail.com',desde:2021},
 c5:{nome:'Rafael Borges',doc:'444.429.104-48',cidade:'Uberlândia / MG',tel:'(34) 95931-1658',email:'rafael.borges@live.com',desde:2020},
 c6:{nome:'Juliana Costa',doc:'339.300.944-36',cidade:'Campinas / SP',tel:'(19) 91726-4410',email:'juliana.costa@gmail.com',desde:2022},
 c8:{nome:'Paulo Henrique Andrade',doc:'259.724.862-37',cidade:'São Paulo / SP',tel:'(11) 91444-8825',email:'paulohenrique.andrade@gmail.com',desde:2024},
 c7:{nome:'Roberto Lima',doc:'261.296.531-90',cidade:'Lorena / SP',tel:'(12) 94185-3365',email:'roberto.lima@gmail.com',desde:2018}
};
const ORDERS={
'67431409':{cli:'c8',kom:'22373940',nf:'15917425',data:'29/07/2026',total:9.90,mod:'cd',carrier:'Jadlog',state:'atrasado',origem:'Site Kalunga',loja:'9995 · Internet',
  say:'Atrasado. Despachado para a Jadlog em 29/07 e sem nova movimentação desde então.',sub:'Status na transportadora: Despachado Kalunga | 00 (29/07 22:41). Volume 01516419142BR.',ic:'fa-clock-o',col:'#dd4b39',pill:['blue','Em transporte'],prev:'Era 05/08 · sem nova data',atraso:['red',72],
  src:[['ERP','Faturado'],['Site','Em transporte'],['Jadlog','Despachado Kalunga | 00']],
  tl:[['29/07','ERP','Compra aprovada · cartão Master'],['29/07','ERP','Faturado · NF 15917425'],['29/07 04:09','ERP','Liberado para portaria'],['29/07 10:41','ERP','Despachado Kalunga (pedido concluído)'],['29/07 22:41','Jadlog','Despachado Kalunga | 00']],
  entrega:[['Endereço','R. Exemplo, 766 · Mooca · São Paulo/SP'],['Transportadora','Jadlog Logística'],['Volume','01516419142BR'],['Frete','R$ 9,10']],
  itens:[['614174','Lixa massa e madeira 800-120 Tigre FL',1,0.80]],pag:'Cartão de crédito Master'},
'67537740':{cli:'c1',kom:'22612386',nf:'16032665',data:'05/10/2026',total:767.20,mod:'cd',carrier:'Jadlog',state:'atrasado',origem:'Site Kalunga',loja:'CD',
  say:'Atrasado. A Jadlog não entrega em zona rural e precisa de outro endereço.',sub:'Parado desde 08/10. Aviso da transportadora às 11:48.',ic:'fa-clock-o',col:'#dd4b39',pill:['blue','Em transporte'],prev:'Era 10/10 · sem nova data',atraso:['red',6],
  src:[['ERP','Faturado'],['Site','Em transporte'],['Jadlog','Endereço em zona rural']],
  tl:[['05/10','ERP','Compra aprovada · cartão 2x'],['06/10','ERP','Faturado · NF 16032665'],['06/10','Jadlog','Coletado no CD'],['08/10 11:43','Jadlog','Em rota'],['08/10 11:48','Jadlog','Endereço em zona rural · entrega não realizada']],
  entrega:[['Endereço','Estr. Municipal, 2804 · Zona rural · Tremembé/SP'],['Transportadora','Jadlog Logística'],['Frete','R$ 27,40']],
  itens:[['315760','Cadeira gamer PlayStation PA4D XL preta',1,739.80]],pag:'Cartão de crédito 2x'},
'67509350':{cli:'c2',kom:'4525612',nf:'16001739',data:'15/09/2026',total:145.80,mod:'cd',carrier:'Loggi',state:'entregue',origem:'Site Kalunga',loja:'CD',
  say:'Consta entregue em 30/09, mas o cliente diz que não recebeu.',sub:'Assinado por terceiro. A foto da Loggi mostra a fachada de um comércio vizinho.',ic:'fa-exclamation',col:'#f39c12',pill:['amber','Entrega contestada'],prev:'Entregue 30/09',
  src:[['ERP','Faturado'],['Site','Entregue'],['Loggi','Entregue · assinado por "H."']],
  tl:[['15/09','ERP','Compra aprovada'],['16/09','ERP','Faturado · NF 16001739'],['22/09','Loggi','Tentativa em endereço diferente'],['28/09','Loggi','Destinatário ausente'],['30/09','Loggi','Entregue · assinado por terceiro']],
  entrega:[['Endereço','R. Exemplo, 345 · Centro · São Carlos/SP'],['Transportadora','Loggi (L4B Logística)'],['Comprovante','Foto + assinatura']],
  itens:[['512300','Kit material escolar (exemplo)',1,145.80]],pag:'Cartão de crédito 1x'},
'22633366':{cli:'c3',kom:'22633366',nf:'—',data:'12/10/2026',total:312.40,mod:'loja',carrier:'Loggi',state:'entregue',origem:'App Kalunga',loja:'0109 · Salvador S. Bela Vista',
  say:'Entregue em 12/10, mas a cliente tinha pedido o cancelamento antes.',sub:'Cancelamento pedido às 17:44 e entrega feita às 18:55. Ninguém barrou o pedido.',ic:'fa-exclamation',col:'#f39c12',pill:['amber','Entrega contestada'],prev:'Entregue 12/10',
  src:[['Loja','Entregue'],['Site','Entregue'],['Loggi','Entregue · pacote 568882354']],
  tl:[['12/10 13:32','Site','Compra pelo app · Entrega da Loja'],['12/10 18:55','Loggi','Entregue · pacote 568882354']],
  entrega:[['Endereço','R. Exemplo, 63 · Garcia · Salvador/BA'],['Loja de saída','0109 · S. Bela Vista'],['Entregador','Loggi · pacote 568882354']],
  itens:[['439878','Mochila para notebook (exemplo)',1,289.90]],pag:'Cartão de crédito 1x'},
'22618982':{cli:'c4',kom:'22618982',nf:'—',data:'03/10/2026',total:1249,mod:'pick',carrier:'—',state:'cancelado',origem:'Site Kalunga',loja:'0074 · Rio Guanabara Barra',
  say:'Cancelado na loja em 15/10. O estorno está com o Financeiro.',sub:'Atenção: o site ainda mostra "Pronto para retirada".',ic:'fa-ban',col:'#777',pill:['grey','Cancelado'],prev:'—',
  src:[['ERP','Cancelado'],['Site','Pronto para retirada (desatualizado)'],['Loja','Devolvido ao estoque']],
  tl:[['03/10','Site','Compra aprovada · retirada na loja 0074'],['03/10','ERP','Faturado no CPF'],['04/10','Loja','Separado · cliente avisado'],['15/10 18:16','Loja','Devolvido ao estoque · carta de estorno 3185195']],
  entrega:[['Loja de retirada','0074 · Guanabara · Barra da Tijuca']],
  itens:[['220293','Impressora multifuncional HP Smart Tank 724',1,1249]],pag:'Cartão de crédito 3x'},
'22015071':{cli:'c5',kom:'22015071',nf:'—',data:'06/05/2026',total:459.90,mod:'pick',carrier:'—',state:'aguardando_retirada',origem:'Site Kalunga',loja:'0107 · Uberlândia Center',
  say:'Nunca foi retirado. O cliente pediu o cancelamento por e-mail em 21/08.',sub:'O e-mail levou 56 dias para virar protocolo.',ic:'fa-shopping-bag',col:'#dd4b39',pill:['grey','Não retirado'],prev:'Prazo vencido',
  src:[['ERP','Faturado'],['Site','Pronto para retirada'],['Loja','Aguardando cliente']],
  tl:[['06/05','Site','Compra aprovada · retirada na loja 0107'],['07/05','Loja','Separado · cliente avisado'],['21/08 13:27','E-mail','Cliente pede cancelamento e estorno']],
  entrega:[['Loja de retirada','0107 · Uberlândia Center']],
  itens:[['330145','Fragmentadora de papel (exemplo)',1,459.90]],pag:'Cartão de crédito 1x'},
'22700145':{cli:'c6',kom:'22700145',nf:'16045120',data:'10/10/2026',total:538.70,mod:'cd',carrier:'Jadlog',state:'atrasado',origem:'Site Kalunga',loja:'CD',
  say:'Atrasado há 1 dia. A previsão era 15/10 e o pedido ainda está em transferência.',sub:'Último evento: em transferência para Campinas (16/10 07:10).',ic:'fa-truck',col:'#f39c12',pill:['blue','Em transporte'],prev:'Era 15/10',atraso:['amber',1],
  src:[['ERP','Faturado'],['Site','Em transporte'],['Jadlog','Em transferência · Campinas']],
  tl:[['10/10','ERP','Compra aprovada · Pix'],['11/10','ERP','Faturado · NF 16045120'],['11/10','Jadlog','Coletado no CD'],['16/10 07:10','Jadlog','Em transferência para Campinas']],
  entrega:[['Endereço','R. Exemplo, 900 · Cambuí · Campinas/SP'],['Transportadora','Jadlog Logística'],['Frete','R$ 19,90']],
  itens:[['315760','Cadeira gamer PlayStation PA4D XL preta',1,449.90],['671714','Teclado e mouse sem fio TC212 Multi',1,68.90]],pag:'Pix'},
'22698870':{cli:'c6',kom:'22698870',nf:'—',data:'30/09/2026',total:89.70,mod:'pick',carrier:'—',state:'retirado',origem:'Site Kalunga',loja:'0042 · Campinas Iguatemi',
  say:'Retirado pela cliente na loja em 02/10.',sub:'Pedido concluído, sem pendências.',ic:'fa-check',col:'#00a65a',pill:['green','Retirado'],prev:'Retirado 02/10',
  src:[['ERP','Faturado'],['Site','Retirado'],['Loja','Entregue ao cliente']],
  tl:[['30/09','Site','Compra aprovada · retirada na loja 0042'],['01/10','Loja','Separado · cliente avisado'],['02/10 17:20','Loja','Retirado pelo cliente']],
  entrega:[['Loja de retirada','0042 · Iguatemi Campinas']],
  itens:[['700812','Caderno universitário 10 matérias (exemplo)',3,29.90]],pag:'Cartão de débito'},
'21987400':{cli:'c7',kom:'21987400',nf:'—',data:'05/09/2026',total:189.90,mod:'pick',carrier:'—',state:'cancelado',origem:'Site Kalunga',loja:'Loja Lorena (exemplo)',
  say:'Cancelado em 15/09. O cliente ainda espera o comprovante do reembolso via Pix.',sub:'Pedido ao Financeiro feito por e-mail em 08/10, sem resposta.',ic:'fa-ban',col:'#777',pill:['grey','Cancelado'],prev:'—',
  src:[['ERP','Cancelado'],['Site','Cancelado'],['Loja','Devolvido ao estoque']],
  tl:[['05/09','Site','Compra aprovada · Pix · retirada'],['15/09','Loja','Cancelado e devolvido ao estoque']],
  entrega:[['Loja de retirada','Lorena (exemplo)']],
  itens:[['412200','Calculadora financeira (exemplo)',1,189.90]],pag:'Pix'}
};

const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const parseD=s=>{const[d,m,y]=s.split(' ')[0].split('/');return new Date(+y,+m-1,+d)};
const fmtD=d=>d.toLocaleDateString('pt-BR');
const now=()=>fmtD(TODAY)+' '+new Date().toTimeString().slice(0,5);
const daysOpen=p=>Math.round((TODAY-parseD(p.ab))/864e5);
const isOpen=p=>!['Encerrado','Resolvido no atendimento','Finalizado'].includes(p.status);
const protosOf=n=>PROTOS.filter(p=>p.ped===n);
const ordersOf=c=>Object.keys(ORDERS).filter(n=>ORDERS[n].cli===c);
const maskDoc=d=>d;

function delayLvl(o){return o.atraso?(o.atraso[0]==='red'?2:1):0}
function delayTag(o){if(!o.atraso)return '';const [l,d]=o.atraso;return `<span class="pill ${l==='red'?'dred':'damber'}"><i class="fa fa-clock-o"></i> Pedido atrasado há ${d} dia${d>1?'s':''}</span>`}

const TY={rem:['Remetido ao Pós-Venda','#e67e22'],cli:['Contato do cliente','#0073b7'],env:['Pós-Venda acionou','#605ca8'],ret:['Retorno do responsável','#00a65a'],int:['Nota interna','#777'],sis:['Sistema','#f39c12'],fim:['Encerramento','#111']};
function histHTML(p,limit){const L=p.tram.slice().reverse(),shown=limit?L.slice(0,limit):L;
 return `<ul class="hist">${shown.map(([d,q,t,c,x])=>`<li><div class="av" style="background:${TY[t][1]}">${esc(q[0])}</div><div class="bub"><div class="meta"><span class="ty" style="background:${TY[t][1]}">${TY[t][0]}</span><b>${esc(q)}</b><span>${d}</span><span>via ${esc(c)}</span></div>${esc(x)}</div></li>`).join('')}</ul>`}

const EXTRA={
 '67537740':{stt:'Na transportadora',fones:'(11) 94598-5752 · (11) 4995-6381',deveria:'10/10',steps:[['Analisando pagamento','05/10 16:07'],['NFe 16032665','05/10 16:11'],['Separado','05/10 17:23'],['Transportadora','05/10 22:20'],['Saiu para entrega',null],['Pedido entregue',null]]},
 '67509350':{stt:'Entregue',fones:'(16) 99407-7631',deveria:'22/09',entregue:'30/09',steps:[['Analisando pagamento','15/09 10:02'],['NFe 16001739','16/09 08:40'],['Separado','16/09 11:15'],['Transportadora','17/09 19:30'],['Saiu para entrega','22/09 07:50'],['Pedido entregue','30/09 14:12']]},
 '22633366':{stt:'Entregue',fones:'(71) 99300-1907',deveria:'12/10',entregue:'12/10',steps:[['Pagamento aprovado','12/10 13:32'],['Separado na loja','12/10 15:10'],['Saiu com entregador','12/10 16:40'],['Pedido entregue','12/10 18:55']]},
 '22618982':{stt:'Cancelado',fones:'(21) 91199-5791',cancel:'15/10',steps:[['Pagamento aprovado','03/10 09:12'],['Separado na loja','04/10 10:30'],['Pronto para retirada','04/10 10:31'],['Retirado',null]]},
 '22015071':{stt:'Aguardando retirada',fones:'(34) 93565-1658',retirar:'21/05',steps:[['Pagamento aprovado','06/05 18:20'],['Separado na loja','07/05 09:44'],['Pronto para retirada','07/05 09:45'],['Retirado',null]]},
 '22700145':{stt:'Na transportadora',fones:'(19) 91389-4410',deveria:'15/10',steps:[['Analisando pagamento','10/10 11:02'],['NFe 16045120','11/10 08:30'],['Separado','11/10 10:12'],['Transportadora','11/10 18:40'],['Saiu para entrega',null],['Pedido entregue',null]]},
 '22698870':{stt:'Retirado',fones:'(19) 99639-4410',steps:[['Pagamento aprovado','30/09 15:20'],['Separado na loja','01/10 09:05'],['Pronto para retirada','01/10 09:06'],['Retirado','02/10 17:20']]},
 '67431409':{stt:'Na transportadora',fones:'(11) 93213-8825',deveria:'05/08',steps:[['Analisando pagamento','29/07 00:12'],['NFe 15917425','29/07 01:30'],['Separado','29/07 04:09'],['Transportadora','29/07 22:41'],['Saiu para entrega',null],['Pedido entregue',null]]},
 '21987400':{stt:'Cancelado',fones:'(12) 96113-3365',cancel:'15/09',steps:[['Pagamento aprovado','05/09 12:00'],['Separado na loja','06/09 09:30'],['Pronto para retirada','06/09 09:31'],['Retirado',null]]}};
Object.entries(EXTRA).forEach(([k,v])=>Object.assign(ORDERS[k],v));

function transpOf(o){return o.mod==='cd'?o.carrier:o.mod==='loja'?'Loja · '+o.carrier:'Retirada na loja'}
function orderRowHTML(ped,btn){const o=ORDERS[ped],op=protosOf(ped).filter(isOpen);
 return `<div class="orow"><div><span>Data do pedido</span><b>${o.data}</b></div><div><span>Origem</span><b>${o.origem}</b></div><div><span>Pedido</span><b>${ped}${o.kom!==ped?' / '+o.kom:''}</b></div><div><span>Total</span><b>${money(o.total)}</b></div><div><span>Entrega</span><b>${transpOf(o)}</b></div><div><span>Status</span><b>${o.stt}</b></div>
  <div class="oend">${delayTag(o)}${op.length?`<span class="pill amber"><i class="fa fa-folder-open-o"></i> Protocolo ${op[0].num}</span>`:''}${btn||''}</div></div>`}
function stepperHTML(o){const st=o.steps,last=st.reduce((a,s,i)=>s[1]?i:a,-1),cancel=o.cancel;
 let right='';
 if(cancel)right=`<span class="dl red">Cancelado em <b>${cancel}</b></span>`;
 else if(o.entregue)right=o.deveria&&o.deveria!==o.entregue?`<span class="dl">Entregue em <b>${o.entregue}</b> · deveria chegar em <b class="r">${o.deveria}</b></span>`:`<span class="dl">Entregue em <b>${o.entregue}</b></span>`;
 else if(o.deveria)right=`<span class="dl">Deveria chegar em <b class="${o.atraso?'r':''}">${o.deveria}</b></span>`;
 else if(o.retirar)right=`<span class="dl">Retirar até <b class="r">${o.retirar}</b></span>`;
 return `<div class="stepper" style="--n:${st.length}">${st.map((s,i)=>`<div class="stp ${s[1]?'on':''} ${i<=last?'past':''} ${cancel&&i===last+1?'x':''}"><i class="c">${s[1]?'<i class="fa fa-check"></i>':cancel&&i===last+1?'<i class="fa fa-times"></i>':''}</i><b>${s[0]}</b><small>${s[1]||(cancel&&i===last+1?'cancelado':'')}</small></div>`).join('')}</div><div class="steprt">${right}</div>`}
function orderMainHTML(ped,extra,compact){const o=ORDERS[ped];
 return `<div class="card omain">${orderRowHTML(ped)}<div class="ostep">${stepperHTML(o)}</div>
  ${compact?'<div style="height:10px"></div>':''}<div ${compact?'hidden':''} class="osay" style="border-left-color:${o.col}"><i class="fa ${o.ic}" style="color:${o.col}"></i><div><b>${o.say}</b><span>${o.sub}</span></div></div>${extra||''}</div>`}
function orderInfoHTML(o,ped){const tot=o.itens.reduce((a,i)=>a+i[2]*i[3],0);
 return `<div class="card"><details class="more" style="border:0"><summary><span><i class="fa fa-info-circle" style="color:#888"></i> Mais informações do pedido <span class="soft" style="font-weight:400">· produtos, endereço, pagamento, ocorrências</span></span></summary><div class="infogrid">
  <section class="wide"><h3>Informações do pedido</h3><table class="tb"><thead><tr><th>Produto</th><th>Qtd</th><th>Preço unit.</th><th>Preço total</th></tr></thead><tbody>${o.itens.map(([c,d,q,v])=>`<tr><td>${c} · ${esc(d)}</td><td>${q}</td><td>${money(v)}</td><td>${money(v*q)}</td></tr>`).join('')}<tr><td colspan="3" class="r">Frete</td><td>${money(Math.max(0,o.total-tot))}</td></tr><tr><td colspan="3" class="r"><b>Total da compra</b></td><td><b>${money(o.total)}</b></td></tr></tbody></table><div class="soft" style="font-size:11.5px;margin-top:4px">Produtos e valores ilustrativos.</div></section>
  <section><h3>${o.mod==='pick'?'Loja de retirada':'Endereço de entrega'}</h3><dl class="kv2">${o.entrega.map(([k,v])=>`<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl></section>
  <section><h3>Forma de pagamento</h3><dl class="kv2"><dt>Forma</dt><dd>${o.pag}</dd><dt>Valor</dt><dd>${money(o.total)}</dd></dl></section>
  <section><h3>Ocorrências</h3><table class="tb"><thead><tr><th>Data</th><th>Descrição</th><th>Origem</th></tr></thead><tbody>${o.tl.slice().reverse().map(([d,s,t])=>`<tr><td>${d}</td><td>${esc(t)}</td><td><span class="s" style="background:${SRC[s]||'#999'}">${s}</span></td></tr>`).join('')}</tbody></table></section>
  <section><h3>Situação em cada sistema</h3><dl class="kv2">${o.src.map(([s,v])=>`<dt>${s}</dt><dd>${esc(v)}</dd>`).join('')}</dl></section></div></details></div>`}
