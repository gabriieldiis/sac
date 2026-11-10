/* Sugestões do SACK que ainda dependem de aprovação do Felipe: anexos, quem separou e conferiu (Kager) e prazo do Pós-Venda.
   Ficam desligadas. Para mostrar ao Felipe, abra o protótipo com ?sugestoes=1 no fim do endereço
   (ex.: index.html?sugestoes=1). Quando aprovar, troque o valor abaixo para true. */
const SUG=window.SAC_SUG===1||/[?&]sugestoes=1\b/.test(location.search);
const sugTag=()=>SUG?'<span class="pill amber sugtag" title="Sugestão do SACK aguardando aprovação">em aprovação</span>':'';
