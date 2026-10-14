# Contrato de dados · proposed-v1

O botão “Descarregar modelo JSON” cria um ficheiro vazio com Espanha como exemplo de país selecionado, sem valores comerciais. Acrescentar países é escolha do utilizador, não recomendação.

Raiz: `version: 1`, `methodology: "proposed-v1"`, `markets: []`.

Cada mercado tem `code` (ISO de dois caracteres presente no universo configurado) e `lines` com as chaves `chef`, `savoury`, `charcuterie`. Uma gama contém `access: "unknown" | "approved" | "blocked"`, `observations: []` e, se aprovada/bloqueada, `accessEvidence`.

Uma observação requer:

| Campo | Conteúdo |
|---|---|
| criterion | demand, channel, access, economics, competition ou logistics |
| score | Avaliação humana 0–100, finita |
| value | Valor original como texto, sem conversão silenciosa |
| unit | Unidade e moeda, se aplicável |
| period | Ano ou período a que os dados dizem respeito |
| rationale | Justificação da transformação do indicador em nota |
| source | Entidade ou documento |
| url | HTTPS, sem credenciais embutidas |
| locator | Página, tabela, filtro, consulta e código pautal, conforme aplicável |
| retrievedAt | Data de recolha YYYY-MM-DD |
| reviewedAt | Data da revisão YYYY-MM-DD |
| reviewer | Identificação do responsável pela revisão |
| verified | true: declaração de revisão externa, não garantia automática |

`accessEvidence` requer source, url, locator, retrievedAt, reviewedAt, reviewer e verified. Documentar origem, país, gama e condições sanitárias no locator e, facultativamente, rationale. Aprovar o acesso exige confirmação competente, não uma resposta de IA.

A importação é atómica: se houver um erro, preserva a análise anterior. Limite 2 MB, 100 mercados, seis observações por gama, sem países ou critérios duplicados. Não aceita gamas fora do âmbito, links HTTP ou executáveis, datas inexistentes e notas fora da escala. O conteúdo é escapado antes de ser mostrado. Ficheiros não são enviados ao servidor nesta versão.

## Regras de avaliação

Pesos propostos: procura 25%, canais 20%, acesso 20%, economia 15%, concorrência 10%, logística 10%. Soma 100%. A cobertura soma os pesos de observações com fonte e revisão válidas e datas nos últimos 365 dias. Datas futuras não contam. O período estatístico é separado da recolha e deve ser comparável entre países.

A nota só existe com cobertura de 100% e acesso aprovado com evidência atual. Um mercado com acesso bloqueado nunca entra no ranking. A visão global requer as três notas e usa a média aritmética arredondada; nenhuma gama compensa uma gama sem dados. Empates são apresentados por código do país, sem desempate comercial implícito.

Antes de uma primeira decisão: acordar âncoras de 0/50/100 para cada critério e gama, confirmar países de exportação/origem, composição dos códigos pautais, preços entregues e datas comparáveis. A nota não é uma medida objetiva universal e não expressa probabilidade de sucesso.

## Fontes

- [UN Comtrade](https://comtradeplus.un.org/): portal identificado, sem extração de indicadores.
- [Banco Mundial — PIB per capita](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD): página consultada, sem valores importados; contexto macroeconómico.
- [FAOSTAT](https://www.fao.org/faostat/en/#data): portal identificado, sem extração.
- [Access2Markets](https://trade.ec.europa.eu/access-to-markets/en/home): ligação de partida; acesso específico por produto/origem/destino pendente.

Categorias agregadas de preparados de carne podem conter várias espécies: não equivalem automaticamente a charcutaria de bovino. A identificação dos produtos foi referenciada nos dois catálogos (ver catalogue-review.md). Conservação, ingredientes completos e certificações exigem documentação técnica adicional; os selos promocionais não a substituem. Não preencher com informações da resposta anterior de ChatGPT.
