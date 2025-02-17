import React, { useEffect, useState } from 'react';
import axiosInstance from '../../util/axiosInstance';
import { useUserStore } from '../../store/store';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        const fetchTasks = async () => {
        try {
            const { data } = await axiosInstance.get('/tasks/assigned');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
        };
        fetchTasks();
    }, []);

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.username}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Task Status Columns */}
            <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-bold mb-4">To Do</h2>
            {tasks.filter(task => task.status === 'TODO').map(task => (
                <div key={task._id} className="bg-white p-4 rounded shadow mb-2">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                </div>
            ))}
            </div>
            {/* Add In Progress and Done columns similarly */}
        </div>
        </div>
    );
};


export default Dashboard;