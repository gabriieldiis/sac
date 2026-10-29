/* Fila do Pós-Venda: indicadores, filtros e tabela de protocolos remetidos. */
/* ================= Pós-Venda: fila, acionamento e retorno ================= */
const DESTS=p=>{const o=p.ped&&ORDERS[p.ped];return [...new Set([respOf(p),o&&o.carrier!=='—'?'Transportadora · '+o.carrier:null,o?'Loja '+o.loja:null,'Fornecedor','Financeiro','Logística reversa','Expedição do CD','E-commerce / TI','Seguradora (garantia)','Outro'].filter(Boolean))]};
const VIAS=['Telefone','E-mail','Portal da transportadora','WhatsApp','Sistema interno'];
const plain=x=>txtOf(richOut(String(x||'').replace(/\n+/g,'<br>')).replace(/<br\s*\/?>|<\/?li[^>]*>|<\/?div[^>]*>|<\/?p[^>]*>/gi,' · ')).replace(/(\s*·\s*){2,}/g,' · ').replace(/(\s·\s)+$/,'').replace(/^(\s·\s)+/,'');
const PROX=[['Aguardar novo retorno','fa-hourglass-half'],['Avisar o cliente','fa-phone'],['Pode encerrar','fa-check']];
function lastOf(p,types){for(let i=p.tram.length-1;i>=0;i--)if(types.includes(p.tram[i][2]))return p.tram[i];return null}
function stageOf(p){if(!isOpen(p))return ['enc','Encerrado','grey'];const l=lastOf(p,['rem','env','ret']);if(!l)return ['novo','Na fila','amber'];
 if(l[2]==='rem')return remCount(p)>1?['renov','Remetido novamente','red']:['novo','Na fila · sem acionamento','amber'];
 if(l[2]==='env')return ['aguard','Aguardando retorno','blue'];return p.stage==='avisar'?['ret','Retorno recebido · avisar cliente','green']:p.stage==='enc'?['ret','Retorno recebido · pode encerrar','green']:['ret','Retorno recebido','green']}
function pvSel(id,label,opts,val,rr){return `<label class="f2"><span>${label}</span><select data-pvf="${id}" ${rr?'data-rr="1"':''}>${opts.map((x,i)=>`<option value="${i}" ${+val===i?'selected':''}>${esc(x)}</option>`).join('')}</select></label>`}
function acionarForm(p){const ds=DESTS(p);
 return `<div class="aform-t">Registrar acionamento</div><div class="hint"><i class="fa fa-info-circle"></i><span>Registre o contato que você fez <b>fora do sistema</b> com a transportadora, loja, fornecedor ou área. Assim o atendimento sabe o que já foi feito.</span></div>
  <div class="g2">${pvSel('quemI','Quem você acionou? <span class="req">*</span>',ds,Math.max(0,ds.indexOf(S.quem)))}${pvSel('via','Por onde?',VIAS,S.via||0,1)}</div>
  ${VIAS[S.via||0]==='E-mail'?mailFormHTML('r',S.mdir||'out',S.mraw||''):''}
  <div class="g2"><label class="f2"><span>Protocolo / ID no responsável <span class="soft" style="font-weight:400">(opcional)</span></span><input type="text" data-pvf="ref" value="${esc(S.ref||'')}" placeholder="Ex.: acareação 56889823"></label><label class="f2"><span>Prazo de retorno informado <span class="soft" style="font-weight:400">(opcional)</span></span><input type="text" data-pvf="przo" value="${esc(S.przo||'')}" placeholder="Ex.: 72h úteis · 21/10"></label></div>
  <div class="f2"><span>O que foi solicitado <span class="req">*</span></span>${rte('atxt',S.ax,'Ex.: pedida prioridade na entrega e confirmação do endereço.')}</div>`}
function retForm(p){const ds=DESTS(p),ul=lastOf(p,['env']);
 return `<div class="aform-t">Registrar retorno</div>${ul?`<div class="hint"><i class="fa fa-paper-plane"></i><span>Último acionamento: <b>${esc(ul[0])}</b> · ${esc(plain(ul[4]).slice(0,160))}</span></div>`:''}
  <div class="g2">${pvSel('quemR','Quem retornou? <span class="req">*</span>',ds,0)}${pvSel('via','Por onde?',VIAS,S.via||0,1)}</div>
  ${VIAS[S.via||0]==='E-mail'?mailFormHTML('r',S.mdir||'in',S.mraw||''):''}
  <div class="f2"><span>O que foi respondido <span class="req">*</span></span>${rte('atxt',S.ax,'Ex.: Jadlog confirma nova tentativa de entrega em 22/10.')}</div>
  <div class="f2"><span>E agora?</span><div class="choice">${PROX.map(([l,ic],i)=>`<button type="button" data-prox="${i}" aria-pressed="${(S.prox||0)===i}"><i class="fa ${ic}"></i> ${l}</button>`).join('')}</div></div>`}
function savePV(p,k,h,txt){const via=VIAS[S.via||0],ds=DESTS(p),m=via==='E-mail'&&(S.mraw||'').trim()?buildMail(S.mraw,{in:'rin',out:'rout',fwd:'fwd'}[S.mdir||(k==='ret'?'in':'out')]):null;
 if(!txt&&!m){toast('Escreva o que foi '+(k==='ret'?'respondido':'solicitado'));$('atxt').focus();return}
 if(k==='acionar'){const q=ds[+(S.quemI||Math.max(0,ds.indexOf(S.quem)))];const extra=[S.ref?`<b>ID:</b> ${esc(S.ref)}`:'',S.przo?`<b>Prazo informado:</b> ${esc(S.przo)}`:''].filter(Boolean).join(' · ');
  p.tram.push([now(),ME,'env',via,`<b>Acionou ${esc(q)}.</b>${extra?' '+extra:''}<br>${h}`,...(m?[m]:[])]);p.status='Aguardando '+q.split(' ·')[0];p.stage='';toast('Acionamento registrado')}
 else{const q=ds[+(S.quemR||0)],px=S.prox||0;p.tram.push([now(),q,'ret',via,`${h}<br><span class="nx">Próximo passo: <b>${PROX[px][0]}</b></span>`,...(m?[m]:[])]);
  p.stage=['','avisar','enc'][px];p.status=['Aguardando novo retorno','Retorno recebido · avisar cliente','Retorno recebido · pode encerrar'][px];toast('Retorno registrado');
  if(px===2){S.act=null;S.ax='';render();return fimModal(p)}}
 S.act=null;S.ax='';S.mraw='';render()}
let FQ={st:'',c:{num:'',as:'',cli:'',ped:'',rem:'',st:'',last:''}};
const FSTS=[['novo','Na fila'],['renov','Remetido novamente'],['aguard','Aguardando retorno'],['ret','Retorno recebido']];
function filaRemAt(p){const l=lastOf(p,['rem']);return l?l[0]:p.ab}
function filaDays(d){const [x,y,z]=d.slice(0,10).split('/').map(Number);return Math.round((TODAY-new Date(z,y-1,x))/864e5)}
function filaList(){const all=PROTOS.filter(p=>p.rem&&isOpen(p)),C=FQ.c,key=d=>{const[a,b]=d.split(' ');const[x,y,z]=a.split('/');return z+y+x+(b||'')};
 const has=(v,q)=>!q||nrm(v).includes(nrm(q))||(digits(q)&&digits(v).includes(digits(q)));
 const st=C.st||FQ.st;
 const f=all.filter(p=>{const c=cliOf(p),l=p.tram[p.tram.length-1],dd=filaDays(filaRemAt(p));
  return has(p.num,C.num)&&(!C.as||p.as===C.as)&&has(c.nome+' '+c.doc,C.cli)&&(C.ped==='sem'?!p.ped:has(p.ped||'',C.ped))
   &&(!C.rem||(C.rem==='hoje'?dd===0:C.rem==='7'?dd<=7:dd>7))&&(!st||stageOf(p)[0]===st)&&has(l[1]+' '+plain(l[4]),C.last)});
 f.sort((a,b)=>key(filaRemAt(a)).localeCompare(key(filaRemAt(b))));return {all,f}}
function filaRowsHTML(f){if(!f.length)return `<tr><td colspan="7" class="empty2">Nenhum protocolo com esses filtros. <button type="button" class="lnk" data-fclr>Limpar filtros</button></td></tr>`;
 return f.map(p=>{const st=stageOf(p),l=p.tram[p.tram.length-1],o=p.ped&&ORDERS[p.ped],c=cliOf(p),r=filaRemAt(p);
  return `<tr data-open="${p.num}" tabindex="0"><td><b>${p.num}</b>${remCount(p)>1?` <span class="pill red" style="font-size:10.5px">${remCount(p)}ª remessa</span>`:''}<br>${ageTag(p,'sm')}</td>
   <td><div class="fas">${asIc(p.as)}<div>${esc(asTxt(p))}<br><span class="soft">${esc(subTxt(p))}</span></div></div></td>
   <td>${esc(c.nome)}<br><span class="soft">${maskDoc(c.doc)}</span></td>
   <td>${p.ped?'#'+p.ped:'<span class="soft">sem pedido</span>'}${o&&o.atraso?'<div style="margin-top:3px">'+delayTag(o)+'</div>':''}</td>
   <td>${r.slice(0,10)}<br><span class="soft">${r.slice(11)}</span></td>
   <td><span class="pill ${st[2]}">${st[1]}</span></td>
   <td class="flast"><span class="soft">${esc(l[0].slice(0,5))} · ${esc(l[1])}</span><span class="fl2">${esc(plain(l[4]).slice(0,180))||esc((l[5]?'E-mail: '+(l[5].assunto||''):''))}</span></td></tr>`}).join('')}
function renderFila(){const {all,f}=filaList(),C=FQ.c,sc=k=>all.filter(p=>stageOf(p)[0]===k).length;
 const ases=[...new Set(all.map(p=>p.as))].sort((a,b)=>a.localeCompare(b));
 const ti=(k,ph)=>`<input type="search" data-fc="${k}" value="${esc(C[k])}" placeholder="${ph}" aria-label="Filtrar por ${ph}" autocomplete="off">`;
 const sel=(k,lbl,opts)=>`<select data-fc="${k}" aria-label="Filtrar por ${lbl}"><option value="">${lbl}: todos</option>${opts.map(([v,l])=>`<option value="${esc(v)}"${C[k]===v?' selected':''}>${esc(l)}</option>`).join('')}</select>`;
 const anyF=Object.values(C).some(Boolean)||FQ.st;
 app.innerHTML=`<div class="fila">${novoCardHTML()}
  <div class="card sbig"><h2><i class="fa fa-folder-open-o" style="color:var(--head)"></i> Pesquisar atendimento</h2>
   ${searchBodyHTML()}</div>
  <div class="kpis">${FSTS.map(([k,l])=>`<button type="button" class="kpi k-${k} ${(C.st||FQ.st)===k?'on':''}" data-fst="${k}" aria-pressed="${(C.st||FQ.st)===k}"><b>${sc(k)}</b><span>${l}</span></button>`).join('')}</div>
  <div class="card fcard"><div class="fhead"><h2><i class="fa fa-inbox"></i> Protocolos remetidos ao Pós-Venda <span class="hcount2" id="fcount">${f.length} de ${all.length}</span></h2>
   ${anyF?'<button type="button" class="lnk" data-fclr><i class="fa fa-times"></i> Limpar filtros</button>':''}</div>
   <div class="scroll"><table class="pend ftab"><thead><tr><th>Protocolo</th><th>Assunto</th><th>Cliente</th><th>Pedido</th><th>Remetido em</th><th>Situação</th><th>Último registro</th></tr>
    <tr class="ffl"><th>${ti('num','nº')}</th><th>${sel('as','Assunto',ases.map(a=>[a,a]))}</th><th>${ti('cli','nome ou CPF')}</th><th>${ti('ped','nº')}</th><th>${sel('rem','Quando',[['hoje','Hoje'],['7','Até 7 dias'],['mais7','Há mais de 7 dias']])}</th><th>${sel('st','Situação',FSTS)}</th><th>${ti('last','texto ou quem')}</th></tr></thead>
   <tbody id="ftb">${filaRowsHTML(f)}</tbody></table></div></div></div>`;
 bindCommon();bindNovoCard(renderFila);
 const upd=()=>{const r=filaList();$('ftb').innerHTML=filaRowsHTML(r.f);$('fcount').textContent=`${r.f.length} de ${r.all.length}`;bindRows()};
 const bindRows=()=>{app.querySelectorAll('#ftb tr[data-open]').forEach(tr=>{tr.onclick=()=>go('proto',{p:tr.dataset.open});tr.onkeydown=e=>{if(e.key==='Enter')go('proto',{p:tr.dataset.open})}});
  app.querySelectorAll('[data-fclr]').forEach(b=>b.onclick=()=>{FQ.st='';Object.keys(C).forEach(k=>C[k]='');renderFila()})};
 app.querySelectorAll('input[data-fc]').forEach(i=>i.oninput=()=>{C[i.dataset.fc]=i.value;upd()});
 app.querySelectorAll('select[data-fc]').forEach(i=>i.onchange=()=>{C[i.dataset.fc]=i.value;if(i.dataset.fc==='st')FQ.st='';renderFila()});
 app.querySelectorAll('[data-fst]').forEach(b=>b.onclick=()=>{const k=b.dataset.fst,cur=C.st||FQ.st;C.st=cur===k?'':k;FQ.st='';renderFila()});
 bindRows();bindSearch(renderFila)}

function entPagCompact(o,ped){const E=Object.fromEntries(o.entrega),v=VOL[ped],u=trackURL(o),pick=o.mod==='pick',tot=o.itens.reduce((a,i)=>a+i[2]*i[3],0),fr=Math.max(0,o.total-tot);
 const c=(l,val,x,w)=>`<div${w?' class="w2"':''}><span>${l}</span><b>${val}</b>${x?` ${x}`:''}</div>`;
 let ent;
 if(pick)ent=c('Retirada na loja',esc(E['Loja de retirada']||o.loja),'',1)+(o.retirar?c('Retirar até',o.retirar):'');
 else{const end=E['Endereço']||'';ent=c('Endereço de entrega',esc(end),`<button type="button" class="lnk sm2" data-cpt="${esc(end)}"><i class="fa fa-copy"></i> copiar</button>`,1)
  +c(o.mod==='loja'?'Entrega da loja':'Transportadora',esc(o.mod==='loja'?(E['Loja de saída']||o.loja)+' · '+o.carrier:E['Transportadora']||o.carrier),u?`<a class="lnk sm2" href="${u}" target="_blank" rel="noopener"><i class="fa fa-external-link"></i> rastrear</a>`:'')
  +(v?c('Nº do volume',v,`<button type="button" class="lnk sm2" data-cpv="${v}"><i class="fa fa-copy"></i> copiar</button>`):'')
  +(o.deveria?c(o.entregue?'Entregue em':'Previsão de entrega',o.entregue||o.deveria,o.atraso&&!o.entregue?'<em class="late">já passou</em>':''):'')
  +c('Frete',money(fr))}
 return `<div class="cdiv"><div class="sect-t sm"><i class="fa fa-truck"></i> Entrega</div><div class="cgrid">${ent}</div></div>
  <div class="cdiv"><div class="sect-t sm"><i class="fa fa-credit-card"></i> Pagamento</div><div class="cgrid">${c('Forma',esc(o.pag))}${c('Valor',money(o.total))}</div></div>`}
