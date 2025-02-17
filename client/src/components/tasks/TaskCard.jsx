import React from 'react';
import { Eye, Edit2, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task, onUpdate }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'HIGH': return 'bg-red-500';
            case 'MEDIUM': return 'bg-yellow-500';
            case 'LOW': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
        };
    
        return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{task.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
            </span>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">{task.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
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
