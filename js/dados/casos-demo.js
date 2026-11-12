/* Pedidos para a apresentação: nenhum deles tem protocolo, então dá para abrir um atendimento do zero ao vivo.
   Todos os dados são fictícios. "Hoje" no protótipo é 16/10/2026. */
Object.assign(CLIENTES,{
 c28:{nome:'Juliana Prado',doc:'104.332.181-00',cidade:'Bauru / SP',tel:'(14) 99812-3054',email:'juliana.prado@gmail.com',desde:2021},
 c29:{nome:'Ricardo Almeida',doc:'960.013.389-14',cidade:'São Paulo / SP',tel:'(11) 98450-7712',email:'ricardo.almeida@outlook.com',desde:2019},
 c30:{nome:'Bruna Castro',doc:'083.863.794-99',cidade:'Belo Horizonte / MG',tel:'(31) 99620-4418',email:'bruna.castro@gmail.com',desde:2023},
 c31:{nome:'Daniel Souza',doc:'026.542.351-14',cidade:'Florianópolis / SC',tel:'(48) 98877-1203',email:'daniel.souza@hotmail.com',desde:2020},
 c32:{nome:'Tatiane Ribeiro',doc:'161.559.407-89',cidade:'Campinas / SP',tel:'(19) 99104-6631',email:'tatiane.ribeiro@gmail.com',desde:2018},
 c33:{nome:'Escritório Modelo Ltda',doc:'81.618.495/0001-19',cidade:'Barueri / SP',tel:'(11) 4195-2200',email:'compras@escritoriomodelo.com.br',desde:2013}});

const _S6d=(a,nf,c,d,e,f)=>[['Analisando pagamento',a],['NFe '+nf[0],nf[1]],['Separado',c],['Transportadora',d],['Saiu para entrega',e],['Pedido entregue',f||null]];
Object.assign(ORDERS,{
 /* 1 · atraso: parado na transportadora */
 '67645210':_O({cli:'c28',kom:'22720431',nf:'16061102',data:'02/10/2026',total:356.80,mod:'cd',carrier:'Jadlog',state:'atrasado',stt:'Em transporte',pill:['blue','Em transporte'],
  aviso:['late','fa-clock-o','Sem movimentação na Jadlog desde 07/10','O volume está parado no centro de distribuição de Bauru há 9 dias. Confira o rastreio antes de responder a cliente.'],
  say:'Parado na transportadora.',tl:[['02/10','ERP','Compra aprovada · cartão 2x'],['03/10','ERP','Faturado · NF 16061102'],['03/10 20:00','Jadlog','Coletado no CD'],['07/10 09:40','Jadlog','Em trânsito · Bauru']],
  entrega:[['Endereço','R. Exemplo, 820 · Vila Universitária · Bauru/SP'],['Transportadora','Jadlog Logística']],
  itens:[['512300','Kit material escolar (exemplo)',2,129.90],['439879','Estojo escolar (exemplo)',2,48.50]],pag:'Cartão de crédito 2x',
  steps:_S6d('02/10 14:10',['16061102','03/10 08:30'],'03/10 13:10','03/10 20:00',null)}),
 /* 2 · retirada que passou de 2 horas */
 '22714090':_O({cli:'c29',kom:'22714090',nf:'—',data:'16/10/2026',total:239.70,mod:'pick',carrier:'—',state:'separacao',origem:'App Kalunga',loja:'0003 · São Paulo Mooca',stt:'Separando na loja',pill:['red','Atrasado na loja'],
  aviso:['late','fa-hourglass-end','Passou de 2 horas: pedido ainda em separação','Pago às 08:45, deveria estar pronto às 10:45. A loja ainda não informou o motivo.'],
  say:'Retirada atrasada.',tl:[['16/10 08:45','Site','Compra aprovada · retirada na loja 0003']],
  entrega:[['Loja de retirada','0003 · Mooca']],
  itens:[['671714','Teclado e mouse sem fio TC212 Multi',1,129.90],['671715','Mouse sem fio (exemplo)',2,54.90]],pag:'Pix',
  steps:[['Pagamento aprovado','16/10 08:45'],['Separado na loja',null],['Pronto para retirada',null],['Retirado',null]]}),
 /* 3 · falta de volume */
 '67644088':_O({cli:'c30',kom:'22719305',nf:'16060477',data:'05/10/2026',total:1134.70,mod:'cd',carrier:'Loggi',state:'entregue',stt:'Entrega parcial',pill:['amber','Entrega parcial'],
  aviso:['track','fa-cubes','Chegaram 1 de 2 volumes','A Loggi registrou a entrega só do volume 1/2 em 15/10. O volume 2/2 (LG5730021876) não aparece no rastreio.'],
  say:'Falta 1 volume.',tl:[['05/10','ERP','Compra aprovada · cartão 5x'],['06/10','ERP','Faturado · NF 16060477 · 2 volumes'],['07/10 19:20','Loggi','Coletado no CD · 2 volumes'],['15/10 14:05','Loggi','Entregue · volume 1/2']],
  entrega:[['Endereço','Av. Exemplo, 2200 · ap. 104 · Funcionários · Belo Horizonte/MG'],['Transportadora','Loggi (L4B Logística)'],['Volumes','2']],
  itens:[['220293','Impressora multifuncional HP Smart Tank 724',1,1049.00],['614176','Papel sulfite A4 500 folhas (exemplo)',3,28.57]],pag:'Cartão de crédito 5x',
  steps:_S6d('05/10 10:00',['16060477','06/10 09:10'],'06/10 15:00','07/10 19:20','15/10 07:50')}),
 /* 4 · troca de volume */
 '67643519':_O({cli:'c31',kom:'22718840',nf:'16060015',data:'04/10/2026',total:279.90,mod:'cd',carrier:'Correios',state:'entregue',stt:'Entregue',pill:['green','Entregue'],entregue:'14/10',
  aviso:['track','fa-exchange','Entregue o volume de outro cliente','O cliente recebeu uma caixa com etiqueta de outro pedido. O volume dele é o OY412207731BR.'],
  say:'Troca de volume.',tl:[['04/10','ERP','Compra aprovada · Pix'],['05/10','ERP','Faturado · NF 16060015'],['06/10 17:30','Correios','Postado'],['14/10 11:20','Correios','Entregue']],
  entrega:[['Endereço','R. Exemplo, 45 · Trindade · Florianópolis/SC'],['Transportadora','Correios (PAC)'],['Volume','OY412207731BR']],
  itens:[['439878','Mochila para notebook (exemplo)',1,279.90]],pag:'Pix',
  steps:_S6d('04/10 16:20',['16060015','05/10 08:50'],'05/10 13:40','06/10 17:30','14/10 08:10','14/10 11:20')}),
 /* 5 · entregue, cliente quer devolver (arrependimento) */
 '67641977':_O({cli:'c32',kom:'22716102',nf:'16058930',data:'08/10/2026',total:649.00,mod:'cd',carrier:'Jadlog',state:'entregue',stt:'Entregue',pill:['green','Entregue'],entregue:'13/10',
  say:'Entregue em 13/10.',tl:[['08/10','ERP','Compra aprovada · cartão 3x'],['09/10','ERP','Faturado · NF 16058930'],['09/10 20:10','Jadlog','Coletado no CD'],['13/10 15:35','Jadlog','Entregue · recebido pela cliente']],
  entrega:[['Endereço','R. Exemplo, 300 · Cambuí · Campinas/SP'],['Transportadora','Jadlog Logística']],
  itens:[['315763','Cadeira de escritório (exemplo)',1,649.00]],pag:'Cartão de crédito 3x',
  steps:_S6d('08/10 11:30',['16058930','09/10 08:15'],'09/10 14:20','09/10 20:10','13/10 08:00','13/10 15:35')}),
 /* 6 e 7 · empresa com dois pedidos: um em dia e um faturado aguardando boleto */
 '67642660':_O({cli:'c33',kom:'22717455',nf:'16059340',data:'09/10/2026',total:4870.00,mod:'cd',carrier:'Jadlog',state:'rota',origem:'Televendas',stt:'Em transporte',pill:['blue','Em transporte'],
  say:'Em transporte.',tl:[['09/10','ERP','Pedido Televendas · boleto faturado 28 dias'],['10/10','ERP','Faturado · NF 16059340 · 6 volumes'],['10/10 21:00','Jadlog','Coletado no CD'],['14/10 07:30','Jadlog','Em trânsito · Barueri']],
  entrega:[['Endereço','Al. Exemplo, 1000 · Alphaville · Barueri/SP'],['Transportadora','Jadlog Logística'],['Volumes','6']],
  itens:[['220293','Impressora multifuncional HP Smart Tank 724',2,1249],['315760','Cadeira de escritório (exemplo)',4,593]],pag:'Boleto faturado 28 dias',
  steps:_S6d('09/10 15:00',['16059340','10/10 09:00'],'10/10 16:30','10/10 21:00',null)}),
 '67646301':_O({cli:'c33',kom:'22721900',nf:'—',data:'15/10/2026',total:812.40,mod:'cd',carrier:'Jadlog',state:'pagamento',origem:'Televendas',stt:'Aguardando liberação',pill:['amber','Aguardando liberação'],
  aviso:['track','fa-lock','Pedido aguardando liberação de crédito','O limite do boleto faturado da empresa foi atingido. O Financeiro precisa liberar para o pedido seguir.'],
  say:'Bloqueado por limite de crédito.',tl:[['15/10 10:20','ERP','Pedido Televendas · boleto faturado 28 dias'],['15/10 10:21','ERP','Bloqueado · limite de crédito excedido']],
  entrega:[['Endereço','Al. Exemplo, 1000 · Alphaville · Barueri/SP'],['Transportadora','Jadlog Logística']],
  itens:[['614176','Papel sulfite A4 500 folhas (exemplo)',30,27.08]],pag:'Boleto faturado 28 dias',
  steps:[['Analisando pagamento',null],['NFe',null],['Separado',null],['Transportadora',null],['Saiu para entrega',null],['Pedido entregue',null]]})
});
Object.assign(VOL,{'67645210':'01516470911BR','67644088':'LG5730021865','67643519':'OY412207731BR','67641977':'01516468820BR','67642660':'01516469102BR'});

/* volumes por pedido (código, descrição) quando há mais de um */
ORDERS['67644088'].volumes=[['LG5730021865','1/2 · entregue em 15/10'],['LG5730021876','2/2 · não entregue']];

/* cliente com vários pedidos, em situações diferentes */
CLIENTES.c34={nome:'Henrique Barbosa',doc:'663.923.321-54',cidade:'São Paulo / SP',tel:'(11) 97721-5530',email:'henrique.barbosa@gmail.com',desde:2015};
Object.assign(ORDERS,{
 '67647120':_O({cli:'c34',kom:'22722810',nf:'16062210',data:'08/10/2026',total:1299.90,mod:'cd',carrier:'Jadlog',state:'rota',stt:'Em transporte',pill:['blue','Em transporte'],say:'Em transporte.',
  tl:[['08/10','ERP','Compra aprovada · cartão 6x'],['09/10','ERP','Faturado · NF 16062210 · 2 volumes'],['09/10 20:30','Jadlog','Coletado no CD']],
  entrega:[['Endereço','R. Exemplo, 1450 · ap. 72 · Pinheiros · São Paulo/SP'],['Transportadora','Jadlog Logística'],['Volumes','2']],
  itens:[['315762','Mesa para escritório (exemplo)',1,899.90],['315760','Cadeira de escritório (exemplo)',1,400]],pag:'Cartão de crédito 6x',
  volumes:[['01516472201BR','1/2 · mesa'],['01516472202BR','2/2 · cadeira']],
  steps:_S6d('08/10 10:05',['16062210','09/10 08:40'],'09/10 14:10','09/10 20:30',null)}),
 '67639004':_O({cli:'c34',kom:'22710660',nf:'16056780',data:'28/09/2026',total:89.70,mod:'cd',carrier:'Loggi',state:'entregue',stt:'Entregue',pill:['green','Entregue'],entregue:'03/10',say:'Entregue em 03/10.',
  tl:[['28/09','ERP','Compra aprovada · Pix'],['29/09','ERP','Faturado · NF 16056780'],['03/10 11:40','Loggi','Entregue']],
  entrega:[['Endereço','R. Exemplo, 1450 · ap. 72 · Pinheiros · São Paulo/SP'],['Transportadora','Loggi (L4B Logística)']],
  itens:[['614176','Papel sulfite A4 500 folhas (exemplo)',3,29.90]],pag:'Pix',
  steps:_S6d('28/09 09:00',['16056780','29/09 08:10'],'29/09 13:00','29/09 19:40','03/10 07:50','03/10 11:40')}),
 '22712877':_O({cli:'c34',kom:'22712877',nf:'16057120',data:'15/10/2026',total:249.90,mod:'pick',carrier:'—',state:'aguardando_retirada',origem:'App Kalunga',loja:'0021 · São Paulo Paulista',stt:'Pronto para retirada',pill:['green','Pronto para retirada'],retirar:'22/10',say:'Pronto para retirada.',
  tl:[['15/10 18:10','Site','Compra aprovada · retirada na loja 0021'],['15/10 19:30','Loja','Separado · cliente avisado']],
  entrega:[['Loja de retirada','0021 · Av. Paulista']],
  itens:[['439878','Mochila para notebook (exemplo)',1,249.90]],pag:'Cartão de crédito 1x',
  steps:[['Pagamento aprovado','15/10 18:10'],['Separado na loja','15/10 19:28'],['Pronto para retirada','15/10 19:30'],['Retirado',null]]}),
 '67635811':_O({cli:'c34',kom:'22705600',nf:'—',data:'05/10/2026',total:459.00,mod:'cd',carrier:'Jadlog',state:'cancelado',stt:'Cancelado',pill:['grey','Cancelado'],cancel:'06/10',say:'Cancelado a pedido do cliente antes do faturamento. Estorno no cartão em até 2 faturas.',
  tl:[['05/10','ERP','Compra aprovada · cartão 3x'],['06/10 10:15','ERP','Cancelado a pedido do cliente']],
  entrega:[['Endereço','R. Exemplo, 1450 · ap. 72 · Pinheiros · São Paulo/SP'],['Transportadora','Jadlog Logística']],
  itens:[['330145','Fragmentadora de papel (exemplo)',1,459]],pag:'Cartão de crédito 3x',
  steps:[['Analisando pagamento','05/10 15:00'],['NFe',null],['Separado',null],['Transportadora',null],['Saiu para entrega',null],['Pedido entregue',null]]}),
 '67648233':_O({cli:'c34',kom:'22723955',nf:'—',data:'16/10/2026',total:134.70,mod:'cd',carrier:'Jadlog',state:'pagamento',stt:'Aguardando pagamento',pill:['amber','Aguardando pagamento'],
  aviso:['track','fa-barcode','Aguardando o pagamento do boleto','Vence em 19/10. O pedido só vai para separação depois que o banco confirmar o pagamento.'],say:'Boleto pendente.',
  tl:[['16/10 08:20','Site','Pedido feito · boleto gerado (vence 19/10)']],
  entrega:[['Endereço','R. Exemplo, 1450 · ap. 72 · Pinheiros · São Paulo/SP'],['Transportadora','Jadlog Logística']],
  itens:[['512300','Kit material escolar (exemplo)',1,134.70]],pag:'Boleto bancário',
  steps:[['Analisando pagamento',null],['NFe',null],['Separado',null],['Transportadora',null],['Saiu para entrega',null],['Pedido entregue',null]]})});
VOL['67639004']='LG5714400921';
(()=>{const T=(d,a,ty,c,t)=>[d,a,ty,c,t];PROTOS.push({num:'6892030',cli:'c34',ped:'67639004',as:'Consulta de Pedido',sub:'Pedido no Prazo',canal:'WhatsApp',ab:'01/10/2026',status:'Finalizado',rem:false,trats:[{as:'Consulta de Pedido',sub:'Pedido no Prazo',st:'Concluída'}],
 tram:[T('01/10/2026 10:12','Sara F.','cli','WhatsApp','Cliente quis saber quando o pedido chega. Informado que já está com a Loggi.'),T('01/10/2026 10:14','Sara F.','fim','WhatsApp','Cliente orientado a acompanhar pelo rastreio da Loggi.')]})})();

/* Henrique Barbosa (c34) · vários protocolos em andamento: 2 no pedido em transporte, 1 no cancelado e 1 sem pedido */
(()=>{const T=(d,a,ty,c,t)=>[d,a,ty,c,t],P=o=>PROTOS.push(Object.assign({trats:[{as:o.as,sub:o.sub,st:'Aberta'}],status:'Com o Pós-Venda',rem:true},o));
 P({num:'6892031',cli:'c34',ped:'67647120',as:'Consulta de Pedido',sub:'Pedido em Atraso',canal:'Telefone',ab:'13/10/2026',
  tram:[T('13/10/2026 09:40','Pamela F.','cli','Telefone','Cliente informa que o volume 2/2 não anda no rastreio desde 11/10.'),
   T('13/10/2026 09:44','Pamela F.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Acionar a Jadlog sobre o volume 01516472202BR.')]});
 P({num:'6892035',cli:'c34',ped:'67647120',as:'Consulta de Pedido',sub:'Complemento de endereço',canal:'WhatsApp',ab:'15/10/2026',
  tram:[T('15/10/2026 16:02','Sara F.','cli','WhatsApp','Cliente pede incluir "apto 42, bloco B" no endereço de entrega.'),
   T('15/10/2026 16:05','Sara F.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Passar o complemento para a Jadlog.')]});
 P({num:'6892033',cli:'c34',ped:'67635811',as:'Estornos Diversos',sub:'Estorno não recebido',canal:'E-mail',ab:'08/10/2026',
  tram:[T('08/10/2026 11:20','Eliete L.','cli','E-mail','Cliente não vê o estorno do pedido cancelado na fatura.'),
   T('08/10/2026 11:26','Eliete L.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Pedir o comprovante de estorno ao financeiro.')]});
 P({num:'6892034',cli:'c34',ped:'',as:'Cadastro de Logradouro',sub:'Endereço incorreto no CEP',canal:'Chat do site',ab:'14/10/2026',
  tram:[T('14/10/2026 10:10','Amanda V.','cli','Chat do site','O CEP 01310-930 traz a rua errada no cadastro do cliente.'),
   T('14/10/2026 10:13','Amanda V.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Corrigir o logradouro na base de CEP.')]});
})();

