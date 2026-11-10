/* [em aprovação: só aparece com SUG ligado] Prazo de cada tratativa remetida ao Pós-Venda, com contagem regressiva.
   Os prazos abaixo são exemplos: o SACK precisa informar o prazo de cada tópico. */
const PRAZO_PADRAO=7;
const PRAZOS={'Pedido em Atraso':3,'Complemento de endereço':2,'Barrar pedido':1,'Passou de 2 horas para ficar pronto':1,'Não reconhece a entrega':5,'Transportadora afirma que entregou':5,'Falta de volume':5,'Troca de volume':5,'Estorno não recebido':5,'Comprovante de estorno':3};
const przDias=sub=>PRAZOS[sub]||PRAZO_PADRAO;
const pDT=s=>{const [d,h]=String(s).split(' '),[x,y,z]=d.split('/').map(Number),[hh,mm]=(h||'00:00').split(':').map(Number);return new Date(z,y-1,x,hh||0,mm||0)};
/* "agora" do protótipo: o dia fixo de teste com o horário real */
const agoraSim=()=>{const n=new Date();return new Date(TODAY.getFullYear(),TODAY.getMonth(),TODAY.getDate(),n.getHours(),n.getMinutes(),n.getSeconds())};
const fmtDT=d=>`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
function lastRemAt(p){for(let i=p.tram.length-1;i>=0;i--)if(p.tram[i][2]==='rem')return p.tram[i][0];return p.ab+' 08:00'}
function tratsPrazo(p){if(!SUG||!p.rem||!isOpen(p))return [];return p.trats.filter(t=>t.st!=='Concluída').map(t=>{const ini=pDT(t.remAt||lastRemAt(p)),dias=przDias(t.sub);return {t,ini,dias,due:new Date(+ini+dias*864e5)}})}
function przSoonest(p){const L=tratsPrazo(p);return L.length?L.reduce((a,b)=>a.due<b.due?a:b):null}
function przFmt(ms){ms=Math.abs(ms);const d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4);return d?`${d}d ${String(h).padStart(2,'0')}h`:h?`${h}h ${String(m).padStart(2,'0')}min`:`${m}min`}
const przLv=r=>r<0?'late':r<864e5?'warn':'ok';
const przTxt=r=>r<0?'Vencido há '+przFmt(r):'Faltam '+przFmt(r);
function przTimer(due){const r=due-agoraSim();return `<span class="przt ${przLv(r)}" data-due="${+due}" title="Vence em ${fmtDT(due)}"><i class="fa ${r<0?'fa-exclamation-triangle':'fa-clock-o'}"></i> <span>${przTxt(r)}</span></span>`}
function przStripHTML(p){const L=tratsPrazo(p);if(!L.length)return '';
 return `<div class="pprz"><span class="pprz-t"><i class="fa fa-hourglass-half"></i> Prazo do Pós-Venda ${sugTag()}</span>${L.map(x=>`<span class="pprz-i">${asIc(x.t.as,'sm')}<span class="pprz-x"><b>${esc(x.t.sub)}</b><small>remetido ${fmtDT(x.ini)} · prazo de ${x.dias} dia${x.dias>1?'s':''} · vence ${fmtDT(x.due)}</small></span>${przTimer(x.due)}</span>`).join('')}</div>`}
setInterval(()=>document.querySelectorAll('[data-due]').forEach(el=>{const r=+el.dataset.due-agoraSim();el.className='przt '+przLv(r);el.querySelector('span').textContent=przTxt(r);el.querySelector('i').className='fa '+(r<0?'fa-exclamation-triangle':'fa-clock-o')}),30000);
