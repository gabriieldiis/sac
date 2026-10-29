/* Card único do registro de abertura (Finalizado ou Remetido). */
/* ================= registro único da abertura: um card só, com o status (remetido ou resolvido) ================= */
function regEntry(t,who,canal,txt,fin,rem,extra,mail){const body=rtrim(txt)+(extra?'<div>'+extra+'</div>':'');
 return [t,who,rem?'rem':'fim',canal,body+(fin?`<br><b>Cliente quer:</b> ${esc(fin)}`:''),mail||undefined,{body,fin,rem}]}
function rtrim(h){return String(h||'').replace(/(\s|<br\s*\/?>|<div>\s*(<br\s*\/?>)?\s*<\/div>|<p>\s*(<br\s*\/?>)?\s*<\/p>)+$/i,'')}
function regHTML(d,q,c,rg,mail,e){const col=rg.rem?'#e67e22':'#00a65a';
 return hCard({cls:'hreg '+(rg.rem?'rem':'ok'),col,ic:rg.rem?'fa-share':'fa-check',ty:rg.rem?'Remetido ao Pós-Venda':'Finalizado',q,c,d,e,body:(rg.body?`<div class="rtx hbody">${richOut(rg.body)}</div>`:'')+(rg.fin?`<div class="rgfin">Cliente quer: <b>${esc(rg.fin)}</b></div>`:''),mail})}
/* card do histórico no padrão do SACK: Informações à esquerda, Observações à direita */
function hCard(o){const e=o.e||{},dt=String(o.d),day=dt.slice(0,10),hr=dt.slice(11);
 return `<li class="hit ${o.cls||''}" style="--tc:${o.col}"><span class="hdot"><i class="fa ${o.ic}"></i></span><div class="hcard hgrid">
  <div class="hinfo"><span class="ty" style="background:${o.col}">${o.ty}</span>
   <dl><dt>Atendente</dt><dd>${esc(o.q)}</dd><dt>Data</dt><dd>${day}${hr?' · '+hr:''}</dd><dt>Canal</dt><dd>${chnChip(o.c)}</dd>${e.asL?`<dt>Assunto</dt><dd class="has-ic">${asIc(e.asK,'sm')}<span>${esc(e.asL)}</span></dd><dt>Tópico</dt><dd><b>${esc(e.subL)}</b></dd>`:''}</dl></div>
  <div class="hobs"><span class="hobs-t">Observações</span><div class="hobs-b">${o.body||''}${o.mail?mailHTML(o.mail):''}${!o.body&&!o.mail?'<span class="soft">—</span>':''}</div></div></div></li>`}
/* exemplos antigos: junta "contato do cliente" + "remetido/resolvido" feitos pela mesma pessoa no mesmo dia */
PROTOS.forEach(p=>{const a=p.tram[0],b=p.tram[1];if(!a||!b||a[2]!=='cli'||!['rem','fim'].includes(b[2])||a[1]!==b[1]||a[0].slice(0,10)!==b[0].slice(0,10))return;
 const act=String(b[4]).replace(/^(<b>)?(Remetido ao Pós-Venda|Resolvido no atendimento)\.?(<\/b>)?(<br>|\n)?\s*/i,'').replace(/\n/g,'<br>');
 p.tram.splice(0,2,regEntry(a[0],a[1],a[3],a[4],p.fin||'',b[2]==='rem',act,a[5]))});
