import axios from "axios";

const BASE_URL = "http://localhost:3011/api/payment";

export const initiatePayment = async (userId,payload) => {
  // replace with your backend base URL if needed
  const response = await axios.post(`http://cfbt.kenemapharmacy.com/api/payment/initiate/${userId}`, payload);
  return response.data;
};

export async function verifyPayment(request) {
  const response = await axios.post(`${BASE_URL}/verify`, request);
  return response.data;
}

export async function getPaymentHistory() {
  const response = await axios.get(`${BASE_URL}/history`);
  return response.data;
}

export async function getPaymentStatus(psr) {
  const response = await axios.get(`${BASE_URL}/status/${psr}`);
  return response.data;
}
