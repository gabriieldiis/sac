/* Casos de teste (lote 2): atraso na entrega, retirada que passou de 2 horas, troca de volume, falta de volume e devolução com estorno.
   Todos os dados são fictícios. "Hoje" no protótipo é 16/10/2026. */

/* motivo novo em Retirada em loja: o pedido não ficou pronto no prazo de 2 horas */
(()=>{const s=AS['Retirada em loja'].s;if(!s.some(x=>x[0]==='Passou de 2 horas para ficar pronto'))s.unshift(['Passou de 2 horas para ficar pronto','r'])})();
/* motivos do atraso na loja (aparecem no aviso do pedido e no histórico) */
const MOT_RET={
 equipe:'Equipe da expedição reduzida e pico de pedidos de retirada',
 estoque:'Item não encontrado no endereço de estoque da loja (divergência de estoque)',
 sistema:'Sistema da loja fora do ar: o pedido não pôde ser faturado para retirada'};

Object.assign(CLIENTES,{
 c19:{nome:'Patrícia Gomes',doc:'526.018.159-06',cidade:'Sorocaba / SP',tel:'(15) 98822-4410',email:'patricia.gomes@gmail.com',desde:2020},
 c20:{nome:'André Carvalho',doc:'083.016.613-05',cidade:'Porto Alegre / RS',tel:'(51) 99173-2085',email:'andre.carvalho@outlook.com',desde:2018},
 c21:{nome:'Luciana Freitas',doc:'186.091.390-34',cidade:'Recife / PE',tel:'(81) 98456-1290',email:'luciana.freitas@hotmail.com',desde:2022},
 c22:{nome:'Marcos Teixeira',doc:'996.030.824-30',cidade:'São Paulo / SP',tel:'(11) 96614-3307',email:'marcos.teixeira@gmail.com',desde:2017},
 c23:{nome:'Renata Moraes',doc:'628.194.821-12',cidade:'Santo André / SP',tel:'(11) 95270-8841',email:'renata.moraes@yahoo.com.br',desde:2021},
 c24:{nome:'Eduardo Ramos',doc:'993.518.190-19',cidade:'Campinas / SP',tel:'(19) 99731-5526',email:'eduardo.ramos@gmail.com',desde:2023},
 c25:{nome:'Aline Cardoso',doc:'937.865.797-41',cidade:'Niterói / RJ',tel:'(21) 98007-6634',email:'aline.cardoso@gmail.com',desde:2019},
 c26:{nome:'Felipe Nogueira',doc:'543.231.948-97',cidade:'Goiânia / GO',tel:'(62) 99245-1178',email:'felipe.nogueira@live.com',desde:2024},
 c27:{nome:'Sandra Lopes',doc:'757.491.186-06',cidade:'Jundiaí / SP',tel:'(11) 97380-2269',email:'sandra.lopes@gmail.com',desde:2016}});

const _S6=(a,b,c,d,e)=>[['Analisando pagamento',a],[b?'NFe '+b[0]:'NFe',b?b[1]:null],['Separado',c],['Transportadora',d],['Saiu para entrega',e],['Pedido entregue',null]];
Object.assign(ORDERS,{
 /* ---------- 1 a 3 · pedido em atraso ---------- */
 '67624410':_O({cli:'c19',kom:'22688102',nf:'16049921',data:'01/10/2026',total:742.60,mod:'cd',carrier:'Jadlog',state:'atrasado',stt:'Em transporte',pill:['blue','Em transporte'],
  aviso:['late','fa-clock-o','Sem movimentação na Jadlog desde 06/10','O volume está parado no centro de distribuição de Sorocaba há 10 dias. Confira o rastreio antes de responder o cliente.'],
  say:'Parado na transportadora desde 06/10.',
  tl:[['01/10','ERP','Compra aprovada · cartão 4x'],['02/10','ERP','Faturado · NF 16049921'],['02/10 19:30','Jadlog','Coletado no CD'],['06/10 08:12','Jadlog','Em trânsito · Sorocaba']],
  entrega:[['Endereço','R. Exemplo, 410 · Jardim Europa · Sorocaba/SP'],['Transportadora','Jadlog Logística']],
  itens:[['315760','Cadeira de escritório (exemplo)',1,699.90]],pag:'Cartão de crédito 4x',
  steps:_S6('01/10 10:20',['16049921','02/10 08:15'],'02/10 13:40','02/10 19:30',null)}),
 '67626987':_O({cli:'c20',kom:'22690455',nf:'16050588',data:'03/10/2026',total:389.40,mod:'cd',carrier:'Correios',state:'atrasado',stt:'Em transporte',pill:['blue','Em transporte'],
  aviso:['late','fa-clock-o','Correios: objeto aguardando tratamento desde 08/10','Objeto retido na unidade de tratamento em Porto Alegre. Já existe pedido de informação aberto nos Correios.'],
  say:'Retido nos Correios desde 08/10.',
  tl:[['03/10','ERP','Compra aprovada · Pix'],['03/10','ERP','Faturado · NF 16050588'],['04/10 17:00','Correios','Postado'],['08/10 11:05','Correios','Aguardando tratamento · Porto Alegre']],
  entrega:[['Endereço','Av. Exemplo, 1550 · ap. 82 · Moinhos · Porto Alegre/RS'],['Transportadora','Correios (PAC)']],
  itens:[['671714','Teclado e mouse sem fio TC212 Multi',2,129.90],['512300','Kit material escolar (exemplo)',1,109.60]],pag:'Pix',
  steps:_S6('03/10 09:01',['16050588','03/10 15:20'],'04/10 10:10','04/10 17:00',null)}),
 '67628140':_O({cli:'c21',kom:'22692731',nf:'16051207',data:'04/10/2026',total:2189.00,mod:'cd',carrier:'Loggi',state:'atrasado',stt:'Em transporte',pill:['blue','Em transporte'],
  aviso:['late','fa-clock-o','Duas tentativas de entrega sem sucesso','A Loggi informa "destinatário ausente" em 10/10 e 13/10. O pedido volta ao CD se a terceira tentativa falhar.'],
  say:'Duas tentativas sem sucesso.',
  tl:[['04/10','ERP','Compra aprovada · cartão 10x'],['05/10','ERP','Faturado · NF 16051207'],['06/10 20:10','Loggi','Coletado no CD'],['10/10 15:42','Loggi','Destinatário ausente'],['13/10 11:18','Loggi','Destinatário ausente']],
  entrega:[['Endereço','R. Exemplo, 77 · Boa Viagem · Recife/PE'],['Transportadora','Loggi (L4B Logística)']],
  itens:[['220293','Impressora multifuncional HP Smart Tank 724',1,1249],['315761','Monitor 24" (exemplo)',1,899]],pag:'Cartão de crédito 10x',
  steps:_S6('04/10 14:40',['16051207','05/10 09:00'],'05/10 16:30','06/10 20:10','10/10 08:05')}),

 /* ---------- 4 a 6 · retirada que passou de 2 horas ---------- */
 '22713305':_O({cli:'c22',kom:'22713305',nf:'—',data:'16/10/2026',total:149.70,mod:'pick',carrier:'—',state:'separacao',origem:'App Kalunga',loja:'0021 · São Paulo Paulista',stt:'Separando na loja',pill:['red','Atrasado na loja'],
  aviso:['late','fa-hourglass-end','Passou de 2 horas: pedido ainda em separação','Pago às 08:10, deveria estar pronto às 10:10. Motivo informado pela loja: '+MOT_RET.equipe+'.'],
  say:'Retirada atrasada: equipe reduzida.',
  tl:[['16/10 08:10','Site','Compra aprovada · retirada na loja 0021'],['16/10 10:40','Loja','Separação atrasada · equipe da expedição reduzida']],
  entrega:[['Loja de retirada','0021 · Av. Paulista']],
  itens:[['512300','Kit material escolar (exemplo)',1,89.80],['614174','Lixa massa e madeira 800-120 Tigre FL',10,0.80],['439879','Estojo escolar (exemplo)',1,51.90]],pag:'Pix',
  steps:[['Pagamento aprovado','16/10 08:10'],['Separado na loja',null],['Pronto para retirada',null],['Retirado',null]]}),
 '22713418':_O({cli:'c23',kom:'22713418',nf:'—',data:'16/10/2026',total:1249.00,mod:'pick',carrier:'—',state:'separacao',origem:'Site Kalunga',loja:'0031 · Santo André',stt:'Separando na loja',pill:['red','Atrasado na loja'],
  aviso:['late','fa-hourglass-end','Passou de 2 horas: item não encontrado na loja','Pago às 07:55. Motivo informado pela loja: '+MOT_RET.estoque+'. A loja está conferindo o estoque.'],
  say:'Retirada atrasada: divergência de estoque.',
  tl:[['16/10 07:55','Site','Compra aprovada · retirada na loja 0031'],['16/10 09:20','Loja','Item 220293 não localizado no endereço de estoque'],['16/10 10:30','Loja','Contagem de estoque em andamento']],
  entrega:[['Loja de retirada','0031 · Santo André']],
  itens:[['220293','Impressora multifuncional HP Smart Tank 724',1,1249]],pag:'Cartão de crédito 6x',
  steps:[['Pagamento aprovado','16/10 07:55'],['Separado na loja',null],['Pronto para retirada',null],['Retirado',null]]}),
 '22713502':_O({cli:'c24',kom:'22713502',nf:'—',data:'16/10/2026',total:318.50,mod:'pick',carrier:'—',state:'separacao',origem:'Site Kalunga',loja:'0045 · Campinas Shopping Iguatemi',stt:'Separado, aguardando faturamento',pill:['red','Atrasado na loja'],
  aviso:['late','fa-hourglass-end','Passou de 2 horas: separado, mas sem nota fiscal','Pago às 08:30 e separado às 09:15. Motivo informado pela loja: '+MOT_RET.sistema+'. Sem nota o pedido não pode ser entregue.'],
  say:'Retirada atrasada: sistema da loja fora do ar.',
  tl:[['16/10 08:30','Site','Compra aprovada · retirada na loja 0045'],['16/10 09:15','Loja','Separado'],['16/10 09:20','Loja','Falha ao faturar · sistema da loja indisponível']],
  entrega:[['Loja de retirada','0045 · Campinas Shopping Iguatemi']],
  itens:[['439878','Mochila para notebook (exemplo)',1,289.90],['671715','Mouse sem fio (exemplo)',1,28.60]],pag:'Cartão de crédito 1x',
  steps:[['Pagamento aprovado','16/10 08:30'],['Separado na loja','16/10 09:15'],['Pronto para retirada',null],['Retirado',null]]}),

 /* ---------- 7 · troca de volume ---------- */
 '67630775':_O({cli:'c25',kom:'22695012',nf:'16052460',data:'06/10/2026',total:459.80,mod:'cd',carrier:'Jadlog',state:'entregue',stt:'Entregue',pill:['green','Entregue'],entregue:'13/10',
  aviso:['track','fa-exchange','Entregue o volume de outro cliente','A cliente recebeu uma caixa com etiqueta de outro pedido (volume 01516461599BR). O volume dela é o 01516461588BR.'],
  say:'Troca de volume na entrega.',
  tl:[['06/10','ERP','Compra aprovada · cartão 2x'],['07/10','ERP','Faturado · NF 16052460'],['07/10 19:50','Jadlog','Coletado no CD'],['13/10 14:22','Jadlog','Entregue · recebido pela cliente']],
  entrega:[['Endereço','R. Exemplo, 200 · Icaraí · Niterói/RJ'],['Transportadora','Jadlog Logística'],['Volume','01516461588BR']],
  itens:[['330145','Fragmentadora de papel (exemplo)',1,459.80]],pag:'Cartão de crédito 2x',
  steps:_S6('06/10 11:10',['16052460','07/10 08:40'],'07/10 14:00','07/10 19:50','13/10 07:30').map(s=>s[0]==='Pedido entregue'?[s[0],'13/10 14:22']:s)}),

 /* ---------- 8 · falta de volume ---------- */
 '67631902':_O({cli:'c26',kom:'22696330',nf:'16053118',data:'07/10/2026',total:1687.40,mod:'cd',carrier:'Jadlog',state:'entregue',stt:'Entrega parcial',pill:['amber','Entrega parcial'],
  aviso:['track','fa-cubes','Chegaram 2 de 3 volumes','O volume 3/3 (01516462731BR) não foi entregue. A Jadlog registrou a entrega dos volumes 1 e 2 em 14/10.'],
  say:'Falta 1 volume.',
  tl:[['07/10','ERP','Compra aprovada · boleto'],['08/10','ERP','Faturado · NF 16053118 · 3 volumes'],['08/10 20:15','Jadlog','Coletado no CD · 3 volumes'],['14/10 10:05','Jadlog','Entregue · volumes 1/3 e 2/3']],
  entrega:[['Endereço','Av. Exemplo, 3100 · Setor Bueno · Goiânia/GO'],['Transportadora','Jadlog Logística'],['Volumes','3']],
  itens:[['315762','Mesa para escritório (exemplo)',1,1099.00],['315760','Cadeira de escritório (exemplo)',1,529.90],['614175','Organizador de mesa (exemplo)',1,58.50]],pag:'Boleto bancário',
  steps:_S6('07/10 15:30',['16053118','08/10 09:10'],'08/10 14:50','08/10 20:15','14/10 07:40')}),

 /* ---------- 9 · devolvido com estorno ---------- */
 '67618833':_O({cli:'c27',kom:'22684219',nf:'16046075',data:'25/09/2026',total:899.00,mod:'cd',carrier:'Loggi',state:'entregue',stt:'Devolvido',pill:['grey','Devolvido'],entregue:'30/09',
  aviso:['ok','fa-undo','Devolvido ao CD em 09/10 · estorno feito em 14/10','Devolução por arrependimento. O estorno de R$ 899,00 foi lançado no cartão em 14/10 e aparece em até 2 faturas.'],
  say:'Devolvido com estorno.',
  tl:[['25/09','ERP','Compra aprovada · cartão 3x'],['26/09','ERP','Faturado · NF 16046075'],['30/09 16:10','Loggi','Entregue'],['03/10','ERP','Devolução autorizada · coleta agendada'],['06/10 10:30','Loggi','Coletado no cliente (reversa)'],['09/10 15:00','CD','Recebido e conferido · produto sem avarias'],['14/10 09:12','Financeiro','Estorno lançado · cartão final 4421']],
  entrega:[['Endereço','R. Exemplo, 15 · Centro · Jundiaí/SP'],['Transportadora','Loggi (L4B Logística)']],
  itens:[['315761','Monitor 24" (exemplo)',1,899.00]],pag:'Cartão de crédito 3x',
  steps:_S6('25/09 09:40',['16046075','26/09 08:20'],'26/09 13:10','26/09 19:45','30/09 08:00').map(s=>s[0]==='Pedido entregue'?[s[0],'30/09 16:10']:s)})
});
Object.assign(VOL,{'67624410':'01516458820BR','67628140':'LG5715503321','67630775':'01516461588BR','67631902':'01516462711BR','67618833':'LG5701198865'});

(()=>{const T=(d,a,ty,c,t)=>[d,a,ty,c,t],P=o=>PROTOS.push(Object.assign({trats:[{as:o.as,sub:o.sub,st:isOpen(o)?'Aberta':'Concluída'}]},o));
 /* atraso 1 · na fila, já cobrado duas vezes */
 P({num:'6892020',cli:'c19',ped:'67624410',as:'Consulta de Pedido',sub:'Pedido em Atraso',canal:'Telefone',ab:'09/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('09/10/2026 10:14','Pamela F.','cli','Telefone','Cliente informa que o rastreio não muda desde 06/10. Endereço confirmado.'),
   T('09/10/2026 10:18','Pamela F.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Acionar a Jadlog sobre o volume parado em Sorocaba.'),
   T('09/10/2026 14:05','Vitória B.','env','E-mail','Jadlog acionada · pedido de localização nº JL-772104 · retorno em 72h úteis.'),
   T('14/10/2026 16:40','Amanda V.','cli','WhatsApp','Cliente voltou a cobrar. Informado que a transportadora está localizando o volume.')]});
 /* atraso 2 · retorno da transportadora recebido */
 P({num:'6892021',cli:'c20',ped:'67626987',as:'Consulta de Pedido',sub:'Pedido em Atraso',canal:'E-mail',ab:'10/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('10/10/2026 09:02','Eliete L.','cli','E-mail','Cliente pede posição do pedido: objeto parado nos Correios desde 08/10.'),
   T('10/10/2026 09:06','Eliete L.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Abrir pedido de informação nos Correios.'),
   T('10/10/2026 11:30','Bianca A.','env','Portal da transportadora','Pedido de informação aberto nos Correios · PI 4108822371.'),
   T('15/10/2026 17:20','Correios','ret','E-mail','Correios informam que o objeto foi liberado e segue para entrega em até 3 dias úteis.<br><span class="nx">Próximo passo: <b>Avisar o cliente</b></span>')],stage:'avisar'});
 /* atraso 3 · resolvido no atendimento, com orientação */
 P({num:'6892022',cli:'c21',ped:'67628140',as:'Consulta de Pedido',sub:'Pedido em Atraso',canal:'Chat do site',ab:'13/10/2026',status:'Finalizado',rem:false,
  tram:[T('13/10/2026 15:10','Samara M.','cli','Chat do site','Cliente diz que não recebeu. Rastreio mostra duas tentativas com "destinatário ausente".'),
   T('13/10/2026 15:16','Samara M.','fim','Sistema','<b>Finalizado no atendimento.</b><br>Cliente confirmou que trabalha fora no horário comercial e vai deixar autorização com o porteiro para a terceira tentativa.')]});
 /* retirada 1 · equipe reduzida */
 P({num:'6892023',cli:'c22',ped:'22713305',as:'Retirada em loja',sub:'Passou de 2 horas para ficar pronto',canal:'Telefone',ab:'16/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('16/10/2026 10:35','Renato L.','cli','Telefone','Cliente está na loja Paulista desde 10h e o pedido ainda não ficou pronto (pago às 08:10).'),
   T('16/10/2026 10:38','Renato L.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Cobrar a loja 0021 e pedir prioridade na separação.'),
   T('16/10/2026 10:45','Vitória B.','env','Telefone','Loja 0021 acionada (gerente Carla). Motivo: <b>equipe da expedição reduzida e pico de pedidos</b>. Previsão de 30 min.')]});
 /* retirada 2 · divergência de estoque */
 P({num:'6892024',cli:'c23',ped:'22713418',as:'Retirada em loja',sub:'Passou de 2 horas para ficar pronto',canal:'WhatsApp',ab:'16/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('16/10/2026 10:05','Sara F.','cli','WhatsApp','Cliente recebeu aviso de atraso e quer saber se a impressora vai sair hoje.'),
   T('16/10/2026 10:09','Sara F.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Verificar com a loja 0031 se o item existe no estoque.'),
   T('16/10/2026 10:30','Amanda V.','env','Telefone','Loja 0031 acionada. Motivo: <b>item não encontrado no endereço de estoque</b>. Loja fazendo contagem.'),
   T('16/10/2026 11:15','Loja 0031','ret','Telefone','Item localizado em outro endereço do depósito. Pedido fica pronto até 12h.<br><span class="nx">Próximo passo: <b>Avisar o cliente</b></span>')],stage:'avisar'});
 /* retirada 3 · sistema fora do ar */
 P({num:'6892025',cli:'c24',ped:'22713502',as:'Retirada em loja',sub:'Passou de 2 horas para ficar pronto',canal:'Telefone',ab:'16/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('16/10/2026 10:50','Pamela F.','cli','Telefone','Cliente na loja Iguatemi: pedido separado mas o balcão diz que não pode entregar sem nota.'),
   T('16/10/2026 10:53','Pamela F.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Verificar com a TI a falha de faturamento na loja 0045.'),
   T('16/10/2026 11:05','Bianca A.','env','Sistema interno','Chamado aberto para a TI · nº INC-58813. Motivo: <b>sistema da loja fora do ar</b>.')]});
 /* troca de volume */
 P({num:'6892026',cli:'c25',ped:'67630775',as:'Consulta de Pedido',sub:'Troca de volume',canal:'Telefone',ab:'13/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('13/10/2026 16:02','Amanda V.','cli','Telefone','Cliente recebeu uma caixa com etiqueta de outro pedido (01516461599BR). Não abriu a caixa.'),
   T('13/10/2026 16:06','Amanda V.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Pedir à Jadlog a coleta do volume errado e a entrega do volume 01516461588BR.'),
   T('14/10/2026 09:30','Vitória B.','env','E-mail','Jadlog acionada · ocorrência de troca nº JL-775930. Coleta e entrega no mesmo dia.'),
   T('15/10/2026 18:10','Jadlog','ret','E-mail','Jadlog confirma coleta do volume errado e entrega do correto agendada para 17/10.<br><span class="nx">Próximo passo: <b>Aguardar novo retorno</b></span>')]});
 /* falta de volume */
 P({num:'6892027',cli:'c26',ped:'67631902',as:'Consulta de Pedido',sub:'Falta de volume',canal:'E-mail',ab:'14/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('14/10/2026 13:40','Eliete L.','cli','E-mail','Cliente recebeu a mesa e a cadeira, mas não o organizador de mesa (volume 3/3).'),
   T('14/10/2026 13:44','Eliete L.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Abrir acareação com a Jadlog pelo volume 3/3 (01516462731BR).'),
   T('14/10/2026 15:20','Bianca A.','env','Portal da transportadora','Acareação aberta · ID 56901244 · retorno em 72h úteis.')]});
 /* devolução com estorno · encerrado */
 P({num:'6892028',cli:'c27',ped:'67618833',as:'Devolução',sub:'Coleta via transportadora',canal:'Telefone',ab:'02/10/2026',status:'Encerrado',rem:true,
  tram:[T('02/10/2026 11:20','Renato L.','cli','Telefone','Cliente desistiu do monitor (arrependimento, 2 dias após receber). Produto lacrado.'),
   T('02/10/2026 11:25','Renato L.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Autorizar a devolução e agendar coleta.'),
   T('03/10/2026 09:10','Vitória B.','env','Sistema interno','Devolução autorizada · coleta reversa agendada com a Loggi para 06/10.'),
   T('09/10/2026 15:30','CD','ret','Sistema interno','Produto recebido no CD sem avarias.<br><span class="nx">Próximo passo: <b>Aguardar novo retorno</b></span>'),
   T('09/10/2026 15:40','Vitória B.','env','E-mail','Solicitado ao Financeiro o estorno de R$ 899,00 no cartão.'),
   T('14/10/2026 09:30','Financeiro','ret','E-mail','Estorno lançado em 14/10 no cartão final 4421.<br><span class="nx">Próximo passo: <b>Avisar o cliente</b></span>'),
   T('14/10/2026 10:05','Vitória B.','cli','Telefone','Cliente avisada: o estorno aparece em até 2 faturas.'),
   T('14/10/2026 10:07','Vitória B.','fim','Sistema','<b>Resolvido</b><br>Devolução concluída e estorno confirmado ao cliente.')]});
})();
