import React from "react";
import cardImage from "../../../../assets/images/image65.png";

const CreditCardForm: React.FC = () => {
  return (
    <>
      <div className="mb-6">
        <img
          src={cardImage}
          alt="Credit Card"
          className="h-48 w-full rounded-xl object-scale-down"
        />
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Tên chủ thẻ"
          className="w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />

        <input
          type="text"
          placeholder="Số thẻ"
          className="w-full rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Ngày hết hạn"
            className="w-1/2 rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-1/2 rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked />
          Giống địa chỉ thanh toán
        </label>
      </div>
    </>
  );
};

export default CreditCardForm;
