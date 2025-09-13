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
    phone: "📞 (+251 965 914 422)",
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
  },
  am: {
    hours: "🕒 | ሰኞ - እሑድ፣ 24/7",
    phone: "📞 (+251 965 914 422)",
    cbhi: "ማህበረሰብ ተደጋጋሚ ጤና ኢንሹራንስ",
    cbhiFull: "Community Based Health Insurance",
    cbhiDesc: "በአዲስ አበባ የሚገኝ ቀላል እና ማህበረሰብ የተመሰረተ ጤና ኢንሹራንስ",
    searchPlaceholder: "በCBHI መታወቂያ ቁጥር በመፈለግ እንደገና ይቀጥሉ",
    searchBtn: "ፈልግ",

    // Renewal page
    renewalDetails: "የእንደገና መረጃ",
    householdHead: "የቤተሰብ አለቃ",
    amount: "መጠን",
    renewalFee: "የእንደገና ክፍያ",
    insuredFee: "የተከላከለ ክፍያ",
    dependantsFee: "የተጨማሪ አባላት ክፍያ",
    penaltyFee: "ቅጣት ክፍያ",
    otherFee: "ሌሎች ክፍያዎች",
    totalPayment: "ጠቅላላ ክፍያ",
    renewBtn: "እንደገና ክፈል",
     completePayment: "ክፍያዎን ያሟሉ",
    accountNumber: "የመለያ ቁጥር",
    enterAccountNumber: "የመለያ ቁጥርዎን ያስገቡ",
    accountFound: "✅ መለያ ተገኝቷል",
    payNow: "አሁን ክፈል",
    selectPaymentMethod: "የክፍያ መንገድ ይምረጡ",
    payWithChapa: "በChapa ክፍያ ይከናወኑ",
    payWithSiinqee: "በSiinqee ክፍያ ይከናወኑ",
    securePayment: "በመለያዎ አካውንት የተጠበቀ ክፍያ",
  }
};

// ✅ Helper function
export const t = (key) => {
  return translations[lang.value]?.[key] || translations.en[key] || key;
};
