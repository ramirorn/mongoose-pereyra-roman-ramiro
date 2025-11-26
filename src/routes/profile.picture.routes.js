import { Router } from "express";
import {
  createNewProfilePicture,
  getAllProfilePictures,
  getProfilePictureById,
  updateProfilePicture,
  deleteProfilePicture,
} from "../controllers/profile.picture.controllers.js";
import {
  createNewProfilePictureValidations,
  updateProfilePictureValidations,
} from "../middlewares/validations/profile.picture.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const profilePictureRouter = Router();
profilePictureRouter.post("/profile-pictures", createNewProfilePictureValidations, applyValidations, createNewProfilePicture);
profilePictureRouter.get("/profile-pictures", getAllProfilePictures);
profilePictureRouter.get("/profile-pictures/:id", getProfilePictureById);
profilePictureRouter.put("/profile-pictures/:id", updateProfilePictureValidations, applyValidations, updateProfilePicture);
profilePictureRouter.delete("/profile-pictures/:id", deleteProfilePicture);
