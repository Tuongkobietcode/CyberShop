import React from "react";
import vnpayLogo from "../../../../assets/images/vnpay.jpg";

const VnPayForm: React.FC = () => {
  return (
    <div className="rounded-xl p-6 text-center">
      <img
        src={vnpayLogo}
        alt="VNPay"
        className="mx-auto mb-3 h-50 object-contain"
      />

      <p className="mb-6 text-sm text-gray-600">
        Bạn sẽ được chuyển sang cổng thanh toán VNPay để hoàn tất giao dịch.
      </p>

      <button className="w-full rounded-md bg-black py-3 text-sm font-medium text-white">
        Thanh toán qua VNPay
      </button>
    </div>
  );
};

export default VnPayForm;
