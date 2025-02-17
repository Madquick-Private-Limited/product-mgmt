import Task from '../models/task.models.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, projectId } = req.body;
        const task = await Task.create({
        title,
        description,
        dueDate,
        priority,
        project: projectId,
        assignedTo: req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
        $or: [
            { assignedTo: req.user._id },
            { createdBy: req.user._id }
        ]
        }).populate('assignedTo project');
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const update = req.body;
        const task = await Task.findByIdAndUpdate(taskId, update, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};