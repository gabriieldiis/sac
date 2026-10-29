/* Casos de teste: pedidos em andamento e protocolos novos. */
/* ================= novos casos de teste (pedidos em andamento) ================= */
Object.assign(CLIENTES,{
 c12:{nome:'Fernanda Oliveira',doc:'528.716.340-06',cidade:'São Paulo / SP',tel:'(11) 95382-1047',email:'fernanda.oliveira@gmail.com',desde:2021},
 c13:{nome:'Thiago Martins',doc:'617.042.958-10',cidade:'Curitiba / PR',tel:'(41) 98820-3315',email:'thiago.martins@outlook.com',desde:2019},
 c14:{nome:'Beatriz Santos',doc:'734.185.290-42',cidade:'Belo Horizonte / MG',tel:'(31) 97154-6608',email:'beatriz.santos@yahoo.com.br',desde:2024},
 c15:{nome:'Gustavo Pereira',doc:'845.903.126-77',cidade:'São Paulo / SP',tel:'(11) 94471-2290',email:'gustavo.pereira@gmail.com',desde:2020},
 c16:{nome:'Camila Rocha',doc:'903.628.471-15',cidade:'Campinas / SP',tel:'(19) 99268-0731',email:'camila.rocha@hotmail.com',desde:2022},
 c17:{nome:'Colégio Exemplo Ltda',doc:'28.413.596/0001-07',cidade:'Osasco / SP',tel:'(11) 3602-8800',email:'compras@colegioexemplo.com.br',desde:2014},
 c18:{nome:'Vinícius Araújo',doc:'156.837.402-90',cidade:'Ribeirão Preto / SP',tel:'(16) 98135-7724',email:'vinicius.araujo@gmail.com',desde:2023}});
const _O=(o)=>Object.assign({sub:'',ic:'fa-truck',col:'#2682bf',prev:'—',src:[],fones:'',origem:'Site Kalunga',loja:'CD',carrier:'Jadlog'},o);
Object.assign(ORDERS,{
 /* 1 · boleto aguardando pagamento */
 '67640112':_O({cli:'c12',kom:'22712044',nf:'—',data:'15/10/2026',total:168.80,mod:'cd',state:'pagamento',stt:'Aguardando pagamento',pill:['amber','Aguardando pagamento'],
  aviso:['track','fa-barcode','Aguardando o pagamento do boleto','Vence em 18/10. O pedido só vai para separação depois que o banco confirmar o pagamento (até 2 dias úteis).'],
  say:'Boleto gerado em 15/10, ainda sem pagamento.',
  tl:[['15/10 21:14','Site','Pedido feito · boleto gerado (vence 18/10)']],
  entrega:[['Endereço','R. Exemplo, 1180 · Vila Mariana · São Paulo/SP'],['Transportadora','Jadlog Logística']],
  itens:[['671714','Teclado e mouse sem fio TC212 Multi',1,129.90],['614174','Lixa massa e madeira 800-120 Tigre FL',30,0.80]],pag:'Boleto bancário',
  steps:[['Analisando pagamento',null],['NFe',null],['Separado',null],['Transportadora',null],['Saiu para entrega',null],['Pedido entregue',null]]}),
 /* 2 · pago, em separação no CD */
 '67641508':_O({cli:'c13',kom:'22712390',nf:'16058812',data:'14/10/2026',total:1899.00,mod:'cd',state:'separacao',stt:'Em separação',pill:['blue','Em separação'],
  aviso:['','fa-cube','Em separação no CD','Nota fiscal emitida. O pedido está sendo separado e embalado; depois vai para a Jadlog.'],
  say:'Faturado, em separação no CD.',
  tl:[['14/10','ERP','Compra aprovada · Pix'],['15/10 08:20','ERP','Faturado · NF 16058812'],['15/10 10:05','CD','Em separação']],
  entrega:[['Endereço','Av. Exemplo, 455 · Água Verde · Curitiba/PR'],['Transportadora','Jadlog Logística']],
  itens:[['315760','Cadeira gamer PlayStation PA4D XL preta',1,1899.00]],pag:'Pix',
  steps:[['Analisando pagamento','14/10 19:02'],['NFe 16058812','15/10 08:20'],['Separado',null],['Transportadora',null],['Saiu para entrega',null],['Pedido entregue',null]]}),
 /* 3 · saiu para entrega hoje */
 '67638877':_O({cli:'c14',kom:'22709215',nf:'16055430',data:'10/10/2026',total:532.80,mod:'cd',carrier:'Loggi',state:'rota',stt:'Saiu para entrega',pill:['blue','Saiu para entrega'],
  say:'Saiu para entrega hoje às 07:40.',
  tl:[['10/10','ERP','Compra aprovada · cartão 3x'],['11/10','ERP','Faturado · NF 16055430'],['11/10 15:30','CD','Separado'],['11/10 21:10','Loggi','Coletado no CD'],['16/10 07:40','Loggi','Saiu para entrega']],
  entrega:[['Endereço','R. Exemplo, 92 · ap. 301 · Savassi · Belo Horizonte/MG'],['Transportadora','Loggi (L4B Logística)']],
  itens:[['439878','Mochila para notebook (exemplo)',1,289.90],['512300','Kit material escolar (exemplo)',1,215.00]],pag:'Cartão de crédito 3x',
  steps:[['Analisando pagamento','10/10 12:44'],['NFe 16055430','11/10 08:02'],['Separado','11/10 15:30'],['Transportadora','11/10 21:10'],['Saiu para entrega','16/10 07:40'],['Pedido entregue',null]]}),
 /* 4 · Super Expressa com o entregador agora */
 '22709931':_O({cli:'c15',kom:'22709931',nf:'16055978',data:'16/10/2026',total:96.40,mod:'loja',carrier:'Loggi',state:'rota',origem:'App Kalunga',loja:'0021 · São Paulo Paulista',stt:'Saiu com entregador',pill:['blue','Com o entregador'],
  say:'Saiu da loja com o entregador às 10:55.',
  tl:[['16/10 09:12','Site','Compra pelo app · Entrega Super Expressa'],['16/10 10:20','Loja','Separado na loja 0021'],['16/10 10:55','Loggi','Saiu com entregador · pacote 571204488']],
  entrega:[['Endereço','R. Exemplo, 310 · Bela Vista · São Paulo/SP'],['Loja de saída','0021 · Av. Paulista'],['Entregador','Loggi · pacote 571204488']],
  itens:[['512300','Kit material escolar (exemplo)',1,86.40]],pag:'Cartão de crédito 1x',
  steps:[['Pagamento aprovado','16/10 09:12'],['Separado na loja','16/10 10:20'],['Saiu com entregador','16/10 10:55'],['Pedido entregue',null]]}),
 /* 5 · retirada: pronto na loja */
 '22710458':_O({cli:'c16',kom:'22710458',nf:'16056120',data:'14/10/2026',total:649.90,mod:'pick',carrier:'—',state:'aguardando_retirada',loja:'0045 · Campinas Shopping Iguatemi',stt:'Pronto para retirada',pill:['green','Pronto para retirada'],retirar:'21/10',
  say:'Pronto para retirada desde 15/10.',
  tl:[['14/10 16:40','Site','Compra aprovada · retirada na loja 0045'],['15/10 09:30','Loja','Separado · cliente avisado por e-mail e SMS']],
  entrega:[['Loja de retirada','0045 · Campinas Shopping Iguatemi']],
  itens:[['671714','Teclado e mouse sem fio TC212 Multi',5,129.98]],pag:'Cartão de crédito 2x',
  steps:[['Pagamento aprovado','14/10 16:40'],['Separado na loja','15/10 09:28'],['Pronto para retirada','15/10 09:30'],['Retirado',null]]}),
 /* 6 · retirada: loja ainda separando (sem protocolo) */
 '22711006':_O({cli:'c12',kom:'22711006',nf:'16056344',data:'16/10/2026',total:59.90,mod:'pick',carrier:'—',state:'separacao',loja:'0012 · São Paulo Vila Mariana',stt:'Separando na loja',pill:['blue','Separando na loja'],
  aviso:['','fa-shopping-bag','A loja está separando o pedido','O cliente recebe e-mail e SMS quando estiver pronto. Retirada normalmente em até 2 horas.'],
  say:'Separando na loja.',
  tl:[['16/10 09:58','Site','Compra aprovada · retirada na loja 0012']],
  entrega:[['Loja de retirada','0012 · Vila Mariana']],
  itens:[['614174','Lixa massa e madeira 800-120 Tigre FL',10,0.80],['439878','Mochila para notebook (exemplo)',1,51.90]],pag:'Pix',
  steps:[['Pagamento aprovado','16/10 09:58'],['Separado na loja',null],['Pronto para retirada',null],['Retirado',null]]}),
 /* 7 · empresa · entregue com avaria */
 '67635590':_O({cli:'c17',kom:'22705120',nf:'16050007',data:'06/10/2026',total:3264.00,mod:'cd',state:'entregue',origem:'Televendas',stt:'Entregue',pill:['green','Entregue'],entregue:'14/10',
  say:'Entregue em 14/10. Cliente informou 2 caixas amassadas.',
  tl:[['06/10','ERP','Pedido Televendas · boleto faturado 28 dias'],['07/10','ERP','Faturado · NF 16050007'],['08/10','CD','Separado · 4 volumes'],['08/10 20:30','Jadlog','Coletado no CD'],['14/10 11:20','Jadlog','Entregue · recebido por portaria']],
  entrega:[['Endereço','Av. Exemplo, 1500 · Centro · Osasco/SP'],['Transportadora','Jadlog Logística'],['Volumes','4']],
  itens:[['220293','Impressora multifuncional HP Smart Tank 724',2,1249],['512300','Kit material escolar (exemplo)',4,191.50]],pag:'Boleto faturado 28 dias',
  steps:[['Analisando pagamento','06/10 14:00'],['NFe 16050007','07/10 09:10'],['Separado','08/10 11:40'],['Transportadora','08/10 20:30'],['Saiu para entrega','14/10 08:05'],['Pedido entregue','14/10 11:20']]}),
 /* 8 · extravio informado pela transportadora */
 '67633120':_O({cli:'c18',kom:'22703388',nf:'16048261',data:'02/10/2026',total:1249.00,mod:'cd',state:'atrasado',stt:'Extraviado',extravio:'13/10',pill:['red','Extraviado'],
  aviso:['late','fa-exclamation-circle','Transportadora informou extravio em 13/10','A Jadlog confirmou a perda do volume. Não prometa nova data: o Pós-Venda decide reenvio ou estorno.'],
  say:'Extravio confirmado pela Jadlog.',
  tl:[['02/10','ERP','Compra aprovada · cartão 10x'],['03/10','ERP','Faturado · NF 16048261'],['03/10 21:00','Jadlog','Coletado no CD'],['06/10','Jadlog','Em trânsito · Ribeirão Preto'],['13/10 16:22','Jadlog','Extravio confirmado']],
  entrega:[['Endereço','R. Exemplo, 77 · Jardim Sumaré · Ribeirão Preto/SP'],['Transportadora','Jadlog Logística']],
  itens:[['220293','Impressora multifuncional HP Smart Tank 724',1,1249]],pag:'Cartão de crédito 10x',
  steps:[['Analisando pagamento','02/10 08:30'],['NFe 16048261','03/10 07:50'],['Separado','03/10 13:10'],['Transportadora','03/10 21:00'],['Saiu para entrega',null],['Pedido entregue',null]]})
});
Object.assign(VOL,{'67638877':'LG5712044190','67635590':'01516461307BR','67633120':'01516455820BR','22709931':'571204488'});
(()=>{const T=(d,a,ty,c,t)=>[d,a,ty,c,t],P=o=>PROTOS.push(Object.assign({trats:[{as:o.as,sub:o.sub,st:isOpen(o)?'Aberta':'Concluída'}]},o));
 P({num:'6892001',cli:'c12',ped:'67640112',as:'Formas de Pagamento',sub:'Boleto',canal:'Telefone',ab:'16/10/2026',status:'Finalizado',rem:false,
  tram:[T('16/10/2026 08:41','Pamela F.','cli','Telefone','Cliente não encontrou o boleto no e-mail. Enviada a 2ª via pelo site e explicado que o pedido só vai para separação após a compensação.'),T('16/10/2026 08:44','Pamela F.','fim','Sistema','Finalizado no atendimento.')]});
 P({num:'6892003',cli:'c13',ped:'67641508',as:'Consulta de Pedido',sub:'Pedido no Prazo',canal:'WhatsApp',ab:'16/10/2026',status:'Finalizado',rem:false,
  tram:[T('16/10/2026 09:10','Sara F.','cli','WhatsApp','Cliente quer saber quando o pedido sai. Informado que está em separação no CD com nota emitida; o rastreio chega por e-mail quando for para a Jadlog.'),T('16/10/2026 09:12','Sara F.','fim','Sistema','Finalizado no atendimento.')]});
 P({num:'6892005',cli:'c14',ped:'67638877',as:'Consulta de Pedido',sub:'Complemento de endereço',canal:'Chat do site',ab:'16/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('16/10/2026 08:05','Samara M.','cli','Chat do site','Pedido saiu para entrega e a cliente percebeu que faltou o <b>nº do apartamento (301)</b> no endereço.'),T('16/10/2026 08:07','Samara M.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Avisar a Loggi do complemento <mark>ap. 301</mark> antes da tentativa de entrega.')]});
 P({num:'6892007',cli:'c16',ped:'22710458',as:'Retirada em loja',sub:'Outra pessoa vai retirar',canal:'Telefone',ab:'15/10/2026',status:'Finalizado',rem:false,
  tram:[T('15/10/2026 17:22','Renato L.','cli','Telefone','Cliente pergunta se o marido pode retirar. Orientado: levar documento com foto, nº do pedido e a autorização assinada.'),T('15/10/2026 17:25','Renato L.','fim','Sistema','Finalizado no atendimento.')]});
 P({num:'6892009',cli:'c17',ped:'67635590',as:'Avaria',sub:'Transportadora',canal:'E-mail',ab:'14/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('14/10/2026 15:40','Eliete L.','cli','E-mail','Colégio informa que 2 das 4 caixas chegaram amassadas e uma impressora não liga. Fotos enviadas pelo cliente.'),T('14/10/2026 15:46','Eliete L.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Abrir ocorrência de avaria com a Jadlog e verificar troca da impressora.'),T('15/10/2026 10:12','Vitória B.','env','E-mail','Ocorrência aberta na Jadlog · nº AV-889301 · retorno em até 5 dias úteis.')]});
 P({num:'6892011',cli:'c18',ped:'67633120',as:'Transportadora',sub:'Extravio',canal:'Telefone',ab:'10/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('10/10/2026 11:02','Amanda V.','cli','Telefone','Cliente cobra o pedido: rastreio parado em Ribeirão Preto desde 06/10.'),T('10/10/2026 11:05','Amanda V.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Acionar a Jadlog sobre o volume parado.'),T('10/10/2026 14:30','Vitória B.','env','E-mail','Jadlog acionada para localizar o volume.'),T('13/10/2026 16:40','Jadlog','ret','E-mail','Transportadora confirma <b>extravio</b> do volume 01516455820BR.')]});
 P({num:'6892013',cli:'c15',ped:'22709931',as:'Entrega da Loja',sub:'Pedido Fora do Prazo',canal:'WhatsApp',ab:'16/10/2026',status:'Com o Pós-Venda',rem:true,
  tram:[T('16/10/2026 11:30','Sara F.','cli','WhatsApp','Cliente diz que a Super Expressa prometia até 2h e o pedido ainda não chegou.'),T('16/10/2026 11:32','Sara F.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Verificar com a loja 0021 e a Loggi a posição do entregador.')]});
 P({num:'6892015',cli:'c13',ped:null,as:'Produtos (Dúvidas)',sub:'Compatibilidade',canal:'Chat do site',ab:'12/10/2026',status:'Encerrado',rem:true,
  tram:[T('12/10/2026 16:02','Samara M.','cli','Chat do site','Cliente quer saber se a cadeira aguenta 150 kg.'),T('12/10/2026 16:05','Samara M.','rem','Sistema','<b>Remetido ao Pós-Venda.</b><br>Confirmar com o fornecedor o peso máximo suportado.'),T('13/10/2026 09:40','Vitória B.','fim','Sistema','Fornecedor confirma 150 kg. Cliente informado; protocolo encerrado.')]});
})();
