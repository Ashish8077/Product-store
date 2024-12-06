import React, { useState } from "react";
import { CustomBtn, Input } from "../index";
import { useProductStore } from "../../store/product";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    price: false,
    image: false,
    priceType: false,
  });
  const { createProduct } = useProductStore();
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    if (isNaN(newProduct.price)) {
      setErrors((prev) => ({
        ...prev,
        priceType: true, // Set error for price if it's not a number
      }));
      return; // Prevent form submission
    }

    setErrors((prev) => ({
      ...prev,
      priceType: false,
    }));

    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast(message, {
        icon: "✅",
        style: {
          backgroundColor: "#10B981", // Green for success
          color: "#ffffff",
        },
      });
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast(message, {
        icon: "❌",
        style: {
          backgroundColor: "#EF4444",
          color: "#ffffff",
        },
      });
    }
  };
  return (
    <div className="max-w-screen-sm  mx-auto px-5 ">
      <h1 className="text-[32px] text-center text-white dark:text-black font-bold my-8 sm:text-[48px]   ">
        Create New Product
      </h1>
      <div className="w-full  bg-[#1A202C] text-white dark:bg-white dark:text-black  shadow-lg p-4  ">
        <div className="w-full  mb-4">
          <Input
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className=" mb-0"
          />
        </div>
        <div className="w-full  mb-4">
          <Input
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="mb-0"
          />
          {errors.priceType && (
            <p className="text-red-400">
              Please enter a valid number for price.
            </p>
          )}
        </div>

        <div className="w-full mb-4">
          <Input
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className=" mb-0"
          />
        </div>

        <CustomBtn
          className="w-full bg-[#3182CE] hover:bg-[#2B6CB0]"
          onClick={handleAddProduct}>
          Add Product
        </CustomBtn>
      </div>
    </div>
  );
};

export default CreateProduct;
