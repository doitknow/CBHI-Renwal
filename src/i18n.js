import { ref } from "vue";

const saved = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;
export const lang = ref(saved || "en");

export const setLang = (l) => {
  lang.value = l;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("lang", l);
  }
};

export const translations = {
  en: {
    hours: "🕒 | Monday - Sunday, 24/7",
    phone: "📞 (+251 965 914 422)",
    country: "Ethiopia",
    cbhi: "CBHI",
    cbhiFull: "COMMUNITY BASED HEALTH INSURANCE",
    cbhiDesc: "Your gateway to secure, simplified, and inclusive health insurance services in Addis Ababa",
    searchPlaceholder: "Search by CBHI ID to renew your membership",
    searchBtn: "Search",
    downloadGoogle: "Download on Google Play",
    downloadApple: "Download on the App Store"
  },
  am: {
    hours: "🕒 | ሰኞ - እሑድ፣ 24/7",
    phone: "📞 (+251 965 914 422)",
    country: "ኢትዮጵያ",
    cbhi: "ማህበረሰብ ተደጋጋሚ ጤና ኢንሹራንስ",
    cbhiFull: "Community Based Health Insurance",
    cbhiDesc: "በአዲስ አበባ ላይ የሚገኝ የተስማሚ እና የማኅበረሰብ ጤና ኢንሹራንስ አገልግሎትዎ",
    searchPlaceholder: "የCBHI መታወቂያ ቁጥር በመጠቀም እንደገና ይቀጥሉ",
    searchBtn: "ፈልግ",
    downloadGoogle: "በGoogle Play ይውሰዱ",
    downloadApple: "በApp Store ይውሰዱ"
  }
};
