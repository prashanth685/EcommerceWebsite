import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const Appcontext = createContext();

export const AppcontextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.VITE_CURRENCY;
  const [user, setuser] = useState(null);
  const [isSeller, setisSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setproducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchProducts = async () => {
    setproducts(dummyProducts);
  };

  // Add Product to cart
  const addToCart = () => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart");
  };
  useEffect(() => {
    fetchProducts();

    return () => {};
  }, []);

  const value = {
    navigate,
    user,
    setuser,
    setisSeller,
    isSeller,
    showUserLogin,
    setshowUserLogin,
    products,
    setproducts,
    currency,
    addToCart,
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

export const useAppContext = () => {
  return useContext(Appcontext);
};
