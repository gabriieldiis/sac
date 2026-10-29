/* Tela do protocolo: cabeçalho, ações (Novo trâmite, Remeter, Encerrar) e formulários. */
/* ================= protocolo ================= */
const PACT={ret:'Registrar retorno',acionar:'Registrar acionamento',novop:'Outro assunto: novo protocolo',contato:'Registrar contato',trat:'Adicionar assunto',remeter:'Remeter ao Pós-Venda',fim:'Encerrar protocolo',reab:'Reabrir protocolo'};
const asIc=(a,sz)=>`<span class="asic${sz?' '+sz:''}" style="background:${ASC[(AS[a]||{}).p]||'#999'}" title="${esc(a)}"><i class="fa ${ASI[a]||'fa-circle'}"></i></span>`;
function openListHTML(ps,ped){const lk=ped?ps.filter(p=>p.ped===ped):[],ot=ped?ps.filter(p=>p.ped!==ped):ps,lim=Math.max(3,lk.length),L=[...lk.sort((a,b)=>b.num-a.num),...ot.sort((a,b)=>b.num-a.num)],more=L.length>lim;
 const tag=p=>ped&&p.ped===ped?'<span class="pbadge this"><i class="fa fa-link"></i> Deste pedido</span>':p.ped?`<span class="pbadge">Pedido #${p.ped}</span>`:'<span class="pbadge">Sem pedido</span>';
 const head=ped?(lk.length?`<b>${lk.length} protocolo${lk.length>1?'s':''} aberto${lk.length>1?'s':''} para o pedido #${ped}</b>${ot.length?` <span class="soft">· e ${ot.length} de outro${ot.length>1?'s':''} pedido${ot.length>1?'s':''} ou sem pedido</span>`:''}`:`<b>Nenhum protocolo aberto para o pedido #${ped}</b> <span class="soft">· o cliente tem ${ot.length} em andamento de outro${ot.length>1?'s':''} pedido${ot.length>1?'s':''} ou sem pedido</span>`)
  :`<b>${ps.length} protocolo${ps.length>1?'s':''} em andamento</b> <span class="soft">· veja o que está acontecendo antes de abrir um novo</span>`;
 return `<div class="oplist${ped&&!lk.length?' none':''}"><div class="oph"><i class="fa fa-folder-open-o"></i> ${head}</div>
 <div class="opscroll"><table class="optb"><tbody>${L.map((p,i)=>`<tr class="${more&&i>=lim&&!S.opAll?'hid':''}${ped?(p.ped===ped?' lk':' oth'):''}" data-pmodal="${p.num}" tabindex="0" title="Ver o protocolo ${p.num}"><td style="width:46px">${asIc(p.as)}</td><td><b>${esc(asTxt(p))}</b> <span class="soft">›</span> ${esc(subTxt(p))}${p.trats.length>1?` <span class="pill blue" style="font-size:11px">+${p.trats.length-1}</span>`:''}<div class="soft" style="font-size:12px">${tag(p)} Protocolo ${p.num} · aberto em ${p.ab.slice(0,5)}</div></td><td style="text-align:right;white-space:nowrap">${ageTag(p,'sm')} ${stPill(p)} <span class="lbtn sm opv"><i class="fa fa-eye"></i> Ver</span></td></tr>`).join('')}</tbody></table></div>
 ${more?`<button type="button" class="lnk" id="opall" style="margin:6px 0 0 4px">${S.opAll?'Mostrar menos':`Ver todos os ${L.length} protocolos`}</button>`:''}</div>`}
function tratsHTML(p,live){return `<div class="ptrats"><span class="soft">Assuntos deste protocolo</span>${p.trats.map((t,i)=>`<span class="trat ${t.st==='Concluída'?'ok':''}">${asIc(t.as,'sm')} ${esc(t.as)} › <b>${esc(t.sub)}</b><em class="${t.st==='Concluída'?'stok':'stop'}"><i class="fa ${t.st==='Concluída'?'fa-check':'fa-circle'}"></i> ${t.st==='Concluída'?'concluído':'em aberto'}</em>${live&&isOpen(p)&&t.st!=='Concluída'&&p.trats.length>1?`<button type="button" class="lnk" data-tdone="${i}">concluir</button>`:''}</span>`).join('')}</div>`}
function whoHTML(p){const c=cliOf(p);return `<div class="pwho"><span><span class="soft">Cliente</span> <b>${esc(c.nome)}</b> <span class="soft">· ${maskDoc(c.doc)}</span></span><span><span class="soft">Pedido</span> <b>${p.ped?'#'+p.ped:'sem pedido vinculado'}</b> ${p.ped?delayTag(ORDERS[p.ped]):''}</span><span><span class="soft">Aberto em</span> <b>${p.ab.slice(0,5)}</b> <span class="soft">por ${esc(p.tram[0][1])} · ${p.canal}</span></span></div>`}
function pHead(p,x){const op=isOpen(p),more=p.trats.length>1?` <span class="pmore">+${p.trats.length-1} assunto${p.trats.length>2?'s':''}</span>`:'';
 return `<div class="phd"><div class="phd-t"><span class="lbl">Protocolo</span><b>${p.num}</b><button type="button" class="cpn" data-cpn="${p.num}" title="Copiar número" aria-label="Copiar número do protocolo"><i class="fa fa-copy"></i></button><span class="mt"><span class="asic sm inv"><i class="fa ${ASI[p.as]||'fa-circle'}"></i></span> ${esc(asTxt(p))} › ${esc(subTxt(p))}${more}</span></div><span class="phtags">${ageTag(p)}<span class="pill ${p.status==='Finalizado'?'green':op?'amber':'grey'}" style="font-size:13px">${p.status==='Finalizado'?'<i class="fa fa-check"></i> ':''}${p.status}</span></span>${x||''}</div>`}
function renderProto(){const p=PROTOS.find(x=>x.num===S.p),op=isOpen(p),c=cliOf(p);tagTram(p);
 const acts=MODE==='pv'?(op?['contato','remeter','fim']:['contato','reab']):['contato','remeter'],again=remCount(p)>0||!op;
 // 1 cabeçalho fixo
 const meta=[`Aberto em <b>${p.ab.slice(0,5)}</b> por ${esc(p.tram[0][1])} via ${esc(p.canal)}`,remCount(p)?`Remetido ao Pós-Venda <b>${remCount(p)}x</b>`:'Não foi ao Pós-Venda',p.fin?`Cliente quer <b>${esc(p.fin)}</b>`:'',p.asHist&&p.asHist.length?`Assunto anterior: ${p.asHist.map(x=>esc(x.as)+' › '+esc(x.sub)).join(' → ')}`:''].filter(Boolean);
 let h=`<div class="psticky">${back}<div class="card pcard pfix">${pHead(p)}<div class="pmeta">${meta.map(x=>`<span>${x}</span>`).join('')}</div></div></div>`;
 if(S.novo)h+=`<div class="card okbox"><div class="big-status"><div class="dot" style="background:#00a65a"><i class="fa fa-check"></i></div><div><p class="say" style="font-size:18px;margin:0">Protocolo <b>${p.num}</b> ${p.rem?'registrado e remetido ao Pós-Venda':'registrado'}</p>
   <div class="okbtns"><button type="button" class="lbtn sm" data-cpn="${p.num}"><i class="fa fa-copy"></i> Copiar nº</button><button type="button" class="gbtn sm" id="nnovo"><i class="fa fa-plus"></i> Novo atendimento</button><button type="button" class="lbtn sm" id="nmesmo"><i class="fa fa-user"></i> Outro assunto, mesmo cliente</button></div></div></div>
   <div style="margin-top:12px"><b style="font-size:13.5px">Diga ao cliente:</b><div class="say-cli" style="margin-top:6px">${esc(cliMsg(p))}</div></div></div>`;
 // 2 resumo do protocolo (cliente e pedido ficam no painel lateral)
 const facts=[['Aberto em',`${p.ab.slice(0,5)} <small class="soft">por ${esc(p.tram[0][1])} · ${p.canal}</small>`],[isOpen(p)?'Tempo aberto':'Duração',ageTag(p)],['Remetido ao Pós-Venda',remCount(p)?remCount(p)+'x':'não']];
 if(p.fin)facts.push(['Cliente quer',esc(p.fin)]);if(p.asHist&&p.asHist.length)facts.push(['Assunto anterior',p.asHist.map(x=>esc(x.as)+' › '+esc(x.sub)).join(' → ')]);
 let L='';
 // 3 histórico
 L+=histSecHTML(p);
 // 4 ações
 L+=`<div class="card psec pactsec${S.act?'':' stk'}"><div class="sect-t"><i class="fa fa-hand-pointer-o"></i> O que você quer fazer?</div>
  <div class="pacts2">${acts.map(k=>`<button type="button" class="${S.act===k?'gbtn blue':k==='contato'?'gbtn':k==='fim'?'lbtn danger':'lbtn'}" data-act="${k}"><i class="fa ${PACI[k]}"></i> ${k==='remeter'&&again?'Remeter novamente ao Pós-Venda':k==='contato'?'Novo trâmite':PACT[k]}</button>`).join('')}</div>
  ${S.act?actForm(p):''}</div>`;
 // 5 cliente e pedido (lateral no desktop, embaixo no celular)
 h+=`<div class="play"><div class="pL">${L}</div>${SPLIT}<div class="pS">${sidePanelHTML(c,p.ped||null,{self:p.num,noPed:p.ped?'':'Protocolo sem pedido vinculado.'})}</div></div>`;
 app.innerHTML=h;stickTop();bindSplit();bindCommon();
 app.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>{const k=b.dataset.act;
  if(k==='reab'){p.status=p.rem?'Com o Pós-Venda':'Reaberto';if(MODE==='pv')p.stage='';p.trats.forEach(t=>t.st='Aberta');p.tram.push([now(),ME,'sis','Sistema','Protocolo reaberto.']);toast('Protocolo reaberto');S.act=null;S.novo=false;return render()}
  if(k==='fim'){S.act=null;S.novo=false;render();return fimModal(p)}
  if(k==='ret'||k==='acionar'){S.quem=respOf(p);S.via=0;S.prox=0;S.ref='';S.przo=''}
  if(k==='novop'){go('home',{keep:{cli:p.cli,cliNovo:p.cliNovo}});toast('Escolha o assunto do novo protocolo: o cliente já vem preenchido');return}
  S.act=S.act===k?null:k;S.ax='';S.ax2='';S.crem=false;S.chg=false;S.tas='';S.tsub='';S.ttop='';OUT.ttop=null;S.novo=false;render();if(S.act){const f=app.querySelector('.aform');f&&f.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>(k==='trat'?$('cbt')?.querySelector('input'):$('atxt'))?.focus(),250)}});
 app.querySelectorAll('[data-tdone]').forEach(b=>b.onclick=()=>{const t=p.trats[+b.dataset.tdone];t.st='Concluída';p.tram.push([now(),ME,'sis','Sistema',`<b>Assunto concluído:</b> ${esc(t.as)} › ${esc(t.sub)}`]);toast('Assunto concluído');render()});
 $('nnovo')&&($('nnovo').onclick=()=>go('home'));
 $('nmesmo')&&($('nmesmo').onclick=()=>{go('home',{keep:{cli:p.cli,cliNovo:p.cliNovo}});toast('Escolha o assunto: o cliente já vem preenchido')});
 bindHist(p);
 bindRTE(app,(id,h)=>{if(id==='atxt')S.ax=h;if(id==='atxt2')S.ax2=h});
 $('crem')&&($('crem').onchange=e=>{S.crem=e.target.checked;S.canal=$('acanal').value;render();setTimeout(()=>$('atxt2')?.focus(),30)});
 $('chg')&&($('chg').onchange=e=>{S.chg=e.target.checked;S.tas='';S.tsub='';S.ttop='';OUT.ttop=null;S.canal=$('acanal')?.value;render();setTimeout(()=>$('cbt')?.querySelector('input').focus(),30)});
 $('cbt')&&bindCombo('cbt',asOn().filter(a=>p.ped||AS[a].p!=='x'),(a,sub)=>{S.tas=a;S.tsub=sub&&AS[a].s.some(x=>x[0]===sub)?sub:'';render();setTimeout(()=>$('atxt')?.focus(),20)});
 bindOut(app,()=>render());bindTop(p);bindLock(app,k=>{if(k==='ttop'){S.ttop='';OUT.ttop=null}if(k==='tas'){S.tas='';S.tsub='';S.ttop='';OUT.ttop=null;OUT.tas=null;OUT.tsub=null}if(k==='tsub'){S.tsub='';OUT.tsub=null}render();setTimeout(()=>($('cbts')||$('cbt'))?.querySelector('input')?.focus(),30)},k=>false);
 bindSubPick('cbts',S.tas,'',t=>{S.tsub=t;const f=AS[S.tas].s.find(x=>x[0]===t);S.trem=f&&f[1]==='r';render();setTimeout(()=>$('atxt')?.focus(),30)});
 app.querySelectorAll('[data-tsub]').forEach(b=>b.onclick=()=>{S.tsub=b.dataset.tsub;const f=AS[S.tas].s.find(x=>x[0]===S.tsub);S.trem=f&&f[1]==='r';render()});
 $('acanal')&&($('acanal').onchange=e=>{S.canal=+e.target.value;render()});bindMailForm('a',v=>S.mdir=v,v=>S.mraw=v);bindMailForm('r',v=>S.mdir=v,v=>S.mraw=v);
 app.querySelectorAll('[data-pvf]').forEach(el=>el.oninput=el.onchange=()=>{S[el.dataset.pvf]=el.value;if(el.dataset.rr)render()});
 app.querySelectorAll('[data-prox]').forEach(b=>b.onclick=()=>{S.prox=+b.dataset.prox;app.querySelectorAll('[data-prox]').forEach(x=>x.setAttribute('aria-pressed',x===b))});
 const sv=$('asave');if(sv)sv.onclick=()=>saveAct(p)}
const PACI={ret:'fa-reply',acionar:'fa-paper-plane',novop:'fa-plus-square-o',contato:'fa-phone',trat:'fa-plus',remeter:'fa-share',fim:'fa-check-square-o',reab:'fa-undo'};
function actForm(p){const k=S.act;
 const F={contato:`<div class="aform-t">Novo trâmite</div><label class="f2"><span>Por onde?</span><select id="acanal">${CANAIS.map((x,i)=>`<option value="${i}" ${+(S.canal||0)===i?'selected':''}>${x}</option>`).join('')}</select></label>${CANAIS[S.canal||0]==='E-mail'?mailFormHTML('a',S.mdir||'in',S.mraw||''):''}${topBlock(p)}${chgBlock(p)}<div class="f2"><span>${CANAIS[S.canal||0]==='E-mail'?'Resumo para o histórico <span class="soft" style="font-weight:400">(opcional quando o e-mail é colado)</span>':'O que foi conversado <span class="req">*</span>'}</span>${rte('atxt',S.ax)}</div>
   ${MODE==='pv'||true?'':`<label class="chk remchk"><input type="checkbox" id="crem" ${S.crem?'checked':''}><span>${remCount(p)||!isOpen(p)?'Remeter <b>novamente</b> ao Pós-Venda':'Remeter ao Pós-Venda'} <span class="soft" style="font-weight:400">· o cliente trouxe algo que o Pós-Venda precisa tratar</span></span></label>
   `}${S.crem&&MODE!=='pv'?`<div class="f2"><span>O que o Pós-Venda precisa fazer agora <span class="req">*</span></span>${rte('atxt2',S.ax2,'Ex.: cliente ligou de novo, entrega ainda não chegou; cobrar a transportadora.')}</div>`:''}`,
  trat:`<div class="aform-t">Adicionar assunto ao protocolo</div><div class="hint"><i class="fa fa-info-circle"></i><span>Use quando o cliente pede outra tratativa para o mesmo pedido. Ex.: depois da devolução, quer saber do estorno.</span></div>
   <div class="f2"><span>Assunto <span class="req">*</span></span>${S.tas?lockHTML('tas',S.tas,ASI[S.tas],ASC[AS[S.tas].p],ASM[AS[S.tas].p],'Alterar o assunto apaga o sub-assunto e o texto.'):comboHTML('cbt','Digite ou escolha o assunto')}</div>
   ${S.tas?`<div class="f2"><span>Sub-assunto <span class="req">*</span></span>${S.tsub?lockHTML('tsub',S.tsub,subIc(S.tsub),subCol(S.tas,S.tsub),subMeta(S.tas,S.tsub),'Alterar o sub-assunto apaga o texto.'):subPickHTML('cbts',S.tas,'')}</div>`:''}
   <div class="f2"><span>O que o cliente pediu / o que precisa ser feito <span class="req">*</span></span>${S.tas&&S.tsub?skBar('atxt',skItemsFor(S.tas,S.tsub,p.ped,0,'cli').concat(skItemsFor(S.tas,S.tsub,p.ped,0,'pv'))):''}${rte('atxt',S.ax)}</div>
   ${p.rem?'':`<label class="chk"><input type="checkbox" id="trem" ${S.trem!==false?'checked':''}> Remeter ao Pós-Venda</label>`}`,
  ret:retForm(p),acionar:acionarForm(p),
  remeter:`<div class="aform-t">${remCount(p)||!isOpen(p)?'Remeter novamente ao Pós-Venda':'Remeter ao Pós-Venda'}</div>${topBlock(p)}${chgBlock(p)}${remCount(p)?`<div class="hint"><i class="fa fa-info-circle"></i><span>Este protocolo já foi remetido ${remCount(p)} ${remCount(p)>1?'vezes':'vez'}. Ele volta para a fila do Pós-Venda com o que você escrever aqui.</span></div>`:''}<div class="f2"><span>O que o Pós-Venda precisa fazer <span class="req">*</span></span>${rte('atxt',S.ax)}</div>`}[k];
 return `<div class="aform">${F}<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="gbtn" id="asave"><i class="fa fa-check"></i> ${k==='remeter'?'Remeter':k==='ret'?'Registrar retorno':k==='acionar'?'Registrar acionamento':k==='trat'?'Adicionar assunto':S.crem?'Salvar e remeter':'Salvar'}</button><button type="button" class="lbtn" data-act="${k}">Cancelar</button></div></div>`}
function saveAct(p){const k=S.act,h=clean(S.ax||''),txt=txtOf(h);
 if(k==='trat'&&(!S.tas||!S.tsub)){toast(S.tas?'Escolha o sub-assunto':'Escolha o assunto');return}
 if(k==='ret'||k==='acionar')return savePV(p,k,h,txt);
 const n0=p.tram.length;
 if((k==='contato'||k==='remeter')&&!S.chg){if(!S.ttop){toast('Escolha o tópico deste trâmite');app.querySelector('#cbtt input')?.focus();return}if(isOutSub(S.ttop)&&!outVal('ttop')){toast('Escreva qual é o tópico e confirme');app.querySelector('#out_ttop')?.focus();return}}
 const am=k==='contato'&&CANAIS[S.canal||0]==='E-mail'&&(S.mraw||'').trim()?buildMail(S.mraw,S.mdir||'in'):null;
 if(!txt&&!am){toast(k==='contato'&&CANAIS[S.canal||0]==='E-mail'?'Cole o e-mail ou escreva um resumo':'Preencha o texto');$('atxt').focus();return}
 if(S.chg&&(!S.tas||!S.tsub)){toast(S.tas?'Escolha o novo sub-assunto':'Escolha o novo assunto');return}
 if(S.chg&&((isOutAs(S.tas)&&!outVal('tas'))||(isOutSub(S.tsub)&&!outVal('tsub')))){toast('Escreva qual é o novo '+(isOutAs(S.tas)&&!outVal('tas')?'assunto':'sub-assunto')+' e confirme');app.querySelector('.outbox input')?.focus();return}
 if(S.chg&&S.tas===p.as&&S.tsub===p.sub&&!isOutAs(S.tas)&&!isOutSub(S.tsub)){toast('O assunto escolhido é o mesmo de agora');return}
 if(!S.chg&&S.ttop&&(k==='contato'||k==='remeter')&&(S.ttop!==p.sub||isOutSub(S.ttop))){p.sub=S.ttop;p.subOut=isOutSub(S.ttop)?outVal('ttop'):'';p.trats=[{as:p.as,sub:p.sub,st:'Aberta'}]}
 if(k==='contato'){const h2=clean(S.ax2||'');if(S.crem&&!txtOf(h2)){toast('Escreva o que o Pós-Venda precisa fazer');$('atxt2').focus();return}
  const ch=CANAIS[$('acanal').value];if(S.chg)mudarAssunto(p);p.tram.push([now(),ME,am&&am.dir==='fwd'?'fwd':'cli',ch,txt?h:'',...(am?[am]:[])]);if(S.crem){remeterP(p,h2);toast('Contato registrado e remetido ao Pós-Venda')}else toast('Contato registrado')}
 if(k==='trat'){const as=S.tas,sb=S.tsub,rm=$('trem')?$('trem').checked:false;p.trats.push({as,sub:sb,st:'Aberta'});if(!isOpen(p))p.status='Reaberto';
  p.tram.push([now(),ME,'sis','Sistema',`<b>Novo assunto:</b> ${esc(as)} › ${esc(sb)}<br>${h}`]);
  if(rm){p.rem=true;p.status='Com o Pós-Venda';p.tram.push([now(),ME,'rem','Sistema','<b>Remetido ao Pós-Venda.</b>'])}toast('Assunto adicionado ao protocolo')}
 if(k==='remeter'){if(S.chg)mudarAssunto(p);const n=remeterP(p,h);toast(n>1?`Remetido novamente ao Pós-Venda (${n}ª vez)`:'Remetido ao Pós-Venda')}
 p.tram.slice(n0).forEach(e=>tagE(e,p));
 S.act=null;S.ax='';S.ax2='';S.crem=false;S.chg=false;S.tas='';S.tsub='';S.ttop='';OUT.ttop=null;OUT.tas=null;OUT.tsub=null;S.mraw='';S.mdir='in';render()}
function chgBlock(p){return `<label class="chk chgchk"><input type="checkbox" id="chg" ${S.chg?'checked':''}><span>O assunto mudou <span class="soft" style="font-weight:400">· ex.: era devolução e agora o cliente fala do estorno</span></span></label>
 ${S.chg?`<div class="chgbox"><div class="chgfrom"><span class="soft">Assunto atual:</span> ${asIc(p.as,'sm')} <b>${esc(asTxt(p))} › ${esc(subTxt(p))}</b> <i class="fa fa-long-arrow-right"></i> <span class="soft">novo:</span></div>
  <div class="f2"><span>Novo assunto <span class="req">*</span></span>${S.tas?lockHTML('tas',S.tas,ASI[S.tas],ASC[AS[S.tas].p],ASM[AS[S.tas].p],''):comboHTML('cbt','Digite ou escolha o novo assunto')}${S.tas&&isOutAs(S.tas)?outHTML('tas','a'):''}</div>
  ${S.tas&&(!isOutAs(S.tas)||outVal('tas'))?`<div class="f2"><span>Novo sub-assunto <span class="req">*</span></span>${S.tsub?lockHTML('tsub',S.tsub,subIc(S.tsub),subCol(S.tas,S.tsub),subMeta(S.tas,S.tsub),''):subPickHTML('cbts',S.tas,'')}${S.tsub&&isOutSub(S.tsub)?outHTML('tsub','s'):''}</div>`:''}
  ${p.ped?'':'<div class="soft" style="font-size:12.5px">Protocolo sem pedido: assuntos que exigem pedido não aparecem.</div>'}</div>`:''}`}
function mudarAssunto(p){const de=`${esc(asTxt(p))} › ${esc(subTxt(p))}`;(p.asHist=p.asHist||[]).push({as:asTxt(p),sub:subTxt(p),em:now()});p.as=S.tas;p.sub=S.tsub;p.asOut=isOutAs(S.tas)?outVal('tas'):'';p.subOut=isOutSub(S.tsub)?outVal('tsub'):'';p.trats=[{as:p.as,sub:p.sub,st:'Aberta'}];
 p.tram.push([now(),ME,'sis','Sistema',`<b>Assunto alterado:</b> ${de} → <b>${esc(asTxt(p))} › ${esc(subTxt(p))}</b>`])}
const remCount=p=>p.tram.filter(t=>t[2]==='rem').length;
function remeterP(p,h){const n=remCount(p)+1;p.rem=true;p.status='Com o Pós-Venda';p.trats.forEach(t=>t.st='Aberta');p.tram.push([now(),ME,'rem','Sistema',(n>1?`<b>Remetido novamente ao Pós-Venda (${n}ª vez).</b>`:'<b>Remetido ao Pós-Venda.</b>')+'<br>'+h]);return n}
function fimModal(p){let m=$('fm');if(!m){m=document.createElement('div');m.id='fm';m.className='pmodal';document.body.appendChild(m)}
 const abertos=p.trats.filter(t=>t.st!=='Concluída');S.fx='';
 m.innerHTML=mBox({xAttr:'data-fmx',labelledby:'fmt',role:'alertdialog',cls:'fmbox',head:mHead('fmt','fa-check-circle',`Encerrar o protocolo ${p.num}`,'data-fmx'),band:`<span>Depois de encerrado, ele sai da fila e só volta se alguém reabrir.${abertos.length?` <b>${abertos.length} assunto${abertos.length>1?'s':''} em aberto ${abertos.length>1?'serão concluídos':'será concluído'}.</b>`:''}</span>`,body:`<div class="fmb"><label class="f2"><span>Como terminou? <span class="req">*</span></span><select id="ares"><option>Resolvido</option><option>Resolvido com compensação ao cliente</option><option>Reclamação improcedente</option><option>Cliente desistiu</option><option>Protocolo duplicado</option></select></label>
  <div class="f2"><span>Registro de encerramento <span class="req">*</span> <span class="soft" style="font-weight:400">· fica só no histórico do protocolo, não vai para o cliente</span></span>${rte('ftxt',S.fx,'Ex.: Jadlog confirmou a entrega no endereço; cliente ciente.')}</div><div class="err" id="fmerr" hidden></div></div>`,foot:`<button type="button" class="lbtn" data-fmx>Voltar</button><button type="button" class="gbtn red" id="fmok"><i class="fa fa-check"></i> Encerrar protocolo</button>`});
 m.style.display='block';document.body.style.overflow='hidden';bindRTE(m,(id,h)=>S.fx=h);
 const close=()=>{m.style.display='none';document.body.style.overflow=''};
 m.querySelectorAll('[data-fmx]').forEach(b=>b.onclick=close);
 $('fmok').onclick=()=>{const h=clean($('ftxt').innerHTML||''),t=txtOf(h);if(!t){const e=$('fmerr');e.hidden=false;e.textContent='Escreva como o protocolo foi encerrado.';$('ftxt').focus();return}
  p.status='Encerrado';p.trats.forEach(x=>x.st='Concluída');p.tram.push([now(),ME,'fim','Sistema',`<b>${esc($('ares').value)}</b><br>`+h]);close();toast('Protocolo encerrado');render();scrollTo(0,0)};
 setTimeout(()=>$('fmok').focus(),30);
 m.onkeydown=e=>{if(e.key==='Escape')close()}}
