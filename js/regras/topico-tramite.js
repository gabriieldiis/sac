/* Assunto e tópico gravados em cada trâmite. */
/* ================= tópico de cada trâmite ================= */
function topBlock(p){if(S.chg)return '';
 return `<div class="f2 ttop"><span>Tópico deste trâmite <span class="req">*</span> <span class="soft" style="font-weight:400">· assunto ${esc(asTxt(p))}</span></span>${S.ttop?lockHTML('ttop',S.ttop,subIc(S.ttop),subCol(p.as,S.ttop),S.ttop===p.sub?'tópico atual do protocolo':'muda o tópico do protocolo',''):comboHTML('cbtt',`Escolha o tópico… o atual é "${p.sub}"`)}${S.ttop&&isOutSub(S.ttop)?outHTML('ttop','s'):''}</div>`}
function bindTop(p){if(!$('cbtt'))return;const it=subsOn(p.as).map(x=>x[0]);
 bindCombo('cbtt',it,t=>{S.ttop=t;const y=scrollY;render();scrollTo(0,y);setTimeout(()=>($('out_ttop')||$('atxt'))?.focus(),30)},{noSub:true,top:it.includes(p.sub)?[p.sub]:[],topLabel:'Tópico atual do protocolo',allLabel:'Outros tópicos de '+p.as,ic:subIc,col:t=>subCol(p.as,t),meta:t=>t===p.sub?'tópico atual · Enter para manter':subMeta(p.as,t),noun:'tópico'})}
function tagE(e,p){e.asK=p.as;e.asL=asTxt(p);e.subL=subTxt(p)}
function tagTram(p){const H=p.asHist||[];let hi=0,cur=null;
 const fin=()=>({k:p.as,l:asTxt(p),s:subTxt(p)}),hx=i=>({k:H[i].as,l:H[i].as,s:H[i].sub});
 p.tram.forEach(e=>{if(e.asL){cur={k:e.asK,l:e.asL,s:e.subL};return}
  if(!cur)cur=H.length?hx(0):fin();
  if(e[2]==='sis'&&/Assunto alterado/.test(e[4])){hi++;cur=hi<H.length?hx(hi):fin();return}
  e.asK=cur.k;e.asL=cur.l;e.subL=cur.s})}
function asChip(e){return e&&e.asL?`<div class="hasn" title="Assunto e tópico deste registro" style="--ac:${ASC[(AS[e.asK]||{}).p]||'#999'}">${asIc(e.asK,'sm')}<span><span class="hk">Assunto</span> ${esc(e.asL)}</span><i class="fa fa-angle-right"></i><span><span class="hk">Tópico</span> <b>${esc(e.subL)}</b></span></div>`:''}

PROTOS.forEach(p=>{if(p.status==='Resolvido no atendimento')p.status='Finalizado'});

/* sem prazo de entrega: o ERP não tem o prazo que o cliente vê no site → sempre o rastreio */
Object.values(ORDERS).forEach(o=>{delete o.atraso;delete o.deveria});
/* esqueleto em grupos, com mais espaço */
function skGroups(id,lockRes){const G=[['cli','O que o cliente disse','fa-comment-o'],...(lockRes?[]:[['pv','Se for remeter ao Pós-Venda','fa-share']]),['sol','Se for finalizar','fa-check-circle']];
 const all=[];const parts=G.map(([k,l,ic])=>{const it=skItems(k);const st=all.length;all.push(...it);return it.length?`<div class="skg sk-${k}"><span class="skg-t"><i class="fa ${ic}"></i> ${l}</span><div class="skchips">${it.map((t,i)=>`<button type="button" class="skc" data-sk="${id}|${st+i}" aria-pressed="false"><i class="fa fa-plus"></i> ${esc(txtOf(t))}</button>`).join('')}</div></div>`:''}).join('');
 SKI[id]=all;if(!all.length)return '';
 return `<div class="skrow big" data-skfor="${id}"><span class="sklab"><i class="fa fa-magic"></i> Esqueleto deste caso <span class="soft">· clique nas frases que fazem sentido: elas entram direto no texto</span></span>${parts}</div>`}

new MutationObserver(()=>document.body.classList.toggle('haslay',!!app.querySelector('.nlay,.play'))).observe(app,{childList:true});
