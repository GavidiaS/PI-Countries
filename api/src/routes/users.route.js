import { Router } from 'express';
import { loginMdl, registerMdl } from '../middlewares/users.mdl.js';
import { login, register, getUserById } from '../controllers/users.controller.js';

const router = Router();

router.get("/", loginMdl, login);
router.get("/:id", getUserById);
router.post("/", registerMdl, register);

export default router;