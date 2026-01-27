import React from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import {
  MdPhoneIphone,
  MdComputer,
  MdWatch,
  MdCameraAlt,
  MdHeadphones,
  MdSportsEsports,
} from "react-icons/md";
import logo from "../../assets/images/Logo.png";

const Header = () => {
  return (
    <header className="w-full">
      {/* =w= TOP HEADER =w= */}
      <div className="bg-white border-b">
        <div className="max-w-full h-[80px] flex items-center gap-10 px-30">
          {/* LOGO */}
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>

          {/* SEARCH */}
          <div className="flex items-center bg-gray-100 rounded-md px-4 h-11 flex-1">
            <FiSearch className="text-gray-400 text-lg mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* RIGHT MENU */}
          <div className="flex items-center gap-12">
            {/* NAV */}
            <nav className="flex gap-6 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact Us" },
                { to: "/blog", label: "Blog" },
              ].map((item) => (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-medium border-b-2 border-black pb-1"
                      : "text-gray-500 hover:text-black"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* ICONS */}
            <div className="flex items-center gap-6 text-xl">
              <NavLink to="/wishlist">
                <FiHeart />
              </NavLink>
              <NavLink to="/cart">
                <FiShoppingCart />
              </NavLink>
              <NavLink to="/login">
                <FiUser />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* =w= BOTTOM HEADER =w= */}
      <div className="bg-[#2E2E2E]">
        <div className="max-w-full h-11 flex items-center justify-center">
          <div className="flex items-center text-sm text-gray-400">
            {[
              { to: "/phones", label: "Phones", icon: <MdPhoneIphone /> },
              { to: "/computers", label: "Computers", icon: <MdComputer /> },
              { to: "/watches", label: "Smart Watches", icon: <MdWatch /> },
              { to: "/cameras", label: "Cameras", icon: <MdCameraAlt /> },
              {
                to: "/headphones",
                label: "Headphones",
                icon: <MdHeadphones />,
              },
              { to: "/gaming", label: "Gaming", icon: <MdSportsEsports /> },
            ].map((item) => (
              <NavLink
                to={item.to}
                className="relative flex items-center gap-2 px-14 hover:text-white
                     after:absolute after:right-0 after:top-1/2
                     after:-translate-y-1/2 after:h-5 after:w-px
                     after:bg-gray-600 last:after:hidden"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
