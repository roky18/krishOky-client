import axiosInstance from "@/lib/axiosInstance";

// সব পোস্ট ফেচ করার সার্ভিস
export const getAllPosts = async () => {
  const response = await axiosInstance.get("/community");
  return response.data;
};

// নতুন পোস্ট ক্রিয়েট করার সার্ভিস
export const createPost = async (postData: {
  user: string;
  title: string;
  desc: string;
  type: string;
  img?: string;
}) => {
  const response = await axiosInstance.post("/community/create-post", postData);
  return response.data;
};