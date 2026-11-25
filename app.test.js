'use strict';
// Exercita a ligação da interface com o domínio, sem navegador nem dependências.
const vm=require('node:vm'), fs=require('node:fs'), assert=require('node:assert/strict');
const M=require('./domain'), handlers={}, data=new Map();
const storage={getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,v)};
const app={innerHTML:''}, toast={textContent:'',classList:{add(){},remove(){}}};
const nav={querySelectorAll:()=>[]};
const editor={dataset:{editor:'0'},querySelectorAll:()=>[
  {dataset:{field:'name'},value:'Remada teste'}, {dataset:{field:'sets'},value:'2'},
  {dataset:{field:'reps'},value:'8'}, {dataset:{field:'weight'},value:'15'}]};
const doc={body:{dataset:{}},querySelector(s){return s==='#app'?app:s==='.bottom-nav'?nav:s==='#toast'?toast:s==='#routine-name'?{value:'Treino teste'}:null},querySelectorAll(s){return s==='[data-editor]'?[editor]:[]},addEventListener(n,f){handlers[n]=f}};
const context={window:{Monastery:M,scrollTo(){}},document:doc,navigator:{},localStorage:storage,confirm:()=>true,setTimeout(){},clearTimeout(){},console,Date,Number,String,Math,JSON,Blob,URL};
const read=()=>M.load(storage);

vm.runInNewContext(fs.readFileSync('app.js','utf8'),context);
const click=(action,extra={})=>handlers.click({target:{closest:()=>({dataset:{action,...extra}})}});
click('new');handlers.submit({target:{id:'routine-form'},preventDefault(){}});
let state=read();const routine=state.routines.find(r=>r.name==='Treino teste');assert.ok(routine);assert.equal(routine.exercises[0].weight,15);
click('start',{id:routine.id});assert.ok(read().active);
handlers.change({target:{dataset:{set:'weight',e:'0',s:'0'},value:'17.5'}});
handlers.change({target:{dataset:{set:'done',e:'0',s:'0'},checked:true}});
state=read();assert.equal(state.active.exercises[0].sets[0].weight,17.5);assert.equal(state.active.exercises[0].sets[0].done,true);
click('finish');state=read();assert.equal(state.history.length,1);assert.equal(M.totalXP(state),60);assert.equal(M.importBackup(M.exportBackup(state)).history.length,1);
click('profile',{profile:'sororitas'}); assert.equal(doc.body.dataset.profile,'sororitas'); assert.equal(JSON.parse(data.get(M.KEY)).history.length,1); assert.equal(data.has(M.KEY+'.sororitas'),false);
click('new'); handlers.submit({target:{id:'routine-form'},preventDefault(){}}); assert.equal(JSON.parse(data.get(M.KEY+'.sororitas')).history.length,0);
click('profile',{profile:'astartes'}); assert.equal(doc.body.dataset.profile,'astartes'); assert.equal(read().history.length,1); assert.equal(JSON.parse(data.get(M.KEY+'.sororitas')).history.length,0);
const original=data.get(M.KEY+'.sororitas'); data.set(M.KEY+'.sororitas','corrompido'); click('profile',{profile:'sororitas'}); assert.equal(doc.body.dataset.profile,'astartes'); assert.equal(data.get(M.KEY+'.sororitas'),'corrompido'); assert.equal(read().history.length,1); data.set(M.KEY+'.sororitas',original);
click('profile',{profile:'sororitas'}); vm.runInNewContext(fs.readFileSync('app.js','utf8'),context); assert.equal(doc.body.dataset.profile,'sororitas');
console.log('PASS interface: criar rotina, iniciar, registrar série, concluir, XP e backup.');
