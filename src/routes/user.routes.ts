import express  from "express";
import { loginUser, newUser } from "../controllers/user.controller";

const router = express.Router();

router.post('/newUser', newUser);
router.post('/user', loginUser)

export default router;