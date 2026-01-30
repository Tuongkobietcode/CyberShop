import React, { useState } from "react";
import favoriteIcon from "../../../assets/icons/Favorite_duotone.png";
import likeIcon from "../../../assets/icons/Like.png";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro 512GB Gold (MQ233)",
    price: 1437,
    image:
      "https://img.vn.my-best.com/contents/48cb375765f1b555ed1819f27f1a5584.png",
  },
  {
    id: 2,
    name: "Apple iPhone 11 128GB White (MQ233)",
    price: 510,
    image:
      "https://www.tncstore.vn/media/product/250-8011-rix-g15-g513rm-hq055w.jpg",
  },
  {
    id: 3,
    name: "Apple iPhone 11 128GB White (MQ233)",
    price: 550,
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/444965480.jpeg",
  },
  {
    id: 4,
    name: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
    price: 1499,
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/444965480.jpeg",
  },
  {
    id: 5,
    name: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
    price: 1399,
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/444965480.jpeg",
  },
  {
    id: 6,
    name: "Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)",
    price: 1600,
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/444965480.jpeg",
  },
  {
    id: 7,
    name: "Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)",
    price: 1600,
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/444965480.jpeg",
  },
  {
    id: 8,
    name: "Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)",
    price: 1600,
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/444965480.jpeg",
  },
  {
    id: 9,
    name: "Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)",
    price: 1600,
    image:
      "https://cdn1.viettelstore.vn/Images/Product/ProductImage/444965480.jpeg",
  },
];

const ProductGrid: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const isLiked = favorites.has(product.id);

          return (
            <div
              key={product.id}
              className="bg-gray-50 rounded-2xl p-5 relative flex flex-col items-center"
            >
              <div className="w-full flex justify-end mb-4">
                <button onClick={() => toggleFavorite(product.id)}>
                  <img
                    src={isLiked ? likeIcon : favoriteIcon}
                    alt="favorite"
                    className="w-9 h-9 transition-transform hover:scale-110"
                  />
                </button>
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-60 h-60 object-contain mb-4"
              />

              <h3 className="text-sm text-center font-medium text-gray-900 leading-snug mb-2 line-clamp-2">
                {product.name}
              </h3>

              <p className="text-xl font-bold text-black mb-4">
                ${product.price}
              </p>

              <button className="mt-auto w-[70%] bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
