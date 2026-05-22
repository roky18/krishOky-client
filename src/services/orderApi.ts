import axiosInstance from "@/lib/axiosInstance";

export const createOrder = async (orderData: {
  items: { productId: string; quantity: number; price: number }[];
  totalPrice: number;
  shippingAddress: string;
}) => {
  const response = await axiosInstance.post("/orders", orderData);
  return response.data;
};

export const getMyOrders = async (userId: string) => {
  const response = await axiosInstance.get(`/orders/my-orders/${userId}`);
  return response.data;
};