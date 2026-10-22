'use client';

import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Search,BookOpen,Users,HeartHandshake,Stethoscope} from 'lucide-react';
import type {PublicContent} from '@/lib/cms';
import {copy,type Locale} from '@/lib/content';

const translations={
 en:{search:'Search by name or topic',all:'All categories',branches:'All branches',both:'Both branches',none:'No matching results',reset:'Clear filters',results:'results',standards:'Our editorial standards',empty:'Verified information will appear here when it is available.'},
 om:{search:'Maqaa ykn mata duree barbaadi',all:'Ramaddii hunda',branches:'Dameewwan hunda',both:'Dameewwan lamaanuu',none:'Bu’aan hin argamne',reset:'Filannoo haqi',results:'bu’aa',standards:'Imaammata gulaalaa keenya',empty:'Odeeffannoon mirkanaa’e yeroo qophaa’u asitti dhiyaata.'},
 am:{search:'በስም ወይም በርዕስ ፈልግ',all:'ሁሉም ምድቦች',branches:'ሁሉም ቅርንጫፎች',both:'ሁለቱም ቅርንጫፎች',none:'ውጤት አልተገኘም',reset:'ማጣሪያዎችን አጽዳ',results:'ውጤቶች',standards:'የአርትዖት መመሪያችን',empty:'የተረጋገጠ መረጃ ሲዘጋጅ እዚህ ይታተማል።'}
};
export default function ContentList({items,base,locale}:{items:PublicContent[];base:string;locale:Locale}){
 const [search,setSearch]=useState(''),[filter,setFilter]=useState('');const t=copy[locale],w=translations[locale];
 const isTeam=base.endsWith('/team'),isBlog=base.endsWith('/blog');
 const Icon=isTeam?Users:isBlog?BookOpen:base.endsWith('/services')?Stethoscope:HeartHandshake;
 const shown=items.filter(c=>(!filter||(isTeam?c.branch===filter||c.branch==='both':c.category===filter))&&`${c.title} ${c.summary||''} ${c.professionalTitle||''}`.toLocaleLowerCase(locale).includes(search.trim().toLocaleLowerCase(locale)));
 const clear=()=>{setSearch('');setFilter('');};
 const categories=[...new Set(items.map(c=>c.category).filter(Boolean))];
 return <>
 {items.length>0&&<><div className="search-row"><label><Search size={18} aria-hidden="true"/><input aria-label={w.search} placeholder={w.search} value={search} onChange={e=>setSearch(e.target.value)}/></label>{(isTeam||categories.length>0)&&<select aria-label={isTeam?w.branches:w.all} value={filter} onChange={e=>setFilter(e.target.value)}><option value="">{isTeam?w.branches:w.all}</option>{isTeam?<><option value="qollo-sirrii">Qollo Sirrii</option><option value="yabelloo">Yabeelloo</option></>:categories.map(c=><option key={c}>{c}</option>)}</select>}</div><div className="results-summary"><span role="status" aria-live="polite">{shown.length} {w.results}</span>{(search||filter)&&<button className="reset-filters" onClick={clear}>{w.reset}</button>}</div></>}
 {shown.length?<div className="content-grid">{shown.map(c=><Link className="content-card" key={c._id} href={`${base}/${c.slug}/`}><div className="card-icon"><Icon size={35} strokeWidth={1.2}/></div><span className="eyebrow">{c.category||c.professionalTitle||t.name}</span><h2>{c.title}</h2><p>{c.summary}</p>{c.branch&&<div className="card-meta">{c.branch==='both'?w.both:c.branch==='qollo-sirrii'?'Qollo Sirrii':'Yabeelloo'}</div>}<ArrowUpRight size={19}/></Link>)}</div>:<div className="empty"><Icon size={34} strokeWidth={1.3}/><h2>{items.length?w.none:t.soon}</h2><p>{items.length?w.search:w.empty}</p>{items.length?<button className="reset-filters" style={{marginTop:20}} onClick={clear}>{w.reset}</button>:isBlog?<Link className="text-link" href={`/${locale}/editorial-policy/`}>{w.standards}<ArrowUpRight size={16}/></Link>:null}</div>}
 </>;
}
