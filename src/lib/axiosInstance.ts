import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // কুকি হ্যান্ডেল করার জন্য জরুরি
});

export default axiosInstance;