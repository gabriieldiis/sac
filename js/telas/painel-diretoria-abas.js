/* Painel da diretoria: abas e análises extras (pedido e entrega, produtos, clientes, equipe, Pós-Venda).
   Os campos marcados como "ERP" vêm do pedido: aqui são simulados; no sistema real o protocolo guarda o nº do pedido
   e o ERP entrega modalidade, transportadora, loja, UF, origem, pagamento, itens e valor. */

const DTABS=[
 ['geral','fa-dashboard','Visão geral',''],
 ['assuntos','fa-list-ol','Assuntos e tópicos',''],
 ['pedidos','fa-truck','Pedidos e entrega','erp'],
 ['produtos','fa-cube','Produtos e valores','erp'],
 ['clientes','fa-user','Clientes',''],
 ['equipe','fa-users','Equipe',''],
 ['posvenda','fa-hourglass-half','Pós-Venda','']];

/* rótulos dos filtros extras (clique nas barras para filtrar) */
const DFX={mod:'Modalidade',car:'Transportadora',loja:'Loja',uf:'Estado',orig:'Origem da compra',pag:'Pagamento',cat:'Categoria',tipo:'Tipo de cliente',resp:'Responsável no Pós-Venda'};
const MODL={cd:'Entrega pelo CD',loja:'Super Expressa (loja)',pick:'Retirada na loja'};

const DX={
 mod:[['cd',70],['loja',14],['pick',16]],
 car:[['Jadlog',42],['Loggi',30],['Correios',18],['Total Express',10]],
 lojas:[['0021 · Av. Paulista',14],['0003 · Mooca',12],['0012 · Vila Mariana',10],['0074 · Barra da Tijuca',9],['0045 · Campinas Iguatemi',8],['0031 · Santo André',6],['0109 · Salvador Bela Vista',6],['0107 · Uberlândia Center',5],['0056 · Curitiba Batel',5],['0088 · BH Savassi',5]],
 uf:[['SP',52],['RJ',11],['MG',9],['PR',5],['BA',4],['RS',4],['SC',3],['DF',3],['GO',2.5],['PE',2.5],['ES',1.5],['CE',1.5],['Outros',3]],
 orig:[['Site',52],['App',24],['Televendas',14],['Loja física',10]],
 pag:[['Cartão de crédito',58],['Pix',24],['Boleto',10],['Boleto faturado (PJ)',6],['Cartão de débito',2]],
 cat:[['Informática',26],['Impressão e suprimentos',14],['Papelaria',18],['Material escolar',14],['Eletrônicos',10],['Móveis de escritório',10],['Mochilas e bolsas',8]],
 resp:[['Vitória B.',1.2],['Amanda V.',1],['Bianca A.',0.9],['Renato L.',0.8]]};
const DPROD={
 'Informática':[['Notebook 15,6" (exemplo)',3],['Mouse sem fio (exemplo)',2],['Teclado e mouse sem fio TC212 Multi',2],['Monitor 24" (exemplo)',1.5],['SSD 480 GB (exemplo)',1]],
 'Impressão e suprimentos':[['Impressora multifuncional HP Smart Tank 724',3],['Cartucho de tinta preto (exemplo)',2],['Papel sulfite A4 500 folhas (exemplo)',2],['Toner (exemplo)',1]],
 'Papelaria':[['Caderno universitário 10 matérias (exemplo)',2],['Caneta esferográfica cx. 50 (exemplo)',1.5],['Agenda 2027 (exemplo)',1],['Lixa massa e madeira 800-120 Tigre FL',0.6]],
 'Material escolar':[['Kit material escolar (exemplo)',3],['Estojo escolar (exemplo)',1],['Lápis de cor 36 cores (exemplo)',1]],
 'Eletrônicos':[['Fone de ouvido bluetooth (exemplo)',2],['Calculadora científica (exemplo)',1.5],['Carregador portátil (exemplo)',1]],
 'Móveis de escritório':[['Cadeira gamer PlayStation PA4D XL preta',2.5],['Cadeira de escritório (exemplo)',2],['Mesa para escritório (exemplo)',1]],
 'Mochilas e bolsas':[['Mochila para notebook (exemplo)',3],['Mochila escolar com rodinhas (exemplo)',1.5]]};
const DOUT=['Cliente pediu orçamento para empresa','Dúvida sobre programa de pontos','Pergunta sobre vaga de emprego','Pedido de doação para escola','Reclamação do estacionamento da loja','Dúvida sobre nota fiscal de serviço (Copy & Print)','Quer trocar presente sem nota','Pergunta sobre horário de loja em feriado','Cliente quer cadastrar outro endereço de cobrança','Elogio ao entregador'];
/* assuntos que movimentam dinheiro (estorno, cancelamento, abatimento, devolução) */
const DMONEY=/estorno|cancelamento|abatimento|devolu/i;
const DLATE=/atraso|perda|extravio|prazo/i,DDELIV=/reconhece|afirma que entregou/i,DDMG=/avaria/i;

function enrichDS(rows){const R=mulberry(7717),pick=w=>{const s=w.reduce((a,x)=>a+x[1],0);let r=R()*s;for(const x of w){r-=x[1];if(r<=0)return x[0]}return w[w.length-1][0]};
 rows.forEach(x=>{const a=AS[x.as]||{p:'n'},sub=x.sub||'';
  const pj=R()<(/fatura|boleto|xml/i.test(x.as)?0.6:0.14);x.tipo=pj?'Pessoa jurídica':'Pessoa física';
  x.cli=pj?'J'+Math.floor(Math.pow(R(),2.4)*900):'F'+Math.floor(Math.pow(R(),2.1)*7000);
  if(x.rem)x.resp=pick(DX.resp);
  if(x.as==='Outros'||sub==='Outro')x.outTxt=DOUT[Math.floor(Math.pow(R(),1.4)*DOUT.length)];
  const hasPed=a.p==='x'||(a.p==='o'&&R()<0.5);if(!hasPed)return;
  x.mod=x.as==='Retirada em loja'?'pick':x.as==='Entrega da Loja'?'loja':pick(DX.mod);
  if(x.mod==='cd'){const w=DX.car.map(([c,v])=>[c,v*(DLATE.test(sub)&&/Jadlog|Correios/.test(c)?1.8:1)*(DDELIV.test(sub)&&c==='Loggi'?2.2:1)*(DDMG.test(x.as+sub)&&c==='Total Express'?2:1)]);x.car=pick(w);x.loja='CD'}
  else{x.car=x.mod==='loja'?(R()<0.75?'Loggi':'Entregador da loja'):'—';x.loja=pick(DX.lojas)}
  x.uf=x.mod==='cd'?pick(DX.uf):/Salvador/.test(x.loja)?'BA':/Barra/.test(x.loja)?'RJ':/Uberl|BH/.test(x.loja)?'MG':/Curitiba/.test(x.loja)?'PR':'SP';
  x.orig=x.mod==='pick'&&R()<0.3?'App':pick(DX.orig);
  x.pag=pj&&R()<0.5?'Boleto faturado (PJ)':pick(DX.pag.filter(p=>pj||!/PJ/.test(p[0])));
  x.cat=pick(DX.cat);x.prod=pick(DPROD[x.cat]);
  x.val=Math.round(Math.exp(5.3+((R()+R()+R())/3-0.5)*5.4)*(pj?2.4:1)*100)/100;
  if(DMONEY.test(x.as))x.mon=Math.round(x.val*(/abatimento/i.test(x.as)?0.15+R()*0.2:1)*100)/100});
 return rows}

/* linha viva (protocolo registrado nesta sessão) ganha os dados do pedido real do protótipo */
function enrichLive(x,p){const o=p.ped&&ORDERS[p.ped],c=p.cli?CLIENTES[p.cli]:p.cliNovo;
 x.tipo=c&&digits(c.doc).length===14?'Pessoa jurídica':'Pessoa física';x.cli='S'+(p.cli||digits(c?.doc||''));
 if(!o)return x;const it=o.itens[0];
 Object.assign(x,{mod:o.mod,car:o.carrier,loja:o.mod==='cd'?'CD':o.loja,uf:(Object.fromEntries(o.entrega)['Endereço']||'').match(/\/([A-Z]{2})\b/)?.[1]||'SP',orig:o.origem.replace('Site Kalunga','Site').replace('App Kalunga','App'),pag:/boleto fat/i.test(o.pag)?'Boleto faturado (PJ)':/boleto/i.test(o.pag)?'Boleto':/pix/i.test(o.pag)?'Pix':'Cartão de crédito',cat:'Informática',prod:it?it[1]:'—',val:o.total});
 if(DMONEY.test(x.as))x.mon=o.total;return x}

const dfxOk=r=>Object.entries(DQ.fx||{}).every(([k,v])=>!v||r[k]===v);
const lblFx=(k,v)=>k==='mod'?MODL[v]||v:v;

/* ---------- moldura das abas ---------- */
function dashTabsHTML(card){const t=DQ.tab||'geral',erp=DTABS.find(x=>x[0]===t)[3]==='erp';
 const fx=Object.entries(DQ.fx||{}).filter(([,v])=>v);
 const bar=`<div class="dtabs" role="tablist" aria-label="Seções do painel">${DTABS.map(([k,ic,l,src])=>`<button type="button" role="tab" aria-selected="${t===k}" data-dtab="${k}"><i class="fa ${ic}"></i> ${l}${src?' <span class="dsrc">ERP</span>':''}</button>`).join('')}</div>`;
 const chips=fx.length?`<div class="dchips"><span class="soft">Filtrando por</span>${fx.map(([k,v])=>`<button type="button" class="dchip" data-fxx="${k}">${DFX[k]}: <b>${esc(lblFx(k,v))}</b> <i class="fa fa-times"></i></button>`).join('')}</div>`:'';
 const note=erp?`<div class="hint dnote-erp"><i class="fa fa-plug"></i><span>Estes números vêm do <b>pedido no ERP</b> e estão simulados no protótipo. No sistema real, o protocolo guarda o nº do pedido e o ERP precisa entregar: modalidade, transportadora, loja, estado de entrega, origem da compra, forma de pagamento, itens e valor.</span></div>`:'';
 const C={
  geral:[card('dia','fa-line-chart','Protocolos por dia','Resolvidos no atendimento e remetidos ao Pós-Venda','','w2'),card('ca','fa-phone','Canais de contato','Por onde o cliente falou · clique para filtrar',''),card('as','fa-list-ol',DQ.as?'Tópicos mais abertos de '+esc(DQ.as):'Assuntos mais abertos',DQ.as?'Quantidade no período':'Clique num assunto para filtrar o painel inteiro',''),card('hm','fa-th','Quando os protocolos são abertos','Dia da semana × hora · quanto mais escuro, mais protocolos','','w2')],
  assuntos:[card('as','fa-list-ol',DQ.as?'Tópicos mais abertos de '+esc(DQ.as):'Assuntos mais abertos',DQ.as?'Quantidade no período':'Clique num assunto para ver os tópicos dele',''),card('tas','fa-clock-o','Tempo para registrar por assunto','Média do assunto até o protocolo salvo · linha = média geral',''),card('ast','fa-sitemap','Assunto e tópico','Os pares mais registrados, com o quanto vai para o Pós-Venda','','w2'),card('rea','fa-repeat','Remetidos novamente por assunto','% dos remetidos em que o cliente voltou a reclamar',''),card('out','fa-pencil-square-o','O que foi escrito em "Outros"','Candidatos a virar assunto ou tópico novo','')],
  pedidos:[card('mod','fa-random','Modalidade de entrega','CD, Super Expressa ou Retirada · clique para filtrar',''),card('car','fa-truck','Transportadoras','Protocolos com entrega pelo CD · clique para filtrar',''),card('carm','fa-exclamation-triangle','Motivo por transportadora','Quantos protocolos de cada tipo de problema cada transportadora gerou','','w2'),card('loja','fa-building','Lojas','Super Expressa e Retirada · clique para filtrar',''),card('uf','fa-map-marker','Estado de entrega','Onde estão os clientes que reclamam · clique para filtrar',''),card('orig','fa-shopping-cart','Origem da compra','Site, App, Televendas ou loja física',''),card('pag','fa-credit-card','Forma de pagamento','Como o pedido foi pago','')],
  produtos:[card('val','fa-money','Dinheiro envolvido','Estornos, cancelamentos, abatimentos e devoluções no período','','w2',true),card('cat','fa-tags','Categorias com mais protocolos','Clique para filtrar',''),card('prod','fa-cube','Produtos mais citados','Item principal do pedido do protocolo',''),card('tick','fa-shopping-basket','Valor dos pedidos com protocolo','Quantos protocolos por faixa de valor do pedido','','w2')],
  clientes:[card('tipo','fa-id-card-o','Pessoa física ou jurídica','Clique para filtrar',''),card('rein','fa-refresh','Clientes que voltaram','Quantos protocolos cada cliente abriu no período',''),card('topc','fa-user-plus','Clientes com mais protocolos','Quem mais procurou o SAC no período','','w2')],
  equipe:[card('at','fa-users','Atendentes','Quem registrou, quanto tempo levou e quanto foi para o Pós-Venda','','w2'),card('resp','fa-user-circle','Responsáveis no Pós-Venda','Concluídos, prazo médio e o que ainda está aberto','','w2')],
  posvenda:[card('pv','fa-hourglass-half','Quanto tempo o Pós-Venda leva para concluir','Protocolos concluídos no período · prazo de 7 dias (Decreto 11.034/2022)',''),card('age','fa-inbox','Em aberto agora, por idade','Protocolos ainda no Pós-Venda',''),card('pva','fa-tasks','Prazo médio no Pós-Venda por assunto','Linha = prazo de 7 dias','','w2')]}[t];
 return bar+chips+note+(t==='geral'?'%INS%':'')+`<div class="dgrid">${C.join('')}</div>`}

/* ---------- desenho de cada cartão ---------- */
function dashDraws(cur,prev,K,from,to){const w=r=>r.filter(x=>x.mod);
 return {dia:()=>drawLine(cur,from,to),as:()=>drawAs(cur,prev),tas:()=>drawTas(cur,K),at:()=>drawAt(cur),pv:()=>drawPv(cur),ca:()=>drawCa(cur),hm:()=>drawHm(cur),
  ast:()=>drawAst(cur),rea:()=>drawRea(cur),out:()=>drawOut(cur),
  mod:()=>drawDim('mod',w(cur),w(prev),{lbl:v=>MODL[v]||v}),car:()=>drawDim('car',cur.filter(x=>x.mod==='cd'),prev.filter(x=>x.mod==='cd')),carm:()=>drawCarm(cur),
  loja:()=>drawDim('loja',cur.filter(x=>x.mod&&x.mod!=='cd'),prev.filter(x=>x.mod&&x.mod!=='cd')),uf:()=>drawDim('uf',w(cur),w(prev)),orig:()=>drawDim('orig',w(cur),w(prev)),pag:()=>drawDim('pag',w(cur),w(prev)),
  val:()=>drawVal(cur,prev),cat:()=>drawDim('cat',w(cur),w(prev)),prod:()=>drawProd(cur),tick:()=>drawTick(cur),
  tipo:()=>drawDim('tipo',cur,prev),rein:()=>drawRein(cur),topc:()=>drawTopc(cur),
  resp:()=>drawResp(cur),age:()=>drawAge(cur),pva:()=>drawPva(cur)}}

function tblN(head,rows,num){return `<div class="scroll"><table class="tb dtb"><thead><tr>${head.map((h,i)=>`<th${num.includes(i)?' class="num"':''}>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${num.includes(i)?' class="num"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
const money2=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const avgPv=r=>{const d=r.filter(x=>x.pv!==null);return d.length?d.reduce((a,x)=>a+x.pv,0)/d.length:0};

/* barras genéricas por dimensão, com tabela e clique para filtrar */
function drawDim(key,cur,prev,o){o=o||{};const box=$('db-'+key),L=o.lbl||(v=>v),g=grp(cur,key),gp=grp(prev,key),n=cur.length||1;
 if(!cur.length){box.innerHTML='<p class="soft">Nenhum protocolo com pedido neste filtro.</p>';return}
 let it=[...g].map(([k,r])=>({k,label:L(k),v:r.length,s:pf(r.length/n),p:(gp.get(k)||[]).length,rem:r.filter(x=>x.rem).length/r.length,pv:avgPv(r)})).sort((a,b)=>b.v-a.v);
 if(DQ.tbl[key]){box.innerHTML=tblHTML([DFX[key]||'Item','Protocolos','% do total','Período anterior','% remetidos','Prazo médio no Pós-Venda'],it.map(x=>[esc(x.label),nf(x.v),x.s,nf(x.p),pf(x.rem),x.pv?df(x.pv):'—']));return}
 const top=it.slice(0,10),rest=it.slice(10);if(rest.length)top.push({label:`Demais ${rest.length}`,v:rest.reduce((a,x)=>a+x.v,0),s:pf(rest.reduce((a,x)=>a+x.v,0)/n),other:true});
 top.forEach(x=>x.tip=[['','protocolos',nf(x.v)],['','do total',x.s],...(x.other?[]:[['','remetidos ao Pós-Venda',pf(x.rem)],['','no período anterior',nf(x.p)]])]);
 hbars(box,top,{click:DFX[key]?x=>{DQ.fx=Object.assign({},DQ.fx,{[key]:x.k});renderDash()}:null})}

/* assunto × tópico */
function drawAst(cur){const box=$('db-ast'),g=grp(cur,x=>x.as+'|'+x.sub),n=cur.length||1;
 const it=[...g].map(([k,r])=>{const [a,s]=k.split('|');return {a,s,v:r.length,rem:r.filter(x=>x.rem).length/r.length,t:r.reduce((q,x)=>q+x.t,0)/r.length}}).sort((x,y)=>y.v-x.v).slice(0,DQ.tbl.ast?60:15);
 const mx=Math.max(1,...it.map(x=>x.v));
 box.innerHTML=`<div class="scroll"><table class="tb dtb"><thead><tr><th>Assunto</th><th>Tópico</th><th>Protocolos</th><th>% do total</th><th>% remetidos</th><th>Tempo para registrar</th></tr></thead><tbody>${it.map(x=>`<tr><td>${esc(x.a)}</td><td><b>${esc(x.s)}</b></td><td><span class="ib"><span style="width:${(x.v/mx*100).toFixed(1)}%"></span></span><span class="num">${nf(x.v)}</span></td><td class="num">${pf(x.v/n,1)}</td><td class="num">${pf(x.rem)}</td><td class="num">${tf(x.t)}</td></tr>`).join('')}</tbody></table></div><p class="dnote">${DQ.tbl.ast?'Mostrando até 60 pares.':'Mostrando os 15 pares mais registrados. Use "Tabela" para ver mais.'}</p>`}
function drawRea(cur){const box=$('db-rea'),g=grp(cur.filter(x=>x.rem),'as');
 let it=[...g].filter(([,r])=>r.length>=8).map(([k,r])=>({label:k,v:r.filter(x=>x.re).length/r.length,n:r.length})).sort((a,b)=>b.v-a.v);
 if(DQ.tbl.rea){box.innerHTML=tblHTML(['Assunto','% remetidos novamente','Remetidos'],it.map(x=>[esc(x.label),pf(x.v,1),nf(x.n)]));return}
 if(!it.length){box.innerHTML='<p class="soft">Poucos remetidos para comparar.</p>';return}
 it=it.slice(0,10);it.forEach(x=>x.tip=[['','voltaram a reclamar',pf(x.v,1)],['','remetidos no período',nf(x.n)]]);hbars(box,it,{fmt:v=>pf(v,1)})}
function drawOut(cur){const box=$('db-out'),r=cur.filter(x=>x.outTxt),g=grp(r,'outTxt');
 const it=[...g].map(([k,a])=>({label:k,v:a.length})).sort((a,b)=>b.v-a.v);
 if(!it.length){box.innerHTML='<p class="soft">Nenhum atendimento como "Outros" no período.</p>';return}
 if(DQ.tbl.out){box.innerHTML=tblHTML(['Texto escrito pelo atendente','Vezes'],it.map(x=>[esc(x.label),nf(x.v)]));return}
 it.forEach(x=>x.tip=[['','vezes no período',nf(x.v)]]);hbars(box,it.slice(0,10));
 box.insertAdjacentHTML('beforeend','<p class="dnote">Textos repetidos com frequência devem virar assunto ou tópico em <button type="button" class="lnk" data-goadm>Assuntos e tópicos</button>.</p>');
 box.querySelectorAll('[data-goadm]').forEach(b=>b.onclick=()=>go('adm'))}

/* transportadora × motivo (tabela de calor) */
function drawCarm(cur){const box=$('db-carm'),r=cur.filter(x=>x.mod==='cd'),cars=[...new Set(r.map(x=>x.car))];
 const M=[['Atraso / extravio',x=>DLATE.test(x.sub)],['Diz que entregou',x=>DDELIV.test(x.sub)],['Avaria',x=>DDMG.test(x.as+x.sub)],['Falta de volume ou item',x=>/falta|volume/i.test(x.as+x.sub)],['Outros motivos',null]];
 const rows=cars.map(c=>{const a=r.filter(x=>x.car===c),cnt=M.map(([,f],i)=>a.filter(x=>f?f(x):!M.slice(0,-1).some(([,g])=>g(x))).length);return {c,n:a.length,cnt}}).sort((a,b)=>b.n-a.n);
 if(!rows.length){box.innerHTML='<p class="soft">Nenhum protocolo de entrega pelo CD neste filtro.</p>';return}
 const share=(v,n)=>n?v/n:0,mx=Math.max(...rows.flatMap(x=>x.cnt.slice(0,-1).map(v=>share(v,x.n))),0.01);
 box.innerHTML=`<div class="scroll"><table class="tb dtb dheat"><thead><tr><th>Transportadora</th><th>Protocolos</th>${M.map(m=>`<th>${m[0]}</th>`).join('')}</tr></thead><tbody>${rows.map(x=>`<tr><td><b>${esc(x.c)}</b></td><td class="num">${nf(x.n)}</td>${x.cnt.map((v,i)=>{const s=share(v,x.n);return `<td class="num"${i<M.length-1?` style="--a:${(0.05+0.45*s/mx).toFixed(3)}"`:''}>${nf(v)} <small>${pf(s)}</small></td>`}).join('')}</tr>`).join('')}</tbody></table></div>
 <p class="dnote">A cor mostra o peso do motivo dentro de cada transportadora. Para comparar de forma justa, o ideal é dividir pelo total de pedidos entregues por cada uma, um dado que também vem do ERP.</p>`}

/* dinheiro envolvido */
function drawVal(cur,prev){const box=$('db-val'),s=r=>r.reduce((a,x)=>a+(x.mon||0),0),by=(r,re)=>s(r.filter(x=>re.test(x.as))),tot=s(cur),pt=s(prev);
 const B=[['Estornos',/estorno/i],['Cancelamentos',/cancelamento/i],['Devoluções',/devolu/i],['Abatimentos',/abatimento/i]];
 const ped=cur.filter(x=>x.val),tk=ped.length?ped.reduce((a,x)=>a+x.val,0)/ped.length:0;
 box.innerHTML=`<div class="dval"><div class="dv-main"><span>Total envolvido</span><b>${money2(tot)}</b>${pt?`<small class="${tot>pt?'st-bad':'st-ok'}"><i class="fa fa-arrow-${tot>pt?'up':'down'}"></i> ${pf(Math.abs(tot/pt-1))} vs. período anterior</small>`:''}</div>
  ${B.map(([l,re])=>`<div><span>${l}</span><b>${money2(by(cur,re))}</b><small>${nf(cur.filter(x=>x.mon&&re.test(x.as)).length)} protocolos</small></div>`).join('')}
  <div><span>Valor médio do pedido com protocolo</span><b>${money2(tk)}</b><small>${nf(ped.length)} pedidos</small></div></div>`}
function drawProd(cur){const box=$('db-prod'),r=cur.filter(x=>x.prod),g=grp(r,'prod');
 const it=[...g].map(([k,a])=>{const ga=grp(a,'as'),top=[...ga].sort((x,y)=>y[1].length-x[1].length)[0];return {label:k,cat:a[0].cat,v:a.length,top:top?top[0]:'',val:a.reduce((q,x)=>q+(x.mon||0),0)}}).sort((a,b)=>b.v-a.v);
 if(!it.length){box.innerHTML='<p class="soft">Nenhum protocolo com pedido neste filtro.</p>';return}
 if(DQ.tbl.prod){box.innerHTML=tblN(['Produto','Categoria','Protocolos','Assunto mais comum','Dinheiro envolvido'],it.map(x=>[esc(x.label),esc(x.cat),nf(x.v),esc(x.top),money2(x.val)]),[2,4]);return}
 const top=it.slice(0,10);top.forEach(x=>x.tip=[['','protocolos',nf(x.v)],['','categoria',x.cat],['','assunto mais comum',x.top],['','dinheiro envolvido',money2(x.val)]]);hbars(box,top)}
function drawTick(cur){const box=$('db-tick'),r=cur.filter(x=>x.val),B=[[0,50,'até R$ 50'],[50,100,'R$ 50–100'],[100,250,'R$ 100–250'],[250,500,'R$ 250–500'],[500,1000,'R$ 500–1 mil'],[1000,3000,'R$ 1–3 mil'],[3000,1e12,'acima de R$ 3 mil']];
 const it=B.map(([a,b,l])=>({l,v:r.filter(x=>x.val>a&&x.val<=b).length,rem:(()=>{const q=r.filter(x=>x.val>a&&x.val<=b);return q.length?q.filter(x=>x.rem).length/q.length:0})()}));
 if(DQ.tbl.tick){box.innerHTML=tblHTML(['Valor do pedido','Protocolos','% remetidos'],it.map(x=>[x.l,nf(x.v),pf(x.rem)]));return}
 vbars(box,it.map(x=>({l:x.l,v:x.v,tip:[['','protocolos',nf(x.v)],['','remetidos ao Pós-Venda',pf(x.rem)]]})))}

/* clientes */
function drawRein(cur){const box=$('db-rein'),g=grp(cur,'cli'),B=[[1,1,'1 protocolo'],[2,2,'2'],[3,3,'3'],[4,1e9,'4 ou mais']];
 const it=B.map(([a,b,l])=>{const c=[...g.values()].filter(r=>r.length>=a&&r.length<=b);return {l,v:c.length,p:c.reduce((q,r)=>q+r.length,0)}});const tc=g.size||1;
 if(DQ.tbl.rein){box.innerHTML=tblHTML(['Protocolos por cliente','Clientes','% dos clientes','Protocolos'],it.map(x=>[x.l,nf(x.v),pf(x.v/tc),nf(x.p)]));return}
 const rep=it.slice(1).reduce((q,x)=>q+x.v,0);
 vbars(box,it.map((x,i)=>({l:x.l,v:x.v,late:i>=2,tip:[['','clientes',nf(x.v)],['','dos clientes',pf(x.v/tc)],['','protocolos',nf(x.p)]]})));
 box.insertAdjacentHTML('beforeend',`<p class="dnote"><b>${pf(rep/tc,1)}</b> dos clientes (${nf(rep)}) procuraram o SAC mais de uma vez no período.</p>`)}
function drawTopc(cur){const box=$('db-topc'),g=grp(cur,'cli');
 const it=[...g].filter(([,r])=>r.length>1).map(([k,r])=>{const ga=grp(r,'as');return {k,tipo:r[0].tipo,v:r.length,as:[...ga].sort((a,b)=>b[1].length-a[1].length).slice(0,3).map(([a,q])=>`${a} (${q.length})`).join(', '),rem:r.filter(x=>x.rem).length,live:k[0]==='S'}}).sort((a,b)=>b.v-a.v).slice(0,DQ.tbl.topc?50:12);
 if(!it.length){box.innerHTML='<p class="soft">Nenhum cliente com mais de um protocolo no período.</p>';return}
 const nm=x=>x.live?esc((CLIENTES[x.k.slice(1)]||{}).nome||'Cliente da sessão'):`Cliente ${x.k[0]==='J'?'PJ':'PF'} nº ${String(+x.k.slice(1)+1001)}`;
 box.innerHTML=tblN(['Cliente','Tipo','Protocolos','Remetidos','Assuntos mais procurados'],it.map(x=>[`<b>${nm(x)}</b>`,x.tipo,nf(x.v),nf(x.rem),esc(x.as)]),[2,3])+`<p class="dnote">No sistema real, o nome do cliente aparece aqui e abre a consulta dele. Na base simulada os clientes são numerados.</p>`}

/* Pós-Venda */
function drawResp(cur){const box=$('db-resp'),g=grp(cur.filter(x=>x.rem&&x.resp),'resp');
 const it=[...g].map(([k,r])=>{const d=r.filter(x=>x.pv!==null);return {k,n:r.length,d:d.length,pv:avgPv(r),in7:d.length?d.filter(x=>x.pv<=7).length/d.length:0,open:r.filter(x=>x.open).length,late:r.filter(x=>x.open&&x.age>7).length}}).sort((a,b)=>b.n-a.n);
 if(!it.length){box.innerHTML='<p class="soft">Nenhum protocolo remetido neste filtro.</p>';return}
 box.innerHTML=tblN(['Responsável','Recebidos','Concluídos','Prazo médio','Em até 7 dias','Em aberto','Abertos há mais de 7 dias'],it.map(x=>[`<b>${esc(x.k)}</b>`,nf(x.n),nf(x.d),x.pv?df(x.pv):'—',`<span class="${x.in7>=0.9?'st-ok':'st-bad'}">${pf(x.in7)}</span>`,nf(x.open),x.late?`<span class="st-bad"><i class="fa fa-exclamation-triangle"></i> ${nf(x.late)}</span>`:'0']),[1,2,3,4,5,6])}
function drawAge(cur){const box=$('db-age'),r=cur.filter(x=>x.open),B=[[0,2,'até 2 dias'],[3,5,'3–5'],[6,7,'6–7'],[8,15,'8–15'],[16,1e9,'16+']];
 const it=B.map(([a,b,l])=>({l,v:r.filter(x=>x.age>=a&&x.age<=b).length,late:a>7}));
 if(DQ.tbl.age){box.innerHTML=tblHTML(['Aberto há','Protocolos','Prazo'],it.map(x=>[x.l+(x.l.includes('dias')?'':' dias'),nf(x.v),x.late?'fora do prazo':'dentro do prazo']));return}
 vbars(box,it.map(x=>({l:x.l,v:x.v,late:x.late,tip:[['','protocolos em aberto',nf(x.v)],['',x.late?'fora do prazo':'dentro do prazo','']]})),2)}
function drawPva(cur){const box=$('db-pva'),g=grp(cur.filter(x=>x.pv!==null),'as');
 let it=[...g].filter(([,r])=>r.length>=5).map(([k,r])=>({label:k,v:avgPv(r),n:r.length,in7:r.filter(x=>x.pv<=7).length/r.length})).sort((a,b)=>b.v-a.v);
 if(DQ.tbl.pva){box.innerHTML=tblHTML(['Assunto','Prazo médio','Concluídos','Em até 7 dias'],it.map(x=>[esc(x.label),df(x.v),nf(x.n),pf(x.in7)]));return}
 if(!it.length){box.innerHTML='<p class="soft">Poucos protocolos concluídos para comparar.</p>';return}
 it=it.slice(0,12);it.forEach(x=>x.tip=[['','prazo médio',df(x.v)],['','concluídos',nf(x.n)],['','em até 7 dias',pf(x.in7)]]);
 hbars(box,it,{fmt:df,ref:7,refLbl:'prazo: 7 dias'})}

/* barras verticais genéricas (mk = índice depois do qual entra a linha de prazo) */
function vbars(box,it,mk){const mx=Math.max(...it.map(x=>x.v),1);
 box.innerHTML=`<div class="vb">${it.map((x,i)=>`<div class="vb-c${x.late?' late':''}" tabindex="0" data-vb="${i}"><span class="vb-v">${nf(x.v)}</span><span class="vb-t"><span class="vb-b" style="height:${(x.v/mx*100).toFixed(1)}%"></span></span><span class="vb-l">${x.l}</span></div>${mk===i?'<div class="vb-mk"><span>7 dias</span></div>':''}`).join('')}</div>`;
 box.querySelectorAll('[data-vb]').forEach(el=>{const x=it[+el.dataset.vb];hov(el,()=>[x.l,x.tip||[['','',nf(x.v)]]])})}

/* destaques extras */
function insightsMore(cur){const L=[],r=cur.filter(x=>x.mod==='cd');
 if(r.length>=30){const g=grp(r,'car');let w=null;g.forEach((a,c)=>{if(a.length<15)return;const s=a.filter(x=>DLATE.test(x.sub)).length/a.length;if(!w||s>w.s)w={c,s,n:a.length}});
  if(w&&w.s>0)L.push(`<b>${esc(w.c)}</b> é a transportadora com mais atraso ou extravio: ${pf(w.s)} dos ${nf(w.n)} protocolos dela.`)}
 const p=cur.filter(x=>x.prod);if(p.length>=20){const g=grp(p,'prod'),t=[...g].sort((a,b)=>b[1].length-a[1].length)[0];L.push(`Produto mais citado: <b>${esc(t[0])}</b>, em ${nf(t[1].length)} protocolos.`)}
 const tot=cur.reduce((a,x)=>a+(x.mon||0),0);if(tot)L.push(`<b>${money2(tot)}</b> em estornos, cancelamentos, devoluções e abatimentos no período.`);
 const g=grp(cur,'cli'),rep=[...g.values()].filter(a=>a.length>1).length;if(g.size)L.push(`${pf(rep/g.size,1)} dos clientes procuraram o SAC mais de uma vez no período.`);
 return L}
