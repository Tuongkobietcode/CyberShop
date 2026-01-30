import React, { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  sku: string;
  quantity: number;
}

const initialItems: CartItem[] = [
  {
    id: "1",
    name: "Apple iPhone 14 Pro Max 128GB Deep Purple",
    price: 1399,
    image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_m_18_1_3_2.png",
    sku: "#2513529819384",
    quantity: 1,
  },
  {
    id: "2",
    name: "AirPods Max Silver",
    price: 549,
    image: "https://zshop.vn/images/detailed/50/1607450772_1610234.jpg",
    sku: "#3545398345",
    quantity: 1,
  },
  {
    id: "3",
    name: "Apple Watch Series 9 GPS 41mm Starlight Aluminum",
    price: 399,
    image: "https://www.didongmy.com/vnt_upload/product/11_2023/thumbs/(600x600)_apple_watch_series_9_45_mm_xanh_den_1.jpg",
    sku: "#3632324",
    quantity: 1,
  },
];

export const ShoppingCart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const increaseQty = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-6"
          >
            <div className="flex gap-4 items-center w-2/3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />

              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.sku}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                    onClick={() => decreaseQty(item.id)}
                    className="text-xl px-2"
                >
                    −
                </button>

                <div className="w-8 h-8 border rounded flex items-center justify-center text-sm">
                    {item.quantity}
                </div>

                <button
                    onClick={() => increaseQty(item.id)}
                    className="text-xl px-2"
                >
                    +
                </button>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-lg font-semibold">
                ${item.price * item.quantity}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 text-xl"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
