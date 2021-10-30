const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    address_line_one: { type: String, required: true },
    address_line_two: { type: String, required: true },
    landmark: { type: String },
    zipcode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    location: {
      type: { type: String },
      coordinates: [],
    },
  },
  { timestamps: true }
);

addressSchema.index({ location: "2dsphere" });

mongoose.model("addresses", addressSchema);
