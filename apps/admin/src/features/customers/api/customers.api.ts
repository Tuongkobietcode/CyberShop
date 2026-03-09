import { http } from "@/services/http";

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "vip";
  totalSpend: number;
  orderCount: number;
  addresses: Array<{
    fullName: string;
    phone: string;
    addressLine1: string;
    city: string;
    country: string;
    isDefault: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export async function getAdminCustomers(params?: Record<string, string | number>) {
  const response = await http.get<ApiResponse<AdminCustomer[]>>("/admin/customers", {
    params,
  });

  return response.data;
}
