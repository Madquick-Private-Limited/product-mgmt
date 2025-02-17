import Project from '../models/project.models.js';
import User from '../models/user.models.js';

export const createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, team, clientId } = req.body;
        
        // Only ADMIN and PROJECT_MANAGER can create projects
        if (!['ADMIN', 'PROJECT_MANAGER'].includes(req.user.role)) {
        return res.status(403).json({ message: 'Not authorized to create projects' });
        }

        const project = await Project.create({
        name,
        description,
        startDate,
        endDate,
        manager: req.user._id,
        team,
        client: clientId,
        status: 'PENDING'
        });

        // Add project to team members' projects array
        await User.updateMany(
        { _id: { $in: [...team, clientId] } },
        { $push: { projects: project._id } }
        );

        const populatedProject = await Project.findById(project._id)
        .populate('manager', 'username email')
        .populate('team', 'username email')
        .populate('client', 'username email');

        res.status(201).json(populatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    export const getProjects = async (req, res) => {
    try {
        let query = {};
        
        // ADMIN sees all projects
        if (req.user.role !== 'ADMIN') {
        // Others see only their associated projects
        query = {
            $or: [
            { manager: req.user._id },
            { team: req.user._id },
            { client: req.user._id }
            ]
        };
        }

        const projects = await Project.find(query)
        .populate('manager', 'username email')
        .populate('team', 'username email')
        .populate('client', 'username email')
        .populate({
            path: 'tasks',
            select: 'title status priority dueDate'
        });

        res.json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const update = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
        return res.status(404).json({ message: 'Project not found' });
        }

        // Check authorization
        if (req.user.role !== 'ADMIN' && 
            project.manager.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update project' });
        }

        const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        update,
        { new: true }
        ).populate('manager team client tasks');

        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

    export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        
        const project = await Project.findById(projectId);
        if (!project) {
        return res.status(404).json({ message: 'Project not found' });
        }

        // Only ADMIN or project manager can delete
        if (req.user.role !== 'ADMIN' && 
            project.manager.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete project' });
        }

        // Remove project reference from users
        await User.updateMany(
        { projects: projectId },
        { $pull: { projects: projectId } }
        );

        await Project.findByIdAndDelete(projectId);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };
