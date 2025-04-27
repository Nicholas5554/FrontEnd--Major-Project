import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TRootState } from "../Store/bigPie";

export const tasksCrmFuncs = () => {

    const nav = useNavigate();

    const [tasks, setTasks] = useState<TTask[]>([]);

    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);
    const user = useSelector((state: TRootState) => state.userSlice);

    const searchTasks = () => {
        return tasks?.filter((item: TTask) => item.title.includes(searchWord.toLocaleLowerCase()));
    }

    const navToTask = (id: string) => {
        nav("/task/" + id);
    }

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:8080/tasks');
            setTasks(res.data);
            if (res.data.length === 0) {
                Swal.fire({
                    title: "Error",
                    text: "Could not get Tasks",
                    icon: "error",
                    timerProgressBar: true,
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6',
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                });
            }
        } catch (err: any) {
            Swal.fire({
                title: "Error",
                text: "Could not get Tasks",
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
        }
    }

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
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined

            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete("http://localhost:8080/tasks/" + task._id);
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
                            color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                        });
                        newTasks.splice(index, 1);
                        setTasks(newTasks);
                    }
                };
            });
            ;
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
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
        }
    };

    useEffect(() => {
        fetchTasks();

        const interval = setInterval(() => {
            fetchTasks();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return ({
        tasks,
        searchTasks,
        user,
        navToTask,
        deleteTask
    })
}