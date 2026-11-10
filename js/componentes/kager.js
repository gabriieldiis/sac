/* [em aprovação: só aparece com SUG ligado] Falta de produto na entrega: quem separou e quem conferiu o pedido, como consta no Kager.
   Nomes de exemplo. No ERP os dados vêm do Kager pelo nº do pedido (DBA/TI). */
const KAG_N=['Adriana M.','Bruno S.','Carla T.','Diego R.','Elaine F.','Fábio L.','Gisele P.','Hugo A.','Ingrid C.','Jonas V.'];
const KAG_AS=as=>SUG&&as==='Falta de produto na entrega';
function kagerOf(ped){const o=ORDERS[ped];if(!o)return null;const d=digits(ped),a=+d.slice(-1),b0=(+d.slice(-2,-1)+3)%10,b=b0===a?(b0+1)%10:b0;
 const sp=(o.steps||[]).find(s=>/Separ/i.test(s[0])&&s[1]);return {sep:KAG_N[a],conf:KAG_N[b],em:sp?sp[1]:'',onde:o.mod==='cd'?'CD':'Loja '+o.loja}}
function kagerHTML(ped){const k=kagerOf(ped);if(!k)return '';
 return `<div class="kag" role="group" aria-label="Separação no Kager"><span class="kag-t"><i class="fa fa-users"></i> Quem separou e conferiu <span class="soft">· dados do Kager</span> ${sugTag()}</span><span class="kag-i"><small>Separador</small><b>${esc(k.sep)}</b></span><span class="kag-i"><small>Conferente</small><b>${esc(k.conf)}</b></span>${k.em?`<span class="kag-i"><small>Separado em</small><b>${esc(k.em)}</b></span>`:''}<span class="kag-i"><small>Local</small><b>${esc(k.onde)}</b></span></div>`}
