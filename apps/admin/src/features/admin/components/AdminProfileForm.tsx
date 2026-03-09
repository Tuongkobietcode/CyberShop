import React from "react";
import { Edit3, Calendar, ChevronDown, EyeOff } from "lucide-react";

const AdminProfileForm: React.FC = () => {
  return (
    <div className="lg:col-span-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">Profile Update</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <Edit3 size={16} /> Edit
        </button>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
          className="w-16 h-16 rounded-full object-cover"
          alt="Profile"
        />
        <div className="flex gap-3">
          <button className="bg-[#52a37a] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#438a66]">
            Upload New
          </button>
          <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            Delete
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup label="First Name" defaultValue="Thanh" />
        <InputGroup label="Last Name" defaultValue="Hoàng" />
        <InputGroup
          label="Password"
          defaultValue="password123"
          type="password"
          isPassword
        />
        <InputGroup
          label="Phone Number"
          defaultValue="(406) 555-0120"
          type="tel"
        />
        <InputGroup
          label="E-mail"
          defaultValue="thanh.hoang@example.com"
          type="email"
        />
        <InputGroup
          label="Date of Birth"
          defaultValue="12- January- 1999"
          icon={<Calendar size={18} />}
        />

        <div className="md:col-span-2">
          <InputGroup label="Location" defaultValue="Thanh xuân hà nội" />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-600 block mb-2">
            Credit Card
          </label>
          <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded-full opacity-80"></div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-80"></div>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                843-4359-4444
              </span>
            </div>
            <ChevronDown size={18} className="text-gray-400" />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-600 block mb-2">
            Biography
          </label>
          <div className="relative group">
            <textarea
              rows={4}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm focus:outline-none"
              placeholder="Enter a biography about you"
            />
            <Edit3
              size={18}
              className="absolute bottom-4 right-4 text-gray-400 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const InputGroup = ({
  label,
  defaultValue,
  type = "text",
  isPassword = false,
  icon = null,
}: any) => (
  <div>
    <label className="text-xs font-semibold text-gray-600 block mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
        {isPassword && <EyeOff size={18} />}
      </div>
    </div>
  </div>
);

export default AdminProfileForm;
