import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState({
        pending: [],
        'in-progress': [],
        completed: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Please login first.');
            return;
        }

        axios.get('http://localhost:4000/api/tasks/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const allTasks = response.data;
                console.log('Tareas obtenidas:', allTasks);

                const pending = allTasks.filter(task => task.status === 'pending');
                const inProgress = allTasks.filter(task => task.status === 'in-progress');
                const completed = allTasks.filter(task => task.status === 'completed');

                setTasks({ pending, 'in-progress': inProgress, completed });
            })
            .catch(error => {
                console.error('There was an error fetching the tasks!', error);
            });
    }, []);

    const handleTaskClick = (task) => {
        navigate(`/tasks/${task.id}`);
    };

    return (
        <div className="bg-[#111518] min-h-screen text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Task Board</h1>
            <Link
                to="/tasks/create"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
            >
                Create New Task
            </Link>
            <div className="grid grid-cols-3 gap-4">
                {['pending', 'in-progress', 'completed'].map((status) => (
                    <div key={status} className="bg-[#1d2126] p-4 rounded-lg min-h-[400px]">
                        <h2 className="text-2xl font-bold mb-4 capitalize">{status.replace('-', ' ')}</h2>
                        <ul className="space-y-2">
                            {tasks[status] && tasks[status].length > 0 ? (
                                tasks[status].map((task) => (
                                    <li
                                        key={task.id}
                                        className={`p-3 rounded-lg shadow-md cursor-pointer ${
                                            task.important ? "bg-yellow-500 border-l-4 border-yellow-700" : "bg-[#2a2f36]"
                                        }`}
                                        onClick={() => handleTaskClick(task)}
                                    >
                                        <span className="text-xl font-semibold">{task.title}</span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No tasks</p>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
