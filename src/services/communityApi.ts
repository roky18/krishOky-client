import axiosInstance from "@/lib/axiosInstance";
import { IPost } from "@/interfaces/communityInterface";

export type CreatePostPayload = {
  user: string;
  title: string;
  desc: string;
  type: string;
  img?: string;
};

export const getAllPosts = async () => {
  const response = await axiosInstance.get("/community");
  return response.data;
};

export const createPost = async (
  postData: CreatePostPayload,
): Promise<IPost> => {
  const response = await axiosInstance.post("/community/create-post", postData);
  return response.data?.data || response.data;
};
