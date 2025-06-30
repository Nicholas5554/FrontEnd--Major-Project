import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { discussionSchema } from "../components/validations/discussionSchema";
import { useEffect, useState } from "react";


const { VITE_API_URL } = import.meta.env;

export const createDiscussion = () => {

    const [workers, setWorkers] = useState([]);

    const nav = useNavigate();

    const initialFormData = {
        "title": "",
        "description": "",
        "content": "",
        "users": [] as string[],
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFormData,
        mode: "onChange",
        resolver: joiResolver(discussionSchema)
    });

    const onSubmit = async (form: typeof initialFormData) => {

        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";

            await axios.post(`${VITE_API_URL}/discussions`, form);
            Swal.fire({
                title: 'Success!',
                text: 'Discussion created successfully',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3085d6',
                timer: 1500,
                timerProgressBar: true,
                customClass: {
                    popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                },
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
            });
            navToMyDiscussions()

        } catch (error) {

            Swal.fire({
                title: 'Error!',
                text: 'Discussion creation failed',
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

    useEffect(() => {
        const getWorkers = async () => {
            try {
                axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") || "";
                const res = await axios.get(`${VITE_API_URL}/users/myworkers`);
                setWorkers(res.data);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Error getting workers",
                    icon: "error",
                    confirmButtonColor: '#3085d6',
                    timer: 1500,
                    timerProgressBar: true,
                    customClass: {
                        popup: document.documentElement.classList.contains("dark") ? "swal-dark" : "",
                    },
                    background: document.documentElement.classList.contains("dark") ? "#1f2937" : undefined,
                    color: document.documentElement.classList.contains("dark") ? "#f9fafb" : undefined
                })
                console.log("Error getting workers", error);

            }
        }
        getWorkers();
    })

    const navToMyDiscussions = () => {
        nav("/mycreateddiscussions");
    }

    return ({
        register,
        handleSubmit,
        errors,
        isValid,
        onSubmit,
        navToMyDiscussions,
        workers
    });
};