export const RESEARCH = {
 version:1, researchedAt:'2026-10-14', referenceYear:2024,
 assumption:{state:'Congelado',source:'Indicação direta do utilizador em 14/10/2026',scope:['chef','savoury','charcuterie']},
 sources:{
  beef24:{name:'WITS / UN Comtrade · HS 020230 · 2024',url:'https://wits.worldbank.org/trade/comtrade/en/country/ALL/year/2024/tradeflow/Imports/partner/WLD/product/020230'},
  beef23:{name:'WITS / UN Comtrade · HS 020230 · 2023',url:'https://wits.worldbank.org/trade/comtrade/en/country/ALL/year/2023/tradeflow/Imports/partner/WLD/product/020230'},
  bone24:{name:'WITS / UN Comtrade · HS 020220 · 2024',url:'https://wits.worldbank.org/trade/comtrade/en/country/ALL/year/2024/tradeflow/Imports/partner/WLD/product/020220'},
  char24:{name:'WITS / UN Comtrade · HS 160100 · 2024',url:'https://wits.worldbank.org/trade/comtrade/en/country/ALL/year/2024/tradeflow/Imports/partner/WLD/product/160100'},
  pt24:{name:'WITS / UN Comtrade · Exportações de Portugal · HS 020230 · 2024',url:'https://wits.worldbank.org/trade/comtrade/en/country/PRT/year/2024/tradeflow/Exports/partner/ALL/product/020230'},
  makro:{name:'Makro Espanha · carne congelada para restauração',url:'https://www.makro.es/productos/congelados/carnes'},
  metroFR:{name:'METRO França · oferta de bovino para profissionais',url:'https://www.metro.fr/metro/univers-produits/boucherie/viande-boeuf'},
  sligro:{name:'Sligro Países Baixos · bovino, incluindo filtro congelados',url:'https://www.sligro.nl/c/002.html'},
  metroIT:{name:'METRO Itália · carne bovina congelada',url:'https://www.metro.it/ingrosso/surgelati/carne-surgelata'},
  metroDE:{name:'METRO Alemanha · bovino argentino e cortes para gastronomia',url:'https://www.metro.de/information-services/eigenmarken/metro-premium/argentinisches-rind'},
  egeturk:{name:'Egetürk Alemanha · salsichas de bovino',url:'https://www.egetuerk.de/egetuerk/wuerstchen/'},
  uk:{name:'GOV.UK · importação de produtos de origem animal',url:'https://www.gov.uk/guidance/import-or-move-food-and-drink-from-the-eu-and-northern-ireland-to-great-britain'},
  sa:{name:'SFDA · requisito de certificação Halal para carne',url:'https://sfda.gov.sa/en/faq/what-are-products-require-halal-certificate'}
 },
 // All values below retain the source unit: 1000 USD. These are category trade flows, not Trueborn sales.
 markets:[
  {code:'ES',beef2024:171314.32,beef2023:145454.17,bone2024:24358.84,char2024:135683.75,portugalBeef2024:6558.04,phase:'Primeira abordagem',channels:['makro'],finding:'Existe oferta pública de bovino congelado para HoReCa na Makro e um fluxo português documentado nesta categoria.',risk:'A presença de oferta concorrente não demonstra interesse em Trueborn. Para charcutaria congelada, confirmar um canal específico.',next:'Pesquisar distribuidores de congelados e operadores de restauração que trabalhem cortes e porções.'},
  {code:'FR',beef2024:453553.29,beef2023:475786.24,bone2024:12675.65,char2024:519863.48,portugalBeef2024:1572.86,phase:'Primeira abordagem',channels:['metroFR'],finding:'Mercado de importação relevante e oferta profissional de bovino na METRO. Portugal já exportava a categoria para França.',risk:'O canal consultado comprova oferta de bovino; não comprova todos os cortes congelados ou interesse de compra. A procura de charcutaria bovina congelada permanece por confirmar.',next:'Procurar grossistas de congelados e validar canais Food Service antes de considerar retalho.'},
  {code:'NL',beef2024:273041.93,beef2023:245336.85,bone2024:8235.34,char2024:360386.58,portugalBeef2024:1824.01,phase:'Primeira abordagem',channels:['sligro'],finding:'A Sligro apresenta categoria de bovino com filtro para congelados. Há fluxo português documentado.',risk:'Importações podem servir consumo interno ou redistribuição. O total não identifica margem, canal final ou oportunidade Trueborn.',next:'Mapear grossistas e separar compradores para consumo local de operadores de redistribuição.'},
  {code:'DE',beef2024:367098.25,beef2023:333472.78,bone2024:34203.04,char2024:915434.71,portugalBeef2024:316.72,phase:'Primeira abordagem',channels:['metroDE','egeturk'],finding:'Oferta profissional de cortes bovinos e concorrente alemão de salsichas de bovino identificados.',risk:'A concorrência existe. As salsichas Egetürk consultadas são apresentadas em lata e como Halal: não equivalem ao congelado Trueborn nem certificam a marca.',next:'Distinguir canais gastronómicos, grossistas de congelados e nichos de charcutaria bovina.'},
  {code:'IT',beef2024:307209.78,beef2023:288604.41,bone2024:22907.07,char2024:100298.13,portugalBeef2024:695.42,phase:'Primeira abordagem',channels:['metroIT'],finding:'A METRO Itália apresenta cortes bovinos congelados. Portugal já exportava a categoria para Itália.',risk:'Oferta de cortes não comprova procura da marca nem adequação de todas as apresentações Savoury.',next:'Priorizar distribuidores Food Service de cortes congelados e testar a adequação das porções.'},
  {code:'BE',beef2024:88086.11,beef2023:81343.21,bone2024:6188.34,char2024:358070.30,portugalBeef2024:129.98,phase:'Exploração de charcutaria',channels:[],finding:'O valor importado da categoria ampla de enchidos justifica aprofundar a pesquisa de charcutaria.',risk:'Não foi identificado nesta ronda um comprador de charcutaria bovina congelada. A categoria estatística agrega espécies e regimes de conservação.',next:'Encontrar distribuidores especializados e confirmar aceitação de apresentação congelada.'},
  {code:'GB',beef2024:442383.89,beef2023:355207.97,bone2024:6619.82,char2024:996544.89,portugalBeef2024:285.82,phase:'Exploração condicionada',channels:['uk'],finding:'Importações elevadas nas categorias consultadas. A orientação oficial de Great Britain exige verificar condições e documentação por produto.',risk:'Dados estatísticos são do Reino Unido; a orientação citada aplica-se a Great Britain. Não foi confirmada elegibilidade de estabelecimento/produto Trueborn.',next:'Pesquisar importadores de congelados e verificar condições oficiais antes de uma abordagem comercial.'},
  {code:'SA',beef2024:488179.20,beef2023:339148.71,bone2024:131707.34,char2024:83841.98,portugalBeef2024:null,phase:'Segunda fase',channels:['sa'],finding:'Escala relevante de importação de bovino congelado. A SFDA identifica certificação Halal como requisito para carne e produtos.',risk:'Não foi comprovada certificação Trueborn nem elegibilidade para este destino. O valor português não foi recolhido, não é zero.',next:'Verificar viabilidade de acesso e certificação antes de investir em prospeção de compradores.'},
  {code:'JP',beef2024:1536464.32,beef2023:1354745.39,bone2024:null,char2024:131593.00,portugalBeef2024:null,phase:'Segunda fase',channels:[],finding:'Mercado de maior escala para bovino congelado sem osso entre os nove países desta pesquisa.',risk:'Dimensão não demonstra acesso viável para Trueborn, capacidade logística ou competitividade. Canais e condições específicas ainda não investigados.',next:'Aprofundar elegibilidade, importadores e logística antes de priorizar investimento comercial.'}
 ],
 shortlists:{
  chef:[
   {code:'ES',reason:'Começar pelo fluxo português mais elevado entre os países analisados e pela oferta pública de bovino congelado para HoReCa.'},
   {code:'NL',reason:'Investigar grossistas de congelados, com categoria de bovino identificada e fluxo português existente.'},
   {code:'FR',reason:'Aprofundar distribuição profissional num mercado com importações relevantes e fluxo português.'},
   {code:'IT',reason:'Testar cortes para cozinhas profissionais num canal que apresenta bovino congelado.'},
   {code:'DE',reason:'Investigar distribuidores de cortes bovinos, comparando com a oferta argentina já apresentada no canal profissional.'}
  ],
  savoury:[
   {code:'ES',reason:'Explorar porções e hambúrgueres congelados nos canais profissionais; não assumir acesso ao retalho.'},
   {code:'DE',reason:'Comparar cortes e apresentações com a oferta premium profissional identificada.'},
   {code:'FR',reason:'Investigar compradores de cortes e porções, distinguindo a procura agregada de uma oportunidade concreta.'},
   {code:'IT',reason:'Validar a adequação dos cortes Savoury ao canal profissional de congelados identificado.'},
   {code:'NL',reason:'Pesquisar grossistas que ofereçam bovino congelado e porções; confirmar formatos aceites.'}
  ],
  charcuterie:[
   {code:'DE',reason:'Começar onde foi identificado um concorrente de charcutaria bovina; comprovar separadamente procura de produto congelado.'},
   {code:'FR',reason:'Investigar Food Service especializado, usando o total de enchidos apenas como sinal de contexto.'},
   {code:'NL',reason:'Pesquisar distribuidores especializados; validar cadeia de frio e aceitação da charcutaria congelada.'},
   {code:'BE',reason:'Aprofundar um mercado relevante da categoria ampla; ainda sem canal específico confirmado.'},
   {code:'GB',reason:'Pesquisar a categoria de maior valor entre os países analisados, condicionando a abordagem à verificação de acesso.'}
  ]
 }
};
export function usdMillions(thousandUsd){return Number.isFinite(thousandUsd)?thousandUsd/1000:null;}
export function growthPercentage(current,previous){return Number.isFinite(current)&&Number.isFinite(previous)&&previous>0?(current/previous-1)*100:null;}
