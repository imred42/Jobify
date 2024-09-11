import { Router } from "express";
const router = Router();
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";
import upload from '../middleware/multerMiddleware.js';

router.patch(
  '/update-user',
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
);
router.route("/current-user").get(getCurrentUser);
router.route("/admin/app-stats").get(authorizePermissions('admin'), getApplicationStats);

export default router;
