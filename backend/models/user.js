import mongoose from "mongoose";
const { createHmac } = await import("crypto");
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    encry_password: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: "0",
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.getSecurePass(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.method({
  authenticate: function (plainpass) {
    return this.getSecurePass(plainpass) === this.encry_password;
  },
  getSecurePass: function (plainpass) {
    if (!plainpass) return "";
    try {
      return createHmac("sha256", this.salt).update(plainpass).digest("hex");
    } catch (err) {
      return "";
    }
  },
});

const User = mongoose.model("User", userSchema);
export default User;
