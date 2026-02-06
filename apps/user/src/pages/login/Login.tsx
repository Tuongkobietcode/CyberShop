import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Vui lòng nhập địa chỉ email hợp lệ!");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
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

        <div className="text-right mb-6">
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Đăng nhập
        </button>

        <p className="text-center text-sm mt-6">
          Chưa có tài khoản?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4 text-center">
              Quên mật khẩu
            </h3>

            <p className="text-sm text-gray-600 mb-4 ">
              Nhập email để nhận mật khẩu mới
            </p>

            <div className="relative mb-4">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="example@email.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              onClick={() => {
                if (!forgotEmail.trim()) {
                  alert("Vui lòng nhập email");
                  return;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(forgotEmail)) {
                  alert("Email không đúng định dạng");
                  return;
                }
                setShowForgotModal(false);
                setForgotEmail("");
              }}
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 cursor-pointer"
            >
              Gửi yêu cầu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
