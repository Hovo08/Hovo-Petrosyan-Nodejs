import { Router } from 'express';

import controller from "../controllers/taskController.js";

const router = Router();

router.get('/', controller.getTasks);
router.post('/create', controller.createTask);
router.get("/create/:id", controller.getUserById);
router.put('/update', controller.updateTask);
export default router;
