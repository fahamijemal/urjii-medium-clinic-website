import {Phone,Clock3,Stethoscope,FlaskConical,Pill} from 'lucide-react';
import {clinic,clinicCopy,branchContacts} from '@/lib/clinic';
import type {Locale} from '@/lib/content';
export function ClinicContact({locale}:{locale:Locale}){const c=clinicCopy[locale];return <section className="clinic-contact" aria-label={c.contact}><div><span className="eyebrow">{c.contact}</span><a className="contact-number" href={`tel:${clinic.telephone}`}><Phone size={24}/>{clinic.phone}</a><p>{c.confirm}</p></div><div className="contact-hours"><Clock3 size={27}/><strong>{c.hours}</strong><span>{c.availability}</span></div><a className="button" href={`tel:${clinic.telephone}`}><Phone size={17}/>{c.call}</a></section>}
export function ClinicServices({locale}:{locale:Locale}){const c=clinicCopy[locale],icons=[Stethoscope,FlaskConical,Pill];return <section className="confirmed-services"><h2>{c.services}</h2><p>{c.intro}</p><div className="content-grid">{c.items.map((item,i)=>{const Icon=icons[i];return <div className="content-card" key={item.title}><div className="card-icon"><Icon size={32} strokeWidth={1.4}/></div><h3>{item.title}</h3><p>{item.description}</p></div>})}</div></section>}

export function BranchContacts({locale,branchSlug='qollo-sirrii'}:{locale:Locale;branchSlug?:string}){
 const contacts=branchContacts[branchSlug]||[];
 if(!contacts.length)return null;
 const label=locale==='om'?'Bilbiloota dabalataa · Qollo Sirrii':locale==='am'?'ተጨማሪ ስልክ ቁጥሮች · ቆሎ ሲሪ':'Additional contacts · Qollo Sirrii';
 return <section className="branch-phones" aria-label={label}><h3>{label}</h3><div>{contacts.map(contact=><a key={contact.telephone} href={`tel:${contact.telephone}`}><Phone size={17}/>{contact.phone}</a>)}</div></section>;
}
