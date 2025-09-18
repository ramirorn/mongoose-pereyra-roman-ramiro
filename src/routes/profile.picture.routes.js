import { Router } from "express";
import {
  createNewProfilePicture,
  getAllProfilePictures,
  getProfilePictureById,
  updateProfilePicture,
  deleteProfilePicture,
} from "../controllers/profile.picture.controllers.js";

export const profilePictureRouter = Router();
profilePictureRouter.post("/profile-pictures", createNewProfilePicture);
profilePictureRouter.get("/profile-pictures", getAllProfilePictures);
profilePictureRouter.get("/profile-pictures/:id", getProfilePictureById);
profilePictureRouter.put("/profile-pictures/:id", updateProfilePicture);
profilePictureRouter.delete("/profile-pictures/:id", deleteProfilePicture);
