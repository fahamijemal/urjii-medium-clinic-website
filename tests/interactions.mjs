import {build} from 'esbuild';
import {createServer} from 'node:http';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';

// Isolated browser fixture: synthetic content is never exported with the website.
const source=`
import React from 'react';
import {createRoot} from 'react-dom/client';
import ContentList from './src/components/content-list';
import ArticleReader from './src/components/article-reader';
const items=[{_id:'1',_type:'staff',title:'TEST: Alpha',slug:'alpha',branch:'qollo-sirrii',professionalTitle:'Test role'},{_id:'2',_type:'staff',title:'TEST: Beta',slug:'beta',branch:'yabelloo'},{_id:'3',_type:'staff',title:'TEST: Shared',slug:'shared',branch:'both'}];
const article={_id:'a',_type:'article',title:'TEST ARTICLE',slug:'test',author:'Test author',reviewer:'Test reviewer',reviewedAt:'2026-01-01',references:[{label:'Test reference',url:'https://example.org/'}],body:[{_type:'block',_key:'h',style:'h2',children:[{_type:'span',text:'Test heading'}]},{_type:'block',_key:'p',style:'normal',children:[{_type:'span',text:'This is synthetic content for browser testing only.'}]}]};
createRoot(document.getElementById('root')).render(<><ContentList items={items} base="/en/team" locale="en"/><ArticleReader article={article} related={[]} locale="en"/></>);
`;
const output=await build({stdin:{contents:source,resolveDir:process.cwd(),loader:'tsx'},bundle:true,write:false,jsx:'automatic',define:{'process.env':JSON.stringify({NODE_ENV:'production'})},platform:'browser'});
const server=createServer((req,res)=>{if(req.url==='/fixture.js'){res.setHeader('Content-Type','application/javascript');res.end(output.outputFiles[0].text);}else{res.setHeader('Content-Type','text/html');res.end('<!doctype html><html lang="en"><body><div id="root"></div><script src="/fixture.js"></script></body></html>');}});
await new Promise(resolve=>server.listen(3001,'127.0.0.1',resolve));
let browser;
try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:3001/');
 await page.getByRole('status').first().filter({hasText:'3 results'}).waitFor();
 await page.getByRole('combobox',{name:'All branches'}).selectOption('qollo-sirrii');
 assert.equal(await page.locator('.content-card').count(),2);
 await page.getByRole('textbox',{name:'Search by name or topic'}).fill('beta');
 await page.getByRole('heading',{name:'No matching results'}).waitFor();
 await page.getByRole('button',{name:'Clear filters'}).last().click();
 assert.equal(await page.locator('.content-card').count(),3);
 await page.getByRole('textbox').fill('  ALPHA  ');
 await page.getByRole('link',{name:/TEST: Alpha/}).waitFor();
 assert.equal(await page.locator('.content-card').count(),1);
 await page.getByRole('navigation',{name:'In this article'}).getByRole('link',{name:'Test heading'}).click();
 assert.equal(new URL(page.url()).hash,'#section-1');
 await page.getByRole('heading',{name:'Test heading'}).waitFor();
 await page.getByRole('button',{name:'Copy link',exact:true}).click();
 await page.getByRole('status').filter({hasText:'Link copied'}).waitFor();
 assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),page.url());
 assert.deepEqual(errors,[]);
 console.log('PASS branch filtering, shared staff, search normalization, empty/reset state, article contents anchors and absolute sharing link');
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
