import test from 'node:test';
import assert from 'node:assert/strict';
import {RESEARCH,usdMillions,growthPercentage} from '../web/research.js';
import {emptyDataset,addCountry,ranking} from '../web/model.js';
test('Source unit 1000 USD is converted to millions, preserving missing data',()=>{
 assert.equal(usdMillions(171314.32),171.31432);
 assert.equal(usdMillions(null),null);
 assert.equal(usdMillions(0),0);
});
test('Annual value change handles negative growth and invalid baselines',()=>{
 assert.ok(Math.abs(growthPercentage(90,100)+10)<1e-10);
 assert.equal(growthPercentage(10,0),null);
 assert.equal(growthPercentage(null,100),null);
 assert.ok(Math.abs(growthPercentage(171314.32,145454.17)-17.7795869)<0.001);
});
test('Public research and shortlists never implicitly approve access or generate commercial scores',()=>{
 const dataset=RESEARCH.markets.reduce((d,m)=>addCountry(d,m.code),emptyDataset());
 assert.equal(dataset.markets.length,9);
 for(const line of ['chef','savoury','charcuterie','global'])assert.ok(ranking(dataset,line).every(m=>m.evaluation.score===null));
});
