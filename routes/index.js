import { Router } from 'express';

import taskRoutes from "./taskRoutes.js";

const router = Router();

router.use('/tasks', taskRoutes);

export default router;
