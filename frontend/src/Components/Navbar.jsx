import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData, setUserData } = useContext(AppContext);

  const dropdownRef = useRef(null);

  const logout = () => {
    setToken(false);
    setUserData(null);
    localStorage.removeItem("token");
    setShowDropdown(false);
    navigate("/");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reusable styles for NavLinks
  const navLinkClass = ({ isActive }) =>
    `py-1 relative after:content-[''] after:block after:h-[2px] after:rounded-full after:bg-primary after:transition-all after:duration-300 after:scale-x-0 after:origin-center ${
      isActive ? "text-primary after:scale-x-100" : "text-gray-700 hover:text-black"
    }`;

  return (
    <div className="flex items-center justify-between text-sm py-4 mx-5 border-b border-b-gray-400">
      {/* Logo */}
      <img
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
        className="w-44 cursor-pointer"
        src={assets.logo2}
        alt="logo"
      />

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/doctors" className={navLinkClass}>
          All Doctors
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div
            ref={dropdownRef}
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img className="w-8 rounded-full" src={userData.image} alt="profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />

            {showDropdown && (
              <div className="absolute top-12 right-0 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => {
                      navigate("/My-profile");
                      setShowDropdown(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/My-appointments");
                      setShowDropdown(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p onClick={logout} className="hover:text-black cursor-pointer">
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white z-20 transition-transform duration-300 md:hidden ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="close"
            />
          </div>
          <ul className="flex flex-col gap-4 pt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors" className={navLinkClass}>
              All Doctors
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            {token ? (
              <>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to="/My-profile"
                  className={navLinkClass}
                >
                  My Profile
                </NavLink>
                <NavLink
                  onClick={() => setShowMenu(false)}
                  to="/My-appointments"
                  className={navLinkClass}
                >
                  My Appointments
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="text-left text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="bg-primary text-white px-6 py-2 rounded-full mt-4"
              >
                Create account
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;