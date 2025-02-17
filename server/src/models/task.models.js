import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'DONE'],
        default: 'TODO',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM',
    },
    dueDate: Date,
    tags: [String],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;