import LocalizedPage, {
  generateMetadata as localizedMetadata,
} from "./[locale]/[[...slug]]/page";

// Render the English homepage immediately, including for visitors without JavaScript.
// Its canonical URL remains /en/ so the two entry points do not compete in search.
export function generateMetadata() {
  return localizedMetadata({
    params: Promise.resolve({ locale: "en", slug: [] }),
  });
}

export default function Page() {
  return <LocalizedPage params={Promise.resolve({ locale: "en", slug: [] })} />;
}
