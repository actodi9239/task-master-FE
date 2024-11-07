import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TaskDetail() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        important: false,
        date: '', // Solo se utilizará la fecha
        status: 'pending'
    });
    const [additionalDescription, setAdditionalDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`https://task-master-be-xzr5.onrender.com/api/tasks/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const taskData = response.data;
                console.log('Task data received:', taskData);

                // Obtener solo la fecha sin hora
                const date = taskData.date ? new Date(taskData.date).toISOString().split('T')[0] : '';

                setTask({ ...taskData, date });
            })
            .catch(error => {
                console.error('There was an error fetching the task!', error);
            });
    }, [id]);

    const handleAdditionalDescriptionChange = (e) => {
        setAdditionalDescription(e.target.value);
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        const updatedDescription = task.description + (additionalDescription ? '\n' + additionalDescription : '');

        const taskData = {
            status: task.status, // Solo actualiza el estado
            description: updatedDescription,
            date: task.date // Mantiene la fecha sin la hora
        };

        axios.put(`https://task-master-be-xzr5.onrender.com/api/tasks/${id}/`, taskData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                alert('Task updated successfully!');
                navigate('/tasks');
            })
            .catch(error => {
                console.error('There was an error updating the task!', error);
                alert('Failed to update task: ' + (error.response ? error.response.data.message : error.message));
            });
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');

        axios.delete(`https://task-master-be-xzr5.onrender.com/api/tasks/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                alert('Task deleted successfully!');
                navigate('/tasks');
            })
            .catch(error => {
                console.error('There was an error deleting the task!', error);
                alert('Failed to delete task: ' + (error.response ? error.response.data.message : error.message));
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#111518] text-white">
            <div className="w-full max-w-md bg-[#1d2126] p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Task Details</h2>
                <div>
                    <label className="block text-gray-300">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title || ''}
                        disabled
                        className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-[#2a2f36] text-white focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Description</label>
                    <textarea
                        name="description"
                        value={task.description || ''}
                        disabled
                        className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-[#2a2f36] text-white focus:outline-none"
                    />
                    <label className="block text-gray-300 mt-2">Add to Description</label>
                    <textarea
                        placeholder="Add more details..."
                        value={additionalDescription}
                        onChange={handleAdditionalDescriptionChange}
                        className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-[#2a2f36] text-white focus:outline-none"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-300">Status</label>
                    <select
                        name="status"
                        value={task.status}
                        onChange={(e) => setTask({ ...task, status: e.target.value })}
                        className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-[#2a2f36] text-white focus:outline-none"
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="flex justify-between space-x-2 mt-6">
                    {task.status === 'completed' && (
                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200"
                        >
                            Delete Task
                        </button>
                    )}
                    <button
                        onClick={handleUpdate}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Update Status
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;
