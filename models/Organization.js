const mongoose = require("mongoose");
const { Schema } = mongoose;

const organizationSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], unique: true },
    code: {
      type: String,
      required: [true, "Code is required"],
      unique: true,
    },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    _admins: [Schema.Types.ObjectId],
    _addressId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

mongoose.model("organizations", organizationSchema);
