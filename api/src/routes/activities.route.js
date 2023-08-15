import { Router } from 'express';
import { postActivityMdl } from '../middlewares/activities.mdl.js';
import { getActivities, getActivityById, postActivity } from '../controllers/activities.controller.js';

const router = Router();

router.get("/", getActivities);
router.get("/:id", getActivityById);
router.post("/", postActivityMdl, postActivity);

export default router;