# TRUEBORN GLOBAL INTELLIGENCE

Market Explorer MVP · interface portuguesa, estática e adaptável a telemóvel, preparada para GitHub Pages.

## Âmbito

Três análises independentes: **Beef Chef Solutions**, **Beef Savoury Cuts** e **Charcuterie bovina**. Lamb, Pork, Sea e Snacks não integram o modelo. As gamas provêm do pedido do utilizador. Os nomes dos produtos estão referenciados nos dois catálogos fornecidos, com as páginas de origem e as limitações documentais.

Os dois catálogos foram consultados em 14/10/2026: Chef Solutions (página 1) e Savoury Cuts (páginas 1 e 2, incluindo charcutaria bovina). Consultar a [revisão documental](docs/catalogue-review.md). O MVP continua sem indicadores comerciais e sem mercados recomendados. Não foram inventados preços, procura, margens, volumes ou certificações.

## Disponível

- Gamas e produtos dos catálogos, com referências de origem e lacunas técnicas.
- Seleção de países para investigação, pesquisa e comparação.
- Ficha de evidência por país, gama e critério.
- Importação e exportação JSON com validação de esquema e proveniência declarada.
- Pontuação ponderada, cobertura, bloqueio por acesso desconhecido/impedido e por evidência desatualizada.
- Top 5 por gama e visão global, apenas quando existem avaliações completas.
- Fontes de partida, metodologia proposta e estado real das integrações.

A análise está em memória: exportar antes de recarregar. A importação **substitui** a análise atual. Um ficheiro JSON pode declarar revisão mas isso não prova a veracidade dos dados. A equipa precisa de confirmar a evidência antes de tomar decisões.

## Executar

Node 22 ou superior. Sem dependências do frontend.

```sh
npm test
npm run build
npm start
```

Abrir `http://localhost:4173`. Para publicar, em Settings → Pages selecionar **GitHub Actions**. O workflow verifica e publica apenas `dist/` depois de um push para `main`. Os pedidos de alteração executam as verificações sem publicar.

## Dados e pontuação

Consultar [contrato de dados](docs/data-contract.md) e [arquitetura](docs/architecture.md). A metodologia `proposed-v1` é uma proposta inicial, não uma validação da direção comercial. Sem evidência completa, o resultado é `null`, nunca zero presumido. As notas são avaliações humanas documentadas; não são previsões de vendas.

## Supabase e OpenAI

O esquema SQL e a função `market-brief` são preparação de integração, **não instalados ou ligados ao frontend**. A interface estática não recolhe chaves nem contém chamadas à OpenAI. A função usa autenticação, acesso por organização, quota atómica e segredo no servidor. A IA produz um rascunho sujeito a revisão; não altera observações ou pontuações.

Para ativar é necessário um projeto Supabase escolhido pela equipa, aplicar a migração, criar organização e membros autorizados, configurar os segredos e realizar testes de acesso com dois utilizadores. Não enviar chaves no chat. A base de catálogos fica privada; ficheiros e dados confidenciais não pertencem ao repositório público.

## Estado em 14/10/2026

Interface publicada, nomes dos produtos conferidos nos catálogos e testes do motor concluídos. Fichas técnicas, recolha de indicadores, integração real e automações pendentes. Não existe agendamento nem contacto comercial automático.
