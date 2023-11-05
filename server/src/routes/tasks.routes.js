import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  deleteTaskById,
  updateTaskById,
} from "../controllers/index.js";
import { createTaskSchema } from "../schemas/index.js";
import { authRequired, validateSchema } from "../middlewares/index.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTaskById);
router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);
router.delete("/tasks/:id", authRequired, deleteTaskById);
router.put("/tasks/:id", authRequired, updateTaskById);

export default router;
