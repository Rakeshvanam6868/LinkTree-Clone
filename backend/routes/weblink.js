import express from 'express';
import { ensureAuth, ensureGuest } from '../middleware/routeProtection.js';
import { create, read, getWeblink, update, deleteWeblink } from '../controllers/workoutController.js';

const router = express.Router();

router.get('/:username', ensureAuth, read);
router.post('/add', ensureAuth, (req, res, next) => {
    console.log('POST /add request received');
    next();
  }, create);
router.patch('/:id', ensureAuth, update);
router.delete('/:id', ensureAuth, deleteWeblink);

export default router;
