import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configurar moment.js para el calendario
const localizer = momentLocalizer(moment);

function CalendarPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación

        if (token) {
            // Obtener las tareas y convertirlas en eventos para el calendario
            axios.get('http://localhost:4000/api/tasks/', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Asegúrate de enviar el token
                },
            })
            .then(response => {
                const tasks = response.data;
                const formattedTasks = tasks.map(task => ({
                    title: task.title,
                    start: new Date(task.date), // Ajustar la fecha de inicio
                    end: new Date(task.date), // Ajustar fecha de finalización
                    allDay: true, // Mostrar como evento de todo el día
                    task,
                }));
                setEvents(formattedTasks);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
        } else {
            console.error('No token found, user is not authenticated');
        }
    }, []);

    // Función para cambiar el estilo de los eventos
    const eventStyleGetter = (event) => {
        let backgroundColor = '#3174ad'; // Color por defecto
        if (event.task.important) {
            backgroundColor = 'yellow'; // Tareas importantes en amarillo
        }
        if (event.task.datecompleted) {
            backgroundColor = 'red'; // Tareas completadas en rojo
        }
        return {
            style: {
                backgroundColor,
                color: 'black', // Color del texto en el evento
                borderRadius: '5px',
                opacity: 0.8,
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Task Calendar</h1>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 800, width: '90%', margin: '0 auto' }}  // Aumentamos la altura y anchura
                    defaultView="month"
                    views={['month']} // Solo mostrar el mes
                    popup={true}
                    selectable={true}
                    eventPropGetter={eventStyleGetter} // Aplicamos el estilo personalizado
                    onSelectEvent={event => alert(`Task: ${event.title}\nDescription: ${event.task.description}`)} // Mostrar detalles al hacer clic en el evento
                />
            </div>
        </div>
    );
}

export default CalendarPage;
