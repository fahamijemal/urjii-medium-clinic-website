"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { copy, type Locale } from "@/lib/content";
import { ui } from "@/lib/presentation";

export function Logo({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <img
        className="brand-logo"
        src="/logo.jpg"
        alt={ui[locale].logo}
        width={64}
        height={64}
      />
      <span className="brand-word">
        URJII<small>{ui[locale].clinicName}</small>
      </span>
    </>
  );
}

export default function Header({
  locale,
  dynamicPage = false,
}: {
  locale: Locale;
  dynamicPage?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const t = copy[locale];
  const path = usePathname();
  const items = ["", "about", "services", "branches", "blog"];
  const labels = [ui[locale].menuOpen, ui[locale].menuClose, ui[locale].main];

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header>
      <div className="container nav">
        <Link href={`/${locale}/`} className="brand" aria-label={t.name}>
          <Logo locale={locale} />
        </Link>
        <nav
          id="primary-navigation"
          aria-label={labels[2]}
          className={open ? "nav-links open" : "nav-links"}
        >
          {items.map((p, i) => {
            const href = `/${locale}/${p}${p ? "/" : ""}`;
            const active = p
              ? path.startsWith(`/${locale}/${p}/`)
              : path === href ||
                path === `/${locale}` ||
                (locale === "en" && path === "/");
            return (
              <Link
                onClick={() => setOpen(false)}
                className={active ? "selected" : ""}
                aria-current={active ? "page" : undefined}
                key={p}
                href={href}
              >
                {t.nav[i]}
              </Link>
            );
          })}
          <Link
            onClick={() => setOpen(false)}
            className="mobile-contact-link"
            href={`/${locale}/contact/`}
          >
            {t.contact}
            <ArrowUpRight size={16} />
          </Link>
        </nav>
        <div className="nav-actions">
          <div className="locale">
            <select
              aria-label={t.language}
              value={locale}
              onChange={(e) => {
                window.location.href =
                  dynamicPage || path === "/"
                    ? `/${e.target.value}/`
                    : path.replace(/^\/(om|en|am)/, `/${e.target.value}`);
              }}
            >
              <option value="om">Afaan Oromoo</option>
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
            <ChevronDown size={13} />
          </div>
          <Link className="button nav-contact" href={`/${locale}/contact/`}>
            {t.contact}
            <ArrowUpRight size={16} />
          </Link>
          <button
            ref={toggle}
            className="menu"
            aria-label={open ? labels[1] : labels[0]}
            aria-controls="primary-navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
