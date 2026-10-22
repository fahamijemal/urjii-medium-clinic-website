import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const metadata = {
  title: "Urjii Medium Clinic | Choose your language",
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <html lang="om">
      <body>
        <main className="language-entry">
          <div className="container">
            <div className="language-panel">
              <img
                src="/logo.jpg"
                alt="Asxaa Kiliinika Urjii"
                width={88}
                height={88}
              />
              <span className="eyebrow">KILIINIKA GIDDU-GALEESSA URJII</span>
              <h1>Baga nagaan dhuftaan.</h1>
              <p>
                <span lang="om">Afaan filadhaa</span> ·{" "}
                <span lang="am">ቋንቋ ይምረጡ</span> ·{" "}
                <span lang="en">Choose your language</span>
              </p>
              <div className="language-options">
                <Link href="/om/" lang="om">
                  <span>
                    Afaan Oromoo<small>Gara marsariitii keenyaatti</small>
                  </span>
                  <ArrowUpRight size={20} />
                </Link>
                <Link href="/am/" lang="am">
                  <span>
                    አማርኛ<small>ወደ ድረ ገጻችን ይግቡ</small>
                  </span>
                  <ArrowUpRight size={20} />
                </Link>
                <Link href="/en/" lang="en">
                  <span>
                    English<small>Visit our website</small>
                  </span>
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
