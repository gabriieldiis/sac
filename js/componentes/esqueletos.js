/* Esqueletos de texto por tópico (frases prontas). */
/* ================= esqueleto por sub-assunto ================= */
const SKB={
 'Furo de estoque':{cli:['Cliente informa que o pedido <b>#{ped}</b> ainda não foi enviado.','Informado que o item <b>{furo}</b> está <b>sem estoque no CD</b> (furo de estoque).','Cliente prefere: <mark>[aguardar reposição / trocar por similar / cancelar o item]</mark>.','Cliente pede retorno por <b>{canal}</b>.'],
  pv:['Verificar com Compras / CD a <b>previsão de reposição</b> do item.','Se não houver reposição: <b>cancelar o item</b> e liberar o restante do pedido.','Estornar o valor do item cancelado (<mark>[estorno / crédito]</mark>).'],
  sol:['Cliente orientado sobre a falta do item e <b>aceitou aguardar</b> a reposição.','Cliente aceitou receber o pedido <b>sem o item</b>; valor do item será estornado.']},
 'Pedido em Atraso':{cli:['Cliente informa que o pedido <b>#{ped}</b> está em atraso.','<b>Endereço confirmado</b> com o cliente.','<b>Ponto de referência:</b> <mark>[informar]</mark>','Cliente <b>não tem ponto de referência</b>.','Cliente pede retorno por <b>{canal}</b>.'],
  pv:['Acionar a <b>{transp}</b> pedindo <b>prioridade na entrega</b>.','Repassar endereço confirmado e ponto de referência.','Volume <b>{vol}</b> · NF {nf}.'],
  sol:['Informada a situação pelo rastreio da {transp}.','Cliente orientado a acompanhar pelo rastreio da {transp}.']},
 'Pedido no Prazo':{cli:['Cliente quer saber quando o pedido <b>#{ped}</b> chega.'],sol:['Informada a previsão de entrega: <b></b>.','Enviado o link de rastreio da {transp}.','Cliente ciente e de acordo.']},
 'Complemento de endereço':{cli:['Cliente pede incluir o complemento: <mark>[complemento]</mark>.','<b>Ponto de referência:</b> <mark>[informar]</mark>','Quem pode receber: <mark>[nome]</mark>.'],pv:['Passar o complemento de endereço para a <b>{transp}</b>.','Volume <b>{vol}</b> · NF {nf}.']},
 'Não reconhece a entrega':{cli:['Cliente diz que <b>não recebeu</b> o pedido #{ped}.','Ninguém no endereço recebeu o volume.','<b>Endereço do pedido está correto.</b>','Se a falha for confirmada, cliente quer <mark>[reenvio / estorno]</mark>.'],pv:['Abrir <b>acareação</b> com a {transp}: comprovante, foto e local da entrega.']},
 'Transportadora afirma que entregou':{cli:['Rastreio da {transp} mostra <b>entregue</b>, mas o cliente contesta.','Recebedor informado no rastreio: <mark>[nome]</mark>.','<b>Endereço do pedido está correto.</b>'],pv:['Abrir <b>acareação</b> com a {transp}: comprovante, foto e local da entrega.']},
 'Falta de volume':{cli:['Cliente recebeu <mark>[x]</mark> de <mark>[y]</mark> volumes.','Embalagem chegou <b>violada</b>.','Embalagem chegou <b>intacta</b>.','Cliente enviou <b>fotos</b> da embalagem.'],pv:['Verificar com o CD a separação do pedido #{ped}.','Verificar com a {transp} o volume que faltou.']},
 'Troca de volume':{cli:['Cliente recebeu um volume de <b>outro pedido</b>.','Etiqueta do volume recebido: <mark>[nº]</mark>.'],pv:['Verificar a troca com o CD e a {transp}.','Programar coleta do volume errado e envio do correto.']},
 'Transportadora assumiu perda':{cli:['Cliente foi avisado da perda do volume.','Cliente quer <mark>[reenvio / estorno]</mark>.'],pv:['Confirmar a perda com a {transp}.','Providenciar reenvio ou estorno conforme a escolha do cliente.']},
 'Barrar pedido':{cli:['Cliente <b>não quer mais</b> receber o pedido #{ped}.','Motivo: <mark>[informar]</mark>.','Cliente quer o dinheiro como <mark>[estorno / crédito]</mark>.'],pv:['Barrar o pedido na <b>{transp}</b> e devolver ao CD.','Solicitar o estorno ao Financeiro após o retorno ao CD.']}};
const SKA={
 'Devolução':{cli:['Cliente quer devolver: <mark>[produto]</mark>.','Produto <b>sem uso</b> e na embalagem original.','Cliente enviou <b>fotos</b>.','Cliente quer <mark>[estorno / crédito / troca]</mark>.'],pv:['Agendar a coleta com a logística reversa.','Após o recebimento, seguir com a finalidade escolhida.'],sol:['Cliente orientado sobre o processo de devolução.']},
 'Cancelamento (Exceção)':{cli:['Cliente pede o cancelamento do pedido #{ped}.','Motivo: <mark>[informar]</mark>.','Cliente quer o dinheiro como <mark>[estorno / crédito]</mark>.'],pv:['Barrar ou devolver ao estoque e confirmar no sistema.','Solicitar o estorno ao Financeiro.']},
 'Estornos Diversos':{cli:['Cliente pergunta sobre o estorno do pedido #{ped}.','Forma de pagamento: <b>{pag}</b>.'],pv:['Verificar com o Financeiro a data do estorno.','Enviar o comprovante ao cliente por e-mail.'],sol:['Informado o prazo: estorno em 1 a 2 faturas do cartão.']},
 'Garantia Estendida':{cli:['Produto com problema: <mark>[produto]</mark>.','Cliente tem o <b>certificado</b> da garantia.','Defeito relatado: <mark>[descrever]</mark>.'],pv:['Acionar a seguradora da garantia estendida.','Agendar a coleta ou o reparo.']}};
SKB['Devolução']=SKA['Devolução'];
const SKG={cli:['Cliente entrou em contato sobre <b>{as} › {sub}</b>.','Cliente pede retorno por <b>{canal}</b>.'],pv:['Verificar o caso e tratar com a área responsável.'],sol:['Cliente orientado e ciente.','Informação enviada por <mark>[e-mail / WhatsApp]</mark>.']};
const SKX={};
function skSrc(as,sub,k){const kx=SKX[as+'|'+sub];return kx&&kx[k]?[kx,'x']:(SKB[sub]&&SKB[sub][k])?[SKB[sub],'b']:(SKA[as]&&SKA[as][k])?[SKA[as],'a']:[SKG,'g']}
function skItemsFor(as,sub,ped,canal,k){const src=skSrc(as,sub,k)[0];const o=ped?ORDERS[ped]:null;
 const V={ped:ped||'<mark>[pedido]</mark>',nf:o&&o.nf!=='—'?o.nf:'<mark>[NF]</mark>',transp:o&&o.carrier!=='—'?o.carrier:'transportadora',prev:o&&o.deveria?o.deveria:'<mark>[data]</mark>',vol:(ped&&VOL[ped])||'<mark>[volume]</mark>',pag:o?o.pag:'<mark>[forma]</mark>',canal:CANAIS[canal]||'Telefone',as:esc(as),sub:esc(sub),furo:o&&o.furo?o.itens.filter(i=>o.furo.includes(i[0])).map(i=>esc(i[1])+' (cód. '+i[0]+')').join(', '):'<mark>[produto]</mark>'};
 return (src[k]||[]).map(t=>t.replace(/\{(\w+)\}/g,(_,x)=>V[x]??''))}
function skItems(k){return N&&N.sub?skItemsFor(N.as,N.sub,N.ped,N.canal,k):[]}
const SKI={};
function skBar(id,items){if(!items.length)return '';SKI[id]=items;
 return `<div class="skrow" data-skfor="${id}"><span class="sklab"><i class="fa fa-magic"></i> Esqueleto deste caso <span class="soft">· clique no que faz sentido, entra direto no texto</span></span><div class="skchips">${items.map((t,i)=>`<button type="button" class="skc" data-sk="${id}|${i}" aria-pressed="false"><i class="fa fa-plus"></i> ${esc(txtOf(t))}</button>`).join('')}</div></div>`}
function skRefresh(id){const ed=$(id);if(!ed)return;document.querySelectorAll(`button.skc[data-sk^="${id}|"]`).forEach(b=>{const on=!!ed.querySelector(`li[data-sk="${b.dataset.sk}"]`);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.querySelector('.fa').className='fa '+(on?'fa-check':'fa-plus')})}
function skToggle(key,force){const [id,i]=key.split('|'),ed=$(id);if(!ed)return;const ex=ed.querySelector(`li[data-sk="${key}"]`);
 if(ex&&force!==true){const ul=ex.parentNode;ex.remove();if(ul&&!ul.querySelector('li'))ul.remove()}
 else if(!ex){let ul=ed.querySelector('ul[data-skl]');if(!ul){ul=document.createElement('ul');ul.setAttribute('data-skl','');ed.insertBefore(ul,ed.firstChild);if(!ul.nextSibling||!txtOf(ul.nextSibling.textContent||'')){const d=document.createElement('div');d.innerHTML='<br>';ed.appendChild(d)}}
  const li=document.createElement('li');li.setAttribute('data-sk',key);li.innerHTML=SKI[id][+i];
  const after=[...ul.querySelectorAll('li[data-sk]')].find(x=>+x.dataset.sk.split('|')[1]>+i);ul.insertBefore(li,after||null)}
 ed.dispatchEvent(new Event('input',{bubbles:true}));skRefresh(id)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-sk]');if(b&&b.tagName==='BUTTON'){e.preventDefault();skToggle(b.dataset.sk)}
 const a=e.target.closest('[data-skall]');if(a){const id=a.dataset.skall;(SKI[id]||[]).forEach((_,i)=>skToggle(id+'|'+i,true))}});
new MutationObserver(()=>document.querySelectorAll('[data-skfor]').forEach(r=>{if(!r._sk){r._sk=1;skRefresh(r.dataset.skfor)}})).observe(document.body,{childList:true,subtree:true});
