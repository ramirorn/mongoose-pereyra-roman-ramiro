import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { postRouter } from "./post.routes.js";
import { groupRouter } from "./group.routes.js";
import { profilePictureRouter } from "./profile.picture.routes.js";

export const routes = Router();
routes.use(userRouter);
routes.use(postRouter);
routes.use(groupRouter);
routes.use(profilePictureRouter);
