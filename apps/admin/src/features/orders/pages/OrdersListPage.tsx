import React from "react";

// images
import logo from "../../../assets/images/Logo.png";
import avatar from "../../../assets/images/Picture.png";

// icons
import toggleIcon from "../../../assets/icons/material-symbols_arrow-menu-close.png";
import dashboardIcon from "../../../assets/icons/Stroke.png";
import orderIcon from "../../../assets/icons/Vector.png";
import usersIcon from "../../../assets/icons/users.png";
import ticketIcon from "../../../assets/icons/ticket.png";
import categoryIcon from "../../../assets/icons/circle-square.png";
import transactionIcon from "../../../assets/icons/famicons_card-outline.png";
import brandIcon from "../../../assets/icons/star (1).png";
import addProductIcon from "../../../assets/icons/circle-plus.png";
import mediaIcon from "../../../assets/icons/material-symbols_image-outline copy 2.png";
import productListIcon from "../../../assets/icons/fluent-mdl2_product-list (1).png";
import reviewIcon from "../../../assets/icons/material-symbols_reviews-outline (1).png";
import adminRoleIcon from "../../../assets/icons/user-profile-circle (1).png";
import settingIcon from "../../../assets/icons/settings.png";
import logoutIcon from "../../../assets/icons/ic_round-logout.png";
import shopLeftIcon from "../../../assets/icons/Frame.png";
import shopRightIcon from "../../../assets/icons/link-external.png";

type MenuItemProps = {
  label: string;
  icon: string;
  active?: boolean;
};

const MenuItem = ({ label, icon, active }: MenuItemProps) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-sm
      ${
        active ? "bg-green-500 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
  >
    <img src={icon} alt="" className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white flex flex-col justify-between">
      {/* TOP */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5">
          <img src={logo} alt="Logo" className="h-8" />
          <img
            src={toggleIcon}
            alt="toggle"
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Menu */}
        <div className="px-3 space-y-1">
          <p className="text-xs text-gray-400 px-2 mt-4 mb-2">Main menu</p>

          <MenuItem icon={dashboardIcon} label="Dashboard" />
          <MenuItem icon={orderIcon} label="Order Management" active />
          <MenuItem icon={usersIcon} label="Customers" />
          <MenuItem icon={ticketIcon} label="Coupon Code" />
          <MenuItem icon={categoryIcon} label="Categories" />
          <MenuItem icon={transactionIcon} label="Transaction" />
          <MenuItem icon={brandIcon} label="Brand" />

          <p className="text-xs text-gray-400 px-2 mt-5 mb-2">Product</p>

          <MenuItem icon={addProductIcon} label="Add Products" />
          <MenuItem icon={mediaIcon} label="Product Media" />
          <MenuItem icon={productListIcon} label="Product List" />
          <MenuItem icon={reviewIcon} label="Product Reviews" />

          <p className="text-xs text-gray-400 px-2 mt-5 mb-2">Admin</p>

          <MenuItem icon={adminRoleIcon} label="Admin role" />
          <MenuItem icon={settingIcon} label="Control Authority" />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <p className="text-sm font-medium">Dealport</p>
            <p className="text-xs text-gray-400">Mark@thedesigner...</p>
          </div>
          <img
            src={logoutIcon}
            alt="logout"
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-200">
          <div className="flex items-center gap-2 text-sm">
            <img src={shopLeftIcon} alt="" className="w-4 h-4" />
            <span>Your Shop</span>
          </div>
          <img src={shopRightIcon} alt="" className="w-4 h-4" />
        </div>
      </div>
    </aside>
  );
}
