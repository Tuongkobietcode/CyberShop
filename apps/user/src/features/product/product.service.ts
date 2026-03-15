import { http } from "@/services/http";
import type { ProductDetail } from "./product.types";
import type { ProductReview } from "./product-review.types";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

export async function getProductDetail(slug: string) {
  const response = await http.get<ApiResponse<ProductDetail>>(`/products/${slug}`);
  return response.data.data;
}

export async function getProductReviews(slug: string) {
  const response = await http.get<ApiResponse<ProductReview[]>>(
    `/products/${slug}/reviews`,
    {
      params: { page: 1, limit: 50 },
    }
  );

  return response.data.data;
}

type CreateReviewPayload = {
  rating: number;
  content: string;
};

export async function createProductReview(slug: string, payload: CreateReviewPayload) {
  const response = await http.post<ApiResponse<ProductReview>>(
    `/products/${slug}/reviews`,
    payload
  );

  return response.data.data;
}

