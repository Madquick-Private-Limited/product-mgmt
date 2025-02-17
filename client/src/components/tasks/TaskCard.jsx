import React from 'react';
import { Eye, Edit2, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 space-y-2">
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-gray-400">{task.description}</p>
        
        <div className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
            {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No due date'}
            </span>
        </div>

        <div className="flex justify-between items-center pt-2">
            <div className="flex -space-x-2">
            {task.assignees?.map((assignee) => (
                <img
                key={assignee._id}
                src={assignee.avatar || '/default-avatar.png'}
                alt={assignee.username}
                className="h-6 w-6 rounded-full border-2 border-gray-800"
                />
            ))}
            </div>

            <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-700 rounded">
                <Eye className="h-4 w-4" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded">
                <Edit2 className="h-4 w-4" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded">
                <Trash2 className="h-4 w-4" />
            </button>
            </div>
        </div>
        </div>
    );
};

export default TaskCard;
