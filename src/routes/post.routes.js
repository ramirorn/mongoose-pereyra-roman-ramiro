import { Router } from "express";
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controllers.js";
import {
  createNewPostValidations,
  updatePostValidations,
} from "../middlewares/validations/post.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const postRouter = Router();
postRouter.post("/posts", createNewPostValidations, applyValidations, createNewPost);
postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:id", getPostById);
postRouter.put("/posts/:id", updatePostValidations, applyValidations, updatePost);
postRouter.delete("/posts/:id", deletePost);
