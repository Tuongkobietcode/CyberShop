import { ChevronDown, Calendar } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PricingSection = () => {
  // Danh sách tiền tệ
  const currencies = [
    {
      country: "USA",
      symbol: "$",
      flag: "https://flagcdn.com/w40/us.png",
    },
    {
      country: "Vietnam",
      symbol: "VND",
      flag: "https://flagcdn.com/w40/vn.png",
    },
  ];

  // State lưu loại tiền đang chọn
  const [selected, setSelected] = useState(currencies[0]);

  // State mở dropdown
  const [open, setOpen] = useState(false);

  // State lưu giá sản phẩm
  const [price, setPrice] = useState<string>("");

  // State lưu giá giảm
  const [discount, setDiscount] = useState<string>("");

  // state ngày bắt đầu
  const [startDate, setStartDate] = useState<Date | null>(null);

  // state ngày kết thúc
  const [endDate, setEndDate] = useState<Date | null>(null);

  // ==============================
  // Hàm format tiền tệ
  // ==============================
  const formatMoney = (value: number) => {
    if (!value) return "";

    // VND không có số thập phân
    if (selected.symbol === "VND") {
      return new Intl.NumberFormat("vi-VN", {
        maximumFractionDigits: 0,
      }).format(value);
    }

    // USD chỉ hiện thập phân khi cần
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(value);
  };
  // ==============================
  // Tính giá sau khi giảm
  // ==============================
  const salePrice: number =
    price && discount
      ? Math.max(parseFloat(price) - parseFloat(discount), 0)
      : 0;

  return (
    <div className="flex flex-col max-w-full p-5">
      {/* ==============================
          Tiêu đề
      ============================== */}
      <p className="font-semibold text-2xl">Pricing</p>

      {/* ==============================
          Product Price
      ============================== */}
      <p className="text-[#023337] font-semibold text-base mt-5 mb-2">
        Product Price
      </p>

      <div className="relative flex items-center bg-[#F9FAFB] border border-gray-300 rounded-xl px-4 py-3">
        {/* Ký hiệu tiền */}
        <span className="text-lg font-medium text-[#023337]">
          {selected.symbol}
        </span>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-400 mx-3"></div>

        {/* Input nhập giá */}
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="outline-none text-lg flex-1 text-[#023337] bg-transparent"
        />

        {/* Divider */}
        <div className="h-6 w-px bg-gray-400 mx-3"></div>

        {/* Dropdown chọn tiền tệ */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img
            src={selected.flag}
            alt={selected.country}
            className="w-6 h-4 object-cover"
          />

          <ChevronDown size={18} className="text-gray-600" />
        </div>

        {/* Menu dropdown */}
        {open && (
          <div className="absolute right-2 top-14 bg-white border rounded-lg shadow-md w-36">
            {currencies.map((item) => (
              <div
                key={item.country}
                onClick={() => {
                  setSelected(item);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img src={item.flag} className="w-5 h-3" />
                <span>{item.symbol}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==============================
          Discount + Tax
      ============================== */}
      <div className="flex gap-6 mt-6">
        {/* Discounted Price */}
        <div className="w-2/3">
          <div className="flex">
            <p className="text-[#023337] font-semibold text-base">
              Discounted Price
            </p>
            <span className="ml-1 text-gray-500">(Optional)</span>
          </div>

          {/* Box giảm giá */}
          <div className="flex items-center justify-between bg-[#F9FAFB] border border-gray-300 rounded-xl px-4 py-3 mt-3">
            <div className="flex items-center gap-3">
              {/* Ký hiệu tiền */}
              <div className="bg-green-100 text-[#023337] font-semibold px-3 py-2 rounded-lg">
                {selected.symbol}
              </div>

              {/* Input nhập số giảm */}
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="bg-transparent outline-none text-lg text-[#023337] w-24"
              />
            </div>

            {/* Hiển thị giá sau khi giảm */}
            <p className="text-[#023337] font-semibold whitespace-nowrap">
              Sale = {selected.symbol}
              {formatMoney(salePrice)}
            </p>
          </div>
        </div>

        {/* ==============================
            Tax Included
        ============================== */}
        <div className="w-1/3">
          <p className="text-[#023337] font-semibold text-base">Tax Included</p>

          <div className="flex flex-col gap-2 mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tax" defaultChecked />
              <span className="text-[#023337] font-medium">Yes</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tax" />
              <span className="text-gray-500 font-medium">No</span>
            </label>
          </div>
        </div>
      </div>

      {/* ==============================
          Expiration
      ============================== */}
      <div className="mt-8">
        <p className="text-[#023337] font-semibold text-base mb-3">
          Expiration
        </p>

        <div className="flex gap-6">
          {/* Start */}
          <div className="flex items-center justify-between w-1/2 bg-[#F9FAFB] border border-gray-300 rounded-xl px-4 py-3">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              placeholderText="Start"
              onFocus={(e) => e.target.blur()}
              className="bg-transparent outline-none text-[#023337] flex-1"
            />

            <Calendar size={20} className="text-[#023337]" />
          </div>

          {/* End */}
          <div className="flex items-center justify-between w-1/2 bg-[#F9FAFB] border border-gray-300 rounded-xl px-4 py-3">
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              placeholderText="End"
              minDate={startDate ?? undefined}
              onFocus={(e) => e.target.blur()}
              className="bg-transparent outline-none text-[#023337] flex-1"
            />

            <Calendar size={20} className="text-[#023337]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
