import { Navigate } from 'react-router-dom';
import { useUserStore } from "../store/store.js"

const ProtectedRoute = ({ children }) => {
    const user = useUserStore((state) => state.user);
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

export default ProtectedRoute;