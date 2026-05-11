// src/types/item.ts

export interface IMultilingualString {
  bn: string;
  en: string;
}

export interface IItem {
  _id: string;
  title: IMultilingualString;
  description: IMultilingualString;
  price: number;
  category: "Seeds" | "Fertilizer" | "Tools" | "Branding" | "Others";
  image?: string;
  stock: number;
  sellerId: string | { _id: string; name: string; image?: string }; // Populate হলে অবজেক্ট হবে
  createdAt: string;
  updatedAt: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
