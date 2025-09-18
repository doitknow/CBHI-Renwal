import axios from "axios";

// Use VITE_ prefix in your .env file: VITE_ACCESS_TOKEN=your_token_here
const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

if (!TOKEN) {
  console.warn("⚠️ VITE_ACCESS_TOKEN is not defined in your .env file!");
}

const BASE_URL = "http://localhost:3011/api/v1/insured";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export const SearchApi = {
  async searchUserById(cbhiId) {
    try {
      const encodedSearch = encodeURIComponent(cbhiId);
      const url = `${BASE_URL}?search=${encodedSearch}&page=1&limit=25&sortBy=enrollmentDate&sortDirection=desc`;

      const { data } = await axios.get(url, { headers });

      if (!data?.content || data.content.length === 0) {
        throw new Error("No matching user found");
      }

      const firstUser = data.content[0];

      // Call directly via object name
      const installments = await SearchApi.getInstallments(firstUser.id);

      return {
        user: firstUser,
        installments,
      };
    } catch (err) {
      console.error("❌ searchUserById error:", err);
      throw err;
    }
  },

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

