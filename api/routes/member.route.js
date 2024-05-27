import express from "express";
import {
  addMember,
  getMember,
  updateMember,
  signToAdmin,
  signout,
} from "../controllers/member.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add-new-member", verifyToken, addMember);
router.get("/get-members", getMember);
router.put("/update/:memberid", verifyToken, updateMember);
router.post("/sign", signToAdmin);
router.post("/signout", signout);

export default router;
