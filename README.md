# Urjii Medium Clinic

Afaan Oromo-first, responsive Next.js/TypeScript website for the two active branches in Qollo Sirrii and Yabeelloo. English and Amharic interfaces are included. Static hosting; no patient database, visitor login, tracking or patient forms.

## Run locally

Node 24 and npm 11 were used for validation. `npm ci` installs pinned dependencies. Run `npm run dev` for development, `npm run build` to export to `out/`, `npm run typecheck` for TypeScript, and `npm test` after a build to validate static pages and internal links. `python3 -m http.server 3000 --directory out` serves the actual export.

The root page is a working language selector; `/om/` is the primary language. UI translations and confirmed branch information live in `src/lib/content.ts`. Styling uses Tailwind v4 plus a custom, responsive design system. System fonts avoid external font requests. The hero image is generated illustrative artwork, **not a photograph of a real branch**. The supplied chat photographs were not available as local image files; the site uses a typographic brand mark instead of claiming to reproduce the supplied logo.

## Content management

The site works without CMS credentials using the supplied clinic facts. Copy `.env.example` to `.env.local` for Next.js and set a Sanity project ID and dataset to connect published content. A public dataset needs no read token. `npm run studio` runs the separate authenticated Sanity Studio; set the same variables in the shell for Studio (for example, use a local shell environment loader). Create a free Sanity project through its dashboard, enable its authenticated Studio origin, and invite editors through Sanity. Never put patient data in this dataset.

Service, staff, article and community-activity schemas feed the public site at build time. Only published documents with `approved: true`, the matching `locale` and a slug appear. Articles additionally require a reviewer, review date and references. Staff consent is required by Studio validation. Editors must independently verify professional qualifications, factual accuracy, consent, sources and translations before approving; the flag is not a substitute for clinical review or a technical permissions boundary. List pages provide search and category filters. Detail pages render Portable Text. Additional clinic/settings/branch/legal/gallery/FAQ schemas are starter editorial models; those sections currently use the reviewed local content file rather than CMS overrides. No articles or service claims are seeded as published.

Translations are separate documents. Only matching-language documents display; articles are not silently translated. Use the same slug for genuine translations. Interface translations, proposed tagline, policies and clinic facts require clinic and native-language review before launch. The legal pages are initial operational notices and require local legal review.

## Cloudflare Pages deployment

1. Connect the GitHub repository in Cloudflare Pages. Use the static/Next.js static export preset, Node `24`, build command `npm ci && npm run build` and output directory `out`. This site needs no Workers adapter.
2. Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS production origin. Optionally set the two public Sanity variables from `.env.example`. Do not enter API secrets in `NEXT_PUBLIC_*` variables.
3. Preview the export and verify every language and branch before publishing. `public/_headers` supplies static security headers. Configure HTTPS and a custom domain in Cloudflare if desired.
4. Create a Cloudflare Pages deploy hook, keep its URL secret, and configure an authenticated Sanity webhook for published content changes. The deploy hook URL itself is a bearer capability: never commit it or expose it to clients. Select only published service/staff/article/activity changes; test publish, update and unpublish. A successful build is required to update this static site; content is not live immediately after editing.
5. Check `/robots.txt`, `/sitemap.xml`, canonical tags, social image and hreflang against the actual domain. Without `NEXT_PUBLIC_SITE_URL`, robots intentionally blocks indexing, metadata is noindex, and the sitemap is empty to prevent indexing a fictitious domain. Set an origin and rebuild to enable indexing.
6. Verify the real domain with Google Search Console using DNS and submit `/sitemap.xml`. Establish separate eligible Google Business Profiles using accurate branch names, clinic-approved phones, real hours and verified map locations. Do not infer coordinates from town names.

No external deployment, CMS account creation, webhook connection, domain purchase or publication has been performed by the implementation.

## Before public launch

Confirm registered spelling (Urjii/Urji), proposed tagline, founder biography and consent, translations and legal notices. Supply branch-specific verified phone numbers, opening hours, available services, professional credentials and consented staff photos. Confirm exact map pins before enabling directions. The signboard's apparent numbers/24-hour symbol were not treated as current branch-specific confirmation. No unsupported contact buttons, map pins, testimonials or service claims are published. Actual clinical articles require qualified review and sources. Configure the real domain and Sanity project, connect the deploy hook, then publish deliberately.

## Scope and next steps

This release includes home, about, services, team/founder, branch overview/detail, journal, community, contact and four policy pages in all three languages. Unpopulated sections have honest empty states. Article pages now include a heading-based table of contents, word-based reading-time estimate, review panel, source list, native sharing/copy-link controls and related articles. Staff listings support branch filters, including people assigned to both locations. Image galleries and CMS-driven global settings remain future enhancements. Search/filter behavior should also be tested with real reviewed CMS documents before launch. No Lighthouse score is claimed without measurement.

## Validation recorded in this workspace

Production static export and strict TypeScript checks pass. Four static-export tests verify representative routes, language attributes, JSON-LD, internal destinations and safe prelaunch indexing. Browser validation uses the actual Chromium-rendered export at 320, 390, 768 and 1440 pixels for the home, branch, founder and journal in all three languages, plus mobile menu navigation. No horizontal overflow or uncaught page errors were observed. Run `npm run test:browser` with the export server on port 3000 to repeat it. No live Sanity dataset, public deployment, formal WCAG audit or Lighthouse scoring has been verified.

## Visitor experience improvements

Sticky navigation retains the active section on detail pages; the mobile disclosure supports Escape to close and returns focus to its toggle. A direct mobile contact link and localized menu/skip labels improve navigation. Home/contact/branch pages include keyboard-operable, translated visit FAQs. Branch pages separate location, pre-visit and contact guidance. Empty catalog pages omit inactive search controls; populated lists provide result counts, clear/reset behavior, trimmed case-insensitive search and category or staff-branch filters. Public staff queries also enforce consent confirmation.

`npm run test:interactions` bundles an isolated synthetic fixture and tests staff search, branch filters, shared assignments, reset, article section links and absolute clipboard sharing in Chromium. Synthetic content never enters the public export or CMS. This does not replace live Sanity integration validation.

`npm run test:a11y` runs axe's WCAG A/AA rules against the home, Qollo Sirrii branch and journal in all three languages at 390px and 1440px. The current run reports no automated violations. Contrast fixes cover muted text, section labels, numbered steps and footer text. This limited automated result is not a full WCAG conformance claim; native-language review, assistive-technology testing and live CMS-content checks remain necessary.
