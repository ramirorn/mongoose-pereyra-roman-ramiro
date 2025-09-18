import { model, Schema, Types } from "mongoose";

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  members: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
});

export const GroupModel = model("Group", GroupSchema);
