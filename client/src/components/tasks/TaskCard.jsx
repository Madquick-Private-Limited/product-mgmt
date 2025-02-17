// components/tasks/TaskCard.jsx
import React from 'react';
import { Eye, Edit2, Trash2, Calendar } from 'lucide-react';

const TaskCard = ({ task, onUpdate }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
        case 'HIGH': return 'bg-red-600';
        case 'MEDIUM': return 'bg-yellow-600';
        case 'LOW': return 'bg-green-600';
        default: return 'bg-gray-600';
        }
    };

    return (
        <div className="bg-[#2d3748] rounded p-4 shadow-md">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-white">{task.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${getPriorityColor(task.priority)}`}>
            {task.priority}
            </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">{task.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
                {task.dueDate 
                ? new Date(task.dueDate).toLocaleDateString() 
                : 'No due date'}
            </span>
            </div>
            
            <div className="flex space-x-2">
            <button className="p-1 hover:text-white">
                <Eye className="w-4 h-4" />
            </button>
            <button className="p-1 hover:text-white">
                <Edit2 className="w-4 h-4" />
            </button>
            <button className="p-1 hover:text-white">
                <Trash2 className="w-4 h-4" />
            </button>
            </div>
        </div>
        </div>
    );
    };

export default TaskCard;
