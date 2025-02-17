// components/tasks/TaskList.jsx
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../store/store';
import axiosInstance from '../../util/axiosInstance';
import TaskCard from './TaskCard';
import { PlusIcon } from 'lucide-react';
import TaskModal from './TaskModal';
import Header from '../layout/Header';

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
            overdue: data.filter(task => task.dueDate && new Date(task.dueDate) < now),
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
        <div className="p-6 text-white">
        {/* Page heading + Add Task button */}
        <div className="flex justify-between items-center mb-6">
            <Header />
            <h1 className="text-2xl font-bold">Tasks</h1>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center"
            >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Task
            </button>
        </div>

        {/* Columns for Overdue, Due Today, etc. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Overdue */}
            <div className="bg-[#1f2937] rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Overdue</h2>
            <div className="space-y-4">
                {tasks.overdue.map((task) => (
                <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
                ))}
            </div>
            </div>

            {/* Due Today */}
            <div className="bg-[#1f2937] rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Due Today</h2>
            <div className="space-y-4">
                {tasks.dueToday.map((task) => (
                <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
                ))}
            </div>
            </div>

            {/* This Week */}
            <div className="bg-[#1f2937] rounded p-4">
            <h2 className="text-lg font-semibold mb-4">This Week</h2>
            <div className="space-y-4">
                {tasks.thisWeek.map((task) => (
                <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
                ))}
            </div>
            </div>

            {/* Due Later */}
            <div className="bg-[#1f2937] rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Due Later</h2>
            <div className="space-y-4">
                {tasks.dueLater.map((task) => (
                <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
                ))}
            </div>
            </div>

            {/* No Deadline */}
            <div className="bg-[#1f2937] rounded p-4">
            <h2 className="text-lg font-semibold mb-4">No Deadline</h2>
            <div className="space-y-4">
                {tasks.noDeadline.map((task) => (
                <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
                ))}
            </div>
            </div>
        </div>

        {/* The Modal */}
        <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleTaskCreate}
        />
        </div>
    );
};

export default TaskList;
