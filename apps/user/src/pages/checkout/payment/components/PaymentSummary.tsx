import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro Max 128Gb",
    price: 1399000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUjIVj-V8ofg8brSJ09II0tdD11P-krTlElQ&s",
  },
  {
    id: 2,
    name: "AirPods Max Silver",
    price: 549000,
    image:
      "https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/2022_10_28_638025679601008898_iPhone%2014%20(13).jpg",
  },
  {
    id: 3,
    name: "Apple Watch Series 9 GPS 41mm",
    price: 399000,
    image:
      "https://cdn2.fptshop.com.vn/unsafe/828x0/filters:format(webp):quality(75)/2022_10_28_638025679601008898_iPhone%2014%20(13).jpg",
  },
];

const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

const PaymentSummary: React.FC = () => {
  const subtotal = products.reduce((sum, p) => sum + p.price, 0);
  const tax = 50000;
  const shipping = 29000;
  const total = subtotal + tax + shipping;

  return (
    <div className="max-w-md rounded-xl border border-gray-50 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Summary</h2>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-lg bg-gray-100 p-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-10 w-10 rounded-md object-cover"
              />
              <span className="text-sm font-medium">{product.name}</span>
            </div>
            <span className="text-sm font-semibold">
              {formatVND(product.price)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 text-sm">
        <p className="font-medium">Address</p>
        <p className="text-gray-600">123 Nguyễn Trãi, Ba Đình Hà Nội</p>
      </div>

      <div className="mt-3 text-sm">
        <p className="font-medium">Shipping method</p>
        <p className="text-gray-600">Free</p>
      </div>

      <div className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatVND(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span>{formatVND(tax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated shipping & Handling</span>
          <span>{formatVND(shipping)}</span>
        </div>

        <div className="flex justify-between border-t pt-3 text-base font-semibold">
          <span>Total</span>
          <span>{formatVND(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
