import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const emailParam = useMemo(() => params.get("emailid") || "", [params]);
  const token = useMemo(() => params.get("token") || "", [params]);

  const [emailid, setEmailid] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // ✅ Independent toggles
  const toggleShowPassword = () => setShowP((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowC((prev) => !prev);

  // ✅ Decode token on mount
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.email) setEmailid(decoded.email);
      } catch (err) {
        console.error("Invalid token:", err);
        toast.error("Invalid or expired reset link.");
      }
    }
  }, [token]);

  const validatePassword = (p) => {
    const c = {
      length: p.length >= 8,
      uppercase: /[A-Z]/.test(p),
      lowercase: /[a-z]/.test(p),
      number: /\d/.test(p),
      special: /[!@#$%^&*(),.?\":{}|<>]/.test(p),
    };
    setCriteria(c);
    return Object.values(c).every(Boolean);
  };

  const handleReset = async () => {
    if (!password || !confirm) return toast.error("Please fill in both fields.");
    if (!validatePassword(password)) return toast.error("Password must meet all requirements.");
    if (password !== confirm) return toast.error("Passwords do not match.");

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}company/reset-password`, {
        newPassword: password,
        confirmPassword: confirm,
        token,
        email: emailid,
      });

      if (res.data?.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => navigate("/login"), 1200);
      } else {
        toast.error(res.data?.message || "Unable to reset password.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-50 flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-0">
        <img
          src="src/images/loginBg.svg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main */}
      <section className="relative w-full px-4 md:px-10 xl:px-16 py-10 md:py-16">
        <div className="mx-auto max-w-[1500px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
         <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left font-[Poppins]">
  {/* Logo */}
  <img
    src="src/images/chembizzlogo.png"
    alt="ChemBizz"
    className="w-[220px] md:w-[280px] xl:w-[301px] h-auto object-contain mb-6"
  />

  {/* Text Content */}
  <div className="max-w-[600px] text-[#0A122A]">
    <h2 className="text-[#0C62BF] font-bold text-2xl md:text-[36px] leading-tight mb-4">
      Set New Password
    </h2>

    {/* ✅ Added descriptive & emotional text */}
    <p className="text-[#000000]  text-base md:text-lg leading-relaxed mb-6">
      Your security matters to us. Reset your password to regain access and
      continue exploring the <strong className="text-[#0C62BF]">ChemBizz</strong>
    </p>

    <p className="text-[#000000] text-sm md:text-base leading-relaxed mb-8">
      Create a strong password using a mix of uppercase, lowercase, numbers, and
      symbols to keep your account safe.
    </p>
  </div>
</div>

          {/* RIGHT card */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              className="
                w-full max-w-[620px]
                bg-white/95 backdrop-blur-md
                border border-[#0077B3]
                rounded-tl-[50px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[50px]
                shadow-[0_10px_30px_rgba(0,74,173,0.15)]
                px-8 sm:px-10 md:px-12
                py-14 sm:py-16
                text-center font-[Poppins]
                flex flex-col items-center justify-center
              "
            >
              <h1 className="text-[#0077B3] text-2xl md:text-[32px] font-bold mb-2">
                Reset Password
              </h1>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Resetting password for:{" "}
                <span className="font-semibold text-[#0077B3]">
                  {emailid || "—"}
                </span>
              </p>
              <p className="text-gray-600 mb-8 text-sm md:text-base">
                Enter your new password and confirm it below.
              </p>

              {/* New Password */}
              <div className="relative w-full mb-6">
                <input
                  type={showP ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  className="w-full h-[50px] border border-gray-300 rounded-md pl-4 pr-12 text-[16px] outline-none focus:border-[#004AAD] transition"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute top-0 right-0 w-[50px] h-[50px] bg-[#0077B3] rounded-r-md flex items-center justify-center"
                >
                  {showP ? (
                    // eye-off icon
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    // eye icon
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Criteria */}
              {password && (
                <div className="w-full text-left text-sm mb-6">
                  <p className={`${criteria.length ? "text-green-500" : "text-red-500"}`}>
                    {criteria.length ? "✔" : "✖"} At least 8 characters
                  </p>
                  <p className={`${criteria.uppercase ? "text-green-500" : "text-red-500"}`}>
                    {criteria.uppercase ? "✔" : "✖"} One uppercase letter
                  </p>
                  <p className={`${criteria.lowercase ? "text-green-500" : "text-red-500"}`}>
                    {criteria.lowercase ? "✔" : "✖"} One lowercase letter
                  </p>
                  <p className={`${criteria.number ? "text-green-500" : "text-red-500"}`}>
                    {criteria.number ? "✔" : "✖"} One number
                  </p>
                  <p className={`${criteria.special ? "text-green-500" : "text-red-500"}`}>
                    {criteria.special ? "✔" : "✖"} One special character
                  </p>
                </div>
              )}

              {/* Confirm Password */}
              <div className="relative w-full mb-8">
                <input
                  type={showC ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full h-[50px] border border-gray-300 rounded-md pl-4 pr-12 text-[16px] outline-none focus:border-[#004AAD] transition"
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute top-0 right-0 w-[50px] h-[50px] bg-[#0077B3] rounded-r-md flex items-center justify-center"
                >
                  {showC ? (
                    // eye-off icon
                     <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    // eye icon
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>

              <button
                onClick={handleReset}
                disabled={loading}
                className={`w-full h-[50px] rounded-md text-white font-semibold text-[16px] ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0077B3] hover:bg-[#0077B3]"
                } transition`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <p className="mt-6 text-sm text-gray-500">
                Remember your password?{" "}
                <a href="/login" className="text-[#0077B3] font-semibold">
                  Back to Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ResetPassword;
