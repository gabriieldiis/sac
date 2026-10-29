/* Divisória arrastável entre as colunas. */
/* ================= divisória arrastável: o usuário ajusta a largura das colunas ================= */
const SPLIT='<div class="split" role="separator" aria-orientation="vertical" tabindex="0" aria-label="Arrastar para ajustar a largura das colunas" title="Arraste para ajustar a largura · duplo clique volta ao padrão"><span></span></div>';
const SW_DEF=370;let SW=(()=>{try{return +localStorage.getItem('sac_sideW')||SW_DEF}catch(e){return SW_DEF}})();
function setSW(w,save){const lay=app.querySelector('.nlay,.play');const max=lay?Math.max(320,lay.clientWidth*0.65):900;SW=Math.round(Math.min(max,Math.max(280,w)));document.documentElement.style.setProperty('--sideW',SW+'px');
 const sp=app.querySelector('.split');sp&&sp.setAttribute('aria-valuenow',SW);if(save)try{localStorage.setItem('sac_sideW',SW)}catch(e){}}
function bindSplit(){const sp=app.querySelector('.split');setSW(SW);if(!sp)return;const lay=sp.parentNode;
 sp.onpointerdown=e=>{e.preventDefault();sp.setPointerCapture(e.pointerId);document.body.classList.add('dragging');
  const mv=ev=>{const r=lay.getBoundingClientRect();setSW(r.right-ev.clientX-5)};
  const up=()=>{sp.removeEventListener('pointermove',mv);sp.removeEventListener('pointerup',up);document.body.classList.remove('dragging');setSW(SW,true)};
  sp.addEventListener('pointermove',mv);sp.addEventListener('pointerup',up)};
 sp.ondblclick=()=>{setSW(SW_DEF,true);toast('Largura padrão')};
 sp.onkeydown=e=>{if(e.key==='ArrowLeft'){e.preventDefault();setSW(SW+30,true)}else if(e.key==='ArrowRight'){e.preventDefault();setSW(SW-30,true)}else if(e.key==='Home'){setSW(SW_DEF,true)}}}
addEventListener('resize',()=>app.querySelector('.split')&&setSW(SW));
