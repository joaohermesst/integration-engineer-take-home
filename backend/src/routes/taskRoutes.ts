import express from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController";
import { validateData } from "../middlewares/validateDataMiddleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchema";

const router = express.Router();

router.get("/", getTasks);
router.post("/", validateData(createTaskSchema), createTask);
router.put("/:id", validateData(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
