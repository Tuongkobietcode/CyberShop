import { ChevronDown, Calendar } from "lucide-react";

const PricingSection = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Pricing</h2>

      {/* Product Price */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-teal-900 mb-2">
          Product Price
        </label>

        <div className="flex items-center justify-between w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-3">
          <input
            type="text"
            defaultValue="$999.89"
            className="bg-transparent outline-none w-full"
          />

          <div className="flex items-center gap-2 border-l pl-4 ml-4">
            <img
              src="https://flagcdn.com/w20/us.png"
              alt="US"
              className="w-5 h-4"
            />
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Discount + Tax */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-teal-900 mb-2">
            Discounted Price <span className="text-gray-400">(Optional)</span>
          </label>

          <div className="flex items-center gap-3 bg-gray-200 border border-gray-300 rounded-lg px-3 py-2">
            <div className="bg-gray-300 px-3 py-2 rounded">$</div>

            <input
              type="text"
              defaultValue="99"
              className="bg-transparent outline-none w-20"
            />

            <span className="ml-auto text-sm text-gray-700">Sale= $900.89</span>
          </div>
        </div>

        {/* Tax */}
        <div>
          <label className="block text-sm font-medium text-teal-900 mb-2">
            Tax Included
          </label>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="tax" defaultChecked />
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input type="radio" name="tax" />
              No
            </label>
          </div>
        </div>
      </div>

      {/* Expiration */}
      <div>
        <label className="block text-sm font-medium text-teal-900 mb-2">
          Expiration
        </label>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center justify-between bg-gray-200 border border-gray-300 rounded-lg px-4 py-3">
            <input
              type="text"
              placeholder="Start"
              className="bg-transparent outline-none"
            />
            <Calendar size={18} />
          </div>

          <div className="flex items-center justify-between bg-gray-200 border border-gray-300 rounded-lg px-4 py-3">
            <input
              type="text"
              placeholder="End"
              className="bg-transparent outline-none"
            />
            <Calendar size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
