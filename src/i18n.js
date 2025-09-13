// src/i18n.js
import { ref } from "vue";

const saved = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;
export const lang = ref(saved || "en");

export const setLang = (l) => {
  lang.value = l;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("lang", l);
  }
};

// ✅ Translations
export const translations = {
  en: {
    hours: "🕒 | Monday - Sunday, 24/7",
    phone: "📞 (+251 901525354)",
    cbhi: "CBHI",
    cbhiFull: "COMMUNITY BASED HEALTH INSURANCE",
    cbhiDesc: "Your gateway to secure, simplified, and inclusive health insurance services in Addis Ababa",
    searchPlaceholder: "Search by CBHI ID to renew your membership",
    searchBtn: "Search",

    // Renewal page
    renewalDetails: "Renewal Details",
    householdHead: "Household Head",
    amount: "Amount",
    renewalFee: "Renewal Fee",
    insuredFee: "Insured Fee",
    dependantsFee: "Dependants Fee",
    penaltyFee: "Penalty Fee",
    otherFee: "Other Fee",
    totalPayment: "Total Payment",
    renewBtn: "Renew",

    completePayment: "Complete Your Payment",
    accountNumber: "Account Number",
    enterAccountNumber: "Enter your account number",
    accountFound: "Account found",
    payNow: "Pay Now",
    selectPaymentMethod: "Select Your Payment Method",
    payWithChapa: "Pay with Chapa",
    payWithSiinqee: "Pay with Siinqee",
    securePayment: "Secure payment through your account",
    AMH: "Amharic",
    COMMUNITY_BASED_HEALTH_INSURANCE: "COMMUNITY BASED HEALTH INSURANCE",
  },
  አማ: {
    hours: "🕒 | ሰኞ - እሑድ፣ 24/7",
    phone: "📞 (+251 901525354)",
    cbhi: "ማህበረሰብ ተደጋጋሚ ጤና ኢንሹራንስ",
    cbhiFull: "Community Based Health Insurance",
    cbhiDesc: "በአዲስ አበባ የሚገኝ ቀላል እና ማህበረሰብ የተመሰረተ ጤና ኢንሹራንስ",
    searchPlaceholder: "በCBHI መታወቂያ ቁጥር በመፈለግ እንደገና ይቀጥሉ",
    searchBtn: "ፈልግ",
    AMH: "አማርኛ",
    Ethiopia: "Ethiopia",

    // Renewal page
    renewalDetails: "የእድሳት መረጃ",
    householdHead: "አባውራ",
    amount: "መጠን",
    renewalFee: "የእድሳት ክፍያ",
    insuredFee: "የተከላከለ ክፍያ",
    dependantsFee: "የተጨማሪ አባላት ክፍያ",
    penaltyFee: "ቅጣት ክፍያ",
    otherFee: "ሌሎች ክፍያዎች",
    totalPayment: "ጠቅላላ ክፍያ",
    renewBtn: "የእድሳት ክፈል",
     completePayment: "ክፍያዎን ያሟሉ",
    accountNumber: "የመለያ ቁጥር",
    enterAccountNumber: "የመለያ ቁጥርዎን ያስገቡ",
    accountFound: "✅ መለያ ተገኝቷል",
    payNow: "አሁን ክፈል",
    selectPaymentMethod: "የክፍያ መንገድ ይምረጡ",
    payWithChapa: "በChapa ክፍያ ያከናወኑ",
    payWithSiinqee: "በSiinqee ባንክ ክፍያ ያከናወኑ",
    securePayment: "በመለያዎ አካውንት የተጠበቀ ክፍያ",
    Ethiopia: "ኢትዮጵያ",
    COMMUNITY_BASED_HEALTH_INSURANCE: "ማህበረሰብ አቀፍ የጤና መድን",
  },
  oro: {
  hours: "🕒 | Wiixata - Dilbata, 24/7",
  phone: "📞 (+251 901525354)",
  cbhi: "Tajaajila Fayyaa Hawaasaa (CBHI)",
  cbhiFull: "Community Based Health Insurance",
  cbhiDesc: "Balbala keessan fayyaa eegumsa, salphaa fi hirmaachisaa ta’eef Finfinnee keessatti",
  searchPlaceholder: "Maamiloota keessan haaromsuuf ID CBHI’n barbaadi",
  searchBtn: "Barbaadi",
  AMH: "Afaan Amaaraa",
  Ethiopia: "Itoophiyaa",

  // Renewal page
  renewalDetails: "Odeeffannoo Haaromsaa",
  householdHead: "Mataa Maatii",
  amount: "Hammamtaa",
  renewalFee: "Mindaa Haaromsaa",
  insuredFee: "Mindaa Inshuraansii",
  dependantsFee: "Mindaa Itti-fuufamtootaa",
  penaltyFee: "Mindaa Adabbii",
  otherFee: "Kaffaltii biroo",
  totalPayment: "Waliigala Kaffaltii",
  renewBtn: "Haaromsi",

  completePayment: "Kaffaltii kee xumuri",
  accountNumber: "Lakkoofsa Herregaa",
  enterAccountNumber: "Lakkoofsa herregaa kee galchi",
  accountFound: "✅ Herrega argame",
  payNow: "Amma kaffali",
  selectPaymentMethod: "Toofta Kaffaltii filadhu",
  payWithChapa: "Chapa’n kaffali",
  payWithSiinqee: "Siinqee’n kaffali",
  securePayment: "Kaffaltii nageenyaan herrega kee irra",
  AMH: "Afaan Oromoo",
  Ethiopia: "Itoophiyaa",
  COMMUNITY_BASED_HEALTH_INSURANCE: "Tajaajila Inshuraansii Fayyaa Hawaasummaa (CBHI)",
}

};


// ✅ Helper function
export const t = (key) => {
  return translations[lang.value]?.[key] || translations.en[key] || key;
};
