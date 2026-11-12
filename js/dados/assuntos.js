/* Lista de assuntos, tópicos (sub-assuntos), ícones e cores. */
/* ================= assuntos e sub-assuntos ================= */
/* p: pedido  x = obrigatório · o = opcional · n = não pede pedido
   s: sub-assuntos [nome, r = remete ao Pós-Venda por padrão | v = resolve no atendimento] */
const AS={
 'Consulta de Pedido':{p:'x',s:[['Pedido no Prazo','v'],['Troca de volume','r'],['Falta de volume','r'],['Transportadora assumiu perda','r'],['Pedido em Atraso','r'],['Complemento de endereço','r'],['Transportadora afirma que entregou','r'],['Barrar pedido','r'],['Não reconhece a entrega (ACAREAÇÃO)','r'],['Devolução','r'],['Furo de estoque','r']]},
 'Devolução':{p:'x',s:[['Autorização de postagem','r'],['Coleta via transportadora','r'],['Troca em loja','r']]},
 'Cancelamento (Exceção)':{p:'x',nosub:1,s:[['Cancelamento do pedido','v'],['Pedido já faturado','r',1],['Pedido em transporte','r',1],['Retirada não realizada','r',1],['Compra com cadastro errado (CPF/CNPJ)','r',1]]},
 '2a. via Fatura/Boleto/Arquivo XML':{p:'o',s:[['2ª via de boleto','v'],['Cópia de DANFE (2ª via da nota)','v'],['Arquivo XML','v'],['Fatura','v']]},
 'Abatimento':{p:'x',nosub:1,soTram:1,s:[['Abatimento','r'],['Diferença de preço','r',1],['Avaria leve no produto','r',1],['Atraso na entrega','r',1]]},
 'Alterações Site':{p:'n',s:[['Alterar dados cadastrais','v'],['Alterar e-mail ou senha','v'],['Excluir cadastro (LGPD)','r']]},
 'Avaria':{p:'x',s:[['Transportadora','r'],['CD','r']]},
 'Cadastro de Logradouro':{p:'n',s:[['CEP não encontrado','r'],['Endereço incorreto no CEP','r']]},
 'Cancelamento (orientação)':{p:'o',s:[['Como cancelar','v'],['Prazo do estorno','v']]},
 'Cancelamento Site':{p:'x',s:[['Antes do faturamento','r'],['Depois do faturamento','r']]},
 'Copy & Print':{p:'o',s:[['Prazo de produção','v'],['Arquivo com problema','r'],['Qualidade da impressão','r'],['Retirada do pedido','v']]},
 'Devolução Site':{p:'x',s:[['Não condiz com a foto','r'],['Não atende minhas necessidades','r'],['Produto com defeito','r'],['Itens errados','r'],['Etiqueta errada','r'],['Erro na compra','r'],['Baixa qualidade','r'],['Embalagem violada','r'],['Devolução Site','r',1]]},
 'Dúvidas (Preço|Promoção|Desconto)':{p:'n',s:[['Preço diferente loja x site','v'],['Cupom não aplicado','v'],['Regras da promoção','v'],['Desconto','v']]},
 'Dúvidas sobre o site':{p:'n',s:[['Como comprar','v'],['Erro no site','r'],['Acesso à conta','v'],['Cadastro','v'],['Parcelamento','v'],['Frete','v']]},
 'Elogios':{p:'o',s:[['Atendimento','v'],['Entrega','v'],['Loja','v'],['Produto','v'],['Televendas','v'],['Internet','v'],['Corporativo','v'],['Licitações','v'],['Sack','v'],['Copy & Print','v'],['Spiral','v'],['Outros departamentos','v']]},
 'Entrega da Loja':{p:'x',semOutro:1,s:[['Pedido Fora do Prazo','r'],['Falta de Produtos','r'],['Cancelamento','r'],['Coleta','r'],['Acareação','r'],['Devolução – Coleta','r'],['Troca de Pedidos','r'],['Pedido no Prazo','v']]},
 'Estornos Diversos':{p:'o',s:[['Prazo do estorno','v'],['Comprovante de estorno','r'],['Estorno não recebido','r'],['Frete','r'],['2% multa','r'],['Extravio (sem E1)','r'],['Estorno com crédito','r'],['Pós Venda','r']]},
 'Falta de produto na entrega':{p:'x',s:[['Site','r'],['Televendas','r'],['Item faltando','r',1],['Volume faltando','r',1]]},
 'Formas de Pagamento':{p:'n',s:[['Parcelamento','v'],['Pix','v'],['Boleto','v'],['Cartão recusado','v']]},
 'Fornecedor':{p:'o',s:[['Assistência técnica','r'],['Garantia do fabricante','r'],['Contato do fabricante','v']]},
 'Fraude':{p:'o',s:[['Compra não reconhecida','r'],['Contestação de cartão','r']]},
 'Garantia Estendida':{p:'o',s:[['Acionar garantia','r'],['Cancelar garantia','r'],['Dúvida sobre a cobertura','v']]},
 'Internet':{p:'o',s:[['Pedido não aparece na conta','r'],['Problema no pagamento online','r']]},
 'Jurídico':{p:'o',s:[['Procon','r'],['Processo judicial','r'],['Notificação','r']]},
 'Liberar Pedido':{p:'x',s:[['CPF/CNPJ','r'],['Pagamento divergente','r'],['Pagamento em análise','r',1],['Bloqueio cadastral','r',1]]},
 'Ligação para Outros Departamentos':{p:'n',semOutro:1,s:[['Financeiro – Prevenção','v'],['Financeiro – Cadastro','v'],['Financeiro – Cobrança','v'],['Contas a receber','v'],['Fiscal','v'],['Compras','v'],['Televendas','v'],['Corporativo','v'],['Licitações','v'],['RH','v'],['Outro departamento','v'],['Financeiro','v',1]]},
 'Lojas':{p:'o',s:[['Falta de itens / Embalagem vazia','r'],['Achados e perdidos','r'],['Aquisição produto retirada posterior','r'],['Consulta de estoque – Compra','v'],['Consulta de estoque – Troca','v'],['Consulta de venda','r'],['Divergência físico x fiscal','r'],['Esquecimento de produto em loja','r'],['Troco divergente','r'],['Endereço','v'],['Estoque','v'],['Telefone / Horário da loja','v'],['Cadastro','v'],['Consulta de vendas','r',1],['Atendimento','r',1]]},
 'Outros':{p:'o',s:[]},
 'Produtos (Dúvidas)':{p:'o',s:[['Especificação','v'],['Disponibilidade','v'],['Compatibilidade','v']]},
 'Prorrogação boleto faturado':{p:'x',s:[['Prorrogar vencimento','r']]},
 'Reclamação':{p:'o',s:[['Fornecedor','r'],['Garantia estendida','r'],['Atendimento','r'],['Loja','r'],['Televendas','r'],['Internet','r'],['Corporativo','r'],['Licitações','r'],['Sack','r'],['Copy & Print','r'],['Spiral – Fabricação própria','r'],['Spiral – Importados','r'],['Procedimento','r'],['Outros departamentos','r'],['Uniforme PMSP','r'],['PickUp','r'],['Super Expressa','r'],['Produto','r']]},
 'Redes Sociais':{p:'o',s:[['Instagram','r'],['Facebook','r'],['Reclame Aqui','r'],['E-Bit','r'],['Jornais','r']]},
 'Retirada em loja':{p:'x',s:[['Pedido não estava pronto','r'],['Loja não encontrou o pedido','r'],['Prazo de retirada vencido','r'],['Outra pessoa vai retirar','v']]},
 'Retorno transportadora Kalunga':{p:'x',s:[['Retorno de acareação','r'],['Devolução ao CD','r']]},
 'Solicitações Diversas':{p:'o',s:[['Cópia de DANFE','v',1],['Declaração de compra','v'],['Carta de correção','r'],['Correção cadastral','r'],['Cobrança indevida','r'],['Comprovante de estorno','r']]},
 'Spiral':{p:'o',s:[['Fabricação própria','r'],['Importados','r'],['Dúvida','v',1],['Problema no serviço','r',1]]},
 'Sugestões':{p:'n',s:[['Site','v'],['Loja','v'],['Produto','v']]},
 'Televendas':{p:'o',s:[['Consulta de pedido','r'],['Devolução','r'],['Alteração de e-mail','r'],['Prorrogação','r'],['Cancelamento exceção','r'],['Avaria','r'],['Entrega Expressa','r'],['Lojas','r'],['Falta de produto na entrega','r'],['Liberar pedido','r'],['Estorno','r'],['Solicitações Diversas – Carta de correção','r'],['Solicitações Diversas – Cópia de DANFE','r'],['Solicitações Diversas – Declaração de compra','r'],['Solicitações Diversas – Cobrança indevida','r'],['Orçamento','r',1],['Pedido por telefone','r',1]]},
 'Transportadora':{p:'x',off:1,s:[['Atraso','r'],['Avaria no transporte','r'],['Extravio','r']]},
 'Troca Online (orientação)':{p:'o',s:[['Como trocar','v'],['Prazo de troca','v']]},
 'Uniforme PMSP':{p:'o',s:[['Dúvida sobre o programa','v'],['Entrega do uniforme','r'],['Troca de tamanho','r']]}
};
/* 3º item = 1: tópico desativado (some da escolha; protocolos antigos continuam). nosub: assunto sem sub-assunto. soTram: só entra em protocolo já aberto. */
Object.values(AS).forEach(a=>{if(!a.nosub&&!a.semOutro)a.s.push(['Outro','v']);a.s.forEach(x=>{if(x[2]===1){x.off=true;x.length=2}})});
const TOP3=['Consulta de Pedido','Devolução','Cancelamento (Exceção)'];
const ASLIST=Object.keys(AS).filter(a=>!TOP3.includes(a));
const CANAIS=['Telefone','WhatsApp','Chat do site','E-mail','Redes sociais','Reclame Aqui','Procon / consumidor.gov'];
const REMT={'Pedido em Atraso':'Acionar a transportadora pedindo prioridade na entrega.','Complemento de endereço':'Passar o complemento de endereço para a transportadora.','Barrar pedido':'Barrar o pedido na transportadora e devolver ao CD.','Não reconhece a entrega (ACAREAÇÃO)':'Abrir acareação da entrega com a transportadora.','Transportadora afirma que entregou':'Abrir acareação: pedir comprovante, foto e local da entrega.','Falta de volume':'Verificar com o CD e a transportadora o volume que faltou.','Troca de volume':'Verificar a troca de volume com o CD e a transportadora.','Transportadora assumiu perda':'Confirmar a perda e providenciar reenvio ou estorno.'};
/* campos extras que o SACK pede no registro de alguns assuntos (e-mail da Edilza, nov/2026).
   pre: vem preenchido com o dado do pedido ('nf') ou do cliente ('doc'). subs: só nesses tópicos. */
const CAMPOS={
 'Liberar Pedido':[{k:'mot',l:'Motivo da liberação do pedido',ta:1,ph:'Ex.: pagamento conferido com o cliente; boleto pago em duplicidade.'}],
 'Ligação para Outros Departamentos':[{k:'mot',l:'Motivo para falar com o departamento',ta:1,ph:'Ex.: cliente quer negociar o vencimento de um título.'}],
 'Prorrogação boleto faturado':[{k:'doc',l:'CNPJ do cliente',pre:'doc'},{k:'nf',l:'Nota fiscal',pre:'nf'},{k:'mot',l:'Motivo da prorrogação',ta:1,ph:'Ex.: cliente pediu mais 10 dias porque o pagamento é feito só no dia 20.'}]};
let N_SUBPRE='';
function suggestSub(as,ped){const r=_sg(as,ped);return r&&AS[as].s.some(x=>x[0]===r&&!x.off)?r:''}
function _sg(as,ped){if(N_SUBPRE&&AS[as].s.some(x=>x[0]===N_SUBPRE))return N_SUBPRE;if(as!=='Consulta de Pedido'||!ped)return '';const o=ORDERS[ped];return o.furo?'Furo de estoque':o.atraso?'Pedido em Atraso':o.state==='entregue'?'Não reconhece a entrega (ACAREAÇÃO)':''}
function respOf(p){const o=p.ped&&ORDERS[p.ped];if(!o)return 'Pós-Venda';return o.mod==='cd'?'Transportadora · '+o.carrier:'Loja '+o.loja}
