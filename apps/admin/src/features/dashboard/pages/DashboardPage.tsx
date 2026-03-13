import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MoreHorizontal, Package2, ReceiptText, UsersRound } from "lucide-react";
import { resolveAssetUrl } from "@/utils/assets";
import { getDashboardSummary } from "../api/dashboard.api";
import type { DashboardSummary } from "../types";
import { getAdminOrders } from "@/features/orders/api/orders.api";
import { getAdminProducts } from "@/features/products/api/products.api";
import { getAdminCategories } from "@/features/categories/api/categories.api";

function formatMoney(value: number) {
  return `$${Math.round(value / 16000).toLocaleString("en-US")}`;
}

function formatCompact(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}

const surface = "rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.04)]";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [products, setProducts] = useState<Array<{ id: string; name: string; image: string; price: number }>>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string; image: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [nextSummary, ordersResponse, productsResponse, categoriesResponse] = await Promise.all([
          getDashboardSummary(),
          getAdminOrders({ limit: 100 }),
          getAdminProducts({ limit: 8 }),
          getAdminCategories({ limit: 6 }),
        ]);

        setSummary(nextSummary);
        setCancelledCount(
          ordersResponse.data.filter((order) => order.orderStatus.toLowerCase().includes("cancel")).length
        );
        setProducts(
          productsResponse.data.slice(0, 5).map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
          }))
        );
        setCategories(
          categoriesResponse.data.slice(0, 4).map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
          }))
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const overviewCards = useMemo(() => {
    if (!summary) return [];
    return [
      {
        title: "Total Sales",
        value: formatMoney(summary.overview.totalRevenue),
        subtitle: "Live from paid and completed orders",
        accent: "text-black",
      },
      {
        title: "Total Orders",
        value: formatCompact(summary.overview.totalOrders),
        subtitle: "All order activity in the system",
        accent: "text-black",
      },
      {
        title: "Pending & Cancelled",
        value: `${summary.overview.pendingOrders} / ${cancelledCount}`,
        subtitle: "Orders needing review or recovery",
        accent: "text-black",
      },
    ];
  }, [cancelledCount, summary]);

  const revenueMax = Math.max(...(summary?.recentRevenue.map((item) => item.revenue) || [1]));

  if (loading) {
    return <div className="rounded-3xl border border-dashed border-slate-200 px-6 py-12 text-center text-sm text-slate-500">Loading dashboard...</div>;
  }

  if (!summary) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-12 text-center text-sm text-rose-600">Dashboard data is unavailable.</div>;
  }

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-3">
        {overviewCards.map((card) => (
          <section key={card.title} className={surface}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-black/45">{card.title}</p>
                <p className={["mt-5 text-[2.4rem] font-semibold tracking-[-0.06em]", card.accent].join(" ")}>{card.value}</p>
                <p className="mt-2 max-w-[18rem] text-sm leading-6 text-black/45">{card.subtitle}</p>
              </div>
              <button type="button" className="rounded-full p-2 text-black/35 transition hover:bg-black/5 hover:text-black">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black/60">
              Last 7 days
            </div>
          </section>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.55fr_0.92fr]">
        <section className={surface}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-black/45">Report for this week</p>
              <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Revenue overview</h2>
            </div>
            <div className="inline-flex rounded-full bg-[#f5f5f5] p-1 text-sm">
              <span className="rounded-full bg-white px-4 py-2 font-semibold text-black shadow-sm">This week</span>
              <span className="px-4 py-2 text-black/45">Last week</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Metric label="Customers" value={formatCompact(summary.overview.totalCustomers)} icon={<UsersRound className="h-4 w-4" />} />
            <Metric label="Products" value={formatCompact(summary.overview.totalProducts)} icon={<Package2 className="h-4 w-4" />} />
            <Metric label="Orders" value={formatCompact(summary.overview.totalOrders)} icon={<ReceiptText className="h-4 w-4" />} />
            <Metric label="Revenue" value={formatMoney(summary.overview.totalRevenue)} icon={<ArrowRight className="h-4 w-4" />} />
          </div>

          <div className="mt-10 grid h-[300px] grid-cols-6 items-end gap-4 rounded-[24px] bg-[#f7f7f8] px-5 pb-6 pt-10">
            {summary.recentRevenue.slice(0, 6).map((point) => {
              const height = Math.max(18, Math.round((point.revenue / revenueMax) * 220));
              return (
                <div key={point._id} className="flex h-full flex-col justify-end gap-3">
                  <div className="flex-1 rounded-t-[22px] bg-[linear-gradient(180deg,rgba(17,17,17,0.12),rgba(17,17,17,0.02))] p-[1px]">
                    <div className="flex h-full items-end rounded-t-[21px] bg-white/70 px-2 pb-2">
                      <div className="w-full rounded-[16px] bg-[linear-gradient(180deg,#111,#4b5563)]" style={{ height }} />
                    </div>
                  </div>
                  <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-black/35">{point._id}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="space-y-6">
          <section className={surface}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-black/45">Top Products</p>
                <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Current movers</h2>
              </div>
              <Link to="/admin/products" className="text-sm font-semibold text-black/45 transition hover:text-black">All product</Link>
            </div>

            <div className="mt-6 space-y-4">
              {products.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-black/10 px-5 py-10 text-center text-sm text-black/45">
                  No products available yet.
                </div>
              ) : (
                products.map((product, index) => (
                  <article key={product.id} className="flex items-center gap-4 rounded-[22px] bg-[#f7f7f8] p-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                      <img src={resolveAssetUrl(product.image)} alt={product.name} className="max-h-14 object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-black">{product.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-black/35">Top {index + 1}</p>
                    </div>
                    <p className="text-sm font-semibold text-black">{formatMoney(product.price)}</p>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className={surface}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-black/45">Categories</p>
                <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Discover</h2>
              </div>
              <Link to="/admin/categories" className="text-sm font-semibold text-black/45 transition hover:text-black">Open</Link>
            </div>
            <div className="mt-6 space-y-3">
              {categories.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-black/10 px-5 py-10 text-center text-sm text-black/45">
                  No categories available yet.
                </div>
              ) : (
                categories.map((category) => (
                  <article key={category.id} className="flex items-center gap-4 rounded-[22px] bg-[#f7f7f8] p-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white">
                      <img src={resolveAssetUrl(category.image)} alt={category.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-semibold text-black">{category.name}</p>
                      <p className="mt-1 text-sm text-black/42">Live in shared catalog</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <section className={surface}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-black/45">Transactions</p>
              <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">Recent order flow</h2>
            </div>
            <Link to="/admin/orders" className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-semibold text-black transition hover:bg-black hover:text-white">Details</Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-black/8">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#f7f7f8] text-black/48">
                <tr>
                  <th className="px-5 py-4 font-medium">Order</th>
                  <th className="px-5 py-4 font-medium">Customer</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Amount</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-sm text-black/45">
                      No recent orders yet.
                    </td>
                  </tr>
                ) : (
                  summary.recentOrders.map((order) => (
                    <tr key={order.id} className="border-t border-black/6">
                      <td className="px-5 py-4 font-semibold text-black">{order.orderCode}</td>
                      <td className="px-5 py-4 text-black/65">{order.customerName}</td>
                      <td className="px-5 py-4 text-black/42">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4 font-medium text-black">{formatMoney(order.totalAmount)}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">{order.orderStatus}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className={surface}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-black/45">Quick add</p>
              <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-black">New product</h2>
            </div>
            <Link to="/admin/products/new" className="text-sm font-semibold text-black/45 transition hover:text-black">Open form</Link>
          </div>

          <div className="mt-6 space-y-4">
            {products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/10 px-5 py-10 text-center text-sm text-black/45">
                Seed products to use this quick-add section.
              </div>
            ) : (
              products.slice(0, 3).map((product) => (
                <article key={product.id} className="flex items-center gap-4 rounded-[22px] border border-black/8 p-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f7f8]">
                    <img src={resolveAssetUrl(product.image)} alt={product.name} className="max-h-12 object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-black">{product.name}</p>
                    <p className="mt-1 text-sm text-black/45">{formatMoney(product.price)}</p>
                  </div>
                  <Link to="/admin/products/new" className="inline-flex h-10 items-center justify-center rounded-full bg-black px-4 text-sm font-semibold text-white transition hover:bg-[#1f1f1f]">Add</Link>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <article className="rounded-[22px] bg-[#f7f7f8] p-4">
      <div className="flex items-center gap-2 text-black/35">{icon}<span className="text-xs uppercase tracking-[0.18em]">{label}</span></div>
      <p className="mt-4 text-[1.8rem] font-semibold tracking-[-0.05em] text-black">{value}</p>
    </article>
  );
}

