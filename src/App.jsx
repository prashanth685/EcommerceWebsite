import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <>
      {isSellerPath ? null : <Navbar />}
      <Toaster />

      <div
        className={` ${isSellerPath ? "3" : "px-6 md:px-16 lg:px-24 xl:px-"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
