import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/Appcontext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./components/ProductCategory";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useAppContext();
  return (
    <>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />

      <div
        className={` ${isSellerPath ? "3" : "px-6 md:px-16 lg:px-24 xl:px-"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
        </Routes>
        {!isSellerPath && <Footer />}
      </div>
    </>
  );
};

export default App;
