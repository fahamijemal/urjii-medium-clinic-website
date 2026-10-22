"use client";

import { useState } from "react";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Check, Copy, Share2, BookOpen, ShieldCheck } from "lucide-react";
import type { PublicContent } from "@/lib/cms";
import { type Locale } from "@/lib/content";
const wording = {
  en: {
    contents: "In this article",
    read: "min read",
    author: "Written by",
    reviewer: "Medically reviewed by",
    reviewed: "Reviewed",
    references: "Sources & references",
    share: "Share article",
    copy: "Copy link",
    copied: "Link copied",
    related: "Continue reading",
    disclaimer:
      "For general education only. This article does not replace advice from a healthcare professional.",
    failed: "Copy is unavailable. You can copy the address from your browser.",
  },
  om: {
    contents: "Barreeffama kana keessatti",
    read: "daqiiqaa dubbisuuf",
    author: "Barreessaa",
    reviewer: "Ogeessa fayyaa gulaale",
    reviewed: "Itti ilaalame",
    references: "Maddootaa fi wabiiwwan",
    share: "Barreeffama qoodi",
    copy: "Geessituu waraabi",
    copied: "Geessituun waraabame",
    related: "Dubbisuu itti fufaa",
    disclaimer:
      "Barnoota waliigalaaf qofa. Gorsa ogeessa fayyaa bakka hin bu’u.",
    failed: "Geessituu biraawzarii keessan irraa waraabuu dandeessu.",
  },
  am: {
    contents: "በዚህ ጽሑፍ ውስጥ",
    read: "ደቂቃ ንባብ",
    author: "ደራሲ",
    reviewer: "የጤና ገምጋሚ",
    reviewed: "የተገመገመበት",
    references: "ምንጮች እና ማጣቀሻዎች",
    share: "ጽሑፉን አጋራ",
    copy: "አገናኝ ቅዳ",
    copied: "አገናኝ ተቀድቷል",
    related: "ማንበብ ይቀጥሉ",
    disclaimer: "ለአጠቃላይ ትምህርት ብቻ። የጤና ባለሙያ ምክርን አይተካም።",
    failed: "አገናኙን ከአሳሽዎ መቅዳት ይችላሉ።",
  },
};
export default function ArticleReader({
  article,
  related,
  locale,
}: {
  article: PublicContent;
  related: PublicContent[];
  locale: Locale;
}) {
  const w = wording[locale];
  const [status, setStatus] = useState("");
  const blocks = article.body || [];
  const text = blocks
    .flatMap(
      (b) => b.children?.map((c: { text?: string }) => c.text || "") || [],
    )
    .join(" ");
  const minutes = Math.max(
    1,
    Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200),
  );
  const headings = blocks
    .filter((b) => b._type === "block" && ["h2", "h3"].includes(b.style))
    .map((b, i) => ({
      key: b._key,
      id: `section-${i + 1}`,
      text: (b.children || [])
        .map((c: { text?: string }) => c.text || "")
        .join(""),
    }));
  const components: PortableTextComponents = {
    block: {
      h2: ({ value, children }) => (
        <h2 id={headings.find((h) => h.key === value._key)?.id}>{children}</h2>
      ),
      h3: ({ value, children }) => (
        <h3 id={headings.find((h) => h.key === value._key)?.id}>{children}</h3>
      ),
    },
  };
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus(w.copied);
    } catch {
      setStatus(w.failed);
    }
  }
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          url: window.location.href,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") await copyLink();
      }
    } else await copyLink();
  }
  return (
    <>
      <div className="reader-layout">
        {headings.length > 0 && (
          <aside className="reader-toc">
            <div className="eyebrow">{w.contents}</div>
            <nav aria-label={w.contents}>
              {headings.map((h) => (
                <a href={`#${h.id}`} key={h.id}>
                  {h.text}
                </a>
              ))}
            </nav>
          </aside>
        )}
        <article className="article reader-article">
          <div className="reader-meta">
            <BookOpen size={16} />
            {minutes} {w.read}
            {article.category && (
              <span className="pill">{article.category}</span>
            )}
          </div>
          <p className="lead">{article.summary}</p>
          <div className="review-panel">
            <ShieldCheck size={22} />
            <div>
              <p>
                <strong>{w.author}:</strong> {article.author}
              </p>
              <p>
                <strong>{w.reviewer}:</strong> {article.reviewer}
              </p>
              <p>
                {w.reviewed}:{" "}
                <time dateTime={article.reviewedAt}>
                  {article.reviewedAt &&
                    new Intl.DateTimeFormat(locale, {
                      dateStyle: "medium",
                      timeZone: "UTC",
                    }).format(new Date(article.reviewedAt))}
                </time>
              </p>
            </div>
          </div>
          <PortableText value={blocks} components={components} />
          {!!article.references?.length && (
            <section className="references">
              <h2>{w.references}</h2>
              <ol>
                {article.references.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} rel="noopener noreferrer">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}
          <div className="notice">{w.disclaimer}</div>
          <div className="share-controls">
            <button onClick={share}>
              <Share2 size={16} />
              {w.share}
            </button>
            <button onClick={copyLink}>
              {status === w.copied ? <Check size={16} /> : <Copy size={16} />}{" "}
              {w.copy}
            </button>
            <span role="status">{status}</span>
          </div>
        </article>
      </div>
      {related.length > 0 && (
        <section className="related-articles">
          <h2>{w.related}</h2>
          <div className="content-grid">
            {related.slice(0, 3).map((c) => (
              <Link
                className="content-card"
                key={c._id}
                href={`/${locale}/blog/${c.slug}/`}
              >
                <span className="eyebrow">{c.category}</span>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
