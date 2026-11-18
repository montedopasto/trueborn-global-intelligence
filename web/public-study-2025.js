export const trade = {
 PT:[[238821.72,24251700],[19360.58,2394810],[78500.25,11960600],22831200],
 ES:[[303456.46,40428900],[35935.77,5689500],[174924.70,null],33107200],
 FR:[[711918.84,84112700],[14466.33,1921840],[573946.84,88089100],null],
 NL:[[437505.16,50603400],[11303.73,1285740],[387274.00,71266200],40961000],
 DE:[[533275.53,62550400],[28892.36,4009000],[1097822.87,147731000],59371800],
 IT:[[475631.06,60870700],[22705.71,5152620],[113612.45,17015500],44531400],
 BE:[[132871.54,17617000],[7272.81,1292270],[379642.29,62529800],16511100],
 GB:[[694102.63,88619900],[6588.12,881779],[1034426.28,null],78073600],
 SA:[[544106.25,120022000],[159806.32,31661800],[38442.66,10107900],110131000],
 JP:[[1664350.81,321873000],[8424.07,797425],[141488.76,26727300],328579000]
};
export const tradeUrl=(hs,year=2025)=>'https://wits.worldbank.org/trade/comtrade/en/country/ALL/year/'+year+'/tradeflow/Imports/partner/WLD/product/'+hs;
const eu=['ES','FR','NL','DE','IT','BE'];
export const access = c=>eu.includes(c)?['Regime intra-UE para géneros de origem animal: confirmar estabelecimento, marcação e requisitos aplicáveis à categoria. A expedição de Portugal não prova origem nem aprovação da referência.','https://eur-lex.europa.eu/eli/reg/2004/853']:({
 PT:['Mercado doméstico: sem etapa de importação na distribuição nacional. Confirmar higiene, marcação e requisitos aplicáveis ao produto; não implica aprovação da referência.','https://eur-lex.europa.eu/eli/reg/2004/853'],
 GB:['Dados comerciais do Reino Unido; a orientação é para a Grã-Bretanha. Confirmar categoria de risco, certificado e pré-notificação aplicáveis antes de decidir.','https://www.gov.uk/guidance/import-or-move-food-and-drink-from-the-eu-and-northern-ireland-to-great-britain'],
 JP:['A lista HACCP do MHLW inclui Portugal para carne bovina e miudezas. É um requisito parcial: confirmar condições zoossanitárias e certificado com a DGAV, separadamente para preparados e produtos cárneos.','https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/yunyu_kanshi/index_00024.html'],
 SA:['A SFDA exige validação da elegibilidade do país e do estabelecimento e certificação Halal aplicável. Nenhuma autorização Trueborn foi confirmada.','https://sfda.gov.sa/en/list_countries']
})[c];
export const transport=c=>({
 PT:['A STEF documenta transporte nacional sob temperatura controlada. Confirmar zona, frequência e condições para a entrega dos congelados.','https://www.stef.com/portugal/nossas-solucoes/transporte-nacional-sob-temperatura-controlada'],
 ES:['A Soapa anuncia grupagem ibérica de congelados entre −18 e −20 °C. Confirmar recolha, destino e condições do lote.','https://www.logisticatransportesoapaeuropa.com/en/services'],
 FR:['A STEF anuncia rede sob temperatura controlada com saídas regulares de Portugal. Validar grupagem congelada até ao destino concreto.','https://www.stef.com/portugal/nossas-solucoes/transporte-internacional-sob-temperatura-controlada'],
 IT:['Portugal e Itália fazem parte da rede STEF. Confirmar itinerário e serviço para congelados, incluindo disponibilidade de grupagem.','https://www.stef.com/corporate/en/faq'],
 SA:['Rota marítima em reefer a estudar. Não foi confirmado serviço, trânsito ou custo desde o ponto de expedição.','https://www.maersk.com/tr-tr/logistics-explained/transportation-and-freight/2025/03/06/reefer-containers'],
 JP:['Rota marítima em reefer a estudar; confirmar porto, transbordos e monitorização antes de assumir viabilidade.','https://www.maersk.com/tr-tr/logistics-explained/transportation-and-freight/2025/03/06/reefer-containers']
})[c]??['A Transfrio anuncia congelados e grupagem com presença no Benelux, Alemanha e Reino Unido. Confirmar serviço para origem e destino concretos, prazos e custos.','https://www.transfrio.pt/en/go/services'];
export const formats={
 PT:['A Makro Portugal lista carne picada bovina Inalca congelada, 1 kg. É comparável de formato para carne picada; não valida as gramagens Trueborn.','https://produtos.makro.pt/shop/pv/BTY-X127245/0032/0021/CARNE-PICADA-BOVINO-CONGELADO-INALCA-1-KG'],
 ES:['Makro: hambúrguer Angus congelado, 6 × 200 g. Comparar porção, caixa e posicionamento com a gama Savoury.','https://tienda.makro.es/shop/pv/BTY-X112054/0032/0021/METRO-Premium-hamburguesa-de-vacuno-de-raza-Angus-congelada-bandeja-6-ud-x-200-g-%28total-1200-g%29'],
 FR:['METRO Chef apresenta 20 × 150 g num catálogo profissional de bovino picado; preço atrás de autenticação. Confirmar conservação da referência concreta antes de a usar como equivalente.','https://catalogue.metro.fr/restauration-rapide/product/61784244'],
 NL:['Sligro: hambúrguer Angus congelado de 150 g, 12 unidades. Serve de referência de formato; não demonstra procura pela Trueborn.','https://www.sligro.nl/p.147077.html/frozen-butcher-angus-runder-hamburger-12x150gr-vacuum-12-stuks-a-150gr.html'],
 IT:['METRO Itália: hambúrgueres bovinos congelados individualmente, 90–200 g. Comparar intervalos de peso e embalagem de serviço.','https://www.metro.it/punto-vendita/ingrosso/surgelati/carne-surgelata'],
 DE:['Egetürk anuncia sucuk bovino Halal. Valida concorrência bovina no segmento, sem comprovar venda em congelado.','https://www.egetuerk.de/egetuerk/sucuk/']
};
// Ordem editorial de investigação, nunca nota comercial.
export const priorities={
 chef:[['ES','Primeira vaga: cruzar cortes e formatos HoReCa com a oferta Makro e uma rota ibérica de grupagem.'],['FR','Primeira vaga: mercado de maior valor entre os seis destinos UE em 2025; investigar cortes congelados profissionais e recuperar a série de volume.'],['NL','Segunda vaga: separar consumo local e redistribuição antes de interpretar volume importado.']],
 savoury:[['ES','Primeira vaga: referência comercial de 200 g, oferta de congelado e serviço ibérico documentado.'],['IT','Primeira vaga: comparar porções de 90–200 g e embalagem de serviço.'],['NL','Primeira vaga: testar documentalmente a adequação ao formato de 150 g e caixas de 12.'],['FR','Segunda vaga: confirmar conservação, embalagem e acesso a preços de referência.']],
 charcuterie:[['DE','Exploração: concorrente bovino identificado; investigar equivalentes vendidos congelados.'],['NL','Exploração: procurar prova de oferta bovina congelada junto dos operadores de processados já identificados.'],['FR','Exploração: escala de categoria ampla, sem canal congelado bovino demonstrado.']]
};
