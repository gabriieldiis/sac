/* Pedidos de exemplo: vários volumes e estorno de outro pedido. */
/* ================= pedidos de exemplo: vários volumes e estorno de outro pedido ================= */
Object.assign(ORDERS,{
'22671530':{cli:'c4',kom:'22671530',nf:'16012877',data:'20/09/2026',total:389.70,mod:'cd',carrier:'Loggi',state:'entregue',origem:'Site Kalunga',loja:'CD',say:'Entregue em 25/09. Devolvido ao CD em 02/10.',sub:'',ic:'fa-check',col:'#00a65a',pill:['green','Entregue'],prev:'Entregue 25/09',src:[],
 tl:[['20/09','ERP','Compra aprovada · Pix'],['21/09','ERP','Faturado · NF 16012877'],['25/09','Loggi','Entregue'],['02/10','ERP','Devolução recebida no CD · estorno solicitado']],
 entrega:[['Endereço','R. Exemplo, 88 · Barra da Tijuca · Rio de Janeiro/RJ'],['Transportadora','Loggi (L4B Logística)']],itens:[['671714','Teclado e mouse sem fio TC212 Multi',3,129.90]],pag:'Pix',
 stt:'Entregue',fones:'(21) 92407-5791',deveria:'26/09',entregue:'25/09',steps:[['Pagamento aprovado','20/09 10:15'],['NFe 16012877','21/09 08:02'],['Separado','21/09 09:40'],['Transportadora','21/09 18:10'],['Saiu para entrega','25/09 07:30'],['Pedido entregue','25/09 15:12']]},
'67612450':{cli:'c5',kom:'22655871',nf:'16051230',data:'01/10/2026',total:4512.30,mod:'cd',carrier:'Jadlog',state:'atrasado',origem:'Televendas',loja:'CD',say:'Entrega parcial: 5 de 9 volumes entregues.',sub:'1 volume sem movimentação desde 08/10.',ic:'fa-clock-o',col:'#dd4b39',pill:['blue','Entrega parcial'],prev:'Era 09/10',atraso:['red',7],src:[],
 tl:[['01/10','ERP','Compra aprovada · boleto faturado'],['02/10','ERP','Faturado · NF 16051230 · 9 volumes'],['02/10','Jadlog','Coletado no CD · 9 volumes'],['10/10','Jadlog','5 volumes entregues'],['16/10','Jadlog','1 volume saiu para entrega']],
 entrega:[['Endereço','Av. Exemplo, 1500 · Sala 3 · Centro · Uberlândia/MG'],['Transportadora','Jadlog Logística']],
 itens:[['315760','Cadeira gamer PlayStation PA4D XL preta',4,739.80],['220293','Impressora multifuncional HP Smart Tank 724',1,1249],['671714','Teclado e mouse sem fio TC212 Multi',2,129.90],['614174','Lixa massa e madeira 800-120 Tigre FL',10,0.80]],pag:'Boleto faturado 28 dias',
 stt:'Entrega parcial',fones:'(34) 93565-1658',deveria:'09/10',steps:[['Analisando pagamento','01/10 14:20'],['NFe 16051230','02/10 08:10'],['Separado','02/10 11:35'],['Transportadora','02/10 19:40'],['Saiu para entrega','10/10 07:15'],['Pedido entregue',null]]}});
VOL['22671530']='LG5601238871';
const VOLS={'67612450':[
 ['01516480011BR','ent','10/10 14:02','Cadeira gamer (1/4)'],['01516480012BR','ent','10/10 14:02','Cadeira gamer (2/4)'],['01516480013BR','ent','10/10 14:02','Cadeira gamer (3/4)'],['01516480014BR','tr','12/10 09:40','Cadeira gamer (4/4)'],
 ['01516480015BR','ent','10/10 14:05','Impressora HP'],['01516480016BR','ent','10/10 14:05','Teclado e mouse (2 un.)'],['01516480017BR','sai','16/10 07:20','Lixas (10 un.)'],['01516480018BR','tr','13/10 18:02','Manual e acessórios'],['01516480019BR','par','08/10 22:15','Caixa avulsa']]};
VOL['67612450']=VOLS['67612450'][0][0];
const VST={ent:['Entregue','green','fa-check'],tr:['Em trânsito','blue','fa-truck'],sai:['Saiu para entrega','blue','fa-road'],par:['Sem movimentação','red','fa-exclamation-triangle']};
function volBoxHTML(o,ped){const L=VOLS[ped],n=L.length,ent=L.filter(v=>v[1]==='ent').length,par=L.filter(v=>v[1]==='par').length,u=trackURL(o),late=false,lim=4;
 const row=(v,i)=>`<li class="vl-${v[1]}${i>=lim?' vmore':''}"><b class="vl-n">${v[0]}</b><span class="vl-m"><span class="pill ${VST[v[1]][1]}"><i class="fa ${VST[v[1]][2]}"></i> ${VST[v[1]][0]}</span><span class="vl-d">${v[2]}</span><span class="vl-x">${esc(v[3])}</span></span><button type="button" class="ske-b" data-cpv="${v[0]}" title="Copiar o nº do volume" aria-label="Copiar o volume ${v[0]}"><i class="fa fa-copy"></i></button></li>`;
 const ord=[...L].sort((a,b)=>['par','tr','sai','ent'].indexOf(a[1])-['par','tr','sai','ent'].indexOf(b[1]));
 return `<div class="dbox track vbox"><i class="fa fa-cubes"></i><div>
  <b>${ent===n?'Todos os volumes entregues':`Entrega parcial: ${ent} de ${n} volumes entregues`}</b><span>Transportadora ${esc(o.carrier)} · confira a situação de cada volume no rastreio${par?` · <b class="st-bad">${par} sem movimentação</b>`:''}</span>
  <div class="vprog" role="img" aria-label="${ent} de ${n} volumes entregues">${L.map(v=>`<i class="vp-${v[1]}"></i>`).join('')}</div>
  <ul class="vlist${S.vAll?' all':''}">${ord.map(row).join('')}</ul>
  <div class="dbtns">${n>lim?`<button type="button" class="lnk" data-vall>${S.vAll?'Mostrar menos':`Ver os ${n} volumes`}</button>`:''}${u?`<a class="gbtn sm trk" href="${u}" target="_blank" rel="noopener"><i class="fa fa-external-link"></i> Rastrear na ${esc(o.carrier)}</a>`:''}<button type="button" class="lbtn sm" data-cpall="${L.map(v=>v[0]).join(' ')}"><i class="fa fa-copy"></i> Copiar os ${n} volumes</button></div></div></div>`}
document.addEventListener('click',e=>{const a=e.target.closest('[data-vall]');if(a){S.vAll=!S.vAll;const y=scrollY;render();scrollTo(0,y)}const c=e.target.closest('[data-cpall]');if(c)copyTxt(c.dataset.cpall.replace(/ /g,'\n'),'Volumes copiados')});
/* protocolos de exemplo: cada um no pedido certo */
(()=>{const a=PROTOS.find(p=>p.num==='6891950');if(a)a.ped='22671530';const b=PROTOS.find(p=>p.num==='6890215');if(b)b.ped=null})();
