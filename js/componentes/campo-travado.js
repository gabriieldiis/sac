/* Campo travado com "Alterar" e seletor de tópico. */
/* ================= campo travado + seletor de sub-assunto ================= */
const SUBI={'Pedido no Prazo':'fa-calendar-check-o','Troca de volume':'fa-exchange','Falta de volume':'fa-cube','Transportadora assumiu perda':'fa-chain-broken','Pedido em Atraso':'fa-clock-o','Complemento de endereço':'fa-map-marker','Transportadora afirma que entregou':'fa-question-circle','Barrar pedido':'fa-hand-paper-o','Não reconhece a entrega':'fa-user-times','Devolução':'fa-undo','Outro':'fa-ellipsis-h','Atendimento':'fa-headphones','Loja':'fa-building','Entrega':'fa-truck','Produto':'fa-cube','Prazo do estorno':'fa-calendar','Comprovante de estorno':'fa-file-text-o','Estorno não recebido':'fa-money','Acionar garantia':'fa-wrench','Atraso':'fa-clock-o','Extravio':'fa-chain-broken'};
const subIc=t=>SUBI[t]||'fa-tag';
const subR=(as,t)=>{const f=AS[as].s.find(x=>x[0]===t);return f&&f[1]==='r'};
const subCol=(as,t)=>subR(as,t)?'#e67e22':'#00a65a';
const subMeta=(as,t)=>subR(as,t)?'normalmente vai para o Pós-Venda':'normalmente resolve no atendimento';
function lockHTML(k,val,ic,col,meta,warn){return `<div class="lockwrap" data-lockw="${k}"><div class="lockin"><span class="cb-ic" style="background:${col}"><i class="fa ${ic}"></i></span><input type="text" readonly value="${esc(val)}" aria-label="${esc(val)} (travado)" tabindex="-1"><span class="lkmeta">${esc(meta)}</span><i class="fa fa-lock lk" title="Travado"></i><button type="button" class="lbtn sm" data-unlock="${k}"><i class="fa fa-pencil"></i> Alterar</button></div>
 <div class="lkconf" hidden><i class="fa fa-exclamation-triangle"></i><span>${esc(warn)}</span><button type="button" class="gbtn sm red" data-unlockok="${k}">Sim, alterar</button><button type="button" class="lbtn sm" data-unlockno="${k}">Cancelar</button></div></div>`}
function bindLock(root,onUnlock,needConfirm){root.querySelectorAll('[data-unlock]').forEach(b=>b.onclick=()=>{const k=b.dataset.unlock;if(!needConfirm(k))return onUnlock(k);const w=root.querySelector(`[data-lockw="${k}"] .lkconf`);w.hidden=false;w.querySelector('[data-unlockok]').focus()});
 root.querySelectorAll('[data-unlockok]').forEach(b=>b.onclick=()=>onUnlock(b.dataset.unlockok));
 root.querySelectorAll('[data-unlockno]').forEach(b=>b.onclick=()=>{b.closest('.lkconf').hidden=true})}
function subQuick(as,sg){const all=AS[as].s.map(x=>x[0]);return [...(sg?[sg]:[]),...all.filter(t=>t!==sg&&t!=='Outro')].slice(0,3)}
function subPickHTML(id,as,sg){const q=subQuick(as,sg);
 return comboHTML(id,`Digite ou escolha o sub-assunto… (${subsOn(as).length} opções)`)}
function bindSubPick(id,as,sg,onPick){if(!$(id))return;const items=subsOn(as).map(x=>x[0]);
 document.querySelectorAll(`[data-qsub^="${id}|"]`).forEach(b=>b.onclick=()=>onPick(b.dataset.qsub.split('|')[1]));
 bindCombo(id,items,t=>onPick(t),{noSub:true,top:sg?[sg]:[],topLabel:N_SUBPRE===sg&&sg?'Você buscou por este':'Sugerido para este pedido',allLabel:'Todos os sub-assuntos de '+as,ic:subIc,col:t=>subCol(as,t),meta:t=>subMeta(as,t),noun:'sub-assunto'})}
