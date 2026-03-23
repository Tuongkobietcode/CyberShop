import { http } from "@/services/http";
import type { CatalogCategory, CatalogProduct, CatalogProductFilters } from "./catalog.types";
import {
  getFallbackCategories,
  getFallbackProductFilters,
  getFallbackProducts,
} from "./catalog.fallback";

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
  try {
    const response = await http.get<ApiResponse<CatalogCategory[]>>("/categories", {
      params,
    });

    return response.data;
  } catch {
    return {
      success: true,
      message: "Fallback categories loaded locally",
      data: getFallbackCategories(Number(params?.limit || 0) || undefined),
    };
  }
}

export async function getCatalogProducts(
  params?: Record<string, string | number | boolean | Array<string | number | boolean>>
) {
  try {
    const response = await http.get<ApiResponse<CatalogProduct[]>>("/products", {
      params,
    });

    return response.data;
  } catch {
    return {
      success: true,
      message: "Fallback products loaded locally",
      data: getFallbackProducts(params),
    };
  }
}

export async function getCatalogProductFilters(
  params?: Record<string, string | number | boolean | Array<string | number | boolean>>
) {
  try {
    const response = await http.get<ApiResponse<CatalogProductFilters>>("/products/filters", {
      params,
    });

    return response.data;
  } catch {
    return {
      success: true,
      message: "Fallback product filters loaded locally",
      data: getFallbackProductFilters(params),
    };
  }
}
