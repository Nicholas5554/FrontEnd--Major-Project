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
        } catch (err: any) {
            Swal.fire({
                title: "Error",
                text: "Could not get Tasks",
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
            });
        }
    }


    const ChangeStatus = async (task: TTask) => {
        try {
            const { value: newStatus } = await Swal.fire({
                title: "Change Status",
                input: "select",
                inputOptions: {
                    'to do': 'To Do',
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
                    title: `Task status updated to ${newStatus}`,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                    confirmButtonColor: "#3085d6"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Could not change status",
                icon: "error",
                confirmButtonColor: '#3085d6',
            });
        }
    };

    const deleteTask = async (task: TTask) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it"

            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete("http://localhost:8080/tasks/" + task._id);
                    const index = tasks.indexOf(task);
                    const newTasks = [...tasks];

                    if (res) {
                        Swal.fire({
                            title: "Card Deleted",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            timer: 1500,
                            timerProgressBar: true,
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
                timerProgressBar: true
            });
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return ({
        tasks,
        searchTasks,
        user,
        navToTask,
        deleteTask,
        ChangeStatus
    })
}