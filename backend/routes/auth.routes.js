import express from "express";
//suing controllers to avoid a mess of functipost
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

export default router;
