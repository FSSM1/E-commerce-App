import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"


const AddProduct = ({ categories, handleSave, setShowAddProduct }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
    nbSold: "",
    categoryId: "", // Ensure this is initialized correctly
    userId: user.id,
  });

  const [newImage, setNewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update the correct field
  };

  // ✅ Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setNewImage(URL.createObjectURL(file)); // Show preview of new image

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/upload",
        uploadFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("imaged uploaded")

      setFormData((prev) => ({ ...prev, image: response.data.file.path })); // Update image URL
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    setShowAddProduct(false);
    toast.success("submitted")
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* ✅ Styled File Input for Image Upload */}
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-4">
          {newImage ? (
            <img
              src={newImage}
              alt="Preview"
              className="mx-auto mb-2 w-32 h-32 object-cover rounded-lg shadow-md"
            />
          ) : formData.image ? (
            <img
              src={formData.image}
              alt="Current"
              className="mx-auto mb-2 w-32 h-32 object-cover rounded-lg shadow-md"
            />
          ) : (
            <p className="text-gray-600 text-sm">No image selected</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <p className="text-gray-600 text-sm">Click to upload an image</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number Sold
          </label>
          <input
            type="number"
            name="nbSold"
            value={formData.nbSold}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="categoryId"
            value={formData.categoryId} // Bind to formData.categoryId
            onChange={handleChange} // Use the same handleChange function
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>
              Select a category
            </option>{" "}
            {/* Add a default disabled option */}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-indigo-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-600"
        >
          Add Product
        </button>

        <button
          type="button"
          onClick={() => setShowAddProduct(false)}
          className="w-full mt-3 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProduct;