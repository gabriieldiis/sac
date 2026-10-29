/* Editor de texto do registro (negrito, lista, destaque). */
/* ================= editor de texto ================= */
const RTB=[['bold','fa-bold','Negrito (Ctrl+B)'],['italic','fa-italic','Itálico (Ctrl+I)'],['underline','fa-underline','Sublinhado (Ctrl+U)'],['hl','fa-pencil','Marca-texto'],['red','fa-font','Texto em vermelho'],['insertUnorderedList','fa-list-ul','Lista com marcadores'],['insertOrderedList','fa-list-ol','Lista numerada'],['removeFormat','fa-eraser','Limpar formatação']];
function rte(id,html,ph){return `<div class="rte"><div class="rtb" role="toolbar" aria-label="Formatação do texto">${RTB.map(([c,ic,t],i)=>`${i===3||i===5||i===7?'<span class="sep"></span>':''}<button type="button" data-cmd="${c}" title="${t}" aria-label="${t}" class="${c==='hl'?'hl':c==='red'?'rd':''}"><i class="fa ${ic}"></i></button>`).join('')}</div><div class="rta" id="${id}" contenteditable="true" role="textbox" aria-multiline="true" data-ph="${esc(ph||'')}">${clean(html||'')}</div></div>`}
function bindRTE(root,cb){root.querySelectorAll('.rte').forEach(w=>{const ed=w.querySelector('.rta');
 const sync=()=>{w.querySelectorAll('[data-cmd]').forEach(b=>{const c=b.dataset.cmd;if(['bold','italic','underline','insertUnorderedList','insertOrderedList'].includes(c)){let on=false;try{on=document.queryCommandState(c)}catch(e){}b.classList.toggle('on',on&&document.activeElement===ed)}});ed.classList.toggle('empty',!ed.textContent.trim()&&!ed.querySelector('li'));cb&&cb(ed.id,ed.innerHTML)};
 w.querySelectorAll('[data-cmd]').forEach(b=>{b.onmousedown=e=>e.preventDefault();b.onclick=()=>{ed.focus();const c=b.dataset.cmd;
  if(c==='hl')document.execCommand('hiliteColor',false,'#fff176');else if(c==='red')document.execCommand('foreColor',false,'#c0392b');else if(c==='removeFormat'){document.execCommand('removeFormat');document.execCommand('hiliteColor',false,'transparent')}else document.execCommand(c);sync()}});
 ed.addEventListener('input',sync);ed.addEventListener('keyup',sync);ed.addEventListener('mouseup',sync);ed.addEventListener('blur',sync);
 ed.addEventListener('paste',e=>{e.preventDefault();document.execCommand('insertText',false,(e.clipboardData||window.clipboardData).getData('text/plain'))});
 ed.classList.toggle('empty',!ed.textContent.trim())})}
function clean(h){const t=document.createElement('template');t.innerHTML=h;const OK={B:1,STRONG:1,I:1,EM:1,U:1,BR:1,UL:1,OL:1,LI:1,DIV:1,P:1,SPAN:1,FONT:1,MARK:1};
 (function walk(n){[...n.childNodes].forEach(c=>{if(c.nodeType===3)return;if(c.nodeType!==1){c.remove();return}
  if(!OK[c.tagName]){walk(c);c.replaceWith(...c.childNodes);return}
  const dsk=c.getAttribute('data-sk'),dskl=c.hasAttribute('data-skl'),bg=c.style&&c.style.backgroundColor,fg=(c.style&&c.style.color)||c.getAttribute('color');[...c.attributes].forEach(a=>c.removeAttribute(a.name));
  if(c.tagName==='SPAN'||c.tagName==='FONT'){if(bg&&bg!=='transparent'&&!/rgba\([^)]*,\s*0\)/.test(bg))c.style.backgroundColor=bg;if(fg)c.style.color=fg}
  if(dsk&&c.tagName==='LI')c.setAttribute('data-sk',dsk);if(dskl&&(c.tagName==='UL'))c.setAttribute('data-skl','');
  walk(c)})})(t.content);return t.innerHTML}
function txtOf(h){const t=document.createElement('template');t.innerHTML=h||'';return t.content.textContent.trim()}
const richOut=x=>/<[a-z][^>]*>|&[a-z#0-9]+;/i.test(x)?clean(x):esc(x).replace(/\n/g,'<br>');
function histHTML(p,limit){const L=p.tram.slice().reverse(),shown=limit?L.slice(0,limit):L;
 return `<ul class="hist">${shown.map(([d,q,t,c,x])=>`<li><div class="av" style="background:${TY[t][1]}">${esc(q[0])}</div><div class="bub"><div class="meta"><span class="ty" style="background:${TY[t][1]}">${TY[t][0]}</span><b>${esc(q)}</b><span>${d}</span><span>via ${esc(c)}</span></div><div class="rtx">${richOut(x)}</div></div></li>`).join('')}</ul>`}
