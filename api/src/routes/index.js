import { Router } from "express";
import users from './users.route.js';
import countries from './countries.route.js';
import activities from './activities.route.js';

const router = Router();

router.use("/user", users);
router.use("/countries", countries);
router.use("/activities", activities);

export default router;