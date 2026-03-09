import { FiSearch } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Apple iPhone 13",
    code: "#FXZ-4567",
    price: "$999.00",
    img: "/Iphone.png",
  },
  {
    id: 2,
    name: "Nike Air Jordan",
    code: "#FXZ-4567",
    price: "$72.40",
    img: "/Nike.png",
  },
  {
    id: 3,
    name: "T-shirt",
    code: "#FXZ-4567",
    price: "$35.40",
    img: "/Tshirt.png",
  },
  {
    id: 4,
    name: "Assorted Cross Bag",
    code: "#FXZ-4567",
    price: "$80.00",
    img: "/CrossBag.png",
  },
];

const TopProduct = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-1/4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Top Products</h3>
        <button className="text-sm text-blue-500">All product</button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-3 py-2 text-sm bg-gray-100 rounded-xl "
        />
      </div>

      {/* Product list */}
      <div className="space-y-4">
        {products.map((item) => (
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            {/* Left */}
            <div className="flex items-center gap-3">
              <img
                src={item.img}
                className="w-10 h-10 rounded-lg bg-gray-100"
              />
              <div>
                <p className="font-medium text-sm text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-400">Item: {item.code}</p>
              </div>
            </div>

            {/* Price */}
            <span className="font-semibold text-sm text-gray-800">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProduct;
