import { Route, Routes, Navigate } from "react-router-dom"
import { useUserStore } from "./store/store"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./components/dashboard/Dashboard"
import TaskList from "./components/tasks/TaskList"
import Layout from "./components/layout/Layout"
import { useEffect } from "react"

const App = () => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && !user) {
      // You might want to verify the token with your backend here
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if (storedUser) {
          setUser(storedUser)
        }
      } catch (error) {
        console.error("Error restoring user session:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
  }, [])

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/" replace /> : <Register />} 
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute user={user}><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
      </Route>

      {/* Catch all route */}
      <Route 
        path="*" 
        element={<Navigate to={user ? "/" : "/login"} replace />} 
      />
    </Routes>
  )
}

export default App