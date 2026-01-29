import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/Appcontext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setshowUserLogin, navigate } = useAppContext();

  const logout = async () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/">
        <img src={assets.logo} alt="" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/Allproducts">Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products.....   "
          />
          <img src={assets.search_icon} alt="" />
        </div>

        <div className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="" />
        </div>

        {!user ? (
          <button
            onClick={() => setshowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="w-10" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                onClick={() => navigate("my-orders")}
              >
                My orders
              </li>
              <li
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                onClick={() => navigate("/")}
              >
                logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu_icon} alt="" />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${open ? "flex" : "hidden"} absolute  left-0 w-full bg-white shadow-md py-4 flex-col items-center gap-2 px-5 text-sm md:hidden mt-20`}
        >
          <NavLink to="/home" className="block" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="block"
            onClick={() => setOpen(false)}
          >
            All Products
          </NavLink>
          {user && (
            <NavLink
              to="/products"
              className="block"
              onClick={() => setOpen(false)}
            >
              My Orders
            </NavLink>
          )}
          <NavLink
            to="/contact"
            className="block"
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setshowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
