// components/tasks/TaskModal.jsx
import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'; 
import axiosInstance from '../../util/axiosInstance';

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM',
        status: 'TODO',
        project: '',
        assignee: '',
        board: '',
        attachments: null,
    });

    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        if (isOpen) {
        fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        try {
        // Example: fetch projects, users, boards
        const projRes = await axiosInstance.get('/projects');
        const userRes = await axiosInstance.get('/users');
        const boardRes = await axiosInstance.get('/boards');
        setProjects(projRes.data);
        setUsers(userRes.data);
        setBoards(boardRes.data);
        } catch (err) {
        console.error(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert attachments, etc., if needed
        onSubmit(formData);
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 fixed inset-0" />
            <Dialog.Content 
            className="fixed top-[50%] left-[50%] max-h-[90vh] w-full max-w-3xl 
                        -translate-x-1/2 -translate-y-1/2 
                        bg-[#1f2937] p-6 rounded-lg shadow-xl overflow-auto"
            >
            <Dialog.Title className="text-2xl font-bold text-white mb-4">
                Add Task
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none"
                    required
                />
                </div>

                {/* Description (could be a WYSIWYG in a real app) */}
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none h-28"
                />
                </div>

                {/* Row of fields: Status, Priority, Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                    Task Status
                    </label>
                    <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none"
                    >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                    Priority
                    </label>
                    <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none"
                    >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                    Deadline
                    </label>
                    <input
                    type="datetime-local"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none"
                    />
                </div>
                </div>

                {/* Row of fields: Project, Board, Assignee */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                    Project
                    </label>
                    <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none"
                    >
                    <option value="">Select project</option>
                    {projects.map((proj) => (
                        <option key={proj._id} value={proj._id}>
                        {proj.name}
                        </option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                    Board
                    </label>
                    <select
                    value={formData.board}
                    onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none"
                    >
                    <option value="">Select board</option>
                    {boards.map((b) => (
                        <option key={b._id} value={b._id}>
                        {b.name}
                        </option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                    Assignee
                    </label>
                    <select
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none"
                    >
                    <option value="">Select user</option>
                    {users.map((u) => (
                        <option key={u._id} value={u._id}>
                        {u.username}
                        </option>
                    ))}
                    </select>
                </div>
                </div>

                {/* Attachments */}
                <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Attachments
                </label>
                <input
                    type="file"
                    multiple
                    onChange={(e) =>
                    setFormData({ ...formData, attachments: e.target.files })
                    }
                    className="w-full bg-[#2d3748] rounded p-2 text-white focus:outline-none"
                />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Create Task
                </button>
                </div>
            </form>
            </Dialog.Content>
        </Dialog.Portal>
        </Dialog.Root>
    );
};

export default TaskModal;
