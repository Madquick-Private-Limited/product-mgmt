import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'],
        default: 'TODO'
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
        default: 'MEDIUM'
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    dueDate: Date,
    tags: [String],
    dependencies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    subtasks: [{
        title: String,
        completed: {
        type: Boolean,
        default: false
        }
    }],
    attachments: [{
        name: String,
        url: String,
        type: String
    }],
    comments: [{
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        content: String,
        createdAt: {
        type: Date,
        default: Date.now
        }
    }]
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;