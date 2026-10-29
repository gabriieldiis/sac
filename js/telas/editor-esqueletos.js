/* Editor de esqueletos por assunto › tópico. */
/* ================= editor de esqueletos (por assunto › tópico) ================= */
const SKG3=[['cli','O que o cliente disse','fa-comment-o'],['pv','Quando vai para o Pós-Venda','fa-share'],['sol','Quando resolve no atendimento','fa-check']];
const SKV=[['{ped}','Nº do pedido'],['{transp}','Transportadora'],['{vol}','Volume'],['{nf}','Nota fiscal'],['{canal}','Canal do contato'],['{pag}','Forma de pagamento'],['[informar]','Campo para o atendente preencher']];
const SKL={x:'próprio deste tópico',b:'padrão do tópico',a:'padrão do assunto',g:'padrão geral'};
function sk2txt(h){const t=document.createElement('template');t.innerHTML=String(h).replace(/<mark>(.*?)<\/mark>/gi,'$1').replace(/<br\s*\/?>/gi,' ');return t.content.textContent.replace(/\s+/g,' ').trim()}
const txt2sk=t=>esc(t.trim()).replace(/\[([^\]]+)\]/g,'<mark>[$1]</mark>');
function skBtn(a,sub,i){const src=skSrc(a,sub,'cli')[1],own=!!SKX[a+'|'+sub],ed=AQ.ske&&AQ.ske.as===a&&AQ.ske.sub===sub;
 const cnt=SKG3.reduce((s,[k])=>s+((skSrc(a,sub,k)[0][k]||[]).length),0);
 return `<button type="button" class="skbtn${own?' own':''}${ed?' on':''}" data-skopen="${i}" aria-expanded="${!!ed}"><span><i class="fa fa-magic"></i> ${cnt} frase${cnt!==1?'s':''}</span><small>${own?'próprio':SKL[src]}</small></button>`}
function skOpen(a,sub){const g={};SKG3.forEach(([k])=>{g[k]=(skSrc(a,sub,k)[0][k]||[]).map(h=>({h,t:sk2txt(h),d:false}))});AQ.ske={as:a,sub,g,src:SKX[a+'|'+sub]?'x':skSrc(a,sub,'cli')[1],dirty:false}}
function skPrev(t){const o=ORDERS['67431409'],V={'{ped}':'67431409','{transp}':o.carrier,'{vol}':VOL['67431409'],'{nf}':o.nf,'{canal}':'Telefone','{pag}':o.pag};
 return txt2sk(t).replace(/\{(\w+)\}/g,m=>V[m]?`<b>${esc(V[m])}</b>`:m)}
function skEdHTML(){const E=AQ.ske;
 return `<div class="ske" id="ske"><div class="ske-h"><div><b><i class="fa fa-magic"></i> Esqueleto de “${esc(E.sub)}”</b><span class="soft">${E.src==='x'?'Este tópico tem esqueleto próprio.':`Hoje usa o ${SKL[E.src]}. Ao salvar, este tópico passa a ter o próprio.`} As frases viram botões no registro: o atendente clica e a frase entra no texto.</span></div><button type="button" class="lbtn sm" data-skx><i class="fa fa-times"></i> Fechar</button></div>
  <div class="ske-vars"><span>Inserir dado do pedido na frase:</span>${SKV.map(([v,l])=>`<button type="button" class="skv" data-skv="${v}" title="Insere ${esc(v)}">${l}</button>`).join('')}</div>
  <div class="ske-gs">${SKG3.map(([k,l,ic])=>`<div class="ske-g"><div class="ske-gt"><i class="fa ${ic}"></i> ${l}</div>${E.g[k].map((r,j)=>`<div class="ske-r"><input data-ske="${k}|${j}" value="${esc(r.t)}" aria-label="${l}: frase ${j+1}" maxlength="160" autocomplete="off"><button type="button" class="ske-b" data-skm="${k}|${j}|-1" title="Subir" aria-label="Subir" ${j?'':'disabled'}><i class="fa fa-arrow-up"></i></button><button type="button" class="ske-b" data-skm="${k}|${j}|1" title="Descer" aria-label="Descer" ${j<E.g[k].length-1?'':'disabled'}><i class="fa fa-arrow-down"></i></button><button type="button" class="ske-b del" data-skd="${k}|${j}" title="Remover" aria-label="Remover frase"><i class="fa fa-trash-o"></i></button></div>`).join('')||'<p class="soft ske-none">Nenhuma frase.</p>'}<button type="button" class="lnk" data-ska="${k}"><i class="fa fa-plus"></i> Adicionar frase</button></div>`).join('')}</div>
  <div class="ske-pv"><span class="soft">Como o atendente vai ver (exemplo com o pedido 67431409):</span><div class="skchips">${SKG3.flatMap(([k])=>E.g[k].filter(r=>r.t.trim()).map(r=>`<span class="skc"><i class="fa fa-plus"></i> ${skPrev(r.t)}</span>`)).join('')||'<span class="soft">—</span>'}</div></div>
  <div class="ske-f"><button type="button" class="gbtn sm" data-sks><i class="fa fa-check"></i> Salvar esqueleto</button>${E.src==='x'?'<button type="button" class="lbtn sm" data-skr><i class="fa fa-undo"></i> Voltar ao padrão</button>':''}<span class="soft">Dica: use [colchetes] para o que o atendente precisa completar.</span></div></div>`}
let SKF=null;
function bindSkEd(a){
 app.querySelectorAll('[data-skopen]').forEach(b=>b.onclick=()=>{const sub=AS[a].s[+b.dataset.skopen][0];if(AQ.ske&&AQ.ske.sub===sub&&AQ.ske.as===a){if(AQ.ske.dirty&&!confirm('Fechar sem salvar as mudanças do esqueleto?'))return;AQ.ske=null}else{if(AQ.ske&&AQ.ske.dirty&&!confirm('Há mudanças não salvas no esqueleto aberto. Descartar?'))return;skOpen(a,sub)}renderAdm();$('ske')?.scrollIntoView({block:'nearest',behavior:'smooth'})});
 const E=AQ.ske;if(!E||!$('ske'))return;
 const rr=(fn)=>{const y=scrollY;fn();E.dirty=true;renderAdm();scrollTo(0,y)};
 app.querySelectorAll('[data-ske]').forEach(inp=>{const [k,j]=inp.dataset.ske.split('|');inp.oninput=()=>{const r=E.g[k][+j];r.t=inp.value;r.d=true;E.dirty=true;const pv=app.querySelector('.ske-pv .skchips');pv.innerHTML=SKG3.flatMap(([kk])=>E.g[kk].filter(x=>x.t.trim()).map(x=>`<span class="skc"><i class="fa fa-plus"></i> ${skPrev(x.t)}</span>`)).join('')||'<span class="soft">—</span>'};
  inp.onfocus=()=>{SKF=inp};inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();rr(()=>{E.g[k].splice(+j+1,0,{h:'',t:'',d:true})});setTimeout(()=>app.querySelector(`[data-ske="${k}|${+j+1}"]`)?.focus(),20)}}});
 app.querySelectorAll('[data-skv]').forEach(b=>{b.onmousedown=e=>e.preventDefault();b.onclick=()=>{const inp=SKF&&document.body.contains(SKF)?SKF:app.querySelector('[data-ske]');if(!inp){toast('Adicione uma frase primeiro');return}
  const v=b.dataset.skv,st=inp.selectionStart??inp.value.length,en=inp.selectionEnd??st;inp.value=inp.value.slice(0,st)+v+inp.value.slice(en);inp.focus();inp.setSelectionRange(st+v.length,st+v.length);inp.dispatchEvent(new Event('input'))}});
 app.querySelectorAll('[data-ska]').forEach(b=>b.onclick=()=>{const k=b.dataset.ska;rr(()=>E.g[k].push({h:'',t:'',d:true}));setTimeout(()=>app.querySelector(`[data-ske="${k}|${E.g[k].length-1}"]`)?.focus(),20)});
 app.querySelectorAll('[data-skd]').forEach(b=>b.onclick=()=>{const [k,j]=b.dataset.skd.split('|');rr(()=>E.g[k].splice(+j,1))});
 app.querySelectorAll('[data-skm]').forEach(b=>b.onclick=()=>{const [k,j,d]=b.dataset.skm.split('|'),A=E.g[k],i=+j,t=i+ +d;rr(()=>{[A[i],A[t]]=[A[t],A[i]]});setTimeout(()=>app.querySelector(`[data-skm="${k}|${t}|${d}"]`)?.focus(),20)});
 app.querySelector('[data-skx]').onclick=()=>{if(E.dirty&&!confirm('Fechar sem salvar as mudanças do esqueleto?'))return;AQ.ske=null;renderAdm()};
 app.querySelector('[data-sks]').onclick=()=>{const o={};SKG3.forEach(([k])=>{o[k]=E.g[k].filter(r=>r.t.trim()).map(r=>r.d?txt2sk(r.t):r.h)});
  if(!SKG3.some(([k])=>o[k].length)){toast('Coloque pelo menos uma frase');return}
  SKX[a+'|'+E.sub]=o;admLog(`Salvou o esqueleto de <b>${esc(E.sub)}</b> em ${esc(a)} (${SKG3.reduce((s,[k])=>s+o[k].length,0)} frases)`);toast('Esqueleto salvo: já aparece no registro desse tópico');AQ.ske=null;renderAdm()};
 const rs=app.querySelector('[data-skr]');rs&&(rs.onclick=()=>{if(!confirm('Apagar o esqueleto próprio e voltar ao padrão?'))return;delete SKX[a+'|'+E.sub];admLog(`Voltou o esqueleto de <b>${esc(E.sub)}</b> ao padrão`);AQ.ske=null;toast('Esqueleto voltou ao padrão');renderAdm()})}
