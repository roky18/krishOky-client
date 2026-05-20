import axiosInstance from "@/lib/axiosInstance";
import { IApiResponse, IItem } from "@/types/item";

export interface IFilterParams {
  searchTerm?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export const getAllItems = async (params?: IFilterParams) => {
  const { search, ...rest } = params || {};
  const searchTerm =
    search?.trim() || rest.searchTerm?.trim() || undefined;

  // Send both names so search works with either backend convention.
  const mappedParams = {
    ...rest,
    searchTerm,
    search: searchTerm,
  };

  const response = await axiosInstance.get("/items", { params: mappedParams });
  return response.data;
};

export const getSingleItem = async (
  id: string,
): Promise<IApiResponse<IItem>> => {
  const response = await axiosInstance.get(`/items/${id}`);
  return response.data;
};
