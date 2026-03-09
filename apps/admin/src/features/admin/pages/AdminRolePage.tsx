import React from "react";

import AdminProfileCard from "../components/AdminProfileCard";
import ChangePasswordForm from "../components/ChangePasswordForm";
import AdminProfileForm from "../components/AdminProfileForm";

const AdminRolePage: React.FC = () => {
  return (
    <div className="min-h-screen  text-[#1a3331]">
      <h1 className="text-2xl font-bold mb-6">About section</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 ">
        <div className="lg:col-span-4 space-y-6">
          <AdminProfileCard />
          <ChangePasswordForm />
        </div>

        <AdminProfileForm />
      </div>
    </div>
  );
};

export default AdminRolePage;
