/* Histórico do protocolo: ordem, busca e destaque. */
/* ================= histórico do protocolo (destaque, ordem, busca) ================= */
const TYI={fwd:'fa-share-square-o',cli:'fa-comments',rem:'fa-share',env:'fa-paper-plane',ret:'fa-reply',int:'fa-sticky-note',sis:'fa-cog',fim:'fa-check'};
function histSecHTML(p){const asc=S.hOrd==='asc',L=asc?p.tram.slice():p.tram.slice().reverse();let lastD='',h='';
 L.forEach(([d,q,t,c,x,mail],i)=>{const day=d.slice(0,10);if(day!==lastD){h+=`<li class="hday"><span>${day===fmtD(TODAY)?'Hoje · ':''}${day}</span></li>`;lastD=day}
  const rg=L[i][6];if(rg){h+=regHTML(d,q,c,rg,mail,L[i]);return}
  h+=hCard({cls:'',col:TY[t][1],ic:TYI[t]||'fa-circle',ty:TY[t][0],q,c,d,e:L[i],body:x?`<div class="rtx hbody">${richOut(x)}</div>`:'',mail});});
 return `<div class="card hsec" id="hsec"><div class="hhead"><div class="ht"><i class="fa fa-history"></i> Histórico do protocolo <span class="hcount">${p.tram.length} registro${p.tram.length>1?'s':''}</span></div>
  <div class="htools"><div class="hsearch"><i class="fa fa-search"></i><input type="search" id="hq" placeholder="Buscar no histórico… ex.: estorno, transportadora" value="${esc(S.hq||'')}" aria-label="Buscar no histórico" autocomplete="off"><span class="hres" id="hres"></span><button type="button" id="hprev" title="Anterior" aria-label="Ocorrência anterior" hidden><i class="fa fa-chevron-up"></i></button><button type="button" id="hnext" title="Próxima" aria-label="Próxima ocorrência" hidden><i class="fa fa-chevron-down"></i></button></div>
  <div class="choice hord" role="group" aria-label="Ordem do histórico"><button type="button" data-hord="desc" aria-pressed="${!asc}"><i class="fa fa-sort-amount-desc"></i> Mais recente primeiro</button><button type="button" data-hord="asc" aria-pressed="${asc}"><i class="fa fa-sort-amount-asc"></i> Mais antigo primeiro</button></div></div></div>
  <ul class="htl">${h}</ul></div>`}
function bindHist(p){const sec=$('hsec');if(!sec)return;
 sec.querySelectorAll('[data-hord]').forEach(b=>b.onclick=()=>{S.hOrd=b.dataset.hord;const y=sec.getBoundingClientRect().top;render();const n=$('hsec');scrollBy(0,n.getBoundingClientRect().top-y)});
 const inp=$('hq');let cur=0;
 const run=()=>{S.hq=inp.value;sec.querySelectorAll('mark.hm').forEach(m=>m.replaceWith(document.createTextNode(m.textContent)));sec.querySelectorAll('.hit').forEach(li=>{li.classList.remove('hhit');li.normalize()});
  const q=nrm(inp.value.trim()),res=$('hres');let n=0,hits=0;
  if(q){sec.querySelectorAll('.hit').forEach(li=>{let found=false;const W=document.createTreeWalker(li.querySelector('.hcard'),NodeFilter.SHOW_TEXT);const nodes=[];while(W.nextNode())nodes.push(W.currentNode);
   nodes.forEach(tn=>{const t=tn.textContent,tn2=[...t].map(ch=>nrm(ch)||ch).join('');if(tn2.length!==t.length)return;let i=tn2.indexOf(q),last=0;if(i<0)return;const fr=document.createDocumentFragment();
    while(i>=0){fr.appendChild(document.createTextNode(t.slice(last,i)));const m=document.createElement('mark');m.className='hm';m.textContent=t.slice(i,i+q.length);fr.appendChild(m);n++;found=true;last=i+q.length;i=tn2.indexOf(q,last)}
    fr.appendChild(document.createTextNode(t.slice(last)));tn.replaceWith(fr)});if(found){li.classList.add('hhit');hits++}})}
  sec.querySelectorAll('mark.hm').forEach(m=>{const d=m.closest('details');if(d)d.open=true});res.textContent=q?(n?`${n} encontrado${n>1?'s':''} em ${hits} registro${hits>1?'s':''}`:'nada encontrado'):'';res.className='hres'+(q&&!n?' none':'');
  $('hprev').hidden=$('hnext').hidden=!n;cur=-1;sec.classList.toggle('searching',!!q)};
 const go2=d=>{const ms=[...sec.querySelectorAll('mark.hm')];if(!ms.length)return;ms.forEach(m=>m.classList.remove('cur'));cur=(cur+d+ms.length)%ms.length;ms[cur].classList.add('cur');ms[cur].scrollIntoView({block:'center',behavior:'smooth'});$('hres').textContent=`${cur+1} de ${ms.length}`};
 inp.addEventListener('input',run);inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go2(e.shiftKey?-1:1)}});
 $('hnext').onclick=()=>go2(1);$('hprev').onclick=()=>go2(-1);if(inp.value)run()}
