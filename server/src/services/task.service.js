import Task from "../models/Task.js";

const createTask = async (userId, taskData) => {
    const task = await Task.create({
        userId,
        ...taskData,
    });

    return task;
};

const getAllTasks = async (userId) => {
    const tasks = await Task.find({ userId })
        .sort({ createdAt: -1 });

    return tasks;
};

const getTaskById = async (userId, taskId) => {
    const task = await Task.findOne({
        _id: taskId,
        userId,
    });

    return task;
};

const updateTask = async (userId, taskId, taskData) => {
    const task = await Task.findOneAndUpdate(
        {
            _id: taskId,
            userId,
        },
        taskData,
        {
            new: true,
            runValidators: true,
        }
    );

    return task;
};

const deleteTask = async (userId, taskId) => {
    const task = await Task.findOneAndDelete({
        _id: taskId,
        userId,
    });

    return task;
};

export {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};