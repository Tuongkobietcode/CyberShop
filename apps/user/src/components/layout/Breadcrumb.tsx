import React from "react";
import { NavLink } from "react-router-dom";

const Breadcrumb = () => {
  const baseClass = "text-gray-500 hover:text-black transition-colors";
  const activeClass = "text-black font-medium";

  return (
    <div className="w-full h-[80px] bg-white flex items-center">
      <div className=" pl-20">
        <nav className="flex items-center text-sm gap-4">
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? activeClass : baseClass)}
          >
            Home
          </NavLink>

          <span className="text-gray-400">{">"}</span>

          {/* Catalog */}
          <NavLink
            to="/catalog"
            end
            className={({ isActive }) => (isActive ? activeClass : baseClass)}
          >
            Catalog
          </NavLink>

          <span className="text-gray-400">{">"}</span>

          {/* Smartphones */}
          <NavLink
            to="/catalog/smartphones"
            className={({ isActive }) => (isActive ? activeClass : baseClass)}
          >
            Smartphones
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
