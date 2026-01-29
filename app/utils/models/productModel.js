import { title } from "process";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: String },
    
    desc: { type: String },
    image: { type: String },
    amen: {
  type: [String],
  required: true,
  default: ["AC", "Geyser", "WiFi", "TV"],
  set: function (amenities) {
    const defaultValues = ["AC", "Geyser", "WiFi", "TV", "Breakfast"];

    if (typeof amenities === "string") {
      amenities = amenities.split(",").map(item => item.trim());
    }

 
    if (!Array.isArray(amenities)) {
      return defaultValues;
    }
    return [...new Set([...defaultValues, ...amenities])];
  },
},
});
const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;


