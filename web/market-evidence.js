import {RESEARCH,growthPercentage} from './research.js';
import {PARTNERS} from './partners.js';
import {CRITERIA,LINES} from './model.js?v=0.7.0';
const pending={
 demand:'Confirmar a correspondência dos códigos pautais às referências desta gama e aprofundar procura específica.',
 channel:'Identificar canais que aceitem as apresentações desta gama em conservação congelada. Interesse comercial não confirmado.',
 access:'Verificar produto, origem, estabelecimento e requisitos do destino. Acesso Trueborn não aprovado nesta pesquisa.',
 economics:'Faltam custos de fornecimento e transporte, preço entregue e condições de compra documentados.',
 competition:'Faltam referências comparáveis, formatos, preços observados e diferenciação comprovada.',
 logistics:'Faltam rota desde o local de expedição, prazo, custo e condições documentadas de transporte congelado.'
};
function sourceFact(id,criterion,sourceId,value,unit,period,locator,limit){const s=RESEARCH.sources[sourceId];return {id,criterion,source:s.name,url:s.url,value,unit,period,locator,collectedAt:RESEARCH.researchedAt,level:'Contexto documental',limit,score:null,reviewStatus:'Por rever para avaliação'};}
export function marketEvidence(code,lineId){
 const m=RESEARCH.markets.find(m=>m.code===code);if(!m||!LINES.some(l=>l.id===lineId))return [];
 const facts=[];
 if(lineId==='charcuterie'){
  if(Number.isFinite(m.char2024))facts.push(sourceFact(`${code}-hs160100-2024`,'demand','char24',m.char2024,'1000 USD','2024',`${code}; Imports; World; HS 160100; Trade Value 1000USD`,'Categoria de enchidos com várias espécies e temperaturas. Não mede procura de charcutaria bovina congelada.'));
 }else{
  facts.push(sourceFact(`${code}-hs020230-2024`,'demand','beef24',m.beef2024,'1000 USD','2024',`${code}; Imports; World; HS 020230; Trade Value 1000USD`,'Bovino congelado sem osso: contexto da categoria, não procura específica desta gama. Preparados e produtos com osso podem exigir outro código.'));
  facts.push(sourceFact(`${code}-hs020230-2023`,'demand','beef23',m.beef2023,'1000 USD','2023',`${code}; Imports; World; HS 020230; Trade Value 1000USD`,'Base comparável para variação em valor; não representa crescimento de volume.'));
  if(Number.isFinite(m.bone2024))facts.push(sourceFact(`${code}-hs020220-2024`,'demand','bone24',m.bone2024,'1000 USD','2024',`${code}; Imports; World; HS 020220; Trade Value 1000USD`,'Bovino congelado com osso. Não atribuir o código a toda a gama.'));
  if(Number.isFinite(m.portugalBeef2024))facts.push(sourceFact(`${code}-pt020230-2024`,'demand','pt24',m.portugalBeef2024,'1000 USD','2024',`Portugal; Exports; partner ${code}; HS 020230; Trade Value 1000USD`,'Fluxo português da categoria, não vendas Trueborn nem prova de acesso atual do estabelecimento.'));
  for(const sourceId of m.channels.filter(id=>!['uk','sa','egeturk'].includes(id)))facts.push(sourceFact(`${code}-${sourceId}-channel`,'channel',sourceId,RESEARCH.sources[sourceId].name,'Oferta pública','Consulta 2026',RESEARCH.sources[sourceId].name,m.risk));
 }
 if(code==='DE'&&lineId==='charcuterie')facts.push(sourceFact('DE-egeturk-competition','competition','egeturk','Concorrente com salsichas de bovino apresentadas em lata','Oferta pública','Consulta 2026','Würstchen / beef sausages','Produto e conservação diferentes do congelado Trueborn. Não demonstra adequação do canal ou certificação Trueborn.'));
 for(const p of PARTNERS.companies.filter(p=>p.country===code&&p.fit[lineId]!=='no_evidence')){
  const s=p.sources.find(s=>lineId==='charcuterie'&&p.id==='ferwerda'?s.url.includes('processed-meat'):true)??p.sources[0];
  facts.push({id:`${code}-${p.id}-profile`,criterion:'channel',source:p.name,url:s.url,value:p.evidence,unit:'Atividade publicada',period:'Consulta 2026',locator:s.locator,collectedAt:PARTNERS.researchedAt,level:p.fit[lineId]==='exploratory'?'Hipótese exploratória':'Contexto documental',limit:p.reason[lineId]+' Interesse de compra não confirmado.',score:null,reviewStatus:'Por rever para avaliação'});
 }
 for(const sourceId of m.channels.filter(id=>['uk','sa'].includes(id)))facts.push(sourceFact(`${code}-${sourceId}-requirements`,'access',sourceId,sourceId==='sa'?'Requisito de certificação Halal publicado para carnes':'Orientação oficial de importação para Great Britain','Requisitos gerais','Consulta 2026',RESEARCH.sources[sourceId].name,m.risk+' Verificação específica de estabelecimento e produto pendente.'));
 return facts;
}
export function evidenceProgress(code,lineId){
 const ids=lineId==='global'?LINES.map(l=>l.id):[lineId];
 const facts=ids.flatMap(id=>marketEvidence(code,id));
 const total=CRITERIA.length*ids.length;
 const researched=ids.reduce((sum,id)=>sum+CRITERIA.filter(c=>marketEvidence(code,id).some(f=>f.criterion===c.id)).length,0);
 return {researched,total,uniqueFacts:new Map(facts.map(f=>[f.id,f])).size};
}
export function criterionResearch(code,lineId,criterion){const facts=marketEvidence(code,lineId).filter(f=>f.criterion===criterion);return {facts,status:facts.length?'Fontes recolhidas · validação pendente':'Por investigar',next:pending[criterion]};}
export function initialEvidenceExport(){return {version:1,type:'documentary-research',collectedAt:RESEARCH.researchedAt,reviewStatus:'Not approved for market scoring',markets:RESEARCH.markets.map(m=>({code:m.code,lines:Object.fromEntries(LINES.map(l=>[l.id,{access:'unknown',facts:marketEvidence(m.code,l.id)}]))}))};}
