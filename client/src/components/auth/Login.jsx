import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import axiosInstance from "../../util/axiosInstance"
import { useUserStore } from "../../store/store.js"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const setUser = useUserStore((state) => state.setUser)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await axiosInstance.post("/auth/login", formData)
            setUser(data.user)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            toast.success("Login successful!")
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Don't have an account? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login