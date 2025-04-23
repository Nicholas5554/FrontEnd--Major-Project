import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../Store/bigPie";
import Swal from "sweetalert2";

export const useMyAssignedTasks = () => {
    const [tasks, setTasks] = useState<TTask[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.searchSlice.search);

    const searchTasks = () => {
        return tasks.filter((item: TTask) => item.title.toLowerCase().includes(searchWord.toLowerCase()));
    };

    const navToTask = (id: string) => {
        nav(`/task/${id}`);
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
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to select a status!';
                    }
                }
            });

            if (newStatus) {
                setTasks(prevTasks =>
                    prevTasks.map(t =>
                        t._id === task._id ? { ...t, status: newStatus } : t
                    )
                );

                await axios.patch(`http://localhost:8080/tasks/status/${task._id}`, { status: newStatus });

                Swal.fire({
                    title: `Task status updated to : "${newStatus}"`,
                    icon: "success",
                    timer: 2500,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6",
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                });
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
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    axios.defaults.headers.common["x-auth-token"] = token;
                }
                const res = await axios.get('http://localhost:8080/tasks/myAssignedTasks');
                setTasks(res.data);

            } catch (err) {
                Swal.fire({
                    title: "No Tasks Found",
                    text: "Could not find tasks",
                    icon: "question",
                    confirmButtonColor: '#3085d6',
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                });
            }
        };

        getData();
    }, []);

    const user = useSelector((state: TRootState) => state.userSlice);

    return {
        tasks,
        searchTasks,
        navToTask,
        user,
        ChangeStatus
    };
};
