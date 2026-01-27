import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
      {
            name: {
                  type: String,
                  trim: true,
                  required: true,
            },

            email: {
                  type: String,
                  trim: true,
                  required: true,
                  unique: true,
                  lowercase: true,
            },

            password: {
                  type: String,
                  required: true,
                  minlength: 6,
            },

            isVerified: {
                  type: Boolean,
                  default: false,
            },
      },
      {
            timestamps: true,
      },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
