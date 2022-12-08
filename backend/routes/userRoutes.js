const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.post("/verify", userController.verify);
userRouter.get("/:id", userController.getOne);
userRouter.post("/", userController.create);
userRouter.put("/:id", userController.updateOne);
userRouter.delete("/:id", userController.deleteOne);

module.exports = userRouter;
