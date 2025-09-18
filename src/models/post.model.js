import { model, Schema, Types } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const PostModel = model("Post", PostSchema);
