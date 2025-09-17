import axios from "axios";

const baseUrl = "http://cfbt.kenemapharmacy.com";

export const LoginApi = {
  async requestOtp({phoneNumber }) {
    const fullPhoneNumber = `+${251}${phoneNumber}`;
    const url = `${baseUrl}/api/otp/send?phoneNumber=${encodeURIComponent(fullPhoneNumber)}`;

    try {
      const response = await axios.post(url, {}, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.status === 200;
    } catch (error) {
      console.error("Error requesting OTP:", error);
      return false;
    }
  },

  async verifyOtp({ countryCode, phoneNumber, otp }) {
    const fullPhone = `+${countryCode}${phoneNumber}`;
    const url = `${baseUrl}/api/otp/verify?phoneNumber=${encodeURIComponent(fullPhone)}&otp=${otp}`;

    try {
      const response = await axios.post(url);
      if (response.status === 200 && response.data.includes("successful")) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return false;
    }
  }
};
