import { http } from "@/services/http";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ContactInquiryPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContactInquiry(payload: ContactInquiryPayload) {
  const response = await http.post<
    ApiResponse<{
      id: string;
      status: string;
      createdAt: string;
    }>
  >("/contact", payload);

  return response.data;
}
