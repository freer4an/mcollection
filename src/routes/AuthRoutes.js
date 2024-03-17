import {AuthController} from "../controllers/AuthContoller.js";
import {Router} from "express";

const router = Router();
const authController = new AuthController();

router.post("/signup", authController.signUp)
router.post("/login", authController.login)

export default router