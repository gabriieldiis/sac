/* Painel da diretoria: período, indicadores, gráficos e exportação. */
const ND0=180;

/* ================= Painel da diretoria ================= */
/* base histórica SIMULADA (180 dias) + os protocolos registrados nesta sessão (com o tempo real de registro) */
const DQ={d1:ND0-30,d2:ND0-1,canal:'',as:'',at:'',tbl:{},sort:['n',-1],tab:'geral',fx:{}};
const ATS=[['Amanda V.',0.9],['Pamela F.',1.05],['Yasmin F.',0.85],['Sarah V.',1.2],['Eliete L.',0.95],['Thiciane R.',1.1],['Samara M.',1.3],['Bruno C.',1.0],['Diego S.',0.8],['Larissa P.',1.15]];
const DW={'Consulta de Pedido':28,'Devolução':11,'Cancelamento (Exceção)':8,'2a. via Fatura/Boleto/Arquivo XML':6,'Entrega da Loja':5,'Estornos Diversos':5,'Lojas':4.5,'Reclamação':4,'Avaria':3,'Falta de produto na entrega':3,'Dúvidas sobre o site':3,'Retirada em loja':2.5,'Garantia Estendida':2,'Formas de Pagamento':2,'Solicitações Diversas':2,'Devolução Site':2,'Outros':2.2,'Alterações Site':1.5,'Fornecedor':1.5};
const DT={'Consulta de Pedido':210,'Devolução':300,'Cancelamento (Exceção)':330,'Reclamação':420,'2a. via Fatura/Boleto/Arquivo XML':120,'Estornos Diversos':240,'Outros':360,'Entrega da Loja':260,'Lojas':240,'Fornecedor':380,'Garantia Estendida':330};
const DPV={'Consulta de Pedido':3.5,'Devolução':6,'Cancelamento (Exceção)':5,'Estornos Diversos':8,'Reclamação':7,'Fornecedor':9,'Garantia Estendida':8};
const DCAN=[['Telefone',52],['WhatsApp',20],['E-mail',12],['Chat do site',11],['Redes sociais',3],['Reclame Aqui',1.5],['Procon / consumidor.gov',0.5]];
const DHR=[3,6,9,10,8,5,7,9,9,7,5,3,2];/* 8h..20h */
const ND=180;let DS=null;
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function genDS(){const R=mulberry(20261016),pick=w=>{const s=w.reduce((a,x)=>a+x[1],0);let r=R()*s;for(const x of w){r-=x[1];if(r<=0)return x[0]}return w[w.length-1][0]},gs=()=>Math.sqrt(-2*Math.log(R()||1e-9))*Math.cos(2*Math.PI*R());
 const asW=Object.keys(AS).map(a=>[a,DW[a]||0.5]),hrW=DHR.map((w,i)=>[8+i,w]),out=[];
 for(let di=0;di<ND;di++){const dt=new Date(TODAY.getTime()-(ND-1-di)*864e5),dow=dt.getDay();
  let n=Math.round((dow===0?12:dow===6?30:85)*(0.88+R()*0.24)*(1+di/ND*0.12));
  const spike=di>=ND-22&&di<=ND-15;if(spike)n=Math.round(n*1.35);
  for(let k=0;k<n;k++){let as=pick(asW);
   if(spike&&R()<0.3)as='Consulta de Pedido';if(di>ND-31&&R()<0.04)as='Devolução';
   const subs=AS[as].s.filter(x=>x[0]!=='Outro'),sw=subs.length?subs.map((x,i)=>[x,1/(i+1.3)]):[[['Outro','v'],1]];
   let sb=pick(sw);if(spike&&as==='Consulta de Pedido'&&R()<0.6)sb=AS[as].s.find(x=>x[0]==='Pedido em Atraso')||sb;
   const [at,f]=ATS[Math.floor(R()*ATS.length)];
   let t=(DT[as]||180)*(sb[0]==='Fornecedor'?1.5:1)*f*Math.exp(gs()*0.33);t=Math.round(Math.max(40,Math.min(1500,t)));
   const rem=R()<(sb[1]==='r'?0.58:0.05),re=rem&&R()<(as==='Consulta de Pedido'?0.11:0.06);
   let pv=null,open=false;if(rem){pv=+((DPV[as]||4)*Math.exp(gs()*0.55)).toFixed(1);if(re)pv=+(pv*1.6).toFixed(1);if(di+pv>ND-1){pv=null;open=true}}
   out.push({di,dow,h:pick(hrW),as,sub:sb[0],canal:pick(DCAN),at,t,rem,re,pv,open,age:open?ND-1-di:0})}}
 return enrichDS(out)}
function dsAll(){if(!DS)DS=genDS();const hr=new Date().getHours();
 return DS.concat(PROTOS.filter(p=>p.tReg).map(p=>[({di:ND-1,dow:TODAY.getDay(),h:Math.min(20,Math.max(8,hr)),as:p.as,sub:p.sub,canal:p.canal,at:'Você',t:p.tReg,rem:!!p.rem,re:remCount(p)>1,pv:null,open:!!p.rem&&isOpen(p),age:0,live:true}),p]).map(([x,p])=>enrichLive(x,p)))}
const dDate=di=>new Date(TODAY.getTime()-(ND-1-di)*864e5);
const dmy=d=>d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'});
const nf=n=>Math.round(n).toLocaleString('pt-BR'),pf=(x,d=(x>0&&x<0.01?1:0))=>(x*100).toLocaleString('pt-BR',{maximumFractionDigits:d,minimumFractionDigits:d})+'%';
const tf=s=>{s=Math.round(s);const m=Math.floor(s/60),r=s%60;return m?`${m} min ${String(r).padStart(2,'0')} s`:`${r} s`};
const df=x=>x.toLocaleString('pt-BR',{maximumFractionDigits:1,minimumFractionDigits:1})+' dias';
function dFilter(rows,from,to){return rows.filter(r=>r.di>from&&r.di<=to&&(!DQ.canal||r.canal===DQ.canal)&&(!DQ.as||r.as===DQ.as)&&(!DQ.at||r.at===DQ.at)&&dfxOk(r))}
function kpi(r){const n=r.length,rem=r.filter(x=>x.rem),done=rem.filter(x=>x.pv!==null);
 return {n,t:n?r.reduce((a,x)=>a+x.t,0)/n:0,res:n?1-rem.length/n:0,rem:rem.length,pv:done.length?done.reduce((a,x)=>a+x.pv,0)/done.length:0,in7:done.length?done.filter(x=>x.pv<=7).length/done.length:0,re:rem.length?rem.filter(x=>x.re).length/rem.length:0,out:n?r.filter(x=>isOutAs(x.as)||x.sub==='Outro').length/n:0,open:r.filter(x=>x.open).length,late:r.filter(x=>x.open&&x.age>7).length}}
const grp=(r,k)=>{const m=new Map();r.forEach(x=>{const g=typeof k==='function'?k(x):x[k];if(!m.has(g))m.set(g,[]);m.get(g).push(x)});return m};

function renderDash(){const all=dsAll(),to=DQ.d2,from=DQ.d1-1,LEN=DQ.d2-DQ.d1+1,cur=dFilter(all,from,to),prev=dFilter(all,from-LEN,from),K=kpi(cur),P=kpi(prev);
 const opts=(arr,v,lbl)=>`<option value="">${lbl}</option>`+arr.map(x=>`<option ${x===v?'selected':''}>${esc(x)}</option>`).join('');
 const asList=[...new Set(all.map(x=>x.as))].sort((a,b)=>a.localeCompare(b)),atList=[...new Set(all.map(x=>x.at))].sort();
 const dl=(c,p,good,fmt)=>{if(!p)return '<span class="dl nd">sem base anterior</span>';const d=c-p,up=d>0,ok=good==='up'?up:!up,z=Math.abs(d)<1e-9||Math.abs(d/p)<0.005;
  return z?'<span class="dl eq"><i class="fa fa-minus"></i> igual ao período anterior</span>':`<span class="dl ${ok?'ok':'bad'}"><i class="fa fa-arrow-${up?'up':'down'}"></i> ${fmt(d,p)} <span>vs. período anterior</span></span>`};
 const pctD=(d,p)=>(d>0?'+':'−')+pf(Math.abs(d/p)),ppD=(d)=>(d>0?'+':'−')+(Math.abs(d)*100).toLocaleString('pt-BR',{maximumFractionDigits:1})+' p.p.',tD=d=>(d>0?'+':'−')+tf(Math.abs(d)),dD=d=>(d>0?'+':'−')+df(Math.abs(d));
 const tiles=[
  ['fa-folder-open-o','Protocolos abertos',nf(K.n),dl(K.n,P.n,'none',pctD).replace(/class="dl (ok|bad)"/,'class="dl neu"'),''],
  ['fa-clock-o','Tempo médio para registrar',tf(K.t),dl(K.t,P.t,'down',tD),'do assunto até o protocolo salvo'],
  ['fa-check-circle-o','Resolvidos no 1º contato',pf(K.res),dl(K.res,P.res,'up',ppD),`${nf(K.n-K.rem)} sem precisar do Pós-Venda`],
  ['fa-share','Remetidos ao Pós-Venda',nf(K.rem),dl(K.rem/(K.n||1),P.rem/(P.n||1),'down',ppD),`${pf(K.rem/(K.n||1))} dos protocolos`],
  ['fa-hourglass-half','Prazo médio no Pós-Venda',df(K.pv),dl(K.pv,P.pv,'down',dD),`<b class="${K.in7>=0.9?'st-ok':'st-bad'}"><i class="fa ${K.in7>=0.9?'fa-check':'fa-exclamation-triangle'}"></i> ${pf(K.in7)} em até 7 dias</b>`],
  ['fa-repeat','Remetidos novamente',pf(K.re,1),dl(K.re,P.re,'down',ppD),'cliente voltou a reclamar'],
  ['fa-inbox','Em aberto no Pós-Venda',nf(K.open),'',`<b class="${K.late?'st-bad':'st-ok'}"><i class="fa ${K.late?'fa-exclamation-triangle':'fa-check'}"></i> ${nf(K.late)} com mais de 7 dias</b>`],
  ['fa-pencil-square-o','Abertos como "Outros"',pf(K.out,1),dl(K.out,P.out,'down',ppD),'<button type="button" class="lnk" data-goadm>abrir Assuntos e tópicos</button>']];
 const card=(id,ic,t,sub,body,wide,noTbl)=>`<section class="card dc ${wide||''}" id="dc-${id}"><div class="dc-h"><div><h3><i class="fa ${ic}"></i> ${t}</h3>${sub?`<p>${sub}</p>`:''}</div>${noTbl?'':`<button type="button" class="lbtn sm" data-tbl="${id}" aria-pressed="${!!DQ.tbl[id]}"><i class="fa ${DQ.tbl[id]?'fa-bar-chart':'fa-table'}"></i> ${DQ.tbl[id]?'Gráfico':'Tabela'}</button>`}</div><div class="dc-b" id="db-${id}">${body}</div></section>`;
 const fd=d=>dDate(d).toLocaleDateString('pt-BR'),per=LEN===1?fd(to):`${fd(from+1)} a ${fd(to)}`,pper=LEN===1?fd(from):`${fd(from-LEN+1)} a ${fd(from)}`;
 let h=`<div class="dash">
  <div class="card dhead"><div><h2><i class="fa fa-bar-chart"></i> Painel da diretoria</h2><p class="soft"><b>${per}</b> (${LEN} dia${LEN>1?'s':''}) comparado com ${LEN>1?`os ${LEN} dias anteriores`:'o dia anterior'} (${pper}). <span class="dsim"><i class="fa fa-flask"></i> base simulada + os protocolos registrados nesta sessão</span></p></div>
   <div class="dact"><button type="button" class="lbtn sm" id="dcsv" hidden><i class="fa fa-download"></i> Exportar dados (CSV)</button><button type="button" class="lbtn sm" id="dprint"><i class="fa fa-print"></i> Imprimir / PDF</button></div></div>
  <div class="dfil" role="group" aria-label="Filtros do painel"><div class="dper"><label class="dpf"><span>Data início</span><span class="dpi"><input type="date" id="dpd1" value="${isoD(DQ.d1)}" min="${isoD(0)}" max="${isoD(ND-1)}"><i class="fa fa-calendar"></i></span></label>
   <label class="dpf"><span>Data fim <span class="dpq">${[['-1','-1','Voltar um dia'],['ont','ont.','Ontem'],['hoje','hoje','Hoje'],['sem','sem.','Esta semana'],['mes','mês','Este mês'],['+1','+1','Avançar um dia']].map(([k,l,t],i)=>`${i?'<i>|</i>':''}<button type="button" data-dq="${k}" title="${t}">${l}</button>`).join('')}</span></span><span class="dpi"><input type="date" id="dpd2" value="${isoD(DQ.d2)}" min="${isoD(0)}" max="${isoD(ND-1)}"><i class="fa fa-calendar"></i></span></label>
   <div class="dpa"><button type="button" class="lnk" id="dpok">Atualizar</button><i>|</i><button type="button" class="lnk" id="dcsv2">Exportar</button></div></div>
   <select id="dfas" aria-label="Assunto">${opts(asList,DQ.as,'Todos os assuntos')}</select><select id="dfca" aria-label="Canal">${opts(CANAIS.filter(c=>all.some(x=>x.canal===c)),DQ.canal,'Todos os canais')}</select><select id="dfat" aria-label="Atendente">${opts(atList,DQ.at,'Todos os atendentes')}</select>
   ${DQ.as||DQ.canal||DQ.at||Object.values(DQ.fx).some(Boolean)?'<button type="button" class="lnk" id="dclr"><i class="fa fa-times"></i> Limpar filtros</button>':''}</div>
  ${cur.length?'':'<div class="hint amber"><i class="fa fa-info-circle"></i><span>Nenhum protocolo com esses filtros.</span></div>'}
  <div class="dtiles">${tiles.map(([ic,l,v,d,x])=>`<div class="card dtile"><span class="dt-l"><i class="fa ${ic}"></i> ${l}</span><b class="dt-v">${v}</b>${d}${x?`<span class="dt-x">${x}</span>`:''}</div>`).join('')}</div>
  %TABS%<!--${card('dia','fa-line-chart','Protocolos por dia','Resolvidos no atendimento e remetidos ao Pós-Venda','',`w2`)}
   ${card('as','fa-list-ol',DQ.as?'Tópicos mais abertos de '+esc(DQ.as):'Assuntos mais abertos',DQ.as?'Quantidade no período':'Clique num assunto para filtrar o painel inteiro','')}
   ${card('tas','fa-clock-o','Tempo para registrar por assunto','Média do assunto até o protocolo salvo · linha = média geral','')}
   ${card('at','fa-users','Atendentes','Quem registrou, quanto tempo levou e quanto foi para o Pós-Venda','','w2')}
   ${card('pv','fa-hourglass-half','Quanto tempo o Pós-Venda leva para concluir','Protocolos concluídos no período · prazo de 7 dias (Decreto 11.034/2022)','')}
   ${card('ca','fa-phone','Canais de contato','Por onde o cliente falou','')}
   ${card('hm','fa-th','Quando os protocolos são abertos','Dia da semana × hora · quanto mais escuro, mais protocolos','','w2')}-->
  </div>`;
 h=h.replace(/%TABS%<!--[\s\S]*?-->/,()=>dashTabsHTML(card)).replace('%INS%',()=>`<div class="card dins"><h3><i class="fa fa-lightbulb-o"></i> Destaques do período</h3><ul>${insights(cur,prev,K).concat(insightsMore(cur)).map(t=>`<li>${t}</li>`).join('')}</ul></div>`);
 app.innerHTML=h;bindCommon();
 const D=dashDraws(cur,prev,K,from,to);
 Object.entries(D).forEach(([k,f])=>{if(!$('db-'+k))return;try{f()}catch(e){console.error(e)}});
 bindDash(cur)}

function insights(cur,prev,K){const L=[];if(!cur.length)return ['Sem dados para o filtro escolhido.'];
 const ga=grp(cur,'as'),gp=grp(prev,'as');let best=null;
 ga.forEach((r,a)=>{const p=(gp.get(a)||[]).length;if(r.length>=15&&p>=10){const g=r.length/p-1;if(!best||g>best.g)best={a,g,n:r.length,p}}});
 if(best&&best.g>0.05)L.push(`<b>${esc(best.a)}</b> foi o assunto que mais cresceu: ${nf(best.n)} protocolos, <b>+${pf(best.g)}</b> que no período anterior (${nf(best.p)}).`);
 let slow=null;const avg=K.t;ga.forEach((r,a)=>{if(r.length>=10){const t=r.reduce((s,x)=>s+x.t,0)/r.length;if(!slow||t>slow.t)slow={a,t}}});
 if(slow)L.push(`<b>${esc(slow.a)}</b> é o que mais demora para registrar: ${tf(slow.t)} por protocolo, ${(slow.t/avg).toLocaleString('pt-BR',{maximumFractionDigits:1})}× a média (${tf(avg)}).`);
 const days=grp(cur,'di');let pk=null;days.forEach((r,d)=>{if(!pk||r.length>pk.n)pk={d,n:r.length}});
 if(pk)L.push(`Dia com mais protocolos: <b>${dDate(pk.d).toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'2-digit'})}</b>, com ${nf(pk.n)}.`);
 L.push(K.in7>=0.9?`O Pós-Venda concluiu <b>${pf(K.in7)}</b> dos casos em até 7 dias.`:`Só <b>${pf(K.in7)}</b> dos casos do Pós-Venda foram concluídos em até 7 dias; ${nf(K.late)} estão abertos há mais de 7 dias.`);
 if(K.out>0.015)L.push(`${pf(K.out,1)} dos atendimentos foram abertos como "Outros": vale criar assuntos para eles em <button type="button" class="lnk" data-goadm>Assuntos e tópicos</button>.`);
 return L}

/* ---------- tooltip (texto sempre via textContent) ---------- */
function tipEl(){let t=$('dtip');if(!t){t=document.createElement('div');t.id='dtip';t.className='dtip';t.setAttribute('role','tooltip');document.body.appendChild(t)}return t}
function tipShow(x,y,title,rows){const t=tipEl();t.replaceChildren();const h=document.createElement('div');h.className='tt-h';h.textContent=title;t.appendChild(h);
 rows.forEach(([c,l,v])=>{const r=document.createElement('div');r.className='tt-r';if(c){const k=document.createElement('i');k.style.background=c;r.appendChild(k)}const b=document.createElement('b');b.textContent=v;const s=document.createElement('span');s.textContent=l;r.append(b,s);t.appendChild(r)});
 t.style.display='block';const w=t.offsetWidth,hh=t.offsetHeight;t.style.left=Math.min(innerWidth-w-8,x+14)+'px';t.style.top=Math.max(8,y-hh-12)+'px'}
function tipHide(){const t=$('dtip');t&&(t.style.display='none')}
function hov(el,fn){el.addEventListener('pointermove',e=>{const [ti,rows]=fn();tipShow(e.clientX,e.clientY,ti,rows)});el.addEventListener('pointerleave',tipHide);
 el.addEventListener('focus',()=>{const r=el.getBoundingClientRect(),[ti,rows]=fn();tipShow(r.left+r.width/2,r.top,ti,rows)});el.addEventListener('blur',tipHide)}
const CV=n=>getComputedStyle(document.querySelector('.dash')).getPropertyValue(n).trim();
function tblHTML(head,rows){return `<div class="scroll"><table class="tb dtb"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i?' class="num"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}

/* ---------- 1. linha: protocolos por dia ---------- */
function drawLine(cur,from,to){const box=$('db-dia');let days=[];for(let d=from+1;d<=to;d++)days.push(d);const hr=days.length===1,day0=days[0];if(hr)days=DHR.map((_,i)=>8+i);
 const LB=k=>hr?k+'h':dmy(dDate(k)),LL=k=>hr?`${dDate(day0).toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'2-digit'})}, ${k}h às ${k+1}h`:dDate(k).toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'2-digit'});
 const g=grp(cur,hr?'h':'di'),res=days.map(d=>(g.get(d)||[]).filter(x=>!x.rem).length),rem=days.map(d=>(g.get(d)||[]).filter(x=>x.rem).length);
 if(DQ.tbl.dia){box.innerHTML=tblHTML([hr?'Hora':'Dia','Resolvidos no atendimento','Remetidos ao Pós-Venda','Total'],days.map((d,i)=>[hr?d+'h':dDate(d).toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'2-digit'}),nf(res[i]),nf(rem[i]),nf(res[i]+rem[i])]));return}
 const W=Math.max(280,box.clientWidth),nar=W<520,H=nar?210:250,pl=36,pr=nar?12:110,pt=12,pb=28,iw=W-pl-pr,ih=H-pt-pb,mx=Math.max(4,...res,...rem),raw=mx/4,mag=Math.pow(10,Math.floor(Math.log10(raw))),step=[1,2,5,10].find(m=>m*mag>=raw)*mag,top=Math.ceil(mx/step)*step;
 const X=i=>pl+(days.length<2?iw/2:i*iw/(days.length-1)),Y=v=>pt+ih-v/top*ih,path=a=>a.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join('');
 const c1=CV('--c1'),c2=CV('--c2');let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Protocolos por dia: resolvidos no atendimento e remetidos ao Pós-Venda">`;
 for(let v=0;v<=top;v+=step)s+=`<line x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}" class="gl${v?'':' base'}"/><text x="${pl-6}" y="${Y(v)+4}" class="ax" text-anchor="end">${nf(v)}</text>`;
 const ev=Math.max(1,Math.ceil(days.length/(iw/70)));days.forEach((d,i)=>{if(i%ev===0||i===days.length-1&&days.length<10)s+=`<text x="${X(i)}" y="${H-8}" class="ax" text-anchor="middle">${LB(d)}</text>`});
 if(!hr)days.forEach((d,i)=>{const w=dDate(d).getDay();if(w===0||w===6)s+=`<rect x="${X(i)-iw/(days.length-1||1)/2}" y="${pt}" width="${iw/(days.length-1||1)}" height="${ih}" class="wk"/>`});
 s+=`<path d="${path(res)}" fill="none" stroke="${c1}" stroke-width="2" stroke-linejoin="round"/><path d="${path(rem)}" fill="none" stroke="${c2}" stroke-width="2" stroke-linejoin="round"/>`;
 const li=days.length-1,ly1=Y(res[li]),ly2=Y(rem[li]),sep=Math.abs(ly1-ly2)<16?(ly1<ly2?-8:8):0;
 if(!nar)s+=`<text x="${X(li)+8}" y="${ly1+4+sep}" class="dlab">Resolvidos</text><text x="${X(li)+8}" y="${ly2+4-sep}" class="dlab">Remetidos</text>`;
 s+=`<line id="xh" y1="${pt}" y2="${pt+ih}" class="xh" style="display:none"/><circle id="xh1" r="4" fill="${c1}" class="xd" style="display:none"/><circle id="xh2" r="4" fill="${c2}" class="xd" style="display:none"/><rect x="${pl}" y="${pt}" width="${iw}" height="${ih}" fill="transparent" id="xov" tabindex="0" aria-label="Passe o mouse ou use as setas para ver cada dia"/></svg>`;
 box.innerHTML=`<div class="dleg"><span><i style="background:${c1}"></i>Resolvidos no atendimento</span><span><i style="background:${c2}"></i>Remetidos ao Pós-Venda</span></div>`+s;
 const ov=$('xov'),xh=$('xh'),d1=$('xh1'),d2=$('xh2');let ci=li;
 const show=(i,cx,cy)=>{ci=i;[xh,d1,d2].forEach(e=>e.style.display='');xh.setAttribute('x1',X(i));xh.setAttribute('x2',X(i));d1.setAttribute('cx',X(i));d1.setAttribute('cy',Y(res[i]));d2.setAttribute('cx',X(i));d2.setAttribute('cy',Y(rem[i]));
  tipShow(cx,cy,LL(days[i]),[[c1,'resolvidos no atendimento',nf(res[i])],[c2,'remetidos ao Pós-Venda',nf(rem[i])],['','no total',nf(res[i]+rem[i])]])};
 const idx=e=>{const r=ov.getBoundingClientRect(),sx=W/box.querySelector('svg').getBoundingClientRect().width;return Math.max(0,Math.min(li,Math.round(((e.clientX-r.left)*sx)/(iw/(li||1)))))};
 ov.addEventListener('pointermove',e=>show(idx(e),e.clientX,e.clientY));ov.addEventListener('pointerleave',()=>{[xh,d1,d2].forEach(e=>e.style.display='none');tipHide()});
 ov.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const i=Math.max(0,Math.min(li,ci+(e.key==='ArrowRight'?1:-1)));const r=ov.getBoundingClientRect();show(i,r.left+r.width*i/(li||1),r.top)}});
 ov.addEventListener('blur',()=>{[xh,d1,d2].forEach(e=>e.style.display='none');tipHide()})}

/* ---------- barras horizontais (HTML) ---------- */
function hbars(box,items,o){o=o||{};const mx=Math.max(...items.map(x=>x.v),o.ref||0,1);
 box.innerHTML=`<div class="hb">${items.map((x,i)=>`<div class="hb-r${x.other?' oth':''}${o.click&&!x.other?' clk':''}" tabindex="0" data-hb="${i}"><span class="hb-l" title="${esc(x.label)}">${esc(x.label)}</span><span class="hb-t"><span class="hb-b" style="width:${(x.v/mx*100).toFixed(2)}%"></span>${o.ref?`<span class="hb-ref" style="left:${(o.ref/mx*100).toFixed(2)}%"></span>`:''}</span><span class="hb-v">${o.fmt?o.fmt(x.v):nf(x.v)}${x.s?` <small>${x.s}</small>`:''}</span></div>`).join('')}</div>${o.ref?`<div class="hb-note"><span class="hb-refk"></span> ${o.refLbl}</div>`:''}`;
 box.querySelectorAll('[data-hb]').forEach(el=>{const x=items[+el.dataset.hb];hov(el,()=>[x.label,x.tip||[['',x.s||'',o.fmt?o.fmt(x.v):nf(x.v)]]]);if(o.click&&!x.other){el.onclick=()=>o.click(x);el.onkeydown=e=>{if(e.key==='Enter')o.click(x)}}})}
function drawAs(cur,prev){const box=$('db-as'),key=DQ.as?'sub':'as',g=grp(cur,key),gp=grp(prev,key),n=cur.length||1;
 let it=[...g].map(([k,r])=>({label:k,v:r.length,s:pf(r.length/n),p:(gp.get(k)||[]).length})).sort((a,b)=>b.v-a.v);
 if(DQ.tbl.as){box.innerHTML=tblHTML([DQ.as?'Tópico':'Assunto','Protocolos','% do total','Período anterior','Variação'],it.map(x=>[esc(x.label),nf(x.v),x.s,nf(x.p),x.p?((x.v>=x.p?'+':'−')+pf(Math.abs(x.v/x.p-1))):'—']));return}
 const top=it.slice(0,10),rest=it.slice(10);if(rest.length)top.push({label:`Demais ${rest.length} ${DQ.as?'tópicos':'assuntos'}`,v:rest.reduce((a,x)=>a+x.v,0),s:pf(rest.reduce((a,x)=>a+x.v,0)/n),other:true});
 top.forEach(x=>x.tip=[['','protocolos no período',nf(x.v)],['','do total',x.s],...(x.other?[]:[['','no período anterior',nf(x.p)]])]);
 hbars(box,top,{click:DQ.as?null:x=>{DQ.as=x.label;renderDash()}})}
function drawTas(cur,K){const box=$('db-tas'),g=grp(cur,DQ.as?'sub':'as');
 let it=[...g].filter(([k,r])=>r.length>=(DQ.d2-DQ.d1<7?3:8)).map(([k,r])=>({label:k,v:r.reduce((a,x)=>a+x.t,0)/r.length,n:r.length})).sort((a,b)=>b.v-a.v);
 if(DQ.tbl.tas){box.innerHTML=tblHTML([DQ.as?'Tópico':'Assunto','Tempo médio','Protocolos','vs. média geral'],it.map(x=>[esc(x.label),tf(x.v),nf(x.n),(x.v>=K.t?'+':'−')+pf(Math.abs(x.v/K.t-1))]));return}
 it=it.slice(0,10);it.forEach(x=>x.tip=[['','tempo médio para registrar',tf(x.v)],['','protocolos',nf(x.n)],['','média geral',tf(K.t)]]);
 if(!it.length){box.innerHTML='<p class="soft">Poucos protocolos para comparar.</p>';return}
 hbars(box,it,{fmt:tf,ref:K.t,refLbl:`média geral: ${tf(K.t)}`})}

/* ---------- 4. atendentes ---------- */
function drawAt(cur){const box=$('db-at'),g=grp(cur,'at');
 let it=[...g].map(([a,r])=>({a,n:r.length,t:r.reduce((s,x)=>s+x.t,0)/r.length,rem:r.filter(x=>x.rem).length/r.length,out:r.filter(x=>isOutAs(x.as)||x.sub==='Outro').length/r.length,live:r.some(x=>x.live)}));
 const [k,dir]=DQ.sort;it.sort((x,y)=>(k==='a'?x.a.localeCompare(y.a):x[k]-y[k])*dir);
 const mxN=Math.max(...it.map(x=>x.n),1),mxT=Math.max(...it.map(x=>x.t),1),avgT=cur.length?cur.reduce((s,x)=>s+x.t,0)/cur.length:0;
 const th=(key,l)=>`<th><button type="button" data-sort="${key}" aria-sort="${k===key?(dir>0?'ascending':'descending'):'none'}">${l}${k===key?` <i class="fa fa-caret-${dir>0?'up':'down'}"></i>`:''}</button></th>`;
 box.innerHTML=`<div class="scroll"><table class="tb dat"><thead><tr>${th('a','Atendente')}${th('n','Protocolos')}${th('t','Tempo médio para registrar')}${th('rem','% remetidos')}${th('out','% "Outros"')}</tr></thead><tbody>${it.map(x=>`<tr${x.live?' class="me"':''}><td><b>${esc(x.a)}</b>${x.live?' <span class="pill blue" style="font-size:10.5px">esta sessão</span>':''}</td>
  <td><span class="ib"><span style="width:${(x.n/mxN*100).toFixed(1)}%"></span></span><span class="num">${nf(x.n)}</span></td>
  <td><span class="ib t"><span style="width:${(x.t/mxT*100).toFixed(1)}%"></span></span><span class="num">${tf(x.t)}</span>${x.t>avgT*1.15?' <span class="flag" title="acima de 15% da média"><i class="fa fa-exclamation-triangle"></i> acima da média</span>':''}</td>
  <td class="num">${pf(x.rem)}</td><td class="num">${pf(x.out,1)}</td></tr>`).join('')}</tbody></table></div><p class="dnote">Média geral para registrar: <b>${tf(avgT)}</b>. Clique no título da coluna para ordenar.</p>`;
 box.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{const kk=b.dataset.sort;DQ.sort=[kk,DQ.sort[0]===kk?-DQ.sort[1]:(kk==='a'?1:-1)];drawAt(cur)})}

/* ---------- 5. pós-venda: distribuição em dias ---------- */
function drawPv(cur){const box=$('db-pv'),done=cur.filter(x=>x.pv!==null),B=[[0,1,'até 1'],[1,2,'1–2'],[2,3,'2–3'],[3,5,'3–5'],[5,7,'5–7'],[7,10,'7–10'],[10,15,'10–15'],[15,1e9,'15+']];
 const it=B.map(([a,b,l])=>({l,v:done.filter(x=>x.pv>a&&x.pv<=b||(a===0&&x.pv===0)).length,late:a>=7}));const n=done.length||1;
 if(DQ.tbl.pv){box.innerHTML=tblHTML(['Dias até concluir','Protocolos','%','Prazo'],it.map(x=>[x.l+' dias',nf(x.v),pf(x.v/n),x.late?'fora do prazo':'dentro do prazo']));return}
 const mx=Math.max(...it.map(x=>x.v),1);
 box.innerHTML=`<div class="vb">${it.map((x,i)=>`<div class="vb-c${x.late?' late':''}" tabindex="0" data-vb="${i}"><span class="vb-v">${nf(x.v)}</span><span class="vb-t"><span class="vb-b" style="height:${(x.v/mx*100).toFixed(1)}%"></span></span><span class="vb-l">${x.l}</span></div>${i===4?'<div class="vb-mk"><span>7 dias</span></div>':''}`).join('')}</div>
  <div class="dleg"><span><i class="k1"></i>Dentro do prazo</span><span><i class="kl"></i><b class="st-bad"><i class="fa fa-exclamation-triangle"></i></b> Fora do prazo (mais de 7 dias)</span></div>`;
 box.querySelectorAll('[data-vb]').forEach(el=>{const x=it[+el.dataset.vb];hov(el,()=>[x.l+' dias',[['','protocolos',nf(x.v)],['','do total concluído',pf(x.v/n)],['',x.late?'fora do prazo':'dentro do prazo','']]])})}

/* ---------- 6. canais ---------- */
function drawCa(cur){const box=$('db-ca'),g=grp(cur,'canal'),n=cur.length||1,it=[...g].map(([c,r])=>({label:c,v:r.length,s:pf(r.length/n),rem:r.filter(x=>x.rem).length/r.length})).sort((a,b)=>b.v-a.v);
 if(DQ.tbl.ca){box.innerHTML=tblHTML(['Canal','Protocolos','% do total','% remetidos'],it.map(x=>[esc(x.label),nf(x.v),x.s,pf(x.rem)]));return}
 it.forEach(x=>x.tip=[['','protocolos',nf(x.v)],['','do total',x.s],['','remetidos ao Pós-Venda',pf(x.rem)]]);
 hbars(box,it,{click:x=>{DQ.canal=x.label;renderDash()}})}

/* ---------- 7. heatmap dia × hora ---------- */
function drawHm(cur){const box=$('db-hm'),dn=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],ord=[1,2,3,4,5,6,0],hs=DHR.map((_,i)=>8+i),M={};
 cur.forEach(x=>{const k=x.dow+'|'+x.h;M[k]=(M[k]||0)+1});const mx=Math.max(1,...Object.values(M));
 if(DQ.tbl.hm){box.innerHTML=tblHTML(['Dia',...hs.map(h=>h+'h')],ord.map(d=>[dn[d],...hs.map(h=>nf(M[d+'|'+h]||0))]));return}
 box.innerHTML=`<div class="hm" style="--hc:${hs.length}"><span></span>${hs.map(h=>`<span class="hm-x">${h}h</span>`).join('')}${ord.map(d=>`<span class="hm-y">${dn[d]}</span>${hs.map(h=>{const v=M[d+'|'+h]||0;return `<span class="hm-c" tabindex="0" data-hm="${d}|${h}" style="--a:${(0.06+0.94*v/mx).toFixed(3)}"></span>`}).join('')}`).join('')}</div>
  <div class="hm-leg"><span>menos</span><span class="hm-sc"></span><span>mais (${nf(mx)} num horário)</span></div>`;
 box.querySelectorAll('[data-hm]').forEach(el=>{const [d,h]=el.dataset.hm.split('|');hov(el,()=>[`${dn[d]}, ${h}h às ${+h+1}h`,[['','protocolos',nf(M[el.dataset.hm]||0)]]])})}

function bindDash(cur){
 const setP=(a,b)=>{a=Math.max(0,Math.min(ND-1,a));b=Math.max(0,Math.min(ND-1,b));if(a>b)[a,b]=[b,a];DQ.d1=a;DQ.d2=b;renderDash()};
 app.querySelectorAll('[data-dq]').forEach(b=>b.onclick=()=>{const k=b.dataset.dq,T=ND-1,dw=(TODAY.getDay()+6)%7;
  if(k==='-1'){if(DQ.d1<=0)return toast('A base começa em '+dDate(0).toLocaleDateString('pt-BR'));setP(DQ.d1-1,DQ.d2-1)}
  else if(k==='+1'){if(DQ.d2>=T)return toast('Não há dados depois de hoje');setP(DQ.d1+1,DQ.d2+1)}
  else if(k==='ont')setP(T-1,T-1);else if(k==='hoje')setP(T,T);else if(k==='sem')setP(T-dw,T);else if(k==='mes')setP(T-(TODAY.getDate()-1),T)});
 $('dpok').onclick=()=>{const a=diOf($('dpd1').value),b=diOf($('dpd2').value);if(a===null||b===null){toast('Preencha as duas datas');return}if(a<0||b<0)toast('A base simulada começa em '+dDate(0).toLocaleDateString('pt-BR'));if(a>ND-1||b>ND-1)toast('Não há dados depois de '+dDate(ND-1).toLocaleDateString('pt-BR'));setP(a,b)};
 ['dpd1','dpd2'].forEach(i=>$(i).onkeydown=e=>{if(e.key==='Enter')$('dpok').click()});
 $('dcsv2').onclick=()=>$('dcsv').click();
 $('dfas').onchange=e=>{DQ.as=e.target.value;renderDash()};$('dfca').onchange=e=>{DQ.canal=e.target.value;renderDash()};$('dfat').onchange=e=>{DQ.at=e.target.value;renderDash()};
 $('dclr')&&($('dclr').onclick=()=>{DQ.as=DQ.canal=DQ.at='';DQ.fx={};renderDash()});
 app.querySelectorAll('[data-dtab]').forEach(b=>b.onclick=()=>{DQ.tab=b.dataset.dtab;renderDash()});
 app.querySelectorAll('[data-fxx]').forEach(b=>b.onclick=()=>{const f=Object.assign({},DQ.fx);delete f[b.dataset.fxx];DQ.fx=f;renderDash()});
 app.querySelectorAll('[data-tbl]').forEach(b=>b.onclick=()=>{const k=b.dataset.tbl;DQ.tbl[k]=!DQ.tbl[k];renderDash();$('dc-'+k)?.scrollIntoView({block:'nearest'})});
 app.querySelectorAll('[data-goadm]').forEach(b=>b.onclick=()=>go('adm'));
 $('dprint').onclick=()=>window.print();
 $('dcsv').onclick=()=>{const q=v=>`"${String(v).replace(/"/g,'""')}"`,head=['data','dia_semana','hora','assunto','topico','canal','atendente','tempo_registro_seg','remetido_pos_venda','remetido_novamente','dias_ate_concluir','em_aberto','responsavel_pos_venda','tipo_cliente','cliente','modalidade','transportadora','loja','uf','origem','pagamento','categoria','produto','valor_pedido','valor_envolvido','texto_outros'];
  const L=[head.join(';'),...cur.map(r=>[dDate(r.di).toLocaleDateString('pt-BR'),['dom','seg','ter','qua','qui','sex','sáb'][r.dow],r.h+'h',r.as,r.sub,r.canal,r.at,r.t,r.rem?'sim':'não',r.re?'sim':'não',r.pv===null?'':String(r.pv).replace('.',','),r.open?'sim':'não',r.resp||'',r.tipo||'',r.cli||'',r.mod?MODL[r.mod]:'',r.car||'',r.loja||'',r.uf||'',r.orig||'',r.pag||'',r.cat||'',r.prod||'',r.val?String(r.val).replace('.',','):'',r.mon?String(r.mon).replace('.',','):'',r.outTxt||''].map(q).join(';'))];
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+L.join('\r\n')],{type:'text/csv;charset=utf-8'}));a.download=`sac-painel-${isoD(DQ.d1)}_a_${isoD(DQ.d2)}.csv`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);toast(`${nf(cur.length)} protocolos exportados`)}}
let _drz;addEventListener('resize',()=>{if(S.v!=='dash')return;clearTimeout(_drz);_drz=setTimeout(()=>{const y=scrollY;renderDash();scrollTo(0,y)},200)});
$('nav-dash').onclick=e=>{e.preventDefault();go('dash')};

const isoD=di=>{const d=dDate(di);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
function diOf(v){if(!v)return null;const [y,m,d]=v.split('-').map(Number);return ND-1-Math.round((TODAY-new Date(y,m-1,d))/864e5)}
