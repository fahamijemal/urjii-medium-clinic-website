import Link from "next/link";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { ui } from "@/lib/presentation";
import type { Locale } from "@/lib/content";
export default function MobileActions({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <nav className="mobile-actions" aria-label={t.quick}>
      <a href={`tel:${clinic.telephone}`}>
        <Phone size={19} />
        <span>{t.call}</span>
      </a>
      <Link href={`/${locale}/branches/`}>
        <MapPin size={19} />
        <span>{t.locations}</span>
      </Link>
      <Link href={`/${locale}/contact/`}>
        <MessageCircle size={19} />
        <span>{t.contact}</span>
      </Link>
    </nav>
  );
}
