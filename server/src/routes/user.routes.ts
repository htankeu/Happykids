import { Router } from "express";
import {
  addUserPoints,
  deleteUser,
  getUser,
  listUser,
  updateUser,
  userNextLevel,
} from "../controllers/user.controller";
import { checkAuth } from "../controllers/auth.controllers";

const userRouter: Router = Router();

userRouter.get("/", listUser);
userRouter.route("/:userId").get(getUser).delete(deleteUser).put(updateUser);
userRouter.post("/:userId/nextLevel", userNextLevel);
userRouter.post("/:userId/addPoints", addUserPoints);

export default userRouter;
