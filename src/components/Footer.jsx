import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faXTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFileContract,
  faShieldHalved,
  faCircleInfo,
  faFileSignature,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from '../BASE_URL';
import waveBg from "../images/footerbg.png";  
import Logo from "../images/chembizzlogo.png";
  
const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const gradientStyle = {
    background: `-webkit-linear-gradient(left, #7677FF, #00AEEF)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };


  const [email, setEmail] = useState("")
  
 const handleSubmit = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    toast.error('Please Enter Email Address!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
    return;
  }

  if (!emailRegex.test(trimmedEmail)) {
    toast.error('Please Enter Valid Email Address!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
    });
    return;
  }

  try {
    console.log('Making API call...');
    const response = await axios.post(`${BASE_URL}api/subscriber/add`, {
      email: trimmedEmail,
    });

    if (response.status === 200) {
      toast.success('You Subscribed to Chembizz Successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000,
      });
      setEmail('');
    }
  } catch (error) {
    // Check if email already exists
    if (error.response?.data?.error === "Email already subscribed") {
      toast.info('You are already subscribed to Chembizz!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    } else {
      toast.error(error.response?.data?.error || 'Something went wrong!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    }
  }
};


  return (
    <footer className="bg-[#F5F7FA]">
      <ToastContainer />
       <div className="relative w-full bg-white overflow-hidden">
         <div
          aria-hidden
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${waveBg})`,
            backgroundPosition: "center bottom",
          }}
        ></div>

   <div className="pt-24 pb-32 grid grid-cols-1 md:grid-cols-3 gap-12 relative">
   <div className="md:ml-24">
    <img
      src={Logo}
      alt="ChemBizZ"
      className="w-[180px] md:w-[200px] mb-6"
    />

     <div className="flex items-center gap-3 w-full md:w-auto mb-8">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email*"
        className="w-full md:w-[300px] h-[42px] rounded-md border border-[#2EA7E0] bg-white px-3 outline-none text-sm"
      />
      <button
        onClick={handleSubmit}
        className="h-[42px] px-5 rounded-md bg-[#0B6CAF] text-white text-[15px] font-semibold border border-[#2EA7E0] hover:bg-[#88c7ec]"
      >
        Subscribe Now
      </button>
    </div>

    <p
      className="max-w-[540px] text-[#2290CF] mb-8"
      style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "28px",
      }}
    >
     Connecting the world of chemical 
      <br />commerce together to make its members more successful.
    </p>

    <p className="text-[#1E1E1E] text-sm mb-6">
  ©2004–{new Date().getFullYear()} ChemBizZ. All rights reserved.
</p>


   
  </div>

  <div className="md:ml-56 mt-16">
  <h4 className="text-[#2290CF] font-semibold mb-4 text-lg">Contact</h4>

  <div className="space-y-3 text-[#1E1E1E] text-sm">
     <p className="leading-5 max-w-[360px] pb-2 flex items-start gap-2">
      <FontAwesomeIcon
        icon={faLocationDot}
        className="text-[#2290CF] mt-1 min-w-[16px]"
      />
      7th Floor, 707, Aaryan workspace -2,<br />
      Gulbai Tekra, Navrangpura –<br />
      Ahmedabad Gujarat (380006) – India
    </p>

     <a
      href="mailto:support@chembizzz.in"
      className="underline flex items-center gap-2 hover:text-[#2290CF] transition-all duration-200"
    >
      <FontAwesomeIcon icon={faEnvelope} className="text-[#2290CF]" />
      support@chembizzz.in
    </a>

     <p className="flex items-center gap-2 hover:text-[#2290CF] transition-all duration-200">
      <FontAwesomeIcon icon={faPhone} className="text-[#2290CF]" />
      +91 635 1922 464
    </p>

     <div className="flex items-center gap-5 text-[#1E1E1E] pt-3">
       <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="transition-all duration-200 hover:text-[#E1306C]"
      >
        <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
      </a>

       <a
        href="https://www.facebook.com/profile.php?id=61564475525953"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="transition-all duration-200 hover:text-[#1877F2]"
      >
        <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
      </a>

       <a
        href="https://www.linkedin.com/company/chembizzz/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="transition-all duration-200 hover:text-[#0A66C2]"
      >
        <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
      </a>

       <a
        href="https://x.com/Chembizzz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        className="transition-all duration-200 hover:text-[#000000]"
      >
        <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
      </a>
    </div>
  </div>
</div>

 <div className="md:ml-28 mt-16">
  <h4 className="text-[#2290CF] font-semibold mb-4 text-lg">Resources</h4>
  <ul className="space-y-3 text-[#1E1E1E] text-sm">
    <li>
      <Link
        to="/terms-and-conditions"
        className="flex items-center gap-2 hover:text-[#2290CF] duration-200 group"
      >
        <FontAwesomeIcon
          icon={faFileContract}
          className="text-[#2290CF] group-hover:scale-110 transition-transform duration-200"
        />
        Terms &amp; Conditions
      </Link>
    </li>

    <li>
      <Link
        to="/privacy-policies"
        className="flex items-center gap-2 hover:text-[#2290CF] duration-200 group"
      >
        <FontAwesomeIcon
          icon={faShieldHalved}
          className="text-[#2290CF] group-hover:scale-110 transition-transform duration-200"
        />
        Privacy Policy
      </Link>
    </li>

    <li>
      <Link
        to="/about"
        className="flex items-center gap-2 hover:text-[#2290CF] duration-200 group"
      >
        <FontAwesomeIcon
          icon={faCircleInfo}
          className="text-[#2290CF] group-hover:scale-110 transition-transform duration-200"
        />
        About Us
      </Link>
    </li>

    <li>
      <Link
        to="/software-license"
        className="flex items-center gap-2 hover:text-[#2290CF] duration-200 group"
      >
        <FontAwesomeIcon
          icon={faFileSignature}
          className="text-[#2290CF] group-hover:scale-110 transition-transform duration-200"
        />
        Software License Agreement
      </Link>
    </li>

    <li>
      <Link
        to="/blogs"
        className="flex items-center gap-2 hover:text-[#2290CF] duration-200 group"
      >
        <FontAwesomeIcon
          icon={faNewspaper}
          className="text-[#2290CF] group-hover:scale-110 transition-transform duration-200"
        />
        Blog
      </Link>
    </li>
  </ul>
</div>
</div>


         <div className="pb-8" />
      </div>
    </footer>
  );
};

export default Footer;