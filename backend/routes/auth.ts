import express from "express";
import { signin, signup, google, signout, isAuth } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/google", google);
router.get("/signout", signout);
router.get("/isAuth/:id", isAuth);

export default router;
