import React, { useState } from "react";
import { CustomBtn } from "./index";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const PostCard = ({ product }) => {
  const { image, name, price, _id } = product;

  const { deleteProduct, updateProduct } = useProductStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast(message, {
        icon: "❌",
        style: {
          backgroundColor: "#EF4444", // Set background color for the toast
          color: "#ffffff", // Text color inside the toast
        },
      });
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

  const handleOpenDialog = () => {
    setUpdatedProduct(product); // Set the current product to be updated
    setIsDialogOpen(true); // Open the dialog
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(_id, updatedProduct);
    if (success) {
      toast(message, {
        icon: "✅",
        style: {
          backgroundColor: "#10B981", // Green for success
          color: "#ffffff",
        },
      });
      setIsDialogOpen(false); // Close the dialog after updating
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
    <div className="min-w-[100px] sm:min-w-[264px] md:min-w-[300px] bg-[#171923] dark:bg-white text-white dark:text-black shadow-lg rounded-lg overflow-hidden transform hover:translate-y-[-5px] duration-300  ">
      <div>
        <img src={image} className="max-h-[192px] w-full object-cover" alt="" />
      </div>
      <div className="pl-4 my-2 text-[20px] font-bold dark:text-[#1A202C]">
        <h3>{name}</h3>
      </div>
      <div className="pl-4 mb-2 text-[20px] font-bold text-white dark:text-[#4A5568]">
        <h3>{price}</h3>
      </div>
      <div className="pl-4 mb-2 space-x-2">
        <CustomBtn className="bg-[#3182CE]" onClick={() => handleOpenDialog()}>
          <FaRegEdit />
        </CustomBtn>
        <CustomBtn
          className="bg-[#E53E3E]"
          onClick={() => handleDeleteProduct(product._id)}>
          <RiDeleteBinLine />
        </CustomBtn>
        {isDialogOpen && (
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => setIsDialogOpen(open)}>
            <DialogContent className="sm:max-w-[425px]  bg-[#111827] dark:bg-[#EDF2F7] dark:text-black">
              <DialogHeader className="text-white dark:text-black">
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogDescription className="sr-only">
                Please update the product details in the form below.
              </DialogDescription>
              <div className="grid gap-4 py-4 ">
                <div className="grid grid-cols-4 items-center gap-4 ">
                  <Input
                    id="price"
                    defaultValue={name}
                    className="col-span-4 dark:text-black  dark:bg-transparent text-white dark:bg-[#EDF2F7] placeholder-black w-full bg-transparent"
                    placeholder="name"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="username"
                    defaultValue={price}
                    className="col-span-4 text-white dark:bg-[#EDF2F7] dark:text-black bg-transparent dark:bg-transparent"
                    placeholder="Price"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="username"
                    defaultValue={image}
                    className="col-span-4 text-white dark:bg-[#EDF2F7]  bg-transparent dark:text-black  dark:bg-transparent "
                    placeholder="ImageUrl"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type=""
                  name="update"
                  className="bg-gray-500 hover:bg-gray-700 dark:bg-gray-400 dark:hover:bg-gray-300 "
                  onClick={handleUpdateProduct}>
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
      </div>
    </div>
  );
};

export default PostCard;
