import { useMemo, useState } from "react";
import { MoreVertical, PlusCircle } from "lucide-react";
import { Pagination } from "@/components/data-display/Pagination";
import { CategoryChips } from "../components/CategoryChips";
import { CategoriesTable } from "../components/CategoriesTable";
import { CategoriesToolbar } from "../components/CategoriesToolbar";
import type { CategoryItem, ProductItem, ProductStatus } from "../types";

export function CategoriesPage() {
  const categories: CategoryItem[] = [
    {
      id: "1",
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&q=80",
    },
    {
      id: "2",
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80",
    },
    {
      id: "3",
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&q=80",
    },
    {
      id: "4",
      name: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&q=80",
    },
    {
      id: "5",
      name: "Sports & Outdoors",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&q=80",
    },
    {
      id: "6",
      name: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&q=80",
    },
    {
      id: "7",
      name: "Health & Fitness",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80",
    },
    {
      id: "8",
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&q=80",
    },
  ];

  const allRows: ProductItem[] = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      createdDate: "01-01-2025",
      order: 25,
      status: "featured",
    },
    {
      id: "2",
      name: "Men's T-Shirt",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
      createdDate: "01-01-2025",
      order: 20,
      status: "normal",
    },
    {
      id: "3",
      name: "Men's Leather Wallet",
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80",
      createdDate: "01-01-2025",
      order: 35,
      status: "sale",
    },
    {
      id: "4",
      name: "Memory Foam Pillow",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80",
      createdDate: "01-01-2025",
      order: 40,
      status: "featured",
    },
    {
      id: "5",
      name: "Coffee Maker",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=200&q=80",
      createdDate: "01-01-2025",
      order: 45,
      status: "normal",
    },
    {
      id: "6",
      name: "Casual Baseball Cap",
      image:
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&q=80",
      createdDate: "01-01-2025",
      order: 55,
      status: "sale",
    },
    {
      id: "7",
      name: "Full HD Webcam",
      image:
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=200&q=80",
      createdDate: "01-01-2025",
      order: 20,
      status: "out_of_stock",
    },
    {
      id: "8",
      name: "Smart LED Color Bulb",
      image:
        "https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&q=80",
      createdDate: "01-01-2025",
      order: 16,
      status: "featured",
    },
    {
      id: "9",
      name: "Desk Lamp Minimal",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&q=80",
      createdDate: "01-01-2025",
      order: 10,
      status: "normal",
    },
    {
      id: "10",
      name: "Travel Backpack",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
      createdDate: "01-01-2025",
      order: 35,
      status: "sale",
    },
  ];

  const [status, setStatus] = useState<ProductStatus>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const totalPages = 24;

  const filteredRows = useMemo(() => {
    return allRows.filter((row) => {
      const matchSearch = row.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "all" ? true : row.status === status;

      return matchSearch && matchStatus;
    });
  }, [allRows, search, status]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Discover
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[5px] bg-[#62b56f] px-5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
          >
            <PlusCircle size={18} />
            Add Product
          </button>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[5px] border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700"
          >
            More Action
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <CategoryChips categories={categories} />

      <div className="space-y-4 rounded-[5px] border border-slate-200 bg-white p-5">
        <CategoriesToolbar
          active={status}
          onChange={(nextStatus) => {
            setStatus(nextStatus);
            setPage(1);
          }}
          search={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          totalProducts={145}
        />

        <CategoriesTable rows={pagedRows} />

        <div className="px-1">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}