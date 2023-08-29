import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const storeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true],
    },
    email: {
        type: String,
        required: [true],
        unique: [true, ""],
        validate: [isEmail, "please enter a valid email"],
      },
    description: {
      type: String,
      required: [true],
    },
    location: {
      address: {
        type: String,
        required: [true, "Please enter the store address"],
      },
      city: {
        type: String,
        required: [true, "Please enter the store city"],
      },
      zipcode: {
        type: Number,
        required: [true, "zipcode is required"],
      },
      state: {
        type: Number,
        required: [true, "state  is required"],
      },
      country: {
        type: Number,
        required: [true, "Please enter the store country"],
      },
    },

  
    logo: {
      publicId: String,
      url: String,
    },

    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true],
    },
    updatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true],
    },
  },
  { timestamps: true }
);

const StoreModel = mongoose.model("Store", storeSchema);
export default StoreModel;
