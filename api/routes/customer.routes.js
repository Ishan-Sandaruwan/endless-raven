import express from "express";
import {
  addCustomer,
  getCustomers,
} from "../controllers/customer.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add-customer", addCustomer);
router.get("/get-all", verifyToken, getCustomers);

export default router;
