import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../store/store';
import axiosInstance from '../../util/axiosInstance';
import TaskCard from './TaskCard';
import { PlusIcon } from 'lucide-react';
import TaskModal from './TaskModal';

const TaskList = () => {
    const [tasks, setTasks] = useState({
        overdue: [],
        dueToday: [],
        thisWeek: [],
        dueLater: [],
        noDeadline: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
        const { data } = await axiosInstance.get('/tasks');
        const now = new Date();
        const organized = {
            overdue: data.filter(task => new Date(task.dueDate) < now),
            dueToday: data.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate.toDateString() === now.toDateString();
            }),
            thisWeek: data.filter(task => {
            const dueDate = new Date(task.dueDate);
            const nextWeek = new Date(now);
            nextWeek.setDate(nextWeek.getDate() + 7);
            return dueDate > now && dueDate <= nextWeek;
            }),
            dueLater: data.filter(task => {
            const dueDate = new Date(task.dueDate);
            const nextWeek = new Date(now);
            nextWeek.setDate(nextWeek.getDate() + 7);
            return dueDate > nextWeek;
            }),
            noDeadline: data.filter(task => !task.dueDate)
        };
        setTasks(organized);
        } catch (error) {
        console.error('Error fetching tasks:', error);
        }
    };

    const handleTaskCreate = async (taskData) => {
        try {
        await axiosInstance.post('/tasks', taskData);
        fetchTasks();
        setIsModalOpen(false);
        } catch (error) {
        console.error('Error creating task:', error);
        }
    };

    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center"
            >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Task
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Object.entries(tasks).map(([status, taskList]) => (
            <div key={status} className="bg-gray-900 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4 capitalize">
                {status.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
                <div className="space-y-4">
                {taskList.map(task => (
                    <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
                ))}
                </div>
            </div>
            ))}
        </div>

        <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleTaskCreate}
        />
        </div>
    );
};

export default TaskList;
