/* Painel da diretoria: comparação de cada gráfico com o mesmo período do mês passado, do ano passado ou de 2 anos atrás.
   A barra de comparação aparece logo abaixo de cada item, em outra cor. Dados simulados (base gerada por dia). */
DQ.cmp=DQ.cmp||{};
const CMPM={m:['Mês passado',1],y:['Ano passado',12],y2:['2 anos atrás',24]};
const cnt=r=>r.length,avg=f=>r=>r.length?r.reduce((a,x)=>a+f(x),0)/r.length:0;
const CMPC={
 as:{key:x=>DQ.as?x.sub:x.as},ast:{key:x=>x.as+'|'+x.sub},ca:{key:x=>x.canal},tas:{key:x=>DQ.as?x.sub:x.as,met:avg(x=>x.t),min:3},
 mod:{pre:x=>x.mod,key:x=>x.mod},car:{pre:x=>x.mod==='cd',key:x=>x.car},loja:{pre:x=>x.mod&&x.mod!=='cd',key:x=>x.loja},
 uf:{pre:x=>x.mod,key:x=>x.uf},orig:{pre:x=>x.mod,key:x=>x.orig},pag:{pre:x=>x.mod,key:x=>x.pag},cat:{pre:x=>x.mod,key:x=>x.cat},tipo:{key:x=>x.tipo},
 rea:{pre:x=>x.rem,key:x=>x.as,met:r=>r.length?r.filter(x=>x.re).length/r.length:0,min:5},out:{pre:x=>x.outTxt,key:x=>x.outTxt},
 prod:{pre:x=>x.prod,key:x=>x.prod},pva:{pre:x=>x.pv!==null,key:x=>x.as,met:avg(x=>x.pv),min:3}};

/* gera a base simulada de um dia qualquer (inclusive antes da janela de 180 dias), sempre igual para o mesmo dia */
function genDay(di){const R=mulberry(20261016+di*7919),pick=w=>{const s=w.reduce((a,x)=>a+x[1],0);let r=R()*s;for(const x of w){r-=x[1];if(r<=0)return x[0]}return w[w.length-1][0]},gs=()=>Math.sqrt(-2*Math.log(R()||1e-9))*Math.cos(2*Math.PI*R());
 const asW=Object.keys(AS).map(a=>[a,DW[a]||0.5]),hrW=DHR.map((w,i)=>[8+i,w]),out=[],dow=dDate(di).getDay(),grow=Math.pow(1.13,di/365);
 let n=Math.round((dow===0?12:dow===6?30:85)*(0.88+R()*0.24)*grow);
 for(let k=0;k<n;k++){const as=pick(asW),subs=AS[as].s.filter(x=>x[0]!=='Outro'),sw=subs.length?subs.map((x,i)=>[x,1/(i+1.3)]):[[['Outro','v'],1]],sb=pick(sw),[at,f]=ATS[Math.floor(R()*ATS.length)];
  let t=(DT[as]||180)*f*Math.exp(gs()*0.33)*(1+Math.max(0,-di)/900);t=Math.round(Math.max(40,Math.min(1500,t)));
  const rem=R()<(sb[1]==='r'?0.58:0.05),re=rem&&R()<(as==='Consulta de Pedido'?0.13:0.07);
  let pv=null;if(rem){pv=+((DPV[as]||4)*Math.exp(gs()*0.55)*(1+Math.max(0,-di)/1200)).toFixed(1);if(re)pv=+(pv*1.6).toFixed(1)}
  out.push({di,dow,h:pick(hrW),as,sub:sb[0],canal:pick(DCAN),at,t,rem,re,pv,open:false,age:0})}
 return out}
const _cmpCache={};
function shiftDi(di,months){const d=dDate(di),x=new Date(d.getFullYear(),d.getMonth()-months,d.getDate());return ND-1-Math.round((TODAY-x)/864e5)}
function cmpRange(mode){const a=shiftDi(DQ.d1,CMPM[mode][1]);return [a,a+(DQ.d2-DQ.d1)]}
function cmpRows(mode){const [a,b]=cmpRange(mode),k=mode+'|'+a+'|'+b;
 if(!_cmpCache[k]){let rows=[];const base=dsAll(),extra=[];for(let d=a;d<=b;d++){if(d>=0&&d<ND)continue;extra.push(...genDay(d))}
  rows=base.filter(r=>r.di>=a&&r.di<=b).concat(extra.length?enrichDS(extra):[]);_cmpCache[k]=rows}
 return dFilter(_cmpCache[k],a-1,b)}
function cmpFmtRange(mode){const [a,b]=cmpRange(mode),f=d=>dDate(d).toLocaleDateString('pt-BR');return a===b?f(a):`${f(a)} a ${f(b)}`}
function cmpBtns(id){if(!CMPC[id])return '';const m=DQ.cmp[id]||'';
 return `<div class="dcmp" role="group" aria-label="Comparar com"><span>Comparar:</span>${Object.entries(CMPM).map(([k,[l]])=>`<button type="button" data-cmp="${id}|${k}" aria-pressed="${m===k}">${l}</button>`).join('')}</div>`}
function cmpLegend(id){const m=DQ.cmp[id];if(!m||!CMPC[id])return '';
 return `<div class="dleg dcmp-leg"><span><i style="background:var(--c1)"></i>Período escolhido</span><span><i style="background:var(--c2)"></i>${CMPM[m][0]} · ${cmpFmtRange(m)}</span></div>`}
/* valores de comparação por item, no mesmo formato do gráfico */
function cmpValues(id){const m=DQ.cmp[id],c=CMPC[id];if(!m||!c)return null;const rows=cmpRows(m).filter(c.pre||(()=>true)),g=grp(rows,c.key),met=c.met||cnt,out=new Map();
 g.forEach((r,k)=>{if(!c.min||r.length>=c.min)out.set(k,met(r))});return out}
document.addEventListener('click',e=>{const b=e.target.closest('[data-cmp]');if(!b)return;const [id,m]=b.dataset.cmp.split('|');DQ.cmp=Object.assign({},DQ.cmp,{[id]:DQ.cmp[id]===m?'':m});
 const y=scrollY;renderDash();scrollTo(0,y)});
