import { Router } from "express";

import { isAuth } from "../middlewares/auth.middleware.js";

import {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController,
} from "../controllers/task.controller.js";

const router = Router();

// Protected routes
router.post("/", isAuth, createTaskController);
router.get("/", isAuth, getAllTasksController);
router.get("/:id", isAuth, getTaskByIdController);
router.put("/:id", isAuth, updateTaskController);
router.delete("/:id", isAuth, deleteTaskController);

export default router;