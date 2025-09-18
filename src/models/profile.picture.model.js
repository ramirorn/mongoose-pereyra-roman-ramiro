import { model, Schema, Types } from "mongoose";
const ProfilePictureSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ProfilePictureModel = model(
  "ProfilePicture",
  ProfilePictureSchema
);
