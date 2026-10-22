import type { Locale } from "./content";
// Owner-supplied clinic-wide information. Applies to both operating branches, as confirmed by the owner.
export const clinic = {
  phone: "0961 548 101",
  telephone: "+251961548101",
  professionalName: "Abdi Jibril",
  professionalTitle: "Health Officer",
};
export const clinicCopy: Record<
  Locale,
  {
    call: string;
    contact: string;
    hours: string;
    availability: string;
    confirm: string;
    services: string;
    intro: string;
    items: { title: string; description: string }[];
  }
> = {
  en: {
    call: "Call the clinic",
    contact: "Clinic contact",
    hours: "Open 24 hours",
    availability: "24-hour clinic availability",
    confirm:
      "Call to confirm your preferred branch and the specific test or medicine you need before travelling.",
    services: "From consultation to treatment",
    intro:
      "Consultation, testing, treatment and medicine provision. Specific tests and medicines depend on clinical assessment and availability.",
    items: [
      {
        title: "Consultation",
        description:
          "Discuss your health concerns with a healthcare professional.",
      },
      {
        title: "Testing",
        description:
          "Testing to support assessment. Call to confirm the specific test you need.",
      },
      {
        title: "Treatment & medicines",
        description:
          "Treatment and medicine provision following clinical assessment, subject to availability.",
      },
    ],
  },
  om: {
    call: "Kiliinikaaf bilbilaa",
    contact: "Quunnamtii kiliinikaa",
    hours: "Sa’aatii 24 banaa",
    availability: "Tajaajila kiliinikaa sa’aatii 24",
    confirm:
      "Deemsa dura damee filattan, qorannoo ykn qoricha isin barbaachisu bilbilaan mirkaneeffadhaa.",
    services: "Gorsa irraa hanga yaalaatti",
    intro:
      "Gorsa fayyaa, qorannoo, yaalaa fi kenninsa qorichaa. Qorannoon fi qorichi murtii ogeessa fayyaatii fi argama isaanii irratti hundaa’u.",
    items: [
      {
        title: "Gorsa fayyaa",
        description:
          "Waa’ee rakkoo fayyaa keessanii ogeessa fayyaa waliin mari’adhaa.",
      },
      {
        title: "Qorannoo",
        description:
          "Qorannoo fayyaa. Qorannoo isin barbaachisu bilbilaan mirkaneeffadhaa.",
      },
      {
        title: "Yaalaa fi qoricha",
        description:
          "Murtii ogeessaatiin yaalaa fi kenninsa qorichaa, akka argama isaatti.",
      },
    ],
  },
  am: {
    call: "ወደ ክሊኒኩ ይደውሉ",
    contact: "የክሊኒኩ መገናኛ",
    hours: "24 ሰዓት ክፍት",
    availability: "የ24 ሰዓት ክሊኒክ አገልግሎት",
    confirm: "ከመጓዝዎ በፊት የሚፈልጉትን ቅርንጫፍ፣ ምርመራ ወይም መድኃኒት በስልክ ያረጋግጡ።",
    services: "ከምክር እስከ ሕክምና",
    intro:
      "የጤና ምክር፣ ምርመራ፣ ሕክምና እና መድኃኒት አቅርቦት። የምርመራና የመድኃኒት አገልግሎቶች በባለሙያ ግምገማና በአቅርቦት ላይ ይወሰናሉ።",
    items: [
      { title: "የጤና ምክር", description: "ስለ ጤና ጉዳዮችዎ ከጤና ባለሙያ ጋር ይወያዩ።" },
      { title: "ምርመራ", description: "የጤና ምርመራ። የሚፈልጉትን ምርመራ በስልክ ያረጋግጡ።" },
      {
        title: "ሕክምና እና መድኃኒት",
        description: "በባለሙያ ግምገማና በአቅርቦት መሠረት ሕክምናና መድኃኒት ይሰጣል።",
      },
    ],
  },
};

export const branchContacts: Record<
  string,
  { phone: string; telephone: string }[]
> = {
  "qollo-sirrii": [
    { phone: "0913 575 829", telephone: "+251913575829" },
    { phone: "0917 393 054", telephone: "+251917393054" },
  ],
};
