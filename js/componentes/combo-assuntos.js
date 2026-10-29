/* Campo de assunto com digitação e autocompletar; atalho "/" para pesquisar. */
/* ================= combo de assuntos (digitar + autocompletar) ================= */
const ASI={'Consulta de Pedido':'fa-search','Devolução':'fa-undo','Cancelamento (Exceção)':'fa-ban','2a. via Fatura/Boleto/Arquivo XML':'fa-file-text-o','Abatimento':'fa-percent','Alterações Site':'fa-pencil-square-o','Avaria':'fa-chain-broken','Cadastro de Logradouro':'fa-map-marker','Cancelamento (orientação)':'fa-info-circle','Cancelamento Site':'fa-times-circle','Copy & Print':'fa-print','Devolução Site':'fa-reply','Dúvidas (Preço|Promoção|Desconto)':'fa-tag','Dúvidas sobre o site':'fa-question-circle','Elogios':'fa-thumbs-o-up','Entrega da Loja':'fa-motorcycle','Estornos Diversos':'fa-money','Falta de produto na entrega':'fa-cube','Formas de Pagamento':'fa-credit-card','Fornecedor':'fa-industry','Fraude':'fa-shield','Garantia Estendida':'fa-certificate','Internet':'fa-globe','Jurídico':'fa-gavel','Liberar Pedido':'fa-unlock','Ligação para Outros Departamentos':'fa-phone-square','Lojas':'fa-building','Outros':'fa-ellipsis-h','Produtos (Dúvidas)':'fa-cubes','Prorrogação boleto faturado':'fa-calendar-plus-o','Reclamação':'fa-exclamation-triangle','Redes Sociais':'fa-share-alt','Retirada em loja':'fa-shopping-bag','Retorno transportadora Kalunga':'fa-truck','Solicitações Diversas':'fa-inbox','Spiral':'fa-book','Sugestões':'fa-lightbulb-o','Televendas':'fa-headphones','Transportadora':'fa-truck','Troca Online (orientação)':'fa-exchange','Uniforme PMSP':'fa-user'};
const ASC={x:'#2682bf',o:'#605ca8',n:'#00a65a'};
const ASM={x:'precisa de pedido',o:'pedido opcional',n:'sem pedido'};
const nrm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function comboHTML(id,ph){return `<div class="combo" id="${id}"><div class="cb-in"><i class="fa fa-search cb-s"></i><div class="cb-f"><span class="cb-ghost" aria-hidden="true"></span><input type="text" role="combobox" aria-expanded="false" aria-autocomplete="both" aria-controls="${id}-l" placeholder="${esc(ph)}" autocomplete="off" spellcheck="false"></div><span class="cb-hint" hidden>Tab para completar</span><i class="fa fa-chevron-down cb-c"></i></div><ul class="cb-list" id="${id}-l" role="listbox" hidden></ul></div>`}
function cbSearch(items,q,noSub,pri){const n=nrm(q.trim());if(!n)return items.map(a=>({a}));const r=[];
 items.forEach(a=>{const na=nrm(a);let sc=-1,sub='';
  if(na.startsWith(n))sc=0;else if(na.split(/[\s(|/.]+/).some(w=>w&&w.startsWith(n)))sc=1;else if(na.includes(n))sc=2;
  else if(!noSub){const s=AS[a].s.find(x=>!x.off&&x[0]!=='Outro'&&nrm(x[0]).includes(n));if(s){sc=3;sub=s[0]}}
  if(sc>=0)r.push({a,sc,sub})});const pr=a=>(pri||TOP3).includes(a)?0:1;return r.sort((x,y)=>x.sc-y.sc||pr(x.a)-pr(y.a)||x.a.localeCompare(y.a))}
function hlm(t,q){const n=nrm(q.trim());if(!n)return esc(t);const i=nrm(t).indexOf(n);return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+n.length))+'</mark>'+esc(t.slice(i+n.length))}
function bindCombo(id,items,onPick,o){o=o||{};const w=$(id);if(!w)return;const inp=w.querySelector('input'),ul=w.querySelector('.cb-list'),gh=w.querySelector('.cb-ghost'),hint=w.querySelector('.cb-hint');let res=[],act=0,open=false;
 const top=(o.top||TOP3).filter(a=>items.includes(a));
 const IC=o.ic||(a=>ASI[a]||'fa-circle'),CO=o.col||(a=>ASC[AS[a].p]),ME=o.meta||(a=>`${ASM[AS[a].p]} · ${subsOn(a).length} sub-assuntos`),noun=o.noun||'assunto';
 const item=(r,i,q)=>`<li role="option" id="${id}-o${i}" class="cb-it ${i===act?'act':''}" data-i="${i}" aria-selected="${i===act}"><span class="cb-ic" style="background:${CO(r.a)}"><i class="fa ${IC(r.a)}"></i></span><span class="cb-tx"><b>${hlm(r.a,q)}</b>${r.sub?`<small><i class="fa fa-level-up fa-rotate-90"></i> tópico: ${hlm(r.sub,q)}</small>`:''}</span>${i===act?'<span class="cb-k">Enter</span>':''}</li>`;
 function draw(){const q=inp.value;res=cbSearch(items,q,o.noSub,o.top);if(!q.trim()&&top.length){res=[...top.map(a=>({a})),...res.filter(r=>!top.includes(r.a))]}
  if(act>=res.length)act=0;let h='';
  if(!q.trim()&&top.length)h+=`<li class="cb-g">${o.topLabel||'Mais usados'}</li>${res.slice(0,top.length).map((r,i)=>item(r,i,q)).join('')}<li class="cb-g">${o.allLabel||'Todos os assuntos'}</li>${res.slice(top.length).map((r,i)=>item(r,i+top.length,q)).join('')}`;
  else h=res.length?res.map((r,i)=>item(r,i,q)).join(''):`<li class="cb-empty"><i class="fa fa-search"></i> Nenhum ${noun} com "${esc(q)}". Tente outra palavra.</li>`;
  ul.innerHTML=h;ul.hidden=!open;inp.setAttribute('aria-expanded',open);inp.setAttribute('aria-activedescendant',res.length?`${id}-o${act}`:'');
  const a=ul.querySelector('.act');a&&a.scrollIntoView({block:'nearest'});
  // ghost
  const r=res[act],n=nrm(q);let g='';if(q&&r&&nrm(r.a).startsWith(n)&&q.length<r.a.length)g=`<span class="gq">${esc(q)}</span>${esc(r.a.slice(q.length))}`;gh.innerHTML=g;hint.hidden=!(q&&res.length);
  ul.querySelectorAll('.cb-it').forEach(li=>{li.onmousedown=e=>e.preventDefault();li.onclick=()=>pick(+li.dataset.i);li.onmousemove=()=>{if(act!==+li.dataset.i){act=+li.dataset.i;draw()}}})}
 function pick(i){const r=res[i];if(!r)return;open=false;ul.hidden=true;inp.value=r.a;gh.innerHTML='';onPick(r.a,r.sub)}
 inp.addEventListener('focus',()=>{open=true;draw()});inp.addEventListener('click',()=>{open=true;draw()});
 inp.addEventListener('input',()=>{open=true;act=0;draw()});
 inp.addEventListener('blur',()=>setTimeout(()=>{open=false;ul.hidden=true;gh.innerHTML='';inp.setAttribute('aria-expanded','false')},120));
 inp.addEventListener('keydown',e=>{const q=inp.value.trim();
  if(e.key==='ArrowDown'){e.preventDefault();open=true;act=Math.min(res.length-1,act+1);draw()}
  else if(e.key==='ArrowUp'){e.preventDefault();act=Math.max(0,act-1);draw()}
  else if(e.key==='Enter'){e.preventDefault();if(open&&res.length)pick(act)}
  else if(e.key==='Tab'&&q&&res.length){e.preventDefault();pick(act)}
  else if(e.key===' '&&q&&res.length===1){e.preventDefault();pick(0)}
  else if(e.key==='Escape'){open=false;ul.hidden=true}});
 w.querySelector('.cb-c').onclick=()=>{inp.focus()}}

/* atalho "mesmo cliente": ao escolher o assunto na tela inicial, reaproveita o cliente */
const _startNovo=startNovo;
startNovo=function(as){const k=S.keep;S.keep=null;_startNovo(as,k)};
/* atalho: "/" vai para a pesquisa */
document.addEventListener('keydown',e=>{if(e.key!=='/'||e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;const i=$('pq')||$('fq');if(i){e.preventDefault();i.focus();i.select()}});
