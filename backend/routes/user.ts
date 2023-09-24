import express from "express";
import { test, updateUser, deleteUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
