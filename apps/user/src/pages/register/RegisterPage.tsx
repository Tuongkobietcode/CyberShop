import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (!fullName.trim()) {
        alert("Vui lòng nhập đầy đủ họ tên");
    }

    else if (!email.trim()) {
        alert("Vui lòng nhập đầy đủ email");
    }

    else if (!phone.trim()) {
        alert("Vui lòng nhập đầy đủ số điện thoại");
    }

     else if (!address.trim()) {
        alert("Vui lòng nhập đầy đủ số điện thoại");
    }

    else if (!password.trim() || !confirmPassword.trim()) {
        alert("Vui lòng nhập đầy đủ mật khẩu");
        return;
    }

    else if (password.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự");
        return;
    }

    else if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp");
        return;
    }

    else {
        alert("Đăng ký thành công");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Đăng ký tài khoản
        </h1>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Họ và tên</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Nhập họ tên"
              className="w-full rounded-lg bg-gray-100 py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-black"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-lg bg-gray-100 py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Số điện thoại</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              className="w-full rounded-lg bg-gray-100 py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Địa chỉ</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              className="w-full rounded-lg bg-gray-100 py-2 pl-10 pr-3 outline-none focus:ring-2 focus:ring-black"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="w-full rounded-lg bg-gray-100 py-2 pl-10 pr-10 outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className="w-full rounded-lg bg-gray-100 py-2 pl-10 pr-10 outline-none focus:ring-2 focus:ring-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button className="w-full rounded-lg bg-black py-2 font-semibold text-white hover:opacity-90"
                onClick={handleRegister}>
          Đăng ký
        </button>

        <div className="text-center mt-5 text-sm">
            <span className="mr-1">Đã có tài khoản?</span>
            <a href="#" className="text-blue-500 hover:text-blue-400">Đăng nhập ngay</a>
        </div>
      </div>
    </div>
  );
};
