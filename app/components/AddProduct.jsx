"use client";

import React, { useState, useRef } from "react";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [amen, setAmen] = useState("");
  const [desc, setDesc] = useState("");

  // ✔ Correct approach for file input in React
  const imageRef = useRef(null);

  const recordHandler = async (e) => {
    e.preventDefault();

    const imageFile = imageRef.current?.files[0];
    if (!imageFile) {
      alert("Please select an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("offer", offer);
    formData.append("amen", amen);
    formData.append("desc", desc);
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/admin/add-product", {
        method: "POST",
        body: formData, //JSON.STRINGIFY(formData)  NOt use
      });

      
      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text); // Try to convert to JSON
      } catch (jsonError) {
        console.error("SERVER RETURNED HTML INSTEAD OF JSON:");
        console.log(text);
        alert("Server error: Check terminal for error details.");
        return;
      }

      if (result.success) {
        alert("Product added successfully!");
        setTitle("");
        setPrice("");
        setOffer("");
        setAmen("");
        setDesc("");
      } else {
        alert("Failed to add product: " + result.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Network error. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h1>

      <form
        onSubmit={recordHandler}
        encType="multipart/form-data"
        className="space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="Product title"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Offer */}
        <div>
          <label className="block font-semibold text-gray-700">Offer</label>
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="Offer details (optional)"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block font-semibold text-gray-700">Amenities</label>
          <input
            type="text"
            value={amen}
            onChange={(e) => setAmen(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            placeholder="Ex: WiFi, AC, TV"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            rows="3"
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            ref={imageRef}
            className="w-full border px-3 py-2 rounded bg-gray-50"
            accept="image/*"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
