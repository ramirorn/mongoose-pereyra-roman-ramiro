import { Router } from "express";
import { createNewUser } from "../controllers/user.controllers.js";

export const userRouter = Router();
userRouter.post("/users", createNewUser);
