import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Pencil, ShoppingBag, CheckCircle, Truck, XCircle } from "lucide-react";

type Tab = "personal" | "orders";

export const CustomerDetailPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>("personal");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>

      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex gap-6 mb-6 border-b border-gray-200">

          <button
            onClick={() => setTab("personal")}
            className={`flex items-center gap-2 pb-3 border-b-2 hover:text-gray-700 ${
              tab === "personal"
                ? "border-black font-medium"
                : "border-transparent text-gray-400"
            }`}
          >
            <User size={18} />
            Personal Information
          </button>

          <button
            onClick={() => setTab("orders")}
            className={`flex items-center gap-2 pb-3 border-b-2 hover:text-gray-700 ${
              tab === "orders"
                ? "border-black font-medium"
                : "border-transparent text-gray-400"
            }`}
          >
            <ShoppingBag size={18} />
            Order History
          </button>
        </div>

        {tab === "personal" && (
          <>
            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-semibold">
                  J
                </div>

                <h2 className="text-xl font-semibold">John Anderson</h2>
              </div>

              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                <Pencil size={16} />
                Edit Profile
              </button>

            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-300 rounded-xl p-6">
                <p className="text-gray-700 mb-2 font-medium text-sm">
                  Total Orders
                </p>
                <p className="text-3xl font-semibold">12</p>
              </div>

              <div className="border border-gray-200 rounded-xl p-6 bg-gray-100">
                <p className="text-gray-700 mb-2 font-medium text-sm">
                  Total Spent
                </p>
                <p className="text-3xl font-semibold">$45,750</p>
              </div>
            </div>

            <div className="border rounded-xl p-6 border-gray-300">
              <h3 className="text-lg font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-medium">
                      john.anderson@email.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-gray-500 text-sm">Phone Number</p>
                    <p className="font-medium">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="text-gray-400" size={20} />
                  <div>
                    <p className="text-gray-500 text-sm">Address</p>
                    <p className="font-medium">
                      123 Main Street, New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "orders" && (
            <div className="space-y-6">
                {/* Order 1 */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
                        <div className="flex gap-12 text-sm">
                        <div>
                            <p className="text-gray-500">Order ID</p>
                            <p className="font-semibold">ORD001234</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Order Date</p>
                            <p className="font-semibold">Jan 28, 2026</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Total</p>
                            <p className="font-semibold">$12,500</p>
                        </div>
                        </div>

                        <span className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center">
                            <CheckCircle size={18} className="mr-1"/>
                            Delivered
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <div className="flex items-center gap-6">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNrBTqiD4cjTWJtlXEdaqgBVcMjxUwRhpy8e6gdvmjoeJQOBPd"
                                className="w-20 h-20 rounded-lg object-cover"
                            />

                            <div>
                                <p className="font-semibold text-lg">
                                iPhone 15 Pro Max 256GB
                                </p>
                                <p className="text-gray-500 text-sm">
                                Quantity: 1
                                </p>
                            </div>
                        </div>

                        <p className="font-semibold">$12,500</p>
                    </div>

                    <div className="flex justify-end gap-4 p-6">
                        <button className="border px-5 py-2 rounded-lg">
                            View Details
                        </button>

                        <button className="bg-black text-white px-5 py-2 rounded-lg">
                            Buy Again
                        </button>
                    </div>
                </div>

                {/* Order 2 */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
                        <div className="flex gap-12 text-sm">
                            <div>
                                <p className="text-gray-500">Order ID</p>
                                <p className="font-semibold">ORD001198</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Order Date</p>
                                <p className="font-semibold">Jan 15, 2026</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Total</p>
                                <p className="font-semibold">$25,800</p>
                            </div>
                        </div>

                        <span className="border px-4 py-2 rounded-lg text-sm flex items-center">
                            <Truck size={18} className="mr-1"/>
                            Shipping
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <div className="flex items-center gap-6">
                            <img
                                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
                                className="w-20 h-20 rounded-lg object-cover"
                            />

                            <div>
                                <p className="font-semibold text-lg">
                                MacBook Air M3 13" 16GB/512GB
                                </p>
                                <p className="text-gray-500 text-sm">
                                Quantity: 1
                                </p>
                            </div>
                        </div>

                        <p className="font-semibold">$25,800</p>
                    </div>

                    <div className="flex justify-end p-6">
                        <button className="border px-5 py-2 rounded-lg">
                        View Details
                        </button>
                    </div>
                </div>

                {/* Order 3 */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
                        <div className="flex gap-12 text-sm">
                            <div>
                                <p className="text-gray-500">Order ID</p>
                                <p className="font-semibold">ORD001076</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Order Date</p>
                                <p className="font-semibold">Jan 2, 2026</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Total</p>
                                <p className="font-semibold">$8,950</p>
                            </div>
                        </div>

                        <span className="border px-4 py-2 rounded-lg text-sm flex items-center bg-black text-white">
                            <CheckCircle size={18} className="mr-1"/>
                            Delivered
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <div className="flex items-center gap-6">
                            <img
                                src="https://u-mercari-images.mercdn.net/photos/m57060780981_1.jpg"
                                className="w-20 h-20 rounded-lg object-cover"
                            />

                            <div>
                                <p className="font-semibold text-lg">
                                AirPods Pro 2 (Type-C)
                                </p>
                                <p className="text-gray-500 text-sm">
                                Quantity: 1
                                </p>
                            </div>
                        </div>

                        <p className="font-semibold">$25,800</p>
                    </div>

                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <div className="flex items-center gap-6">
                            <img
                                src="https://cdn.tgdd.vn//News/1394829//pho%CC%81ng-730x411.jpeg"
                                className="w-20 h-20 rounded-lg object-cover"
                            />

                            <div>
                                <p className="font-semibold text-lg">
                                    Apple Watch Series 9 GPS 41mm
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Quantity: 1
                                </p>
                            </div>
                        </div>

                        <p className="font-semibold">$25,800</p>
                    </div>

                    <div className="flex justify-end p-6 gap-4">
                        <button className="border px-5 py-2 rounded-lg">
                            View Details
                        </button>

                        <button className="bg-black text-white px-5 py-2 rounded-lg">
                            Buy Again
                        </button>
                    </div>
                </div>

                {/* Order 4 */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-200">
                        <div className="flex gap-12 text-sm">
                            <div>
                                <p className="text-gray-500">Order ID</p>
                                <p className="font-semibold">ORD000892</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Order Date</p>
                                <p className="font-semibold">Dec 10, 2025</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Total</p>
                                <p className="font-semibold">$15,200</p>
                            </div>
                        </div>

                        <span className="border px-4 py-2 rounded-lg text-sm flex items-center text-gray-400">
                            <XCircle size={18} className="mr-1"/>
                            Canceled
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <div className="flex items-center gap-6">
                            <img
                                src="https://www.studioproper.com.au/cdn/shop/collections/francois-hoang-gYVNvRygCUw-unsplash_1_600x600_crop_center.jpg?v=1618289803"
                                className="w-20 h-20 rounded-lg object-cover"
                            />

                            <div>
                                <p className="font-semibold text-lg">
                                    iPad Pro 11" M4 WiFi 256GB
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Quantity: 1
                                </p>
                            </div>
                        </div>

                        <p className="font-semibold">$25,800</p>
                    </div>

                    <div className="flex justify-end p-6">
                        <button className="border px-5 py-2 rounded-lg">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};