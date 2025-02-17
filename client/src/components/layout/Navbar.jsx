import React from 'react';
import { useUserStore } from '../../store/store';
import { 
    Bell, 
    Moon, 
    Sun, 
    Search,
    MessageCircle,
    User2Icon
    } from 'lucide-react';

    const Navbar = () => {
    const user = useUserStore((state) => state.user);
    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <div className="h-16 bg-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center flex-1">
            <div className="relative w-96">
            <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
        </div>

        <div className="flex items-center space-x-4">
            <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-700"
            >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-700">
            <MessageCircle className="h-5 w-5" />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-700">
            <Bell className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2">
            <img
                src=<User2Icon />
                alt="Profile"
                className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium">{user?.username}</span>
            </div>
        </div>
        </div>
    );
};


export default Navbar;