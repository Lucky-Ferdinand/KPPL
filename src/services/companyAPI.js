import axios from "axios";

const API_URL = "https://cxfpfizkkktfngagqvxr.supabase.co/rest/v1/company_profiles";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnBmaXpra2t0Zm5nYWdxdnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODM2MzYsImV4cCI6MjA2NTk1OTYzNn0.vKYnT2I0DTy14-MsgWxz1S7CSrrr4SaQArwuBau1tv0";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const companyAPI = {
  async fetchCompanies() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createCompany(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async updateCompany(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data;
  },

  async deleteCompany(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async searchCompanies(keyword) {
    const response = await axios.get(
      `${API_URL}?company_name=ilike.*${encodeURIComponent(keyword)}*`,
      { headers }
    );
    return response.data;
  }
};
