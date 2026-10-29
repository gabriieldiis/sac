# SAC Kalunga · protótipo

Protótipo navegável do novo SAC (atendimento, Pós-Venda, Assuntos e tópicos e Painel da diretoria). Abra o `index.html` direto no navegador. Não precisa de servidor nem de instalação.

Todos os dados são fictícios.

## Estrutura

```
index.html                  marcação do ERP (topo, menu, área #app) e a lista de CSS e JS
assets/
  img/                      logo do ERP
  fonts/                    Font Awesome 4.7
css/
  vendor/                   bibliotecas de terceiros (Font Awesome)
  erp.css                   réplica do layout do ERP: barra preta, menu lateral, conteúdo
  componentes.css           botões, campos, tabelas, selos, modais
  sac.css                   estilos das telas do SAC e dos layouts Dividido/Corrido
  tema-escuro.css           modo escuro GERADO (não editar à mão)
  tema-escuro-ajustes.css   ajustes finos do modo escuro feitos à mão
js/
  core/                     base (hoje, clientes, pedidos, utilitários), modo de visão, navegação
  dados/                    assuntos e casos de exemplo (protocolos e pedidos)
  componentes/              peças reaproveitadas: painel lateral, histórico, editor, combos, modais
  regras/                   regras de negócio: forma de entrega, assunto "Outros", tópico do trâmite
  layout/                   Dividido/Corrido, divisória, carregamento, menu do ERP, modo escuro
  telas/                    uma tela por arquivo: início, novo atendimento, protocolo, fila, painéis
  main.js                   desenha a primeira tela (sempre o último script)
ferramentas/
  gerar-tema-escuro.py      recria css/tema-escuro.css a partir de componentes.css e sac.css
```

## Regras para mexer

- **Ordem dos scripts.** Os arquivos JS são scripts comuns (sem módulos), por isso funcionam direto pelo `file://`. Cada arquivo usa funções e dados dos arquivos carregados antes dele. Ao criar um arquivo novo, coloque o `<script>` no `index.html` antes do `js/main.js`.
- **Depois de mudar cores em `componentes.css` ou `sac.css`**, rode `python ferramentas/gerar-tema-escuro.py` para atualizar o modo escuro. Ajustes pontuais do escuro vão em `tema-escuro-ajustes.css`.
- **Telas.** Cada tela tem uma função `render…` (por exemplo `renderProto` em `telas/protocolo.js`). A troca de tela é feita por `go('nome', {...})` em `core/navegacao.js`.
- **Dados de teste.** Os pedidos e protocolos de exemplo estão em `js/dados/`. No ERP de verdade, essas listas viram chamadas à API.
