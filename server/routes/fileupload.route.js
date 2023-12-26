import { Router } from 'express';

import imageToText from '../controller/fileController.js';
const router = Router();


router.post("/imageToText", imageToText);

export default router;