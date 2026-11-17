// Public research priority; never a commercial score or access decision.
export const rangeIds=['chef','savoury','charcuterie'];
export function automaticRanking(line,trade,partners,formats){
 if(line==='global'){
  const byCountry=new Map();
  for(const id of rangeIds)automaticRanking(id,trade,partners,formats).forEach((row,i)=>{
   if(!byCountry.has(row.code))byCountry.set(row.code,{code:row.code,positions:[]});
   byCountry.get(row.code).positions.push({id,place:i+1,tier:row.tier});
  });
  return [...byCountry.values()].map(row=>({...row,best:Math.min(...row.positions.map(p=>p.place)),strongest:Math.max(...row.positions.map(p=>p.tier)),supported:row.positions.filter(p=>p.tier>=2).length})).sort((a,b)=>b.strongest-a.strongest||a.best-b.best||b.supported-a.supported||a.code.localeCompare(b.code));
 }
 const ids=new Set([...Object.keys(trade),...partners.map(p=>p.country)]);
 return [...ids].flatMap(code=>{
  const candidates=partners.filter(p=>p.country===code);
  const exactFormat=line==='savoury'&&['ES','IT','NL'].includes(code)&&Boolean(formats[code]);
  const initial=candidates.some(p=>p.fit[line]==='initial');
  const exploratory=candidates.some(p=>p.fit[line]==='exploratory')||(line==='charcuterie'&&code==='DE'&&Boolean(formats.DE));
  const raw=trade[code]?.[line==='charcuterie'?2:0]?.[0];
  const value=Number.isFinite(raw)?raw:null;
  const tier=exactFormat?3:initial?2:exploratory?1:0;
  if(tier===0&&value===null)return [];
  return [{code,tier,value,reason:exactFormat?'Formato bovino congelado documentado no canal profissional':initial?'Canal candidato com atividade relevante; encaixe da referência por confirmar':exploratory?'Pista exploratória; equivalência ao produto congelado por confirmar':'Apenas contexto de importação; canal específico por confirmar'}];
 }).sort((a,b)=>b.tier-a.tier||(b.value??-Infinity)-(a.value??-Infinity)||a.code.localeCompare(b.code));
}
export function orderCandidates(rows,line){
 const strength={initial:2,exploratory:1,no_evidence:0};
 const level=p=>line==='global'?Math.max(...rangeIds.map(id=>strength[p.fit[id]]??0)):strength[p.fit[line]]??0;
 return [...rows].sort((a,b)=>level(b)-level(a)||Number(Boolean(b.email||b.phone))-Number(Boolean(a.email||a.phone))||a.name.localeCompare(b.name));
}
