import { http } from "@/services/http";
import type { CatalogCategory, CatalogProduct } from "./catalog.types";

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

export async function getCatalogCategories(params?: Record<string, string | number | boolean>) {
  const response = await http.get<ApiResponse<CatalogCategory[]>>("/categories", {
    params,
  });

  return response.data;
}

export async function getCatalogProducts(params?: Record<string, string | number | boolean>) {
  const response = await http.get<ApiResponse<CatalogProduct[]>>("/products", {
    params,
  });

  return response.data;
}
