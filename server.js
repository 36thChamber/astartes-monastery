'use strict';
// Default binds only to this computer. --lan explicitly exposes files to the local network.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const host = process.argv.includes('--lan') ? '0.0.0.0' : '127.0.0.1';
const port = Number(process.env.PORT || 4173);
const allowed = new Map([['/','index.html'],['/index.html','index.html'],['/style.css','style.css'],['/app.js','app.js'],['/domain.js','domain.js'],['/sw.js','sw.js'],['/manifest.webmanifest','manifest.webmanifest'],['/icon.svg','icon.svg']]);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml'};
http.createServer((req,res)=>{let pathname;try{pathname=new URL(req.url,'http://localhost').pathname;}catch{res.writeHead(400).end();return;}const file=allowed.get(pathname);if(!file || !['GET','HEAD'].includes(req.method)){res.writeHead(404).end('Not found');return;}fs.readFile(path.join(__dirname,file),(err,data)=>{if(err){res.writeHead(500).end('Server error');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data);});}).listen(port,host,()=>console.log(`Astartes Monastery: http://${host}:${port}/`));
