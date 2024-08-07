import { Router } from "express";
const router = Router();
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";

router.route("/current-user").get(getCurrentUser);
router.route("/admin/app-stats").get(authorizePermissions('admin'), getApplicationStats);
router.route("/update-user").patch(validateUpdateUserInput, updateUser);

export default router;
