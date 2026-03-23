import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useAuth } from "@/features/auth/auth.context";
import { useCart } from "@/features/cart/cart.context";
import { getVnpayPaymentStatus } from "@/features/order/order.service";

type ResultTone = "loading" | "success" | "pending" | "failed" | "invalid";

function formatMoney(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

const toneStyles: Record<ResultTone, string> = {
  loading: "border-sky-200 bg-sky-50 text-sky-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  failed: "border-rose-200 bg-rose-50 text-rose-700",
  invalid: "border-slate-200 bg-slate-100 text-slate-700",
};

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const { refreshProfile } = useAuth();
  const { clearCart } = useCart();
  const [tone, setTone] = useState<ResultTone>("loading");
  const [order, setOrder] = useState<Awaited<ReturnType<typeof getVnpayPaymentStatus>>["order"] | null>(null);
  const didHandleSuccess = useRef(false);

  const mode = searchParams.get("mode");
  const provider = searchParams.get("provider");
  const txnRef = searchParams.get("txnRef");
  const orderCode = searchParams.get("orderCode");
  const initialResult = searchParams.get("result");

  useEffect(() => {
    let cancelled = false;
    let timeoutId = 0;

    async function handleSuccessOnce() {
      if (didHandleSuccess.current) {
        return;
      }

      didHandleSuccess.current = true;
      clearCart();
      await refreshProfile();
    }

    async function loadStatus(attempt = 0) {
      if (!txnRef) {
        setTone(initialResult === "invalid" ? "invalid" : "failed");
        return;
      }

      try {
        const next = await getVnpayPaymentStatus(txnRef);

        if (cancelled) {
          return;
        }

        setOrder(next.order);

        if (next.order.paymentStatus === "paid") {
          setTone("success");
          await handleSuccessOnce();
          return;
        }

        if (next.order.paymentStatus === "failed") {
          setTone("failed");
          await refreshProfile();
          return;
        }

        setTone(initialResult === "success" ? "pending" : "failed");

        if (!next.isFinal && initialResult === "success" && attempt < 7) {
          timeoutId = window.setTimeout(() => {
            void loadStatus(attempt + 1);
          }, 2000);
        }
      } catch {
        if (!cancelled) {
          setTone(initialResult === "invalid" ? "invalid" : "failed");
        }
      }
    }

    if (mode === "cod") {
      setTone("success");
      return () => {
        cancelled = true;
      };
    }

    if (provider !== "vnpay") {
      setTone("invalid");
      return () => {
        cancelled = true;
      };
    }

    if (initialResult === "invalid") {
      setTone("invalid");
      return () => {
        cancelled = true;
      };
    }

    void loadStatus();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [clearCart, initialResult, mode, provider, refreshProfile, txnRef]);

  const headline = useMemo(() => {
    if (mode === "cod") {
      return "Cash on delivery order created";
    }

    switch (tone) {
      case "success":
        return "VNPay payment confirmed";
      case "pending":
        return "VNPay is finalizing your payment";
      case "failed":
        return "VNPay payment failed";
      case "invalid":
        return "Invalid VNPay response";
      default:
        return "Checking payment status";
    }
  }, [mode, tone]);

  const description = useMemo(() => {
    if (mode === "cod") {
      return "Your order is now in the store system and will be paid when it is delivered.";
    }

    switch (tone) {
      case "success":
        return "The backend has received a valid payment confirmation and your order is ready for fulfillment.";
      case "pending":
        return "The return redirect has completed, but the storefront is still waiting for the server-to-server IPN confirmation.";
      case "failed":
        return "VNPay reported that this transaction was not completed successfully. You can go back to checkout and try again.";
      case "invalid":
        return "The checksum or callback data was not valid, so the storefront cannot trust this payment result.";
      default:
        return "The storefront is checking the latest status returned from the backend.";
    }
  }, [mode, tone]);

  if (mode !== "cod" && provider !== "vnpay") {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="bg-[#fafafa] pb-20">
      <Breadcrumb items={[{ label: "Home", to: "/home" }, { label: "Payment result" }]} />

      <div className="mx-auto max-w-[920px] px-4 py-12 sm:px-6 lg:px-8">
        <article className="rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
          <div className={["inline-flex rounded-full border px-4 py-2 text-sm font-semibold", toneStyles[tone]].join(" ")}>
            {tone === "loading" ? "Checking" : tone.toUpperCase()}
          </div>

          <h1 className="mt-6 text-[2.4rem] font-semibold tracking-[-0.05em] text-black">{headline}</h1>
          <p className="mt-4 max-w-[42rem] text-[1.05rem] leading-8 text-black/62">{description}</p>

          <div className="mt-10 grid gap-4 rounded-[28px] bg-[#f7f7f8] p-6 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/35">Txn Ref</p>
              <p className="mt-2 text-lg font-semibold text-black">{txnRef || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/35">Order code</p>
              <p className="mt-2 text-lg font-semibold text-black">{order?.orderCode || orderCode || "Pending"}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/35">Payment status</p>
              <p className="mt-2 text-lg font-semibold text-black">{mode === "cod" ? "pending" : order?.paymentStatus || tone}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/35">Total</p>
              <p className="mt-2 text-lg font-semibold text-black">{order ? formatMoney(order.totalAmount) : "Updating"}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/profile" className="inline-flex h-13 items-center justify-center rounded-xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-[#1d1d1d]">
              View my orders
            </Link>
            <Link to="/products" className="inline-flex h-13 items-center justify-center rounded-xl border border-black px-6 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
              Continue shopping
            </Link>
            {tone === "failed" || tone === "invalid" ? (
              <Link to="/checkout/payment" className="inline-flex h-13 items-center justify-center rounded-xl border border-rose-300 px-6 text-sm font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white">
                Try payment again
              </Link>
            ) : null}
          </div>
        </article>
      </div>
    </div>
  );
}
