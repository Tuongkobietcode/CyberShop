import { useEffect, useMemo, useState } from "react";
import { CreditCard, MoreHorizontal, Search } from "lucide-react";
import { getAdminOrders } from "@/features/orders/api/orders.api";

const surface = "rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]";

type TransactionTab = "all" | "completed" | "pending" | "canceled";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

export default function TransactionsPage() {
  const [orders, setOrders] = useState<Awaited<ReturnType<typeof getAdminOrders>>["data"]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TransactionTab>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await getAdminOrders({ limit: 100 });
        setOrders(response.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const keyword = `${order.customerName} ${order.customerEmail} ${order.paymentMethod}`.toLowerCase();
      const status = order.paymentStatus.toLowerCase();
      const tabMatch = tab === "all" ? true : tab === "completed" ? status === "paid" : tab === "pending" ? status !== "paid" && !status.includes("cancel") : status.includes("cancel");
      return tabMatch && keyword.includes(search.toLowerCase());
    });
  }, [orders, search, tab]);

  const revenue = orders.filter((item) => item.paymentStatus === "paid").reduce((sum, item) => sum + item.totalAmount, 0);
  const completed = orders.filter((item) => item.paymentStatus === "paid").length;
  const pending = orders.filter((item) => item.paymentStatus !== "paid").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[0.78fr_0.78fr_1.44fr]">
        <MetricCard label="Total Revenue" value={formatMoney(revenue)} />
        <MetricCard label="Completed Transactions" value={completed.toLocaleString("en-US")} />

        <section className={surface}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-black/45">Payment Method</p>
              <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Primary card</h2>
            </div>
            <button type="button" className="rounded-full p-2 text-black/35 transition hover:bg-black/5 hover:text-black">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[24px] bg-[linear-gradient(135deg,#111,#4b5563,#111)] p-6 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-white/55">Cyber card</p>
              <p className="mt-10 text-[2rem] font-semibold tracking-[0.18em]">2345</p>
              <div className="mt-10 flex items-center justify-between text-sm text-white/72">
                <span>Transactions {completed}</span>
                <span>Revenue {formatMoney(revenue)}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[24px] bg-[#f7f7f8] p-5">
              <div>
                <p className="text-sm font-medium text-black/45">Status</p>
                <p className="mt-2 text-xl font-semibold text-black">Active</p>
              </div>
              <div className="space-y-2 text-sm text-black/58">
                <p>Transactions: {orders.length}</p>
                <p>Pending review: {pending}</p>
                <p>Revenue: {formatMoney(revenue)}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={surface}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="inline-flex rounded-full bg-[#f5f5f5] p-1 text-sm">
            {([
              ["all", `All order (${orders.length})`],
              ["completed", "Completed"],
              ["pending", "Pending"],
              ["canceled", "Canceled"],
            ] as const).map(([value, label]) => (
              <button key={value} type="button" onClick={() => setTab(value)} className={["rounded-full px-4 py-2 font-medium transition", tab === value ? "bg-white text-black shadow-sm" : "text-black/45 hover:text-black"].join(" ")}>
                {label}
              </button>
            ))}
          </div>

          <label className="flex h-12 min-w-[280px] items-center gap-3 rounded-2xl bg-[#f5f5f5] px-4 text-black/35">
            <Search className="h-4 w-4" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search payment history" className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/35" />
          </label>
        </div>

        {loading ? (
          <div className="mt-6 rounded-2xl border border-dashed border-black/10 px-6 py-12 text-center text-sm text-black/45">Loading transactions...</div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-[24px] border border-black/8">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#f7f7f8] text-black/48">
                <tr>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Total</th>
                  <th className="px-5 py-4 font-medium">Method</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-black/45">
                      No transactions match the current filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id} className="border-t border-black/6">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-black">{order.customerName}</p>
                        <p className="mt-1 text-sm text-black/42">{order.customerEmail}</p>
                      </td>
                      <td className="px-5 py-4 text-black/42">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4 font-medium text-black">{formatMoney(order.totalAmount)}</td>
                      <td className="px-5 py-4 text-black/65">{order.paymentMethod}</td>
                      <td className="px-5 py-4">
                        <span className={["inline-flex items-center gap-2", order.paymentStatus === "paid" ? "text-emerald-600" : "text-amber-600"].join(" ")}>
                          <span className={["h-2 w-2 rounded-full", order.paymentStatus === "paid" ? "bg-emerald-500" : "bg-amber-500"].join(" ")} />
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
                          <CreditCard className="h-4 w-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <section className={surface}>
      <p className="text-sm font-medium text-black/45">{label}</p>
      <p className="mt-5 text-[2.4rem] font-semibold tracking-[-0.06em] text-black">{value}</p>
      <p className="mt-2 text-sm text-black/42">Last 7 days</p>
    </section>
  );
}
