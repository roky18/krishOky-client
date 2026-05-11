import axiosInstance from "@/lib/axiosInstance";
import { IApiResponse, IItem } from "@/types/item";

export const getAllItems = async (
  params: Record<string, string | number | undefined>,
): Promise<IApiResponse<IItem[]>> => {
  const response = await axiosInstance.get("/items", { params });
  return response.data;
};

export const getSingleItem = async (
  id: string,
): Promise<IApiResponse<IItem>> => {
  const response = await axiosInstance.get(`/items/${id}`);
  return response.data;
};
