import { FiPlus, FiChevronRight } from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Electronic",
    img: "Electronic.png",
  },
  {
    id: 2,
    name: "Fashion",
    img: "Fashion.png",
  },
  {
    id: 3,
    name: "Home",
    img: "Home.png",
  },
];

const products = [
  {
    id: 1,
    name: "Smart Fitness Tracker",
    price: "$39.99",
    img: "Smart.png",
  },
  {
    id: 2,
    name: "Leather Wallet",
    price: "$19.99",
    img: "Leather.png",
  },
  {
    id: 3,
    name: "Electric Hair Trimmer",
    price: "$34.99",
    img: "Hair.png",
  },
];

const AddNewProductWidget = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-1/3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <button className="flex items-center gap-1 text-blue-600 text-sm font-medium">
          <FiPlus />
          Add New
        </button>
      </div>

      {/* Categories */}
      <p className="text-sm text-gray-400 mb-5">Categories</p>
      <div className="space-y-2">
        {categories.map((item) => (
          <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex items-center gap-3">
              <img src={item.img} alt={item.name} className="w-10 h-10" />
              <span className="font-medium">{item.name}</span>
            </div>
            <FiChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>

      <button className="text-blue-600 text-sm mt-3 w-full text-center">
        See more
      </button>

      {/* Products */}
      <p className="text-sm text-gray-500 mt-4 mb-2">Product</p>
      <div className="space-y-3">
        {products.map((item) => (
          <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <img src={item.img} alt={item.name} className="w-12 h-12" />
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-green-600 text-sm font-semibold">
                  {item.price}
                </p>
              </div>
            </div>

            <button className="flex items-center gap-1 bg-[#4EA674] text-white px-3 py-1.5 rounded-full text-sm hover:bg-green-600 cursor-pointer">
              <FiPlus />
              Add
            </button>
          </div>
        ))}
      </div>

      <button className="text-blue-600 text-sm mt-3 w-full text-center">
        See more
      </button>
    </div>
  );
};

export default AddNewProductWidget;
