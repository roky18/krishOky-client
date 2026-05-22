import axiosInstance from "@/lib/axiosInstance";

// ১. প্রোডাক্ট ডেসক্রিপশন জেনারেশনের জন্য
export const generateAIContent = async (title: string) => {
  const { data } = await axiosInstance.post("/ai/generate-description", {
    title,
  });
  return data.data; // এখানে { bn: "...", en: "..." } পাবেন
};

// ২. চ্যাটবট মেসেজের জন্য
export const askAIChatbot = async (prompt: string) => {
  const { data } = await axiosInstance.post("/ai/chat", {
    prompt,
  });
  return data.data.reply;
};
