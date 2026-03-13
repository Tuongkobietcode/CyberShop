import { http } from "@/services/http";
import type { CartItem, CheckoutAddress, PaymentMethod, ShippingMethod } from "@/features/cart/cart.types";

type CreateOrderPayload = {
  items: CartItem[];
  address: CheckoutAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function createOrder(payload: CreateOrderPayload) {
  const response = await http.post<ApiResponse<{ id: string; orderCode: string }>>("/orders", {
    customer: {
      name: payload.address.fullName,
      email: payload.address.email,
      phone: payload.address.phone,
    },
    shippingAddress: {
      fullName: payload.address.fullName,
      phone: payload.address.phone,
      addressLine1: payload.address.addressLine1,
      addressLine2: payload.address.addressLine2,
      ward: payload.address.ward,
      district: payload.address.district,
      city: payload.address.city,
      country: payload.address.country,
      postalCode: payload.address.postalCode,
    },
    paymentMethod: payload.paymentMethod === "card" ? "card" : payload.paymentMethod === "paypal_credit" ? "bank_transfer" : "card",
    items: payload.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
    note: `Shipping method: ${payload.shippingMethod.label}`,
  });

  return response.data.data;
}
