import axios from "axios";

// Use VITE_ prefix in your .env file: VITE_ACCESS_TOKEN=your_token_here
const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

if (!TOKEN) {
  console.warn("⚠️ VITE_ACCESS_TOKEN is not defined in your .env file!");
}

const BASE_URL = "https://cfbt.kenemapharmacy.com/api/v1/insured";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export const InstallmentSummary = {

async getInstallments(insuredId) {
    try {
      const url = `${BASE_URL}/${insuredId}/installments/summary`;
      const { data } = await axios.get(url, { headers });
      return data || {};
    } catch (err) {
      console.error("❌ getInstallments error:", err);
      throw err;
    }
  },
};