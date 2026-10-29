/* Lista de assuntos, tópicos (sub-assuntos), ícones e cores. */
/* ================= assuntos e sub-assuntos ================= */
/* p: pedido  x = obrigatório · o = opcional · n = não pede pedido
   s: sub-assuntos [nome, r = remete ao Pós-Venda por padrão | v = resolve no atendimento] */
const AS={
 'Consulta de Pedido':{p:'x',s:[['Pedido no Prazo','v'],['Troca de volume','r'],['Falta de volume','r'],['Transportadora assumiu perda','r'],['Pedido em Atraso','r'],['Complemento de endereço','r'],['Transportadora afirma que entregou','r'],['Barrar pedido','r'],['Não reconhece a entrega','r'],['Devolução','r'],['Transportadora','r'],['Furo de estoque','r']]},
 'Devolução':{p:'x',s:[['Devolução','r'],['Autorização de postagem','r'],['Coleta via transportadora','r']]},
 'Cancelamento (Exceção)':{p:'x',s:[['Pedido já faturado','r'],['Pedido em transporte','r'],['Retirada não realizada','r'],['Compra com cadastro errado (CPF/CNPJ)','r']]},
 '2a. via Fatura/Boleto/Arquivo XML':{p:'o',s:[['2ª via de boleto','v'],['2ª via de nota fiscal','v'],['Arquivo XML','v'],['Fatura','v']]},
 'Abatimento':{p:'x',s:[['Diferença de preço','r'],['Avaria leve no produto','r'],['Atraso na entrega','r']]},
 'Alterações Site':{p:'n',s:[['Alterar dados cadastrais','v'],['Alterar e-mail ou senha','v'],['Excluir cadastro (LGPD)','r']]},
 'Avaria':{p:'x',s:[['Transportadora','r'],['CD','r']]},
 'Cadastro de Logradouro':{p:'n',s:[['CEP não encontrado','r'],['Endereço incorreto no CEP','r']]},
 'Cancelamento (orientação)':{p:'o',s:[['Como cancelar','v'],['Prazo do estorno','v']]},
 'Cancelamento Site':{p:'x',s:[['Antes do faturamento','r'],['Depois do faturamento','r']]},
 'Copy & Print':{p:'o',s:[['Prazo de produção','v'],['Arquivo com problema','r'],['Qualidade da impressão','r'],['Retirada do pedido','v']]},
 'Devolução Site':{p:'x',s:[['Devolução Site','r']]},
 'Dúvidas (Preço|Promoção|Desconto)':{p:'n',s:[['Preço diferente loja x site','v'],['Cupom não aplicado','v'],['Regras da promoção','v']]},
 'Dúvidas sobre o site':{p:'n',s:[['Como comprar','v'],['Erro no site','r'],['Acesso à conta','v']]},
 'Elogios':{p:'o',s:[['Atendimento','v'],['Entrega','v'],['Loja','v'],['Produto','v']]},
 'Entrega da Loja':{p:'x',s:[['Pedido Fora do Prazo','r'],['Falta de Produtos','r'],['Cancelamento','r'],['Coleta','r']]},
 'Estornos Diversos':{p:'o',s:[['Prazo do estorno','v'],['Comprovante de estorno','r'],['Estorno não recebido','r']]},
 'Falta de produto na entrega':{p:'x',s:[['Item faltando','r'],['Volume faltando','r']]},
 'Formas de Pagamento':{p:'n',s:[['Parcelamento','v'],['Pix','v'],['Boleto','v'],['Cartão recusado','v']]},
 'Fornecedor':{p:'o',s:[['Assistência técnica','r'],['Garantia do fabricante','r'],['Contato do fabricante','v']]},
 'Fraude':{p:'o',s:[['Compra não reconhecida','r'],['Contestação de cartão','r']]},
 'Garantia Estendida':{p:'o',s:[['Acionar garantia','r'],['Cancelar garantia','r'],['Dúvida sobre a cobertura','v']]},
 'Internet':{p:'o',s:[['Pedido não aparece na conta','r'],['Problema no pagamento online','r']]},
 'Jurídico':{p:'o',s:[['Procon','r'],['Processo judicial','r'],['Notificação','r']]},
 'Liberar Pedido':{p:'x',s:[['Pagamento em análise','r'],['Bloqueio cadastral','r']]},
 'Ligação para Outros Departamentos':{p:'n',s:[['Financeiro','v'],['Compras','v'],['RH','v'],['Outro departamento','v']]},
 'Lojas':{p:'o',s:[['Aquisição retirada posterior','r'],['Consulta de vendas','r'],['Atendimento','r']]},
 'Outros':{p:'o',s:[]},
 'Produtos (Dúvidas)':{p:'n',s:[['Especificação','v'],['Disponibilidade','v'],['Compatibilidade','v']]},
 'Prorrogação boleto faturado':{p:'x',s:[['Prorrogar vencimento','r']]},
 'Reclamação':{p:'o',s:[['Fornecedor','r'],['Garantia estendida','r'],['Atendimento','r'],['Loja','r']]},
 'Redes Sociais':{p:'o',s:[['Instagram','r'],['Facebook','r'],['Reclame Aqui','r']]},
 'Retirada em loja':{p:'x',s:[['Pedido não estava pronto','r'],['Loja não encontrou o pedido','r'],['Prazo de retirada vencido','r'],['Outra pessoa vai retirar','v']]},
 'Retorno transportadora Kalunga':{p:'x',s:[['Retorno de acareação','r'],['Devolução ao CD','r']]},
 'Solicitações Diversas':{p:'o',s:[['Cópia de DANFE','v'],['Declaração de compra','v'],['Carta de correção','r']]},
 'Spiral':{p:'o',s:[['Dúvida','v'],['Problema no serviço','r']]},
 'Sugestões':{p:'n',s:[['Site','v'],['Loja','v'],['Produto','v']]},
 'Televendas':{p:'o',s:[['Orçamento','r'],['Pedido por telefone','r']]},
 'Transportadora':{p:'x',s:[['Atraso','r'],['Avaria no transporte','r'],['Extravio','r']]},
 'Troca Online (orientação)':{p:'o',s:[['Como trocar','v'],['Prazo de troca','v']]},
 'Uniforme PMSP':{p:'o',s:[['Dúvida sobre o programa','v'],['Entrega do uniforme','r'],['Troca de tamanho','r']]}
};
Object.values(AS).forEach(a=>a.s.push(['Outro','v']));
const TOP3=['Consulta de Pedido','Devolução','Cancelamento (Exceção)'];
const ASLIST=Object.keys(AS).filter(a=>!TOP3.includes(a));
const CANAIS=['Telefone','WhatsApp','Chat do site','E-mail','Redes sociais','Reclame Aqui','Procon / consumidor.gov'];
const REMT={'Pedido em Atraso':'Acionar a transportadora pedindo prioridade na entrega.','Complemento de endereço':'Passar o complemento de endereço para a transportadora.','Barrar pedido':'Barrar o pedido na transportadora e devolver ao CD.','Não reconhece a entrega':'Abrir acareação da entrega com a transportadora.','Transportadora afirma que entregou':'Abrir acareação: pedir comprovante, foto e local da entrega.','Falta de volume':'Verificar com o CD e a transportadora o volume que faltou.','Troca de volume':'Verificar a troca de volume com o CD e a transportadora.','Transportadora assumiu perda':'Confirmar a perda e providenciar reenvio ou estorno.'};
let N_SUBPRE='';
function suggestSub(as,ped){const r=_sg(as,ped);return r&&AS[as].s.some(x=>x[0]===r&&!x.off)?r:''}
function _sg(as,ped){if(N_SUBPRE&&AS[as].s.some(x=>x[0]===N_SUBPRE))return N_SUBPRE;if(as!=='Consulta de Pedido'||!ped)return '';const o=ORDERS[ped];return o.furo?'Furo de estoque':o.atraso?'Pedido em Atraso':o.state==='entregue'?'Não reconhece a entrega':''}
function respOf(p){const o=p.ped&&ORDERS[p.ped];if(!o)return 'Pós-Venda';return o.mod==='cd'?'Transportadora · '+o.carrier:'Loja '+o.loja}
