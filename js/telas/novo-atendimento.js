/* Fluxo do novo atendimento: assunto, cliente, pedido, tópico e registro (Finalizar / Remeter). */
/* ================= novo atendimento ================= */
function startNovo(as,keepCli){OUT.as=null;OUT.sub=null;const T0=Date.now();if(typeof keepCli==='undefined')N_SUBPRE=N_SUBPRE||'';N={as,q:'',cli:keepCli?.cli||null,cliNovo:keepCli?.cliNovo||null,t0:T0,unk:null,ped:null,sub:null,extra:[],xas:'',canal:0,rel:'',route:null,remtxt:'',sol:'',err:'',msg:''};
 if(N.cli)autoPed();go('novo')}
function autoPed(){const a=AS[N.as];if(a.p==='n'){N.ped='';return}const os=N.cli?ordersOf(N.cli):[];if(!os.length&&a.p==='o')N.ped=''}
function cliDone(){return !!(N.cli||N.cliNovo)}
function pedDone(){return N.ped!==null}
function renderNovo(){const a=AS[N.as];let h=`<button type="button" class="backlink" data-home><i class="fa fa-times"></i> Cancelar atendimento</button>`;
 // 1 assunto
 h+=`<div class="card nsec done keep"><div class="nh"><span class="nn"><i class="fa fa-check"></i></span> Assunto do atendimento</div><div class="nb">${N.chgAs?`${comboHTML('cbas2','Digite ou escolha o novo assunto… o cliente e o pedido continuam')}<button type="button" class="lnk" id="chgasno" style="align-self:flex-start;margin-top:6px">Manter ${esc(N.as)}</button>`:lockHTML('as',N.as,ASI[N.as],ASC[AS[N.as].p],ASM[AS[N.as].p],'Ao alterar o assunto, o cliente e o pedido continuam. O tópico e o registro serão refeitos.')}${isOutAs(N.as)?outHTML('as','a'):''}</div></div>`;
 if(isOutAs(N.as)&&!outVal('as')){app.innerHTML=`<div class="nflow1">${h}</div>`;bindNovo();setTimeout(()=>$('out_as')?.focus(),20);return}
 // 2 cliente
 if(!cliDone()){h+=`<div class="card nsec cur"><div class="nh"><span class="nn">2</span> Cliente</div><div class="nb">
   <form id="cform" class="sform"><input id="cq" value="${esc(N.q)}" placeholder="${a.p==='n'?'CPF ou CNPJ do cliente':'CPF/CNPJ ou nº do pedido'}" aria-label="CPF, CNPJ ou pedido" autocomplete="off" inputmode="numeric"><button type="submit" class="gbtn"><i class="fa fa-search"></i> Buscar</button></form>
   ${N.msg?`<div class="err">${N.msg}</div>`:''}
   ${N.unk?`<div class="newcli"><div class="hint amber"><i class="fa fa-user-plus"></i><span>${N.unk.length===11?'CPF':'CNPJ'} <b>${fmtDoc(N.unk)}</b> não está na base. Informe o nome para registrar o protocolo.</span></div>
     <label class="f2"><span>${N.unk.length===11?'Nome do cliente':'Razão social'} <span class="req">*</span></span><input type="text" id="nn" autocomplete="off"></label>
     <label class="f2"><span>Telefone ou e-mail <span class="soft" style="font-weight:400">(opcional)</span></span><input type="text" id="nt" autocomplete="off"></label>
     <button type="button" class="gbtn" id="nok" style="align-self:flex-start">Continuar</button></div>`:''}</div></div>`;
  app.innerHTML=`<div class="nflow1">${h}</div>`;bindNovo();setTimeout(()=>($('nn')||$('cq'))?.focus(),20);return}
 const c=N.cli?CLIENTES[N.cli]:N.cliNovo,openPs=PROTOS.filter(p=>isOpen(p)&&(N.cli?p.cli===N.cli:false));
 {const oth=openPs.filter(p=>!(N.ped&&p.ped===N.ped&&p.rem));if(oth.length)h+=othBarHTML(oth,N.ped)}
 let n=3,B='';
 const out=()=>{pedCheck(openPs);app.innerHTML=`<div class="nlay"><div class="nA">${h}</div>${SPLIT}<div class="nS">${sidePanelHTML(c,N.ped||null,{noAnd:true,chgCli:'chgCli',novo:!!N.cliNovo,noPed:a.p==='n'?'':N.ped===''?'Atendimento sem pedido vinculado.':N.ped===null?'Escolha o pedido na lista.':''})}</div><div class="nB">${B}</div></div>`;stickTop();bindSplit();bindNovo()};
 // 3 pedido
 if(a.p!=='n'){
  if(!pedDone()){const os=ordersOf(N.cli||'');
   h+=`<div class="card nsec cur"><div class="nh"><span class="nn">${n}</span> Qual pedido? ${a.p==='x'?'<span class="soft" style="font-weight:400">· obrigatório para este assunto</span>':'<span class="soft" style="font-weight:400">· opcional</span>'}</div><div class="nb">
    ${os.length?`<div class="pedpick">${os.map(k=>pedPickHTML(k)).join('')}</div>`:`<div class="hint ${a.p==='x'?'red':''}"><i class="fa fa-info-circle"></i><span>Nenhum pedido encontrado para este cliente.${a.p==='x'?' Este assunto precisa de um pedido: confira o CPF/CNPJ ou busque pelo nº do pedido.':''}</span></div>`}
    ${a.p==='o'?`<button type="button" class="lbtn" id="semped" style="align-self:flex-start"><i class="fa fa-ban"></i> Atendimento sem pedido vinculado</button>`:''}</div></div>`;
   return out()}
  h+=sec(n,'Pedido',true,N.ped?`<b>#${N.ped}</b> ${modBadge(ORDERS[N.ped],1)} <span class="soft" style="font-weight:400">· ${document.documentElement.classList.contains('one')?'mais detalhes logo abaixo':'mais detalhes no painel'}</span>`:'<span class="soft">Sem pedido vinculado</span>','chgPed',N.ped?`<div class="op-and ped-and"><span class="op-st">Andamento do pedido</span>${vtlHTML(ORDERS[N.ped])}</div>`:'');n++}
 // regra da forma de entrega
 if(N.ped&&!N.sub){const rl=ruleFor(N.as,null,N.ped);if(rl&&!N.ruleSkip)B+=ruleCardHTML(rl,ORDERS[N.ped])}
 // 4 sub-assunto
 {const sg=suggestSub(N.as,N.ped);
  B+=`<div class="card nsec ${N.sub?'done keep':'cur'}"><div class="nh"><span class="nn">${N.sub?'<i class="fa fa-check"></i>':n}</span> Sub-assunto de <b>&nbsp;${esc(N.as)}</b></div><div class="nb">${N.sub?lockHTML('sub',N.sub,subIc(N.sub),subCol(N.as,N.sub),'','Alterar o sub-assunto apaga o que já foi escrito no registro.'):subPickHTML('cbs',N.as,sg)}${N.sub&&isOutSub(N.sub)?outHTML('sub','s'):''}</div></div>`;
  if(!N.sub)return out();if(isOutSub(N.sub)&&!outVal('sub')){out();setTimeout(()=>$('out_sub')?.focus(),20);return}}
 n++;
 // 5 registro
 const rem=N.route==='rem',rl5=N.ped?ruleFor(N.as,N.sub,N.ped):null,lockRes=rl5&&rl5.lvl==='nores';
 if(rl5&&(rl5.sub||rl5.lvl!=='redir'||!N.ruleSkip))B+=ruleCardHTML(rl5,ORDERS[N.ped],true);
 B+=`<div class="card nsec cur"><div class="nh"><span class="nn">${n}</span> Registro do atendimento</div><div class="nb">
  <label class="f2"><span>Por onde o cliente falou? <span class="req">*</span></span><select id="fcanal">${CANAIS.map((x,i)=>`<option value="${i}" ${+N.canal===i?'selected':''}>${x}</option>`).join('')}</select></label>
  ${CANAIS[N.canal]==='E-mail'?mailFormHTML('n',N.mdir||'in',N.mraw||''):''}
  ${finNeeded(N.as,N.sub)?`<div class="f2"><span>Como o cliente quer o dinheiro? <span class="req">*</span></span><div class="choice">${finOpts(N.as).map(x=>`<button type="button" data-fin="${x}" aria-pressed="${N.fin===x}">${x}</button>`).join('')}</div></div>`:''}
  <div class="f2 regf"><span>Registro do atendimento <span class="req">*</span></span>${skGroups('frel',lockRes)}${rte('frel',N.rel,'O que o cliente disse e o que foi feito.')}</div>
  ${N.err?`<div class="err"><i class="fa fa-exclamation-circle"></i> ${N.err}</div>`:''}
  <div class="regact"><span class="ra-q">Protocolo pronto? Escolha como ele fica:</span><div class="ra-btns">
   <button type="button" class="ra-b ra-fin" data-reg="res"><i class="fa fa-check-circle"></i><span><b>Finalizar</b><small>resolvido no atendimento</small></span></button>
   ${lockRes?`<span class="ra-lock"><i class="fa fa-lock"></i> Para este pedido o caso é resolvido no atendimento: ${esc(rl5.short||'orientar o cliente')}.</span>`:`<button type="button" class="ra-b ra-rem" data-reg="rem"><i class="fa fa-share"></i><span><b>Remeter ao Pós-Venda</b><small>o Pós-Venda continua o caso</small></span></button>`}</div></div></div></div>`;
 out()}
function pedPickHTML(k){const o=ORDERS[k],op=protosOf(k).filter(isOpen).length;
 return `<button type="button" class="pedrow" data-ped="${k}"><span class="pr-ic m-${o.mod}"><i class="fa ${(MODB[o.mod]||MODB.cd)[1]}"></i></span>
  <span class="pr-main"><b>#${k} ${modBadge(o,1)}</b><small>${o.data} · ${money(o.total)}</small></span>
  <span class="pr-st">${false?'':`<span class="pill ${(o.cancel||o.furo)?'red':o.entregue?'green':'blue'}">${o.cancel?'<i class="fa fa-ban"></i> ':o.furo?'<i class="fa fa-exclamation-triangle"></i> ':''}${esc(o.stt)}</span>`}${op?`<span class="pill amber">${op} protocolo${op>1?'s':''} aberto${op>1?'s':''}</span>`:''}</span>
  <span class="pr-go">Vincular <i class="fa fa-chevron-right"></i></span></button>`}
const ORDAS=Object.keys(AS).filter(a=>AS[a].p!=='n');
function extraHTML(){return `<div class="xbox"><div class="xh"><b>Assuntos deste protocolo</b><span class="soft">O cliente quer tratar mais de uma coisa neste pedido? Adicione aqui.</span></div>
  <div class="xlist"><span class="trat main">${asIc(N.as,'sm')} ${esc(N.as)} › <b>${esc(N.sub)}</b></span>${N.extra.map((x,i)=>`<span class="trat">${asIc(x.as,'sm')} ${esc(x.as)} › <b>${esc(x.sub)}</b><button type="button" class="xrm" data-xrm="${i}" aria-label="Remover"><i class="fa fa-times"></i></button></span>`).join('')}</div>
  <div class="xadd">${N.xas?`<span class="trat main" style="flex:none"><i class="fa ${ASI[N.xas]}"></i> ${esc(N.xas)} <button type="button" class="xrm" id="xasx" aria-label="Trocar assunto"><i class="fa fa-times"></i></button></span>`:`<div style="flex:1 1 260px">${comboHTML('cbx','+ Outro assunto deste pedido… digite ou escolha')}</div>`}
  <select id="xsub" aria-label="Sub-assunto" ${N.xas?'':'disabled'}><option value="">Sub-assunto…</option>${N.xas?AS[N.xas].s.map(([t])=>`<option>${esc(t)}</option>`).join(''):''}</select>
  <button type="button" class="lbtn sm" id="xadd" ${N.xas?'':'disabled'}><i class="fa fa-plus"></i> Adicionar</button></div></div>`}
function sec(n,t,done,val,chg,extra){return `<div class="card nsec done"><div class="nh"><span class="nn"><i class="fa fa-check"></i></span> ${t}: <span class="nv">${val}</span> <button type="button" class="lnk chg" data-chg="${chg}">Alterar</button></div>${extra?`<div class="nb" style="padding-top:0">${extra}</div>`:''}</div>`}
function setSub(t){N.sub=t;N.fin='';const s=AS[N.as].s.find(x=>x[0]===t);N.route='res';const rl=ruleFor(N.as,t,N.ped);N.rel='';if(rl&&rl.lvl==='nores'){N.route='res';N.rel=`<div><b>Orientação:</b> ${esc(rl.sol)}</div><div><br></div>`}}
function changeAs(x){if(x===N.as)return;N.ruleSkip=false;N.as=x;N.sub=null;N.extra=[];N.xas='';N.err='';const p=AS[x].p;
 if(p==='n')N.ped='';else if(N.ped===''&&p==='x')N.ped=null;else if(N.ped===null&&cliDone())autoPed();
 toast('Assunto trocado para '+x);renderNovo()}
function bindNovo(){bindCommon();bindOut(app,()=>renderNovo());const q=x=>app.querySelector(x);
 if($('cbas2')){bindCombo('cbas2',asOn().filter(x=>x!==N.as),(as,sub)=>{const a2=AS[as];N.as=as;N.chgAs=false;N.sub=null;OUT.sub=null;OUT.as=null;N.rel='';N.remtxt='';N.sol='';N.extra=[];N.err='';N.route='res';N_SUBPRE=sub||'';
   if(a2.p==='n')N.ped='';else if(a2.p==='x'&&N.ped==='')N.ped=null;renderNovo();toast('Assunto alterado: cliente e pedido mantidos')});$('chgasno').onclick=()=>{N.chgAs=false;renderNovo()}}
 bindLock(app,k=>{if(k==='as'){N.chgAs=true;renderNovo();setTimeout(()=>$('cbas2')?.querySelector('input').focus(),30);return}if(k==='sub'){N.sub=null;OUT.sub=null;N.rel='';N.remtxt='';N.sol='';N.extra=[];N.err='';renderNovo();setTimeout(()=>$('cbs')?.querySelector('input').focus(),30)}},k=>k==='as'?!!(N.sub||txtOf(N.rel)||txtOf(N.remtxt)):!!(txtOf(N.rel)||txtOf(N.remtxt)||txtOf(N.sol)||N.extra.length));
 bindSubPick('cbs',N.as,suggestSub(N.as,N.ped),t=>pickSub(t));
 q('#opall')&&(q('#opall').onclick=()=>{S.opAll=!S.opAll;renderNovo()});
 app.querySelectorAll('.optb tr').forEach(tr=>tr.onkeydown=e=>{if(e.key==='Enter')protoModal(tr.dataset.pmodal)});
 app.querySelectorAll('[data-chg]').forEach(b=>b.onclick=()=>{const k=b.dataset.chg;
  if(k==='chgAs'){go('home',{keep:{cli:N.cli,cliNovo:N.cliNovo}});toast('Escolha o novo assunto');return}
  if(k==='chgCli'){N.cli=null;N.cliNovo=null;N.unk=null;N.ped=null;N.sub=null}
  if(k==='chgPed'){N.ped=null;N.sub=null;N.extra=[];N.ruleSkip=false}
  if(k==='chgSub'){N.sub=null}
  N.err='';renderNovo()});
 q('#cq')&&(q('#cq').oninput=e=>N.q=e.target.value);
 q('#cform')&&(q('#cform').onsubmit=e=>{e.preventDefault();const d=digits(N.q);N.msg='';N.unk=null;
  if(!d){N.msg='Digite o CPF/CNPJ'+(AS[N.as].p==='n'?'.':' ou o nº do pedido.');return renderNovo()}
  const o=AS[N.as].p!=='n'&&orderBy(d);
  if(o){N.cli=ORDERS[o].cli;N.ped=o;return renderNovo()}
  if(d.length===11||d.length===14){const c=cliByDoc(d);if(c){N.cli=c;autoPed();return renderNovo()}N.unk=d;return renderNovo()}
  N.msg=`Nada encontrado para "${esc(N.q)}". Confira o número.`;renderNovo()});
 q('#nok')&&(q('#nok').onclick=()=>{const nm=$('nn').value.trim();if(!nm){toast('Informe o nome');$('nn').focus();return}N.cliNovo={nome:nm,doc:fmtDoc(N.unk),tel:$('nt').value.trim()};N.unk=null;autoPed();renderNovo()});
 app.querySelectorAll('[data-ped]').forEach(b=>b.onclick=()=>{N.ped=b.dataset.ped;renderNovo()});
 q('#semped')&&(q('#semped').onclick=()=>{N.ped='';renderNovo()});
 app.querySelectorAll('[data-sub]').forEach(b=>b.onclick=()=>pickSub(b.dataset.sub));
 function pickSub(t){setSub(t);renderNovo();setTimeout(()=>$('frel')?.focus(),20)}
 app.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>{N.route=b.dataset.route;renderNovo()});
 app.querySelectorAll('[data-fin]').forEach(b=>b.onclick=()=>{N.fin=b.dataset.fin;renderNovo()});
 app.querySelectorAll('[data-rgo]').forEach(b=>b.onclick=()=>{const [na,ns]=b.dataset.rgo.split('|');N.ruleSkip=false;N.as=na;N.extra=[];const p=AS[na].p;if(p==='n')N.ped='';setSub(ns);toast(`Assunto trocado para ${na} › ${ns}`);renderNovo()});
 app.querySelectorAll('[data-rskip]').forEach(b=>b.onclick=()=>{N.ruleSkip=true;renderNovo()});
 q('#fcanal')&&(q('#fcanal').onchange=e=>{N.canal=+e.target.value;renderNovo()});
 bindMailForm('n',v=>N.mdir=v,v=>N.mraw=v);
 bindRTE(app,(id,h)=>{if(id==='frel')N.rel=h;if(id==='frem')N.remtxt=h;if(id==='fsol')N.sol=h});
 q('#cbx')&&bindCombo('cbx',ORDAS,a=>{N.xas=a;renderNovo();setTimeout(()=>$('xsub')?.focus(),20)});q('#xasx')&&(q('#xasx').onclick=()=>{N.xas='';renderNovo()});
 q('#xadd')&&(q('#xadd').onclick=()=>{const sb=$('xsub').value;if(!sb){toast('Escolha o sub-assunto');return}if((N.as===N.xas&&N.sub===sb)||N.extra.some(x=>x.as===N.xas&&x.sub===sb)){toast('Esse assunto já está no protocolo');return}N.extra.push({as:N.xas,sub:sb});N.xas='';renderNovo()});
 app.querySelectorAll('[data-xrm]').forEach(b=>b.onclick=()=>{N.extra.splice(+b.dataset.xrm,1);renderNovo()});
 app.querySelectorAll('[data-reg]').forEach(b=>b.onclick=()=>{N.route=b.dataset.reg;registrar()})}
function registrar(){const rem=N.route==='rem',m=[];const nm=CANAIS[N.canal]==='E-mail'&&(N.mraw||'').trim()?buildMail(N.mraw,N.mdir||'in'):null;if(!txtOf(N.rel)&&!nm)m.push('o registro do atendimento (ou cole o e-mail)');
 if(finNeeded(N.as,N.sub)&&!N.fin)m.push('como o cliente quer o dinheiro (estorno ou crédito)');
 if(m.length){N.err='Falta preencher: '+m.join(', ')+'.';return renderNovo()}
 const t=now(),canal=CANAIS[N.canal],p={num:String(nextNum++),cli:N.cli,cliNovo:N.cliNovo,ped:N.ped||null,as:N.as,sub:N.sub,canal,ab:fmtD(TODAY),status:rem?'Com o Pós-Venda':'Finalizado',rem,
  asOut:isOutAs(N.as)?outVal('as'):'',tReg:Math.max(1,Math.round((Date.now()-(N.t0||Date.now()))/1000)),subOut:isOutSub(N.sub)?outVal('sub'):'',trats:[{as:N.as,sub:N.sub,st:rem?'Aberta':'Concluída'}],
  fin:N.fin||'',
  tram:[regEntry(t,'Você',canal,clean(N.rel),N.fin||'',rem,'',nm)]};
 PROTOS.push(p);if(rem)return go('proto',{p:p.num,novo:true});const keep={cli:p.cli,cliNovo:p.cliNovo};N=null;go('home');finModalOk(p,keep)}
function cliMsg(p){return p.rem?`Seu protocolo é ${p.num}. Sua solicitação foi encaminhada para a nossa equipe de Pós-Venda, que vai tratar ${p.ped?'com o responsável pelo seu pedido':'do seu caso'}. O retorno sai em até 72 horas úteis.`:`Seu protocolo é ${p.num}. Seu atendimento foi registrado e finalizado.`}

/* protocolo finalizado no atendimento: só o número e o próximo passo; os detalhes ficam para quando alguém pesquisar o protocolo */
function finModalOk(p,keep){let m=$('okm');if(!m){m=document.createElement('div');m.id='okm';m.className='pmodal';document.body.appendChild(m)}
 m.innerHTML=mBox({xAttr:'data-okx',labelledby:'okmt',cls:'okbox2',head:mHead('okmt','fa-check',`Protocolo ${p.num} finalizado`,'data-okx',`<button type="button" class="lbtn sm okcp" data-cpn="${p.num}"><i class="fa fa-copy"></i> Copiar nº</button>`).replace('phd mhd','phd mhd ok'),
  body:pAccHTML(p,false),
  foot:`<button type="button" class="lnk" id="okmesmo"><i class="fa fa-user"></i> Outro assunto, mesmo cliente</button><button type="button" class="gbtn big" id="oknovo"><i class="fa fa-plus"></i> Novo atendimento</button>`});
 m.querySelector('[data-pmgo]')?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();m.style.display='none';document.body.style.overflow='';go('proto',{p:p.num})});
 m.style.display='block';document.body.style.overflow='hidden';
 const close=()=>{m.style.display='none';document.body.style.overflow=''};m._close=close;
 m.querySelectorAll('[data-okx]').forEach(b=>b.onclick=()=>{close();setTimeout(()=>$('cbas')?.querySelector('input')?.focus(),30)});
 m.querySelectorAll('[data-cpn]').forEach(b=>b.onclick=()=>copyTxt(b.dataset.cpn,'Número copiado'));
 $('oknovo').onclick=()=>{close();S.keep=null;go('home');setTimeout(()=>$('cbas')?.querySelector('input')?.focus(),30)};
 $('okmesmo').onclick=()=>{close();go('home',{keep});setTimeout(()=>$('cbas')?.querySelector('input')?.focus(),30);toast('Escolha o assunto: o cliente já vem preenchido')};
 m.onkeydown=e=>{if(e.key==='Escape')close()};setTimeout(()=>$('oknovo').focus(),40)}
