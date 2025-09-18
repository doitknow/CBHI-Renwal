import axios from "axios";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const baseUrl = "http://localhost:3011";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export const LoginApi = {
  async requestOtp({ countryCode = "251", phoneNumber }) {
    const fullPhoneNumber = `+${countryCode}${phoneNumber}`;
    const url = `${baseUrl}/api/otp/send?phoneNumber=${encodeURIComponent(fullPhoneNumber)}`;

    try {
      const response = await axios.post(url, {}, { headers });
      return response.status === 200;
    } catch (error) {
      console.error("Error requesting OTP:", error.response?.data || error.message);
      return false;
    }
  },
  
  async verifyOtp({ countryCode = "251", phoneNumber, otp }) {
    const fullPhone = `+${countryCode}${phoneNumber}`;
    const url = `${baseUrl}/api/otp/verify?phoneNumber=${encodeURIComponent(fullPhone)}&otp=${otp}`;

    try {
      const response = await axios.post(url, {}, { headers });
      // Adjust this check depending on the real API response format
      if (response.status === 200 && (response.data?.includes?.("successful") || response.data?.success)) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error.message);
      return false;
    }
  }
};

