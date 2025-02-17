import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Home, 
    CheckSquare, 
    Calendar, 
    MessageSquare, 
    Layout, 
    FileText,
    Users,
    Settings
    } from 'lucide-react';

    const Sidebar = () => {
    const location = useLocation();
    
    const menuItems = [
        { title: 'Tasks & Projects', icon: CheckSquare, path: '/tasks' },
        { title: 'Feeds', icon: Layout, path: '/feeds' },
        { title: 'Messenger', icon: MessageSquare, path: '/messenger' },
        { title: 'Boards', icon: Layout, path: '/boards' },
        { title: 'Notes', icon: FileText, path: '/notes' }
    ];

    const apps = [
        { title: 'Users', icon: Users, path: '/users' },
        { title: 'Administration', icon: Settings, path: '/admin' }
    ];

    return (
        <div className="w-64 h-screen bg-gray-900 text-gray-300">
        <div className="p-4">
            <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">VRISTO</span>
            </Link>
        </div>

        <div className="px-4 py-2">
            <h2 className="text-xs uppercase tracking-wider text-gray-500">Collaboration</h2>
            <nav className="mt-4 space-y-2">
            {menuItems.map((item) => (
                <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 ${
                    location.pathname === item.path ? 'bg-gray-800 text-white' : ''
                }`}
                >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
                </Link>
            ))}
            </nav>
        </div>

        <div className="px-4 py-2 mt-4">
            <h2 className="text-xs uppercase tracking-wider text-gray-500">Apps</h2>
            <nav className="mt-4 space-y-2">
            {apps.map((item) => (
                <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 ${
                    location.pathname === item.path ? 'bg-gray-800 text-white' : ''
                }`}
                >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
                </Link>
            ))}
            </nav>
        </div>
        </div>
    );
};


export default Sidebar;