import express  from "express";
import { loginUser, registerUser } from "../controllers/user.controller";

const router = express.Router();

router.post('/newUser', registerUser);
router.post('/user', loginUser)

export default router;