/* Modal "pedido já tem protocolo aberto" e "verificar outros protocolos". */
/* ================= protocolos já abertos: modal do pedido + "verificar outros protocolos" ================= */
function pRowHTML(p,ped){const tag=ped&&p.ped===ped?'<span class="pbadge this"><i class="fa fa-link"></i> Deste pedido</span>':p.ped?`<span class="pbadge">Pedido #${p.ped}</span>`:'<span class="pbadge">Sem pedido</span>';
 return `<div class="pmrow">${asIc(p.as)}<div class="pmr-t"><b>${esc(asTxt(p))} › ${esc(subTxt(p))}</b><span class="pmr-m">${tag}<span>Protocolo <b>${p.num}</b> · aberto em ${p.ab.slice(0,5)}</span>${ageTag(p,'sm')}${stPill(p)}</span></div><div class="pmr-b"><button type="button" class="lbtn sm" data-pmsum="${p.num}"><i class="fa fa-eye"></i> Resumo</button><button type="button" class="gbtn sm" data-pmgo="${p.num}"><i class="fa fa-folder-open"></i> Abrir protocolo</button></div></div>`}
/* linha de protocolo no mesmo padrão da lista de pedidos: ícone, número + pedido, assunto · data, situação e "Abrir" */
function pPickHTML(p,ped){const tag=ped&&p.ped===ped?'<span class="pbadge this"><i class="fa fa-link"></i> Deste pedido</span>':p.ped?`<span class="pbadge">Pedido #${p.ped}</span>`:'<span class="pbadge">Sem pedido</span>';
 return `<button type="button" class="pedrow prow" data-pmgo="${p.num}">${asIc(p.as)}
  <span class="pr-main"><b>${p.num} ${tag}</b><small>${esc(asTxt(p))} › ${esc(subTxt(p))} · aberto em ${p.ab.slice(0,5)}</small></span>
  <span class="pr-st">${ageTag(p,'sm')}${stPill(p)}</span>
  <span class="pr-go">Abrir <i class="fa fa-chevron-right"></i></span></button>`}
const pListHTML=(L,ped)=>L.length===1?`<div class="lmlist">${pAccHTML(L[0],true,!!ped)}</div>`:`<div class="lmlist pedpick">${L.map(p=>pPickHTML(p,ped)).join('')}</div>`;
/* protocolos em andamento do cliente já expostos no novo atendimento, no mesmo formato da lista de pedidos */
function othListHTML(ps,ped,nome){ps=ps.slice().sort((a,b)=>b.num-a.num);const n=ps.length;
 return `<div class="card cvlist othlist"><div class="cvhead"><div><h2><i class="fa fa-folder-open-o"></i> ${ped?'Outros protocolos em andamento':'Protocolos em andamento'}${nome?` de ${esc(nome)}`:''} <span class="pill amber">${n}</span></h2><span class="soft">Confira se algum já trata o que o cliente está pedindo antes de abrir um novo</span></div></div><div class="pedpick">${ps.map(p=>pPickHTML(p,ped)).join('')}</div></div>`}
document.addEventListener('click',e=>{const b=e.target.closest('.othlist [data-pmgo]');if(b)go('proto',{p:b.dataset.pmgo})});
function othBarHTML(ps,ped){const lk=ped?ps.filter(p=>p.ped===ped).length:0;
 return `<div class="card othbar"><i class="fa fa-folder-open-o"></i><span>Este cliente tem <b>${ps.length} ${ped?`outro${ps.length>1?'s':''} `:''}protocolo${ps.length>1?'s':''} em andamento</b>${lk?` <span class="soft">(${lk} deste pedido)</span>`:''}</span><button type="button" class="lbtn sm" id="vothers"><i class="fa fa-list"></i> Verificar outros protocolos</button></div>`}
function listModal(id,html){let m=$(id);if(!m){m=document.createElement('div');m.id=id;m.className='pmodal';document.body.appendChild(m)}
 m.innerHTML=html;m.style.display='block';document.body.style.overflow='hidden';
 const close=()=>{m.style.display='none';document.body.style.overflow=''};m.querySelectorAll('[data-lmx]').forEach(b=>b.onclick=close);
 m.querySelectorAll('[data-pmgo]').forEach(b=>b.onclick=()=>{close();go('proto',{p:b.dataset.pmgo})});
 m.querySelectorAll('[data-pmsum]').forEach(b=>b.onclick=()=>{close();protoModal(b.dataset.pmsum)});
 m._close=close;setTimeout(()=>m.querySelector('[data-pmgo],[data-lmx]')?.focus(),30);return m}
document.addEventListener('keydown',e=>{if(e.key==='Escape')['pom','oom'].forEach(i=>{const m=$(i);m&&m.style.display==='block'&&m._close()})});
function pedCheck(openPs){if(!N||!N.ped||N.pmShown===N.ped)return;const L=openPs.filter(p=>p.ped===N.ped&&p.rem);N.pmShown=N.ped;if(!L.length)return;
 setTimeout(()=>listModal('pom',mBox({xAttr:'data-lmx',labelledby:'pomt',role:'alertdialog',cls:'lmbox'+(L.length===1?' duo solo':''),head:mHead('pomt','fa-folder-open',`O pedido #${N.ped} já tem ${L.length>1?L.length+' protocolos abertos':'protocolo aberto'}`,'data-lmx'),
  band:`<span>O ideal é registrar um <b>novo trâmite</b> no protocolo que já existe, em vez de abrir outro.${L.length>1?' Escolha em qual:':''}</span>`,body:pListHTML(L,N.ped),
  foot:`${L.length===1?`<button type="button" class="gbtn big" data-pmgo="${L[0].num}"><i class="fa fa-folder-open"></i> Abrir o protocolo ${L[0].num}<small>registrar um novo trâmite nele</small></button>`:''}`})),60)}
document.addEventListener('click',e=>{if(!e.target.closest('#vothers')||!N)return;const ped=N.ped,ps=PROTOS.filter(p=>isOpen(p)&&N.cli&&p.cli===N.cli&&!(ped&&p.ped===ped&&p.rem)).sort((a,b)=>b.num-a.num);
 const c=N.cli?CLIENTES[N.cli]:N.cliNovo;
 listModal('oom',mBox({xAttr:'data-lmx',labelledby:'oomt',cls:'lmbox',head:mHead('oomt','fa-list',`Outros protocolos de ${esc(c.nome)}`,'data-lmx',`<span class="pill" style="background:#fff;color:#1d5f8c">${ps.length} em andamento</span>`),
  band:`<span>Veja se algum já trata o que o cliente está pedindo antes de abrir um novo.</span>`,body:ps.length===1?`<div class="lmlist">${pAccHTML(ps[0],true)}</div>`:pListHTML(ps,ped),
  foot:`<button type="button" class="lbtn" data-lmx>Fechar</button>`}))});
