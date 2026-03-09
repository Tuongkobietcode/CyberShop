import React from "react";
import { EyeOff } from "lucide-react";

const ChangePasswordForm: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
      <div className="flex  items-center mb-6">
        <h2 className="text-lg font-semibold">Change Password</h2>
      </div>

      <div className="space-y-4 flex-1 flex flex-col">
        {[
          { label: "Current Password", forgot: true },
          { label: "New Password" },
          { label: "Re-enter Password" },
        ].map((item, idx) => (
          <div key={idx}>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">
              {item.label}
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <EyeOff
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              />
            </div>
          </div>
        ))}

        <div className="flex-1"></div>

        <button className="w-full bg-[#52a37a] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#438a66] transition-colors shadow-sm shadow-green-200">
          Save Change
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
