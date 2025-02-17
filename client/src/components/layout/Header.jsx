// components/layout/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-[#1f2937] border-b border-gray-700 p-4">
        <nav className="flex space-x-6 text-white">
            <NavLink 
            to="/tasks" 
            className={({ isActive }) => 
                `hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
            }
            >
            Tasks
            </NavLink>
            <NavLink 
            to="/projects" 
            className={({ isActive }) => 
                `hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
            }
            >
            Projects
            </NavLink>
            <NavLink 
            to="/calendar" 
            className="hover:text-blue-400"
            >
            Calendar
            </NavLink>
            <NavLink 
            to="/notifications" 
            className="hover:text-blue-400"
            >
            Notifications
            </NavLink>
        </nav>
        </header>
    );
    };

export default Header;
