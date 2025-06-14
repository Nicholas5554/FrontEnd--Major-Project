import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";

const { VITE_API_URL } = import.meta.env;


export const myCreatedTasks = () => {
    const [tasks, setTasks] = useState<TTask[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);


    const searchTasks = () => {
        return tasks.filter((item: TTask) => item.title.includes(searchWord.toLocaleLowerCase()));
    };

    const deleteTask = async (task: TTask) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it",
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,

            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete(`${VITE_API_URL}/tasks/` + task._id);
                    const index = tasks.indexOf(task);
                    const newTasks = [...tasks];

                    if (res) {
                        Swal.fire({
                            title: "Task Deleted",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            timer: 1500,
                            timerProgressBar: true,
                            customClass: {
                                popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                            },
                            background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
                        });
                        newTasks.splice(index, 1);
                        setTasks(newTasks);
                    }
                };
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "could not delete Task",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            });
        }
    };

    const ChangeStatus = async (task: TTask) => {
        try {
            const { value: newStatus } = await Swal.fire({
                title: "Change Status",
                input: "select",
                inputOptions: {
                    'in progress': 'In Progress',
                    'completed': 'Completed'
                },
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                inputPlaceholder: "Select status",
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to select a status!';
                    }
                },
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            });

            if (newStatus) {
                setTasks(prevTasks =>
                    prevTasks.map(t =>
                        t._id === task._id ? { ...t, status: newStatus } : t
                    )
                );

                Swal.fire({
                    title: `Task status updated to : "${newStatus}"`,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
                });
                await axios.patch(`${VITE_API_URL}/tasks/status/${task._id}`, { status: newStatus });

                navToMyTasks();
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Could not change status",
                icon: "error",
                confirmButtonColor: '#3085d6',
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,

            });
        }
    };


    const navToMyTasks = () => {
        nav('/mytasks');
    }

    const editTask = (id: string) => {
        nav(`/edittask/${id}`);
    }


    const navToTask = (id: string) => {
        nav(`/task/${id}`);
    }

    const navToCreateTask = () => {
        nav('/createtask');
    }

    const getData = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        }

        const res = await axios.get(`${VITE_API_URL}/tasks/my-createdTasks`);
        setTasks(res.data);
        if (res.data.length === 0) {
            Swal.fire({
                title: "No Tasks Found",
                icon: "info",
                text: "You have not created any tasks yet",
                confirmButtonColor: '#3085d6',
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            });
        }
    }

    useEffect(() => {
        getData();

        const interval = setInterval(() => {
            getData();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const user = useSelector(
        (state: TRootState) => state.userSlice,
    );


    return ({
        tasks,
        searchTasks,
        deleteTask,
        editTask,
        navToTask,
        navToCreateTask,
        user,
        ChangeStatus
    })
}