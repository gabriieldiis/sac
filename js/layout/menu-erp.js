/* Abre e fecha o menu lateral do ERP. */
/* ================= menu lateral do ERP: abre e fecha ================= */
(function(){const b=$('sbtog'),sb=$('sidebar'),bg=$('sbbg');if(!b||!sb)return;
 sb.querySelectorAll('a').forEach(a=>{const t=a.textContent.replace(/\s+/g,' ').trim();a.dataset.lbl=t;a.setAttribute('aria-label',t)});
 const mob=()=>innerWidth<=800;let mini=LS.get('sac_sb')==='mini';
 function apply(){const bd=document.body,open=mob()?bd.classList.contains('sb-open'):!mini;bd.classList.toggle('sb-mini',!mob()&&mini);
  b.setAttribute('aria-expanded',open);b.setAttribute('aria-label',open?'Fechar o menu lateral':'Abrir o menu lateral')}
 b.onclick=()=>{if(mob()){document.body.classList.toggle('sb-open')}else{mini=!mini;LS.set('sac_sb',mini?'mini':'full');document.body.classList.add('sbanim');setTimeout(()=>{document.body.classList.remove('sbanim');dispatchEvent(new Event('resize'))},260)}apply()};
 bg.onclick=()=>{document.body.classList.remove('sb-open');apply()};
 sb.addEventListener('click',e=>{if(mob()&&e.target.closest('a'))setTimeout(()=>{document.body.classList.remove('sb-open');apply()},60)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('sb-open')){document.body.classList.remove('sb-open');apply();b.focus()}});
 addEventListener('resize',()=>{if(!mob())document.body.classList.remove('sb-open');apply()});apply()})();
