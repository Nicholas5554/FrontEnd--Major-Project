import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import editTaskSchema from "../components/validations/editTaskSchema";

const { VITE_API_URL } = import.meta.env;

export const editTask = () => {

    const [workers, setWorkers] = useState([]);
    const [tasks, setTasks] = useState<TTask>();
    const { id } = useParams<{ id: string }>();

    const nav = useNavigate();

    const initialTask = {
        title: tasks?.title,
        assignedTo: tasks?.assignedTo._id,
        status: tasks?.status,
        priority: tasks?.priority,
        description: tasks?.description
    };

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        defaultValues: initialTask,
        mode: "onChange",
        resolver: joiResolver(editTaskSchema)
    });

    useEffect(() => {
        if (tasks) {
            reset(initialTask);
        }
    }, [tasks, reset]);


    const getData = async () => {
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.get(`${VITE_API_URL}/tasks/` + id);
            setTasks(res.data);

        } catch (err) {
            Swal.fire({
                title: "error",
                text: "could not get the task",
                icon: "error",
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            });
        }
    }

    const onSubmit = async (form: typeof initialTask) => {

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            const res = await axios.put(`${VITE_API_URL}/tasks/` + tasks?._id, form);
            setTasks(res.data);

            Swal.fire({
                title: 'Success!',
                text: 'Task updated successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            });
            nav("/mytasks");

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Task edit failed',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3085d6',
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined,
            })
        }
    };

    const navToMyTasks = () => {
        nav("/mytasks")
    }

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                const response = await axios.get(`${VITE_API_URL}/users/myworkers`);
                setWorkers(response.data);
            } catch (error) {
                console.error("Error fetching workers:", error);
            }
        };

        fetchWorkers();
    }, []);

    useEffect(() => {
        getData()
    }, [id]);


    return ({
        tasks,
        setTasks,
        id,
        getData,
        onSubmit,
        navToMyTasks,
        register,
        handleSubmit,
        errors,
        isValid,
        workers
    });
}