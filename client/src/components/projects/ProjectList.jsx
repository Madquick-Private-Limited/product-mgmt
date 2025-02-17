// components/projects/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../util/axiosInstance';
import Header from '../layout/Header';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
        try {
            const { data } = await axiosInstance.get('/projects');
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
        };
        fetchProjects();
    }, []);

    // Filter by search
    const filteredProjects = projects.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 text-white">
        {/* Page heading + Search + Create button */}
        <Header />
        <div className="mt-3 flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Projects</h1>
            
            <div className="flex items-center space-x-4">
            <input
                type="text"
                placeholder="Search project"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#2d3748] text-white px-3 py-2 rounded focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                Create
            </button>
            </div>
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto bg-[#1f2937] rounded-lg border border-gray-700">
            <table className="min-w-full text-left">
            <thead className="border-b border-gray-700 bg-[#1f2937]">
                <tr>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Start Date</th>
                <th className="py-3 px-4 font-semibold">End Date</th>
                <th className="py-3 px-4 font-semibold">Coordinator</th>
                <th className="py-3 px-4 font-semibold">Attachments</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredProjects.map((project) => (
                <tr 
                    key={project._id} 
                    className="border-b border-gray-700 hover:bg-[#2d3748]"
                >
                    <td className="py-3 px-4">{project.name}</td>
                    <td className="py-3 px-4">{project.startDate}</td>
                    <td className="py-3 px-4">{project.endDate}</td>
                    <td className="py-3 px-4">{project.coordinator?.username}</td>
                    <td className="py-3 px-4">
                    {project.attachments ? project.attachments.length : 0} Files
                    </td>
                    <td className="py-3 px-4">
                    {/* Example status pill */}
                    <span className={`inline-block px-2 py-1 text-xs rounded
                        ${project.status === 'Pending' ? 'bg-purple-600' : 'bg-green-600'}`}>
                        {project.status}
                    </span>
                    </td>
                    <td className="py-3 px-4">
                    {/* Actions like edit/delete/view */}
                    <button className="text-blue-400 hover:text-blue-300 mr-2">
                        Edit
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                        Delete
                    </button>
                    </td>
                </tr>
                ))}

                {/* If no results */}
                {filteredProjects.length === 0 && (
                <tr>
                    <td className="py-3 px-4" colSpan={7}>
                    No matching projects found.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default ProjectList;
