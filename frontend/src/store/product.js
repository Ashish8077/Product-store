import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: () => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image)
      return { success: false, message: "Please fill in all fields." };
    newProduct.price = parseFloat(newProduct.price);

    if (newProduct.price < 0) {
      return { success: false, message: "Price cannot be negative" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products", {
      method: "GET",
    });
    if (!res.ok) {
      return { success: false, message: "Failed to fetch products" };
    }
    const data = await res.json();
    set((state) => ({
      products: data.data,
    }));
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    updatedProduct.price = parseFloat(updatedProduct.price);

    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
