import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TaskSchema } from "../components/validations/taskSchema";

const { VITE_API_URL } = import.meta.env;

export const createTask = () => {
    const nav = useNavigate();

    const initialFromData = {
        "title": "",
        "type": "",
        "assignedTo": "",
        "status": "to do",
        "priority": "low",
        "description": ""
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFromData,
        mode: "onChange",
        resolver: joiResolver(TaskSchema)
    });

    const onSubmit = async (form: typeof initialFromData) => {

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
            await axios.post(`${VITE_API_URL}/tasks`, form);
            Swal.fire({
                title: 'Success!',
                text: 'Task created successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
            nav("/mytasks");

        } catch (error) {

            Swal.fire({
                title: 'Error!',
                text: 'Task creation failed',
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

    return ({
        register,
        handleSubmit,
        errors,
        isValid,
        onSubmit,
        navToMyTasks
    });
};