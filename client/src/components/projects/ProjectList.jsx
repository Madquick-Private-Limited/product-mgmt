import React, { useState, useEffect } from 'react';
import axiosInstance from '../../util/axiosInstance';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div key={project._id} className="bg-gray-100 p-4 rounded">
                        <h2 className="font-bold mb-4">{project.name}</h2>
                        <p>Start Date: {project.startDate}</p>
                        <p>End Date: {project.endDate}</p>
                        <p>Coordinator: {project.coordinator.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;