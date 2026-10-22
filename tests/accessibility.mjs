import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try{const context=await browser.newContext();const page=await context.newPage();for(const width of [390,1440]){await page.setViewportSize({width,height:900});for(const lang of ['om','en','am']){for(const route of ['', 'branches/qollo-sirrii/','blog/']){await page.goto(`http://127.0.0.1:3000/${lang}/${route}`);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[],`${width}px ${lang}/${route}`);}}console.log(`PASS automated axe checks: ${width}px, home/branch/journal in all languages`);}}finally{await browser.close();}
