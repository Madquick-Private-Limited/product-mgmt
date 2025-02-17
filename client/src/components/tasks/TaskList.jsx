import React, { useState, useEffect } from 'react';
import axiosInstance from '../../util/axiosInstance';
import { PlusIcon } from 'lucide-react';

const TaskList = () => {
    const [tasks, setTasks] = useState({
        overdue: [],
        dueToday: [],
        thisWeek: []
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
        const { data } = await axiosInstance.get('/tasks');
        // Organize tasks by due date
        // const organized = {
        //     overdue: data.filter(task => /* Add overdue logic */),
        //     dueToday: data.filter(task => /* Add due today logic */),
        //     thisWeek: data.filter(task => /* Add this week logic */)
        // };
        setTasks(organized);
        } catch (error) {
        console.error('Error fetching tasks:', error);
        }
    };

    return (
        <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
            {/* Overdue Tasks */}
            <div>
            <h2 className="text-xl font-semibold mb-4">Overdue</h2>
            <div className="space-y-4">
                {tasks.overdue.map(task => (
                <TaskCard key={task._id} task={task} />
                ))}
            </div>
            </div>

            {/* Due Today Tasks */}
            <div>
            <h2 className="text-xl font-semibold mb-4">Due Today</h2>
            <div className="space-y-4">
                {tasks.dueToday.map(task => (
                <TaskCard key={task._id} task={task} />
                ))}
                <button className="flex items-center justify-center w-full p-3 bg-blue-600 rounded-lg">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Task
                </button>
            </div>
            </div>

            {/* This Week Tasks */}
            <div>
            <h2 className="text-xl font-semibold mb-4">This Week</h2>
            <div className="space-y-4">
                {tasks.thisWeek.map(task => (
                <TaskCard key={task._id} task={task} />
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};


export default TaskList;
