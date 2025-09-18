import { Router } from "express";
import {
  createNewUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controllers.js";

export const userRouter = Router();
userRouter.post("/users", createNewUser);
userRouter.get("/users", getAllUser);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);
