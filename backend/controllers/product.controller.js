import mongoose from "mongoose";
import Product from "../model/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return res.status(404).json({ success: false, message });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image)
    return res.status(400).json({
      success: false,
      message: "Please provide all fields (name, price, image)",
    });

  if (typeof price !== "number" || price <= 0)
    return res
      .status(400)
      .json({ success: false, message: "Price must be a positive number" });

  const newProduct = new Product({
    name,
    price,
    image,
  });
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  const { price,} = product;
  if (price && (typeof price !== "number" || price <= 0))
    return handleError(res, 400, "Price must be a positive number");

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Product updated ",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updating products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted " });
  } catch (error) {
    console.error("Error in deleting products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
