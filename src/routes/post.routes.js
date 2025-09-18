import { Router } from "express";
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controllers.js";

export const postRouter = Router();
postRouter.post("/posts", createNewPost);
postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:id", getPostById);
postRouter.put("/posts/:id", updatePost);
postRouter.delete("/posts/:id", deletePost);
