import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  HeartHandshake,
  Users,
  Leaf,
  BookOpen,
  Check,
  Stethoscope,
  Building2,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import Header, { Logo } from "./header";
import ContentList from "./content-list";
import ArticleReader from "./article-reader";
import {
  ClinicContact,
  ClinicServices,
  BranchContacts,
} from "./clinic-contact";
import { clinic, clinicCopy } from "@/lib/clinic";
import { VisitFAQ, BranchInfo } from "./visit-guide";
import { branches, copy, type Locale } from "@/lib/content";
import MobileActions from "./mobile-actions";
import { ui, branchText } from "@/lib/presentation";
import type { PublicContent } from "@/lib/cms";
const policyPaths = [
  "privacy",
  "editorial-policy",
  "medical-disclaimer",
  "accessibility",
];
function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export default function Site({
  locale,
  slug,
  content,
}: {
  locale: Locale;
  slug: string;
  content: PublicContent[];
}) {
  const t = copy[locale],
    u = ui[locale],
    base = `/${locale}/`;
  const detail = content.find(
    (c) =>
      `${c._type === "article" ? "blog" : c._type === "activity" ? "community" : c._type === "staff" ? "team" : "services"}/${c.slug}` ===
      slug,
  );
  const branch = branches.find((b) => slug === `branches/${b.slug}`);
  const branchCards = (
    <div className="branch-grid">
      {branches.map((b, i) => (
        <Link
          href={`${base}branches/${b.slug}/`}
          className="branch-card"
          key={b.slug}
        >
          <div className={`branch-art art-${i}`}>
            {b.photo ? (
              <img
                className="branch-card-photo"
                src={b.photo}
                alt={
                  locale === "om"
                    ? "Mallattoo kiliinikaa damee Qollo Sirrii"
                    : locale === "am"
                      ? "የቆሎ ሲሪ ቅርንጫፍ ምልክት"
                      : "Qollo Sirrii clinic signboard and exterior"
                }
                width={1226}
                height={1280}
                loading="lazy"
              />
            ) : (
              <>
                <span className="art-sun" />
                <span className="art-hill" />
                <Building2 strokeWidth={0.8} />
                <span className="branch-number">0{i + 1}</span>
              </>
            )}
            <span className="status">
              <i />
              {t.active}
            </span>
          </div>
          <div className="branch-body">
            <span className="eyebrow">
              {branchText(b.slug, locale).district} · {u.region}
            </span>
            <h3>
              {branchText(b.slug, locale).name}
              <ArrowUpRight size={24} />
            </h3>
            <p>
              <MapPin size={15} />
              {branchText(b.slug, locale).address}
            </p>
            <span className="text-link">
              {t.details}
              <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
  function listing(type: string) {
    return (
      <ContentList
        items={content.filter((c) => c._type === type)}
        base={base + slug}
        locale={locale}
      />
    );
  }

  const home = (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="availability-badge">
              <span />
              {u.open}
            </div>
            <div className="eyebrow">
              <span className="gold-line" />
              {t.eyebrow}
            </div>
            <h1>
              {t.hero}
              <br />
              <em>{t.accent}</em>
            </h1>
            <p>{t.intro}</p>
            <div className="hero-buttons">
              <a className="button" href={`tel:${clinic.telephone}`}>
                {clinicCopy[locale].call}
                <ArrowUpRight size={17} />
              </a>
              <Link href={base + "branches/"} className="quiet-link">
                {t.visit}
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-location">
              <MapPin size={15} />
              {t.small}
              <span>•</span>
              {u.country}
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="/care.webp"
              alt={
                locale === "om"
                  ? "Fakkii hawaasaa fi kunuunsa fayyaa"
                  : locale === "am"
                    ? "የማህበረሰብ እንክብካቤ ምሳሌ"
                    : "Illustration of community care; not an actual clinic photograph"
              }
              width="900"
              height="700"
              fetchPriority="high"
            />
            <span className="visual-label">
              <span className="small-cross">✦</span> URJII <span>·</span>{" "}
              {t.footer}
            </span>
            <div className="floating-note">
              <span>
                <HeartHandshake size={25} />
              </span>
              <div>
                {t.care}
                <small>{t.people}</small>
              </div>
              <Check size={16} />
            </div>
            <span className="illustration-label">
              {locale === "om"
                ? "FAKKII"
                : locale === "am"
                  ? "ምሳሌ"
                  : "ILLUSTRATION"}
            </span>
          </div>
        </div>
      </section>
      <div className="trust-strip container">
        {[
          [Building2, t.two, t.local],
          [HeartHandshake, t.care, t.people],
          [Users, t.community, t.together],
        ].map(([Icon, title, sub], i) => {
          const I = Icon as typeof Building2;
          return (
            <div key={i}>
              <I size={27} strokeWidth={1.4} />
              <span>
                {title as string}
                <small>{sub as string}</small>
              </span>
            </div>
          );
        })}
      </div>
      <section className="section container about-grid">
        <div className="about-motif official-brand">
          <img
            src="/logo.jpg"
            alt={u.logo}
            width={1024}
            height={1024}
            loading="lazy"
          />
        </div>
        <div>
          <div className="eyebrow">{t.welcome}</div>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
          <Link className="text-link" href={base + "about/"}>
            {t.aboutLink}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section branches-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{t.locations}</div>
              <h2>{t.locationTitle}</h2>
              <p>{t.locationText}</p>
            </div>
            <Link className="text-link" href={base + "branches/"}>
              {t.back}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          {branchCards}
        </div>
      </section>
      <section className="section home-services">
        <div className="container">
          <span className="eyebrow">{t.services}</span>
          <ClinicServices locale={locale} />
          <Link className="text-link" href={base + "services/"}>
            {u.services}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section founder-home">
        <div className="container founder-home-grid">
          <div className="founder-home-image">
            <img
              src="/images/team/abdi-jibril.jpg"
              alt={u.founderPhoto}
              width={1280}
              height={1280}
              loading="lazy"
            />
            <span className="founder-label">{t.founder}</span>
          </div>
          <div>
            <span className="eyebrow">{t.team}</span>
            <h2>{t.founderTitle}</h2>
            <h3>{locale === "am" ? "አብዲ ጂብሪል ሙሳ" : "Abdii Jibriil Muussaa"}</h3>
            <p>{t.founderText}</p>
            <Link
              className="text-link"
              href={base + "team/abdii-jibriil-muussaa/"}
            >
              {t.team}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="journal section">
        <div className="container journal-inner">
          <span className="journal-icon">
            <BookOpen size={42} strokeWidth={1} />
            <Leaf size={30} />
          </span>
          <div>
            <div className="eyebrow">{t.journal}</div>
            <h2>{t.journalTitle}</h2>
            <p>{t.journalText}</p>
            <Link href={base + "blog/"} className="text-link">
              {t.nav[4]}
              <ArrowRight size={17} />
            </Link>
          </div>
          <span className="pill">{t.soon}</span>
        </div>
      </section>
      <div className="container section">
        <ClinicContact locale={locale} />
        <VisitFAQ locale={locale} />
      </div>
    </>
  );
  let title =
    slug === "about"
      ? t.nav[1]
      : slug === "services"
        ? t.nav[2]
        : slug === "branches"
          ? t.nav[3]
          : slug === "blog"
            ? t.nav[4]
            : slug === "contact"
              ? t.contact
              : slug === "community"
                ? t.community
                : slug === "team/abdii-jibriil-muussaa"
                  ? locale === "am"
                    ? "አብዲ ጂብሪል ሙሳ"
                    : "Abdii Jibriil Muussaa"
                  : slug === "team"
                    ? t.team
                    : t.policy[policyPaths.indexOf(slug)];
  const inside = (
    <main id="main">
      <div className="container page-header">
        <div className="breadcrumb">
          <Link href={base}>{t.nav[0]}</Link>
          <span>/</span>
          {branch
            ? branchText(branch.slug, locale).name
            : detail?.title || title}
        </div>
        <div className="eyebrow">{t.name}</div>
        <h1>
          {branch
            ? branchText(branch.slug, locale).name
            : detail?.title || title}
        </h1>
        <p>
          {(branch ? branchText(branch.slug, locale).address : undefined) ||
            (slug === "about"
              ? t.aboutText
              : slug === "services"
                ? t.serviceText
                : slug === "blog"
                  ? t.journalText
                  : slug === "contact"
                    ? t.hours
                    : slug === "branches"
                      ? t.locationText
                      : "")}
        </p>
      </div>
      <section className="container page-content">
        {detail ? (
          detail._type === "article" ? (
            <ArticleReader
              article={detail}
              related={content.filter(
                (c) => c._type === "article" && c._id !== detail._id,
              )}
              locale={locale}
            />
          ) : (
            <article className="article">
              {detail.professionalTitle && <p>{detail.professionalTitle}</p>}
              <p className="lead">{detail.summary}</p>
              {detail.body && <PortableText value={detail.body} />}
            </article>
          )
        ) : branch ? (
          <>
            {branch.photo && (
              <figure className="branch-photo">
                <img
                  src={branch.photo}
                  alt={
                    locale === "om"
                      ? "Mallattoo fi alaa kiliinikaa damee Qollo Sirrii"
                      : locale === "am"
                        ? "የቆሎ ሲሪ ክሊኒክ ምልክት እና ውጫዊ እይታ"
                        : "Urjii Medium Clinic signboard and exterior at Qollo Sirrii"
                  }
                  width={1226}
                  height={1280}
                />
                <figcaption>
                  {t.name} · {branchText(branch.slug, locale).name}
                </figcaption>
              </figure>
            )}
            <div className="branch-detail">
              <Building2 size={64} strokeWidth={1} />
              <span className="pill">{t.active}</span>
              <h2>{branchText(branch.slug, locale).name}</h2>
              <p>{branchText(branch.slug, locale).address}</p>
              <Button href={base + "contact/"}>{t.contact}</Button>
            </div>
            <BranchInfo
              locale={locale}
              address={branchText(branch.slug, locale).address}
            />
            <ClinicContact locale={locale} />
            <BranchContacts locale={locale} branchSlug={branch.slug} />
            <ClinicServices locale={locale} />
            <VisitFAQ locale={locale} />
            <Link className="text-link" href={base + "branches/"}>
              {t.back}
              <ArrowRight size={16} />
            </Link>
          </>
        ) : slug === "branches" || slug === "contact" ? (
          <>
            {branchCards}
            {slug === "contact" && (
              <>
                <ClinicContact locale={locale} />
                <BranchContacts locale={locale} />
              </>
            )}{" "}
            {slug === "contact" && <VisitFAQ locale={locale} />}
          </>
        ) : slug === "about" || slug.startsWith("team") ? (
          <>
            <div className="founder-card">
              <img
                className="founder-photo"
                src="/images/team/abdi-jibril.jpg"
                alt={u.founderPhoto}
                width={1280}
                height={1280}
              />
              <div>
                <span className="eyebrow">{t.founder}</span>
                <h2>
                  {locale === "am" ? "አብዲ ጂብሪል ሙሳ" : "Abdii Jibriil Muussaa"}
                </h2>
                <p>{t.founderText}</p>
                {slug === "about" && (
                  <Link
                    className="text-link"
                    href={base + "team/abdii-jibriil-muussaa/"}
                  >
                    {t.team}
                    <ArrowUpRight size={17} />
                  </Link>
                )}
              </div>
            </div>
            {slug === "about"
              ? branchCards
              : slug === "team"
                ? listing("staff")
                : null}
          </>
        ) : slug === "services" ? (
          <>
            <ClinicServices locale={locale} />
            <ClinicContact locale={locale} />
            {content.some((c) => c._type === "service") && listing("service")}
          </>
        ) : slug === "blog" ? (
          listing("article")
        ) : slug === "community" ? (
          listing("activity")
        ) : (
          <Policy locale={locale} slug={slug} />
        )}
      </section>
    </main>
  );
  return (
    <>
      <a href="#main" className="skip">
        {locale === "om"
          ? "Gara qabiyyeetti darbi"
          : locale === "am"
            ? "ወደ ይዘት ይሂዱ"
            : "Skip to content"}
      </a>
      <div className="topbar">
        <div className="container">
          <span>
            <MapPin size={12} />
            {t.small}
          </span>
          <span>
            {t.two}
            <span className="top-dot">✦</span>
            {t.footer}
          </span>
        </div>
      </div>
      <Header locale={locale} dynamicPage={!!detail} />
      {slug ? inside : <main id="main">{home}</main>}
      <section className="cta">
        <div className="container">
          <div>
            <span className="eyebrow">{t.name}</span>
            <h2>{t.cta}</h2>
            <p>{t.ctaText}</p>
          </div>
          <Button href={base + "branches/"} secondary>
            {t.visit}
          </Button>
          <span className="cta-star">✦</span>
        </div>
      </section>
      <footer className="container">
        <div className="footer-main">
          <div>
            <Link className="brand" href={base}>
              <Logo locale={locale} />
            </Link>
            <p>{t.footer}</p>
            <a className="footer-phone" href={`tel:${clinic.telephone}`}>
              {clinic.phone} · {clinicCopy[locale].hours}
            </a>
            <span className="footer-address">
              {t.small} · {u.country}
            </span>
          </div>
          <div>
            <h3>{t.explore}</h3>
            {["about", "branches", "team", "community", "contact"].map(
              (s, i) => (
                <Link href={base + s + "/"} key={s}>
                  {[t.nav[1], t.nav[3], t.team, t.community, t.contact][i]}
                </Link>
              ),
            )}
          </div>
          <div>
            <h3>{t.legal}</h3>
            {policyPaths.map((s, i) => (
              <Link href={base + s + "/"} key={s}>
                {t.policy[i]}
              </Link>
            ))}
          </div>
          <div>
            <h3>{t.language}</h3>
            {(["om", "am", "en"] as const).map((l, i) => (
              <Link href={`/${l}/`} key={l} lang={l}>
                {["Afaan Oromoo", "አማርኛ", "English"][i]}
                {l === locale ? " ↗" : ""}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Urjii Medium Clinic. {t.rights}
          </span>
          <span>
            {branchText("qollo-sirrii", locale).name}{" "}
            <span className="gold">✦</span>{" "}
            {branchText("yabelloo", locale).name}
          </span>
        </div>
      </footer>
      <MobileActions locale={locale} />
    </>
  );
}
function Policy({ locale, slug }: { locale: Locale; slug: string }) {
  const texts: Record<string, Record<Locale, string[]>> = {
    privacy: {
      en: [
        "Privacy by design",
        "This website does not collect patient records or offer a medical contact form. Do not send symptoms, medical documents or other sensitive information through public channels. Hosting providers may process technical access logs. No advertising or analytics trackers are installed.",
      ],
      om: [
        "Odeeffannoo dhuunfaa",
        "Marsariitiin kun galmee dhukkubsataa hin sassaabu. Mallattoo dhukkubaa, ragaa yaalaa fi odeeffannoo dhuunfaa karaa quunnamtii uummataaf banaa hin ergiinaa. Dhaabbanni marsariiticha keessummeessu galmee teeknikaa daawwannaa qabachuu danda’a. Beeksisa fi hordoffii xiinxalaa hin fayyadamu.",
      ],
      am: [
        "የግላዊነት ጥበቃ",
        "ይህ ድረ ገጽ የታካሚ መዝገብ አይሰበስብም። የጤና መረጃ በሕዝብ መገናኛዎች አይላኩ። ድረ ገጹን የሚያስተናግዱ አቅራቢዎች የቴክኒክ የጉብኝት መዝገቦችን ሊያስኬዱ ይችላሉ። የማስታወቂያ ወይም የትንታኔ መከታተያ አልተጫነም።",
      ],
    },
    "editorial-policy": {
      en: [
        "Information you can trust",
        "Clinical articles require a named author, a qualified reviewer, reliable references and a review date before publication. Service details and staff credentials require verification. Corrections are handled through the clinic. Translations require language review.",
      ],
      om: [
        "Odeeffannoo amanamaa",
        "Barreeffamni fayyaa maxxanfamuu dura barreessaa, ogeessa ilaale, wabii amanamaa fi guyyaa itti ilaalame qabaachuu qaba. Tajaajiloonni fi ragaan ogeeyyii mirkanaa’uu qabu. Hiikni afaanii ilaalamuu qaba.",
      ],
      am: [
        "አስተማማኝ መረጃ",
        "የጤና ጽሑፎች ከመታተማቸው በፊት ደራሲ፣ ብቁ ገምጋሚ፣ ታማኝ ማጣቀሻዎች እና የግምገማ ቀን ሊኖራቸው ይገባል። ትርጉሞችም መገምገም አለባቸው።",
      ],
    },
    "medical-disclaimer": {
      en: [
        "Education, with care",
        "Website content is general information, not a diagnosis, prescription or substitute for an individual consultation. In an emergency, seek immediate help from the nearest appropriate health facility. Do not wait for a website response.",
      ],
      om: [
        "Hubachiisa fayyaa",
        "Odeeffannoon marsariitii kun odeeffannoo waliigalaa qofa; qorannoo, ajaja qorichaa ykn gorsa dhuunfaa bakka hin bu’u. Yeroo balaa hatattamaa gara dhaabbata fayyaa dhihoo deemaatii gargaarsa barbaadaa.",
      ],
      am: [
        "የጤና ማስታወቂያ",
        "የድረ ገጹ መረጃ አጠቃላይ እውቀት ብቻ ነው። ምርመራን ወይም የግል ምክርን አይተካም። በድንገተኛ ሁኔታ በአቅራቢያዎ ካለ የጤና ተቋም አስቸኳይ እርዳታ ይጠይቁ።",
      ],
    },
    accessibility: {
      en: [
        "A website for everyone",
        "Use the keyboard to navigate, the skip link to reach the main content and your browser controls to enlarge text. The site supports reduced motion and small screens. Call 0961 548 101 to report an accessibility barrier.",
      ],
      om: [
        "Marsariitii hundaaf",
        "Gabatee furtuutiin marsariitii keessa socho’uu fi meeshaalee biraawzariitiin barruu guddisuu dandeessu. Rakkoo dhaqqabamummaa yoo argitan 0961 548 101 irratti bilbilaa.",
      ],
      am: [
        "ለሁሉም ተደራሽ",
        "በቁልፍ ሰሌዳ መዘዋወር እና በአሳሽዎ ጽሑፍ ማጉላት ይችላሉ። የተደራሽነት ችግር ካጋጠመዎት በ0961 548 101 ይደውሉ።",
      ],
    },
  };
  const data = texts[slug]?.[locale];
  return (
    <article className="article">
      <h2>{data?.[0]}</h2>
      <p>{data?.[1]}</p>
    </article>
  );
}
