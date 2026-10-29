/* Tela de carregamento e esqueleto de loading. */
/* ================= carregamento ================= */
const FAST=!!window.SAC_FAST;let NOSK=false;
function splash(){if(FAST)return;const c=document.querySelector('.content'),r=c.getBoundingClientRect(),d=document.createElement('div');d.className='splash';d.setAttribute('role','status');d.setAttribute('aria-live','polite');
 d.style.left=r.left+'px';
 d.innerHTML=`<div class="spl-in"><div class="spl-ring"><span class="spl-ic"><i class="fa fa-headphones"></i></span></div><b class="spl-t">SAC <span>Kalunga</span></b><span class="spl-s" id="spls">Conectando ao ERP…</span><div class="spl-bar"><i></i></div></div>`;
 document.body.appendChild(d);const msgs=['Conectando ao ERP…','Carregando assuntos…','Buscando protocolos…','Pronto!'];let i=0;const iv=setInterval(()=>{i=Math.min(msgs.length-1,i+1);const e=$('spls');e&&(e.textContent=msgs[i])},320);
 setTimeout(()=>{clearInterval(iv);d.classList.add('out');setTimeout(()=>d.remove(),450)},1250)}
function skelHTML(v){const two=innerWidth>1100&&(v==='adm'||LAY!=='one'&&v==='proto');
 const blk=(h,w)=>`<div class="sk-b" style="height:${h}px;${w?'width:'+w:''}"></div>`;
 const card=n=>`<div class="card sk-card">${blk(14,'38%')}${Array.from({length:n},(_,i)=>blk(12,(90-i*13)+'%')).join('')}</div>`;
 const L=v==='proto'?`<div class="card sk-card sk-head">${blk(26,'30%')}${blk(14,'55%')}</div>${card(2)}${card(5)}`:card(2)+card(3)+card(4);
 return `<div class="sk ${two?'two':''}" aria-busy="true" aria-label="Carregando"><div class="sk-l">${L}</div>${two?`<div class="sk-r">${card(4)}${card(6)}</div>`:''}</div>`}
const _go0=go;let BUSY=false;
go=function(v,x){if(FAST||NOSK||!['novo','proto','cli','adm','dash'].includes(v)||BUSY)return _go0(v,x);BUSY=true;app.innerHTML=skelHTML(v);scrollTo(0,0);setTimeout(()=>{BUSY=false;_go0(v,x)},420)};
document.addEventListener('submit',e=>{const f=e.target;if(FAST||!['cform','pform','hform'].includes(f.id)||f.dataset.go)return;const inp=f.querySelector('input');if(!inp||!inp.value.trim())return;
 e.preventDefault();e.stopImmediatePropagation();const b=f.querySelector('button[type=submit]');if(b){b.dataset.lbl=b.innerHTML;b.innerHTML='<span class="spin"></span> Buscando…';b.disabled=true}f.classList.add('busy');
 setTimeout(()=>{f.dataset.go='1';if(b){b.disabled=false;b.innerHTML=b.dataset.lbl}f.classList.remove('busy');NOSK=true;try{if(typeof f.onsubmit==='function')f.onsubmit({preventDefault(){},target:f});else f.requestSubmit()}finally{NOSK=false}delete f.dataset.go},520)},true);
splash();
