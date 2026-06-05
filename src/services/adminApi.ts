import axiosInstance from "@/lib/axiosInstance";

export type AdminUserRole = "admin" | "user";

export type AdminUser = {
  _id?: string;
  id?: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role?: AdminUserRole | string;
  createdAt?: string;
};

export type DashboardSummary = {
  totalUsers?: number;
  totalAdmins?: number;
  totalOrders?: number;
  totalProducts?: number;
};

const authHeaders = (accessToken?: string) => ({
  headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
});

export const getDashboardSummary = async (accessToken?: string) => {
  const response = await axiosInstance.get(
    "/admin/dashboard-summary",
    authHeaders(accessToken),
  );
  return response.data;
};

export const getAdminUsers = async (accessToken?: string) => {
  const response = await axiosInstance.get("/admin/users", authHeaders(accessToken));
  return response.data;
};

export const updateUserRole = async (
  userId: string,
  role: AdminUserRole,
  accessToken?: string,
) => {
  const response = await axiosInstance.patch(
    `/admin/users/${userId}/role`,
    { role },
    authHeaders(accessToken),
  );
  return response.data;
};
