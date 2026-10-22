'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Plus, ChevronDown } from 'lucide-react';
import { copy, type Locale } from '@/lib/content';

export function Logo() {
  return <><span className="brand-mark"><Plus strokeWidth={2.5}/><span>✦</span></span><span className="brand-word">URJII<small>MEDIUM CLINIC</small></span></>;
}

export default function Header({ locale, dynamicPage = false }: { locale: Locale; dynamicPage?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const t = copy[locale];
  const path = usePathname();
  const items = ['', 'about', 'services', 'branches', 'blog'];
  const labels = locale === 'om' ? ['Menu bani', 'Menu cufi', 'Marsaa ijoo'] : locale === 'am' ? ['ምናሌ ክፈት', 'ምናሌ ዝጋ', 'ዋና መዳረሻ'] : ['Open menu', 'Close menu', 'Main'];

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return <header><div className="container nav">
    <Link href={`/${locale}/`} className="brand" aria-label={t.name}><Logo/></Link>
    <nav id="primary-navigation" aria-label={labels[2]} className={open ? 'nav-links open' : 'nav-links'}>
      {items.map((p, i) => {
        const href = `/${locale}/${p}${p ? '/' : ''}`;
        const active = p ? path.startsWith(`/${locale}/${p}/`) : path === href || path === `/${locale}`;
        return <Link onClick={() => setOpen(false)} className={active ? 'selected' : ''} aria-current={active ? 'page' : undefined} key={p} href={href}>{t.nav[i]}</Link>;
      })}
      <Link onClick={() => setOpen(false)} className="mobile-contact-link" href={`/${locale}/contact/`}>{t.contact}<ArrowUpRight size={16}/></Link>
    </nav>
    <div className="nav-actions"><div className="locale"><select aria-label={t.language} value={locale} onChange={e => { window.location.href = dynamicPage ? `/${e.target.value}/` : path.replace(/^\/(om|en|am)/, `/${e.target.value}`); }}><option value="om">Afaan Oromoo</option><option value="en">English</option><option value="am">አማርኛ</option></select><ChevronDown size={13}/></div>
      <Link className="button nav-contact" href={`/${locale}/contact/`}>{t.contact}<ArrowUpRight size={16}/></Link>
      <button ref={toggle} className="menu" aria-label={open ? labels[1] : labels[0]} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </div></header>;
}
