import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const langs=['om','en','am'];
for(const lang of langs){test(`${lang}: static pages, language and working internal destinations`,()=>{for(const route of ['','about','services','branches','branches/qollo-sirrii','branches/yabelloo','team','team/abdii-jibriil-muussaa','blog','contact','privacy','editorial-policy']){const html=readFileSync(`out/${lang}/${route?route+'/':''}index.html`,'utf8');assert.match(html,new RegExp(`<html lang="${lang}"`));assert.match(html,/<h1/);assert.match(html,/application\/ld\+json/);for(const [,href] of html.matchAll(/href="(\/[^"#?]*)"/g)){if(href.includes('_next'))continue;assert.ok(existsSync(`out${href}${href.endsWith('/')?'index.html':''}`),`Missing target ${href}`)}}});}
test('prelaunch indexing is disabled without a real origin',()=>{if(!process.env.NEXT_PUBLIC_SITE_URL){assert.match(readFileSync('out/robots.txt','utf8'),/Disallow: \//);assert.doesNotMatch(readFileSync('out/en/index.html','utf8'),/rel="canonical"/);}});

test('confirmed contact and 24-hour availability reach every branch and language',()=>{
 for(const lang of langs){
  for(const branch of ['qollo-sirrii','yabelloo']){
   const html=readFileSync(`out/${lang}/branches/${branch}/index.html`,'utf8');
   assert.match(html,/href="tel:\+251961548101"/);
   const json=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
   assert.ok(json,'Branch structured data is present');
   const clinic=JSON.parse(json);
   assert.equal(clinic.telephone,'+251961548101');
   assert.equal(clinic.openingHours,'Mo-Su 00:00-24:00');
  }
  const services=readFileSync(`out/${lang}/services/index.html`,'utf8');
  assert.match(services,/confirmed-services/);
  assert.doesNotMatch(services,/class="empty"/);
 }
});
