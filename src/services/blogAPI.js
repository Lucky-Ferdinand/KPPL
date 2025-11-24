import axios from 'axios';

const API_URL = "https://cxfpfizkkktfngagqvxr.supabase.co/rest/v1/blog";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnBmaXpra2t0Zm5nYWdxdnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODM2MzYsImV4cCI6MjA2NTk1OTYzNn0.vKYnT2I0DTy14-MsgWxz1S7CSrrr4SaQArwuBau1tv0";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const blogAPI = {
  async fetchBlogs() {
    const res = await axios.get(API_URL, { headers });
    return res.data;
  },

  async createBlog(data) {
    const res = await axios.post(API_URL, data, { headers });
    return res.data;
  },

  async deleteBlog(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updateBlog(id, data) {
    const res = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return res.data;
  },
};
