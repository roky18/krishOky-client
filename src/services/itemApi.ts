import axiosInstance from "@/lib/axiosInstance";
import { IApiResponse, IItem } from "@/types/item";

export const getAllItems = async (params: Record<string, string | number | undefined>): Promise<IApiResponse<IItem[]>> => {
  const response = await axiosInstance.get("/items", { params });
  return response.data;
};