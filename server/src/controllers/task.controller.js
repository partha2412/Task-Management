import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from "../services/task.service.js";

const createTaskController = async (req, res) => {
    try {
        const userId = req.user._id;

        const task = await createTask(userId, req.body);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllTasksController = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await getAllTasks(userId);

        res.status(200).json({
            success: true,
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getTaskByIdController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const task = await getTaskById(userId, id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateTaskController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const task = await updateTask(
            userId,
            id,
            req.body
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteTaskController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const task = await deleteTask(userId, id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController,
};