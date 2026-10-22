import type { Locale } from "./content";
export const ui = {
  om: {
    country: "Itoophiyaa",
    region: "Oromiyaa",
    clinicName: "Kiliinika Giddu-Galeessa",
    logo: "Asxaa Kiliinika Urjii",
    photo: "Suuraa damee Qollo Sirrii",
    founderPhoto: "Abdii Jibriil Muussaa, hundeessaa fi ogeessa fayyaa",
    services: "Tajaajiloota ilaalaa",
    quick: "Tajaajila isinitti dhiyaatu",
    open: "Dameewwan lamaan sa’aatii 24 banaa",
    call: "Bilbilaa",
    locations: "Dameewwan",
    contact: "Quunnamtii",
    hours: "Yeroo hojii",
    menuOpen: "Tarree bani",
    menuClose: "Tarree cufi",
    main: "Tarree ijoo",
    choose: "Afaan filadhaa",
  },
  en: {
    country: "Ethiopia",
    region: "Oromia",
    clinicName: "MEDIUM CLINIC",
    logo: "Urjii Medium Clinic logo",
    photo: "Qollo Sirrii branch photograph",
    founderPhoto: "Abdi Jibril, founder and Health Officer",
    services: "Explore our services",
    quick: "Care that is closer to home",
    open: "Both branches open 24 hours",
    call: "Call us",
    locations: "Locations",
    contact: "Contact",
    hours: "Opening hours",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    main: "Main",
    choose: "Choose your language",
  },
  am: {
    country: "ኢትዮጵያ",
    region: "ኦሮሚያ",
    clinicName: "መካከለኛ ክሊኒክ",
    logo: "የኡርጂ መካከለኛ ክሊኒክ አርማ",
    photo: "የቆሎ ሲሪ ቅርንጫፍ ፎቶ",
    founderPhoto: "አብዲ ጂብሪል ሙሳ፣ መስራች እና የጤና መኮንን",
    services: "አገልግሎቶቻችንን ይመልከቱ",
    quick: "በአቅራቢያዎ የጤና እንክብካቤ",
    open: "ሁለቱም ቅርንጫፎች 24 ሰዓት ክፍት ናቸው",
    call: "ይደውሉ",
    locations: "ቅርንጫፎች",
    contact: "መገናኛ",
    hours: "የስራ ሰዓት",
    menuOpen: "ምናሌ ክፈት",
    menuClose: "ምናሌ ዝጋ",
    main: "ዋና መዳረሻ",
    choose: "ቋንቋ ይምረጡ",
  },
};
export function branchText(slug: string, locale: Locale) {
  const q = slug === "qollo-sirrii";
  return locale === "am"
    ? {
        name: q ? "ቆሎ ሲሪ" : "ያቤሎ",
        district: q ? "በደሌ" : "ጋቺ",
        address: q
          ? "ቆሎ ሲሪ፣ በደሌ ወረዳ፣ ቡኖ በደሌ ዞን፣ ኦሮሚያ፣ ኢትዮጵያ"
          : "ያቤሎ (ማጋላ ሃዳ ሙጫ)፣ ጋቺ ወረዳ፣ ቡኖ በደሌ ዞን፣ ኦሮሚያ፣ ኢትዮጵያ",
      }
    : locale === "om"
      ? {
          name: q ? "Qollo Sirrii" : "Yabeelloo",
          district: q ? "Beddellee" : "Gachi",
          address: q
            ? "Magaalaa Qollo Sirrii, Aanaa Beddellee, Godina Bunnoo Beddellee, Oromiyaa, Itoophiyaa"
            : "Ganda Yabeelloo (Magaalaa Haadha Mucaa), Aanaa Gachi, Godina Bunnoo Beddellee, Oromiyaa, Itoophiyaa",
        }
      : {
          name: q ? "Qollo Sirrii" : "Yabeelloo",
          district: q ? "Beddellee" : "Gachi",
          address: q
            ? "Qollo Sirrii, Beddellee district, Bunnoo Beddellee, Oromia, Ethiopia"
            : "Yabeelloo (Magaalaa Haadha Mucaa), Gachi district, Bunnoo Beddellee, Oromia, Ethiopia",
        };
}
