import React, { useEffect, useState } from 'react'
import 'react-phone-input-2/lib/style.css'
import { Link, useNavigate } from 'react-router-dom'
import headerImage from "../images/blue-background.png"
import { FiLogIn } from "react-icons/fi"; // add this at the top

// toaster 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import loader from "../images/loading.png"
import { BASE_URL } from '../BASE_URL';


const ForgotPassword = () => {
  const [emailid, setEmailid] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailid.trim()) return toast.error("Please enter your email.");
    if (!emailRx.test(emailid)) return toast.error("Please enter a valid email.");

    try {
      setLoading(true);
      // Send the emailid to backend
      await axios.post(`${BASE_URL}company/forgot-password`, { emailid });
      toast.success("Reset link sent! Check your inbox (and spam).");
      setEmailid("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "No account found with this email.");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
    {/* Background Image */}
    <div className="absolute inset-0 -z-0">
      <img
        src="src/images/loginBg.png"
        alt="background"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Toast */}
    {toast.show && (
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "12px 24px",
          borderRadius: 8,
          background: toast.type === "error" ? "#ef4444" : "#10b981",
          color: "white",
          fontWeight: 500,
          zIndex: 10000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        {toast.message}
      </div>
    )}

    {/* Main Section */}
    <section className="relative w-full px-4 md:px-10 xl:px-16 py-10 md:py-16 flex items-center justify-center">
      <div className="mx-auto max-w-[1500px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center">
        {/* LEFT: Logo + Text */}
       <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
  {/* Logo */}
  <img
    src="src/images/chembizzlogo.png"
    alt="ChemBizz Logo"
    className="w-[220px] md:w-[280px] xl:w-[301px] h-auto object-contain mb-6"
  />

  {/* Text Section */}
  <div className="max-w-[600px] text-[#0A122A] font-[Poppins]">
    {/* Main Heading */}
    <h2 className="text-[#0C62BF] font-bold text-2xl md:text-[36px] leading-tight mb-4">
      Forgot Your Password?
    </h2>

    {/* Sub Heading */}
    <p className="text-[16px] md:text-[18px] font-normal leading-[160%] mb-6">
      <span className="font-bold text-[#004AAD]">Don’t worry</span> — it happens to the best of us.
      <br />
      Enter your registered email address, and we’ll send you a link to reset your password.
    </p>

    {/* Section 2 */}
    <h3 className="text-[#0C62BF] font-semibold text-[20px] md:text-[24px] leading-[120%] mb-3">
      Reset Your Password Securely
    </h3>
    <p className="text-[16px] font-normal leading-[160%] mb-3">
      For your account’s safety, we’ll send a password reset link to your registered email. 
      Your account security is our top priority.
    </p>
    <p className="text-[16px] font-normal leading-[160%] mb-6">
      We’ll guide you step-by-step to regain access to your account.
    </p>

    {/* Final Note */}
    <p className="text-[#0C62BF] font-semibold text-[16px] leading-[150%]">
      Please check your inbox (and spam folder) for further instructions.
    </p>
  </div>
</div>


        {/* RIGHT: Forgot Password Card */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div
            className="
              w-full max-w-[640px]
              bg-white/95 backdrop-blur-md
              border border-[#0077B3]
              rounded-tl-[50px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[50px]
              shadow-[0_10px_30px_rgba(0,74,173,0.15)]
              px-8 sm:px-10 md:px-12
              py-14 sm:py-16
              h-auto
              flex flex-col items-center justify-center
            "
          >
            <h1 className="text-center text-[#004aad] text-2xl md:text-[32px] font-bold">
              Forgot Password
            </h1>
            <p className="text-center text-sm md:text-base text-gray-600 mt-3 max-w-[400px]">
              If you forgot password, kindly enter your email below to restore the password  
            </p>

              <div className="w-full mt-8">
                 <div className="relative">
                  <input
                    type="email"
                    value={emailid}
                    onChange={(e) => setEmailid(e.target.value.toLowerCase())}
                    placeholder="Enter your email"
                    className="w-full h-[50px] border border-gray-300 rounded-md pr-[50px] pl-4 text-[16px] outline-none focus:border-[#004AAD] transition"
                  />
                  <div className="absolute top-0 right-0 w-[50px] h-[50px] bg-[#0077B3] rounded-r-md flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-8 w-full h-[50px] rounded-md text-white font-semibold text-[16px] ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0077B3] hover:bg-[#0077B3]"
                } transition`}
              >
                {loading ? "Sending Link..." : "Send Reset Link"}
              </button>

              <p className="mt-6 text-sm text-gray-500">
                Remember your password?{" "}
                <a href="/login" className="text-[#004AAD] font-semibold">Back to Login</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ForgotPassword;
