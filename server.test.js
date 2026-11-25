'use strict';
const {spawn}=require('node:child_process'), http=require('node:http'),assert=require('node:assert/strict');
const child=spawn(process.execPath,['server.js'],{cwd:__dirname,env:{...process.env,PORT:'42318'},stdio:['ignore','pipe','pipe']});
const get=p=>new Promise((resolve,reject)=>http.get('http://127.0.0.1:42318'+p,r=>{let body='';r.on('data',c=>body+=c);r.on('end',()=>resolve({code:r.statusCode,body}));}).on('error',reject));
const timeout=setTimeout(()=>{console.error('Server test timed out');child.kill();process.exitCode=1;},5000);
child.stdout.once('data',async()=>{try{const home=await get('/'),js=await get('/domain.js'),blocked=await get('/README.md');assert.equal(home.code,200);assert.match(home.body,/Astartes/);assert.equal(js.code,200);assert.equal(blocked.code,404);console.log('PASS server: arquivos públicos e bloqueio de arquivos não autorizados.');}catch(e){console.error(e);process.exitCode=1;}finally{clearTimeout(timeout);child.kill();}});
