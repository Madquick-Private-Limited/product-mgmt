import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
// import ProjectList from "./components/projects/ProjectList";
import TaskList from "./components/tasks/TaskList";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        {/* <Route path="/projects" element={<ProjectList />} /> */}
      </Route>
    </Routes>
  );
}

export default App;