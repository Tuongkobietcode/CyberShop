import React from "react";
import { Edit3, Copy } from "lucide-react";

const AdminProfileCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="flex gap-2 text-gray-400">
          <Edit3 size={18} className="cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-4">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
            alt="Avatar"
            className="rounded-full object-cover w-full h-full border-2 border-gray-100"
          />
        </div>
        <h3 className="text-xl font-bold">Hoàng Minh Thành</h3>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <span>hoangminhthanh@example.com</span>
          <Copy size={14} className="cursor-pointer hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileCard;
