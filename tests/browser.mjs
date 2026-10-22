import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,390,768,1440]){
 await page.setViewportSize({width,height:900});
 for(const lang of ['om','en','am']){
  for(const route of ['','branches/qollo-sirrii/','team/abdii-jibriil-muussaa/','blog/']){
   await page.goto(`http://127.0.0.1:3000/${lang}/${route}`);
   const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,headings:document.querySelectorAll('h1').length,lang:document.documentElement.lang}));
   assert.ok(size.scroll<=size.width,`${lang}/${route} overflow at ${width}`);assert.equal(size.headings,1);assert.equal(size.lang,lang);
  }
 }
 if(width===390){await page.goto('http://127.0.0.1:3000/en/');await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('navigation',{name:'Main'}).getByRole('link',{name:'Our branches'}).click();await page.waitForURL('**/en/branches/');}
 console.log(`PASS ${width}px: home, branch, founder, blog in three languages`);
}
assert.deepEqual(errors,[]);await browser.close();
