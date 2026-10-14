import test from 'node:test';import assert from 'node:assert/strict';
import {marketEvidence,evidenceProgress,initialEvidenceExport} from '../web/market-evidence.js';
import {emptyDataset,addCountry,ranking,validateDataset} from '../web/model.js';
test('Documentary facts never become scores or market approvals',()=>{
 const bundle=initialEvidenceExport();assert.equal(bundle.markets.length,9);
 for(const m of bundle.markets)for(const l of Object.values(m.lines)){assert.equal(l.access,'unknown');assert.ok(l.facts.length);for(const f of l.facts){assert.equal(f.score,null);assert.ok(f.url.startsWith('https://'));assert.ok(f.locator);assert.equal(f.reviewStatus,'Por rever para avaliação');}}
 assert.throws(()=>validateDataset(bundle));
 const dataset=bundle.markets.reduce((d,m)=>addCountry(d,m.code),emptyDataset());
 assert.ok(ranking(dataset,'global').every(m=>m.evaluation.score===null&&m.evaluation.coverage===0));
});
test('Charcuterie retains mixed category caveat; regulatory sources do not become channels',()=>{
 for(const code of ['ES','FR','NL','DE','IT','BE','GB','SA','JP']){
 const facts=marketEvidence(code,'charcuterie');const demand=facts.filter(f=>f.criterion==='demand');
 assert.ok(demand.every(f=>f.id.includes('160100')&&f.limit.includes('várias espécies')));
 assert.ok(facts.every(f=>!f.id.includes('020230')&&!f.id.includes('020220')));
 }
 assert.ok(marketEvidence('SA','chef').some(f=>f.criterion==='access'));
 assert.ok(!marketEvidence('SA','chef').some(f=>f.criterion==='channel'));
 assert.equal(evidenceProgress('JP','chef').researched,1);
 assert.equal(evidenceProgress('CA','chef').researched,0);
 assert.equal(evidenceProgress('ES','chef').researched,2);
 assert.equal(evidenceProgress('ES','global').total,18);
});
