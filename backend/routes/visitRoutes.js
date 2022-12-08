const express = require("express");
const visitController = require("../controllers/visitController");

const visitRouter = express.Router();

visitRouter.get("/", visitController.getAll);
visitRouter.get("/:id", visitController.getOne);
visitRouter.post("/", visitController.create);
visitRouter.put("/:id", visitController.updateOne);
visitRouter.delete("/:id", visitController.deleteOne);

module.exports = visitRouter;
