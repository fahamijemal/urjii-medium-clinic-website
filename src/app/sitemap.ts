import {locales,routes,siteUrl} from '@/lib/content';
import {getContent} from '@/lib/cms';
import type {MetadataRoute} from 'next';
export const dynamic='force-static';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{if(!siteUrl)return [];const result:MetadataRoute.Sitemap=[];for(const l of locales){for(const r of routes)result.push({url:`${siteUrl}/${l}/${r?r+'/':''}`,alternates:{languages:Object.fromEntries(locales.map(loc=>[loc,`${siteUrl}/${loc}/${r?r+'/':''}`]))}});for(const c of await getContent(l))result.push({url:`${siteUrl}/${l}/${c._type==='article'?'blog':c._type==='staff'?'team':c._type==='activity'?'community':'services'}/${c.slug}/`});}return result;}
