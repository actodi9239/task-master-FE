import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        important: false,
        date: '' // Solo se utilizará la fecha
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, important: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local

        const taskData = {
            ...formData,
            date: formData.date, // Solo se usa la fecha
            important: formData.important, // Importante o no
        };

        axios.post('https://task-master-be-xzr5.onrender.com/api/tasks', taskData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Asegúrate de que el token se envíe
            }
        })
        .then(response => {
            console.log('Task created successfully:', response.data);
            navigate('/tasks');
        })
        .catch(error => {
            console.error('There was an error creating the task!', error.response ? error.response.data : error);
            alert('Failed to create task: ' + (error.response ? error.response.data.message : error.message)); // Muestra un mensaje de error
        });
    };    

    return (
        <div className="flex justify-center items-center h-screen bg-[#111518] text-white">
            <div className="w-full max-w-md bg-[#1d2126] p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300">Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-[#2a2f36] text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Description</label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-[#2a2f36] text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Important</label>
                        <input
                            type="checkbox"
                            name="important"
                            onChange={handleCheckboxChange}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-[#2a2f36] text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
