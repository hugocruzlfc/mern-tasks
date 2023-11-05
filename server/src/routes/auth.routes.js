import { Router } from "express";
import { login, logout, register, verifyToken } from "../controllers/index.js";
import { validateSchema } from "../middlewares/index.js";
import { loginSchema, registerSchema } from "../schemas/index.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);

export default router;
