/* Início: tabela com os dados fictícios para teste do protótipo. Clique em CPF, pedido ou protocolo para pesquisar. */
const TESTE=[
 ['Atendente','Atraso com transportadora','Juliana Prado','104.332.181-00','67645210','','Consulta de Pedido › "Pedido em Atraso" › Remeter. Aparece "Confira o rastreio".'],
 ['Atendente','Vários volumes para copiar','Bruna Castro','083.863.794-99','67644088','','Pedido com 2 volumes (1 entregue). Códigos com botão copiar.'],
 ['Atendente','Troca de volume','Daniel Souza','026.542.351-14','67643519','','Pedido entregue com volume de outro cliente.'],
 ['Atendente','Devolução (arrependimento)','Tatiane Ribeiro','161.559.407-89','67641977','','Novo atendimento › Devolução › Remeter.'],
 ['Atendente','Finalizar no atendimento (CNPJ)','Escritório Modelo Ltda','81.618.495/0001-19','67642660','','"Pedido no Prazo" › Finalizar. Cliente tem 2 pedidos.'],
 ['Atendente','Retirada passou de 2 horas','Ricardo Almeida','960.013.389-14','22714090','','Aviso vermelho de atraso na loja.'],
 ['Atendente','Pedido que já tem protocolo','Roberto Lima','261.296.531-90','21987400','6851648','Janela "este pedido já tem protocolo aberto".'],
 ['Atendente','Furo de estoque','Roberto Lima','261.296.531-90','67620318','','Item sem estoque em destaque.'],
 ['Atendente','Cliente com vários pedidos e protocolos','Henrique Barbosa','663.923.321-54','67647120','6892031','5 pedidos em situações diferentes e 4 protocolos em andamento.'],
 ['Atendente','Consulta por pedido sem protocolo','Rafael Borges','444.429.104-48','22015071','','Outro pedido do cliente aparece separado do consultado.'],
 ['Atendente','Protocolo com o Pós-Venda (travado)','Patrícia Gomes','526.018.159-06','67624410','6892020','Novo trâmite: não há Finalizar, só Registrar trâmite ou Remeter novamente.'],
 ['Atendente','Cliente que não se identifica','—','','','','Novo atendimento › "Dúvidas sobre o site" › O cliente não quis se identificar.'],
 ['Atendente','Não reconhece a entrega','Ana Paula Souza','355.561.876-81','22633366','','Entrega Super Expressa entregue, mas a cliente tinha pedido cancelamento antes.'],
 ['Pós-Venda','Assumir protocolo','Henrique Barbosa','663.923.321-54','67647120','6892031','Assumir protocolo › aparece em "Meus protocolos" na fila.'],
 ['Pós-Venda','Encerrar protocolo','Eduardo Ramos','993.518.190-19','22713502','6892025','Encerrar › "Como terminou?" › registro verde no histórico.'],
 ['Pós-Venda','Histórico completo','Sandra Lopes','757.491.186-06','67618833','6892028','Devolução com estorno, do pedido ao encerramento.']];
function testCardHTML(){const q=v=>v?`<button type="button" class="lnk tq" data-tq="${esc(v)}" title="Pesquisar ${esc(v)}">${esc(v)}</button>`:'<span class="soft">—</span>';
 const rows=TESTE;
 return `<details class="card sbig tcard"${S.tOpen===false?'':' open'}><summary><h2><i class="fa fa-flask" style="color:var(--head)"></i> Dados para teste <span class="pill grey">${rows.length} casos · fictícios</span></h2><span class="soft">Clique no CPF, pedido ou protocolo para pesquisar. "Hoje" no protótipo é 16/10/2026.</span></summary>
  <div class="scroll"><table class="pend ttab"><thead><tr><th>Visão</th><th>Caso</th><th>Cliente</th><th>CPF/CNPJ</th><th>Pedido</th><th>Protocolo</th><th>O que deve acontecer</th></tr></thead>
  <tbody>${rows.map(r=>`<tr><td><span class="pill ${r[0]==='Pós-Venda'?'amber':'blue'}">${r[0]}</span></td><td><b>${esc(r[1])}</b></td><td>${esc(r[2])}</td><td>${q(r[3])}</td><td>${q(r[4])}</td><td>${q(r[5])}</td><td class="soft">${esc(r[6])}</td></tr>`).join('')}</tbody></table></div></details>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-tq]');if(!b)return;const i=$('pq'),f=$('pform');if(!i||!f)return;i.value=b.dataset.tq;HQ.q=b.dataset.tq;i.dispatchEvent(new Event('input',{bubbles:true}));f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit',{cancelable:true}));scrollTo(0,0)});
document.addEventListener('toggle',e=>{if(e.target.classList?.contains('tcard'))S.tOpen=e.target.open},true);
