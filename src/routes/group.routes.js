import { Router } from "express";
import {
  createNewGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controllers/group.controllers.js";

export const groupRouter = Router();
groupRouter.post("/groups", createNewGroup);
groupRouter.get("/groups", getAllGroups);
groupRouter.get("/groups/:id", getGroupById);
groupRouter.put("/groups/:id", updateGroup);
groupRouter.delete("/groups/:id", deleteGroup);
