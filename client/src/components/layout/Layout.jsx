import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Outlet />
            </main>
        </div>
        </div>
    );
};

export default Layout;