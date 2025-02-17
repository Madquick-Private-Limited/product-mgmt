import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/store';
import axiosInstance from '../../util/axiosInstance';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
        return toast.error('Passwords do not match');
        }
        try {
        const { data } = await axiosInstance.post('/auth/register', formData);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        toast.success('Registration successful!');
        navigate('/dashboard');
        } catch (error) {
        toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
            <h2 className="text-3xl font-bold text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
            <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border rounded"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded">
                Register
            </button>
            </form>
        </div>
        </div>
    );
};

export default Register;
