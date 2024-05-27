import express from "express";
import {
  addProjects,
  getProjects,
  deleteProject,
  updateProject,
} from "../controllers/project.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get-all", getProjects);
router.post("/add-new", verifyToken, addProjects);
router.put("/update/:projectId", verifyToken, updateProject);
router.delete("/delete/:projectId", verifyToken, deleteProject);

export default router;
