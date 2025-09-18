import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: Types.ObjectId,
      ref: "ProfilePicture",
    },
    person: {
      name: String,
      age: Number,
      bio: String,
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
