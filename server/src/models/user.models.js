import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['ADMIN', 'PROJECT_MANAGER', 'TEAM_MEMBER', 'CLIENT'],
        default: 'TEAM_MEMBER'
    },
    avatar: String,
    firstName: String,
    lastName: String,
    department: String,
    skills: [String],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    assignedTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    notifications: [{
        type: {
        type: String,
        enum: ['TASK_ASSIGNED', 'TASK_UPDATED', 'PROJECT_ADDED', 'MENTION']
        },
        message: String,
        read: {
        type: Boolean,
        default: false
        },
        createdAt: {
        type: Date,
        default: Date.now
        }
    }]
    }, { timestamps: true });

    userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
    });

    userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
    };

const User = mongoose.model('User', userSchema);
export default User;