export const LINES = [
 {id:'chef',name:'Beef Chef Solutions',short:'Chef Solutions',description:'Análise independente da gama Beef Chef Solutions.'},
 {id:'savoury',name:'Beef Savoury Cuts',short:'Savoury Cuts',description:'Análise independente da gama Beef Savoury Cuts.'},
 {id:'charcuterie',name:'Charcuterie bovina',short:'Charcuterie bovina',description:'Análise independente da charcutaria de bovino.'}
];
export const CRITERIA = [
 {id:'demand',name:'Procura da categoria',weight:25,explanation:'Dimensão e evolução das importações relevantes. Confirmar códigos pautais e distinguir bovino de categorias mistas.'},
 {id:'channel',name:'Adequação dos canais',weight:20,explanation:'Evidência de canais e distribuidores adequados à gama. Confirmar o posicionamento no catálogo.'},
 {id:'access',name:'Acesso ao mercado',weight:20,explanation:'Requisitos sanitários, estabelecimento elegível, rotulagem e tarifas para produto, origem e destino concretos.'},
 {id:'economics',name:'Viabilidade económica',weight:15,explanation:'Custos, preço entregue e margem com propostas documentadas. PIB per capita é contexto, não uma margem ou previsão de vendas.'},
 {id:'competition',name:'Espaço competitivo',weight:10,explanation:'Concorrentes, preços observados e diferenciação comprovada. Não inferir ausência de concorrência por falta de dados.'},
 {id:'logistics',name:'Logística e conservação',weight:10,explanation:'Tempo, transporte congelado e custos de rota documentados. Não inferir viabilidade logística apenas pela distância entre países.'}
];
export const COUNTRIES = [ ['DE','Alemanha'],['SA','Arábia Saudita'],['BE','Bélgica'],['CA','Canadá'],['ES','Espanha'],['US','Estados Unidos'],['AE','Emirados Árabes Unidos'],['FR','França'],['IT','Itália'],['JP','Japão'],['NL','Países Baixos'],['PL','Polónia'],['GB','Reino Unido'],['CH','Suíça'] ];
export const SOURCES = [
 {name:'UN Comtrade',tag:'Comércio internacional',url:'https://comtradeplus.un.org/',description:'Portal de consulta de fluxos comerciais. Os códigos e a composição da categoria precisam de validação por gama.',status:'Portal identificado; indicadores ainda não recolhidos'},
 {name:'Banco Mundial',tag:'Contexto económico',url:'https://data.worldbank.org/indicator/NY.GDP.PCAP.CD',description:'PIB per capita em USD correntes. Indicador de contexto, sem equivalência direta a procura ou vendas.',status:'Página consultada em 14/10/2026; sem valores importados'},
 {name:'FAOSTAT',tag:'Contexto alimentar',url:'https://www.fao.org/faostat/en/#data',description:'Portal de estatísticas alimentares. Verificar definições, períodos e granularidade de cada conjunto.',status:'Portal identificado; indicadores ainda não recolhidos'},
 {name:'Access2Markets',tag:'Requisitos de comércio',url:'https://trade.ec.europa.eu/access-to-markets/en/home',description:'Ponto de partida para pesquisa por produto, origem e destino. Confirmar também com a autoridade competente.',status:'Ligação de referência; consulta específica pendente'}
];
export function emptyDataset(){ return {version:1,methodology:'proposed-v1',markets:[]}; }
const text=(v,max=3000)=>typeof v==='string' && v.trim().length>0 && v.length<=max;
const date=v=>text(v,10)&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v;
export function safeUrl(value){try {const u=new URL(value); return u.protocol==='https:'&&!u.username&&!u.password ? u.href : null;}catch{return null;}}
export function validateDataset(data){
 if(!data||data.version!==1||data.methodology!=='proposed-v1'||!Array.isArray(data.markets)||data.markets.length>100) throw Error('Formato incompatível. Utilize o modelo JSON da aplicação.');
 const seen=new Set();
 for(const m of data.markets){
  if(!COUNTRIES.some(([c])=>c===m.code)||seen.has(m.code)) throw Error('País inválido ou repetido.'); seen.add(m.code);
  if(!m.lines||typeof m.lines!=='object'||Object.keys(m.lines).some(id=>!LINES.some(l=>l.id===id))) throw Error('Apenas as três gamas definidas são permitidas.');
  for(const line of Object.values(m.lines)){
   if(!line||!['unknown','approved','blocked'].includes(line.access)) throw Error('Estado de acesso ao mercado inválido.');
   if(line.access!=='unknown'&&!validEvidence(line.accessEvidence)) throw Error('O estado de acesso exige evidência com fonte, data e revisor.');
   if(!Array.isArray(line.observations)||line.observations.length>6) throw Error('Observações inválidas.');
   const criteria=new Set();
   for(const o of line.observations){
    if(!CRITERIA.some(c=>c.id===o.criterion)||criteria.has(o.criterion)) throw Error('Critério inválido ou repetido.'); criteria.add(o.criterion);
    if(!Number.isFinite(o.score)||o.score<0||o.score>100||!validEvidence(o)||!text(o.value,1000)||!text(o.unit,100)||!text(o.period,100)||!text(o.rationale)) throw Error('Cada observação exige nota 0–100, valor, unidade, período, justificação, fonte, datas e revisor.');
   }
  }
 }
 return data;
}
function validEvidence(o){return o && safeUrl(o.url)&&text(o.source,200)&&text(o.locator,500)&&date(o.retrievedAt)&&date(o.reviewedAt)&&text(o.reviewer,200)&&o.verified===true;}
export function fresh(o,today=new Date()){
 if(!o) return false;
 const age=(Date.parse(today.toISOString().slice(0,10))-Date.parse(o.retrievedAt))/86400000;
 const reviewedAge=(Date.parse(today.toISOString().slice(0,10))-Date.parse(o.reviewedAt))/86400000;
 return age>=0&&age<=365&&reviewedAge>=0&&reviewedAge<=365;
}
export function evaluate(line,today=new Date()){
 const observations=line?.observations??[];
 const available=CRITERIA.filter(c=>observations.some(o=>o.criterion===c.id&&validEvidence(o)&&fresh(o,today)));
 const coverage=available.reduce((sum,c)=>sum+c.weight,0);
 const blocked=line?.access==='blocked';
 const ready=coverage===100&&line?.access==='approved'&&validEvidence(line.accessEvidence)&&fresh(line.accessEvidence,today);
 return {coverage,score:ready?Math.round(CRITERIA.reduce((sum,c)=>sum+c.weight*observations.find(o=>o.criterion===c.id).score,0)/100):null,status:blocked?'Acesso bloqueado':ready?'Avaliado':coverage>0?'Evidência incompleta':'Por investigar'};
}
export function ranking(dataset,lineId,today=new Date()){
 return dataset.markets.map(m=>{
  if(lineId==='global'){
   const evaluations=LINES.map(l=>evaluate(m.lines[l.id],today));
   return {...m,evaluation:{coverage:Math.round(evaluations.reduce((s,e)=>s+e.coverage,0)/3),score:evaluations.every(e=>e.score!==null)?Math.round(evaluations.reduce((s,e)=>s+e.score,0)/3):null,status:evaluations.every(e=>e.score!==null)?'Avaliado':'Evidência incompleta'}};
  }
  return {...m,evaluation:evaluate(m.lines[lineId],today)};
 }).sort((a,b)=>(b.evaluation.score??-1)-(a.evaluation.score??-1)||a.code.localeCompare(b.code));
}
export function addCountry(dataset,code){
 if(!COUNTRIES.some(([c])=>c===code)||dataset.markets.some(m=>m.code===code)) return dataset;
 dataset.markets.push({code,lines:Object.fromEntries(LINES.map(l=>[l.id,{access:'unknown',observations:[]}]))}); return dataset;
}
