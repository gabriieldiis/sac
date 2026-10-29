/* Modal com o resumo de um protocolo. */
/* ================= modal do protocolo ================= */
function protoModal(num){const p=PROTOS.find(x=>x.num===num);if(!p)return;let m=$('pm');
 if(!m){m=document.createElement('div');m.id='pm';m.className='pmodal';document.body.appendChild(m)}
 const inNovo=S.v==='novo';
 m.innerHTML=`<div class="pm-bg" data-pmx></div><div class="pm-box card pcard" role="dialog" aria-modal="true" aria-label="Protocolo ${p.num}">${pHead(p,'<button type="button" class="pm-x" data-pmx aria-label="Fechar"><i class="fa fa-times"></i></button>')}${whoHTML(p)}
  <div class="phist"><div class="soft" style="font-size:12.5px;font-weight:700;margin-bottom:8px">Últimos registros</div>${histHTML(p,4)}</div>
  <div class="pm-foot">${inNovo?'<span class="soft" style="font-size:12.5px;margin-right:auto">Ao ir para o protocolo, este novo atendimento é descartado.</span>':''}<button type="button" class="lbtn" data-pmx>${inNovo?'Continuar o novo atendimento':'Fechar'}</button><button type="button" class="gbtn blue" id="pmgo"><i class="fa fa-folder-open-o"></i> Ir para o protocolo</button></div></div>`;
 m.style.display='block';document.body.style.overflow='hidden';
 m.querySelectorAll('[data-pmx]').forEach(b=>b.onclick=closeModal);
 m.querySelectorAll('[data-cpn]').forEach(b=>b.onclick=()=>copyTxt(b.dataset.cpn,'Número copiado'));
 $('pmgo').onclick=()=>{closeModal();go('proto',{p:num})};setTimeout(()=>$('pmgo').focus(),30)}
function closeModal(){const m=$('pm');if(m){m.style.display='none';document.body.style.overflow=''}}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.addEventListener('click',e=>{const b=e.target.closest('[data-pmodal]');if(b){e.preventDefault();e.stopPropagation();protoModal(b.dataset.pmodal)}},true);
function orderRowHTML(ped,btn){const o=ORDERS[ped],op=protosOf(ped).filter(p=>isOpen(p)&&p.num!==S.p);
 return `<div class="orow"><div><span>Data do pedido</span><b>${o.data}</b></div><div><span>Origem</span><b>${o.origem}</b></div><div><span>Pedido</span><b>${ped}${o.kom!==ped?' / '+o.kom:''}</b></div><div><span>Total</span><b>${money(o.total)}</b></div><div><span>Entrega</span><b>${transpOf(o)}</b></div><div><span>Status</span><b>${o.stt}</b></div>
  <div class="oend">${delayTag(o)}${op.map(p=>`<button type="button" class="pill amber pbtn" data-pmodal="${p.num}" title="Ver o protocolo"><i class="fa fa-folder-open-o"></i> Protocolo ${p.num}</button>`).join('')}${btn||''}</div></div>`}
