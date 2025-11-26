import { Router } from "express";
import {
  createNewGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addMemberToGroup,
} from "../controllers/group.controllers.js";
import {
  createNewGroupValidations,
  updateGroupValidations,
  addMemberToGroupValidations,
} from "../middlewares/validations/group.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const groupRouter = Router();
groupRouter.post("/groups", createNewGroupValidations, applyValidations, createNewGroup);
groupRouter.get("/groups", getAllGroups);
groupRouter.get("/groups/:id", getGroupById);
groupRouter.put("/groups/:id", updateGroupValidations, applyValidations, updateGroup);
groupRouter.delete("/groups/:id", deleteGroup);
groupRouter.post("/groups/:id/members", addMemberToGroupValidations, applyValidations, addMemberToGroup);
