import { FiFilter } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Apple iPhone 13",
    orders: 104,
    status: "stock",
    price: "$999.00",
    img: "/Iphone.png",
  },
  {
    id: 2,
    name: "Nike Air Jordan",
    orders: 56,
    status: "out",
    price: "$999.00",
    img: "/Nike.png",
  },
  {
    id: 3,
    name: "T-shirt",
    orders: 266,
    status: "stock",
    price: "$999.00",
    img: "Tshirt.png",
  },
  {
    id: 4,
    name: "Cross Bag",
    orders: 506,
    status: "stock",
    price: "$999.00",
    img: "CrossBag.png",
  },
];

const BestSellingProduct = () => {
  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Best selling product</h2>
        <button className="flex items-center gap-2 bg-[#4EA674] text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600">
          Filter
          <FiFilter />
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-4 bg-[#EAF8E7] rounded-xl px-4 py-3 text-sm text-gray-600 font-medium">
        <span>PRODUCT</span>
        <span>TOTAL ORDER</span>
        <span>STATUS</span>
        <span className="text-right mr-5">PRICE</span>
      </div>

      {/* Table rows */}
      <div>
        {products.map((item) => (
          <div className="grid grid-cols-4 items-center px-4 py-4">
            {/* Product */}
            <div className="flex items-center gap-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-10 h-10 rounded-lg bg-gray-100"
              />
              <span className="font-medium">{item.name}</span>
            </div>

            {/* Orders */}
            <span className="text-gray-700">{item.orders}</span>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  item.status === "stock" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span
                className={`text-sm font-medium ${
                  item.status === "stock" ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.status === "stock" ? "Stock" : "Stock out"}
              </span>
            </div>

            {/* Price */}
            <span className="font-semibold text-right text-gray-800">
              {item.price}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button className="px-6 py-1 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50">
          Details
        </button>
      </div>
    </div>
  );
};

export default BestSellingProduct;
