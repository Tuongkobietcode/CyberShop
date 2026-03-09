import { http } from "@/services/http";

export function getDashboardSummary() {
  return http.get("/admin/dashboard/summary");
}
