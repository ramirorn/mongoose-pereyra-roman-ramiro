import { Router } from "express";
import {
  createNewUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controllers.js";
import {
  createNewUserValidations,
  updateUserValidations,
} from "../middlewares/validations/user.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const userRouter = Router();
userRouter.post(
  "/users",
  createNewUserValidations,
  applyValidations,
  createNewUser
);
userRouter.get("/users", getAllUser);
userRouter.get("/users/:id", getUserById);
userRouter.put(
  "/users/:id",
  updateUserValidations,
  applyValidations,
  updateUser
);
userRouter.delete("/users/:id", deleteUser);
