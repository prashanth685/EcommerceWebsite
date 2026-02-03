import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filterProducts, setfilterProducts] = useState([]);
  useEffect(() => {
    if (searchQuery.length > 0) {
      setfilterProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setfilterProducts(products);
    }
  }, [searchQuery, products]);
  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.6 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filterProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
