// Public B2B references. No company has been contacted; commercial interest is unknown.
export const PARTNERS = {
 version:1,researchedAt:'2026-10-14',countries:['ES','NL','DE'],
 companies:[
  {id:'sucarn',name:'Sucarn',country:'ES',city:'Barcelona',role:'Grossista de carnes para restauração e distribuição',email:'sucarn@sucarn.com',phone:'+34 93 335 01 30',contactUrl:'https://www.sucarn.es/',status:'Identificado · não contactado',
   sources:[{url:'https://www.sucarn.es/',locator:'Empresa, Logística e Detalles de contacto',read:'Página consultada'}],
   evidence:'Apresenta carnes nacionais e importadas, em fresco, congelado e precocinado, para restauração, coletividades e distribuição. Declara adaptar cortes e apresentações.',
   fit:{chef:'initial',savoury:'initial',charcuterie:'no_evidence'},
   reason:{chef:'Investigar distribuição de cortes congelados para restauração.',savoury:'Investigar aceitação de porções e apresentações da gama.',charcuterie:'Sem oferta específica de charcutaria bovina congelada confirmada.'},
   check:'Confirmar interesse como distribuidor, produtos bovinos congelados aceites e condições de entrada de um novo fornecedor.'},
  {id:'mj',name:'MJ MEAT-CARN',country:'ES',city:'Llinars del Vallès, Barcelona',role:'Distribuidor e importador/exportador de carne congelada',email:'contact@mjmeat-carn.com',phone:'+34 938 45 33 90',contactUrl:'https://mjmeat-carn.com/',status:'Identificado · não contactado',
   sources:[{url:'https://mjmeat-carn.com/',locator:'Company, Our products: Beef e rodapé de contactos',read:'Página consultada'}],
   evidence:'Declara distribuição, importação e exportação de carne congelada e miudezas. Identifica bovino no portefólio e relações com produtores europeus.',
   fit:{chef:'initial',savoury:'exploratory',charcuterie:'no_evidence'},
   reason:{chef:'Investigar compra e distribuição de cortes bovinos congelados.',savoury:'O bovino congelado é relevante; distribuição de porções e produto com marca permanece por confirmar.',charcuterie:'Sem evidência específica de charcutaria bovina congelada.'},
   check:'Distinguir interesse em matéria-prima a granel de interesse nas apresentações comerciais Trueborn.'},
  {id:'ambar',name:'Ambar Foods',country:'ES',city:'Murcia',role:'Trader de carnes congeladas',email:'andreybarquero@ambarfoods.es',phone:'+34 868 078 638',contactUrl:'https://ambarfoods.es/en/',status:'Identificado · não contactado',
   sources:[{url:'https://ambarfoods.es/en/',locator:'Products: Beef, International Logistics e Contact us',read:'Página consultada'}],
   evidence:'Apresenta bovino congelado para comércio internacional e coordenação logística de cadeia de frio.',
   fit:{chef:'initial',savoury:'exploratory',charcuterie:'no_evidence'},
   reason:{chef:'Investigar intermediação e distribuição de cortes congelados.',savoury:'Não foi demonstrada distribuição de porções ou apresentações de retalho.',charcuterie:'Sem oferta específica de charcutaria bovina congelada confirmada.'},
   check:'Confirmar se compra por conta própria ou atua como intermediário, e os canais servidos.'},
  {id:'fn',name:'FN Global Meat',country:'NL',city:'Dordrecht',role:'Importador e grossista internacional de carne',email:'sales@fnglobalmeat.com',phone:'+31 78 6531 840',contactUrl:'https://www.fnglobalmeat.com/en/contact/',status:'Identificado · não contactado',
   sources:[{url:'https://www.fnglobalmeat.com/en/about-us/',locator:'Welcome, Specialist, Warehousing & distribution',read:'Página consultada'},{url:'https://www.fnglobalmeat.com/en/contact/',locator:'Sales Department',read:'Página consultada'}],
   evidence:'Declara importação de bovino refrigerado e congelado, fornecimento a catering, grossistas e retalho, armazenamento congelado e serviços de etiquetagem.',
   fit:{chef:'initial',savoury:'initial',charcuterie:'no_evidence'},
   reason:{chef:'Investigar os canais Food Service e de grossistas para cortes.',savoury:'O retalho e a etiquetagem são sinais de canal relevante; confirmar interesse em marca Trueborn.',charcuterie:'Fornecimento de carne à indústria não comprova compra de charcutaria acabada.'},
   check:'Confirmar interesse em origem portuguesa, aceitação da marca e formatos de fornecimento.'},
  {id:'knh',name:'Kühne + Heitz',country:'NL',city:'Dordrecht',role:'Importador/exportador e distribuidor de congelados',email:'sales@knh.nl',phone:'+31 78 632 1222',contactUrl:'https://www.knh.nl/',status:'Identificado · não contactado',
   sources:[{url:'https://www.knh.nl/',locator:'Who We Are, Distribution Regions e Contact Us',read:'Página consultada'},{url:'https://www.knh.nl/meat/',locator:'Frozen Beef: cuts, steaks e boneless cubes',read:'Conteúdo indexado consultado; abertura da página limitada'}],
   evidence:'A página principal declara comércio e distribuição de congelados. A página de carne indexada identifica cortes, steaks e cubos bovinos congelados.',
   fit:{chef:'initial',savoury:'initial',charcuterie:'no_evidence'},
   reason:{chef:'Investigar fornecimento de cortes e cubos congelados.',savoury:'Steaks são um sinal de adequação; as apresentações Trueborn e a marca precisam de validação.',charcuterie:'Não transferir a oferta de enchidos de outra espécie para charcutaria bovina.'},
   check:'Reconfirmar o catálogo bovino atual, mercado de destino e preferência por marca do fornecedor ou marca própria.'},
  {id:'ferwerda',name:'Ferwerda Worldwide Meat Suppliers',country:'NL',city:'Rotterdam',role:'Importador/exportador de carnes e congelados',email:'info@ferwerda.nl',phone:'+31 10 298 22 22',contactUrl:'https://www.ferwerda.nl/en/',status:'Identificado · não contactado',
   sources:[{url:'https://www.ferwerda.nl/en/',locator:'Get to know us, Import & Export e Contact',read:'Página consultada'},{url:'https://www.ferwerda.nl/en/products/processed-meat/',locator:'All Processed meat products',read:'Página consultada'}],
   evidence:'Declara compra de bovino e importação de carnes da Europa e de outras origens, com armazém de frio em Rotterdam. O portefólio de processados inclui enchidos e produtos fumados.',
   fit:{chef:'initial',savoury:'exploratory',charcuterie:'exploratory'},
   reason:{chef:'Investigar compra e distribuição de cortes congelados.',savoury:'Confirmar se trabalha as apresentações acabadas e com marca.',charcuterie:'A oferta de enchidos justifica exploração, mas não comprova espécie bovina nem conservação congelada.'},
   check:'Para charcutaria, confirmar primeiro aceitação de bovino congelado e canais; não assumir equivalência aos processados apresentados.'},
  {id:'eurobeef',name:'Euro-Beef Fleischhandels',country:'DE',city:'Kerpen',role:'Comerciante de especialidades de carne',email:null,phone:'+49 2237 9281 0',contactUrl:'https://euro-beef.de/',status:'Identificado · não contactado',
   sources:[{url:'https://euro-beef.de/',locator:'Startseite, Telefon e Adresse',read:'Página consultada'},{url:'https://euro-beef.de/produkte/',locator:'Produkte: Rind',read:'Página consultada'}],
   evidence:'Declara comércio de especialidades refrigeradas e ultracongeladas. Identifica roastbeef, filete, entrecôte e outros cortes bovinos.',
   fit:{chef:'initial',savoury:'initial',charcuterie:'no_evidence'},
   reason:{chef:'Investigar os cortes bovinos comercializados em regime congelado.',savoury:'Os cortes apresentados são relevantes; confirmar aceitação das porções e marca.',charcuterie:'Sem oferta de charcutaria bovina congelada identificada.'},
   check:'Confirmar quais cortes são congelados, canais servidos e abertura a novos fornecedores. Email não recolhido; telefone publicado disponível.'},
  {id:'andupez',name:'Andupez',country:'DE',city:'Berlim',role:'Importador e grossista de especialidades mediterrânicas',email:'verkauf@andupez.de',phone:'+49 30 398982 0',contactUrl:'https://www.andupez.de/kunde-werden',status:'Identificado · não contactado',
   sources:[{url:'https://www.andupez.de/kunde-werden',locator:'Sortimento, origem dos produtos, serviço gastronómico e Kontakt',read:'Página consultada'}],
   evidence:'Declara importação direta, incluindo Portugal, oferta de bovino e produtos de charcutaria, e distribuição B2B na Alemanha.',
   fit:{chef:'exploratory',savoury:'exploratory',charcuterie:'exploratory'},
   reason:{chef:'A oferta bovina justifica uma consulta; conservação congelada desses cortes não confirmada.',savoury:'Investigar apresentações e canais gastronómicos; não há adequação específica comprovada.',charcuterie:'O canal mediterrânico é uma hipótese; oferta de charcutaria bovina congelada não confirmada.'},
   check:'Confirmar primeiro interesse em bovino e charcutaria congelados de origem portuguesa, sem assumir que a atual charcutaria tem a mesma espécie.'}
 ]
};
export const FIT_LABELS={initial:'Candidato inicial',exploratory:'Exploratório',no_evidence:'Sem evidência específica'};
export function filterPartners(line,country='ALL',query=''){
 const term=query.toLocaleLowerCase('pt-PT');
 return PARTNERS.companies.filter(c=>(line==='global'||c.fit[line]!=='no_evidence')&&(country==='ALL'||c.country===country)&&(`${c.name} ${c.city} ${c.role}`.toLocaleLowerCase('pt-PT').includes(term)));
}
