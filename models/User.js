const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    googleId: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    // confirmed: { type: Boolean, required: true, default: false },
    role: {
      type: String,
      enum: ["SUPERADMIN", "ADMIN", "USER"],
      default: "USER",
    },
    // first_name: { type: String, required: true },
    // last_name: { type: String, required: true },
    // employee_id: { type: String, required: true, minlength: 6 },
    // blood_group: { type: String },
    // employeePic: { type: String },
    // contact: {
    //   type: String,
    //   required: [true, "User phone number required"],
    //   minlength: 10,
    // },
  },
  { timestamps: true }
);

mongoose.model("users", userSchema);
