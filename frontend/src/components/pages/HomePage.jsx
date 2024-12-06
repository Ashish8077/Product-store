import React, { useEffect, useState } from "react";
import { PostCard } from "../index";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-screen-xl mx-auto ">
      <h1 className="text-center font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-[22px] mt-5 sm:text-3xl">
        Current Products
      </h1>
      <div className="w-full grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3  gap-5 sm:w-full   p-5 ">
        {products.map((product) => {
          return <PostCard key={product._id} product={product} />;
        })}
      </div>
      {products.length === 0 && (
        <p className="text-[20px] font-bold text-[#7180A2] text-center">
          No products found 🙁{" "}
          <Link to="/create">
            <span className="underline text-[#3182CE]">Create a Product</span>
          </Link>{" "}
        </p>
      )}
    </div>
  );
};

export default HomePage;
